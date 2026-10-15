"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Briefcase,
  Edit3,
  ExternalLink,
  Save,
  CheckCircle,
  AlertCircle,
  Search,
} from "lucide-react";
import { ServiceItem } from "@/lib/cms/types";

interface ServicesManagerProps {
  services: ServiceItem[];
  onUpdateServices: (services: ServiceItem[]) => void;
}

export function ServicesManager({ services, onUpdateServices }: ServicesManagerProps) {
  const [search, setSearch] = useState("");
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const filteredServices = services.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.slug.toLowerCase().includes(search.toLowerCase()) ||
      s.primaryKeyword?.toLowerCase().includes(search.toLowerCase())
  );

  async function handleSaveService(e: React.FormEvent) {
    e.preventDefault();
    if (!editingService) return;

    setSaving(true);
    setErrorMessage("");
    setSaveSuccess(false);

    try {
      const res = await fetch("/api/admin/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingService),
      });

      const data = await res.json();
      if (res.ok && data.service) {
        setSaveSuccess(true);
        const updatedList = services.map((s) =>
          s.id === editingService.id ? data.service : s
        );
        onUpdateServices(updatedList);
        setTimeout(() => {
          setEditingService(null);
          setSaveSuccess(false);
        }, 800);
      } else {
        setErrorMessage(data.error || "Failed to update service");
      }
    } catch {
      setErrorMessage("Network error saving service");
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
            Studio Services Directory ({services.length})
          </h2>
          <p className="text-xs font-mono text-white/50 mt-1">
            All 11 approved service pages + Influencer Marketing with static server-side rendering (SSG), JSON-LD schemas, and copy.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            placeholder="Filter services..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#141414] border border-white/10 rounded-lg pl-9 pr-4 py-1.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-brand-red font-mono"
          />
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredServices.map((svc, i) => (
          <div
            key={svc.slug}
            className="bg-[#0c0c0c] border border-white/10 rounded-xl p-5 flex flex-col justify-between hover:border-brand-red/40 transition-colors"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-brand-red font-bold">
                    {(i + 1).toString().padStart(2, "0")}
                  </span>
                  <h3 className="font-bold text-white text-base">{svc.name}</h3>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold shrink-0">
                  SSG Live
                </span>
              </div>

              <div className="text-xs font-mono text-white/40 mb-3">
                /services/{svc.slug}
              </div>

              <p className="text-xs text-white/60 line-clamp-2 mb-4 font-sans">
                {svc.intro || svc.metaDescription}
              </p>

              {svc.primaryKeyword && (
                <div className="text-[11px] font-mono text-white/40 mb-4">
                  <span className="text-white/60">Target Keyword:</span> {svc.primaryKeyword}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <Link
                href={`/services/${svc.slug}`}
                target="_blank"
                className="flex items-center gap-1.5 text-xs font-mono text-white/60 hover:text-white transition-colors"
              >
                <span>View Live</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>

              <button
                onClick={() => setEditingService(svc)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white hover:text-black text-white rounded text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit SEO & Copy</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Service Modal */}
      {editingService && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0c0c0c] border border-white/20 rounded-2xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-6 pb-4 border-b border-white/10">
              <div>
                <span className="text-[10px] font-mono text-brand-red uppercase tracking-widest block mb-1">
                  Service Config
                </span>
                <h3 className="text-2xl font-display font-bold text-white">
                  Edit: {editingService.name}
                </h3>
                <div className="text-xs font-mono text-white/40">
                  URL Route: /services/{editingService.slug}
                </div>
              </div>
              <button
                onClick={() => setEditingService(null)}
                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveService} className="space-y-5">
              {/* Service Name */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-white/70 mb-2">
                  Display Name
                </label>
                <input
                  type="text"
                  value={editingService.name}
                  onChange={(e) =>
                    setEditingService({ ...editingService, name: e.target.value })
                  }
                  required
                  className="w-full bg-[#141414] border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-red"
                />
              </div>

              {/* Exact H1 */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-white/70 mb-2">
                  Page H1 Heading (Approved Brand Copy)
                </label>
                <input
                  type="text"
                  value={editingService.h1}
                  onChange={(e) =>
                    setEditingService({ ...editingService, h1: e.target.value })
                  }
                  required
                  className="w-full bg-[#141414] border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-red"
                />
              </div>

              {/* SEO Title */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-white/70 mb-2">
                  SEO Meta Title
                </label>
                <input
                  type="text"
                  value={editingService.seoTitle}
                  onChange={(e) =>
                    setEditingService({ ...editingService, seoTitle: e.target.value })
                  }
                  required
                  className="w-full bg-[#141414] border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-red"
                />
              </div>

              {/* Meta Description */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-mono uppercase tracking-widest text-white/70">
                    SEO Meta Description
                  </label>
                  <span className="text-[10px] font-mono text-white/40">
                    {editingService.metaDescription?.length || 0} / 155 chars recommended
                  </span>
                </div>
                <textarea
                  rows={3}
                  value={editingService.metaDescription}
                  onChange={(e) =>
                    setEditingService({
                      ...editingService,
                      metaDescription: e.target.value,
                    })
                  }
                  required
                  className="w-full bg-[#141414] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-brand-red"
                />
              </div>

              {/* Keywords */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-white/70 mb-2">
                    Primary Keyword
                  </label>
                  <input
                    type="text"
                    value={editingService.primaryKeyword || ""}
                    onChange={(e) =>
                      setEditingService({
                        ...editingService,
                        primaryKeyword: e.target.value,
                      })
                    }
                    className="w-full bg-[#141414] border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-red"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-white/70 mb-2">
                    CTA Heading
                  </label>
                  <input
                    type="text"
                    value={editingService.ctaHeading || ""}
                    onChange={(e) =>
                      setEditingService({
                        ...editingService,
                        ctaHeading: e.target.value,
                      })
                    }
                    className="w-full bg-[#141414] border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-red"
                  />
                </div>
              </div>

              {/* Intro Content */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-white/70 mb-2">
                  Introduction Paragraph
                </label>
                <textarea
                  rows={4}
                  value={editingService.intro}
                  onChange={(e) =>
                    setEditingService({ ...editingService, intro: e.target.value })
                  }
                  required
                  className="w-full bg-[#141414] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-brand-red"
                />
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
                  <span>Service updated successfully!</span>
                </div>
              )}

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
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
                      <span>Save Changes</span>
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
