import { ArrowIcon } from "@/components/ArrowIcon";
import { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Creative Production Services | Commercials, Branded Content & Campaigns",
  description: "Explore CREATE's creative production services across commercials, branded content, campaigns, creative direction, visual storytelling, and post-production.",
  keywords: [
    "creative production services",
    "commercial production company",
    "branded content studio",
    "campaign production agency",
    "creative direction",
    "visual storytelling",
    "brand design agency",
    "post-production studio"
  ],
  alternates: {
    canonical: "https://createforbrands.com/services",
  },
};

const services = [
  {
    name: "Brand & Visual Design",
    slug: "brand-visual-design",
    desc: "CREATE develops visual identity, campaign design, key visuals, and creative assets to help brands communicate with clarity and purpose.",
    accentColor: "#3B82F6"
  },
  {
    name: "Branded Content",
    slug: "branded-content",
    desc: "CREATE produces branded films, product stories, creator collaborations, and campaign content built around the audience and the brand.",
    accentColor: "#FF5C5C"
  },
  {
    name: "Campaign Production",
    slug: "campaign-production",
    desc: "CREATE develops campaign concepts and produces advertising films, digital content, social assets, and creative deliverables from brief to delivery.",
    accentColor: "#F5A623"
  },
  {
    name: "Commercial Production",
    slug: "commercial-production",
    desc: "CREATE produces commercials and advertising films around strong ideas, purposeful visual direction, and disciplined execution.",
    accentColor: "#C1121F"
  },
  {
    name: "Content Marketing",
    slug: "content-marketing",
    desc: "CREATE combines content strategy and creative production to help brands plan, create, and distribute video, social, and digital content.",
    accentColor: "#19A974"
  },
  {
    name: "Creative Direction",
    slug: "creative-direction",
    desc: "CREATE shapes concepts, visual language, story, tone, and execution so every part of a creative project feels connected.",
    accentColor: "#8B5CF6"
  },
  {
    name: "Performance Marketing",
    slug: "performance-marketing",
    desc: "CREATE connects creative production with paid campaigns, audience targeting, testing, optimisation, and performance reporting.",
    accentColor: "#06B6D4"
  },
  {
    name: "Post-Production",
    slug: "post-production",
    desc: "CREATE brings editing, motion, colour, sound, visual effects, and finishing together to shape the final creative output.",
    accentColor: "#D946EF"
  },
  {
    name: "Social Media Marketing",
    slug: "social-media-marketing",
    desc: "CREATE combines social strategy and creative production to build content that fits the platform, audience, and brand.",
    accentColor: "#EC4899"
  },
  {
    name: "Visual Storytelling",
    slug: "visual-storytelling",
    desc: "CREATE uses film, photography, design, motion, sound, and creative direction to turn ideas into clear visual stories.",
    accentColor: "#14B8A6"
  },
  {
    name: "Website Development",
    slug: "website-development",
    desc: "CREATE develops websites that bring brand identity, content, user experience, SEO foundations, and business goals together.",
    accentColor: "#84CC16"
  },
  {
    name: "Influencer Marketing",
    slug: "influencer-marketing",
    desc: "CREATE connects strategy, discovery, creator scripting, and campaign coordination to build creator collaborations that deliver measurable brand outcomes.",
    accentColor: "#E11D48"
  }
];

export default function ServicesPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "CREATE Services",
    "description": "Comprehensive creative production, design, content, marketing, and development services by CREATE.",
    "itemListElement": services.map((service, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": service.name,
      "url": `https://createforbrands.com/services/${service.slug}`
    }))
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-brand-bg text-brand-ink">
      <Script
        id="services-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        
        <div className="max-w-4xl mb-24 pt-16">
          <div className="text-xs font-mono uppercase tracking-widest text-brand-red mb-4">
            Creative Production Studio // Services
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-8">
            Creative Production Services
          </h1>
          <p className="text-xl md:text-2xl text-white/70 font-medium leading-relaxed max-w-3xl mb-6">
            CREATE brings creative production, content, marketing, and digital capabilities together to help brands turn ideas into work people notice. Explore our services across production, content, design, marketing, social media, and website development.
          </p>
          <p className="text-lg font-bold text-white/90">
            Commercials, branded content, campaigns, and visual storytelling remain the core creative production story. Marketing and digital services support that wider offering.
          </p>
        </div>

        <div className="flex flex-col mb-32 border-b border-white/10">
          {services.map((service, i) => (
            <Link 
              key={i} 
              href={`/services/${service.slug}`}
              className="group flex flex-col md:flex-row md:items-center justify-between py-12 md:py-16 border-t border-white/10 hover:border-brand-red hover:bg-brand-red/5 transition-all duration-500 px-6 md:px-12 -mx-6 md:-mx-12 rounded-2xl"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-16 max-w-4xl">
                <span className="text-2xl font-mono text-white/30 group-hover:text-brand-red transition-colors duration-500 pt-1">
                  {(i + 1).toString().padStart(2, '0')}
                </span>
                <div>
                  <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-4 group-hover:text-brand-red transition-colors duration-500">
                    {service.name}
                  </h2>
                  <p className="text-lg font-sans font-medium text-white/60 leading-relaxed md:max-w-2xl">
                    {service.desc}
                  </p>
                </div>
              </div>
              
              <div className="mt-8 md:mt-0 font-bold uppercase tracking-widest text-sm text-white/30 group-hover:text-brand-red transition-colors duration-500 flex items-center gap-4 shrink-0">
                Explore <ArrowIcon className="ml-2 group-hover:translate-x-2 transition-transform duration-300" />
              </div>
            </Link>
          ))}
        </div>
        
        <div className="bg-[#080808] p-12 md:p-24 text-center rounded-2xl border border-white/10">
          <div className="text-xs font-mono uppercase tracking-widest text-brand-red mb-4">
            Connect. Research. Execute.
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Ready to create?</h2>
          <p className="text-white/60 text-lg max-w-xl mx-auto mb-10">
            Tell us about your brand, your goals, and what you want to build. We'll help you bring it to life.
          </p>
          <Link 
            href="/contact"
            className="inline-block bg-white text-black px-10 py-5 font-bold uppercase tracking-widest text-xs hover:bg-brand-red hover:text-white transition-colors rounded-full"
          >
            Start a Project
          </Link>
        </div>

      </div>
    </div>
  );
}
