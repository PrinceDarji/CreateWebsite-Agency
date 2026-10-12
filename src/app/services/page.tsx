import { ArrowIcon } from "@/components/ArrowIcon";
import { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Creative Production Services | Commercials, Branded Content & Campaigns",
  description: "Explore CREATE's creative production services across commercials, branded content, campaigns, creative direction, visual storytelling, and post-production.",
  keywords: ["creative production services", "commercial production company", "branded content studio", "campaign production agency", "creative direction", "visual storytelling"]
};

const services = [
  {
    name: "Influencer Marketing",
    slug: "influencer-marketing",
    desc: "Influencer marketing driven by strategic alignment and creative execution. CREATE handles campaign planning, creator selection, ideation, scripting, and campaign coordination.",
    accentColor: "#E11D48"
  },
  {
    name: "Brand & Visual Design",
    slug: "brand-and-visual-design",
    desc: "Build a stronger visual identity with CREATE. We create brand visuals, campaign design, key visuals, and creative assets.",
    accentColor: "#3B82F6"
  },
  {
    name: "Branded Content",
    slug: "branded-content",
    desc: "Branded content should feel like content first and advertising second. CREATE develops branded stories around the audience, the brand, and the idea.",
    accentColor: "#FF5C5C"
  },
  {
    name: "Campaign Production",
    slug: "campaign-production",
    desc: "A campaign rarely lives in one format. CREATE develops campaign concepts and produces the creative assets needed across films, digital content, social platforms, and other campaign touchpoints.",
    accentColor: "#F5A623"
  },
  {
    name: "Commercial Production",
    slug: "commercial-production",
    desc: "A commercial has seconds to make an impression. CREATE develops and produces commercial work around a clear idea, strong story, and purposeful visual direction.",
    accentColor: "#C1121F"
  },
  {
    name: "Content Marketing",
    slug: "content-marketing",
    desc: "Content marketing connects useful ideas with the right audience. CREATE combines creative production with content planning to help brands communicate through stories, videos, social content, articles, and other formats.",
    accentColor: "#19A974"
  },
  {
    name: "Creative Direction",
    slug: "creative-direction",
    desc: "Creative direction gives the work a point of view. CREATE shapes the visual language, story, tone, composition, and execution so every part of a project feels connected.",
    accentColor: "#8B5CF6"
  },
  {
    name: "Performance Marketing",
    slug: "performance-marketing",
    desc: "Performance marketing connects creative work with measurable campaign goals. CREATE can combine creative production with paid campaign planning, audience targeting, testing, optimisation, and reporting.",
    accentColor: "#06B6D4"
  },
  {
    name: "Post-Production",
    slug: "post-production",
    desc: "Production captures the material. Post-production shapes the final experience. CREATE brings footage, design, motion, colour, sound, and finishing together for the final output.",
    accentColor: "#D946EF"
  },
  {
    name: "Social Media Marketing",
    slug: "social-media-marketing",
    desc: "Social media needs more than frequent posting. CREATE combines creative production with social strategy to build content that fits the platform, the audience, and the brand.",
    accentColor: "#EC4899"
  },
  {
    name: "Visual Storytelling",
    slug: "visual-storytelling",
    desc: "Visual storytelling turns ideas into experiences. CREATE uses film, photography, design, motion, sound, and creative direction to build stories that communicate clearly and leave a lasting impression.",
    accentColor: "#14B8A6"
  },
  {
    name: "Website Development",
    slug: "website-development",
    desc: "A website should do more than look good. CREATE develops websites that bring brand identity, content, user experience, and business goals together.",
    accentColor: "#84CC16"
  }
];

export default function ServicesPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": services.map((service, index) => ({
      "@type": "ListItem",
      "position": index + 1,
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
        
        <div className="bg-[#050505] p-12 md:p-24 text-center border border-white/5">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">Ready to create?</h2>
          <Link 
            href="/contact"
            className="inline-block bg-white text-black px-10 py-5 font-bold uppercase tracking-widest text-sm hover:bg-brand-red hover:text-white transition-colors rounded-full"
          >
            Start a Project
          </Link>
        </div>

      </div>
    </div>
  );
}

