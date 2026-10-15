import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "crypto";

const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "createadmin2026";
const COOKIE_NAME = "create_admin_session";

function getExpectedToken(): string {
  const secret = process.env.ADMIN_SECRET || DEFAULT_ADMIN_PASSWORD;
  return crypto.createHash("sha256").update(`create-admin-auth-${secret}`).digest("hex");
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    const expected = getExpectedToken();

    if (token && token === expected) {
      return NextResponse.json({ authenticated: true });
    }

    return NextResponse.json({ authenticated: false });
  } catch (error) {
    return NextResponse.json({ authenticated: false, error: "Auth check failed" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, password } = body;

    if (action === "logout") {
      const cookieStore = await cookies();
      cookieStore.delete(COOKIE_NAME);
      return NextResponse.json({ success: true, authenticated: false });
    }

    if (action === "login") {
      const adminPass = process.env.ADMIN_PASSWORD || DEFAULT_ADMIN_PASSWORD;

      if (!password || typeof password !== "string") {
        return NextResponse.json({ error: "Password is required" }, { status: 400 });
      }

      // Safe constant-time string comparison
      const passBuffer = Buffer.from(password);
      const targetBuffer = Buffer.from(adminPass);

      const isValid =
        passBuffer.length === targetBuffer.length &&
        crypto.timingSafeEqual(passBuffer, targetBuffer);

      if (!isValid) {
        return NextResponse.json({ error: "Invalid password" }, { status: 401 });
      }

      const expectedToken = getExpectedToken();
      const cookieStore = await cookies();

      // Set secure HTTP-only cookie valid for 7 days
      cookieStore.set(COOKIE_NAME, expectedToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 7 * 24 * 60 * 60, // 7 days
      });

      return NextResponse.json({ success: true, authenticated: true });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("[ADMIN_AUTH_ERROR]", error);
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 });
  }
}
