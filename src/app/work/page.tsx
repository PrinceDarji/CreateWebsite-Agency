"use client";
import { useState } from "react";
import { VideoModal } from "@/components/VideoModal";

const portfolio = [
  {
    title: "Bhagat Singh Memorial Day",
    slug: "balidaan-diwas",
    client: "PWD Delhi",
    category: "Museum Inauguration Video",
    youtubeUrl: "https://www.youtube.com/watch?v=4kR-PMhCSc8",
    image: "https://i.ytimg.com/vi/4kR-PMhCSc8/maxresdefault.jpg",
    aspectRatio: "aspect-[21/9]",
  },
  {
    title: "IIAC Promotional Video",
    slug: "iiac-promo",
    client: "India International Arbitration Centre",
    category: "Promotional Video",
    googleDriveId: "1h5IsPFCKi4eMrLAhvO8kskZGv3Lr0XTL",
    image: "/images/services/commercial-production.webp",
    aspectRatio: "aspect-[16/9]",
  },
  {
    title: "Laut Aaye Budhu",
    slug: "laut-aaye",
    client: "Naash",
    category: "Lyrical Video",
    youtubeUrl: "https://youtu.be/a4S9Q-Tchs4?si=HV1OzDyV0M9cy3NE",
    image: "https://i.ytimg.com/vi/a4S9Q-Tchs4/maxresdefault.jpg",
    aspectRatio: "aspect-[16/9]",
  },
  {
    title: "Shiva Immersive",
    slug: "shiv-immersive",
    client: "Shiva Immersive",
    category: "Influencer Marketing · Ideation · Scripting",
    reels: [
      { url: "https://www.instagram.com/reel/DdEaYGZJtdM/embed", thumbnail: "/images/services/social-media-marketing.webp" },
      { url: "https://www.instagram.com/reel/DdHNNxMhDTi/embed", thumbnail: "/images/services/content-marketing.webp" },
      { url: "https://www.instagram.com/reel/DdEfxbtgt2B/embed", thumbnail: "/images/services/commercial-production.webp" },
      { url: "https://www.instagram.com/reel/DdMcOrNOzeM/embed", thumbnail: "/images/services/visual-storytelling.webp" }
    ]
  }
];

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

          {/* Clean Editorial Gallery */}
          <div className="flex flex-col gap-32">
            {portfolio.map((project, i) => (
              <div key={project.slug} className="group flex flex-col gap-8">
                {/* Media Section */}
                {project.reels ? (
                  <div className="grid grid-cols-2 gap-4">
                    {project.reels.map((reel: any, idx: number) => (
                      <div 
                        key={idx} 
                        onClick={() => setActiveVideo({ type: 'url', idOrUrl: reel.url })}
                        className="aspect-[9/16] relative overflow-hidden bg-[#111] cursor-pointer group/reel rounded-xl border border-white/5"
                      >
                        <img src={reel.thumbnail} alt="Reel" className="w-full h-full object-cover opacity-80 group-hover/reel:opacity-100 transition-all duration-700 scale-100 group-hover/reel:scale-105" />
                        <div className="absolute inset-0 bg-black/0 group-hover/reel:bg-black/20 transition-colors duration-500"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 border border-white/30 backdrop-blur-sm text-white rounded-full flex items-center justify-center pl-1 group-hover/reel:bg-brand-red group-hover/reel:border-brand-red transition-all duration-300 shadow-xl">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div 
                    onClick={() => openVideo(project)} 
                    className={`w-full ${i === 0 ? 'aspect-[21/9]' : 'aspect-[16/9] md:aspect-[21/9]'} relative overflow-hidden bg-[#111] cursor-pointer border border-white/5 group-hover:border-brand-red transition-colors duration-500 rounded-xl`}
                  >
                    {(() => {
                      let thumbUrl = project.image;
                      if (project.youtubeUrl) {
                        const match = project.youtubeUrl.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/);
                        if (match && match[2].length === 11) thumbUrl = `https://i.ytimg.com/vi/${match[2]}/maxresdefault.jpg`;
                      } else if (project.googleDriveId) {
                        thumbUrl = project.image || '/images/services/commercial-production.webp';
                      }
                      if (!thumbUrl) return null;
                      return (
                        <>
                          <img 
                            src={thumbUrl} 
                            alt={project.title} 
                            onError={(e) => {
                              const target = e.currentTarget as HTMLImageElement;
                              target.onerror = null;
                              if (project.youtubeUrl) {
                                const match = project.youtubeUrl.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/);
                                if (match && match[2].length === 11) {
                                  target.src = `https://i.ytimg.com/vi/${match[2]}/hqdefault.jpg`;
                                }
                              } else {
                                target.src = project.image || '/images/services/commercial-production.webp';
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
                )}
                
                {/* Minimal Info */}
                <div className="flex flex-col gap-2">
                  <h2 className="text-3xl font-display font-bold group-hover:text-brand-red transition-colors duration-300">
                    {project.title}
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
