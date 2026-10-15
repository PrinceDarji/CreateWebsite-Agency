import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getBlogPosts } from "@/lib/cms/storage";

export const metadata: Metadata = {
  title: {
    absolute: "Creative Production Insights & Articles | CREATE",
  },
  description: "Read CREATE's insights on creative production, commercials, branded content, campaigns, visual storytelling, and advertising.",
  keywords: ["creative production", "commercial production", "branded content", "visual storytelling"],
  alternates: {
    canonical: "https://createforbrands.com/insights",
  },
};

export default async function InsightsPage() {
  const allBlogs = await getBlogPosts();
  const now = new Date();

  // Only display published posts
  const publishedBlogs = allBlogs.filter((b) => {
    if (b.status === "PUBLISHED") return true;
    if (b.status === "SCHEDULED" && b.scheduledAt) {
      return new Date(b.scheduledAt) <= now;
    }
    return false;
  });

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 min-h-screen bg-brand-bg text-brand-ink">
      <div className="container mx-auto max-w-7xl pt-16">
        <div className="max-w-4xl mb-24">
          <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-8">
            Ideas Worth Sharing.
          </h1>
          <p className="text-xl md:text-2xl text-white/70 font-medium leading-relaxed max-w-3xl">
            Explore thoughts, lessons, research, and observations around creative production, commercials, branded content, campaigns, and visual storytelling.
          </p>
        </div>

        <div className="mb-16 border-b border-white/10 pb-8 flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-widest text-brand-red">
            Published Articles ({publishedBlogs.length})
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          {publishedBlogs.map((article) => {
            const wordCount = article.content ? article.content.split(/\s+/).length : 500;
            const readTime = `${Math.max(1, Math.ceil(wordCount / 200))} min read`;

            return (
              <Link href={`/insights/${article.slug}`} key={article.id} className="group block">
                <div className="w-full aspect-[4/3] bg-[#0c0c0c] border border-white/10 mb-6 relative overflow-hidden rounded-xl">
                  {article.featuredImage ? (
                    <Image
                      src={article.featuredImage}
                      alt={article.featuredImageAlt || article.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out brightness-90 group-hover:brightness-100"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-white/20 font-display text-xl uppercase tracking-widest">
                      CREATE.
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-white/40 mb-3">
                  <span className="text-brand-red">{article.category}</span>
                  <span>•</span>
                  <span>{readTime}</span>
                </div>

                <h3 className="text-2xl font-display font-bold group-hover:text-brand-red transition-colors leading-tight mb-3 text-white">
                  {article.title}
                </h3>

                <p className="text-white/60 font-sans text-sm line-clamp-2 leading-relaxed">
                  {article.excerpt}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
