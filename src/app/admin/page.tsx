"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Lead {
  id: string;
  name: string;
  company?: string;
  email: string;
  phone?: string;
  website?: string;
  service?: string;
  project_type?: string;
  budget?: string;
  message: string;
  status: "NEW" | "CONTACTED" | "QUALIFIED" | "IN_PROGRESS" | "CONVERTED" | "CLOSED";
  created_at: string;
}

const servicesList = [
  { name: "Brand & Visual Design", slug: "brand-visual-design" },
  { name: "Branded Content", slug: "branded-content" },
  { name: "Campaign Production", slug: "campaign-production" },
  { name: "Commercial Production", slug: "commercial-production" },
  { name: "Content Marketing", slug: "content-marketing" },
  { name: "Creative Direction", slug: "creative-direction" },
  { name: "Performance Marketing", slug: "performance-marketing" },
  { name: "Post-Production", slug: "post-production" },
  { name: "Social Media Marketing", slug: "social-media-marketing" },
  { name: "Visual Storytelling", slug: "visual-storytelling" },
  { name: "Website Development", slug: "website-development" },
  { name: "Influencer Marketing", slug: "influencer-marketing" }
];

export default function AdminPage() {
  const [loading, setLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [submittingAuth, setSubmittingAuth] = useState(false);

  // Dashboard state
  const [activeTab, setActiveTab] = useState<"overview" | "leads" | "services" | "system">("overview");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loadingLeads, setLoadingLeads] = useState(false);
  const [supabaseConfigured, setSupabaseConfigured] = useState<boolean | null>(null);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [updatingLeadId, setUpdatingLeadId] = useState<string | null>(null);

  // Check auth session on load
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/admin/auth");
        const data = await res.json();
        if (data.authenticated) {
          setAuthenticated(true);
          fetchLeads();
        }
      } catch (err) {
        console.error("Auth check failed:", err);
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setAuthError("");
    setSubmittingAuth(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "login", password }),
      });

      const data = await res.json();
      if (res.ok && data.authenticated) {
        setAuthenticated(true);
        setPassword("");
        fetchLeads();
      } else {
        setAuthError(data.error || "Invalid password");
      }
    } catch {
      setAuthError("Failed to authenticate. Please try again.");
    } finally {
      setSubmittingAuth(false);
    }
  }

  async function handleLogout() {
    try {
      await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "logout" }),
      });
      setAuthenticated(false);
      setLeads([]);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  }

  async function fetchLeads() {
    setLoadingLeads(true);
    try {
      const res = await fetch("/api/admin/leads");
      const data = await res.json();
      if (res.ok) {
        setLeads(data.leads || []);
        setSupabaseConfigured(data.supabaseConfigured);
      }
    } catch (err) {
      console.error("Failed to load leads:", err);
    } finally {
      setLoadingLeads(false);
    }
  }

  async function updateLeadStatus(id: string, newStatus: string) {
    setUpdatingLeadId(id);
    try {
      const res = await fetch("/api/admin/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setLeads((prev) =>
          prev.map((lead) => (lead.id === id ? { ...lead, status: newStatus as any } : lead))
        );
        if (selectedLead?.id === id) {
          setSelectedLead((prev) => (prev ? { ...prev, status: newStatus as any } : null));
        }
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      setUpdatingLeadId(null);
    }
  }

  // Filtered leads
  const filteredLeads = leads.filter((lead) => {
    const matchesStatus = statusFilter === "ALL" || lead.status === statusFilter;
    const matchesSearch =
      searchQuery === "" ||
      lead.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.service?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const newLeadsCount = leads.filter((l) => l.status === "NEW").length;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-brand-red border-t-transparent rounded-full animate-spin" />
          <span className="font-mono text-xs uppercase tracking-widest text-white/50">
            Checking authentication...
          </span>
        </div>
      </div>
    );
  }

  // ──────────────────────────────────────────────
  // LOGIN SCREEN
  // ──────────────────────────────────────────────
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex flex-col justify-center items-center px-6">
        <div className="w-full max-w-md p-8 md:p-10 bg-[#0c0c0c] border border-white/10 rounded-2xl shadow-2xl">
          <div className="text-center mb-8">
            <span className="text-[10px] font-mono tracking-widest uppercase text-brand-red font-semibold block mb-2">
              STUDIO PORTAL
            </span>
            <h1 className="text-3xl font-display font-bold uppercase tracking-tight text-white mb-2">
              CREATE. CMS
            </h1>
            <p className="text-white/50 text-sm">
              Enter your admin credentials to access the management portal.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-white/70 mb-2">
                Admin Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                autoFocus
                className="w-full bg-[#141414] border border-white/10 rounded-lg px-4 py-3.5 text-white placeholder-white/20 focus:outline-none focus:border-brand-red transition-colors text-sm"
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

  // ──────────────────────────────────────────────
  // AUTHENTICATED CMS DASHBOARD
  // ──────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 border-r border-white/10 p-6 flex flex-col shrink-0 bg-[#080808]">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="font-display font-bold text-xl tracking-tighter text-white">
              CREATE. <span className="text-brand-red text-sm font-mono">CMS</span>
            </div>
            <span className="text-[10px] font-mono tracking-widest uppercase text-white/40">
              Studio Operations
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <nav className="flex flex-row md:flex-col gap-2 font-mono text-xs uppercase tracking-widest overflow-x-auto pb-4 md:pb-0">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-3 rounded-lg text-left transition-colors flex items-center justify-between cursor-pointer ${
              activeTab === "overview"
                ? "bg-brand-red text-white font-bold"
                : "text-white/60 hover:text-white hover:bg-white/5"
            }`}
          >
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab("leads")}
            className={`px-4 py-3 rounded-lg text-left transition-colors flex items-center justify-between cursor-pointer ${
              activeTab === "leads"
                ? "bg-brand-red text-white font-bold"
                : "text-white/60 hover:text-white hover:bg-white/5"
            }`}
          >
            <span>Leads</span>
            {newLeadsCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-white text-black text-[10px] font-bold">
                {newLeadsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("services")}
            className={`px-4 py-3 rounded-lg text-left transition-colors flex items-center justify-between cursor-pointer ${
              activeTab === "services"
                ? "bg-brand-red text-white font-bold"
                : "text-white/60 hover:text-white hover:bg-white/5"
            }`}
          >
            <span>Services (11)</span>
          </button>

          <button
            onClick={() => setActiveTab("system")}
            className={`px-4 py-3 rounded-lg text-left transition-colors flex items-center justify-between cursor-pointer ${
              activeTab === "system"
                ? "bg-brand-red text-white font-bold"
                : "text-white/60 hover:text-white hover:bg-white/5"
            }`}
          >
            <span>System Health</span>
          </button>
        </nav>

        {/* Sidebar Footer */}
        <div className="mt-auto pt-6 border-t border-white/10 flex flex-col gap-3">
          <Link
            href="/"
            target="_blank"
            className="text-xs font-mono uppercase tracking-widest text-white/50 hover:text-white transition-colors"
          >
            ↗ Open Website
          </Link>
          <button
            onClick={handleLogout}
            className="text-left text-xs font-mono uppercase tracking-widest text-brand-red hover:text-white transition-colors cursor-pointer"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        {/* TOP BAR */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 mb-8 border-b border-white/10 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-display font-bold uppercase tracking-tight text-white">
              {activeTab === "overview" && "Dashboard Overview"}
              {activeTab === "leads" && "Inbound Leads Management"}
              {activeTab === "services" && "Published Studio Services"}
              {activeTab === "system" && "System Configuration & Health"}
            </h1>
            <p className="text-white/50 text-sm mt-1">
              Active Session: Admin Authorized
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchLeads}
              disabled={loadingLeads}
              className="px-4 py-2 border border-white/20 hover:border-white rounded text-xs font-mono uppercase tracking-widest transition-colors cursor-pointer disabled:opacity-50"
            >
              {loadingLeads ? "Syncing..." : "↻ Refresh"}
            </button>
            <Link
              href="/contact"
              target="_blank"
              className="px-4 py-2 bg-brand-red text-white hover:bg-white hover:text-black rounded text-xs font-bold uppercase tracking-widest transition-colors"
            >
              + Test Form
            </Link>
          </div>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === "overview" && (
          <div className="space-y-10">
            {/* Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-[#0c0c0c] p-6 rounded-xl border border-white/10">
                <span className="text-xs font-mono uppercase tracking-widest text-white/40 block mb-2">
                  Total Leads
                </span>
                <div className="text-4xl font-display font-bold text-white mb-2">
                  {leads.length}
                </div>
                <span className="text-xs font-mono text-brand-red">
                  {newLeadsCount} awaiting contact
                </span>
              </div>

              <div className="bg-[#0c0c0c] p-6 rounded-xl border border-white/10">
                <span className="text-xs font-mono uppercase tracking-widest text-white/40 block mb-2">
                  Live Services
                </span>
                <div className="text-4xl font-display font-bold text-white mb-2">
                  11 + 1
                </div>
                <span className="text-xs font-mono text-emerald-400">
                  All SSG Published
                </span>
              </div>

              <div className="bg-[#0c0c0c] p-6 rounded-xl border border-white/10">
                <span className="text-xs font-mono uppercase tracking-widest text-white/40 block mb-2">
                  Database
                </span>
                <div className="text-2xl font-display font-bold text-white mb-2">
                  {supabaseConfigured ? "Connected" : "Not Set"}
                </div>
                <span
                  className={`text-xs font-mono ${
                    supabaseConfigured ? "text-emerald-400" : "text-amber-400"
                  }`}
                >
                  {supabaseConfigured ? "Supabase Active" : "Add keys in .env.local"}
                </span>
              </div>

              <div className="bg-[#0c0c0c] p-6 rounded-xl border border-white/10">
                <span className="text-xs font-mono uppercase tracking-widest text-white/40 block mb-2">
                  Email Delivery
                </span>
                <div className="text-2xl font-display font-bold text-white mb-2">
                  Resend
                </div>
                <span className="text-xs font-mono text-white/60">
                  createforbrands@gmail.com
                </span>
              </div>
            </div>

            {/* Quick Recent Leads */}
            <div className="bg-[#0c0c0c] border border-white/10 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-display font-bold uppercase text-white">
                    Recent Submissions
                  </h2>
                  <p className="text-xs font-mono text-white/50">
                    Latest client enquiries from the contact form
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab("leads")}
                  className="text-xs font-mono uppercase tracking-widest text-brand-red hover:underline"
                >
                  View All Leads →
                </button>
              </div>

              {leads.length === 0 ? (
                <div className="text-center py-12 border border-dashed border-white/10 rounded-lg">
                  <p className="text-white/60 text-sm font-sans mb-3">
                    {supabaseConfigured === false
                      ? "Supabase is not yet connected to store leads. Check 'System Health' for instructions."
                      : "No leads submitted yet."}
                  </p>
                  <Link
                    href="/contact"
                    target="_blank"
                    className="inline-block px-4 py-2 border border-white/20 rounded text-xs font-mono uppercase text-white hover:border-brand-red hover:text-brand-red transition-colors"
                  >
                    Submit a test lead via /contact
                  </Link>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-white/5 font-mono uppercase tracking-widest text-xs text-white/60">
                      <tr>
                        <th className="p-4">Contact</th>
                        <th className="p-4">Service</th>
                        <th className="p-4">Budget</th>
                        <th className="p-4">Status</th>
                        <th className="p-4">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {leads.slice(0, 5).map((lead) => (
                        <tr
                          key={lead.id}
                          className="hover:bg-white/[0.02] cursor-pointer"
                          onClick={() => {
                            setSelectedLead(lead);
                            setActiveTab("leads");
                          }}
                        >
                          <td className="p-4">
                            <div className="font-bold text-white">{lead.name}</div>
                            <div className="text-xs text-white/50">{lead.email}</div>
                          </td>
                          <td className="p-4 text-white/80">{lead.service || "General"}</td>
                          <td className="p-4 text-white/60">{lead.budget || "—"}</td>
                          <td className="p-4">
                            <span
                              className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold uppercase ${
                                lead.status === "NEW"
                                  ? "bg-brand-red text-white"
                                  : lead.status === "CONTACTED"
                                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                                  : lead.status === "QUALIFIED"
                                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                                  : "bg-white/10 text-white/70"
                              }`}
                            >
                              {lead.status}
                            </span>
                          </td>
                          <td className="p-4 font-mono text-xs text-white/40">
                            {lead.created_at
                              ? new Date(lead.created_at).toLocaleDateString()
                              : "Recently"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: LEADS MANAGEMENT */}
        {activeTab === "leads" && (
          <div className="space-y-6">
            {/* Filter & Search Bar */}
            <div className="bg-[#0c0c0c] p-4 rounded-xl border border-white/10 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
              <div className="flex flex-wrap items-center gap-2">
                {["ALL", "NEW", "CONTACTED", "QUALIFIED", "CLOSED"].map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1.5 rounded text-xs font-mono uppercase tracking-widest cursor-pointer transition-colors ${
                      statusFilter === st
                        ? "bg-white text-black font-bold"
                        : "bg-white/5 text-white/60 hover:text-white"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              <input
                type="text"
                placeholder="Search leads by name, email, company..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-[#141414] border border-white/10 rounded-lg px-4 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-brand-red w-full md:w-80"
              />
            </div>

            {/* Supabase connection notice if not active */}
            {supabaseConfigured === false && (
              <div className="p-4 bg-amber-950/30 border border-amber-500/30 rounded-xl text-amber-200 text-xs font-mono leading-relaxed">
                <strong>Notice:</strong> Supabase database keys (<code>NEXT_PUBLIC_SUPABASE_URL</code> and <code>SUPABASE_SERVICE_ROLE_KEY</code>) are not configured in <code>.env.local</code>. Contact submissions are sent directly via email. To persist leads in the dashboard, add your Supabase credentials.
              </div>
            )}

            {/* Leads Table */}
            <div className="bg-[#0c0c0c] border border-white/10 rounded-xl overflow-hidden">
              {filteredLeads.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-white/50 text-sm">No leads match the selected filter.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-white/5 font-mono uppercase tracking-widest text-xs text-white/60">
                      <tr>
                        <th className="p-4">Contact</th>
                        <th className="p-4">Company</th>
                        <th className="p-4">Service</th>
                        <th className="p-4">Budget</th>
                        <th className="p-4">Status</th>
                        <th className="p-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {filteredLeads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-white/[0.02]">
                          <td className="p-4">
                            <div className="font-bold text-white">{lead.name}</div>
                            <div className="text-xs text-white/50">{lead.email}</div>
                            {lead.phone && (
                              <div className="text-[11px] font-mono text-white/40">{lead.phone}</div>
                            )}
                          </td>
                          <td className="p-4 text-white/70">{lead.company || "—"}</td>
                          <td className="p-4">
                            <span className="text-xs font-semibold text-white/90">
                              {lead.service || "General Inquiry"}
                            </span>
                            {lead.project_type && (
                              <div className="text-[11px] text-white/40">{lead.project_type}</div>
                            )}
                          </td>
                          <td className="p-4 font-mono text-xs text-white/60">
                            {lead.budget || "—"}
                          </td>
                          <td className="p-4">
                            <select
                              value={lead.status}
                              disabled={updatingLeadId === lead.id}
                              onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                              className="bg-[#141414] border border-white/20 rounded px-2.5 py-1 text-xs font-mono uppercase text-white focus:outline-none focus:border-brand-red cursor-pointer"
                            >
                              <option value="NEW">NEW</option>
                              <option value="CONTACTED">CONTACTED</option>
                              <option value="QUALIFIED">QUALIFIED</option>
                              <option value="IN_PROGRESS">IN_PROGRESS</option>
                              <option value="CONVERTED">CONVERTED</option>
                              <option value="CLOSED">CLOSED</option>
                            </select>
                          </td>
                          <td className="p-4">
                            <button
                              onClick={() => setSelectedLead(lead)}
                              className="px-3 py-1 bg-white/10 hover:bg-white hover:text-black rounded text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
                            >
                              Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Lead Detail Modal */}
            {selectedLead && (
              <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-[#0c0c0c] border border-white/20 rounded-2xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto">
                  <div className="flex items-start justify-between mb-6 pb-4 border-b border-white/10">
                    <div>
                      <span className="text-[10px] font-mono text-brand-red uppercase tracking-widest block mb-1">
                        Lead Record
                      </span>
                      <h2 className="text-2xl font-display font-bold text-white">
                        {selectedLead.name}
                      </h2>
                      <div className="text-xs font-mono text-white/50">{selectedLead.email}</div>
                    </div>
                    <button
                      onClick={() => setSelectedLead(null)}
                      className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                    <div>
                      <span className="text-xs font-mono text-white/40 block">Company</span>
                      <span className="text-white font-medium">{selectedLead.company || "N/A"}</span>
                    </div>
                    <div>
                      <span className="text-xs font-mono text-white/40 block">Phone</span>
                      <span className="text-white font-medium">{selectedLead.phone || "N/A"}</span>
                    </div>
                    <div>
                      <span className="text-xs font-mono text-white/40 block">Service Requested</span>
                      <span className="text-white font-medium">{selectedLead.service || "N/A"}</span>
                    </div>
                    <div>
                      <span className="text-xs font-mono text-white/40 block">Budget Range</span>
                      <span className="text-white font-medium">{selectedLead.budget || "N/A"}</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <span className="text-xs font-mono text-white/40 block mb-2">Project Message</span>
                    <div className="bg-[#141414] p-4 rounded-lg border border-white/10 text-white/80 text-sm leading-relaxed whitespace-pre-line">
                      {selectedLead.message}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-white/50">Status:</span>
                      <select
                        value={selectedLead.status}
                        onChange={(e) => updateLeadStatus(selectedLead.id, e.target.value)}
                        className="bg-[#141414] border border-white/20 rounded px-3 py-1.5 text-xs font-mono uppercase text-white focus:outline-none focus:border-brand-red"
                      >
                        <option value="NEW">NEW</option>
                        <option value="CONTACTED">CONTACTED</option>
                        <option value="QUALIFIED">QUALIFIED</option>
                        <option value="IN_PROGRESS">IN_PROGRESS</option>
                        <option value="CONVERTED">CONVERTED</option>
                        <option value="CLOSED">CLOSED</option>
                      </select>
                    </div>

                    <a
                      href={`mailto:${selectedLead.email}?subject=Regarding your project inquiry with CREATE`}
                      className="px-5 py-2 bg-brand-red hover:bg-white hover:text-black text-white font-bold uppercase tracking-widest text-xs rounded transition-colors"
                    >
                      Reply via Email
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: SERVICES */}
        {activeTab === "services" && (
          <div className="space-y-6">
            <div className="p-4 bg-white/[0.02] border border-white/10 rounded-xl">
              <p className="text-sm text-white/70">
                All 11 approved service pages are published with static server-side rendering (SSG), JSON-LD schemas, exact H1s, and SEO copy.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {servicesList.map((svc, i) => (
                <div
                  key={svc.slug}
                  className="bg-[#0c0c0c] border border-white/10 rounded-xl p-5 flex items-center justify-between hover:border-brand-red/40 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs text-brand-red font-bold">
                      {(i + 1).toString().padStart(2, "0")}
                    </span>
                    <div>
                      <div className="font-bold text-white text-base">{svc.name}</div>
                      <div className="text-xs font-mono text-white/40">
                        /services/{svc.slug}
                      </div>
                    </div>
                  </div>
                  <Link
                    href={`/services/${svc.slug}`}
                    target="_blank"
                    className="px-3 py-1.5 border border-white/20 hover:border-white rounded text-xs font-mono uppercase text-white hover:text-brand-red transition-colors"
                  >
                    View Live ↗
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: SYSTEM CONFIG */}
        {activeTab === "system" && (
          <div className="space-y-8">
            <div className="bg-[#0c0c0c] border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-display font-bold uppercase text-white mb-4">
                Environment & Service Integrations
              </h2>
              <div className="space-y-4 font-mono text-xs">
                <div className="flex items-center justify-between p-3 bg-white/[0.02] rounded border border-white/5">
                  <span className="text-white/70">RESEND_API_KEY</span>
                  <span className="text-white/40">Configured in Deployment / .env.local</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/[0.02] rounded border border-white/5">
                  <span className="text-white/70">LEAD_RECIPIENT_EMAIL</span>
                  <span className="text-white">createforbrands@gmail.com</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/[0.02] rounded border border-white/5">
                  <span className="text-white/70">NEXT_PUBLIC_SUPABASE_URL</span>
                  <span className={supabaseConfigured ? "text-emerald-400" : "text-amber-400"}>
                    {supabaseConfigured ? "Connected" : "Pending setup in .env.local"}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/[0.02] rounded border border-white/5">
                  <span className="text-white/70">SUPABASE_SERVICE_ROLE_KEY</span>
                  <span className={supabaseConfigured ? "text-emerald-400" : "text-amber-400"}>
                    {supabaseConfigured ? "Configured" : "Pending setup in .env.local"}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/[0.02] rounded border border-white/5">
                  <span className="text-white/70">ADMIN_PASSWORD</span>
                  <span className="text-emerald-400">Active</span>
                </div>
              </div>
            </div>

            <div className="bg-[#0c0c0c] border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-display font-bold uppercase text-white mb-2">
                Database Schema (`supabase.sql`)
              </h2>
              <p className="text-white/60 text-sm mb-4">
                If connecting a new Supabase project, execute the SQL schema in your Supabase SQL Editor.
              </p>
              <pre className="bg-[#141414] p-4 rounded-lg border border-white/10 text-white/70 text-xs font-mono overflow-x-auto max-h-48">
{`-- Execute in Supabase SQL Editor:
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    company TEXT,
    email TEXT NOT NULL,
    phone TEXT,
    website TEXT,
    service TEXT,
    project_type TEXT,
    budget TEXT,
    message TEXT NOT NULL,
    source TEXT DEFAULT 'CREATE Website',
    status TEXT DEFAULT 'NEW',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins have full access to leads" ON public.leads FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Anyone can insert leads" ON public.leads FOR INSERT WITH CHECK (true);`}
              </pre>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
