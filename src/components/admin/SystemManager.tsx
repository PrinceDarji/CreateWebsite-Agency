"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  Database,
  Mail,
  HardDrive,
  Cpu,
  Copy,
  Check,
  RefreshCw,
  Clock,
  Activity,
} from "lucide-react";
import { AuditLogEntry } from "@/lib/cms/types";

interface SystemHealthData {
  system: {
    timestamp: string;
    nodeVersion: string;
    environment: string;
    uptime: number;
  };
  integrations: {
    supabase: {
      status: "CONNECTED" | "NOT_CONFIGURED" | "FAILED";
      configured: boolean;
      message: string;
    };
    resend: {
      status: "CONFIGURED" | "NOT_CONFIGURED";
      recipient: string;
    };
    storage: {
      status: "HEALTHY" | "ERROR";
      location: string;
    };
  };
}

interface SystemManagerProps {
  systemHealth: SystemHealthData | null;
  auditLogs: AuditLogEntry[];
  loadingHealth: boolean;
  onRefreshHealth: () => void;
}

export function SystemManager({
  systemHealth,
  auditLogs,
  loadingHealth,
  onRefreshHealth,
}: SystemManagerProps) {
  const [copiedSql, setCopiedSql] = useState(false);

  const supabaseSqlSchema = `-- Execute in Supabase SQL Editor:
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

CREATE TABLE IF NOT EXISTS public.blogs (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    excerpt TEXT,
    content TEXT NOT NULL,
    featured_image TEXT,
    featured_image_alt TEXT,
    author TEXT DEFAULT 'CREATE Editorial Team',
    category TEXT DEFAULT 'Insights',
    tags TEXT[],
    seo_title TEXT,
    meta_description TEXT,
    canonical_url TEXT,
    og_image TEXT,
    status TEXT DEFAULT 'DRAFT',
    published_at TIMESTAMP WITH TIME ZONE,
    scheduled_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.homepage_sections (
    id TEXT PRIMARY KEY,
    section_key TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    subtitle TEXT,
    content TEXT,
    image TEXT,
    video_url TEXT,
    cta_text TEXT,
    cta_link TEXT,
    visible BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.homepage_sections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert leads" ON public.leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can view published blogs" ON public.blogs FOR SELECT USING (status = 'PUBLISHED');
CREATE POLICY "Admins have full access" ON public.leads FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins have full access to blogs" ON public.blogs FOR ALL USING (auth.role() = 'authenticated');`;

  function handleCopySql() {
    navigator.clipboard.writeText(supabaseSqlSchema);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  }

  return (
    <div className="space-y-8">
      {/* Header Info */}
      <div className="bg-[#0c0c0c] p-5 rounded-xl border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-display font-bold uppercase text-white">
            System Health, Integrations & Audit Security
          </h2>
          <p className="text-xs font-mono text-white/50 mt-1">
            Real-time telemetry, database connections, and immutable administrative audit stream.
          </p>
        </div>
        <button
          onClick={onRefreshHealth}
          disabled={loadingHealth}
          className="flex items-center gap-2 px-4 py-2 border border-white/20 hover:border-white text-white rounded text-xs font-mono uppercase tracking-widest transition-colors cursor-pointer disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loadingHealth ? "animate-spin" : ""}`} />
          <span>{loadingHealth ? "Testing..." : "Test Connectivity"}</span>
        </button>
      </div>

      {/* Integration Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Supabase Status */}
        <div className="bg-[#0c0c0c] border border-white/10 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono uppercase tracking-widest text-white/40">
              Database
            </span>
            <Database className="w-4 h-4 text-white/40" />
          </div>
          <div className="text-xl font-display font-bold text-white mb-1">
            {systemHealth?.integrations?.supabase?.status === "CONNECTED"
              ? "Connected"
              : systemHealth?.integrations?.supabase?.status === "FAILED"
              ? "Error"
              : "Not Configured"}
          </div>
          <div
            className={`text-xs font-mono ${
              systemHealth?.integrations?.supabase?.status === "CONNECTED"
                ? "text-emerald-400"
                : "text-amber-400"
            }`}
          >
            {systemHealth?.integrations?.supabase?.message || "Using Local JSON Fallback"}
          </div>
        </div>

        {/* Resend Status */}
        <div className="bg-[#0c0c0c] border border-white/10 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono uppercase tracking-widest text-white/40">
              Email Dispatch
            </span>
            <Mail className="w-4 h-4 text-white/40" />
          </div>
          <div className="text-xl font-display font-bold text-white mb-1">
            {systemHealth?.integrations?.resend?.status === "CONFIGURED"
              ? "Active (Resend)"
              : "Standby"}
          </div>
          <div className="text-xs font-mono text-white/50 truncate">
            {systemHealth?.integrations?.resend?.recipient || "createforbrands@gmail.com"}
          </div>
        </div>

        {/* CMS Storage */}
        <div className="bg-[#0c0c0c] border border-white/10 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono uppercase tracking-widest text-white/40">
              CMS Storage Engine
            </span>
            <HardDrive className="w-4 h-4 text-white/40" />
          </div>
          <div className="text-xl font-display font-bold text-emerald-400 mb-1">
            Resilient
          </div>
          <div className="text-xs font-mono text-white/50">
            Hybrid Supabase + Local JSON
          </div>
        </div>

        {/* Node.js Runtime */}
        <div className="bg-[#0c0c0c] border border-white/10 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono uppercase tracking-widest text-white/40">
              Server Runtime
            </span>
            <Cpu className="w-4 h-4 text-white/40" />
          </div>
          <div className="text-xl font-display font-bold text-white mb-1">
            Node {systemHealth?.system?.nodeVersion || process.version}
          </div>
          <div className="text-xs font-mono text-white/50">
            Uptime: {systemHealth?.system?.uptime ? `${Math.round(systemHealth.system.uptime / 60)}m` : "Active"}
          </div>
        </div>
      </div>

      {/* Live Audit Log Stream */}
      <div className="bg-[#0c0c0c] border border-white/10 rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-display font-bold uppercase text-white">
              Immutable Security Audit Stream
            </h3>
            <p className="text-xs font-mono text-white/40 mt-1">
              All editorial updates, media modifications, and administrative sessions are audited.
            </p>
          </div>
          <span className="text-xs font-mono text-white/40">
            {auditLogs.length} events logged
          </span>
        </div>

        {auditLogs.length === 0 ? (
          <div className="py-8 text-center text-xs font-mono text-white/40 border border-dashed border-white/10 rounded-lg">
            No audit events captured yet.
          </div>
        ) : (
          <div className="border border-white/10 rounded-xl overflow-hidden max-h-96 overflow-y-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-white/5 uppercase tracking-widest text-white/60 sticky top-0 bg-[#121212]">
                <tr>
                  <th className="p-3">Timestamp</th>
                  <th className="p-3">Actor</th>
                  <th className="p-3">Action</th>
                  <th className="p-3">Target Resource</th>
                  <th className="p-3">IP Address</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-white/[0.02]">
                    <td className="p-3 text-white/40 whitespace-nowrap">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                    <td className="p-3 text-white font-bold">{log.actor}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded bg-brand-red/20 text-brand-red border border-brand-red/30 font-bold">
                        {log.action}
                      </span>
                    </td>
                    <td className="p-3 text-white/80">{log.resource}</td>
                    <td className="p-3 text-white/40 font-mono">{log.ip || "127.0.0.1"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Supabase Schema Helper Box */}
      <div className="bg-[#0c0c0c] border border-white/10 rounded-xl p-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-lg font-display font-bold uppercase text-white">
              Database Migration Schema (`supabase.sql`)
            </h3>
            <p className="text-xs font-mono text-white/40">
              Execute this SQL in the Supabase SQL editor to create the necessary tables and RLS security policies.
            </p>
          </div>
          <button
            onClick={handleCopySql}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white hover:text-black rounded text-xs font-mono uppercase tracking-wider text-white transition-colors cursor-pointer"
          >
            {copiedSql ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy SQL</span>
              </>
            )}
          </button>
        </div>

        <pre className="bg-[#141414] p-4 rounded-lg border border-white/10 text-white/70 text-xs font-mono overflow-x-auto max-h-56 leading-relaxed">
          {supabaseSqlSchema}
        </pre>
      </div>
    </div>
  );
}
