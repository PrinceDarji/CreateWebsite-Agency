import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import Image from "next/image";
import { ShivaCampaignCaseStudy } from "@/components/ShivaCampaignCaseStudy";

const servicesData = {
  "brand-and-visual-design": {
    name: "Brand & Visual Design",
    title: "Visual Design That Supports the Story",
    seoTitle: "Creative Design & Brand Visuals",
    description: "Build a stronger visual identity with CREATE. We create brand visuals, campaign design, key visuals, and creative assets.",
    keywords: ["creative design studio", "brand design agency", "campaign design"],
    intro: "Design should not exist only to make something look good. It should help the idea communicate. CREATE develops visual systems for campaigns, content, advertising, and brand communication.",
    whatWeDo: ["Visual Identity", "Campaign Design", "Key Visuals", "Advertising Creative", "Social Media Design", "Motion Design", "Brand Guidelines"],
    portfolioLink: "/work?filter=design",
    order: 1
  },
  "branded-content": {
    name: "Branded Content",
    title: "Give Your Brand Something Worth Watching.",
    seoTitle: "Branded Content Studio",
    description: "CREATE creates branded films, product stories, creator content, and campaign content built around your brand and audience.",
    keywords: ["branded content studio", "branded content production", "brand storytelling"],
    intro: "Branded content should feel like content first and advertising second. CREATE develops branded stories around the audience, the brand, and the idea.",
    whatWeDo: ["Branded Films", "Product Stories", "Creator-Led Content", "Social Video", "Promotional Content", "Campaign Content"],
    portfolioLink: "/work?filter=branded-content",
    order: 2
  },
  "campaign-production": {
    name: "Campaign Production",
    title: "Campaigns Built From Idea to Execution",
    seoTitle: "Campaign Production Agency",
    description: "CREATE develops campaign concepts and produces creative assets across films, digital content, social platforms, and campaign touchpoints.",
    keywords: ["campaign production agency", "advertising campaign production", "creative campaign studio"],
    intro: "A campaign rarely lives in one format. CREATE develops campaign concepts and produces the creative assets needed across films, digital content, social platforms, and other campaign touchpoints.",
    whatWeDo: ["Campaign Concepts", "Creative Direction", "Commercial Production", "Content Production", "Campaign Assets", "Social Cutdowns"],
    portfolioLink: "/work?filter=campaigns",
    order: 3
  },
  "commercial-production": {
    name: "Commercial Production",
    title: "Commercials Built Around Ideas",
    seoTitle: "Commercial Production Company",
    description: "CREATE produces commercials around clear ideas, strong stories, and purposeful visual direction, from concept through final delivery.",
    keywords: ["commercial production company", "commercial video production", "advertising film production"],
    intro: "A commercial has seconds to make an impression. CREATE develops and produces commercial work around a clear idea, strong story, and purposeful visual direction.",
    whatWeDo: ["Creative Concepts", "Scripts", "Storyboards", "Creative Direction", "Production", "Direction", "Editing", "Motion", "Colour", "Sound", "Final Delivery"],
    portfolioLink: "/work?filter=commercials",
    order: 4
  },
  "content-marketing": {
    name: "Content Marketing",
    title: "Content With a Purpose",
    seoTitle: "Content Marketing Services",
    description: "CREATE combines content strategy and creative production to help brands communicate through stories, video, social content, and more.",
    keywords: ["content marketing agency", "content marketing services", "brand content strategy"],
    intro: "Content marketing connects useful ideas with the right audience. CREATE combines creative production with content planning to help brands communicate through stories, videos, social content, articles, and other formats.",
    whatWeDo: ["Content Strategy", "Content Planning", "Brand Content", "Video Content", "Social Content", "Campaign Content", "Content Distribution"],
    portfolioLink: "/work",
    order: 5
  },
  "creative-direction": {
    name: "Creative Direction",
    title: "One Creative Direction. Every Detail Connected.",
    seoTitle: "Creative Direction Services",
    description: "CREATE shapes concepts, visual language, story, tone, and execution so every part of a creative project feels connected.",
    keywords: ["creative direction agency", "creative direction services", "creative studio"],
    intro: "Creative direction gives the work a point of view. CREATE shapes the visual language, story, tone, composition, and execution so every part of a project feels connected.",
    whatWeDo: ["Concept Development", "Visual Direction", "Story Development", "Moodboards", "Art Direction", "Production Direction", "Creative Review"],
    portfolioLink: "/work",
    order: 6
  },
  "performance-marketing": {
    name: "Performance Marketing",
    title: "Creative That Can Perform.",
    seoTitle: "Performance Marketing Services",
    description: "CREATE connects creative production with paid campaigns, audience targeting, testing, optimisation, and performance reporting.",
    keywords: ["performance marketing agency", "performance marketing services", "paid advertising"],
    intro: "Performance marketing connects creative work with measurable campaign goals. CREATE can combine creative production with paid campaign planning, audience targeting, testing, optimisation, and reporting.",
    whatWeDo: ["Meta Ads", "Google Ads", "Campaign Strategy", "Audience Targeting", "Creative Testing", "Campaign Optimisation", "Performance Reporting"],
    portfolioLink: "/work",
    order: 7
  },
  "post-production": {
    name: "Post-Production",
    title: "The Final Frame Matters.",
    seoTitle: "Post-Production Studio",
    description: "CREATE brings editing, motion, colour, sound, visual effects, and finishing together to shape the final creative output.",
    keywords: ["post-production studio", "video editing services", "motion graphics studio"],
    intro: "Production captures the material. Post-production shapes the final experience. CREATE brings footage, design, motion, colour, sound, and finishing together for the final output.",
    whatWeDo: ["Video Editing", "Motion Graphics", "Animation", "Colour Grading", "Sound Design", "Visual Effects", "Social Cutdowns", "Final Mastering"],
    portfolioLink: "/work",
    order: 8
  },
  "social-media-marketing": {
    name: "Social Media Marketing",
    title: "Social Content Built Around the Brand.",
    seoTitle: "Social Media Marketing Agency",
    description: "CREATE combines social strategy and creative production to build content that fits the platform, audience, and brand.",
    keywords: ["social media marketing agency", "social media management", "social media strategy"],
    intro: "Social media needs more than frequent posting. CREATE combines creative production with social strategy to build content that fits the platform, the audience, and the brand.",
    whatWeDo: ["Social Strategy", "Content Planning", "Social Campaigns", "Reels", "UGC", "Creator Content", "Community Content", "Performance Tracking"],
    portfolioLink: "/work?filter=social",
    order: 9
  },
  "visual-storytelling": {
    name: "Visual Storytelling",
    title: "Stories People Can See.",
    seoTitle: "Visual Storytelling Studio",
    description: "CREATE uses film, photography, design, motion, sound, and creative direction to turn ideas into clear visual stories.",
    keywords: ["visual storytelling studio", "visual storytelling agency", "brand storytelling"],
    intro: "Visual storytelling turns ideas into experiences. CREATE uses film, photography, design, motion, sound, and creative direction to build stories that communicate clearly and leave a lasting impression.",
    whatWeDo: ["Brand Films", "Commercial Films", "Promotional Videos", "Photography", "Motion", "Campaign Visuals", "Story Development"],
    portfolioLink: "/work?filter=films",
    order: 10
  },
  "website-development": {
    name: "Website Development",
    title: "Websites Built for Brands and Business.",
    seoTitle: "Website Development Services",
    description: "CREATE develops websites that bring brand identity, content, user experience, SEO foundations, and business goals together.",
    keywords: ["website development company", "website development agency", "business website development"],
    intro: "A website should do more than look good. CREATE develops websites that bring brand identity, content, user experience, and business goals together.",
    whatWeDo: ["Website Design", "Website Development", "Landing Pages", "Responsive Development", "CMS Integration", "SEO Foundations", "Conversion-Focused Pages"],
    portfolioLink: "/work",
    order: 11
  },
  "influencer-marketing": {
    name: "Influencer Marketing",
    title: "Influencer Marketing Built on Strategy & Creator Direction",
    seoTitle: "Influencer Marketing Agency & Campaign Case Study",
    description: "CREATE develops influencer marketing campaigns connecting strategy, discovery, creator scripting, and performance tracking. Explore our Shiva Immersive campaign case study.",
    keywords: [
      "influencer marketing agency",
      "influencer marketing services",
      "influencer campaign management",
      "influencer strategy",
      "creator ideation",
      "influencer scripting",
      "influencer discovery",
      "shiva immersive case study",
      "creator campaign roi"
    ],
    intro: "Influencer marketing succeeds when creative direction leads creator partnerships. CREATE bridges brand objectives and authentic creator storytelling—managing every stage from campaign planning and audience alignment to scripting, coordination, and performance tracking.",
    image: "/images/services/social-media-marketing.webp",
    whatWeDo: [
      {
        title: "Influencer Strategy & Campaign Planning",
        desc: "We establish clear campaign goals, target messaging, and distribution channels before engaging creators, ensuring content serves measurable brand outcomes."
      },
      {
        title: "Influencer Discovery & Selection",
        desc: "We identify and evaluate creators based on authentic voice, aesthetic alignment, community credibility, and verified audience resonance."
      },
      {
        title: "Audience & Brand Fit",
        desc: "We analyze demographic alignment and audience overlap to ensure every creator collaboration feels natural and genuinely engages the target audience."
      },
      {
        title: "Creative Ideation",
        desc: "We develop original creative directions, storytelling angles, and campaign hooks that feel natural to creators while reinforcing core brand narratives."
      },
      {
        title: "Content Concepts & Scripting",
        desc: "We craft structured narrative briefs, storyline concepts, and creator scripts that balance brand messaging with the creator's authentic tone."
      },
      {
        title: "Campaign Coordination",
        desc: "From initial briefing to production timelines, we manage creator communications and deliverables smoothly from end to end."
      },
      {
        title: "Content Review & Delivery",
        desc: "We review drafts, refine messaging and visual polish, and ensure all deliverables align with brand standards prior to publishing."
      },
      {
        title: "Campaign Performance Tracking",
        desc: "We monitor campaign delivery, engagement, and reach metrics to assess performance against project objectives."
      }
    ],
    caseStudy: {
      client: "Shiva Immersive",
      title: "Featured Collaboration: Shiva Immersive",
      description: "CREATE partnered with Shiva Immersive to deliver influencer marketing strategy, campaign ideation, and creator scripting across a collection of short-form reels.",
      details: "Working directly with Shiva Immersive, our team developed the creative angles, structured the content concepts, and authored creator scripts tailored for high-engagement reel formats.",
      services: [
        "Influencer Strategy",
        "Creative Ideation",
        "Creator Scripting",
        "Short-Form Content"
      ],
      reels: [
        { title: "Shiva Immersive Reel 1", url: "https://www.instagram.com/reel/DdEaYGZJtdM/", thumbnail: null },
        { title: "Shiva Immersive Reel 2", url: "https://www.instagram.com/reel/DdHNNxMhDTi/", thumbnail: null },
        { title: "Shiva Immersive Reel 3", url: "https://www.instagram.com/reel/DdEfxbtgt2B/", thumbnail: null },
        { title: "Shiva Immersive Reel 4", url: "https://www.instagram.com/reel/DdMcOrNOzeM/", thumbnail: null }
      ]
    },
    portfolioLink: "/work",
    order: 1
  }
};

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesData[slug as keyof typeof servicesData];
  if (!service) return { title: "Service Not Found" };

  return {
    title: `${service.seoTitle} | CREATE`,
    description: service.description,
    keywords: service.keywords.join(", "),
    alternates: {
      canonical: `https://createforbrands.com/services/${slug}`
    }
  };
}

export function generateStaticParams() {
  return Object.keys(servicesData).map((slug) => ({
    slug: slug,
  }));
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = servicesData[slug as keyof typeof servicesData];
  
  if (!service) {
    notFound();
  }

  // Schema generation
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": service.name,
    "provider": {
      "@type": "Organization",
      "name": "CREATE",
      "url": "https://createforbrands.com"
    },
    "description": service.description,
    "image": `https://createforbrands.com${(service as any).image || `/images/services/${slug}.webp`}`
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-brand-bg text-brand-ink transition-colors duration-1000">
      {/* Schema */}
      <Script
        id={`schema-${slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      
      {/* Hero */}
      <section className="px-6 md:px-12 mb-32 container mx-auto max-w-7xl pt-16">
        <div className="max-w-4xl">
          <nav className="text-white/50 font-bold uppercase tracking-widest text-[10px] mb-8 flex flex-wrap items-center gap-2">
            <Link href="/" className="hover:text-brand-red transition-colors">Home</Link>
            <span className="opacity-50">/</span>
            <Link href="/services" className="hover:text-brand-red transition-colors">Services</Link>
            <span className="opacity-50">/</span>
            <span className="text-brand-red">{service.name}</span>
          </nav>
          <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight leading-tight mb-8">
            {service.title}
          </h1>
          <p className="text-xl md:text-2xl text-white/70 font-medium leading-relaxed max-w-3xl">
            {service.intro}
          </p>
        </div>
      </section>

      {/* Hero Image */}
      <section className="px-6 md:px-12 mb-32 container mx-auto max-w-7xl">
        <div className="relative w-full aspect-[16/9] overflow-hidden bg-[#111]">
          <Image 
            src={(service as any).image || `/images/services/${slug}.webp`}
            alt={`${service.name} - CREATE Studio`}
            fill
            sizes="(max-width: 768px) 100vw, 1200px"
            className="object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
            priority
          />
        </div>
      </section>

      {/* What We Do */}
      <section className="px-6 md:px-12 mb-32 container mx-auto max-w-7xl">
        <div className="border-t border-white/10 pt-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight mb-16">
            What We Do
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-8">
            {service.whatWeDo.map((item: any, i: number) => {
              const isObj = typeof item === "object";
              const title = isObj ? item.title : item;
              const desc = isObj ? item.desc : null;
              return (
                <div key={i} className="border-t border-white/5 pt-4">
                  <h3 className="text-xl font-sans font-bold text-white/90 mb-2">{title}</h3>
                  {desc && <p className="text-white/60 font-sans text-sm leading-relaxed">{desc}</p>}
                </div>
              );
            })}
          </div>
        </div>
        
        <p className="text-white/50 text-lg mt-16 max-w-3xl">
          Our approach connects the brief, audience, creative idea, and final execution. The exact scope depends on the project and should be confirmed before work begins.
        </p>
      </section>

      {/* Case Study / Featured Collaboration */}
      {slug === "influencer-marketing" ? (
        <ShivaCampaignCaseStudy />
      ) : (service as any).caseStudy ? (
        <section className="px-6 md:px-12 mb-32 container mx-auto max-w-7xl">
          <div className="border-t border-white/10 pt-16">
            <div className="text-xs font-bold uppercase tracking-widest text-brand-red mb-4">
              Featured Collaboration
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight mb-8">
              {(service as any).caseStudy.title}
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
              <div className="lg:col-span-6">
                <p className="text-xl text-white/80 font-medium leading-relaxed mb-6">
                  {(service as any).caseStudy.description}
                </p>
                <p className="text-white/60 text-base leading-relaxed mb-8">
                  {(service as any).caseStudy.details}
                </p>
                {(service as any).caseStudy.services && (
                  <div className="flex flex-wrap gap-3 mb-10">
                    {(service as any).caseStudy.services.map((tag: string, idx: number) => (
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
              {(service as any).caseStudy.reels && (
                <div className="lg:col-span-6 grid grid-cols-2 gap-4">
                  {(service as any).caseStudy.reels.map((reel: any, idx: number) => (
                    <a 
                      key={idx} 
                      href={reel.url || "/work/shiv-immersive"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="aspect-[9/16] relative overflow-hidden bg-[#0c0c0c] rounded-xl border border-white/10 group flex flex-col justify-between p-4 shadow-xl hover:border-brand-red transition-all select-none"
                      aria-label={`View ${reel.title}`}
                    >
                      {/* Header Badge */}
                      <div className="flex items-center justify-between z-10">
                        <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/70">
                          REEL 0{idx + 1}
                        </span>
                        <span className="text-[9px] font-mono tracking-widest text-brand-red font-semibold uppercase">
                          IG
                        </span>
                      </div>

                      {/* Center Play Icon */}
                      <div className="flex flex-col items-center justify-center my-auto z-10">
                        <div className="w-12 h-12 border border-white/20 bg-black/60 backdrop-blur-md text-white rounded-full flex items-center justify-center pl-0.5 group-hover:bg-brand-red group-hover:border-brand-red group-hover:scale-110 transition-all duration-300 shadow-xl">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                        </div>
                        <span className="text-[10px] font-mono tracking-widest text-white/50 group-hover:text-white uppercase mt-2.5 transition-colors">
                          WATCH
                        </span>
                      </div>

                      {/* Bottom Metadata */}
                      <div className="border-t border-white/5 pt-2.5 z-10 text-left">
                        <div className="text-xs font-bold text-white truncate">
                          {reel.title}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      ) : null}

      {/* Selected Work */}
      <section className="px-6 md:px-12 mb-32 container mx-auto max-w-7xl">
        <div className="bg-[#050505] p-12 md:p-16 border border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <h2 className="text-3xl font-display font-bold mb-4">Selected Work</h2>
            <p className="text-white/60 text-lg max-w-xl">
              Explore how we've applied {service.name.toLowerCase()} to real projects and campaigns.
            </p>
          </div>
          <Link 
            href={service.portfolioLink}
            className="inline-block bg-white text-black px-8 py-4 font-bold uppercase tracking-widest text-xs hover:bg-brand-red hover:text-white transition-colors rounded-full shrink-0"
          >
            View Our Work
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-12 container mx-auto max-w-7xl text-center">
        <div className="border-t border-white/10 pt-32 pb-16">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-12">Ready to create?</h2>
          <Link 
            href="/contact" 
            className="inline-block bg-brand-red text-white px-12 py-5 font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-colors rounded-full shadow-2xl"
          >
            Start a Project
          </Link>
        </div>
      </section>
    </div>
  );
}
