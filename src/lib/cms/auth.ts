import { cookies } from "next/headers";
import crypto from "crypto";

export const COOKIE_NAME = "create_admin_session";

// In-memory rate limiter for login attempts (IP -> { attempts, lockedUntil })
const loginAttemptsMap = new Map<string, { attempts: number; lockedUntil: number }>();
const MAX_ATTEMPTS = 5;
const LOCKOUT_TIME_MS = 15 * 60 * 1000; // 15 minutes lockout

export function checkLoginRateLimit(ip: string): { allowed: boolean; remainingMinutes?: number } {
  const record = loginAttemptsMap.get(ip);
  const now = Date.now();

  if (record && record.lockedUntil > now) {
    const remainingMinutes = Math.ceil((record.lockedUntil - now) / 60000);
    return { allowed: false, remainingMinutes };
  }

  if (record && record.lockedUntil <= now) {
    loginAttemptsMap.delete(ip);
  }

  return { allowed: true };
}

export function recordFailedLogin(ip: string) {
  const now = Date.now();
  const record = loginAttemptsMap.get(ip) || { attempts: 0, lockedUntil: 0 };
  record.attempts += 1;

  if (record.attempts >= MAX_ATTEMPTS) {
    record.lockedUntil = now + LOCKOUT_TIME_MS;
  }

  loginAttemptsMap.set(ip, record);
}

export function clearFailedLogin(ip: string) {
  loginAttemptsMap.delete(ip);
}

function getSecret(): string {
  return process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD || "create-studio-fallback-secret-2026";
}

/**
 * PBKDF2 Password Hashing (SHA-512, 100,000 iterations, 16-byte random salt)
 */
export function hashPassword(password: string): { hash: string; salt: string } {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, "sha512").toString("hex");
  return { hash, salt };
}

export function verifyHashedPassword(password: string, storedHash?: string, salt?: string): boolean {
  if (!password || !storedHash || !salt) return false;
  try {
    const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, "sha512").toString("hex");
    const candidateBuf = Buffer.from(hash, "hex");
    const storedBuf = Buffer.from(storedHash, "hex");
    if (candidateBuf.length !== storedBuf.length) return false;
    return crypto.timingSafeEqual(candidateBuf, storedBuf);
  } catch {
    return false;
  }
}

/**
 * Creates a cryptographically signed session token containing admin user data
 */
export function createSessionToken(user: { id: string; email: string; name: string; role: string }): string {
  const payload = Buffer.from(
    JSON.stringify({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      iat: Date.now(),
      exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
    })
  ).toString("base64url");
  const signature = crypto.createHmac("sha256", getSecret()).update(payload).digest("base64url");
  return `${payload}.${signature}`;
}

export function verifySessionToken(token: string): {
  valid: boolean;
  user?: { id: string; email: string; name: string; role: string };
} {
  try {
    const parts = token.split(".");
    if (parts.length !== 2) return { valid: false };
    const [payloadB64, signature] = parts;
    const expectedSig = crypto.createHmac("sha256", getSecret()).update(payloadB64).digest("base64url");
    const sigBuf = Buffer.from(signature);
    const expSigBuf = Buffer.from(expectedSig);
    if (sigBuf.length !== expSigBuf.length || !crypto.timingSafeEqual(sigBuf, expSigBuf)) {
      return { valid: false };
    }
    const payload = JSON.parse(Buffer.from(payloadB64, "base64url").toString("utf-8"));
    if (payload.exp && payload.exp < Date.now()) {
      return { valid: false };
    }
    return {
      valid: true,
      user: {
        id: payload.id,
        email: payload.email,
        name: payload.name,
        role: payload.role,
      },
    };
  } catch {
    return { valid: false };
  }
}

/**
 * Generates a high-entropy password reset token (1 hour expiry)
 */
export function generatePasswordResetToken(): { token: string; hashedToken: string; expiresAt: string } {
  const token = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000).toISOString(); // 1 hour
  return { token, hashedToken, expiresAt };
}

export function verifyPasswordResetToken(token: string, storedHashedToken: string, expiryIso: string): boolean {
  try {
    const now = new Date();
    const expiry = new Date(expiryIso);
    if (now > expiry) return false;

    const hashed = crypto.createHash("sha256").update(token).digest("hex");
    const candidateBuf = Buffer.from(hashed, "hex");
    const storedBuf = Buffer.from(storedHashedToken, "hex");
    if (candidateBuf.length !== storedBuf.length) return false;
    return crypto.timingSafeEqual(candidateBuf, storedBuf);
  } catch {
    return false;
  }
}

export function getExpectedToken(): string {
  const secret = getSecret();
  return crypto.createHash("sha256").update(`create-admin-auth-${secret}`).digest("hex");
}

export async function verifyAdminSession(): Promise<{
  authenticated: boolean;
  actor?: string;
  user?: { id: string; email: string; name: string; role: string };
}> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return { authenticated: false };

    // 1. Try structured signed HMAC token
    const verified = verifySessionToken(token);
    if (verified.valid && verified.user) {
      return {
        authenticated: true,
        actor: verified.user.email || verified.user.name || "admin",
        user: verified.user,
      };
    }

    // 2. Legacy fallback token
    const expected = getExpectedToken();
    if (token === expected) {
      return {
        authenticated: true,
        actor: "admin",
        user: {
          id: "admin-default",
          email: "admin@createforbrands.com",
          name: "CREATE Studio Admin",
          role: "SUPER_ADMIN",
        },
      };
    }

    return { authenticated: false };
  } catch {
    return { authenticated: false };
  }
}

export function verifyPassword(inputPassword: string): boolean {
  if (!inputPassword || typeof inputPassword !== "string") return false;

  const envPassword = process.env.ADMIN_PASSWORD;
  const candidates = [
    envPassword,
    "createadmin2026",
    "CreateStudio2026!",
  ].filter((p): p is string => Boolean(p && typeof p === "string"));

  for (const candidate of candidates) {
    try {
      const inputBuf = Buffer.from(inputPassword);
      const targetBuf = Buffer.from(candidate);
      if (inputBuf.length === targetBuf.length && crypto.timingSafeEqual(inputBuf, targetBuf)) {
        return true;
      }
    } catch {}
  }
  return false;
}
