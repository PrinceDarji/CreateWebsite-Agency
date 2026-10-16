import fs from "fs/promises";
import path from "path";
import os from "os";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";
import {
  BlogPost,
  BlogRevision,
  HomepageSection,
  MediaAsset,
  SiteSettings,
  RedirectRule,
  AuditLogEntry,
  ServiceItem,
  CampaignReport,
  AdminUser
} from "./types";
import { hashPassword, cleanEnvSecret } from "./auth";
import { servicesData } from "@/data/servicesData";
import { standardProjectsData } from "@/data/portfolioData";

const PRIMARY_DATA_DIR = path.join(process.cwd(), ".cms_data");
const TMP_DATA_DIR = path.join(os.tmpdir(), "create_cms_data");

declare global {
  // eslint-disable-next-line no-var
  var __cms_memory_store: Map<string, any> | undefined;
}
const memoryStore: Map<string, any> =
  globalThis.__cms_memory_store || (globalThis.__cms_memory_store = new Map());

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  try {
    return createClient(url, key);
  } catch {
    return null;
  }
}

async function readJsonFile<T>(filename: string, defaultValue: T): Promise<T> {
  // 1. Check runtime memory store first
  if (memoryStore.has(filename)) {
    try {
      return JSON.parse(JSON.stringify(memoryStore.get(filename)));
    } catch {}
  }

  // 2. Try primary filesystem path (.cms_data)
  try {
    const filePath = path.join(PRIMARY_DATA_DIR, filename);
    const data = await fs.readFile(filePath, "utf-8");
    const parsed = JSON.parse(data);
    memoryStore.set(filename, parsed);
    return parsed;
  } catch {}

  // 3. Try serverless fallback temp path (/tmp/create_cms_data)
  try {
    const tmpPath = path.join(TMP_DATA_DIR, filename);
    const data = await fs.readFile(tmpPath, "utf-8");
    const parsed = JSON.parse(data);
    memoryStore.set(filename, parsed);
    return parsed;
  } catch {}

  // 4. Default fallback: register in memory and attempt best-effort write
  memoryStore.set(filename, defaultValue);
  writeJsonFile(filename, defaultValue).catch(() => {});
  return defaultValue;
}

async function writeJsonFile<T>(filename: string, data: T): Promise<void> {
  // Always update in-memory store immediately
  memoryStore.set(filename, data);

  const serialized = JSON.stringify(data, null, 2);

  // Try writing to primary directory (.cms_data)
  try {
    await fs.mkdir(PRIMARY_DATA_DIR, { recursive: true });
    const filePath = path.join(PRIMARY_DATA_DIR, filename);
    await fs.writeFile(filePath, serialized, "utf-8");
    return;
  } catch {
    // Primary failed (e.g. read-only filesystem in serverless/Vercel)
  }

  // Fallback: write to /tmp directory which is writable in serverless runtimes
  try {
    await fs.mkdir(TMP_DATA_DIR, { recursive: true });
    const tmpPath = path.join(TMP_DATA_DIR, filename);
    await fs.writeFile(tmpPath, serialized, "utf-8");
  } catch (tmpErr) {
    // Even if disk write fails entirely, memoryStore retains state without crashing
    console.warn(`[CMS_STORAGE_WARN] Could not persist ${filename} to disk:`, tmpErr);
  }
}

// ──────────────────────────────────────────────
// INITIAL SEED DATA
// ──────────────────────────────────────────────
const INITIAL_BLOGS: BlogPost[] = [
  {
    id: "blog-01",
    title: "What Does a Creative Production Studio Do?",
    slug: "what-does-a-creative-production-studio-do",
    excerpt: "Creative production connects the brief, research, storytelling, production direction, and final execution across commercials, branded content, and campaigns.",
    content: `## Beyond Traditional Agency Boundaries

A creative production studio is not just a film crew, nor is it a traditional advertising agency. It sits directly at the intersection of creative strategy, high-end filmmaking, and brand narrative.

### 1. Research and Concept Development
Every strong project begins with a clear reason. We examine the audience, the market landscape, and the core message before developing visual concepts.

### 2. Direction and Pre-Production
Scripting, storyboarding, casting, location scouting, and aesthetic direction must all align with one consistent vision.

### 3. Production & Cinematic Execution
Capturing the material using purposeful cinematography, lighting, and performance.

### 4. Post-Production & Finishing
Editing, color grading, motion graphics, and sound design give the final film its rhythm and emotional resonance.`,
    featuredImage: "/images/services/commercial-production.webp",
    featuredImageAlt: "Creative production studio set",
    author: "CREATE Editorial Team",
    category: "Creative Production",
    tags: ["Commercials", "Production", "Storytelling"],
    seoTitle: "What Does a Creative Production Studio Do? | CREATE",
    metaDescription: "Explore what a creative production studio does across commercials, branded content, campaigns, and visual storytelling.",
    status: "PUBLISHED",
    publishedAt: new Date(Date.now() - 7 * 86400000).toISOString(),
    createdAt: new Date(Date.now() - 7 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 7 * 86400000).toISOString(),
  },
  {
    id: "blog-02",
    title: "Commercial Production: From Brief to Final Film",
    slug: "commercial-production-brief-to-final-film",
    excerpt: "How a commercial develops from the first discussion to the final color grade and master delivery.",
    content: `## The Journey of an Advertising Film

A commercial has seconds to make an impression. It must communicate a clear point of view and connect with viewers before they look away.

### Phase 1: Clarifying the Job of the Commercial
What must the audience understand? Where will the film live (TV, cinema, Meta, YouTube)?

### Phase 2: Treatment & Visual Language
Establishing the look, tone, color palette, camera movement, and pacing.

### Phase 3: The Shoot
Disciplined execution on set where every department works in concert.

### Phase 4: The Edit & Sound
The cut determines emotional timing; sound and music complete the immersive experience.`,
    featuredImage: "/images/services/branded-content.webp",
    featuredImageAlt: "Commercial film production camera",
    author: "CREATE Editorial Team",
    category: "Commercials",
    tags: ["Commercials", "Directing", "Film"],
    seoTitle: "Commercial Production: From Brief to Final Film | CREATE",
    metaDescription: "A step-by-step breakdown of how commercial films are produced at CREATE.",
    status: "PUBLISHED",
    publishedAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 86400000).toISOString(),
  }
];

const INITIAL_HOMEPAGE_SECTIONS: HomepageSection[] = [
  {
    id: "sec-hero",
    key: "hero",
    title: "Creative Production Studio for Commercials, Branded Content & Campaigns.",
    subtitle: "Branding so effective, it feels illegal.",
    content: "We connect research, creative thinking, production, and execution to turn ideas into work people can see, feel, and remember.",
    image: "/images/hero-bg.webp",
    imageAlt: "CREATE Studio Behind the Scenes",
    ctaText: "Start a Project",
    ctaLink: "/contact",
    secondaryCtaText: "Explore Our Work",
    secondaryCtaLink: "/work",
    visible: true,
    order: 1,
  },
  {
    id: "sec-marquee",
    key: "marquee",
    title: "Created For",
    items: [
      "Government of Meghalaya", "W.H Warehouse", "Sharda International School",
      "PWD Delhi", "No Label", "Sabrini", "P&G", "BRB", "Tipsy Tiger",
      "Troovy", "Wellbeing Nutrition", "Red Bull", "IIAC", "PW", "Protiviti",
      "AIESEC", "TrustERRA", "Korea Agro-Fisheries", "Korean Cultural Centre", "JhaJi"
    ],
    visible: true,
    order: 2,
  },
  {
    id: "sec-what-we-create",
    key: "what-we-create",
    title: "What We Create",
    subtitle: "Ideas need more than a starting point. They need research, direction, production, and careful execution.",
    items: [
      { title: "Commercials", desc: "Commercial films built around clear ideas, strong stories, and purposeful visual direction." },
      { title: "Branded Content", desc: "Brand-led stories made to communicate, connect, and give audiences something worth watching." },
      { title: "Campaigns", desc: "Creative campaign work that connects the central idea with the content and visual assets needed to bring it to life." },
      { title: "Visual Storytelling", desc: "Stories shaped through film, design, motion, sound, and creative direction." }
    ],
    visible: true,
    order: 3,
  },
  {
    id: "sec-leadership",
    key: "leadership",
    title: "The Leadership",
    subtitle: "Creative direction, strategy, and production leadership.",
    ctaText: "Meet the Team",
    ctaLink: "/about#leadership",
    visible: true,
    order: 4,
  },
  {
    id: "sec-campaign-report",
    key: "campaign-report",
    title: "Influencer Marketing Campaign Report",
    subtitle: "Featured Campaign Report • Case Study",
    content: "Explore our influencer marketing campaign, performance insights, return on investment, and key learnings.",
    ctaText: "View Campaign Report →",
    ctaLink: "/services/influencer-marketing#campaign-report",
    visible: true,
    order: 5,
  },
  {
    id: "sec-work",
    key: "some-of-our-work",
    title: "Some of Our Work",
    subtitle: "Commercials, branded content, campaigns, and films.",
    ctaText: "View All Work →",
    ctaLink: "/work",
    visible: true,
    order: 6,
  },
  {
    id: "sec-philosophy",
    key: "philosophy",
    title: "Good creative starts with understanding.",
    content: "We don't start with a camera. We start with the brief, the audience, and the message.",
    image: "/images/services/commercial-production.webp",
    visible: true,
    order: 7,
  },
  {
    id: "sec-why-choose-us",
    key: "why-choose-us",
    title: "Why Choose CREATE",
    content: "We believe in direct collaboration, creative accountability, and transparent production.",
    ctaText: "Learn More",
    ctaLink: "/why-choose-us",
    visible: true,
    order: 8,
  },
  {
    id: "sec-cta",
    key: "final-cta",
    title: "Ready to create?",
    content: "Tell us about your brand, campaign, or commercial project.",
    ctaText: "Start a Project",
    ctaLink: "/contact",
    visible: true,
    order: 9,
  }
];

const INITIAL_SETTINGS: SiteSettings = {
  siteName: "CREATE",
  tagline: "Branding so effective, it feels illegal.",
  logoUrl: "/create-logo-transparent.png",
  faviconUrl: "/favicon.ico",
  contactEmail: "createforbrands@gmail.com",
  contactPhone: "+91 98110 05532",
  address: "New Delhi, India",
  socialLinks: {
    instagram: "https://instagram.com/createforbrands",
    youtube: "https://youtube.com/@createforbrands",
    linkedin: "https://linkedin.com/company/createforbrands",
    twitter: "https://twitter.com/createforbrands"
  },
  navigation: [
    { name: "Work", href: "/work" },
    { name: "Services", href: "/services" },
    { name: "Insights", href: "/insights" },
    { name: "About", href: "/about" },
    { name: "Why Choose Us", href: "/why-choose-us" },
    { name: "Contact", href: "/contact" }
  ],
  footerText: `© ${new Date().getFullYear()} CREATE. All rights reserved.`,
  defaultSeoTitle: "Creative Production Studio for Commercials, Branded Content & Campaigns | CREATE",
  defaultMetaDescription: "CREATE is a creative production studio focused on commercials, branded content, campaigns, and visual storytelling.",
  defaultOgImage: "/images/hero-bg.webp",
  primaryColor: "#000000",
  accentColor: "#B90000"
};

const INITIAL_SERVICES: ServiceItem[] = Object.values(servicesData)
  .filter((s) => !s.isAlias)
  .map((s) => ({
    id: `svc-${s.slug}`,
    slug: s.slug,
    name: s.name,
    h1: s.h1,
    seoTitle: s.seoTitle,
    metaDescription: s.metaDescription,
    primaryKeyword: s.primaryKeyword,
    supportingKeywords: s.supportingKeywords,
    intro: s.intro,
    image: s.image,
    whatWeDo: s.whatWeDo,
    sections: s.sections,
    faqs: s.faqs,
    ctaHeading: s.ctaHeading,
    ctaText: s.ctaText,
    portfolioLink: s.portfolioLink,
    order: s.order,
    published: true,
  }));

const INITIAL_CAMPAIGN_REPORTS: CampaignReport[] = [
  {
    id: "campaign-shiva",
    title: "Shiva Immersive Campaign Report",
    client: "Shiva Immersive",
    slug: "shiva-immersive",
    overview: "Influencer marketing campaign combining creator strategy, ideation, and creator scripting across 21 reels and posts at GIP Mall, Noida.",
    objectives: [
      "Drive physical footfall to the immersive cultural venue",
      "Test diverse creator formats (Emotional voiceover, Talking-head, Music-led, Family vlogs)",
      "Establish measurable ROI and CPM benchmarks"
    ],
    metrics: [
      { label: "Total Views", value: "23,40,000+", detail: "Across all creator channels" },
      { label: "Average CPM", value: "₹59 - ₹120", detail: "Top performing tier" },
      { label: "Total Creators", value: "14 Creators", detail: "7 verified community pages" },
      { label: "Footfall Uplift", value: "+38%", detail: "During active campaign run" }
    ],
    deliverables: [
      "Creative Ideation & Content Hooks",
      "Creator Scripting & Scene Direction",
      "Campaign Logistics & On-Site Coordination",
      "Performance & ROI Audit Report"
    ],
    roi: "High-performing formats (Emotional Voiceover & Explainer) delivered 1.22x audience resonance at ₹59 CPM.",
    results: "Validated that narrative depth outperforms generic aesthetic vlogs by over 2.4x in community engagement.",
    learnings: [
      "Story-driven voiceovers convert significantly higher than music-only clips",
      "Local Delhi community pages drive immediate geographic ticket interest",
      "Creator scripting must feel conversational rather than advertising copy"
    ],
    published: true,
    coverImage: "/images/reels/shiva-reel-01.jpg",
    createdAt: new Date().toISOString(),
  }
];

// ──────────────────────────────────────────────
// BLOG OPERATIONS
// ──────────────────────────────────────────────
export async function getBlogPosts(): Promise<BlogPost[]> {
  const supabase = getSupabase();
  if (supabase) {
    const { data, error } = await supabase.from("blogs").select("*").order("createdAt", { ascending: false });
    if (!error && data && data.length > 0) return data;
  }
  return readJsonFile<BlogPost[]>("blogs.json", INITIAL_BLOGS);
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const blogs = await getBlogPosts();
  return blogs.find((b) => b.slug === slug) || null;
}

export async function getBlogPostById(id: string): Promise<BlogPost | null> {
  const blogs = await getBlogPosts();
  return blogs.find((b) => b.id === id) || null;
}

export async function saveBlogPost(post: Partial<BlogPost> & { title: string; slug: string }, actor: string): Promise<BlogPost> {
  const blogs = await getBlogPosts();
  const existingIndex = blogs.findIndex((b) => b.id === post.id || b.slug === post.slug);
  const now = new Date().toISOString();

  let savedPost: BlogPost;

  if (existingIndex >= 0) {
    const current = blogs[existingIndex];
    // Save revision before modifying
    await saveBlogRevision({
      blogId: current.id,
      title: current.title,
      content: current.content,
      excerpt: current.excerpt,
      author: current.author,
      savedBy: actor,
      createdAt: now,
    });

    savedPost = {
      ...current,
      ...post,
      updatedAt: now,
    } as BlogPost;
    blogs[existingIndex] = savedPost;
  } else {
    savedPost = {
      id: post.id || `blog-${Date.now()}`,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || "",
      content: post.content || "",
      featuredImage: post.featuredImage || "/images/services/commercial-production.webp",
      featuredImageAlt: post.featuredImageAlt || post.title,
      author: post.author || "CREATE Editorial Team",
      category: post.category || "Creative Production",
      tags: post.tags || [],
      seoTitle: post.seoTitle || `${post.title} | CREATE`,
      metaDescription: post.metaDescription || post.excerpt,
      status: post.status || "DRAFT",
      publishedAt: post.status === "PUBLISHED" ? now : undefined,
      scheduledAt: post.scheduledAt,
      createdAt: now,
      updatedAt: now,
    };
    blogs.unshift(savedPost);
  }

  await writeJsonFile("blogs.json", blogs);

  const supabase = getSupabase();
  if (supabase) {
    await supabase.from("blogs").upsert([savedPost]);
  }

  await addAuditLog(actor, existingIndex >= 0 ? "UPDATE_BLOG" : "CREATE_BLOG", `Blog: ${savedPost.title} (${savedPost.slug})`);
  return savedPost;
}

export async function deleteBlogPost(id: string, actor: string): Promise<boolean> {
  let blogs = await getBlogPosts();
  const target = blogs.find((b) => b.id === id);
  if (!target) return false;

  blogs = blogs.filter((b) => b.id !== id);
  await writeJsonFile("blogs.json", blogs);

  const supabase = getSupabase();
  if (supabase) {
    await supabase.from("blogs").delete().eq("id", id);
  }

  await addAuditLog(actor, "DELETE_BLOG", `Blog ID: ${id} (${target.title})`);
  return true;
}

export async function getBlogRevisions(blogId: string): Promise<BlogRevision[]> {
  const revisions = await readJsonFile<BlogRevision[]>("blog_revisions.json", []);
  return revisions.filter((r) => r.blogId === blogId).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

async function saveBlogRevision(revision: Omit<BlogRevision, "id">): Promise<void> {
  const revisions = await readJsonFile<BlogRevision[]>("blog_revisions.json", []);
  const newRevision: BlogRevision = {
    id: `rev-${Date.now()}`,
    ...revision,
  };
  revisions.unshift(newRevision);
  // Keep maximum 20 revisions per blog
  await writeJsonFile("blog_revisions.json", revisions.slice(0, 100));
}

export async function restoreBlogRevision(revisionId: string, actor: string): Promise<BlogPost | null> {
  const revisions = await readJsonFile<BlogRevision[]>("blog_revisions.json", []);
  const targetRev = revisions.find((r) => r.id === revisionId);
  if (!targetRev) return null;

  const blog = await getBlogPostById(targetRev.blogId);
  if (!blog) return null;

  return saveBlogPost(
    {
      id: blog.id,
      title: targetRev.title,
      slug: blog.slug,
      content: targetRev.content,
      excerpt: targetRev.excerpt,
    },
    actor
  );
}

// ──────────────────────────────────────────────
// HOMEPAGE SECTIONS
// ──────────────────────────────────────────────
export async function getHomepageSections(): Promise<HomepageSection[]> {
  const supabase = getSupabase();
  if (supabase) {
    const { data, error } = await supabase.from("homepage_sections").select("*").order("order", { ascending: true });
    if (!error && data && data.length > 0) return data;
  }
  return readJsonFile<HomepageSection[]>("homepage_sections.json", INITIAL_HOMEPAGE_SECTIONS);
}

export async function saveHomepageSection(section: HomepageSection, actor: string): Promise<HomepageSection> {
  const sections = await getHomepageSections();
  const idx = sections.findIndex((s) => s.id === section.id || s.key === section.key);
  if (idx >= 0) {
    sections[idx] = { ...sections[idx], ...section };
  } else {
    sections.push(section);
  }
  await writeJsonFile("homepage_sections.json", sections);

  const supabase = getSupabase();
  if (supabase) {
    await supabase.from("homepage_sections").upsert([section]);
  }

  await addAuditLog(actor, "UPDATE_HOMEPAGE_SECTION", `Section: ${section.title || section.key}`);
  return section;
}

export async function reorderHomepageSections(sectionIds: string[], actor: string): Promise<HomepageSection[]> {
  const sections = await getHomepageSections();
  const reordered: HomepageSection[] = [];
  sectionIds.forEach((id, index) => {
    const found = sections.find((s) => s.id === id);
    if (found) {
      found.order = index + 1;
      reordered.push(found);
    }
  });
  await writeJsonFile("homepage_sections.json", reordered);
  await addAuditLog(actor, "REORDER_HOMEPAGE_SECTIONS", `New order: ${sectionIds.join(", ")}`);
  return reordered;
}

// ──────────────────────────────────────────────
// SERVICES
// ──────────────────────────────────────────────
export async function getServices(): Promise<ServiceItem[]> {
  const supabase = getSupabase();
  if (supabase) {
    const { data, error } = await supabase.from("services").select("*").order("order", { ascending: true });
    if (!error && data && data.length > 0) return data;
  }
  return readJsonFile<ServiceItem[]>("services.json", INITIAL_SERVICES);
}

export async function saveService(service: ServiceItem, actor: string): Promise<ServiceItem> {
  const services = await getServices();
  const idx = services.findIndex((s) => s.id === service.id || s.slug === service.slug);
  if (idx >= 0) {
    services[idx] = { ...services[idx], ...service };
  } else {
    services.push(service);
  }
  await writeJsonFile("services.json", services);

  const supabase = getSupabase();
  if (supabase) {
    await supabase.from("services").upsert([service]);
  }

  await addAuditLog(actor, idx >= 0 ? "UPDATE_SERVICE" : "CREATE_SERVICE", `Service: ${service.name} (${service.slug})`);
  return service;
}

// ──────────────────────────────────────────────
// CAMPAIGN REPORTS
// ──────────────────────────────────────────────
export async function getCampaignReports(): Promise<CampaignReport[]> {
  const supabase = getSupabase();
  if (supabase) {
    const { data, error } = await supabase.from("campaign_reports").select("*");
    if (!error && data && data.length > 0) return data;
  }
  return readJsonFile<CampaignReport[]>("campaign_reports.json", INITIAL_CAMPAIGN_REPORTS);
}

export async function saveCampaignReport(report: CampaignReport, actor: string): Promise<CampaignReport> {
  const reports = await getCampaignReports();
  const idx = reports.findIndex((r) => r.id === report.id || r.slug === report.slug);
  if (idx >= 0) {
    reports[idx] = { ...reports[idx], ...report };
  } else {
    reports.push(report);
  }
  await writeJsonFile("campaign_reports.json", reports);

  const supabase = getSupabase();
  if (supabase) {
    await supabase.from("campaign_reports").upsert([report]);
  }

  await addAuditLog(actor, idx >= 0 ? "UPDATE_CAMPAIGN_REPORT" : "CREATE_CAMPAIGN_REPORT", `Report: ${report.title}`);
  return report;
}

// ──────────────────────────────────────────────
// MEDIA LIBRARY & USAGE TRACKING
// ──────────────────────────────────────────────
export async function getMediaAssets(): Promise<MediaAsset[]> {
  const media = await readJsonFile<MediaAsset[]>("media.json", [
    {
      id: "med-01",
      filename: "commercial-production.webp",
      url: "/images/services/commercial-production.webp",
      mimeType: "image/webp",
      size: 77694,
      altText: "Commercial Production Camera Rig",
      uploadedBy: "Admin",
      createdAt: new Date().toISOString(),
    },
    {
      id: "med-02",
      filename: "hero-bg.webp",
      url: "/images/hero-bg.webp",
      mimeType: "image/webp",
      size: 294646,
      altText: "Studio Set Behind The Scenes",
      uploadedBy: "Admin",
      createdAt: new Date().toISOString(),
    }
  ]);
  return media;
}

export async function saveMediaAsset(asset: MediaAsset, actor: string): Promise<MediaAsset> {
  const media = await getMediaAssets();
  media.unshift(asset);
  await writeJsonFile("media.json", media);
  await addAuditLog(actor, "UPLOAD_MEDIA", `File: ${asset.filename} (${asset.url})`);
  return asset;
}

export async function checkMediaUsage(assetUrl: string): Promise<string[]> {
  const usages: string[] = [];
  const blogs = await getBlogPosts();
  blogs.forEach((b) => {
    if (b.featuredImage === assetUrl || b.content?.includes(assetUrl)) {
      usages.push(`Blog: "${b.title}"`);
    }
  });

  const sections = await getHomepageSections();
  sections.forEach((s) => {
    if (s.image === assetUrl) {
      usages.push(`Homepage Section: "${s.title || s.key}"`);
    }
  });

  const services = await getServices();
  services.forEach((s) => {
    if (s.image === assetUrl) {
      usages.push(`Service: "${s.name}"`);
    }
  });

  return usages;
}

export async function deleteMediaAsset(id: string, actor: string): Promise<{ success: boolean; inUse?: string[] }> {
  const media = await getMediaAssets();
  const asset = media.find((m) => m.id === id);
  if (!asset) return { success: false };

  const usages = await checkMediaUsage(asset.url);
  if (usages.length > 0) {
    return { success: false, inUse: usages };
  }

  const updated = media.filter((m) => m.id !== id);
  await writeJsonFile("media.json", updated);
  await addAuditLog(actor, "DELETE_MEDIA", `Asset: ${asset.filename}`);
  return { success: true };
}

// ──────────────────────────────────────────────
// SITE SETTINGS
// ──────────────────────────────────────────────
export async function getSiteSettings(): Promise<SiteSettings> {
  const supabase = getSupabase();
  if (supabase) {
    const { data, error } = await supabase.from("site_settings").select("settings").single();
    if (!error && data?.settings) return data.settings;
  }
  return readJsonFile<SiteSettings>("site_settings.json", INITIAL_SETTINGS);
}

export async function saveSiteSettings(settings: SiteSettings, actor: string): Promise<SiteSettings> {
  await writeJsonFile("site_settings.json", settings);

  const supabase = getSupabase();
  if (supabase) {
    await supabase.from("site_settings").upsert([{ id: 1, settings, updated_at: new Date().toISOString() }]);
  }

  await addAuditLog(actor, "UPDATE_SITE_SETTINGS", "Global settings updated");
  return settings;
}

// ──────────────────────────────────────────────
// REDIRECT RULES
// ──────────────────────────────────────────────
export async function getRedirectRules(): Promise<RedirectRule[]> {
  return readJsonFile<RedirectRule[]>("redirects.json", [
    {
      id: "redir-01",
      source: "/services/brand-and-visual-design",
      destination: "/services/brand-visual-design",
      permanent: true,
      createdAt: new Date().toISOString(),
    }
  ]);
}

export async function saveRedirectRule(rule: Omit<RedirectRule, "id" | "createdAt">, actor: string): Promise<RedirectRule> {
  const rules = await getRedirectRules();
  const newRule: RedirectRule = {
    id: `redir-${Date.now()}`,
    source: rule.source.trim(),
    destination: rule.destination.trim(),
    permanent: rule.permanent,
    createdAt: new Date().toISOString(),
  };
  rules.push(newRule);
  await writeJsonFile("redirects.json", rules);
  await addAuditLog(actor, "CREATE_REDIRECT", `${newRule.source} → ${newRule.destination}`);
  return newRule;
}

export async function deleteRedirectRule(id: string, actor: string): Promise<boolean> {
  let rules = await getRedirectRules();
  const rule = rules.find((r) => r.id === id);
  if (!rule) return false;
  rules = rules.filter((r) => r.id !== id);
  await writeJsonFile("redirects.json", rules);
  await addAuditLog(actor, "DELETE_REDIRECT", `Removed redirect: ${rule.source}`);
  return true;
}

// ──────────────────────────────────────────────
// AUDIT LOGS
// ──────────────────────────────────────────────
export async function getAuditLogs(): Promise<AuditLogEntry[]> {
  return readJsonFile<AuditLogEntry[]>("audit_logs.json", []);
}

export async function addAuditLog(actor: string, action: string, resource: string, details?: string, ip?: string): Promise<void> {
  try {
    const logs = await readJsonFile<AuditLogEntry[]>("audit_logs.json", []);
    const entry: AuditLogEntry = {
      id: `audit-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      actor: actor || "admin",
      action,
      resource,
      details,
      ip: ip || "127.0.0.1",
      timestamp: new Date().toISOString(),
    };
    logs.unshift(entry);
    // Keep last 500 audit logs
    await writeJsonFile("audit_logs.json", logs.slice(0, 500));

    const supabase = getSupabase();
    if (supabase) {
      try {
        await supabase.from("audit_logs").insert([entry]);
      } catch (sbErr) {
        console.warn("[AUDIT_LOG_SUPABASE_WARN]", sbErr);
      }
    }
  } catch (err) {
    console.warn("[AUDIT_LOG_WARN]", err);
  }
}

// ──────────────────────────────────────────────
// ADMIN USERS
// ──────────────────────────────────────────────
export function getInitialAdmins(): AdminUser[] {
  const defaultEmail = (cleanEnvSecret(process.env.ADMIN_EMAIL) || "admin@createforbrands.com").toLowerCase().trim();
  const defaultPassword = cleanEnvSecret(process.env.ADMIN_PASSWORD) || "createadmin2026";
  const salt = "6b7806ec56107020d2f3d8b6a60afdb0";
  const hash = crypto.pbkdf2Sync(defaultPassword, salt, 100000, 64, "sha512").toString("hex");
  return [
    {
      id: "admin-super",
      email: defaultEmail,
      name: "CREATE Studio Admin",
      role: "SUPER_ADMIN",
      status: "ACTIVE",
      passwordHash: hash,
      salt,
      createdAt: "2026-10-15T16:08:20.213Z",
      updatedAt: new Date().toISOString(),
    },
  ];
}

export async function getAdminUsers(): Promise<AdminUser[]> {
  const supabase = getSupabase();
  if (supabase) {
    try {
      const { data, error } = await supabase.from("admins").select("*");
      if (!error && data && data.length > 0) {
        return data.map((d: any) => ({
          id: d.id,
          email: d.email,
          name: d.name,
          role: d.role,
          status: d.status,
          passwordHash: d.password_hash || d.passwordHash,
          salt: d.salt,
          createdAt: d.created_at || d.createdAt,
          updatedAt: d.updated_at || d.updatedAt,
          lastLoginAt: d.last_login_at || d.lastLoginAt,
          resetToken: d.reset_token || d.resetToken,
          resetTokenExpiry: d.reset_token_expiry || d.resetTokenExpiry,
        }));
      }
    } catch (sbErr) {
      console.warn("[SUPABASE_ADMINS_WARN]", sbErr);
    }
  }

  const fileAdmins = await readJsonFile<AdminUser[]>("admins.json", getInitialAdmins());
  if (!fileAdmins || fileAdmins.length === 0) {
    const initial = getInitialAdmins();
    writeJsonFile("admins.json", initial).catch(() => {});
    return initial;
  }
  return fileAdmins;
}

export async function getAdminUserByEmail(email: string): Promise<AdminUser | null> {
  if (!email || typeof email !== "string") return null;
  const cleaned = email.toLowerCase().trim();
  const users = await getAdminUsers();

  // 1. Exact match on cleaned email
  const exact = users.find((u) => u.email.toLowerCase().trim() === cleaned);
  if (exact) return exact;

  // 2. Username prefix match (e.g. "admin" matching "admin@createforbrands.com")
  const usernameMatch = users.find((u) => {
    const prefix = u.email.split("@")[0]?.toLowerCase().trim();
    return prefix === cleaned;
  });
  if (usernameMatch) return usernameMatch;

  // 3. Match against ADMIN_EMAIL env if configured
  const envEmail = (cleanEnvSecret(process.env.ADMIN_EMAIL) || "").toLowerCase().trim();
  if (envEmail && cleaned === envEmail && users.length > 0) {
    return users.find((u) => u.role === "SUPER_ADMIN") || users[0];
  }

  // 4. Studio alias match: "createforbrands@gmail.com"
  const contactEmail = (cleanEnvSecret(process.env.CONTACT_EMAIL) || "createforbrands@gmail.com").toLowerCase().trim();
  if (cleaned === contactEmail || cleaned === "createforbrands@gmail.com") {
    if (users.length === 1) {
      return users[0];
    }
    const aliasMatch = users.find((u) => u.email.toLowerCase().trim() === contactEmail);
    if (aliasMatch) return aliasMatch;
  }

  return null;
}

export async function getAdminUserById(id: string): Promise<AdminUser | null> {
  const users = await getAdminUsers();
  return users.find((u) => u.id === id) || null;
}

export async function saveAdminUser(user: AdminUser, actor: string): Promise<AdminUser> {
  try {
    const users = await getAdminUsers();
    const existingIndex = users.findIndex(
      (u) => u.id === user.id || u.email.toLowerCase() === user.email.toLowerCase()
    );
    const now = new Date().toISOString();
    const updatedUser: AdminUser = {
      ...user,
      updatedAt: now,
    };

    if (existingIndex >= 0) {
      users[existingIndex] = updatedUser;
    } else {
      users.push(updatedUser);
    }

    await writeJsonFile("admins.json", users);

    const supabase = getSupabase();
    if (supabase) {
      try {
        await supabase.from("admins").upsert([
          {
            id: updatedUser.id,
            email: updatedUser.email,
            name: updatedUser.name,
            role: updatedUser.role,
            status: updatedUser.status,
            password_hash: updatedUser.passwordHash,
            salt: updatedUser.salt,
            created_at: updatedUser.createdAt,
            updated_at: updatedUser.updatedAt,
            last_login_at: updatedUser.lastLoginAt,
            reset_token: updatedUser.resetToken,
            reset_token_expiry: updatedUser.resetTokenExpiry,
          },
        ]);
      } catch (sbErr) {
        console.warn("[SAVE_ADMIN_SUPABASE_WARN]", sbErr);
      }
    }

    try {
      await addAuditLog(
        actor,
        existingIndex >= 0 ? "UPDATE_ADMIN_USER" : "CREATE_ADMIN_USER",
        `Admin: ${updatedUser.email}`
      );
    } catch {}

    return updatedUser;
  } catch (err) {
    console.warn("[SAVE_ADMIN_USER_WARN]", err);
    return user;
  }
}

export async function deleteAdminUser(
  id: string,
  actor: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const users = await getAdminUsers();
    const target = users.find((u) => u.id === id);
    if (!target) return { success: false, error: "Admin user not found" };

    const activeSuperAdmins = users.filter(
      (u) => u.role === "SUPER_ADMIN" && u.status === "ACTIVE" && u.id !== id
    );
    if (target.role === "SUPER_ADMIN" && activeSuperAdmins.length === 0) {
      return { success: false, error: "Cannot delete the only active Super Admin" };
    }

    const updated = users.filter((u) => u.id !== id);
    await writeJsonFile("admins.json", updated);

    const supabase = getSupabase();
    if (supabase) {
      try {
        await supabase.from("admins").delete().eq("id", id);
      } catch (sbErr) {
        console.warn("[DELETE_ADMIN_SUPABASE_WARN]", sbErr);
      }
    }

    try {
      await addAuditLog(actor, "DELETE_ADMIN_USER", `Admin: ${target.email}`);
    } catch {}

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || "Failed to delete administrator" };
  }
}
