"use client";

import React, { useState } from "react";
import {
  ChevronUp,
  ChevronDown,
  Eye,
  EyeOff,
  Edit3,
  Globe,
  Save,
  CheckCircle,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { HomepageSection } from "@/lib/cms/types";

interface HomepageEditorProps {
  sections: HomepageSection[];
  onUpdateSections: (sections: HomepageSection[]) => void;
}

export function HomepageEditor({ sections, onUpdateSections }: HomepageEditorProps) {
  const [editingSection, setEditingSection] = useState<HomepageSection | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Reorder sections
  async function handleMove(index: number, direction: "up" | "down") {
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === sections.length - 1)
    ) {
      return;
    }

    const newSections = [...sections];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    const temp = newSections[index];
    newSections[index] = newSections[targetIndex];
    newSections[targetIndex] = temp;

    // Update orders
    newSections.forEach((s, idx) => {
      s.order = idx + 1;
    });

    onUpdateSections(newSections);

    try {
      await fetch("/api/admin/homepage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "reorder",
          sectionIds: newSections.map((s) => s.id),
        }),
      });
    } catch (err) {
      console.error("Failed to persist section reordering:", err);
    }
  }

  // Toggle Visibility
  async function handleToggleVisibility(section: HomepageSection) {
    const updated = { ...section, visible: !section.visible };
    const newSections = sections.map((s) => (s.id === section.id ? updated : s));
    onUpdateSections(newSections);

    try {
      await fetch("/api/admin/homepage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: updated }),
      });
    } catch (err) {
      console.error("Failed to toggle section visibility:", err);
    }
  }

  // Save Section Edit Form
  async function handleSaveSection(e: React.FormEvent) {
    e.preventDefault();
    if (!editingSection) return;

    setSaving(true);
    setErrorMessage("");
    setSaveSuccess(false);

    try {
      const res = await fetch("/api/admin/homepage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: editingSection }),
      });

      const data = await res.json();
      if (res.ok && data.section) {
        setSaveSuccess(true);
        const newSections = sections.map((s) =>
          s.id === editingSection.id ? data.section : s
        );
        onUpdateSections(newSections);
        setTimeout(() => {
          setEditingSection(null);
          setSaveSuccess(false);
        }, 800);
      } else {
        setErrorMessage(data.error || "Failed to update section");
      }
    } catch {
      setErrorMessage("Network error saving section");
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
            Homepage Section Manager
          </h2>
          <p className="text-xs font-mono text-white/50 mt-1">
            Reorder, edit copy, toggle visibility, and configure CTAs for the public homepage.
          </p>
        </div>
        <a
          href="/"
          target="_blank"
          className="flex items-center gap-2 px-3 py-1.5 border border-white/20 hover:border-white text-white rounded text-xs font-mono uppercase tracking-widest transition-colors"
        >
          <span>Preview Homepage</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Sections Table / List */}
      <div className="bg-[#0c0c0c] border border-white/10 rounded-xl overflow-hidden">
        <div className="p-4 bg-white/5 border-b border-white/10 flex items-center justify-between font-mono text-xs uppercase tracking-widest text-white/60">
          <span>Homepage Structure ({sections.length} Sections)</span>
          <span>Actions & Visibility</span>
        </div>

        <div className="divide-y divide-white/5">
          {sections.map((sec, idx) => (
            <div
              key={sec.id}
              className={`p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors ${
                !sec.visible ? "opacity-50" : ""
              }`}
            >
              <div className="flex items-center gap-4">
                {/* Order Controls */}
                <div className="flex flex-col gap-1 items-center font-mono">
                  <button
                    disabled={idx === 0}
                    onClick={() => handleMove(idx, "up")}
                    className="p-1 hover:bg-white/10 rounded disabled:opacity-20 text-white cursor-pointer"
                    title="Move Up"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <span className="text-[11px] font-bold text-brand-red">
                    {(idx + 1).toString().padStart(2, "0")}
                  </span>
                  <button
                    disabled={idx === sections.length - 1}
                    onClick={() => handleMove(idx, "down")}
                    className="p-1 hover:bg-white/10 rounded disabled:opacity-20 text-white cursor-pointer"
                    title="Move Down"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-bold text-base">{sec.title}</span>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/10 text-white/60">
                      {sec.key}
                    </span>
                  </div>
                  {sec.subtitle && (
                    <p className="text-xs text-white/50 font-sans mt-0.5 max-w-xl truncate">
                      {sec.subtitle}
                    </p>
                  )}
                  {sec.ctaText && (
                    <div className="text-[11px] font-mono text-brand-red mt-1">
                      CTA: &quot;{sec.ctaText}&quot; → {sec.ctaLink || "#"}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                <button
                  onClick={() => handleToggleVisibility(sec)}
                  className={`p-2 rounded border transition-colors cursor-pointer ${
                    sec.visible
                      ? "border-emerald-500/30 text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20"
                      : "border-white/10 text-white/40 bg-white/5 hover:text-white"
                  }`}
                  title={sec.visible ? "Visible on Homepage (Click to Hide)" : "Hidden (Click to Show)"}
                >
                  {sec.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => setEditingSection(sec)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white hover:text-black text-white rounded text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Section Modal */}
      {editingSection && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0c0c0c] border border-white/20 rounded-2xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-6 pb-4 border-b border-white/10">
              <div>
                <span className="text-[10px] font-mono text-brand-red uppercase tracking-widest block mb-1">
                  Section Config: {editingSection.key}
                </span>
                <h3 className="text-2xl font-display font-bold text-white">
                  Edit Homepage Section
                </h3>
              </div>
              <button
                onClick={() => setEditingSection(null)}
                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveSection} className="space-y-5">
              {/* Title */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-white/70 mb-2">
                  Section Title
                </label>
                <input
                  type="text"
                  value={editingSection.title}
                  onChange={(e) =>
                    setEditingSection({ ...editingSection, title: e.target.value })
                  }
                  required
                  className="w-full bg-[#141414] border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-red"
                />
              </div>

              {/* Subtitle */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-white/70 mb-2">
                  Subtitle / Tagline
                </label>
                <input
                  type="text"
                  value={editingSection.subtitle || ""}
                  onChange={(e) =>
                    setEditingSection({ ...editingSection, subtitle: e.target.value })
                  }
                  className="w-full bg-[#141414] border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-red"
                />
              </div>

              {/* Content / Body */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-white/70 mb-2">
                  Section Body Content / Copy
                </label>
                <textarea
                  rows={4}
                  value={editingSection.content || ""}
                  onChange={(e) =>
                    setEditingSection({ ...editingSection, content: e.target.value })
                  }
                  className="w-full bg-[#141414] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-brand-red"
                />
              </div>

              {/* Media URL */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-white/70 mb-2">
                    Image Asset URL
                  </label>
                  <input
                    type="text"
                    value={editingSection.image || ""}
                    onChange={(e) =>
                      setEditingSection({ ...editingSection, image: e.target.value })
                    }
                    placeholder="/images/hero-bg.webp"
                    className="w-full bg-[#141414] border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-red"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-white/70 mb-2">
                    Video URL (YouTube/Drive/MP4)
                  </label>
                  <input
                    type="text"
                    value={editingSection.videoUrl || ""}
                    onChange={(e) =>
                      setEditingSection({ ...editingSection, videoUrl: e.target.value })
                    }
                    placeholder="https://youtube.com/watch?v=..."
                    className="w-full bg-[#141414] border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-red"
                  />
                </div>
              </div>

              {/* Primary CTA */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-white/70 mb-2">
                    Primary CTA Label
                  </label>
                  <input
                    type="text"
                    value={editingSection.ctaText || ""}
                    onChange={(e) =>
                      setEditingSection({ ...editingSection, ctaText: e.target.value })
                    }
                    placeholder="Start a Project"
                    className="w-full bg-[#141414] border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-red"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-white/70 mb-2">
                    Primary CTA Link
                  </label>
                  <input
                    type="text"
                    value={editingSection.ctaLink || ""}
                    onChange={(e) =>
                      setEditingSection({ ...editingSection, ctaLink: e.target.value })
                    }
                    placeholder="/contact"
                    className="w-full bg-[#141414] border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-red"
                  />
                </div>
              </div>

              {/* Secondary CTA */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-white/70 mb-2">
                    Secondary CTA Label
                  </label>
                  <input
                    type="text"
                    value={editingSection.secondaryCtaText || ""}
                    onChange={(e) =>
                      setEditingSection({
                        ...editingSection,
                        secondaryCtaText: e.target.value,
                      })
                    }
                    placeholder="Explore Our Work"
                    className="w-full bg-[#141414] border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-red"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-white/70 mb-2">
                    Secondary CTA Link
                  </label>
                  <input
                    type="text"
                    value={editingSection.secondaryCtaLink || ""}
                    onChange={(e) =>
                      setEditingSection({
                        ...editingSection,
                        secondaryCtaLink: e.target.value,
                      })
                    }
                    placeholder="/work"
                    className="w-full bg-[#141414] border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-red"
                  />
                </div>
              </div>

              {/* Visibility Checkbox */}
              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="sectionVisible"
                  checked={editingSection.visible}
                  onChange={(e) =>
                    setEditingSection({ ...editingSection, visible: e.target.checked })
                  }
                  className="w-4 h-4 rounded accent-brand-red cursor-pointer"
                />
                <label
                  htmlFor="sectionVisible"
                  className="text-xs font-mono uppercase text-white cursor-pointer"
                >
                  Visible on public website
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
                  <span>Section updated successfully!</span>
                </div>
              )}

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingSection(null)}
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
