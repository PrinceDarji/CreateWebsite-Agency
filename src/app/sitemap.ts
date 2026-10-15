import { MetadataRoute } from 'next';
import { getBlogPosts } from '@/lib/cms/storage';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://createforbrands.com';

  const staticRoutes = [
    '',
    '/about',
    '/work',
    '/insights',
    '/services',
    '/contact',
    '/why-choose-us',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  const services = [
    'influencer-marketing',
    'brand-visual-design',
    'branded-content',
    'campaign-production',
    'commercial-production',
    'content-marketing',
    'creative-direction',
    'performance-marketing',
    'post-production',
    'social-media-marketing',
    'visual-storytelling',
    'website-development',
  ].map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Dynamic Blog / Insights routes
  const blogs = await getBlogPosts();
  const blogRoutes = blogs
    .filter((b) => b.status === "PUBLISHED")
    .map((b) => ({
      url: `${baseUrl}/insights/${b.slug}`,
      lastModified: new Date(b.updatedAt || b.createdAt),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

  return [...staticRoutes, ...services, ...blogRoutes];
}
