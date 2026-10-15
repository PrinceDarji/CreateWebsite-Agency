import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ShivaCampaignCaseStudy } from "@/components/ShivaCampaignCaseStudy";
import { servicesData } from "@/data/servicesData";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesData[slug];
  if (!service) return { title: { absolute: "Service Not Found | CREATE" } };

  const canonicalSlug = service.canonicalSlug || service.slug;
  const canonicalUrl = `https://createforbrands.com/services/${canonicalSlug}`;
  const imageUrl = `https://createforbrands.com${service.image}`;

  return {
    title: {
      absolute: service.seoTitle,
    },
    description: service.metaDescription,
    keywords: [service.primaryKeyword, ...service.supportingKeywords].join(", "),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: service.seoTitle,
      description: service.metaDescription,
      url: canonicalUrl,
      siteName: "CREATE",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${service.name} - CREATE Studio`,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: service.seoTitle,
      description: service.metaDescription,
      images: [imageUrl],
    },
  };
}

export function generateStaticParams() {
  return Object.keys(servicesData).map((slug) => ({
    slug,
  }));
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = servicesData[slug];

  if (!service) {
    notFound();
  }

  const canonicalSlug = service.canonicalSlug || service.slug;
  const canonicalUrl = `https://createforbrands.com/services/${canonicalSlug}`;
  const imageUrl = `https://createforbrands.com${service.image}`;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    serviceType: service.name,
    description: service.metaDescription,
    provider: {
      "@type": "Organization",
      name: "CREATE",
      url: "https://createforbrands.com",
    },
    url: canonicalUrl,
    image: imageUrl,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://createforbrands.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: "https://createforbrands.com/services",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: service.name,
        item: canonicalUrl,
      },
    ],
  };

  const faqSchema =
    service.faqs && service.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: service.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null;

  return (
    <div className="pt-32 pb-24 min-h-screen bg-brand-bg text-brand-ink transition-colors duration-1000">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* Hero Section */}
      <section className="px-6 md:px-12 mb-20 md:mb-28 container mx-auto max-w-7xl pt-16">
        <div className="max-w-4xl">
          <nav
            aria-label="Breadcrumb"
            className="text-white/50 font-mono uppercase tracking-widest text-[11px] mb-8 flex flex-wrap items-center gap-2"
          >
            <Link href="/" className="hover:text-brand-red transition-colors">
              Home
            </Link>
            <span className="opacity-40">/</span>
            <Link href="/services" className="hover:text-brand-red transition-colors">
              Services
            </Link>
            <span className="opacity-40">/</span>
            <span className="text-brand-red font-semibold">{service.name}</span>
          </nav>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight leading-[1.08] mb-8 text-white">
            {service.h1}
          </h1>
          <p className="text-xl md:text-2xl text-white/80 font-sans font-normal leading-relaxed max-w-3xl mb-10">
            {service.intro}
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/contact"
              className="inline-block bg-brand-red text-white px-8 py-4 font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-colors rounded-full shadow-lg"
            >
              Start a Project
            </Link>
            <Link
              href={service.portfolioLink || "/work"}
              className="inline-block border border-white/20 text-white/90 px-8 py-4 font-bold uppercase tracking-widest text-xs hover:border-white hover:text-white transition-colors rounded-full"
            >
              View Our Work
            </Link>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="px-6 md:px-12 mb-28 md:mb-36 container mx-auto max-w-7xl">
        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-2xl bg-[#0d0d0d] border border-white/10">
          <Image
            src={service.image}
            alt={`${service.name} - CREATE Studio`}
            fill
            sizes="(max-width: 768px) 100vw, 1280px"
            className="object-cover brightness-95 hover:brightness-105 transition-all duration-700"
            priority
          />
        </div>
      </section>

      {/* What We Do */}
      <section className="px-6 md:px-12 mb-28 md:mb-36 container mx-auto max-w-7xl">
        <div className="border-t border-white/10 pt-16 md:pt-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-brand-red block mb-3">
                Capabilities & Deliverables
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-white">
                What We Do
              </h2>
            </div>
            <p className="text-white/50 text-sm md:text-base max-w-md">
              Our approach connects the brief, audience, creative idea, and final execution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {service.whatWeDo.map((item, i) => {
              const isObj = typeof item === "object";
              const title = isObj ? item.title : item;
              const desc = isObj ? item.desc : null;
              return (
                <div
                  key={i}
                  className="p-6 md:p-8 rounded-xl bg-white/[0.02] border border-white/5 hover:border-brand-red/40 transition-colors"
                >
                  <span className="text-xs font-mono text-brand-red font-semibold mb-3 block">
                    {(i + 1).toString().padStart(2, "0")}
                  </span>
                  <h3 className="text-lg md:text-xl font-sans font-bold text-white mb-2">{title}</h3>
                  {desc && <p className="text-white/60 font-sans text-sm leading-relaxed">{desc}</p>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Editorial Content Sections */}
      {service.sections && service.sections.length > 0 && (
        <section className="px-6 md:px-12 mb-28 md:mb-36 container mx-auto max-w-7xl">
          <div className="border-t border-white/10 pt-16 md:pt-20">
            <div className="max-w-4xl space-y-20 md:space-y-28">
              {service.sections.map((sec, idx) => (
                <article key={idx} className="space-y-6">
                  <h2 className="text-2xl md:text-4xl font-display font-bold tracking-tight text-white">
                    {sec.heading}
                  </h2>
                  <div className="space-y-5 text-white/75 text-base md:text-lg font-sans leading-relaxed">
                    {sec.paragraphs.map((p, pIdx) => (
                      <p key={pIdx}>{p}</p>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Case Study / Featured Collaboration / Selected Work */}
      {slug === "influencer-marketing" ? (
        <ShivaCampaignCaseStudy />
      ) : (
        <section className="px-6 md:px-12 mb-28 md:mb-36 container mx-auto max-w-7xl">
          <div className="rounded-2xl bg-gradient-to-br from-[#0c0c0c] to-[#050505] p-10 md:p-16 border border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="max-w-2xl">
              <span className="text-xs font-mono uppercase tracking-widest text-brand-red block mb-3">
                Portfolio & Case Studies
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Selected Work</h2>
              <p className="text-white/70 text-base md:text-lg leading-relaxed">
                Explore how we apply {service.name.toLowerCase()} across commercials, campaigns, and visual storytelling for ambitious brands.
              </p>
            </div>
            <Link
              href={service.portfolioLink || "/work"}
              className="inline-block bg-white text-black px-8 py-4 font-bold uppercase tracking-widest text-xs hover:bg-brand-red hover:text-white transition-colors rounded-full shrink-0 shadow-lg"
            >
              View Our Work →
            </Link>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {service.faqs && service.faqs.length > 0 && (
        <section className="px-6 md:px-12 mb-28 md:mb-36 container mx-auto max-w-7xl">
          <div className="border-t border-white/10 pt-16 md:pt-20">
            <div className="max-w-4xl">
              <span className="text-xs font-mono uppercase tracking-widest text-brand-red block mb-3">
                Clarity & Scope
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-white mb-12">
                Frequently Asked Questions
              </h2>

              <div className="space-y-6">
                {service.faqs.map((faq, i) => (
                  <div
                    key={i}
                    className="p-6 md:p-8 rounded-xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-colors"
                  >
                    <h3 className="text-xl md:text-2xl font-display font-semibold text-white mb-4">
                      {faq.question}
                    </h3>
                    <p className="text-white/70 text-base md:text-lg font-sans leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="px-6 md:px-12 container mx-auto max-w-7xl text-center">
        <div className="border-t border-white/10 pt-24 md:pt-32 pb-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 text-white tracking-tight">
              {service.ctaHeading || "Ready to create?"}
            </h2>
            {service.ctaText &&
              service.ctaText
                .filter((t) => !t.startsWith("Primary CTA:"))
                .map((paragraph, idx) => (
                  <p
                    key={idx}
                    className="text-white/70 text-lg md:text-xl font-sans leading-relaxed mb-10 max-w-2xl mx-auto"
                  >
                    {paragraph}
                  </p>
                ))}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-block bg-brand-red text-white px-10 py-5 font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-colors rounded-full shadow-2xl"
              >
                Start a Project
              </Link>
              <Link
                href={service.portfolioLink || "/work"}
                className="inline-block border border-white/20 text-white/90 px-10 py-5 font-bold uppercase tracking-widest text-xs hover:border-white hover:text-white transition-colors rounded-full"
              >
                View Our Work
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
