import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  COOKIE_NAME,
  checkLoginRateLimit,
  recordFailedLogin,
  clearFailedLogin,
  getExpectedToken,
  verifyPassword,
  verifyAdminSession
} from "@/lib/cms/auth";
import { addAuditLog } from "@/lib/cms/storage";

export async function GET() {
  try {
    const session = await verifyAdminSession();
    return NextResponse.json({ authenticated: session.authenticated });
  } catch (err) {
    return NextResponse.json({ authenticated: false }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "127.0.0.1";

  try {
    const body = await req.json();
    const { action, password } = body;

    if (action === "logout") {
      const cookieStore = await cookies();
      cookieStore.delete(COOKIE_NAME);
      await addAuditLog("admin", "LOGOUT", "Admin logged out", undefined, ip);
      return NextResponse.json({ success: true, authenticated: false });
    }

    if (action === "login") {
      // 1. Rate Limiting Check
      const rateLimit = checkLoginRateLimit(ip);
      if (!rateLimit.allowed) {
        await addAuditLog("anonymous", "LOGIN_BLOCKED", `Too many attempts from ${ip}`, undefined, ip);
        return NextResponse.json(
          { error: `Too many failed attempts. Account locked for ${rateLimit.remainingMinutes} minutes.` },
          { status: 429 }
        );
      }

      if (!password || typeof password !== "string") {
        return NextResponse.json({ error: "Password is required" }, { status: 400 });
      }

      // 2. Validate Password
      const isValid = verifyPassword(password);
      if (!isValid) {
        recordFailedLogin(ip);
        await addAuditLog("anonymous", "FAILED_LOGIN", `Failed attempt from ${ip}`, undefined, ip);
        return NextResponse.json({ error: "Invalid password." }, { status: 401 });
      }

      // 3. Clear rate limit on success
      clearFailedLogin(ip);

      // 4. Issue Secure Session Cookie
      const token = getExpectedToken();
      const cookieStore = await cookies();

      cookieStore.set(COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 7 * 24 * 60 * 60, // 7 days
      });

      await addAuditLog("admin", "LOGIN_SUCCESS", `Admin authenticated successfully from ${ip}`, undefined, ip);
      return NextResponse.json({ success: true, authenticated: true });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    console.error("[ADMIN_AUTH_ERROR]", error?.message || error);
    return NextResponse.json({ error: "Authentication service error." }, { status: 500 });
  }
}
