import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import Image from "next/image";
import { ArrowIcon } from "@/components/ArrowIcon";
import { ShivaCampaignCaseStudy } from "@/components/ShivaCampaignCaseStudy";
import { ServiceFAQ } from "@/components/ServiceFAQ";
import { servicesData, ServiceDetail } from "@/data/servicesData";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesData[slug];
  if (!service) return { title: "Service Not Found | CREATE" };

  const canonicalSlug = service.canonicalSlug || service.slug;
  const canonicalUrl = `https://createforbrands.com/services/${canonicalSlug}`;
  const baseTitle = service.seoTitle.replace(/\s*\|\s*CREATE\s*$/i, "").trim();
  const fullTitle = `${baseTitle} | CREATE`;
  const allKeywords = [service.primaryKeyword, ...service.supportingKeywords].filter(Boolean);

  return {
    title: baseTitle,
    description: service.metaDescription,
    keywords: allKeywords.join(", "),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: fullTitle,
      description: service.metaDescription,
      url: canonicalUrl,
      siteName: "CREATE",
      type: "website",
      images: [
        {
          url: service.image,
          width: 1200,
          height: 630,
          alt: `${service.name} - CREATE Studio`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: service.metaDescription,
      images: [service.image],
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

  // Structured Data
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${canonicalUrl}#service`,
    "name": service.name,
    "serviceType": service.name,
    "provider": {
      "@type": "Organization",
      "@id": "https://createforbrands.com/#organization",
      "name": "CREATE",
      "url": "https://createforbrands.com",
      "logo": "https://createforbrands.com/images/create-logo.png"
    },
    "description": service.metaDescription,
    "image": `https://createforbrands.com${service.image}`,
    "url": canonicalUrl,
    "areaServed": "Global"
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://createforbrands.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Services",
        "item": "https://createforbrands.com/services"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": service.name,
        "item": canonicalUrl
      }
    ]
  };

  const faqSchema = service.faqs && service.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": service.faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  return (
    <article className="pt-32 pb-24 min-h-screen bg-brand-bg text-brand-ink transition-colors duration-1000">
      {/* Structured Data Scripts */}
      <Script
        id={`schema-service-${slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id={`schema-breadcrumb-${slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <Script
          id={`schema-faq-${slug}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* Hero Section */}
      <section className="px-6 md:px-12 mb-20 container mx-auto max-w-7xl pt-16">
        <div className="max-w-5xl">
          {/* Breadcrumb Navigation */}
          <nav 
            aria-label="Breadcrumb"
            className="text-white/50 font-bold uppercase tracking-widest text-[10px] mb-8 flex flex-wrap items-center gap-2"
          >
            <Link href="/" className="hover:text-brand-red transition-colors">Home</Link>
            <span className="opacity-40" aria-hidden="true">/</span>
            <Link href="/services" className="hover:text-brand-red transition-colors">Services</Link>
            <span className="opacity-40" aria-hidden="true">/</span>
            <span className="text-brand-red" aria-current="page">{service.name}</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-brand-red font-mono text-[11px] uppercase tracking-widest mb-6">
            <span>Creative Production Studio</span>
            <span className="w-1.5 h-1.5 rounded-full bg-brand-red" aria-hidden="true" />
            <span className="text-white/60">{service.primaryKeyword}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight leading-[1.08] mb-8 text-white">
            {service.h1}
          </h1>

          <p className="text-xl md:text-2xl lg:text-3xl text-white/80 font-medium leading-relaxed max-w-4xl mb-12">
            {service.intro}
          </p>

          {/* Hero CTAs */}
          <div className="flex flex-wrap items-center gap-5">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-brand-red text-white px-8 py-4 font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-colors rounded-full shadow-xl"
            >
              Start a Project
            </Link>
            <Link
              href={service.portfolioLink}
              className="inline-flex items-center justify-center bg-white/5 hover:bg-white/10 text-white border border-white/15 px-8 py-4 font-bold uppercase tracking-widest text-xs transition-colors rounded-full"
            >
              View Our Work
            </Link>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="px-6 md:px-12 mb-28 container mx-auto max-w-7xl">
        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-2xl bg-[#0c0c0c] border border-white/10">
          <Image
            src={service.image}
            alt={`${service.name} - CREATE Studio creative production`}
            fill
            sizes="(max-width: 768px) 100vw, 1280px"
            className="object-cover contrast-110 hover:scale-105 transition-transform duration-1000"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 text-xs font-mono uppercase tracking-widest text-white/70">
            CREATE Studio // {service.name}
          </div>
        </div>
      </section>

      {/* Main Editorial Body with Sticky Navigation */}
      <section className="px-6 md:px-12 mb-32 container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Sticky Editorial Sidebar */}
          <aside className="lg:col-span-4 lg:sticky lg:top-28 space-y-8">
            <div className="bg-[#080808] border border-white/10 rounded-2xl p-6 md:p-8">
              <div className="text-xs font-bold uppercase tracking-widest text-brand-red mb-4">
                Service Overview
              </div>
              <h2 className="text-2xl font-display font-bold text-white mb-4">
                {service.name}
              </h2>
              <p className="text-sm text-white/60 leading-relaxed mb-6">
                {service.metaDescription}
              </p>

              {/* Supporting Keywords Badges */}
              {service.supportingKeywords.length > 0 && (
                <div className="mb-6 border-t border-white/10 pt-4">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-3">
                    Core Focus Areas
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {service.supportingKeywords.map((kw, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] px-2.5 py-1 rounded bg-white/5 border border-white/10 text-white/70 font-sans"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Table of Contents */}
              {service.sections && service.sections.length > 0 && (
                <div className="border-t border-white/10 pt-4">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-3">
                    In This Guide
                  </div>
                  <nav className="space-y-2">
                    {service.sections.slice(0, 6).map((sec, idx) => (
                      <a
                        key={idx}
                        href={`#section-${idx}`}
                        className="block text-xs text-white/60 hover:text-brand-red transition-colors line-clamp-1 py-0.5"
                      >
                        {sec.heading}
                      </a>
                    ))}
                    {service.faqs && service.faqs.length > 0 && (
                      <a
                        href="#faq-section"
                        className="block text-xs text-white/60 hover:text-brand-red transition-colors py-0.5"
                      >
                        Frequently Asked Questions
                      </a>
                    )}
                  </nav>
                </div>
              )}

              {/* Direct Action */}
              <div className="border-t border-white/10 pt-6 mt-6">
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 bg-white text-black px-6 py-3 font-bold uppercase tracking-widest text-xs hover:bg-brand-red hover:text-white transition-colors rounded-full"
                >
                  <span>Start a Project</span>
                  <ArrowIcon className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </aside>

          {/* Right Column: Full Long-Form Editorial Prose */}
          <div className="lg:col-span-8 space-y-16">
            {service.sections && service.sections.map((section, sIdx) => (
              <section 
                key={sIdx} 
                id={`section-${sIdx}`}
                className="scroll-mt-28 border-b border-white/10 pb-16 last:border-b-0"
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-xs font-mono text-brand-red">
                    0{(sIdx + 1).toString().padStart(2, '0')}
                  </span>
                  <div className="h-px bg-white/10 flex-1" />
                </div>
                
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white mb-6 leading-tight">
                  {section.heading}
                </h2>

                <div className="space-y-5 text-base sm:text-lg text-white/75 font-sans leading-relaxed">
                  {section.paragraphs.map((paragraph, pIdx) => {
                    // Check if it's a markdown-like H3
                    if (paragraph.startsWith("### ")) {
                      return (
                        <h3 
                          key={pIdx} 
                          className="text-xl sm:text-2xl font-display font-semibold text-white/95 pt-4 pb-1"
                        >
                          {paragraph.replace("### ", "")}
                        </h3>
                      );
                    }
                    return (
                      <p key={pIdx}>
                        {paragraph}
                      </p>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>

        </div>
      </section>

      {/* What We Do / Capabilities Grid */}
      {service.whatWeDo && service.whatWeDo.length > 0 && (
        <section className="px-6 md:px-12 mb-32 container mx-auto max-w-7xl">
          <div className="border-t border-white/10 pt-16 md:pt-24">
            <div className="max-w-4xl mb-12">
              <div className="text-xs font-bold uppercase tracking-widest text-brand-red mb-3">
                Capabilities &amp; Scope
              </div>
              <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-white mb-6">
                What We Do
              </h2>
              <p className="text-white/60 text-lg">
                Depending on the brief, our {service.name.toLowerCase()} engagements can span strategic direction, execution, and final delivery.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.whatWeDo.map((item, i) => {
                const isObj = typeof item === "object";
                const title = isObj ? item.title : item;
                const desc = isObj ? item.desc : null;
                return (
                  <div 
                    key={i} 
                    className="p-6 md:p-8 rounded-2xl bg-[#080808] border border-white/5 hover:border-white/20 transition-all duration-300"
                  >
                    <div className="text-xs font-mono text-brand-red mb-3">
                      {(i + 1).toString().padStart(2, '0')}
                    </div>
                    <h3 className="text-lg md:text-xl font-display font-bold text-white mb-2">
                      {title}
                    </h3>
                    {desc ? (
                      <p className="text-white/60 font-sans text-sm leading-relaxed">
                        {desc}
                      </p>
                    ) : (
                      <p className="text-white/40 font-sans text-xs uppercase tracking-wider">
                        Full-service execution
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
            
            <p className="text-white/50 text-base mt-12 max-w-3xl leading-relaxed">
              Our approach connects the brief, audience, creative idea, and final execution. The exact scope depends on the project and should be confirmed before work begins.
            </p>
          </div>
        </section>
      )}

      {/* Case Study / Featured Collaboration */}
      {slug === "influencer-marketing" ? (
        <ShivaCampaignCaseStudy />
      ) : service.caseStudy ? (
        <section className="px-6 md:px-12 mb-32 container mx-auto max-w-7xl">
          <div className="border-t border-white/10 pt-16">
            <div className="text-xs font-bold uppercase tracking-widest text-brand-red mb-4">
              Featured Collaboration
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight mb-8">
              {service.caseStudy.title}
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
              <div className="lg:col-span-6">
                <p className="text-xl text-white/80 font-medium leading-relaxed mb-6">
                  {service.caseStudy.description}
                </p>
                <p className="text-white/60 text-base leading-relaxed mb-8">
                  {service.caseStudy.details}
                </p>
                {service.caseStudy.services && (
                  <div className="flex flex-wrap gap-3 mb-10">
                    {service.caseStudy.services.map((tag: string, idx: number) => (
                      <span key={idx} className="text-xs uppercase tracking-widest font-bold px-3 py-1.5 bg-white/5 border border-white/10 text-white/70 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <Link 
                  href="/contact"
                  className="inline-block bg-white text-black px-8 py-4 font-bold uppercase tracking-widest text-xs hover:bg-brand-red hover:text-white transition-colors rounded-full"
                >
                  Enquire About {service.name}
                </Link>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* Dedicated FAQ Section (Rendered ONCE, Accessible, Interactive) */}
      <ServiceFAQ faqs={service.faqs} serviceName={service.name} />

      {/* Selected Work Section */}
      <section className="px-6 md:px-12 mb-32 container mx-auto max-w-7xl">
        <div className="bg-[#080808] p-10 md:p-16 rounded-2xl border border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="max-w-2xl">
            <div className="text-xs font-bold uppercase tracking-widest text-brand-red mb-2">
              Portfolio
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-white">
              Selected Work
            </h2>
            <p className="text-white/60 text-base md:text-lg leading-relaxed">
              Explore how we've applied {service.name.toLowerCase()} to real commercials, films, campaigns, and brand storytelling projects.
            </p>
          </div>
          <Link 
            href={service.portfolioLink}
            className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 font-bold uppercase tracking-widest text-xs hover:bg-brand-red hover:text-white transition-colors rounded-full shrink-0"
          >
            <span>View Our Work</span>
            <ArrowIcon className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* Final Conversion Section */}
      <section className="px-6 md:px-12 container mx-auto max-w-7xl text-center">
        <div className="border-t border-white/10 pt-24 md:pt-32 pb-16 max-w-4xl mx-auto">
          <div className="text-xs font-mono uppercase tracking-widest text-brand-red mb-4">
            Connect. Research. Execute.
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-6 text-white tracking-tight">
            {service.ctaHeading || "Start a project"}
          </h2>
          <p className="text-lg md:text-xl text-white/70 font-sans leading-relaxed max-w-2xl mx-auto mb-12">
            {service.ctaText && service.ctaText.length > 0 
              ? service.ctaText[0] 
              : "Tell us what you are building, who needs to understand it, and where the work will appear. We can discuss the right creative direction, scope, and deliverables."}
          </p>
          <div className="flex flex-wrap justify-center items-center gap-5">
            <Link 
              href="/contact" 
              className="inline-block bg-brand-red text-white px-10 py-5 font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-colors rounded-full shadow-2xl"
            >
              Start a Project
            </Link>
            <Link 
              href={service.portfolioLink}
              className="inline-block bg-transparent text-white border border-white/20 px-10 py-5 font-bold uppercase tracking-widest text-xs hover:border-white hover:bg-white/5 transition-colors rounded-full"
            >
              View Our Work
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
