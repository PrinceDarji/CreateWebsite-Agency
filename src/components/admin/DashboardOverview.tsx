"use client";

import React from "react";
import Link from "next/link";
import {
  FileText,
  Image as ImageIcon,
  Inbox,
  Briefcase,
  Database,
  ArrowUpRight,
  Plus,
  Upload,
  Globe,
  Clock,
  CheckCircle,
} from "lucide-react";
import { BlogPost, MediaAsset, AuditLogEntry } from "@/lib/cms/types";
import { AdminTab } from "./AdminSidebar";

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

interface DashboardOverviewProps {
  leads: Lead[];
  blogs: BlogPost[];
  media: MediaAsset[];
  auditLogs: AuditLogEntry[];
  supabaseConfigured: boolean | null;
  onNavigate: (tab: AdminTab) => void;
  onSelectLead: (lead: Lead) => void;
  onNewBlog: () => void;
}

export function DashboardOverview({
  leads,
  blogs,
  media,
  auditLogs,
  supabaseConfigured,
  onNavigate,
  onSelectLead,
  onNewBlog,
}: DashboardOverviewProps) {
  const newLeadsCount = leads.filter((l) => l.status === "NEW").length;
  const publishedBlogsCount = blogs.filter((b) => b.status === "PUBLISHED").length;
  const draftBlogsCount = blogs.filter((b) => b.status === "DRAFT").length;
  const totalMediaBytes = media.reduce((acc, m) => acc + (m.size || 0), 0);
  const formattedMediaSize =
    totalMediaBytes > 1024 * 1024
      ? `${(totalMediaBytes / (1024 * 1024)).toFixed(1)} MB`
      : `${Math.round(totalMediaBytes / 1024)} KB`;

  return (
    <div className="space-y-10">
      {/* KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Leads Card */}
        <div
          onClick={() => onNavigate("leads")}
          className="bg-[#0c0c0c] p-6 rounded-xl border border-white/10 hover:border-brand-red/50 transition-colors cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono uppercase tracking-widest text-white/40">
              Inbound Leads
            </span>
            <Inbox className="w-4 h-4 text-white/40 group-hover:text-brand-red transition-colors" />
          </div>
          <div className="text-4xl font-display font-bold text-white mb-2">
            {leads.length}
          </div>
          <div className="flex items-center justify-between text-xs font-mono">
            <span className={newLeadsCount > 0 ? "text-brand-red font-bold" : "text-white/40"}>
              {newLeadsCount} awaiting contact
            </span>
            <span className="text-white/30 group-hover:text-white transition-colors">
              Manage →
            </span>
          </div>
        </div>

        {/* Blog Posts Card */}
        <div
          onClick={() => onNavigate("blogs")}
          className="bg-[#0c0c0c] p-6 rounded-xl border border-white/10 hover:border-brand-red/50 transition-colors cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono uppercase tracking-widest text-white/40">
              Blog Articles
            </span>
            <FileText className="w-4 h-4 text-white/40 group-hover:text-brand-red transition-colors" />
          </div>
          <div className="text-4xl font-display font-bold text-white mb-2">
            {blogs.length}
          </div>
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-emerald-400 font-medium">
              {publishedBlogsCount} Live / {draftBlogsCount} Drafts
            </span>
            <span className="text-white/30 group-hover:text-white transition-colors">
              Posts →
            </span>
          </div>
        </div>

        {/* Media Library Card */}
        <div
          onClick={() => onNavigate("media")}
          className="bg-[#0c0c0c] p-6 rounded-xl border border-white/10 hover:border-brand-red/50 transition-colors cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono uppercase tracking-widest text-white/40">
              Media Assets
            </span>
            <ImageIcon className="w-4 h-4 text-white/40 group-hover:text-brand-red transition-colors" />
          </div>
          <div className="text-4xl font-display font-bold text-white mb-2">
            {media.length}
          </div>
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-white/60">{formattedMediaSize} storage</span>
            <span className="text-white/30 group-hover:text-white transition-colors">
              Library →
            </span>
          </div>
        </div>

        {/* Studio Services Card */}
        <div
          onClick={() => onNavigate("services")}
          className="bg-[#0c0c0c] p-6 rounded-xl border border-white/10 hover:border-brand-red/50 transition-colors cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono uppercase tracking-widest text-white/40">
              Studio Services
            </span>
            <Briefcase className="w-4 h-4 text-white/40 group-hover:text-brand-red transition-colors" />
          </div>
          <div className="text-4xl font-display font-bold text-white mb-2">
            12
          </div>
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-emerald-400">11 Core + Influencer</span>
            <span className="text-white/30 group-hover:text-white transition-colors">
              Services →
            </span>
          </div>
        </div>
      </div>

      {/* Quick Action Shortcuts Bar */}
      <div className="bg-[#0c0c0c] border border-white/10 rounded-xl p-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="font-display font-bold uppercase text-white text-sm">
            Quick Actions
          </h3>
          <p className="text-white/40 text-xs font-mono">
            Direct shortcuts to common content publishing workflows
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onNewBlog}
            className="flex items-center gap-2 px-4 py-2 bg-brand-red hover:bg-white hover:text-black text-white rounded text-xs font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-md"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Blog Post</span>
          </button>
          <button
            onClick={() => onNavigate("media")}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 text-white rounded text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload Media</span>
          </button>
          <button
            onClick={() => onNavigate("homepage")}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 text-white rounded text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Edit Homepage</span>
          </button>
          <button
            onClick={() => onNavigate("leads")}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 text-white rounded text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
          >
            <Inbox className="w-3.5 h-3.5" />
            <span>View Leads</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Recent Submissions & Recent Blogs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Inbound Leads */}
        <div className="bg-[#0c0c0c] border border-white/10 rounded-xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-lg font-display font-bold uppercase text-white">
                  Recent Inbound Leads
                </h3>
                <p className="text-xs font-mono text-white/40">
                  Latest contact form submissions
                </p>
              </div>
              <button
                onClick={() => onNavigate("leads")}
                className="text-xs font-mono uppercase tracking-widest text-brand-red hover:underline cursor-pointer"
              >
                All Leads →
              </button>
            </div>

            {leads.length === 0 ? (
              <div className="py-12 text-center border border-dashed border-white/10 rounded-lg">
                <p className="text-white/50 text-xs font-mono">No inbound leads received yet.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {leads.slice(0, 5).map((lead) => (
                  <div
                    key={lead.id}
                    onClick={() => {
                      onSelectLead(lead);
                      onNavigate("leads");
                    }}
                    className="p-3.5 bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-white/15 rounded-lg flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <div>
                      <div className="font-bold text-white text-sm">{lead.name}</div>
                      <div className="text-xs text-white/50 font-mono">
                        {lead.email} {lead.company ? `• ${lead.company}` : ""}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                          lead.status === "NEW"
                            ? "bg-brand-red text-white"
                            : lead.status === "CONTACTED"
                            ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                            : lead.status === "QUALIFIED"
                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                            : "bg-white/10 text-white/60"
                        }`}
                      >
                        {lead.status}
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-white/30" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recent Blog Posts */}
        <div className="bg-[#0c0c0c] border border-white/10 rounded-xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-lg font-display font-bold uppercase text-white">
                  Recent Insights & Articles
                </h3>
                <p className="text-xs font-mono text-white/40">
                  Published editorial content
                </p>
              </div>
              <button
                onClick={() => onNavigate("blogs")}
                className="text-xs font-mono uppercase tracking-widest text-brand-red hover:underline cursor-pointer"
              >
                All Articles →
              </button>
            </div>

            {blogs.length === 0 ? (
              <div className="py-12 text-center border border-dashed border-white/10 rounded-lg">
                <p className="text-white/50 text-xs font-mono mb-3">No articles published yet.</p>
                <button
                  onClick={onNewBlog}
                  className="px-3 py-1.5 bg-brand-red text-white text-xs font-mono uppercase tracking-wider rounded"
                >
                  Write First Post
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {blogs.slice(0, 5).map((post) => (
                  <div
                    key={post.id}
                    onClick={() => onNavigate("blogs")}
                    className="p-3.5 bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-white/15 rounded-lg flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <div className="pr-4 truncate">
                      <div className="font-bold text-white text-sm truncate">{post.title}</div>
                      <div className="text-xs text-white/40 font-mono">
                        /insights/{post.slug}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold ${
                          post.status === "PUBLISHED"
                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                            : post.status === "SCHEDULED"
                            ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                            : "bg-white/10 text-white/60"
                        }`}
                      >
                        {post.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recent Audit Activity Feed */}
      <div className="bg-[#0c0c0c] border border-white/10 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-display font-bold uppercase text-white">
              Studio Activity & Audit Stream
            </h3>
            <p className="text-xs font-mono text-white/40">
              Live chronological log of administrative operations
            </p>
          </div>
          <button
            onClick={() => onNavigate("system")}
            className="text-xs font-mono uppercase tracking-widest text-brand-red hover:underline cursor-pointer"
          >
            System Logs →
          </button>
        </div>

        {auditLogs.length === 0 ? (
          <div className="py-6 text-center text-xs font-mono text-white/40">
            No audit log entries recorded yet.
          </div>
        ) : (
          <div className="divide-y divide-white/5 font-mono text-xs">
            {auditLogs.slice(0, 5).map((log) => (
              <div key={log.id} className="py-2.5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 truncate">
                  <span className="px-2 py-0.5 bg-white/5 text-white/80 rounded text-[10px] uppercase font-bold shrink-0">
                    {log.action}
                  </span>
                  <span className="text-white/80 truncate">{log.resource}</span>
                  {log.details && (
                    <span className="text-white/40 hidden md:inline truncate">
                      ({log.details})
                    </span>
                  )}
                </div>
                <span className="text-white/30 text-[11px] shrink-0">
                  {new Date(log.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
