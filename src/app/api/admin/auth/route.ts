import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { Resend } from "resend";
import {
  COOKIE_NAME,
  checkLoginRateLimit,
  recordFailedLogin,
  clearFailedLogin,
  createSessionToken,
  verifyAdminSession,
  verifyHashedPassword,
  hashPassword,
  generatePasswordResetToken,
  verifyPasswordResetToken,
  verifyPassword,
} from "@/lib/cms/auth";
import {
  getAdminUsers,
  getAdminUserByEmail,
  getAdminUserById,
  saveAdminUser,
  addAuditLog,
  getInitialAdmins,
} from "@/lib/cms/storage";

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

export async function GET() {
  try {
    const session = await verifyAdminSession();
    return NextResponse.json({
      authenticated: session.authenticated,
      user: session.user,
    });
  } catch (err) {
    return NextResponse.json({ authenticated: false }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "127.0.0.1";
  const origin = req.headers.get("origin") || "http://localhost:3000";

  try {
    const body = await req.json();
    const { action } = body;

    // ──────────────────────────────────────────────
    // 1. LOGOUT
    // ──────────────────────────────────────────────
    if (action === "logout") {
      const cookieStore = await cookies();
      cookieStore.delete(COOKIE_NAME);
      try {
        await addAuditLog("admin", "LOGOUT", "Admin session terminated", undefined, ip);
      } catch {}
      return NextResponse.json({ success: true, authenticated: false });
    }

    // ──────────────────────────────────────────────
    // 2. LOGIN (Email + Password)
    // ──────────────────────────────────────────────
    if (action === "login") {
      const { email, password } = body;

      // Rate limiting check
      const rateLimit = checkLoginRateLimit(ip);
      if (!rateLimit.allowed) {
        try {
          await addAuditLog("anonymous", "LOGIN_BLOCKED", `IP ${ip} temporarily locked out`, undefined, ip);
        } catch {}
        return NextResponse.json(
          { error: `Too many failed login attempts. Please wait ${rateLimit.remainingMinutes} minutes before retrying.` },
          { status: 429 }
        );
      }

      if (!password || typeof password !== "string") {
        return NextResponse.json({ error: "Password is required" }, { status: 400 });
      }

      const normalizedEmail = (email || "").trim().toLowerCase();
      let matchedUser = normalizedEmail ? await getAdminUserByEmail(normalizedEmail) : null;

      // If email was not provided or user not found yet, check all admins
      if (!matchedUser) {
        const allAdmins = await getAdminUsers();
        // If single admin or legacy password match
        if (allAdmins.length === 1 && (!normalizedEmail || normalizedEmail === allAdmins[0].email.toLowerCase())) {
          matchedUser = allAdmins[0];
        } else if (!normalizedEmail && allAdmins.length > 0) {
          // If no email entered, default to first active super admin
          matchedUser = allAdmins.find((u) => u.role === "SUPER_ADMIN" && u.status === "ACTIVE") || allAdmins[0];
        }
      }

      let isAuthenticated = false;

      if (matchedUser) {
        if (matchedUser.status !== "ACTIVE") {
          return NextResponse.json({ error: "This administrator account is currently deactivated." }, { status: 403 });
        }
        isAuthenticated = verifyHashedPassword(password, matchedUser.passwordHash, matchedUser.salt);

        // Fallback: If hashed password check fails, check if password matches ADMIN_PASSWORD / default studio passwords
        if (!isAuthenticated && verifyPassword(password)) {
          isAuthenticated = true;
          try {
            const { hash, salt } = hashPassword(password);
            matchedUser.passwordHash = hash;
            matchedUser.salt = salt;
            await saveAdminUser(matchedUser, matchedUser.email);
          } catch (syncErr) {
            console.warn("[AUTH_SYNC_WARN]", syncErr);
          }
        }
      } else {
        // Fallback check against environment ADMIN_PASSWORD
        isAuthenticated = verifyPassword(password);
        if (isAuthenticated) {
          const admins = await getAdminUsers();
          matchedUser = admins[0] || getInitialAdmins()[0];
        }
      }

      if (!isAuthenticated || !matchedUser) {
        try {
          recordFailedLogin(ip);
          await addAuditLog("anonymous", "LOGIN_FAILED", `Failed login for "${email || "unknown"}" from ${ip}`, undefined, ip);
        } catch {}
        return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
      }

      // Success: clear rate limit, update lastLoginAt, issue session
      try {
        clearFailedLogin(ip);
        matchedUser.lastLoginAt = new Date().toISOString();
        await saveAdminUser(matchedUser, matchedUser.email);
      } catch (saveErr) {
        console.warn("[AUTH_SAVE_USER_WARN]", saveErr);
      }

      const token = createSessionToken(matchedUser);
      const cookieStore = await cookies();
      cookieStore.set(COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 7 * 24 * 60 * 60, // 7 days
      });

      try {
        await addAuditLog(matchedUser.email, "LOGIN_SUCCESS", `Authenticated from ${ip}`, undefined, ip);
      } catch (auditErr) {
        console.warn("[AUTH_AUDIT_LOG_WARN]", auditErr);
      }

      return NextResponse.json({
        success: true,
        authenticated: true,
        user: {
          id: matchedUser.id,
          email: matchedUser.email,
          name: matchedUser.name,
          role: matchedUser.role,
        },
      });
    }

    // ──────────────────────────────────────────────
    // 3. FORGOT PASSWORD (Request Reset Link)
    // ──────────────────────────────────────────────
    if (action === "forgot-password") {
      const { email } = body;
      if (!email || typeof email !== "string") {
        return NextResponse.json({ error: "Valid email address is required" }, { status: 400 });
      }

      const normalizedEmail = email.trim().toLowerCase();
      const user = await getAdminUserByEmail(normalizedEmail);

      if (!user) {
        // Generic response to avoid user enumeration
        return NextResponse.json({
          success: true,
          message: "If an administrator account exists with this email, a password reset link has been dispatched.",
        });
      }

      const { token, hashedToken, expiresAt } = generatePasswordResetToken();
      user.resetToken = hashedToken;
      user.resetTokenExpiry = expiresAt;
      await saveAdminUser(user, "system");

      const resetUrl = `${origin}/admin?action=reset&token=${token}&email=${encodeURIComponent(user.email)}`;
      let emailDispatched = false;

      const resend = getResend();
      if (resend) {
        try {
          const senderEmail = process.env.EMAIL_FROM || "onboarding@resend.dev";
          await resend.emails.send({
            from: senderEmail,
            to: user.email,
            subject: "CREATE CMS — Reset Your Password",
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; background: #050505; color: #ffffff; padding: 32px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
                <h2 style="color: #ffffff; font-size: 24px; margin-bottom: 8px;">CREATE. <span style="color: #B90000;">CMS</span></h2>
                <p style="color: #aaaaaa; font-size: 14px; margin-bottom: 24px;">Studio Operations Portal</p>
                <p style="color: #e5e5e5; font-size: 15px; line-height: 1.6;">Hello ${user.name},</p>
                <p style="color: #e5e5e5; font-size: 15px; line-height: 1.6;">A password reset request was received for your CREATE CMS administrator account. Click the button below to choose a new password. This link is valid for 1 hour.</p>
                <div style="margin: 32px 0;">
                  <a href="${resetUrl}" style="background-color: #B90000; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; display: inline-block;">Reset Password</a>
                </div>
                <p style="color: #888888; font-size: 12px; line-height: 1.6;">If the button does not work, copy and paste this link into your browser:<br/><a href="${resetUrl}" style="color: #B90000;">${resetUrl}</a></p>
                <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.1); margin: 24px 0;" />
                <p style="color: #666666; font-size: 11px;">If you did not request this password reset, please ignore this email or notify your system administrator.</p>
              </div>
            `,
          });
          emailDispatched = true;
        } catch (mailErr) {
          console.error("[AUTH_RESET_EMAIL_ERROR]", mailErr);
        }
      }

      try {
        await addAuditLog(user.email, "PASSWORD_RESET_REQUESTED", `Reset link generated for ${user.email}`, undefined, ip);
      } catch {}

      return NextResponse.json({
        success: true,
        message: "Password reset instructions have been generated.",
        emailDispatched,
        // Provide rescue link when email dispatch is not configured in local environment
        rescueLink: !emailDispatched ? resetUrl : undefined,
      });
    }

    // ──────────────────────────────────────────────
    // 4. RESET PASSWORD (Submit New Password with Token)
    // ──────────────────────────────────────────────
    if (action === "reset-password") {
      const { email, token, newPassword } = body;

      if (!email || !token || !newPassword) {
        return NextResponse.json({ error: "Email, token, and new password are required" }, { status: 400 });
      }

      if (typeof newPassword !== "string" || newPassword.length < 8) {
        return NextResponse.json({ error: "Password must be at least 8 characters long" }, { status: 400 });
      }

      const user = await getAdminUserByEmail(email.trim().toLowerCase());
      if (!user || !user.resetToken || !user.resetTokenExpiry) {
        return NextResponse.json({ error: "Invalid or expired password reset request" }, { status: 400 });
      }

      const isTokenValid = verifyPasswordResetToken(token, user.resetToken, user.resetTokenExpiry);
      if (!isTokenValid) {
        return NextResponse.json({ error: "Password reset link has expired or is invalid. Please request a new one." }, { status: 400 });
      }

      const { hash, salt } = hashPassword(newPassword);
      user.passwordHash = hash;
      user.salt = salt;
      user.resetToken = undefined;
      user.resetTokenExpiry = undefined;
      try {
        await saveAdminUser(user, user.email);
        await addAuditLog(user.email, "PASSWORD_RESET_SUCCESS", `Password updated via reset token`, undefined, ip);
      } catch (saveErr) {
        console.warn("[AUTH_RESET_SAVE_WARN]", saveErr);
      }

      return NextResponse.json({
        success: true,
        message: "Your password has been successfully reset. You can now log in with your new password.",
      });
    }

    // ──────────────────────────────────────────────
    // 5. CHANGE PASSWORD (Authenticated Session)
    // ──────────────────────────────────────────────
    if (action === "change-password") {
      const session = await verifyAdminSession();
      if (!session.authenticated || !session.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      const { currentPassword, newPassword } = body;
      if (!currentPassword || !newPassword) {
        return NextResponse.json({ error: "Current password and new password are required" }, { status: 400 });
      }

      if (typeof newPassword !== "string" || newPassword.length < 8) {
        return NextResponse.json({ error: "New password must be at least 8 characters long" }, { status: 400 });
      }

      const user = await getAdminUserById(session.user.id) || await getAdminUserByEmail(session.user.email);
      if (!user) {
        return NextResponse.json({ error: "User record not found" }, { status: 404 });
      }

      const isCurrentValid = verifyHashedPassword(currentPassword, user.passwordHash, user.salt);
      if (!isCurrentValid) {
        return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 });
      }

      const { hash, salt } = hashPassword(newPassword);
      user.passwordHash = hash;
      user.salt = salt;
      try {
        await saveAdminUser(user, session.actor || user.email);
        await addAuditLog(session.actor || user.email, "PASSWORD_CHANGED", "Admin changed account password", undefined, ip);
      } catch (saveErr) {
        console.warn("[AUTH_CHANGE_SAVE_WARN]", saveErr);
      }

      return NextResponse.json({
        success: true,
        message: "Password changed successfully.",
      });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    console.error("[ADMIN_AUTH_ERROR]", error?.message || error);
    return NextResponse.json({ error: "Authentication service error." }, { status: 500 });
  }
}
