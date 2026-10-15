"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileText,
  Plus,
  Search,
  Edit3,
  Trash2,
  History,
  ExternalLink,
  Save,
  CheckCircle,
  AlertCircle,
  Calendar,
  Image as ImageIcon,
  Bold,
  Italic,
  Heading2,
  Heading3,
  Quote,
  List,
  Code,
  Link2,
} from "lucide-react";
import { BlogPost, BlogRevision, PublicationStatus } from "@/lib/cms/types";

interface BlogManagerProps {
  blogs: BlogPost[];
  onUpdateBlogs: (blogs: BlogPost[]) => void;
  onOpenMediaPicker?: (onSelect: (url: string) => void) => void;
}

export function BlogManager({ blogs, onUpdateBlogs, onOpenMediaPicker }: BlogManagerProps) {
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [search, setSearch] = useState("");
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Revisions Modal State
  const [showRevisions, setShowRevisions] = useState(false);
  const [revisions, setRevisions] = useState<BlogRevision[]>([]);
  const [loadingRevisions, setLoadingRevisions] = useState(false);
  const [activeBlogForRevisions, setActiveBlogForRevisions] = useState<BlogPost | null>(null);

  // Editor Tabs: Write vs Preview
  const [editorMode, setEditorMode] = useState<"write" | "preview">("write");

  // Filtered Blogs
  const filteredBlogs = blogs.filter((b) => {
    const matchesStatus = statusFilter === "ALL" || b.status === statusFilter;
    const matchesSearch =
      search === "" ||
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.category?.toLowerCase().includes(search.toLowerCase()) ||
      b.tags?.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  // Handle New Blog Post
  function handleCreateNew() {
    const newPost: BlogPost = {
      id: `blog-${Date.now()}`,
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      featuredImage: "/images/services/commercial-production.webp",
      featuredImageAlt: "",
      author: "CREATE Editorial Team",
      category: "Creative Production",
      tags: ["Storytelling", "Commercials"],
      seoTitle: "",
      metaDescription: "",
      status: "DRAFT",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setEditingBlog(newPost);
    setIsNew(true);
    setEditorMode("write");
  }

  // Handle Auto-slugify on title input
  function handleTitleChange(val: string) {
    if (!editingBlog) return;
    const updated = { ...editingBlog, title: val };
    if (isNew || !editingBlog.slug) {
      updated.slug = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
    }
    setEditingBlog(updated);
  }

  // Content formatting toolbar helper
  function insertFormat(prefix: string, suffix: string = "") {
    if (!editingBlog) return;
    const textarea = document.getElementById("blog-content-area") as HTMLTextAreaElement | null;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = editingBlog.content || "";
    const selectedText = text.substring(start, end) || "text";
    const replacement = `${prefix}${selectedText}${suffix}`;

    const newContent = text.substring(0, start) + replacement + text.substring(end);
    setEditingBlog({ ...editingBlog, content: newContent });

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + selectedText.length);
    }, 50);
  }

  // Save Blog Post
  async function handleSaveBlog(e: React.FormEvent) {
    e.preventDefault();
    if (!editingBlog) return;

    setSaving(true);
    setErrorMessage("");
    setSaveSuccess(false);

    try {
      const res = await fetch("/api/admin/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingBlog),
      });

      const data = await res.json();
      if (res.ok && data.blog) {
        setSaveSuccess(true);
        if (isNew) {
          onUpdateBlogs([data.blog, ...blogs]);
        } else {
          onUpdateBlogs(blogs.map((b) => (b.id === data.blog.id ? data.blog : b)));
        }
        setTimeout(() => {
          setEditingBlog(null);
          setIsNew(false);
          setSaveSuccess(false);
        }, 800);
      } else {
        setErrorMessage(data.error || "Failed to save blog post");
      }
    } catch {
      setErrorMessage("Network error saving blog post");
    } finally {
      setSaving(false);
    }
  }

  // Delete Blog Post
  async function handleDeleteBlog(id: string, title: string) {
    if (!window.confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/blogs?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        onUpdateBlogs(blogs.filter((b) => b.id !== id));
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete blog post");
      }
    } catch {
      alert("Network error deleting blog post");
    }
  }

  // Fetch Revisions
  async function handleOpenRevisions(blog: BlogPost) {
    setActiveBlogForRevisions(blog);
    setShowRevisions(true);
    setLoadingRevisions(true);

    try {
      const res = await fetch(`/api/admin/blogs?id=${blog.id}&action=revisions`);
      const data = await res.json();
      if (res.ok) {
        setRevisions(data.revisions || []);
      }
    } catch (err) {
      console.error("Failed to load revisions:", err);
    } finally {
      setLoadingRevisions(false);
    }
  }

  // Restore Revision
  async function handleRestoreRevision(revisionId: string) {
    if (!window.confirm("Restore this revision? Current draft content will be saved to history.")) {
      return;
    }

    try {
      const res = await fetch("/api/admin/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "restore", revisionId }),
      });
      const data = await res.json();
      if (res.ok && data.blog) {
        onUpdateBlogs(blogs.map((b) => (b.id === data.blog.id ? data.blog : b)));
        if (editingBlog && editingBlog.id === data.blog.id) {
          setEditingBlog(data.blog);
        }
        setShowRevisions(false);
        alert("Revision restored successfully!");
      }
    } catch {
      alert("Failed to restore revision");
    }
  }

  return (
    <div className="space-y-6">
      {/* Header Info & Actions */}
      <div className="bg-[#0c0c0c] p-5 rounded-xl border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-display font-bold uppercase text-white">
            Editorial & Insights Management
          </h2>
          <p className="text-xs font-mono text-white/50 mt-1">
            Publish blog articles, manage content revisions, SEO meta, and scheduled releases.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <Link
            href="/insights"
            target="_blank"
            className="flex items-center gap-1.5 px-3 py-2 border border-white/20 hover:border-white text-white rounded text-xs font-mono uppercase tracking-widest transition-colors"
          >
            <span>Live Blog</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={handleCreateNew}
            className="flex items-center gap-2 px-4 py-2 bg-brand-red hover:bg-white hover:text-black text-white font-bold uppercase tracking-wider text-xs rounded transition-colors cursor-pointer shadow-lg"
          >
            <Plus className="w-4 h-4" />
            <span>New Blog Post</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#0c0c0c] p-4 rounded-xl border border-white/10 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {["ALL", "PUBLISHED", "DRAFT", "SCHEDULED", "ARCHIVED"].map((st) => (
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

        <div className="relative w-full md:w-72">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            placeholder="Search title, category, tag..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#141414] border border-white/10 rounded-lg pl-9 pr-4 py-1.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-brand-red font-mono"
          />
        </div>
      </div>

      {/* Blogs Table */}
      <div className="bg-[#0c0c0c] border border-white/10 rounded-xl overflow-hidden">
        {filteredBlogs.length === 0 ? (
          <div className="text-center py-16">
            <FileText className="w-8 h-8 text-white/20 mx-auto mb-3" />
            <p className="text-white/50 text-sm">No articles match your criteria.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/5 font-mono uppercase tracking-widest text-xs text-white/60">
                <tr>
                  <th className="p-4">Article</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Author</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Date</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredBlogs.map((post) => (
                  <tr key={post.id} className="hover:bg-white/[0.02]">
                    <td className="p-4 max-w-md">
                      <div className="font-bold text-white text-base truncate">{post.title}</div>
                      <div className="text-xs font-mono text-white/40 truncate">
                        /insights/{post.slug}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-xs font-mono text-white/80 px-2 py-0.5 rounded bg-white/5">
                        {post.category || "General"}
                      </span>
                    </td>
                    <td className="p-4 text-xs font-mono text-white/60">
                      {post.author || "Editorial"}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2.5 py-1 rounded text-[10px] font-mono uppercase font-bold ${
                          post.status === "PUBLISHED"
                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                            : post.status === "SCHEDULED"
                            ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                            : post.status === "DRAFT"
                            ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                            : "bg-white/10 text-white/60"
                        }`}
                      >
                        {post.status}
                      </span>
                    </td>
                    <td className="p-4 font-mono text-xs text-white/40">
                      {post.publishedAt
                        ? new Date(post.publishedAt).toLocaleDateString()
                        : new Date(post.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {post.status === "PUBLISHED" && (
                          <Link
                            href={`/insights/${post.slug}`}
                            target="_blank"
                            className="p-1.5 rounded hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                            title="View on Website"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                        )}
                        <button
                          onClick={() => handleOpenRevisions(post)}
                          className="p-1.5 rounded hover:bg-white/10 text-white/60 hover:text-white transition-colors cursor-pointer"
                          title="Revision History"
                        >
                          <History className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setEditingBlog(post);
                            setIsNew(false);
                            setEditorMode("write");
                          }}
                          className="p-1.5 rounded hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
                          title="Edit Post"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteBlog(post.id, post.title)}
                          className="p-1.5 rounded hover:bg-red-500/10 text-white/40 hover:text-red-400 transition-colors cursor-pointer"
                          title="Delete Post"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Blog Editor Modal */}
      {editingBlog && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0c0c0c] border border-white/20 rounded-2xl max-w-4xl w-full p-8 max-h-[95vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-6 pb-4 border-b border-white/10">
              <div>
                <span className="text-[10px] font-mono text-brand-red uppercase tracking-widest block mb-1">
                  {isNew ? "Creating New Article" : "Editing Article"}
                </span>
                <h3 className="text-2xl font-display font-bold text-white">
                  {editingBlog.title || "Untitled Article"}
                </h3>
              </div>
              <button
                onClick={() => setEditingBlog(null)}
                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveBlog} className="space-y-6">
              {/* Row 1: Title and Slug */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-white/70 mb-2">
                    Article Title *
                  </label>
                  <input
                    type="text"
                    value={editingBlog.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    required
                    placeholder="e.g. The Craft of Cinematic Commercials"
                    className="w-full bg-[#141414] border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-red"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-white/70 mb-2">
                    URL Slug * (insights/{editingBlog.slug})
                  </label>
                  <input
                    type="text"
                    value={editingBlog.slug}
                    onChange={(e) =>
                      setEditingBlog({
                        ...editingBlog,
                        slug: e.target.value
                          .toLowerCase()
                          .replace(/[^a-z0-9-]+/g, "-"),
                      })
                    }
                    required
                    placeholder="the-craft-of-cinematic-commercials"
                    className="w-full bg-[#141414] border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm font-mono focus:outline-none focus:border-brand-red"
                  />
                </div>
              </div>

              {/* Row 2: Category, Author, Status, Scheduled Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-white/70 mb-2">
                    Category
                  </label>
                  <input
                    type="text"
                    value={editingBlog.category}
                    onChange={(e) =>
                      setEditingBlog({ ...editingBlog, category: e.target.value })
                    }
                    placeholder="Creative Production"
                    className="w-full bg-[#141414] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-brand-red"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-white/70 mb-2">
                    Author
                  </label>
                  <input
                    type="text"
                    value={editingBlog.author}
                    onChange={(e) =>
                      setEditingBlog({ ...editingBlog, author: e.target.value })
                    }
                    placeholder="CREATE Editorial"
                    className="w-full bg-[#141414] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-brand-red"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-white/70 mb-2">
                    Publication Status
                  </label>
                  <select
                    value={editingBlog.status}
                    onChange={(e) =>
                      setEditingBlog({
                        ...editingBlog,
                        status: e.target.value as PublicationStatus,
                      })
                    }
                    className="w-full bg-[#141414] border border-white/10 rounded-lg px-3 py-2 text-white text-sm font-mono uppercase focus:outline-none focus:border-brand-red cursor-pointer"
                  >
                    <option value="DRAFT">DRAFT</option>
                    <option value="IN_REVIEW">IN_REVIEW</option>
                    <option value="SCHEDULED">SCHEDULED</option>
                    <option value="PUBLISHED">PUBLISHED</option>
                    <option value="ARCHIVED">ARCHIVED</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-white/70 mb-2">
                    Publish / Schedule Date
                  </label>
                  <input
                    type="datetime-local"
                    value={
                      editingBlog.scheduledAt
                        ? editingBlog.scheduledAt.slice(0, 16)
                        : editingBlog.publishedAt
                        ? editingBlog.publishedAt.slice(0, 16)
                        : ""
                    }
                    onChange={(e) => {
                      const val = e.target.value ? new Date(e.target.value).toISOString() : undefined;
                      if (editingBlog.status === "SCHEDULED") {
                        setEditingBlog({ ...editingBlog, scheduledAt: val });
                      } else {
                        setEditingBlog({ ...editingBlog, publishedAt: val });
                      }
                    }}
                    className="w-full bg-[#141414] border border-white/10 rounded-lg px-3 py-2 text-white text-xs font-mono focus:outline-none focus:border-brand-red"
                  />
                </div>
              </div>

              {/* Row 3: Featured Image & Tags */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-white/70 mb-2">
                    Cover Image URL
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={editingBlog.featuredImage}
                      onChange={(e) =>
                        setEditingBlog({ ...editingBlog, featuredImage: e.target.value })
                      }
                      placeholder="/images/services/commercial-production.webp"
                      className="w-full bg-[#141414] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-brand-red"
                    />
                    {onOpenMediaPicker && (
                      <button
                        type="button"
                        onClick={() =>
                          onOpenMediaPicker((url) =>
                            setEditingBlog((prev) =>
                              prev ? { ...prev, featuredImage: url } : null
                            )
                          )
                        }
                        className="px-3 py-2 bg-white/10 hover:bg-white hover:text-black rounded text-xs font-mono uppercase transition-colors shrink-0"
                        title="Browse Media Library"
                      >
                        Browse
                      </button>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-white/70 mb-2">
                    Tags (Comma Separated)
                  </label>
                  <input
                    type="text"
                    value={editingBlog.tags?.join(", ") || ""}
                    onChange={(e) =>
                      setEditingBlog({
                        ...editingBlog,
                        tags: e.target.value
                          .split(",")
                          .map((t) => t.trim())
                          .filter(Boolean),
                      })
                    }
                    placeholder="Storytelling, Commercials, Video"
                    className="w-full bg-[#141414] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-brand-red"
                  />
                </div>
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-white/70 mb-2">
                  Excerpt / Summary (Displays on card preview and Google description)
                </label>
                <textarea
                  rows={2}
                  value={editingBlog.excerpt}
                  onChange={(e) =>
                    setEditingBlog({ ...editingBlog, excerpt: e.target.value })
                  }
                  required
                  placeholder="A concise summary of the article..."
                  className="w-full bg-[#141414] border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-brand-red"
                />
              </div>

              {/* Content Editor with Formatting Bar & Preview Tab */}
              <div className="border border-white/10 rounded-xl overflow-hidden bg-[#101010]">
                {/* Editor Header Bar */}
                <div className="p-2.5 bg-white/5 border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
                  {/* Mode Selector */}
                  <div className="flex items-center gap-1 bg-[#141414] p-1 rounded-lg border border-white/10">
                    <button
                      type="button"
                      onClick={() => setEditorMode("write")}
                      className={`px-3 py-1 rounded text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer ${
                        editorMode === "write"
                          ? "bg-brand-red text-white font-bold"
                          : "text-white/60 hover:text-white"
                      }`}
                    >
                      Write Markdown
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditorMode("preview")}
                      className={`px-3 py-1 rounded text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer ${
                        editorMode === "preview"
                          ? "bg-brand-red text-white font-bold"
                          : "text-white/60 hover:text-white"
                      }`}
                    >
                      Live Preview
                    </button>
                  </div>

                  {/* Formatting Buttons */}
                  {editorMode === "write" && (
                    <div className="flex items-center gap-1 text-white/60">
                      <button
                        type="button"
                        onClick={() => insertFormat("**", "**")}
                        className="p-1.5 hover:bg-white/10 hover:text-white rounded cursor-pointer"
                        title="Bold"
                      >
                        <Bold className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertFormat("*", "*")}
                        className="p-1.5 hover:bg-white/10 hover:text-white rounded cursor-pointer"
                        title="Italic"
                      >
                        <Italic className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertFormat("## ", "\n")}
                        className="p-1.5 hover:bg-white/10 hover:text-white rounded cursor-pointer"
                        title="Heading 2"
                      >
                        <Heading2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertFormat("### ", "\n")}
                        className="p-1.5 hover:bg-white/10 hover:text-white rounded cursor-pointer"
                        title="Heading 3"
                      >
                        <Heading3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertFormat("> ", "\n")}
                        className="p-1.5 hover:bg-white/10 hover:text-white rounded cursor-pointer"
                        title="Blockquote"
                      >
                        <Quote className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertFormat("- ", "\n")}
                        className="p-1.5 hover:bg-white/10 hover:text-white rounded cursor-pointer"
                        title="Bullet List"
                      >
                        <List className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertFormat("[Link Text](", ")")}
                        className="p-1.5 hover:bg-white/10 hover:text-white rounded cursor-pointer"
                        title="Link"
                      >
                        <Link2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertFormat("```\n", "\n```")}
                        className="p-1.5 hover:bg-white/10 hover:text-white rounded cursor-pointer"
                        title="Code block"
                      >
                        <Code className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Editor Body */}
                {editorMode === "write" ? (
                  <textarea
                    id="blog-content-area"
                    rows={12}
                    value={editingBlog.content}
                    onChange={(e) =>
                      setEditingBlog({ ...editingBlog, content: e.target.value })
                    }
                    placeholder="Write article in markdown format..."
                    className="w-full bg-transparent p-4 text-white text-sm font-mono leading-relaxed focus:outline-none resize-y"
                  />
                ) : (
                  <div className="p-6 prose prose-invert max-w-none text-sm text-white/80 space-y-4 max-h-[400px] overflow-y-auto">
                    {editingBlog.content ? (
                      editingBlog.content.split("\n\n").map((block, idx) => {
                        if (block.startsWith("## ")) {
                          return (
                            <h2 key={idx} className="text-xl font-bold text-white mt-4">
                              {block.replace("## ", "")}
                            </h2>
                          );
                        }
                        if (block.startsWith("### ")) {
                          return (
                            <h3 key={idx} className="text-lg font-bold text-white mt-3">
                              {block.replace("### ", "")}
                            </h3>
                          );
                        }
                        if (block.startsWith("> ")) {
                          return (
                            <blockquote
                              key={idx}
                              className="border-l-2 border-brand-red pl-4 italic text-white/60"
                            >
                              {block.replace("> ", "")}
                            </blockquote>
                          );
                        }
                        return (
                          <p key={idx} className="leading-relaxed">
                            {block}
                          </p>
                        );
                      })
                    ) : (
                      <p className="text-white/40 italic">Nothing to preview yet.</p>
                    )}
                  </div>
                )}
              </div>

              {/* SEO Settings Accordion */}
              <div className="p-4 bg-[#141414] border border-white/10 rounded-xl space-y-4">
                <div className="text-xs font-mono uppercase tracking-widest text-brand-red font-bold">
                  SEO & Social Metadata Overrides
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-widest text-white/70 mb-1">
                      SEO Title
                    </label>
                    <input
                      type="text"
                      value={editingBlog.seoTitle || ""}
                      onChange={(e) =>
                        setEditingBlog({ ...editingBlog, seoTitle: e.target.value })
                      }
                      placeholder={editingBlog.title || "Custom Google title"}
                      className="w-full bg-[#0c0c0c] border border-white/10 rounded px-3 py-2 text-white text-xs focus:outline-none focus:border-brand-red"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-widest text-white/70 mb-1">
                      Canonical URL
                    </label>
                    <input
                      type="text"
                      value={editingBlog.canonicalUrl || ""}
                      onChange={(e) =>
                        setEditingBlog({ ...editingBlog, canonicalUrl: e.target.value })
                      }
                      placeholder={`https://createagency.com/insights/${editingBlog.slug}`}
                      className="w-full bg-[#0c0c0c] border border-white/10 rounded px-3 py-2 text-white text-xs font-mono focus:outline-none focus:border-brand-red"
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
                  <span>Article saved successfully!</span>
                </div>
              )}

              {/* Submit Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                {!isNew && (
                  <button
                    type="button"
                    onClick={() => handleOpenRevisions(editingBlog)}
                    className="flex items-center gap-1.5 text-xs font-mono text-white/60 hover:text-white"
                  >
                    <History className="w-3.5 h-3.5" />
                    <span>View Revisions</span>
                  </button>
                )}
                <div className="flex items-center gap-3 ml-auto">
                  <button
                    type="button"
                    onClick={() => setEditingBlog(null)}
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
                        <span>Save Article</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Revision History Modal */}
      {showRevisions && activeBlogForRevisions && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0c0c0c] border border-white/20 rounded-2xl max-w-2xl w-full p-6 max-h-[85vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-4 pb-3 border-b border-white/10">
              <div>
                <span className="text-[10px] font-mono text-brand-red uppercase tracking-widest block mb-1">
                  Revision History
                </span>
                <h3 className="text-xl font-display font-bold text-white">
                  {activeBlogForRevisions.title}
                </h3>
              </div>
              <button
                onClick={() => setShowRevisions(false)}
                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            {loadingRevisions ? (
              <div className="py-12 text-center text-xs font-mono text-white/50">
                Loading revisions...
              </div>
            ) : revisions.length === 0 ? (
              <div className="py-12 text-center text-xs font-mono text-white/50">
                No past revisions found for this post. Revisions are created automatically whenever you edit an article.
              </div>
            ) : (
              <div className="space-y-4">
                {revisions.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-4 bg-white/[0.02] border border-white/10 rounded-xl flex items-center justify-between gap-4"
                  >
                    <div>
                      <div className="font-bold text-white text-sm mb-1">{rev.title}</div>
                      <div className="text-xs font-mono text-white/40">
                        Saved by {rev.savedBy || "admin"} on{" "}
                        {new Date(rev.createdAt).toLocaleString()}
                      </div>
                      <p className="text-xs text-white/60 mt-2 line-clamp-2">
                        {rev.excerpt || rev.content.slice(0, 100)}...
                      </p>
                    </div>
                    <button
                      onClick={() => handleRestoreRevision(rev.id)}
                      className="px-3 py-1.5 bg-brand-red hover:bg-white hover:text-black text-white rounded text-xs font-mono uppercase tracking-wider shrink-0 transition-colors cursor-pointer"
                    >
                      Restore
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
