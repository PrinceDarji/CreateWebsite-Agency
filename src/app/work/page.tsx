"use client";

import { useState } from "react";
import { VideoModal } from "@/components/VideoModal";
import { shivaReelsData, standardProjectsData } from "@/data/portfolioData";
import { ShivaMediaCard } from "@/components/ShivaMediaCard";

const filters = ["All", "Commercials", "Branded Content", "Campaigns", "Films", "Social", "Design"];

export default function WorkPage() {
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

  return (
    <>
      <VideoModal isOpen={!!activeVideo} onClose={() => setActiveVideo(null)} video={activeVideo} />
      <div className="pt-32 pb-24 px-6 md:px-12 min-h-screen bg-brand-bg text-brand-ink">
        <div className="container mx-auto max-w-7xl">
          
          <div className="mb-24 md:mb-32 max-w-4xl pt-16">
            <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-8 text-balance">
              Work Created by CREATE
            </h1>
            <p className="text-xl md:text-2xl text-white/70 font-medium leading-relaxed max-w-2xl">
              Explore commercials, branded content, campaigns, films, and visual stories created from idea to final frame.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 md:gap-8 mb-24 border-b border-white/10 pb-8">
            {filters.map((filter, i) => (
              <button 
                key={i} 
                className={`text-sm font-bold uppercase tracking-widest transition-colors ${i === 0 ? 'text-brand-red' : 'text-white/40 hover:text-white'}`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* 1. Shiva Immersive: All 21 Reels & Posts as Individual Items at the very top */}
          <div className="mb-32">
            <div className="flex justify-between items-end mb-12">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-brand-red block mb-2">
                  Featured Client Campaign
                </span>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-white">
                  Shiva Immersive
                </h2>
              </div>
              <span className="text-white/40 text-sm font-mono uppercase tracking-widest hidden md:inline">
                21 Live Assets
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {shivaReelsData.map((item, index) => (
                <ShivaMediaCard 
                  key={item.id}
                  item={item}
                  index={index}
                  onClick={() => openVideo(item)}
                />
              ))}
            </div>
          </div>

          {/* 2. Remaining Portfolio Projects in exact requested order */}
          <div className="flex flex-col gap-32">
            {standardProjectsData.map((project, i) => (
              <div key={project.slug} className="group flex flex-col gap-8">
                {/* Media Section */}
                <div 
                  role="button"
                  tabIndex={0}
                  aria-label={`Play ${project.name}`}
                  onClick={() => openVideo(project)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      openVideo(project);
                    }
                  }}
                  className={`w-full ${i === 0 ? 'aspect-[21/9]' : 'aspect-[16/9] md:aspect-[21/9]'} relative overflow-hidden bg-[#111] cursor-pointer border border-white/5 group-hover:border-brand-red transition-colors duration-500 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red`}
                >
                  {(() => {
                    let thumbUrl = project.image;
                    if (project.youtubeUrl) {
                      const match = project.youtubeUrl.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/);
                      if (match && match[2].length === 11) thumbUrl = `https://i.ytimg.com/vi/${match[2]}/maxresdefault.jpg`;
                    } else if (project.googleDriveId) {
                      thumbUrl = project.image || `https://lh3.googleusercontent.com/d/${project.googleDriveId}=w1920`;
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
                            if (project.youtubeUrl) {
                              const match = project.youtubeUrl.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/);
                              if (match && match[2].length === 11) {
                                target.src = `https://i.ytimg.com/vi/${match[2]}/hqdefault.jpg`;
                              }
                            } else if (project.slug === "iiac-promo") {
                              target.src = "/images/portfolio/iiac-promo.jpg";
                            }
                          }}
                          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 scale-100 group-hover:scale-105" 
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-20 h-20 border border-white/30 backdrop-blur-sm text-white rounded-full flex items-center justify-center pl-1 group-hover:bg-brand-red group-hover:border-brand-red transition-all duration-300 shadow-xl">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </div>
                
                {/* Minimal Info */}
                <div className="flex flex-col gap-2">
                  <h2 className="text-3xl font-display font-bold group-hover:text-brand-red transition-colors duration-300">
                    {project.name}
                  </h2>
                  <div className="text-white/60 font-medium uppercase tracking-widest text-sm flex gap-4">
                    <span>{project.client}</span>
                    <span className="text-brand-red">•</span>
                    <span>{project.category}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}
