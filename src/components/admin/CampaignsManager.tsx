"use client";

import React, { useState } from "react";
import {
  Award,
  Plus,
  Edit3,
  ExternalLink,
  Save,
  CheckCircle,
  AlertCircle,
  Trash2,
} from "lucide-react";
import { CampaignReport } from "@/lib/cms/types";

interface CampaignsManagerProps {
  reports: CampaignReport[];
  onUpdateReports: (reports: CampaignReport[]) => void;
}

export function CampaignsManager({ reports, onUpdateReports }: CampaignsManagerProps) {
  const [editingReport, setEditingReport] = useState<CampaignReport | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function handleCreateNew() {
    const newRep: CampaignReport = {
      id: `report-${Date.now()}`,
      title: "",
      client: "",
      slug: "",
      overview: "",
      objectives: [],
      metrics: [
        { label: "Total Views", value: "10M+" },
        { label: "Engagement Rate", value: "8.4%" },
      ],
      deliverables: ["21 Reels", "Campaign Strategy", "Influencer Management"],
      roi: "3.8x ROAS",
      results: "",
      learnings: [],
      published: true,
      coverImage: "/images/services/campaign-production.webp",
      createdAt: new Date().toISOString(),
    };
    setEditingReport(newRep);
    setIsNew(true);
  }

  async function handleSaveReport(e: React.FormEvent) {
    e.preventDefault();
    if (!editingReport) return;

    setSaving(true);
    setErrorMessage("");
    setSaveSuccess(false);

    try {
      const res = await fetch("/api/admin/campaign-reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingReport),
      });

      const data = await res.json();
      if (res.ok && data.report) {
        setSaveSuccess(true);
        if (isNew) {
          onUpdateReports([data.report, ...reports]);
        } else {
          onUpdateReports(reports.map((r) => (r.id === data.report.id ? data.report : r)));
        }
        setTimeout(() => {
          setEditingReport(null);
          setIsNew(false);
          setSaveSuccess(false);
        }, 800);
      } else {
        setErrorMessage(data.error || "Failed to save campaign report");
      }
    } catch {
      setErrorMessage("Network error saving report");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-[#0c0c0c] p-5 rounded-xl border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-display font-bold uppercase text-white">
            Campaign Reports & Case Studies ({reports.length})
          </h2>
          <p className="text-xs font-mono text-white/50 mt-1">
            Publish client case studies, performance metrics, and deliverables reports.
          </p>
        </div>
        <button
          onClick={handleCreateNew}
          className="flex items-center gap-2 px-4 py-2 bg-brand-red hover:bg-white hover:text-black text-white font-bold uppercase tracking-wider text-xs rounded transition-colors cursor-pointer shadow-lg"
        >
          <Plus className="w-4 h-4" />
          <span>New Campaign Report</span>
        </button>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reports.map((rep) => (
          <div
            key={rep.id}
            className="bg-[#0c0c0c] border border-white/10 rounded-xl p-6 flex flex-col justify-between hover:border-brand-red/40 transition-colors"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <span className="text-[10px] font-mono text-brand-red font-bold uppercase tracking-widest block mb-1">
                    Client: {rep.client}
                  </span>
                  <h3 className="font-bold text-white text-lg">{rep.title}</h3>
                </div>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold shrink-0 ${
                    rep.published
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                      : "bg-white/10 text-white/60"
                  }`}
                >
                  {rep.published ? "Published" : "Draft"}
                </span>
              </div>

              <p className="text-xs text-white/60 line-clamp-3 mb-4 font-sans leading-relaxed">
                {rep.overview}
              </p>

              {/* Metrics preview */}
              {rep.metrics && rep.metrics.length > 0 && (
                <div className="grid grid-cols-2 gap-2 p-3 bg-white/[0.02] border border-white/5 rounded-lg mb-4">
                  {rep.metrics.slice(0, 2).map((m, idx) => (
                    <div key={idx}>
                      <span className="text-[10px] font-mono text-white/40 block">
                        {m.label}
                      </span>
                      <span className="text-sm font-display font-bold text-white">
                        {m.value}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <span className="text-xs font-mono text-white/40">
                ROI: {rep.roi || "Verified"}
              </span>
              <button
                onClick={() => {
                  setEditingReport(rep);
                  setIsNew(false);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white hover:text-black text-white rounded text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Report</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingReport && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0c0c0c] border border-white/20 rounded-2xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-6 pb-4 border-b border-white/10">
              <div>
                <span className="text-[10px] font-mono text-brand-red uppercase tracking-widest block mb-1">
                  {isNew ? "New Case Study" : "Edit Case Study"}
                </span>
                <h3 className="text-2xl font-display font-bold text-white">
                  {editingReport.title || "Campaign Report"}
                </h3>
              </div>
              <button
                onClick={() => setEditingReport(null)}
                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveReport} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-white/70 mb-2">
                    Report Title *
                  </label>
                  <input
                    type="text"
                    value={editingReport.title}
                    onChange={(e) =>
                      setEditingReport({ ...editingReport, title: e.target.value })
                    }
                    required
                    placeholder="e.g. Shiva Immersive: 21-Reel Campaign"
                    className="w-full bg-[#141414] border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-red"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-white/70 mb-2">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    value={editingReport.client}
                    onChange={(e) =>
                      setEditingReport({ ...editingReport, client: e.target.value })
                    }
                    required
                    placeholder="e.g. Shiva Immersive"
                    className="w-full bg-[#141414] border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-red"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-white/70 mb-2">
                  Campaign Overview
                </label>
                <textarea
                  rows={3}
                  value={editingReport.overview}
                  onChange={(e) =>
                    setEditingReport({ ...editingReport, overview: e.target.value })
                  }
                  required
                  className="w-full bg-[#141414] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-brand-red"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-white/70 mb-2">
                    ROI Summary
                  </label>
                  <input
                    type="text"
                    value={editingReport.roi}
                    onChange={(e) =>
                      setEditingReport({ ...editingReport, roi: e.target.value })
                    }
                    placeholder="e.g. 4.2x ROAS, 10M+ Organic Reach"
                    className="w-full bg-[#141414] border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-red"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-white/70 mb-2">
                    Deliverables (Comma Separated)
                  </label>
                  <input
                    type="text"
                    value={editingReport.deliverables?.join(", ") || ""}
                    onChange={(e) =>
                      setEditingReport({
                        ...editingReport,
                        deliverables: e.target.value
                          .split(",")
                          .map((d) => d.trim())
                          .filter(Boolean),
                      })
                    }
                    placeholder="21 Reels, Strategy, Production"
                    className="w-full bg-[#141414] border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-red"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-white/70 mb-2">
                  Results & Key Takeaways
                </label>
                <textarea
                  rows={3}
                  value={editingReport.results}
                  onChange={(e) =>
                    setEditingReport({ ...editingReport, results: e.target.value })
                  }
                  className="w-full bg-[#141414] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-brand-red"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="reportPublished"
                  checked={editingReport.published}
                  onChange={(e) =>
                    setEditingReport({ ...editingReport, published: e.target.checked })
                  }
                  className="w-4 h-4 rounded accent-brand-red cursor-pointer"
                />
                <label
                  htmlFor="reportPublished"
                  className="text-xs font-mono uppercase text-white cursor-pointer"
                >
                  Published & Accessible
                </label>
              </div>

              {errorMessage && (
                <div className="p-3 rounded bg-red-950/40 border border-red-500/30 text-red-400 text-xs font-mono flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {saveSuccess && (
                <div className="p-3 rounded bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>Report saved successfully!</span>
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingReport(null)}
                  className="px-4 py-2 rounded border border-white/10 text-white/70 hover:text-white text-xs font-mono uppercase transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 bg-brand-red hover:bg-white hover:text-black text-white font-bold uppercase tracking-wider text-xs rounded transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {saving ? (
                    <span>Saving...</span>
                  ) : (
                    <>
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Report</span>
                    </>
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
