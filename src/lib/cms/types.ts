export type PublicationStatus = "DRAFT" | "IN_REVIEW" | "SCHEDULED" | "PUBLISHED" | "ARCHIVED";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string; // Markdown or sanitized rich text
  featuredImage: string;
  featuredImageAlt?: string;
  author: string;
  category: string;
  tags: string[];
  seoTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogTitle?: string;
  ogDescription?: string;
  status: PublicationStatus;
  publishedAt?: string;
  scheduledAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BlogRevision {
  id: string;
  blogId: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  savedBy: string;
  createdAt: string;
}

export interface HomepageSection {
  id: string;
  key: string;
  title: string;
  subtitle?: string;
  content?: string;
  image?: string;
  imageAlt?: string;
  videoUrl?: string;
  ctaText?: string;
  ctaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  items?: any[];
  visible: boolean;
  order: number;
}

export interface MediaAsset {
  id: string;
  filename: string;
  url: string;
  mimeType: string;
  size: number;
  width?: number;
  height?: number;
  altText: string;
  caption?: string;
  uploadedBy: string;
  createdAt: string;
  referencedIn?: string[]; // IDs or paths of content referencing this asset
}

export interface SiteSettings {
  siteName: string;
  tagline: string;
  logoUrl: string;
  faviconUrl: string;
  contactEmail: string;
  contactPhone: string;
  address?: string;
  socialLinks: {
    instagram?: string;
    youtube?: string;
    linkedin?: string;
    twitter?: string;
  };
  navigation: Array<{
    name: string;
    href: string;
  }>;
  footerText: string;
  defaultSeoTitle: string;
  defaultMetaDescription: string;
  defaultOgImage: string;
  primaryColor: string;
  accentColor: string;
}

export interface RedirectRule {
  id: string;
  source: string;
  destination: string;
  permanent: boolean;
  createdAt: string;
}

export interface AuditLogEntry {
  id: string;
  actor: string;
  action: string;
  resource: string;
  details?: string;
  ip?: string;
  timestamp: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  name: string;
  h1: string;
  seoTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  supportingKeywords: string[];
  intro: string;
  image: string;
  whatWeDo: Array<{ title: string; desc: string } | string>;
  sections: Array<{ heading: string; paragraphs: string[] }>;
  faqs: Array<{ question: string; answer: string }>;
  ctaHeading: string;
  ctaText: string[];
  portfolioLink: string;
  order: number;
  published: boolean;
}

export interface CampaignReport {
  id: string;
  title: string;
  client: string;
  slug: string;
  overview: string;
  objectives: string[];
  metrics: Array<{ label: string; value: string; detail?: string }>;
  deliverables: string[];
  roi: string;
  results: string;
  learnings: string[];
  published: boolean;
  coverImage?: string;
  createdAt: string;
}
