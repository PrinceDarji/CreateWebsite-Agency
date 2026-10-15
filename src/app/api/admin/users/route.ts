import { NextResponse } from "next/server";
import crypto from "crypto";
import { verifyAdminSession, hashPassword } from "@/lib/cms/auth";
import {
  getAdminUsers,
  getAdminUserById,
  getAdminUserByEmail,
  saveAdminUser,
  deleteAdminUser,
  addAuditLog,
} from "@/lib/cms/storage";
import { AdminRole, AdminStatus, AdminUser, AdminUserSummary } from "@/lib/cms/types";

function sanitizeAdmin(user: AdminUser): AdminUserSummary {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    status: user.status,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    lastLoginAt: user.lastLoginAt,
  };
}

// ──────────────────────────────────────────────
// GET: List all administrators (Sanitized)
// ──────────────────────────────────────────────
export async function GET() {
  try {
    const session = await verifyAdminSession();
    if (!session.authenticated || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const users = await getAdminUsers();
    const safeUsers = users.map(sanitizeAdmin);

    return NextResponse.json({
      users: safeUsers,
      currentUser: session.user,
    });
  } catch (error: any) {
    console.error("[ADMIN_USERS_GET_ERROR]", error?.message || error);
    return NextResponse.json({ error: "Failed to load admin accounts" }, { status: 500 });
  }
}

// ──────────────────────────────────────────────
// POST: Create a new administrator
// ──────────────────────────────────────────────
export async function POST(req: Request) {
  try {
    const session = await verifyAdminSession();
    if (!session.authenticated || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (session.user.role === "EDITOR") {
      return NextResponse.json(
        { error: "Insufficient permissions: Editors cannot create administrator accounts." },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { email, name, role = "ADMIN", status = "ACTIVE", password } = body;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email address is required" }, { status: 400 });
    }

    if (!password || typeof password !== "string" || password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters long" }, { status: 400 });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const existingUser = await getAdminUserByEmail(normalizedEmail);
    if (existingUser) {
      return NextResponse.json(
        { error: `An administrator account already exists for ${normalizedEmail}` },
        { status: 400 }
      );
    }

    // Role restrictions: Only a SUPER_ADMIN can create another SUPER_ADMIN
    if (role === "SUPER_ADMIN" && session.user.role !== "SUPER_ADMIN") {
      return NextResponse.json(
        { error: "Only Super Administrators can create other Super Administrators." },
        { status: 403 }
      );
    }

    const validRoles: AdminRole[] = ["SUPER_ADMIN", "ADMIN", "EDITOR"];
    const targetRole: AdminRole = validRoles.includes(role) ? role : "ADMIN";

    const validStatuses: AdminStatus[] = ["ACTIVE", "INACTIVE"];
    const targetStatus: AdminStatus = validStatuses.includes(status) ? status : "ACTIVE";

    const { hash, salt } = hashPassword(password);
    const now = new Date().toISOString();

    const newAdmin: AdminUser = {
      id: crypto.randomUUID(),
      email: normalizedEmail,
      name: (name || "").trim() || normalizedEmail.split("@")[0],
      role: targetRole,
      status: targetStatus,
      passwordHash: hash,
      salt: salt,
      createdAt: now,
      updatedAt: now,
    };

    await saveAdminUser(newAdmin, session.actor || session.user.email);
    await addAuditLog(
      session.actor || session.user.email,
      "CREATE_ADMIN_ACCOUNT",
      `Created admin: ${normalizedEmail} (Role: ${targetRole})`
    );

    return NextResponse.json({
      success: true,
      user: sanitizeAdmin(newAdmin),
    }, { status: 201 });
  } catch (error: any) {
    console.error("[ADMIN_USERS_POST_ERROR]", error?.message || error);
    return NextResponse.json({ error: "Failed to create admin user" }, { status: 500 });
  }
}

// ──────────────────────────────────────────────
// PATCH: Update admin user (name, role, status, reset password)
// ──────────────────────────────────────────────
export async function PATCH(req: Request) {
  try {
    const session = await verifyAdminSession();
    if (!session.authenticated || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { id, name, email, role, status, newPassword } = body;

    if (!id) {
      return NextResponse.json({ error: "Admin ID is required" }, { status: 400 });
    }

    const targetUser = await getAdminUserById(id);
    if (!targetUser) {
      return NextResponse.json({ error: "Admin user not found" }, { status: 404 });
    }

    // Role permission check
    const isSelf = session.user.id === id || session.user.email.toLowerCase() === targetUser.email.toLowerCase();
    const isSuperAdmin = session.user.role === "SUPER_ADMIN";
    const isAdmin = session.user.role === "ADMIN";

    if (!isSelf && !isSuperAdmin && !isAdmin) {
      return NextResponse.json({ error: "Insufficient permissions to modify this account" }, { status: 403 });
    }

    // Prevent non-superadmins from modifying a SUPER_ADMIN
    if (targetUser.role === "SUPER_ADMIN" && !isSuperAdmin && !isSelf) {
      return NextResponse.json({ error: "Only Super Administrators can modify Super Admin accounts" }, { status: 403 });
    }

    // Prevent non-superadmins from promoting to SUPER_ADMIN
    if (role === "SUPER_ADMIN" && !isSuperAdmin) {
      return NextResponse.json({ error: "Only Super Administrators can assign the Super Admin role" }, { status: 403 });
    }

    // Name update
    if (typeof name === "string" && name.trim()) {
      targetUser.name = name.trim();
    }

    // Email update
    if (typeof email === "string" && email.trim() && email.toLowerCase() !== targetUser.email.toLowerCase()) {
      const normalizedEmail = email.trim().toLowerCase();
      const existing = await getAdminUserByEmail(normalizedEmail);
      if (existing && existing.id !== id) {
        return NextResponse.json({ error: `Email ${normalizedEmail} is already taken by another admin` }, { status: 400 });
      }
      targetUser.email = normalizedEmail;
    }

    // Role update
    if (role && (role === "SUPER_ADMIN" || role === "ADMIN" || role === "EDITOR")) {
      // Check if demoting the only active super admin
      if (targetUser.role === "SUPER_ADMIN" && role !== "SUPER_ADMIN") {
        const allUsers = await getAdminUsers();
        const otherActiveSupers = allUsers.filter(
          (u) => u.role === "SUPER_ADMIN" && u.status === "ACTIVE" && u.id !== id
        );
        if (otherActiveSupers.length === 0) {
          return NextResponse.json({ error: "Cannot demote the only active Super Administrator" }, { status: 400 });
        }
      }
      targetUser.role = role;
    }

    // Status update
    if (status && (status === "ACTIVE" || status === "INACTIVE")) {
      if (isSelf && status === "INACTIVE") {
        return NextResponse.json({ error: "You cannot deactivate your own active account" }, { status: 400 });
      }
      if (targetUser.role === "SUPER_ADMIN" && status === "INACTIVE") {
        const allUsers = await getAdminUsers();
        const otherActiveSupers = allUsers.filter(
          (u) => u.role === "SUPER_ADMIN" && u.status === "ACTIVE" && u.id !== id
        );
        if (otherActiveSupers.length === 0) {
          return NextResponse.json({ error: "Cannot deactivate the only active Super Administrator" }, { status: 400 });
        }
      }
      targetUser.status = status;
    }

    // Password reset / update
    if (newPassword) {
      if (typeof newPassword !== "string" || newPassword.length < 8) {
        return NextResponse.json({ error: "New password must be at least 8 characters long" }, { status: 400 });
      }
      const { hash, salt } = hashPassword(newPassword);
      targetUser.passwordHash = hash;
      targetUser.salt = salt;
      targetUser.resetToken = undefined;
      targetUser.resetTokenExpiry = undefined;
    }

    const saved = await saveAdminUser(targetUser, session.actor || session.user.email);
    await addAuditLog(
      session.actor || session.user.email,
      "UPDATE_ADMIN_ACCOUNT",
      `Updated admin: ${saved.email} (${newPassword ? "Password Reset, " : ""}Role: ${saved.role}, Status: ${saved.status})`
    );

    return NextResponse.json({
      success: true,
      user: sanitizeAdmin(saved),
    });
  } catch (error: any) {
    console.error("[ADMIN_USERS_PATCH_ERROR]", error?.message || error);
    return NextResponse.json({ error: "Failed to update admin user" }, { status: 500 });
  }
}

// ──────────────────────────────────────────────
// DELETE: Remove an administrator account
// ──────────────────────────────────────────────
export async function DELETE(req: Request) {
  try {
    const session = await verifyAdminSession();
    if (!session.authenticated || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (session.user.role === "EDITOR") {
      return NextResponse.json({ error: "Insufficient permissions to delete accounts" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    let id = searchParams.get("id");

    if (!id) {
      try {
        const body = await req.json();
        id = body.id;
      } catch {}
    }

    if (!id) {
      return NextResponse.json({ error: "Admin ID is required" }, { status: 400 });
    }

    if (session.user.id === id) {
      return NextResponse.json({ error: "You cannot delete your own active administrator account" }, { status: 400 });
    }

    const targetUser = await getAdminUserById(id);
    if (!targetUser) {
      return NextResponse.json({ error: "Admin user not found" }, { status: 404 });
    }

    if (targetUser.role === "SUPER_ADMIN" && session.user.role !== "SUPER_ADMIN") {
      return NextResponse.json({ error: "Only Super Administrators can delete Super Admin accounts" }, { status: 403 });
    }

    const result = await deleteAdminUser(id, session.actor || session.user.email);
    if (!result.success) {
      return NextResponse.json({ error: result.error || "Failed to delete admin" }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: `Administrator ${targetUser.email} has been removed.`,
    });
  } catch (error: any) {
    console.error("[ADMIN_USERS_DELETE_ERROR]", error?.message || error);
    return NextResponse.json({ error: "Failed to delete admin user" }, { status: 500 });
  }
}
