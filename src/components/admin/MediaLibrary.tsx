"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import {
  Image as ImageIcon,
  UploadCloud,
  Search,
  Copy,
  Check,
  Trash2,
  AlertTriangle,
  ExternalLink,
  Info,
} from "lucide-react";
import { MediaAsset } from "@/lib/cms/types";

interface MediaLibraryProps {
  media: MediaAsset[];
  onUpdateMedia: (media: MediaAsset[]) => void;
  onSelectAsset?: (url: string) => void;
}

export function MediaLibrary({
  media,
  onUpdateMedia,
  onSelectAsset,
}: MediaLibraryProps) {
  const [search, setSearch] = useState("");
  const [uploading, setUploading] = useState(false);
  const [altText, setAltText] = useState("");
  const [caption, setCaption] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Safe Deletion Modal
  const [deleteTarget, setDeleteTarget] = useState<MediaAsset | null>(null);
  const [inUseList, setInUseList] = useState<string[] | null>(null);
  const [checkingUsage, setCheckingUsage] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Filter
  const filteredMedia = media.filter(
    (m) =>
      m.filename.toLowerCase().includes(search.toLowerCase()) ||
      m.altText?.toLowerCase().includes(search.toLowerCase()) ||
      m.url.toLowerCase().includes(search.toLowerCase())
  );

  // Handle Copy URL
  function handleCopyUrl(url: string, id: string) {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  // Handle File Upload
  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert("File exceeds maximum upload limit of 10MB");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("altText", altText || file.name);
    formData.append("caption", caption);

    try {
      const res = await fetch("/api/admin/media", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.asset) {
        onUpdateMedia([data.asset, ...media]);
        setAltText("");
        setCaption("");
        if (fileInputRef.current) fileInputRef.current.value = "";
      } else {
        alert(data.error || "Failed to upload image");
      }
    } catch {
      alert("Upload error. Please try again.");
    } finally {
      setUploading(false);
    }
  }

  // Check Usage Before Deletion
  async function initiateDelete(asset: MediaAsset) {
    setDeleteTarget(asset);
    setCheckingUsage(true);
    setInUseList(null);

    try {
      const res = await fetch(
        `/api/admin/media?checkUsage=${encodeURIComponent(asset.url)}`
      );
      const data = await res.json();
      if (res.ok && data.inUse && data.inUse.length > 0) {
        setInUseList(data.inUse);
      } else {
        setInUseList([]);
      }
    } catch {
      setInUseList([]);
    } finally {
      setCheckingUsage(false);
    }
  }

  // Confirm Delete
  async function confirmDelete() {
    if (!deleteTarget) return;
    setDeleting(true);

    try {
      const res = await fetch(`/api/admin/media?id=${deleteTarget.id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (res.ok && data.success) {
        onUpdateMedia(media.filter((m) => m.id !== deleteTarget.id));
        setDeleteTarget(null);
      } else if (data.inUse) {
        setInUseList(data.inUse);
      } else {
        alert(data.error || "Failed to delete asset");
      }
    } catch {
      alert("Network error deleting asset");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-[#0c0c0c] p-5 rounded-xl border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-display font-bold uppercase text-white">
            Universal Media Library ({media.length} Assets)
          </h2>
          <p className="text-xs font-mono text-white/50 mt-1">
            Optimized storage for hero photography, reel covers, and editorial graphics.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            placeholder="Search assets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#141414] border border-white/10 rounded-lg pl-9 pr-4 py-1.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-brand-red font-mono"
          />
        </div>
      </div>

      {/* Upload Dropzone / Panel */}
      <div className="bg-[#0c0c0c] border border-white/10 rounded-xl p-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div
            onClick={() => fileInputRef.current?.click()}
            className="w-full md:w-1/2 border-2 border-dashed border-white/20 hover:border-brand-red rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-colors group"
          >
            <UploadCloud className="w-10 h-10 text-white/40 group-hover:text-brand-red transition-colors mb-3" />
            <div className="font-bold text-white text-sm uppercase font-display mb-1">
              Select or Drop Media File
            </div>
            <p className="text-xs font-mono text-white/40">
              Supports JPG, PNG, WEBP, GIF, SVG (Max 10MB)
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>

          <div className="w-full md:w-1/2 space-y-3">
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-white/60 mb-1">
                Alt Text (For Accessibility & SEO)
              </label>
              <input
                type="text"
                value={altText}
                onChange={(e) => setAltText(e.target.value)}
                placeholder="e.g. Shiva Immersive Reel cover shoot"
                className="w-full bg-[#141414] border border-white/10 rounded px-3 py-2 text-white text-xs focus:outline-none focus:border-brand-red"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-white/60 mb-1">
                Optional Caption
              </label>
              <input
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="e.g. Campaign Production 2026"
                className="w-full bg-[#141414] border border-white/10 rounded px-3 py-2 text-white text-xs focus:outline-none focus:border-brand-red"
              />
            </div>
            {uploading && (
              <div className="flex items-center gap-2 text-xs font-mono text-brand-red">
                <div className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                <span>Processing and optimizing asset...</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Media Asset Grid */}
      {filteredMedia.length === 0 ? (
        <div className="bg-[#0c0c0c] border border-white/10 rounded-xl p-12 text-center">
          <ImageIcon className="w-8 h-8 text-white/20 mx-auto mb-3" />
          <p className="text-white/50 text-sm">No media assets found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredMedia.map((asset) => (
            <div
              key={asset.id}
              className="bg-[#0c0c0c] border border-white/10 rounded-xl overflow-hidden flex flex-col justify-between group hover:border-brand-red/40 transition-colors"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-video bg-[#141414] flex items-center justify-center overflow-hidden">
                {asset.url.startsWith("http") || asset.url.startsWith("/") ? (
                  <img
                    src={asset.url}
                    alt={asset.altText || asset.filename}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                ) : (
                  <ImageIcon className="w-8 h-8 text-white/30" />
                )}
                {onSelectAsset && (
                  <button
                    onClick={() => onSelectAsset(asset.url)}
                    className="absolute inset-0 bg-brand-red/80 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Select Asset
                  </button>
                )}
              </div>

              {/* Asset Info & Actions */}
              <div className="p-3">
                <div className="font-bold text-white text-xs truncate mb-1" title={asset.filename}>
                  {asset.filename}
                </div>
                <div className="flex items-center justify-between text-[10px] font-mono text-white/40 mb-3">
                  <span>
                    {asset.size
                      ? asset.size > 1024 * 1024
                        ? `${(asset.size / (1024 * 1024)).toFixed(1)} MB`
                        : `${Math.round(asset.size / 1024)} KB`
                      : "—"}
                  </span>
                  <span>{asset.mimeType?.replace("image/", "").toUpperCase()}</span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/10">
                  <button
                    onClick={() => handleCopyUrl(asset.url, asset.id)}
                    className="flex items-center gap-1 text-[11px] font-mono text-white/60 hover:text-white transition-colors cursor-pointer"
                    title="Copy Image URL"
                  >
                    {copiedId === asset.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy URL</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => initiateDelete(asset)}
                    className="p-1 rounded hover:bg-red-500/10 text-white/30 hover:text-red-400 transition-colors cursor-pointer"
                    title="Delete Asset"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Safe Deletion Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0c0c0c] border border-white/20 rounded-2xl max-w-md w-full p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 rounded-full bg-red-950/50 border border-red-500/30 text-brand-red shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-display font-bold text-white mb-1">
                  Delete Media Asset
                </h3>
                <p className="text-xs font-mono text-white/50 truncate">
                  {deleteTarget.filename}
                </p>
              </div>
            </div>

            {checkingUsage ? (
              <div className="py-6 text-center text-xs font-mono text-white/50">
                Verifying content usage across blogs, services, and homepage...
              </div>
            ) : inUseList && inUseList.length > 0 ? (
              <div className="space-y-4">
                <div className="p-3 rounded bg-amber-950/40 border border-amber-500/30 text-amber-200 text-xs font-mono">
                  <strong>Warning:</strong> This media asset is currently referenced in:
                  <ul className="list-disc list-inside mt-2 space-y-1 text-white/80">
                    {inUseList.map((usage, idx) => (
                      <li key={idx}>{usage}</li>
                    ))}
                  </ul>
                  <p className="mt-2 text-amber-300">
                    Deleting this asset will create broken images. Please replace the reference in the above content before deleting.
                  </p>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => setDeleteTarget(null)}
                    className="px-4 py-2 bg-white/10 hover:bg-white hover:text-black rounded text-xs font-mono uppercase tracking-wider text-white transition-colors cursor-pointer"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-white/70">
                  This asset is safe to delete and is not referenced by any live content. Are you sure you want to permanently remove it?
                </p>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                  <button
                    onClick={() => setDeleteTarget(null)}
                    className="px-4 py-2 rounded border border-white/10 text-white/70 hover:text-white text-xs font-mono uppercase transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDelete}
                    disabled={deleting}
                    className="px-5 py-2 bg-brand-red hover:bg-red-700 text-white font-bold uppercase tracking-wider text-xs rounded transition-colors cursor-pointer disabled:opacity-50"
                  >
                    {deleting ? "Deleting..." : "Permanently Delete"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
