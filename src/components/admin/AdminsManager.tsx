"use client";

import React, { useState, useEffect } from "react";
import {
  Users,
  UserPlus,
  Shield,
  Key,
  Lock,
  Trash2,
  Edit2,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Eye,
  EyeOff,
  RefreshCw,
  Clock,
  ShieldAlert,
  UserCheck,
} from "lucide-react";
import { AdminRole, AdminStatus, AdminUserSummary } from "@/lib/cms/types";

interface AdminsManagerProps {
  currentUser?: {
    id?: string;
    email?: string;
    name?: string;
    role?: AdminRole;
  };
  onAuditLogNeeded?: () => void;
}

export function AdminsManager({ currentUser }: AdminsManagerProps) {
  const [users, setUsers] = useState<AdminUserSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Modals state
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isChangeMyPassOpen, setIsChangeMyPassOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUserSummary | null>(null);
  const [resettingUser, setResettingUser] = useState<AdminUserSummary | null>(null);

  // Form states for Add Admin
  const [addForm, setAddForm] = useState({
    name: "",
    email: "",
    role: "ADMIN" as AdminRole,
    status: "ACTIVE" as AdminStatus,
    password: "",
  });
  const [showAddPassword, setShowAddPassword] = useState(false);
  const [submittingAdd, setSubmittingAdd] = useState(false);

  // Form states for Change My Password
  const [myPassForm, setMyPassForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showMyPass, setShowMyPass] = useState(false);
  const [submittingMyPass, setSubmittingMyPass] = useState(false);

  // Form state for Reset Other User's Password
  const [resetPassForm, setResetPassForm] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [showResetPass, setShowResetPass] = useState(false);
  const [submittingResetPass, setSubmittingResetPass] = useState(false);

  // Form state for Editing User Role/Details
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    role: "ADMIN" as AdminRole,
    status: "ACTIVE" as AdminStatus,
  });
  const [submittingEdit, setSubmittingEdit] = useState(false);

  // Copied indicator helper
  const [copiedPass, setCopiedPass] = useState(false);

  // Fetch admin list
  const fetchAdmins = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      if (res.ok) {
        setUsers(data.users || []);
      } else {
        setError(data.error || "Failed to load administrators");
      }
    } catch {
      setError("Network error fetching administrators");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  // Flash message helper
  const flashSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 5000);
  };

  // Helper to generate strong password
  const generatePassword = () => {
    const chars = "abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789!@#$%^&*()_+";
    let pass = "";
    for (let i = 0; i < 16; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return pass;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPass(true);
    setTimeout(() => setCopiedPass(false), 2000);
  };

  // 1. Submit Add Administrator
  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!addForm.email || !addForm.password) {
      setError("Email and password are required");
      return;
    }
    if (addForm.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setSubmittingAdd(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(addForm),
      });
      const data = await res.json();
      if (res.ok) {
        flashSuccess(`Administrator ${data.user.email} created successfully`);
        setIsAddOpen(false);
        setAddForm({
          name: "",
          email: "",
          role: "ADMIN",
          status: "ACTIVE",
          password: "",
        });
        fetchAdmins();
      } else {
        setError(data.error || "Failed to create administrator");
      }
    } catch {
      setError("Network error creating administrator");
    } finally {
      setSubmittingAdd(false);
    }
  };

  // 2. Submit Change My Password
  const handleMyPassSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!myPassForm.currentPassword || !myPassForm.newPassword) {
      setError("All password fields are required");
      return;
    }
    if (myPassForm.newPassword !== myPassForm.confirmPassword) {
      setError("New passwords do not match");
      return;
    }
    if (myPassForm.newPassword.length < 8) {
      setError("New password must be at least 8 characters");
      return;
    }

    setSubmittingMyPass(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "change-password",
          currentPassword: myPassForm.currentPassword,
          newPassword: myPassForm.newPassword,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        flashSuccess("Your password was updated successfully.");
        setIsChangeMyPassOpen(false);
        setMyPassForm({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        setError(data.error || "Failed to update password");
      }
    } catch {
      setError("Network error while changing password");
    } finally {
      setSubmittingMyPass(false);
    }
  };

  // 3. Submit Reset Other Admin's Password
  const handleResetPassSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resettingUser) return;
    if (!resetPassForm.newPassword) {
      setError("New password is required");
      return;
    }
    if (resetPassForm.newPassword !== resetPassForm.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (resetPassForm.newPassword.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setSubmittingResetPass(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: resettingUser.id,
          newPassword: resetPassForm.newPassword,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        flashSuccess(`Password for ${resettingUser.email} has been updated.`);
        setResettingUser(null);
        setResetPassForm({ newPassword: "", confirmPassword: "" });
      } else {
        setError(data.error || "Failed to reset password");
      }
    } catch {
      setError("Network error while resetting password");
    } finally {
      setSubmittingResetPass(false);
    }
  };

  // 4. Submit Edit Details / Role / Status
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;

    setSubmittingEdit(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingUser.id,
          name: editForm.name,
          email: editForm.email,
          role: editForm.role,
          status: editForm.status,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        flashSuccess(`Administrator ${data.user.email} updated.`);
        setEditingUser(null);
        fetchAdmins();
      } else {
        setError(data.error || "Failed to update administrator");
      }
    } catch {
      setError("Network error while updating administrator");
    } finally {
      setSubmittingEdit(false);
    }
  };

  // 5. Toggle Status (Active / Inactive)
  const handleToggleStatus = async (user: AdminUserSummary) => {
    const nextStatus: AdminStatus = user.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
    const confirmMsg =
      nextStatus === "INACTIVE"
        ? `Are you sure you want to deactivate ${user.email}? They will no longer be able to log in.`
        : `Re-activate ${user.email}?`;

    if (!window.confirm(confirmMsg)) return;

    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: user.id,
          status: nextStatus,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        flashSuccess(`Admin status changed to ${nextStatus}.`);
        fetchAdmins();
      } else {
        setError(data.error || "Failed to update status");
      }
    } catch {
      setError("Network error updating status");
    }
  };

  // 6. Delete Administrator
  const handleDeleteUser = async (user: AdminUserSummary) => {
    if (!window.confirm(`Are you certain you want to permanently delete administrator account "${user.email}"? This action cannot be undone.`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/users?id=${encodeURIComponent(user.id)}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        flashSuccess(`Administrator ${user.email} deleted.`);
        fetchAdmins();
      } else {
        setError(data.error || "Failed to delete administrator");
      }
    } catch {
      setError("Network error deleting administrator");
    }
  };

  const getRoleBadge = (role: AdminRole) => {
    switch (role) {
      case "SUPER_ADMIN":
        return (
          <span className="px-2.5 py-1 rounded text-[10px] font-mono uppercase font-bold bg-brand-red/20 border border-brand-red/50 text-red-400 flex items-center gap-1.5 w-fit">
            <ShieldAlert className="w-3 h-3 text-brand-red" />
            SUPER ADMIN
          </span>
        );
      case "ADMIN":
        return (
          <span className="px-2.5 py-1 rounded text-[10px] font-mono uppercase font-bold bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center gap-1.5 w-fit">
            <Shield className="w-3 h-3 text-amber-400" />
            ADMIN
          </span>
        );
      case "EDITOR":
        return (
          <span className="px-2.5 py-1 rounded text-[10px] font-mono uppercase font-bold bg-blue-500/15 border border-blue-500/30 text-blue-400 flex items-center gap-1.5 w-fit">
            <UserCheck className="w-3 h-3 text-blue-400" />
            EDITOR
          </span>
        );
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Action Bar & Stat Summary */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-6 bg-[#0c0c0c] border border-white/10 rounded-2xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-brand-red/10 border border-brand-red/20 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6 text-brand-red" />
          </div>
          <div>
            <h2 className="text-xl font-display font-bold uppercase tracking-tight text-white flex items-center gap-2">
              <span>Studio Administrators</span>
              <span className="text-xs font-mono font-normal text-white/40">
                ({users.length} {users.length === 1 ? "account" : "accounts"})
              </span>
            </h2>
            <p className="text-xs text-white/50 font-mono mt-0.5">
              Secure authentication with email, hashed passwords & RBAC authorization
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setIsChangeMyPassOpen(true)}
            className="px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg text-xs font-mono uppercase tracking-widest transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Key className="w-3.5 h-3.5 text-white/60" />
            <span>Change My Password</span>
          </button>

          <button
            onClick={() => {
              const gen = generatePassword();
              setAddForm({
                name: "",
                email: "",
                role: "ADMIN",
                status: "ACTIVE",
                password: gen,
              });
              setShowAddPassword(true);
              setIsAddOpen(true);
            }}
            className="px-4 py-2.5 bg-brand-red hover:bg-white hover:text-black text-white rounded-lg text-xs font-mono uppercase tracking-widest font-bold transition-colors flex items-center gap-2 cursor-pointer shadow-lg shadow-brand-red/20"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add Administrator</span>
          </button>

          <button
            onClick={fetchAdmins}
            disabled={loading}
            className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white rounded-lg transition-colors cursor-pointer"
            title="Refresh list"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* Notifications */}
      {error && (
        <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 text-xs font-mono flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
          <button
            onClick={() => setError(null)}
            className="text-red-400 hover:text-white font-bold ml-4 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>{successMsg}</span>
          </div>
          <button
            onClick={() => setSuccessMsg(null)}
            className="text-emerald-400 hover:text-white font-bold ml-4 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Administrators Directory Table */}
      <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-black/40">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-widest text-white/50 font-bold">
              Authorized Team Directory
            </span>
          </div>
          <div className="text-[11px] font-mono text-white/40">
            PBKDF2 SHA-512 Encrypted Credential Vault
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans text-xs">
            <thead>
              <tr className="border-b border-white/10 text-white/40 font-mono uppercase tracking-wider text-[11px] bg-white/[0.02]">
                <th className="py-3.5 px-5">Administrator</th>
                <th className="py-3.5 px-5">Role</th>
                <th className="py-3.5 px-5">Account Status</th>
                <th className="py-3.5 px-5">Last Login</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono">
              {loading && users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-white/40">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="w-6 h-6 border-2 border-brand-red border-t-transparent rounded-full animate-spin" />
                      <span>Loading administrator directory...</span>
                    </div>
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-white/40">
                    No administrators found. Create one above.
                  </td>
                </tr>
              ) : (
                users.map((user) => {
                  const isCurrent =
                    currentUser?.email?.toLowerCase() === user.email.toLowerCase() ||
                    currentUser?.id === user.id;

                  return (
                    <tr
                      key={user.id}
                      className="hover:bg-white/[0.02] transition-colors group"
                    >
                      {/* Name & Email */}
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-white/10 border border-white/15 flex items-center justify-center font-bold text-white uppercase text-xs">
                            {user.name ? user.name.slice(0, 2) : user.email.slice(0, 2)}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-sans font-bold text-sm text-white">
                                {user.name || "Administrator"}
                              </span>
                              {isCurrent && (
                                <span className="text-[9px] bg-brand-red text-white px-1.5 py-0.5 rounded font-mono font-bold uppercase">
                                  You
                                </span>
                              )}
                            </div>
                            <span className="text-white/50 text-xs block font-mono">
                              {user.email}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Role */}
                      <td className="py-4 px-5">
                        {getRoleBadge(user.role)}
                      </td>

                      {/* Status */}
                      <td className="py-4 px-5">
                        {user.status === "ACTIVE" ? (
                          <span className="inline-flex items-center gap-1.5 text-emerald-400 font-mono text-[11px]">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-white/30 font-mono text-[11px]">
                            <span className="w-2 h-2 rounded-full bg-white/20" />
                            Inactive
                          </span>
                        )}
                      </td>

                      {/* Last Login */}
                      <td className="py-4 px-5 text-white/50 text-[11px]">
                        {user.lastLoginAt ? (
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3 h-3 text-white/30" />
                            <span>
                              {new Date(user.lastLoginAt).toLocaleDateString()}{" "}
                              {new Date(user.lastLoginAt).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                        ) : (
                          <span className="text-white/20 italic">Never logged in</span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => {
                              setEditingUser(user);
                              setEditForm({
                                name: user.name,
                                email: user.email,
                                role: user.role,
                                status: user.status,
                              });
                            }}
                            className="p-1.5 rounded hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
                            title="Edit details & role"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => {
                              const gen = generatePassword();
                              setResettingUser(user);
                              setResetPassForm({ newPassword: gen, confirmPassword: gen });
                              setShowResetPass(true);
                            }}
                            className="p-1.5 rounded hover:bg-white/10 text-white/70 hover:text-amber-400 transition-colors cursor-pointer"
                            title="Reset administrator password"
                          >
                            <Key className="w-3.5 h-3.5" />
                          </button>

                          {!isCurrent && (
                            <>
                              <button
                                onClick={() => handleToggleStatus(user)}
                                className={`p-1.5 rounded hover:bg-white/10 transition-colors cursor-pointer ${
                                  user.status === "ACTIVE"
                                    ? "text-white/50 hover:text-amber-400"
                                    : "text-emerald-400 hover:text-emerald-300"
                                }`}
                                title={user.status === "ACTIVE" ? "Deactivate account" : "Activate account"}
                              >
                                <Lock className="w-3.5 h-3.5" />
                              </button>

                              <button
                                onClick={() => handleDeleteUser(user)}
                                className="p-1.5 rounded hover:bg-red-500/20 text-white/40 hover:text-brand-red transition-colors cursor-pointer"
                                title="Delete account"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ──────────────────────────────────────────────
          MODAL 1: ADD NEW ADMINISTRATOR
      ────────────────────────────────────────────── */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0e0e0e] border border-white/20 rounded-2xl max-w-lg w-full p-6 md:p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
              <div>
                <h3 className="text-xl font-display font-bold uppercase tracking-tight text-white flex items-center gap-2">
                  <UserPlus className="w-5 h-5 text-brand-red" />
                  <span>Add Administrator</span>
                </h3>
                <p className="text-xs font-mono text-white/50 mt-0.5">
                  Provision new team credentials with role permissions
                </p>
              </div>
              <button
                onClick={() => setIsAddOpen(false)}
                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-white/70 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Morgan"
                  value={addForm.name}
                  onChange={(e) => setAddForm({ ...addForm, name: e.target.value })}
                  className="w-full bg-[#161616] border border-white/10 rounded-lg px-3.5 py-2.5 text-white placeholder-white/30 text-xs focus:outline-none focus:border-brand-red font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-white/70 mb-1.5">
                  Email Address (Login Username)
                </label>
                <input
                  type="email"
                  required
                  placeholder="alex@createforbrands.com"
                  value={addForm.email}
                  onChange={(e) => setAddForm({ ...addForm, email: e.target.value })}
                  className="w-full bg-[#161616] border border-white/10 rounded-lg px-3.5 py-2.5 text-white placeholder-white/30 text-xs focus:outline-none focus:border-brand-red font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-white/70 mb-1.5">
                    Role
                  </label>
                  <select
                    value={addForm.role}
                    onChange={(e) => setAddForm({ ...addForm, role: e.target.value as AdminRole })}
                    className="w-full bg-[#161616] border border-white/10 rounded-lg px-3.5 py-2.5 text-white text-xs focus:outline-none focus:border-brand-red font-mono cursor-pointer"
                  >
                    <option value="ADMIN">ADMIN</option>
                    <option value="SUPER_ADMIN">SUPER ADMIN</option>
                    <option value="EDITOR">EDITOR</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-white/70 mb-1.5">
                    Status
                  </label>
                  <select
                    value={addForm.status}
                    onChange={(e) => setAddForm({ ...addForm, status: e.target.value as AdminStatus })}
                    className="w-full bg-[#161616] border border-white/10 rounded-lg px-3.5 py-2.5 text-white text-xs focus:outline-none focus:border-brand-red font-mono cursor-pointer"
                  >
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="INACTIVE">INACTIVE</option>
                  </select>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-mono uppercase tracking-widest text-white/70">
                    Password (Min 8 Characters)
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      const gen = generatePassword();
                      setAddForm({ ...addForm, password: gen });
                    }}
                    className="text-[11px] font-mono text-brand-red hover:underline cursor-pointer"
                  >
                    Generate Strong Password
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showAddPassword ? "text" : "password"}
                    required
                    value={addForm.password}
                    onChange={(e) => setAddForm({ ...addForm, password: e.target.value })}
                    className="w-full bg-[#161616] border border-white/10 rounded-lg pl-3.5 pr-20 py-2.5 text-white placeholder-white/30 text-xs focus:outline-none focus:border-brand-red font-mono"
                  />
                  <div className="absolute right-2 top-2 flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => copyToClipboard(addForm.password)}
                      title="Copy password"
                      className="p-1 rounded text-white/40 hover:text-white cursor-pointer"
                    >
                      {copiedPass ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddPassword(!showAddPassword)}
                      className="p-1 rounded text-white/40 hover:text-white cursor-pointer"
                    >
                      {showAddPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="px-4 py-2 border border-white/10 text-white/70 hover:text-white rounded-lg text-xs font-mono uppercase cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingAdd}
                  className="px-5 py-2 bg-brand-red hover:bg-white hover:text-black text-white font-bold text-xs font-mono uppercase tracking-wider rounded-lg transition-colors cursor-pointer disabled:opacity-50 flex items-center gap-2"
                >
                  {submittingAdd ? (
                    <>
                      <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      <span>Creating...</span>
                    </>
                  ) : (
                    <span>Create Administrator</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────
          MODAL 2: CHANGE MY PASSWORD (Self-Service)
      ────────────────────────────────────────────── */}
      {isChangeMyPassOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0e0e0e] border border-white/20 rounded-2xl max-w-md w-full p-6 md:p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
              <div>
                <h3 className="text-xl font-display font-bold uppercase tracking-tight text-white flex items-center gap-2">
                  <Key className="w-5 h-5 text-brand-red" />
                  <span>Change My Password</span>
                </h3>
                <p className="text-xs font-mono text-white/50 mt-0.5">
                  Update credentials for current active session
                </p>
              </div>
              <button
                onClick={() => setIsChangeMyPassOpen(false)}
                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleMyPassSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-white/70 mb-1.5">
                  Current Password
                </label>
                <input
                  type={showMyPass ? "text" : "password"}
                  required
                  value={myPassForm.currentPassword}
                  onChange={(e) => setMyPassForm({ ...myPassForm, currentPassword: e.target.value })}
                  placeholder="••••••••••••"
                  className="w-full bg-[#161616] border border-white/10 rounded-lg px-3.5 py-2.5 text-white placeholder-white/30 text-xs focus:outline-none focus:border-brand-red font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-white/70 mb-1.5">
                  New Password (Min 8 Characters)
                </label>
                <input
                  type={showMyPass ? "text" : "password"}
                  required
                  value={myPassForm.newPassword}
                  onChange={(e) => setMyPassForm({ ...myPassForm, newPassword: e.target.value })}
                  placeholder="••••••••••••"
                  className="w-full bg-[#161616] border border-white/10 rounded-lg px-3.5 py-2.5 text-white placeholder-white/30 text-xs focus:outline-none focus:border-brand-red font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-white/70 mb-1.5">
                  Confirm New Password
                </label>
                <input
                  type={showMyPass ? "text" : "password"}
                  required
                  value={myPassForm.confirmPassword}
                  onChange={(e) => setMyPassForm({ ...myPassForm, confirmPassword: e.target.value })}
                  placeholder="••••••••••••"
                  className="w-full bg-[#161616] border border-white/10 rounded-lg px-3.5 py-2.5 text-white placeholder-white/30 text-xs focus:outline-none focus:border-brand-red font-mono"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="showMyPassCheck"
                  checked={showMyPass}
                  onChange={(e) => setShowMyPass(e.target.checked)}
                  className="rounded border-white/20 cursor-pointer"
                />
                <label htmlFor="showMyPassCheck" className="text-xs font-mono text-white/60 cursor-pointer">
                  Show passwords
                </label>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsChangeMyPassOpen(false)}
                  className="px-4 py-2 border border-white/10 text-white/70 hover:text-white rounded-lg text-xs font-mono uppercase cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingMyPass}
                  className="px-5 py-2 bg-brand-red hover:bg-white hover:text-black text-white font-bold text-xs font-mono uppercase tracking-wider rounded-lg transition-colors cursor-pointer disabled:opacity-50 flex items-center gap-2"
                >
                  {submittingMyPass ? (
                    <>
                      <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      <span>Updating...</span>
                    </>
                  ) : (
                    <span>Update Password</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────
          MODAL 3: RESET OTHER ADMIN'S PASSWORD
      ────────────────────────────────────────────── */}
      {resettingUser && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0e0e0e] border border-white/20 rounded-2xl max-w-md w-full p-6 md:p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
              <div>
                <h3 className="text-xl font-display font-bold uppercase tracking-tight text-white flex items-center gap-2">
                  <Key className="w-5 h-5 text-amber-400" />
                  <span>Reset Password</span>
                </h3>
                <p className="text-xs font-mono text-white/50 mt-0.5">
                  Set new password for {resettingUser.email}
                </p>
              </div>
              <button
                onClick={() => setResettingUser(null)}
                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleResetPassSubmit} className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-mono uppercase tracking-widest text-white/70">
                    New Password
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      const gen = generatePassword();
                      setResetPassForm({ newPassword: gen, confirmPassword: gen });
                    }}
                    className="text-[11px] font-mono text-brand-red hover:underline cursor-pointer"
                  >
                    Generate Strong Password
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showResetPass ? "text" : "password"}
                    required
                    value={resetPassForm.newPassword}
                    onChange={(e) => setResetPassForm({ ...resetPassForm, newPassword: e.target.value })}
                    placeholder="••••••••••••"
                    className="w-full bg-[#161616] border border-white/10 rounded-lg pl-3.5 pr-10 py-2.5 text-white placeholder-white/30 text-xs focus:outline-none focus:border-brand-red font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => copyToClipboard(resetPassForm.newPassword)}
                    title="Copy password"
                    className="absolute right-2 top-2 p-1 text-white/40 hover:text-white cursor-pointer"
                  >
                    {copiedPass ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-white/70 mb-1.5">
                  Confirm New Password
                </label>
                <input
                  type={showResetPass ? "text" : "password"}
                  required
                  value={resetPassForm.confirmPassword}
                  onChange={(e) => setResetPassForm({ ...resetPassForm, confirmPassword: e.target.value })}
                  placeholder="••••••••••••"
                  className="w-full bg-[#161616] border border-white/10 rounded-lg px-3.5 py-2.5 text-white placeholder-white/30 text-xs focus:outline-none focus:border-brand-red font-mono"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="showResetPassCheck"
                  checked={showResetPass}
                  onChange={(e) => setShowResetPass(e.target.checked)}
                  className="rounded border-white/20 cursor-pointer"
                />
                <label htmlFor="showResetPassCheck" className="text-xs font-mono text-white/60 cursor-pointer">
                  Show passwords
                </label>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setResettingUser(null)}
                  className="px-4 py-2 border border-white/10 text-white/70 hover:text-white rounded-lg text-xs font-mono uppercase cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingResetPass}
                  className="px-5 py-2 bg-brand-red hover:bg-white hover:text-black text-white font-bold text-xs font-mono uppercase tracking-wider rounded-lg transition-colors cursor-pointer disabled:opacity-50 flex items-center gap-2"
                >
                  {submittingResetPass ? (
                    <>
                      <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <span>Save Password</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────
          MODAL 4: EDIT DETAILS & ROLE
      ────────────────────────────────────────────── */}
      {editingUser && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0e0e0e] border border-white/20 rounded-2xl max-w-lg w-full p-6 md:p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
              <div>
                <h3 className="text-xl font-display font-bold uppercase tracking-tight text-white flex items-center gap-2">
                  <Edit2 className="w-5 h-5 text-brand-red" />
                  <span>Edit Administrator</span>
                </h3>
                <p className="text-xs font-mono text-white/50 mt-0.5">
                  Update account profile, role assignment and status
                </p>
              </div>
              <button
                onClick={() => setEditingUser(null)}
                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-white/70 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full bg-[#161616] border border-white/10 rounded-lg px-3.5 py-2.5 text-white text-xs focus:outline-none focus:border-brand-red font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-white/70 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  className="w-full bg-[#161616] border border-white/10 rounded-lg px-3.5 py-2.5 text-white text-xs focus:outline-none focus:border-brand-red font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-white/70 mb-1.5">
                    Role
                  </label>
                  <select
                    value={editForm.role}
                    onChange={(e) => setEditForm({ ...editForm, role: e.target.value as AdminRole })}
                    className="w-full bg-[#161616] border border-white/10 rounded-lg px-3.5 py-2.5 text-white text-xs focus:outline-none focus:border-brand-red font-mono cursor-pointer"
                  >
                    <option value="ADMIN">ADMIN</option>
                    <option value="SUPER_ADMIN">SUPER ADMIN</option>
                    <option value="EDITOR">EDITOR</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-white/70 mb-1.5">
                    Status
                  </label>
                  <select
                    value={editForm.status}
                    onChange={(e) => setEditForm({ ...editForm, status: e.target.value as AdminStatus })}
                    className="w-full bg-[#161616] border border-white/10 rounded-lg px-3.5 py-2.5 text-white text-xs focus:outline-none focus:border-brand-red font-mono cursor-pointer"
                  >
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="INACTIVE">INACTIVE</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="px-4 py-2 border border-white/10 text-white/70 hover:text-white rounded-lg text-xs font-mono uppercase cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingEdit}
                  className="px-5 py-2 bg-brand-red hover:bg-white hover:text-black text-white font-bold text-xs font-mono uppercase tracking-wider rounded-lg transition-colors cursor-pointer disabled:opacity-50 flex items-center gap-2"
                >
                  {submittingEdit ? (
                    <>
                      <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <span>Save Changes</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
