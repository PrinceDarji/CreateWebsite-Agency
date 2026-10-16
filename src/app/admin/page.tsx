"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { RefreshCw, ExternalLink, Shield, CheckCircle2, Menu } from "lucide-react";
import {
  AdminSidebar,
  AdminTab,
} from "@/components/admin/AdminSidebar";
import { DashboardOverview } from "@/components/admin/DashboardOverview";
import { HomepageEditor } from "@/components/admin/HomepageEditor";
import { ServicesManager } from "@/components/admin/ServicesManager";
import { BlogManager } from "@/components/admin/BlogManager";
import { CampaignsManager } from "@/components/admin/CampaignsManager";
import { MediaLibrary } from "@/components/admin/MediaLibrary";
import { SeoManager } from "@/components/admin/SeoManager";
import { GlobalSettingsManager } from "@/components/admin/GlobalSettingsManager";
import { LeadsManager, Lead } from "@/components/admin/LeadsManager";
import { SystemManager } from "@/components/admin/SystemManager";
import { AdminsManager } from "@/components/admin/AdminsManager";
import {
  BlogPost,
  HomepageSection,
  ServiceItem,
  CampaignReport,
  MediaAsset,
  SiteSettings,
  RedirectRule,
  AuditLogEntry,
  AdminRole,
} from "@/lib/cms/types";

export default function AdminPage() {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentUser, setCurrentUser] = useState<{
    id?: string;
    email?: string;
    name?: string;
    role?: AdminRole;
  } | null>(null);
  const [authError, setAuthError] = useState("");
  const [submittingAuth, setSubmittingAuth] = useState(false);

  // Authentication mode: "login" | "forgot" | "reset"
  const [loginMode, setLoginMode] = useState<"login" | "forgot" | "reset">("login");
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotMsg, setForgotMsg] = useState<{ text: string; rescueLink?: string } | null>(null);
  const [submittingForgot, setSubmittingForgot] = useState(false);

  // Password reset via token
  const [resetToken, setResetToken] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [newResetPassword, setNewResetPassword] = useState("");
  const [confirmResetPassword, setConfirmResetPassword] = useState("");
  const [resetSuccessMsg, setResetSuccessMsg] = useState<string | null>(null);
  const [submittingReset, setSubmittingReset] = useState(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // CMS Data State
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loadingLeads, setLoadingLeads] = useState(false);
  const [supabaseConfigured, setSupabaseConfigured] = useState<boolean | null>(null);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const [homepageSections, setHomepageSections] = useState<HomepageSection[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [campaignReports, setCampaignReports] = useState<CampaignReport[]>([]);
  const [media, setMedia] = useState<MediaAsset[]>([]);
  const [redirects, setRedirects] = useState<RedirectRule[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([]);
  const [systemHealth, setSystemHealth] = useState<any>(null);
  const [syncingAll, setSyncingAll] = useState(false);

  // Media Picker Modal State (for blog/homepage picker)
  const [mediaPickerCallback, setMediaPickerCallback] = useState<
    ((url: string) => void) | null
  >(null);

  // Fetch all CMS modules
  const loadAllData = useCallback(async () => {
    setSyncingAll(true);
    try {
      const [
        leadsRes,
        homeRes,
        servicesRes,
        settingsRes,
        blogsRes,
        reportsRes,
        mediaRes,
        redirectsRes,
        auditRes,
        healthRes,
      ] = await Promise.allSettled([
        fetch("/api/admin/leads").then((r) => r.json()),
        fetch("/api/admin/homepage").then((r) => r.json()),
        fetch("/api/admin/services").then((r) => r.json()),
        fetch("/api/admin/settings").then((r) => r.json()),
        fetch("/api/admin/blogs").then((r) => r.json()),
        fetch("/api/admin/campaign-reports").then((r) => r.json()),
        fetch("/api/admin/media").then((r) => r.json()),
        fetch("/api/admin/redirects").then((r) => r.json()),
        fetch("/api/admin/audit-logs").then((r) => r.json()),
        fetch("/api/admin/system").then((r) => r.json()),
      ]);

      if (leadsRes.status === "fulfilled" && leadsRes.value) {
        setLeads(leadsRes.value.leads || []);
        setSupabaseConfigured(leadsRes.value.supabaseConfigured);
      }
      if (homeRes.status === "fulfilled" && homeRes.value) {
        setHomepageSections(homeRes.value.sections || []);
      }
      if (servicesRes.status === "fulfilled" && servicesRes.value) {
        setServices(servicesRes.value.services || []);
      }
      if (settingsRes.status === "fulfilled" && settingsRes.value) {
        setSiteSettings(settingsRes.value.settings || null);
      }
      if (blogsRes.status === "fulfilled" && blogsRes.value) {
        setBlogs(blogsRes.value.blogs || []);
      }
      if (reportsRes.status === "fulfilled" && reportsRes.value) {
        setCampaignReports(reportsRes.value.reports || []);
      }
      if (mediaRes.status === "fulfilled" && mediaRes.value) {
        setMedia(mediaRes.value.media || []);
      }
      if (redirectsRes.status === "fulfilled" && redirectsRes.value) {
        setRedirects(redirectsRes.value.redirects || []);
      }
      if (auditRes.status === "fulfilled" && auditRes.value) {
        setAuditLogs(auditRes.value.logs || []);
      }
      if (healthRes.status === "fulfilled" && healthRes.value) {
        setSystemHealth(healthRes.value);
      }
    } catch (err) {
      console.error("[CMS_DATA_SYNC_ERROR]", err);
    } finally {
      setSyncingAll(false);
    }
  }, []);

  // Check for password reset token in URL parameters
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const action = params.get("action");
      const token = params.get("token");
      const emailParam = params.get("email");

      if (action === "reset" && token && emailParam) {
        setLoginMode("reset");
        setResetToken(token);
        setResetEmail(emailParam);
      }
    }
  }, []);

  // Check auth session on initial mount
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/admin/auth");
        const data = await res.json();
        if (data.authenticated) {
          setAuthenticated(true);
          setCurrentUser(data.user || null);
          loadAllData();
        }
      } catch (err) {
        console.error("Auth check failed:", err);
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, [loadAllData]);

  // Handle Login (Email + Password)
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setAuthError("");
    setSubmittingAuth(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "login", email: email.trim(), password }),
      });

      const data = await res.json();
      if (res.ok && data.authenticated) {
        setAuthenticated(true);
        setCurrentUser(data.user || null);
        setPassword("");
        loadAllData();
      } else {
        setAuthError(data.error || "Invalid email or password");
      }
    } catch {
      setAuthError("Failed to authenticate. Please try again.");
    } finally {
      setSubmittingAuth(false);
    }
  }

  // Handle Forgot Password
  async function handleForgotPassword(e: React.FormEvent) {
    e.preventDefault();
    setAuthError("");
    setForgotMsg(null);
    setSubmittingForgot(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "forgot-password", email: forgotEmail }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setForgotMsg({
          text: data.message || "Password reset instructions dispatched.",
          rescueLink: data.rescueLink,
        });
      } else {
        setAuthError(data.error || "Failed to process password reset request.");
      }
    } catch {
      setAuthError("Failed to request password reset. Please try again.");
    } finally {
      setSubmittingForgot(false);
    }
  }

  // Handle Reset Password (token submission)
  async function handleResetPassword(e: React.FormEvent) {
    e.preventDefault();
    setAuthError("");

    if (newResetPassword !== confirmResetPassword) {
      setAuthError("Passwords do not match");
      return;
    }
    if (newResetPassword.length < 8) {
      setAuthError("Password must be at least 8 characters long");
      return;
    }

    setSubmittingReset(true);
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "reset-password",
          email: resetEmail,
          token: resetToken,
          newPassword: newResetPassword,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setResetSuccessMsg("Password reset successfully! You can now log in with your new password.");
        setEmail(resetEmail);
        setLoginMode("login");
        if (typeof window !== "undefined") {
          window.history.replaceState({}, "", "/admin");
        }
      } else {
        setAuthError(data.error || "Failed to reset password. The link may have expired.");
      }
    } catch {
      setAuthError("Failed to update password. Please try again.");
    } finally {
      setSubmittingReset(false);
    }
  }

  // Handle Logout
  async function handleLogout() {
    try {
      await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "logout" }),
      });
      setAuthenticated(false);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  }

  // Update Lead Status
  async function handleUpdateLeadStatus(id: string, newStatus: string) {
    try {
      const res = await fetch("/api/admin/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setLeads((prev) =>
          prev.map((lead) =>
            lead.id === id ? { ...lead, status: newStatus as any } : lead
          )
        );
        if (selectedLead?.id === id) {
          setSelectedLead((prev) =>
            prev ? { ...prev, status: newStatus as any } : null
          );
        }
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  }

  // Loading Screen
  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-brand-red border-t-transparent rounded-full animate-spin" />
          <span className="font-mono text-xs uppercase tracking-widest text-white/50">
            Checking studio authorization...
          </span>
        </div>
      </div>
    );
  }

  // Login, Forgot Password, and Reset Password Views
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex flex-col justify-center items-center px-6 py-12">
        <div className="w-full max-w-md p-8 md:p-10 bg-[#0c0c0c] border border-white/10 rounded-2xl shadow-2xl">
          <div className="text-center mb-8">
            <span className="text-[10px] font-mono tracking-widest uppercase text-brand-red font-semibold block mb-2">
              STUDIO PORTAL
            </span>
            <h1 className="text-3xl font-display font-bold uppercase tracking-tight text-white mb-2">
              CREATE. CMS
            </h1>
            <p className="text-white/50 text-sm">
              {loginMode === "login" && "Enter your email and password to access the website management portal."}
              {loginMode === "forgot" && "Enter your administrator email to receive a secure password reset link."}
              {loginMode === "reset" && `Set a new password for ${resetEmail || "your administrator account"}.`}
            </p>
          </div>

          {/* MODE 1: SET NEW PASSWORD (Via Reset Token) */}
          {loginMode === "reset" && (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-white/70 mb-2">
                  New Password (Min 8 Characters)
                </label>
                <input
                  type="password"
                  value={newResetPassword}
                  onChange={(e) => setNewResetPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  autoFocus
                  minLength={8}
                  className="w-full bg-[#141414] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-brand-red transition-colors text-sm font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-white/70 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={confirmResetPassword}
                  onChange={(e) => setConfirmResetPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  minLength={8}
                  className="w-full bg-[#141414] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-brand-red transition-colors text-sm font-mono"
                />
              </div>

              {authError && (
                <div className="p-3 rounded bg-red-950/40 border border-red-500/30 text-red-400 text-xs font-mono">
                  {authError}
                </div>
              )}

              <button
                type="submit"
                disabled={submittingReset}
                className="w-full bg-brand-red hover:bg-white hover:text-black text-white font-bold uppercase tracking-widest text-xs py-3.5 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer shadow-lg"
              >
                {submittingReset ? (
                  <>
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <span>Update Password & Log In</span>
                )}
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setAuthError("");
                    setLoginMode("login");
                  }}
                  className="text-xs font-mono text-white/40 hover:text-white transition-colors cursor-pointer"
                >
                  ← Back to Login
                </button>
              </div>
            </form>
          )}

          {/* MODE 2: FORGOT PASSWORD */}
          {loginMode === "forgot" && (
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-white/70 mb-2">
                  Administrator Email
                </label>
                <input
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="admin@createforbrands.com"
                  required
                  autoFocus
                  className="w-full bg-[#141414] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-brand-red transition-colors text-sm font-mono"
                />
              </div>

              {authError && (
                <div className="p-3 rounded bg-red-950/40 border border-red-500/30 text-red-400 text-xs font-mono">
                  {authError}
                </div>
              )}

              {forgotMsg && (
                <div className="p-3.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-mono space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{forgotMsg.text}</span>
                  </div>

                  {forgotMsg.rescueLink && (
                    <div className="mt-2 pt-2 border-t border-emerald-500/20 text-white/80">
                      <span className="text-amber-400 font-bold block mb-1">Development Rescue Link:</span>
                      <a
                        href={forgotMsg.rescueLink}
                        className="text-brand-red hover:underline break-all font-bold block"
                      >
                        Click here to reset your password now →
                      </a>
                    </div>
                  )}
                </div>
              )}

              <button
                type="submit"
                disabled={submittingForgot}
                className="w-full bg-brand-red hover:bg-white hover:text-black text-white font-bold uppercase tracking-widest text-xs py-3.5 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer shadow-lg"
              >
                {submittingForgot ? (
                  <>
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    <span>Sending Link...</span>
                  </>
                ) : (
                  <span>Send Password Reset Link</span>
                )}
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setAuthError("");
                    setForgotMsg(null);
                    setLoginMode("login");
                  }}
                  className="text-xs font-mono text-white/40 hover:text-white transition-colors cursor-pointer"
                >
                  ← Back to Login
                </button>
              </div>
            </form>
          )}

          {/* MODE 3: LOGIN (EMAIL + PASSWORD) */}
          {loginMode === "login" && (
            <form onSubmit={handleLogin} className="space-y-4">
              {resetSuccessMsg && (
                <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{resetSuccessMsg}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-white/70 mb-2">
                  Email or Username
                </label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@createforbrands.com"
                  required
                  autoFocus
                  autoComplete="username"
                  className="w-full bg-[#141414] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-brand-red transition-colors text-sm font-mono"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-mono uppercase tracking-widest text-white/70">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setAuthError("");
                      setForgotEmail(email);
                      setForgotMsg(null);
                      setLoginMode("forgot");
                    }}
                    className="text-[11px] font-mono text-brand-red hover:underline cursor-pointer"
                  >
                    Forgot password?
                  </button>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  autoComplete="current-password"
                  className="w-full bg-[#141414] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-brand-red transition-colors text-sm font-mono"
                />
              </div>

              {authError && (
                <div className="p-3 rounded bg-red-950/40 border border-red-500/30 text-red-400 text-xs font-mono">
                  {authError}
                </div>
              )}

              <button
                type="submit"
                disabled={submittingAuth}
                className="w-full bg-brand-red hover:bg-white hover:text-black text-white font-bold uppercase tracking-widest text-xs py-4 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer shadow-lg"
              >
                {submittingAuth ? (
                  <>
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <span>Access Dashboard</span>
                )}
              </button>
            </form>
          )}

          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <Link
              href="/"
              className="text-xs font-mono uppercase tracking-widest text-white/40 hover:text-white transition-colors"
            >
              ← Return to Main Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const newLeadsCount = leads.filter((l) => l.status === "NEW").length;

  // Active Tab Title and Subtitle Mapping
  const tabHeaders: Record<AdminTab, { title: string; subtitle: string }> = {
    overview: {
      title: "Dashboard Overview",
      subtitle: "Studio performance metrics, publishing shortcuts, and recent activity stream",
    },
    homepage: {
      title: "Homepage Layout & Content",
      subtitle: "Reorder sections, update hero copy, toggle visibility, and configure CTAs",
    },
    services: {
      title: "Studio Services (12)",
      subtitle: "Manage all 11 approved service pages + Influencer Marketing SEO and copy",
    },
    settings: {
      title: "Global Site Settings",
      subtitle: "Brand identity, contact email, social channels, and default meta",
    },
    blogs: {
      title: "Editorial Blog & Insights",
      subtitle: "Create, edit, schedule articles, and restore past revisions",
    },
    campaigns: {
      title: "Campaign Reports & Portfolio",
      subtitle: "Publish client case studies, deliverables, and ROI analytics",
    },
    media: {
      title: "Universal Media Library",
      subtitle: "Upload and manage high-resolution assets with safe-delete protection",
    },
    seo: {
      title: "SEO, Sitemap & Redirects",
      subtitle: "Configure 301/308 redirect rules and inspect live search engine indexing",
    },
    leads: {
      title: "Inbound Leads Pipeline",
      subtitle: "Manage new prospective client inquiries and project submissions",
    },
    admins: {
      title: "Studio Admins & Team Access",
      subtitle: "Provision administrators, update email credentials, reset passwords, and manage RBAC roles",
    },
    system: {
      title: "System Health & Security",
      subtitle: "Inspect database connectivity, email dispatch, and audit logs",
    },
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col md:flex-row font-sans relative">
      {/* Mobile Top Header (Visible on mobile/tablet only) */}
      <div className="md:hidden flex items-center justify-between px-5 py-4 bg-[#080808] border-b border-white/10 sticky top-0 z-40 select-none">
        <div className="flex items-center gap-2 pointer-events-none">
          <span className="font-display font-bold text-lg text-white">CREATE.</span>
          <span className="text-[9px] font-mono uppercase bg-brand-red text-white px-1.5 py-0.5 rounded font-bold">
            CMS
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          <span className="text-[11px] font-mono uppercase text-white/50 bg-white/5 px-2 py-0.5 rounded border border-white/10">
            {tabHeaders[activeTab]?.title.split(" ")[0]}
          </span>
          <button
            onClick={() => setIsMobileSidebarOpen(true)}
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 cursor-pointer"
            aria-label="Open CMS navigation"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Sidebar Navigation (Desktop Sticky + Mobile Drawer) */}
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        newLeadsCount={newLeadsCount}
        onLogout={handleLogout}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto min-w-0">
        {/* Admin Top Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-white/10 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold uppercase tracking-tight text-white">
              {tabHeaders[activeTab]?.title}
            </h1>
            <p className="text-white/50 text-xs md:text-sm mt-1">
              {tabHeaders[activeTab]?.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {currentUser && (
              <button
                onClick={() => setActiveTab("admins")}
                className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono transition-colors cursor-pointer text-left"
                title="Manage administrator account & password"
              >
                <span className="text-white/40">Logged in as</span>
                <span className="text-white font-bold">{currentUser.name || currentUser.email}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded font-bold uppercase bg-brand-red/20 text-brand-red border border-brand-red/30">
                  {currentUser.role}
                </span>
              </button>
            )}

            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Studio Operational</span>
            </div>

            <button
              onClick={loadAllData}
              disabled={syncingAll}
              className="flex items-center gap-1.5 px-3.5 py-2 border border-white/20 hover:border-white rounded text-xs font-mono uppercase tracking-widest transition-colors cursor-pointer disabled:opacity-50"
              title="Refresh all CMS data"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${syncingAll ? "animate-spin" : ""}`} />
              <span>{syncingAll ? "Syncing..." : "Sync All"}</span>
            </button>

            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 bg-white/10 hover:bg-white hover:text-black rounded text-xs font-mono uppercase tracking-wider text-white transition-colors flex items-center gap-1.5"
              title="Preview public site in new tab"
            >
              <span>View Site</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Tab 1: Dashboard Overview */}
        {activeTab === "overview" && (
          <DashboardOverview
            leads={leads}
            blogs={blogs}
            media={media}
            auditLogs={auditLogs}
            supabaseConfigured={supabaseConfigured}
            onNavigate={(tab) => setActiveTab(tab)}
            onSelectLead={(lead) => setSelectedLead(lead)}
            onNewBlog={() => setActiveTab("blogs")}
          />
        )}

        {/* Tab 2: Homepage Section Editor */}
        {activeTab === "homepage" && (
          <HomepageEditor
            sections={homepageSections}
            onUpdateSections={setHomepageSections}
          />
        )}

        {/* Tab 3: Services Explorer & Editor */}
        {activeTab === "services" && (
          <ServicesManager
            services={services}
            onUpdateServices={setServices}
          />
        )}

        {/* Tab 4: Global Settings */}
        {activeTab === "settings" && siteSettings && (
          <GlobalSettingsManager
            settings={siteSettings}
            onUpdateSettings={setSiteSettings}
          />
        )}

        {/* Tab 5: Blog Posts Manager */}
        {activeTab === "blogs" && (
          <BlogManager
            blogs={blogs}
            onUpdateBlogs={setBlogs}
            onOpenMediaPicker={(onSelect) => setMediaPickerCallback(() => onSelect)}
          />
        )}

        {/* Tab 6: Campaign Reports */}
        {activeTab === "campaigns" && (
          <CampaignsManager
            reports={campaignReports}
            onUpdateReports={setCampaignReports}
          />
        )}

        {/* Tab 7: Universal Media Library */}
        {activeTab === "media" && (
          <MediaLibrary
            media={media}
            onUpdateMedia={setMedia}
          />
        )}

        {/* Tab 8: SEO & Redirects */}
        {activeTab === "seo" && (
          <SeoManager
            redirects={redirects}
            onUpdateRedirects={setRedirects}
          />
        )}

        {/* Tab 9: Leads Pipeline */}
        {activeTab === "leads" && (
          <LeadsManager
            leads={leads}
            supabaseConfigured={supabaseConfigured}
            onUpdateLeadStatus={handleUpdateLeadStatus}
            selectedLead={selectedLead}
            onSelectLead={setSelectedLead}
          />
        )}

        {/* Tab 10: Studio Admins & Team Access */}
        {activeTab === "admins" && (
          <AdminsManager currentUser={currentUser || undefined} />
        )}

        {/* Tab 11: System Health & Security */}
        {activeTab === "system" && (
          <SystemManager
            systemHealth={systemHealth}
            auditLogs={auditLogs}
            loadingHealth={syncingAll}
            onRefreshHealth={loadAllData}
          />
        )}
      </main>

      {/* Media Picker Helper Modal */}
      {mediaPickerCallback && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-6">
          <div className="bg-[#0c0c0c] border border-white/20 rounded-2xl max-w-4xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
              <div>
                <h3 className="text-xl font-display font-bold uppercase text-white">
                  Select Media Asset
                </h3>
                <p className="text-xs font-mono text-white/50">
                  Click on any asset to insert its URL into your document
                </p>
              </div>
              <button
                onClick={() => setMediaPickerCallback(null)}
                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>
            <MediaLibrary
              media={media}
              onUpdateMedia={setMedia}
              onSelectAsset={(url) => {
                mediaPickerCallback(url);
                setMediaPickerCallback(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
