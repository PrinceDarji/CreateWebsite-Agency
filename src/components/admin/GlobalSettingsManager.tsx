"use client";

import React, { useState } from "react";
import {
  Sliders,
  Save,
  CheckCircle,
  AlertCircle,
  Globe,
  Mail,
  Phone,
  MapPin,
  Share2,
} from "lucide-react";
import { SiteSettings } from "@/lib/cms/types";

interface GlobalSettingsManagerProps {
  settings: SiteSettings;
  onUpdateSettings: (settings: SiteSettings) => void;
}

export function GlobalSettingsManager({
  settings,
  onUpdateSettings,
}: GlobalSettingsManagerProps) {
  const [formData, setFormData] = useState<SiteSettings>(settings);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setErrorMessage("");
    setSaveSuccess(false);

    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.settings) {
        setSaveSuccess(true);
        onUpdateSettings(data.settings);
        setTimeout(() => setSaveSuccess(false), 2500);
      } else {
        setErrorMessage(data.error || "Failed to save settings");
      }
    } catch {
      setErrorMessage("Network error saving settings");
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
            Global Site Settings
          </h2>
          <p className="text-xs font-mono text-white/50 mt-1">
            Configure studio brand identity, contact endpoints, social channels, and default SEO.
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Brand & Studio Identity */}
        <div className="bg-[#0c0c0c] border border-white/10 rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-brand-red font-bold">
            <Globe className="w-4 h-4" />
            <span>Studio Identity</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-white/70 mb-2">
                Site / Studio Name
              </label>
              <input
                type="text"
                value={formData.siteName}
                onChange={(e) =>
                  setFormData({ ...formData, siteName: e.target.value })
                }
                required
                className="w-full bg-[#141414] border border-white/10 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-brand-red"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-white/70 mb-2">
                Brand Tagline
              </label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) =>
                  setFormData({ ...formData, tagline: e.target.value })
                }
                required
                className="w-full bg-[#141414] border border-white/10 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-brand-red"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-white/70 mb-2">
                Logo Asset URL
              </label>
              <input
                type="text"
                value={formData.logoUrl}
                onChange={(e) =>
                  setFormData({ ...formData, logoUrl: e.target.value })
                }
                className="w-full bg-[#141414] border border-white/10 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-brand-red"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-white/70 mb-2">
                Favicon Asset URL
              </label>
              <input
                type="text"
                value={formData.faviconUrl}
                onChange={(e) =>
                  setFormData({ ...formData, faviconUrl: e.target.value })
                }
                className="w-full bg-[#141414] border border-white/10 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-brand-red"
              />
            </div>
          </div>
        </div>

        {/* Contact Endpoints */}
        <div className="bg-[#0c0c0c] border border-white/10 rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-brand-red font-bold">
            <Mail className="w-4 h-4" />
            <span>Studio Inbound & Contact</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-white/70 mb-2">
                Official Contact Email
              </label>
              <input
                type="email"
                value={formData.contactEmail}
                onChange={(e) =>
                  setFormData({ ...formData, contactEmail: e.target.value })
                }
                required
                className="w-full bg-[#141414] border border-white/10 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-brand-red"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-white/70 mb-2">
                Phone Number
              </label>
              <input
                type="text"
                value={formData.contactPhone}
                onChange={(e) =>
                  setFormData({ ...formData, contactPhone: e.target.value })
                }
                className="w-full bg-[#141414] border border-white/10 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-brand-red"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-white/70 mb-2">
                Studio Address / Base
              </label>
              <input
                type="text"
                value={formData.address || ""}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                placeholder="India / Global"
                className="w-full bg-[#141414] border border-white/10 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-brand-red"
              />
            </div>
          </div>
        </div>

        {/* Social Channels */}
        <div className="bg-[#0c0c0c] border border-white/10 rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-brand-red font-bold">
            <Share2 className="w-4 h-4" />
            <span>Social Channels</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-white/70 mb-2">
                Instagram URL
              </label>
              <input
                type="text"
                value={formData.socialLinks?.instagram || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    socialLinks: { ...formData.socialLinks, instagram: e.target.value },
                  })
                }
                className="w-full bg-[#141414] border border-white/10 rounded px-3 py-2 text-white text-xs focus:outline-none focus:border-brand-red"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-white/70 mb-2">
                YouTube URL
              </label>
              <input
                type="text"
                value={formData.socialLinks?.youtube || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    socialLinks: { ...formData.socialLinks, youtube: e.target.value },
                  })
                }
                className="w-full bg-[#141414] border border-white/10 rounded px-3 py-2 text-white text-xs focus:outline-none focus:border-brand-red"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-white/70 mb-2">
                LinkedIn URL
              </label>
              <input
                type="text"
                value={formData.socialLinks?.linkedin || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    socialLinks: { ...formData.socialLinks, linkedin: e.target.value },
                  })
                }
                className="w-full bg-[#141414] border border-white/10 rounded px-3 py-2 text-white text-xs focus:outline-none focus:border-brand-red"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-white/70 mb-2">
                Twitter / X URL
              </label>
              <input
                type="text"
                value={formData.socialLinks?.twitter || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    socialLinks: { ...formData.socialLinks, twitter: e.target.value },
                  })
                }
                className="w-full bg-[#141414] border border-white/10 rounded px-3 py-2 text-white text-xs focus:outline-none focus:border-brand-red"
              />
            </div>
          </div>
        </div>

        {/* Global Footer & Default SEO */}
        <div className="bg-[#0c0c0c] border border-white/10 rounded-xl p-6 space-y-4">
          <div className="text-xs font-mono uppercase tracking-widest text-brand-red font-bold">
            Footer Text & Default SEO Meta
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-widest text-white/70 mb-2">
              Global Footer Statement
            </label>
            <input
              type="text"
              value={formData.footerText}
              onChange={(e) =>
                setFormData({ ...formData, footerText: e.target.value })
              }
              className="w-full bg-[#141414] border border-white/10 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-brand-red"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-white/70 mb-2">
                Default Meta Title
              </label>
              <input
                type="text"
                value={formData.defaultSeoTitle}
                onChange={(e) =>
                  setFormData({ ...formData, defaultSeoTitle: e.target.value })
                }
                className="w-full bg-[#141414] border border-white/10 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-brand-red"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-white/70 mb-2">
                Default Meta Description
              </label>
              <textarea
                rows={2}
                value={formData.defaultMetaDescription}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    defaultMetaDescription: e.target.value,
                  })
                }
                className="w-full bg-[#141414] border border-white/10 rounded p-2.5 text-white text-xs focus:outline-none focus:border-brand-red"
              />
            </div>
          </div>
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
            <span>Site settings saved successfully!</span>
          </div>
        )}

        <div className="flex justify-end pt-2">
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
                <span>Save Site Settings</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
