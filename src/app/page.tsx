"use client";
import { ArrowIcon } from "@/components/ArrowIcon";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { LeadershipSection } from "@/components/LeadershipSection";
import { useState } from "react";
import { VideoModal } from "@/components/VideoModal";

import { standardProjectsData } from "@/data/portfolioData";

export default function Home() {
  const [activeVideo, setActiveVideo] = useState<{type: 'youtube' | 'drive' | 'url', idOrUrl: string} | null>(null);

  const openVideo = (item: any) => {
    if (item.youtubeUrl) {
      const match = item.youtubeUrl.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/);
      if (match && match[2].length === 11) {
        setActiveVideo({ type: 'youtube', idOrUrl: match[2] });
      }
    } else if (item.googleDriveId) {
      setActiveVideo({ type: 'drive', idOrUrl: item.googleDriveId });
    } else if (item.url) {
      setActiveVideo({ type: 'url', idOrUrl: item.url });
    }
  };
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  const otherProjects = standardProjectsData;

  return (
    <>
      <VideoModal isOpen={!!activeVideo} onClose={() => setActiveVideo(null)} video={activeVideo} />
      <div ref={containerRef} className="relative bg-brand-bg text-brand-ink selection:bg-brand-red">
      
      {/* 1. Hero & 2. CREATE Positioning */}
      <section className="min-h-screen pt-28 md:pt-36 pb-16 md:pb-24 px-5 sm:px-6 md:px-12 flex flex-col justify-center relative overflow-hidden">
        {/* Cinematic Hero Background */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
          <Image 
            src="/images/hero-bg.webp" 
            alt="CREATE Creative Production Studio Behind The Scenes"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_25%] md:object-center opacity-75 sm:opacity-65 md:opacity-55 transition-opacity duration-700"
          />
          {/* Ambient Black Overlay */}
          <div className="absolute inset-0 bg-black/35 md:bg-black/60" />
          {/* Cinematic Vignette & Edge Blending into page background */}
          <div className="absolute inset-0 bg-gradient-to-b from-brand-bg/75 via-transparent to-brand-bg" />
          {/* Radial Subtle Contrast Enhancer behind text */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.35)_0%,_transparent_80%)]" />
        </div>

        <div className="container mx-auto w-full max-w-7xl flex flex-col items-center text-center relative z-10">
          <motion.div style={{ y: heroY, opacity: heroOpacity }} className="w-full">
            <h1 className="text-[clamp(2.1rem,5vw,5rem)] font-display font-bold tracking-tight mb-4 sm:mb-6 text-balance leading-[1.12] sm:leading-tight">
              Creative Production Studio <br/>
              <span className="text-brand-ink/50">for Commercials, Branded Content & Campaigns.</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl font-sans font-medium text-brand-red tracking-wide mb-8 sm:mb-12">
              Branding so effective, it feels illegal.
            </p>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-6 text-xs sm:text-sm uppercase tracking-widest font-bold opacity-70 mb-8 sm:mb-12">
              <span>Commercials</span>
              <span>•</span>
              <span>Branded Content</span>
              <span>•</span>
              <span>Campaigns</span>
              <span>•</span>
              <span>Visual Storytelling</span>
            </div>
            
            <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-white/70 font-medium text-balance leading-relaxed">
              We connect research, creative thinking, production, and execution to turn ideas into work people can see, feel, and remember.
            </p>
            
            <div className="mt-10 sm:mt-16 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 sm:gap-8 w-full sm:w-auto max-w-xs sm:max-w-none mx-auto">
              <Link href="/contact" className="bg-white text-black text-center px-8 py-4 font-bold uppercase tracking-widest text-xs sm:text-sm hover:bg-brand-red hover:text-white transition-colors rounded-full sm:rounded-none shadow-xl">
                Start a Project
              </Link>
              <Link href="/work" className="text-xs sm:text-sm font-bold uppercase tracking-widest hover:text-brand-red transition-colors text-center px-6 py-3 sm:px-0 sm:py-0 border border-white/20 sm:border-transparent rounded-full sm:rounded-none">
                Explore Our Work
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Client Brands Marquee */}
      <section className="py-16 md:py-24 bg-brand-bg border-t border-b border-white/5 overflow-hidden relative">
        {/* Edge Fade Masks for clean mobile view */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-8 md:w-24 bg-gradient-to-r from-brand-bg to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-8 md:w-24 bg-gradient-to-l from-brand-bg to-transparent z-10" />
        
        <div className="container mx-auto px-6 md:px-12 max-w-7xl mb-6 md:mb-8 text-center">
          <h2 className="text-brand-red text-xs md:text-sm font-bold uppercase tracking-widest mb-4">Created For</h2>
        </div>
        
        {(() => {
          const clientBrands = [
            "Government of Meghalaya",
            "W.H Warehouse",
            "Sharda International School",
            "PWD Delhi",
            "No Label",
            "Sabrini",
            "P&G",
            "BRB",
            "Tipsy Tiger",
            "Troovy",
            "Wellbeing Nutrition",
            "Red Bull",
            "IIAC",
            "PW",
            "Protiviti",
            "AIESEC",
            "TrustERRA",
            "Korea Agro-Fisheries",
            "Korean Cultural Centre",
            "JhaJi"
          ];

          return (
            <div className="relative flex overflow-x-hidden group">
              <div className="py-4 md:py-6 animate-marquee whitespace-nowrap flex shrink-0 items-center gap-12 sm:gap-16 md:gap-32 pr-12 sm:pr-16 md:pr-32 motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:pr-0 group-hover:[animation-play-state:paused]">
                {clientBrands.map((client, i) => (
                  <span key={`brand-1-${i}`} className="text-xl sm:text-2xl md:text-4xl font-display font-bold text-white/30 hover:text-white transition-colors duration-300 select-none">
                    {client}
                  </span>
                ))}
              </div>
              <div className="py-4 md:py-6 animate-marquee whitespace-nowrap flex shrink-0 items-center gap-12 sm:gap-16 md:gap-32 pr-12 sm:pr-16 md:pr-32 motion-reduce:hidden group-hover:[animation-play-state:paused]" aria-hidden="true">
                {clientBrands.map((client, i) => (
                  <span key={`brand-2-${i}`} className="text-xl sm:text-2xl md:text-4xl font-display font-bold text-white/30 hover:text-white transition-colors duration-300 select-none">
                    {client}
                  </span>
                ))}
              </div>
            </div>
          );
        })()}
      </section>

      {/* 3. What We Create */}
      <section className="py-20 md:py-32 bg-[#050505] px-6 md:px-12 border-t border-white/5">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-12 md:mb-24 max-w-3xl">
            <h2 className="text-brand-red text-sm font-bold uppercase tracking-widest mb-4">What We Create</h2>
            <p className="text-3xl md:text-5xl font-display font-bold tracking-tight leading-tight">
              Ideas need more than a starting point. They need research, direction, production, and careful execution.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16">
            {[
              { 
                title: "Commercials", 
                desc: "Commercial films built around clear ideas, strong stories, and purposeful visual direction." 
              },
              { 
                title: "Branded Content", 
                desc: "Brand-led stories made to communicate, connect, and give audiences something worth watching." 
              },
              { 
                title: "Campaigns", 
                desc: "Creative campaign work that connects the central idea with the content and visual assets needed to bring it to life." 
              },
              { 
                title: "Visual Storytelling", 
                desc: "Stories shaped through film, design, motion, sound, and creative direction." 
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                className="group border-l border-white/10 pl-8 hover:border-brand-red transition-colors duration-300"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <h3 className="text-3xl font-display font-bold mb-4">{item.title}</h3>
                <p className="text-white/60 text-lg leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. The Leadership */}
      <LeadershipSection 
        showCta={true} 
        ctaText="Meet the Team" 
        ctaHref="/about#leadership" 
      />

      {/* 5. Featured: Influencer Marketing Campaign Report */}
      <section className="py-24 md:py-32 bg-[#080808] px-6 md:px-12 border-t border-white/5 relative overflow-hidden">
        {/* Subtle ambient lighting effects */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-red/[0.07] rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-white/[0.02] rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col items-start">
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-brand-red/10 border border-brand-red/25 text-brand-red text-xs font-bold uppercase tracking-widest mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse" />
                <span>Featured Campaign Report</span>
                <span className="opacity-30">•</span>
                <span>Case Study</span>
              </div>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight text-white mb-6 text-balance leading-[1.08]">
                Influencer Marketing Campaign Report
              </h2>

              <p className="text-lg sm:text-xl md:text-2xl text-white/70 font-sans font-medium leading-relaxed max-w-2xl mb-10 text-balance">
                Explore our influencer marketing campaign, performance insights, return on investment, and key learnings.
              </p>

              <Link
                href="/services/influencer-marketing#campaign-report"
                className="inline-flex items-center gap-3 bg-brand-red hover:bg-white text-white hover:text-black px-8 py-4 font-sans font-bold uppercase tracking-widest text-xs md:text-sm transition-all duration-300 rounded-full group shadow-xl shadow-brand-red/20"
              >
                <span>View Campaign Report</span>
                <span className="group-hover:translate-x-1.5 transition-transform duration-300 font-sans font-bold">→</span>
              </Link>
            </div>

            {/* Right Highlights & Metrics Card */}
            <div className="lg:col-span-5">
              <div className="p-5 sm:p-8 md:p-10 rounded-2xl bg-[#0e0e0e] border border-white/10 hover:border-brand-red/40 transition-colors duration-500 shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-red/5 via-transparent to-transparent pointer-events-none" />
                
                <div className="flex items-center justify-between border-b border-white/10 pb-4 sm:pb-6 mb-6 sm:mb-8 relative z-10 gap-2">
                  <div>
                    <span className="text-[10px] sm:text-[11px] uppercase tracking-widest font-mono text-white/40 block mb-1">
                      Campaign Showcase
                    </span>
                    <span className="text-lg sm:text-xl font-display font-bold text-white">
                      Shiva Immersive
                    </span>
                  </div>
                  <span className="text-[9px] sm:text-[10px] font-mono tracking-wider px-2.5 sm:px-3 py-1 rounded bg-white/5 border border-white/10 text-brand-red font-semibold uppercase shrink-0">
                    GIP Mall, Noida
                  </span>
                </div>

                {/* 4 Highlight Metrics */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 relative z-10">
                  <div className="p-3 sm:p-4 rounded-xl bg-black/50 border border-white/5">
                    <div className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white mb-1">
                      23.4L
                    </div>
                    <div className="text-[10px] sm:text-[11px] uppercase tracking-wider font-bold text-brand-red">
                      Accounts Reached
                    </div>
                    <div className="text-[9px] sm:text-[10px] text-white/40 font-mono mt-1">21 live counted posts</div>
                  </div>

                  <div className="p-3 sm:p-4 rounded-xl bg-black/50 border border-white/5">
                    <div className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white mb-1">
                      22
                    </div>
                    <div className="text-[10px] sm:text-[11px] uppercase tracking-wider font-bold text-brand-red">
                      Creators Engaged
                    </div>
                    <div className="text-[9px] sm:text-[10px] text-white/40 font-mono mt-1">15 creators + 7 pages</div>
                  </div>

                  <div className="p-3 sm:p-4 rounded-xl bg-black/50 border border-white/5">
                    <div className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white mb-1">
                      ₹184
                    </div>
                    <div className="text-[10px] sm:text-[11px] uppercase tracking-wider font-bold text-brand-red">
                      CPM Efficiency
                    </div>
                    <div className="text-[9px] sm:text-[10px] text-white/40 font-mono mt-1">Per 1k accounts reached</div>
                  </div>

                  <div className="p-3 sm:p-4 rounded-xl bg-black/50 border border-white/5">
                    <div className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white mb-1">
                      1,561
                    </div>
                    <div className="text-[10px] sm:text-[11px] uppercase tracking-wider font-bold text-brand-red">
                      Ticket-Link DMs
                    </div>
                    <div className="text-[9px] sm:text-[10px] text-white/40 font-mono mt-1">Direct intent triggered</div>
                  </div>
                </div>

                <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-white/10 flex items-center justify-between text-xs text-white/50 relative z-10">
                  <span className="truncate pr-2">Audited ROI & Creator Formats</span>
                  <Link 
                    href="/services/influencer-marketing#campaign-report"
                    className="text-brand-red font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 hover:underline shrink-0"
                  >
                    Read Full Audit →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Some of Our Work */}
      <section className="py-20 md:py-32 bg-[#050505] px-6 md:px-12 border-t border-white/5">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 md:mb-24 gap-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight">
              Some of Our Work
            </h2>
            <Link href="/work" className="text-xs sm:text-sm font-medium tracking-widest uppercase hover:text-brand-red transition-colors inline-flex items-center">
              View All Work <ArrowIcon className="ml-2 group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
          </div>

          {/* Remaining Projects in Requested Order */}
          <div className="flex flex-col gap-16 md:gap-32">
            {otherProjects.map((project, index) => (
                <motion.div 
                  key={project.id}
                  role="button"
                  tabIndex={0}
                  aria-label={`Play ${project.name}`}
                  className="group relative cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red rounded-lg"
                  onClick={() => openVideo(project)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      openVideo(project);
                    }
                  }}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="w-full aspect-[16/9] md:aspect-[21/9] bg-[#111] overflow-hidden mb-6 md:mb-8 relative border border-white/10 group-hover:border-brand-red transition-colors duration-500 rounded-xl">
                    {(() => {
                      let thumbUrl = (project as any).image;
                      if ((project as any).youtubeUrl) {
                        const match = (project as any).youtubeUrl.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/);
                        if (match && match[2].length === 11) thumbUrl = `https://i.ytimg.com/vi/${match[2]}/maxresdefault.jpg`;
                      } else if ((project as any).googleDriveId) {
                        thumbUrl = (project as any).image || `https://lh3.googleusercontent.com/d/${(project as any).googleDriveId}=w1920`;
                      }

                      if (!thumbUrl) return null;

                      return (
                        <>
                          <img 
                            src={thumbUrl} 
                            alt={project.name} 
                            onError={(e) => {
                              const target = e.currentTarget as HTMLImageElement;
                              target.onerror = null;
                              if ((project as any).youtubeUrl) {
                                const match = (project as any).youtubeUrl.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/);
                                if (match && match[2].length === 11) {
                                  target.src = `https://i.ytimg.com/vi/${match[2]}/hqdefault.jpg`;
                                }
                              } else if ((project as any).slug === "iiac-promo") {
                                target.src = "/images/portfolio/iiac-promo.jpg";
                              }
                            }}
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 scale-100 group-hover:scale-105" 
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500"></div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 border border-white/30 backdrop-blur-sm text-white rounded-full flex items-center justify-center pl-1 group-hover:bg-brand-red group-hover:border-brand-red transition-all duration-300 shadow-xl">
                              <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                            </div>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                  
                  <div className="flex flex-col gap-2 relative z-10">
                    <div className="text-xs font-bold uppercase tracking-widest text-brand-red">
                      {project.category}
                    </div>
                    <div className="flex justify-between items-end">
                      <h3 className="text-3xl md:text-5xl font-display font-bold group-hover:text-brand-red transition-colors duration-300">
                        {project.name}
                      </h3>
                    </div>
                    <div className="text-white/60 font-medium">
                      {project.client}
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      {/* 6. Why Choose CREATE Preview */}
      <section className="py-20 md:py-32 bg-brand-bg px-6 md:px-12 border-t border-white/5">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div>
              <h2 className="text-brand-red text-sm font-bold uppercase tracking-widest mb-4">Why CREATE?</h2>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight mb-6 md:mb-8">
                Good creative starts with understanding.
              </h3>
              <p className="text-lg sm:text-xl text-white/60 leading-relaxed mb-8 md:mb-12">
                We connect first and research the context before we ever develop the creative. From end-to-end execution to unified creative direction, we ensure the creative serves the actual goal.
              </p>
              
              <ul className="space-y-4 mb-8 md:mb-12">
                {['Research Before Execution', 'Complete Production Capability', 'Unified Creative Direction', 'Stories People Can See'].map((reason, idx) => (
                  <li key={idx} className="flex items-center gap-4 text-base sm:text-lg font-medium text-white/80">
                    <span className="w-1.5 h-1.5 bg-brand-red rounded-full"></span>
                    {reason}
                  </li>
                ))}
              </ul>
              
              <Link 
                href="/why-choose-us"
                className="inline-block bg-white text-black px-8 py-4 font-bold uppercase tracking-widest text-xs hover:bg-brand-red hover:text-white transition-colors rounded-full"
              >
                Explore Why CREATE
              </Link>
            </div>
            <div className="aspect-[4/3] lg:aspect-[3/2] bg-[#050505] border border-white/10 rounded-2xl relative overflow-hidden group shadow-2xl">
               <Image 
                 src="/images/services/commercial-production.webp"
                 alt="CREATE creative studio on set during film production with cinema camera and lighting"
                 fill
                 sizes="(max-width: 768px) 100vw, 50vw"
                 className="object-cover transition-transform duration-700 group-hover:scale-105"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Insights Preview */}
      <section className="py-20 md:py-32 bg-[#050505] px-6 md:px-12 border-t border-white/5">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 md:mb-16 gap-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight">
              Insights & Thinking.
            </h2>
            <Link href="/insights" className="text-xs sm:text-sm font-medium tracking-widest uppercase hover:text-brand-red transition-colors inline-flex items-center">
              Read More <ArrowIcon className="ml-2 group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
             <div className="border border-white/10 p-8 hover:border-brand-red transition-colors">
                <span className="text-brand-red text-xs font-bold uppercase tracking-widest mb-4 block">Production</span>
                <h3 className="text-2xl font-display font-bold mb-4">Why execution is just as important as the idea.</h3>
                <Link href="/insights" className="text-sm font-bold uppercase hover:text-brand-red transition-colors mt-8 inline-block">Read <ArrowIcon className="ml-2 group-hover:translate-x-2 transition-transform duration-300" /></Link>
             </div>
             <div className="border border-white/10 p-8 hover:border-brand-red transition-colors">
                <span className="text-brand-red text-xs font-bold uppercase tracking-widest mb-4 block">Strategy</span>
                <h3 className="text-2xl font-display font-bold mb-4">Researching the context before developing the creative.</h3>
                <Link href="/insights" className="text-sm font-bold uppercase hover:text-brand-red transition-colors mt-8 inline-block">Read <ArrowIcon className="ml-2 group-hover:translate-x-2 transition-transform duration-300" /></Link>
             </div>
             <div className="border border-white/10 p-8 hover:border-brand-red transition-colors">
                <span className="text-brand-red text-xs font-bold uppercase tracking-widest mb-4 block">Storytelling</span>
                <h3 className="text-2xl font-display font-bold mb-4">How visual stories shape audience perception.</h3>
                <Link href="/insights" className="text-sm font-bold uppercase hover:text-brand-red transition-colors mt-8 inline-block">Read <ArrowIcon className="ml-2 group-hover:translate-x-2 transition-transform duration-300" /></Link>
             </div>
          </div>
        </div>
      </section>

      {/* 9. Final CTA */}
      <section className="py-48 bg-brand-bg text-center px-6 md:px-12 relative overflow-hidden border-t border-white/5">
        <div className="container mx-auto max-w-4xl z-10 relative">
          <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-8">
            Start a project.
          </h2>
          <p className="text-xl text-white/60 mb-12 max-w-xl mx-auto">
            Ready to build something exceptional? Tell us about your brand and what you're looking to create.
          </p>
          <Link 
            href="/contact" 
            className="inline-block bg-white text-black px-10 py-5 font-bold uppercase tracking-widest text-sm hover:bg-brand-red hover:text-white transition-colors rounded-full"
          >
            Work With CREATE
          </Link>
        </div>
      </section>
    </div>
    </>
  );
}