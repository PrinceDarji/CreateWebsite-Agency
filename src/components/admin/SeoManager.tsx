"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Compass,
  Plus,
  Trash2,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Globe,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { RedirectRule } from "@/lib/cms/types";

interface SeoManagerProps {
  redirects: RedirectRule[];
  onUpdateRedirects: (redirects: RedirectRule[]) => void;
}

export function SeoManager({ redirects, onUpdateRedirects }: SeoManagerProps) {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [permanent, setPermanent] = useState(true);
  const [adding, setAdding] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Add Redirect
  async function handleAddRedirect(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    const trimmedSource = source.trim();
    const trimmedDest = destination.trim();

    if (!trimmedSource || !trimmedDest) {
      setErrorMsg("Both source and destination paths are required");
      return;
    }

    if (trimmedSource === trimmedDest) {
      setErrorMsg("Redirect loop detected: Source and destination cannot be identical");
      return;
    }

    setAdding(true);
    try {
      const res = await fetch("/api/admin/redirects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: trimmedSource,
          destination: trimmedDest,
          permanent,
        }),
      });

      const data = await res.json();
      if (res.ok && data.redirect) {
        onUpdateRedirects([...redirects, data.redirect]);
        setSource("");
        setDestination("");
        setSuccessMsg("Redirect rule created successfully!");
        setTimeout(() => setSuccessMsg(""), 2500);
      } else {
        setErrorMsg(data.error || "Failed to create redirect rule");
      }
    } catch {
      setErrorMsg("Network error creating redirect rule");
    } finally {
      setAdding(false);
    }
  }

  // Delete Redirect
  async function handleDeleteRedirect(id: string, ruleText: string) {
    if (!window.confirm(`Delete redirect rule "${ruleText}"?`)) return;

    try {
      const res = await fetch(`/api/admin/redirects?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        onUpdateRedirects(redirects.filter((r) => r.id !== id));
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete redirect rule");
      }
    } catch {
      alert("Network error deleting redirect rule");
    }
  }

  return (
    <div className="space-y-8">
      {/* Header Info */}
      <div className="bg-[#0c0c0c] p-5 rounded-xl border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-display font-bold uppercase text-white">
            SEO, Sitemap & Redirect Manager
          </h2>
          <p className="text-xs font-mono text-white/50 mt-1">
            Manage permanent (301) and temporary redirects, inspect live sitemap indexing, and audit SERP previews.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/sitemap.xml"
            target="_blank"
            className="flex items-center gap-1.5 px-3 py-1.5 border border-white/20 hover:border-white text-white rounded text-xs font-mono uppercase tracking-widest transition-colors"
          >
            <span>Live Sitemap</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/robots.txt"
            target="_blank"
            className="flex items-center gap-1.5 px-3 py-1.5 border border-white/20 hover:border-white text-white rounded text-xs font-mono uppercase tracking-widest transition-colors"
          >
            <span>Robots.txt</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Google SERP Preview Card */}
      <div className="bg-[#0c0c0c] border border-white/10 rounded-xl p-6">
        <h3 className="text-sm font-mono uppercase tracking-widest text-brand-red font-bold mb-4">
          Google Search Engine Result Simulation
        </h3>
        <div className="bg-[#141414] border border-white/10 rounded-xl p-5 max-w-2xl font-sans">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-6 h-6 rounded-full bg-brand-red flex items-center justify-center text-[10px] font-bold text-white font-display">
              C
            </div>
            <div>
              <div className="text-xs text-white/90 font-medium">CREATE. Creative Studio</div>
              <div className="text-[11px] text-white/40 font-mono">https://createforbrands.com</div>
            </div>
          </div>
          <div className="text-base text-[#8ab4f8] hover:underline cursor-pointer font-medium mb-1">
            CREATE — Creative Production Studio | Commercials, Branded Content & Campaigns
          </div>
          <div className="text-xs text-white/70 leading-relaxed">
            Branding so effective, it feels illegal. Creative Production Studio for Commercials, Branded Content, Campaigns, Visual Storytelling & Influencer Marketing.
          </div>
        </div>
      </div>

      {/* Redirects Manager */}
      <div className="bg-[#0c0c0c] border border-white/10 rounded-xl p-6 space-y-6">
        <div>
          <h3 className="text-lg font-display font-bold uppercase text-white">
            URL Redirect Rules ({redirects.length})
          </h3>
          <p className="text-xs font-mono text-white/40 mt-1">
            Prevent 404 broken links during URL reorganizations and preserve SEO authority.
          </p>
        </div>

        {/* Add Redirect Form */}
        <form onSubmit={handleAddRedirect} className="p-4 bg-white/[0.02] border border-white/10 rounded-xl space-y-4">
          <div className="text-xs font-mono uppercase tracking-widest text-white/70 font-semibold">
            + Add New Redirect Rule
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-white/50 mb-1">
                Source URL Path (From) *
              </label>
              <input
                type="text"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                placeholder="/services/brand-and-visual-design"
                required
                className="w-full bg-[#141414] border border-white/10 rounded px-3 py-2 text-white text-xs font-mono focus:outline-none focus:border-brand-red"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-white/50 mb-1">
                Destination URL Path (To) *
              </label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="/services/brand-visual-design"
                required
                className="w-full bg-[#141414] border border-white/10 rounded px-3 py-2 text-white text-xs font-mono focus:outline-none focus:border-brand-red"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="permanentRedirect"
                checked={permanent}
                onChange={(e) => setPermanent(e.target.checked)}
                className="w-4 h-4 rounded accent-brand-red cursor-pointer"
              />
              <label
                htmlFor="permanentRedirect"
                className="text-xs font-mono uppercase text-white/70 cursor-pointer"
              >
                Permanent 301 Redirect (Recommended for SEO)
              </label>
            </div>

            <button
              type="submit"
              disabled={adding}
              className="px-5 py-2 bg-brand-red hover:bg-white hover:text-black text-white font-bold uppercase tracking-wider text-xs rounded transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{adding ? "Creating..." : "Add Rule"}</span>
            </button>
          </div>

          {errorMsg && (
            <div className="p-3 rounded bg-red-950/40 border border-red-500/30 text-red-400 text-xs font-mono flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3 rounded bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center gap-2">
              <CheckCircle className="w-4 h-4 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}
        </form>

        {/* Existing Rules Table */}
        <div className="border border-white/10 rounded-xl overflow-hidden">
          {redirects.length === 0 ? (
            <div className="py-8 text-center text-xs font-mono text-white/40">
              No custom redirect rules configured yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-white/5 uppercase tracking-widest text-white/60">
                  <tr>
                    <th className="p-3.5">Source (From)</th>
                    <th className="p-3.5"></th>
                    <th className="p-3.5">Destination (To)</th>
                    <th className="p-3.5">Status Code</th>
                    <th className="p-3.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {redirects.map((rule) => (
                    <tr key={rule.id} className="hover:bg-white/[0.02]">
                      <td className="p-3.5 text-white/90">{rule.source}</td>
                      <td className="p-3.5 text-brand-red">
                        <ArrowRight className="w-3.5 h-3.5" />
                      </td>
                      <td className="p-3.5 text-white font-bold">{rule.destination}</td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded bg-white/10 text-white/80 font-bold">
                          {rule.permanent ? "301 Permanent" : "302 Temporary"}
                        </span>
                      </td>
                      <td className="p-3.5 text-right">
                        <button
                          onClick={() =>
                            handleDeleteRedirect(
                              rule.id,
                              `${rule.source} → ${rule.destination}`
                            )
                          }
                          className="p-1 rounded hover:bg-red-500/10 text-white/40 hover:text-red-400 transition-colors cursor-pointer"
                          title="Delete Rule"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
