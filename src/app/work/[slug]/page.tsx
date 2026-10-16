import { ArrowIcon } from "@/components/ArrowIcon";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { shivaReelsData } from "@/data/portfolioData";

// Define the exact portfolio data locally since we don't have Supabase hooked up yet
const shivaProject = {
  title: "Shiva Immersive",
  client: "Shiva Immersive",
  category: "Influencer Marketing · Ideation · Scripting",
  projectType: "REEL_COLLECTION",
  budget: null,
  timeline: null,
  youtubeUrl: null,
  reels: shivaReelsData,
  brief: "We developed and executed the influencer marketing strategy for Shiva Immersive, from campaign ideation and content concepts to creator scripting and short-form execution.",
  services: ["Social Media Marketing", "Influencer Marketing", "Branded Content", "Creative Direction", "Content Marketing"]
};

const portfolioDb = {
  "shiva-immersive": shivaProject,
  "shiv-immersive": shivaProject,
  "balidaan-diwas": {
    title: "Bhagat Singh Memorial Day",
    client: "PWD Delhi",
    budget: "₹11,20,000",
    timeline: "21st–23rd March 2026",
    youtubeUrl: "https://www.youtube.com/embed/4kR-PMhCSc8", 
    brief: "Museum Inauguration Video for Bhagat Singh Memorial Day.",
    services: ["Concept", "Production", "Post-Production"]
  },
  "iiac-promo": {
    title: "IIAC Promotional Video",
    client: "India International Arbitration Centre",
    budget: "₹2,45,000",
    timeline: "15 Days",
    youtubeUrl: null, 
    googleDriveId: "1h5IsPFCKi4eMrLAhvO8kskZGv3Lr0XTL",
    brief: "Offered By Prime Minister's Office. Promotional Video played in 145 Embassies across the globe.",
    services: ["Production", "Editing", "Visual Storytelling"]
  },
  "laut-aaye": {
    title: "Laut Aaye Budhu",
    client: "Naash",
    budget: null,
    timeline: null,
    youtubeUrl: "https://www.youtube.com/embed/a4S9Q-Tchs4",
    brief: "Lyrical video for the release of Laut Aaye Budhu.",
    services: ["Motion Design", "Post-Production", "Creative Direction"]
  }
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = portfolioDb[slug as keyof typeof portfolioDb];
  if (!project) return { title: "Work Not Found | CREATE" };
  
  return {
    title: `${project.title} | Creative Production Case Studies | CREATE`,
    description: `See how CREATE approaches creative briefs through research, concept development, production, and final execution for ${project.client}.`,
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = portfolioDb[slug as keyof typeof portfolioDb];
  
  if (!project) {
    notFound();
  }

  return (
    <div className="pt-32 pb-24 min-h-screen bg-brand-bg text-brand-ink">
    <div className="container mx-auto px-6 md:px-12 max-w-7xl mb-16 text-center">
      <div className="text-sm font-bold uppercase tracking-widest text-brand-red mb-4">{(project as any).category}</div>
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight mb-4 text-balance">
        {project.title}
      </h1>
      <div className="text-xl text-white/60 font-medium uppercase tracking-widest">{project.client}</div>
    </div>

    {/* Cinematic Video Player or Reels */}
    {(project as any).projectType === "REEL_COLLECTION" ? (
      <div className="container mx-auto px-6 md:px-12 mb-32 max-w-5xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {(project as any).reels.map((reel: any, i: number) => {
            const isPost = reel.type === "post";
            return (
              <a
                key={i}
                href={reel.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group aspect-[9/16] w-full relative overflow-hidden rounded-xl border border-white/10 group-hover:border-brand-red bg-[#0c0c0c] flex flex-col justify-between p-4 sm:p-6 shadow-2xl transition-all duration-500"
              >
                {/* Cover image if available */}
                {reel.thumbnail && (
                  <>
                    <img 
                      src={reel.thumbnail} 
                      alt={reel.name || (reel as any).title} 
                      className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 pointer-events-none" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/60 pointer-events-none" />
                  </>
                )}

                {/* Header Badge */}
                <div className="flex items-center justify-between z-10">
                  <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded bg-white/5 border border-white/10 text-white/70">
                    {isPost ? "POST" : "REEL"} {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] font-mono tracking-widest text-brand-red font-semibold uppercase">
                    INSTAGRAM
                  </span>
                </div>

                {/* Center Play Button */}
                <div className="flex flex-col items-center justify-center my-auto z-10">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border border-white/20 bg-black/60 backdrop-blur-md flex items-center justify-center pl-1 text-white group-hover:bg-brand-red group-hover:border-brand-red group-hover:scale-110 transition-all duration-300 shadow-2xl">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-white/50 group-hover:text-white uppercase mt-3 sm:mt-4 transition-colors">
                    WATCH {isPost ? "POST" : "REEL"}
                  </span>
                </div>

                {/* Bottom Title */}
                <div className="border-t border-white/5 pt-4 z-10">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-white/40 truncate">
                    Shiva Immersive
                  </div>
                  <div className="text-xs font-bold text-white/90 truncate mt-0.5">
                    {reel.name || reel.title}
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    ) : (project as any).googleDriveId ? (
        <div className="w-full relative bg-[#050505] mb-32 flex items-center justify-center aspect-[16/9] md:aspect-[21/9] border-y border-white/5 overflow-hidden">
          <iframe 
            src={`https://drive.google.com/file/d/${(project as any).googleDriveId}/preview`} 
            title={`${project.title} Video Player`}
            allow="autoplay" 
            allowFullScreen
            loading="lazy"
            className="w-full h-full border-0 absolute inset-0"
          ></iframe>
        </div>
      ) : project.youtubeUrl ? (
        <div className="w-full relative bg-[#050505] mb-32 flex items-center justify-center aspect-[16/9] md:aspect-[21/9] border-y border-white/5 overflow-hidden">
          {(() => {
            const match = project.youtubeUrl.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/);
            const ytId = (match && match[2].length === 11) ? match[2] : null;
            return ytId ? (
              <iframe 
                src={`https://www.youtube.com/embed/${ytId}?autoplay=0&rel=0`} 
                title={`${project.title} Video Player`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                loading="lazy"
                className="w-full h-full border-0 absolute inset-0"
              ></iframe>
            ) : null;
          })()}
        </div>
      ) : (project as any).image ? (
        <div className="w-full relative bg-[#050505] mb-32 flex items-center justify-center aspect-[16/9] md:aspect-[21/9] border-y border-white/5 overflow-hidden">
          <img src={(project as any).image} alt={project.title} className="w-full h-full object-cover" />
        </div>
      ) : null}

      {/* Case Study Sections */}
      <div className="container mx-auto px-6 md:px-12 max-w-5xl mb-48 flex flex-col gap-24">
        
        {project.brief && (
          <div className="grid md:grid-cols-12 gap-8 md:gap-16">
            <div className="md:col-span-4 text-xs font-bold uppercase tracking-widest text-brand-red pt-2 border-t border-brand-red/30">
              The Brief
            </div>
            <div className="md:col-span-8 text-2xl md:text-3xl font-sans font-medium leading-relaxed text-white/90">
              {project.brief}
            </div>
          </div>
        )}

      </div>

      {/* Next Project / CTA */}
      <div className="bg-[#050505] py-32 border-t border-white/5">
        <div className="container mx-auto px-6 md:px-12 text-center max-w-4xl">
          <h2 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-8">Discuss Your Project</h2>
          <Link 
            href="/contact" 
            className="text-4xl md:text-6xl font-display font-bold tracking-tight hover:text-brand-red transition-colors inline-block"
            data-cursor="CONTACT"
          >
            Start a Conversation <ArrowIcon className="ml-2 group-hover:translate-x-2 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </div>
  );
}
