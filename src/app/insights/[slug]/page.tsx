import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getBlogPosts, getBlogPostBySlug } from "@/lib/cms/storage";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogPostBySlug(slug);
  if (!blog) return { title: { absolute: "Article Not Found | CREATE" } };

  const canonicalUrl = blog.canonicalUrl || `https://createforbrands.com/insights/${blog.slug}`;
  const imageUrl = blog.ogImage || blog.featuredImage ? `https://createforbrands.com${blog.featuredImage}` : undefined;

  return {
    title: {
      absolute: blog.seoTitle || `${blog.title} | CREATE Insights`,
    },
    description: blog.metaDescription || blog.excerpt,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: blog.ogTitle || blog.title,
      description: blog.ogDescription || blog.metaDescription || blog.excerpt,
      url: canonicalUrl,
      type: "article",
      publishedTime: blog.publishedAt || blog.createdAt,
      authors: [blog.author],
      images: imageUrl ? [{ url: imageUrl }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.excerpt,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}

export async function generateStaticParams() {
  const blogs = await getBlogPosts();
  return blogs.map((b) => ({
    slug: b.slug,
  }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const blog = await getBlogPostBySlug(slug);

  if (!blog) {
    notFound();
  }

  // Check publication visibility
  const now = new Date();
  const isScheduled = blog.status === "SCHEDULED" && blog.scheduledAt && new Date(blog.scheduledAt) > now;
  const isPrivate = blog.status === "DRAFT" || blog.status === "ARCHIVED" || isScheduled;

  if (isPrivate) {
    notFound();
  }

  const wordCount = blog.content ? blog.content.split(/\s+/).length : 500;
  const readTime = `${Math.max(1, Math.ceil(wordCount / 200))} min read`;

  // Render markdown-like sections
  const paragraphs = blog.content.split("\n\n");

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: blog.title,
    description: blog.excerpt,
    author: {
      "@type": "Person",
      name: blog.author || "CREATE Editorial Team",
    },
    publisher: {
      "@type": "Organization",
      name: "CREATE",
      url: "https://createforbrands.com",
    },
    datePublished: blog.publishedAt || blog.createdAt,
    dateModified: blog.updatedAt || blog.createdAt,
    mainEntityOfPage: `https://createforbrands.com/insights/${blog.slug}`,
    image: `https://createforbrands.com${blog.featuredImage}`,
  };

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 min-h-screen bg-brand-bg text-brand-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <article className="container mx-auto max-w-4xl pt-16">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="text-white/50 font-mono uppercase tracking-widest text-[11px] mb-8 flex flex-wrap items-center gap-2"
        >
          <Link href="/" className="hover:text-brand-red transition-colors">
            Home
          </Link>
          <span className="opacity-40">/</span>
          <Link href="/insights" className="hover:text-brand-red transition-colors">
            Insights
          </Link>
          <span className="opacity-40">/</span>
          <span className="text-brand-red font-semibold">{blog.category}</span>
        </nav>

        {/* Metadata Header */}
        <div className="flex items-center gap-4 text-xs font-mono uppercase tracking-widest text-white/50 mb-6">
          <span className="px-3 py-1 rounded bg-brand-red/10 border border-brand-red/30 text-brand-red font-semibold">
            {blog.category}
          </span>
          <span>•</span>
          <span>{readTime}</span>
          <span>•</span>
          <span>
            {new Date(blog.publishedAt || blog.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight text-white mb-8 leading-[1.1]">
          {blog.title}
        </h1>

        {/* Excerpt */}
        {blog.excerpt && (
          <p className="text-xl md:text-2xl text-white/70 font-sans leading-relaxed mb-12 border-l-2 border-brand-red pl-6">
            {blog.excerpt}
          </p>
        )}

        {/* Featured Image */}
        {blog.featuredImage && (
          <div className="relative w-full aspect-[16/9] overflow-hidden rounded-2xl bg-[#0c0c0c] border border-white/10 mb-16 shadow-2xl">
            <Image
              src={blog.featuredImage}
              alt={blog.featuredImageAlt || blog.title}
              fill
              sizes="(max-width: 768px) 100vw, 900px"
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Article Body */}
        <div className="space-y-8 text-white/80 text-lg md:text-xl font-sans leading-relaxed">
          {paragraphs.map((block, i) => {
            const trimmed = block.trim();
            if (trimmed.startsWith("### ")) {
              return (
                <h3 key={i} className="text-2xl md:text-3xl font-display font-bold text-white pt-6 mb-4">
                  {trimmed.replace(/^###\s+/, "")}
                </h3>
              );
            }
            if (trimmed.startsWith("## ")) {
              return (
                <h2 key={i} className="text-3xl md:text-4xl font-display font-bold text-white pt-10 mb-6 border-t border-white/10">
                  {trimmed.replace(/^##\s+/, "")}
                </h2>
              );
            }
            if (trimmed.startsWith("> ")) {
              return (
                <blockquote key={i} className="p-6 rounded-xl bg-white/[0.02] border-l-4 border-brand-red italic text-white/90">
                  {trimmed.replace(/^>\s+/, "")}
                </blockquote>
              );
            }
            return <p key={i}>{trimmed}</p>;
          })}
        </div>

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="mt-16 pt-8 border-t border-white/10 flex flex-wrap items-center gap-3">
            <span className="text-xs font-mono uppercase tracking-widest text-white/40">Tags:</span>
            {blog.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/70"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Author & Footer CTA */}
        <div className="mt-20 p-8 md:p-12 rounded-2xl bg-[#0c0c0c] border border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-brand-red block mb-1">
              Author & Perspective
            </span>
            <div className="text-2xl font-display font-bold text-white mb-2">
              {blog.author || "CREATE Editorial Team"}
            </div>
            <p className="text-white/60 text-sm max-w-md">
              CREATE is a creative production studio for commercials, branded content, campaigns, and visual storytelling.
            </p>
          </div>
          <Link
            href="/contact"
            className="px-8 py-4 bg-brand-red hover:bg-white hover:text-black text-white font-bold uppercase tracking-widest text-xs rounded-full transition-colors shrink-0 shadow-lg"
          >
            Start a Conversation →
          </Link>
        </div>
      </article>
    </div>
  );
}
