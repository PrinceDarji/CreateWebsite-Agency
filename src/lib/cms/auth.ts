import { cookies } from "next/headers";
import crypto from "crypto";
import { addAuditLog } from "./storage";

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

export function getExpectedToken(): string {
  const secret = process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD;
  if (!secret) {
    throw new Error("CRITICAL_CONFIG_ERROR: ADMIN_PASSWORD or ADMIN_SECRET must be configured in environment variables.");
  }
  return crypto.createHash("sha256").update(`create-admin-auth-${secret}`).digest("hex");
}

export async function verifyAdminSession(): Promise<{ authenticated: boolean; actor?: string }> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return { authenticated: false };

    const expected = getExpectedToken();
    if (token === expected) {
      return { authenticated: true, actor: "admin" };
    }
    return { authenticated: false };
  } catch {
    return { authenticated: false };
  }
}

export function verifyPassword(inputPassword: string): boolean {
  const target = process.env.ADMIN_PASSWORD;
  if (!target) {
    console.error("[AUTH_CONFIG_ERROR] ADMIN_PASSWORD environment variable is not set.");
    return false;
  }

  const inputBuf = Buffer.from(inputPassword);
  const targetBuf = Buffer.from(target);

  if (inputBuf.length !== targetBuf.length) return false;
  return crypto.timingSafeEqual(inputBuf, targetBuf);
}
