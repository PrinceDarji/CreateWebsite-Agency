"use client";

import React from "react";
import { ShivaItem } from "@/data/portfolioData";

interface ShivaMediaCardProps {
  item: ShivaItem;
  index: number;
  onClick: () => void;
}

export function ShivaMediaCard({ item, index, onClick }: ShivaMediaCardProps) {
  const isPost = item.type === "post";
  const itemNumber = String(index + 1).padStart(2, "0");

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`Play ${item.name}`}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      className="group relative cursor-pointer flex flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red rounded-lg select-none"
    >
      {/* 9:16 Aspect Ratio Media Box */}
      <div className="w-full aspect-[9/16] bg-[#0c0c0c] border border-white/10 group-hover:border-brand-red transition-all duration-500 rounded-lg relative overflow-hidden flex flex-col justify-between p-4 sm:p-6 shadow-2xl">
        
        {/* Cover image if available */}
        {item.thumbnail && (
          <>
            <img 
              src={item.thumbnail} 
              alt={item.name} 
              className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 pointer-events-none" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/60 pointer-events-none" />
          </>
        )}

        {/* Subtle dark ambient glow on hover */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/[0.04] via-transparent to-transparent pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute inset-0 bg-brand-red/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Top Header Badge */}
        <div className="relative z-10 flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded bg-white/5 border border-white/10 text-white/70">
            {isPost ? "POST" : "REEL"} {itemNumber}
          </span>
          <span className="text-[10px] font-mono tracking-widest text-brand-red font-semibold uppercase">
            INSTAGRAM
          </span>
        </div>

        {/* Center: Play Icon & Prompt */}
        <div className="relative z-10 flex flex-col items-center justify-center my-auto">
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border border-white/20 bg-black/60 backdrop-blur-md flex items-center justify-center pl-1 text-white group-hover:bg-brand-red group-hover:border-brand-red group-hover:scale-110 transition-all duration-300 shadow-2xl">
            <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-white/50 group-hover:text-white uppercase mt-3 sm:mt-4 transition-colors">
            WATCH {isPost ? "POST" : "REEL"}
          </span>
        </div>

        {/* Bottom Metadata inside card */}
        <div className="relative z-10 border-t border-white/5 pt-4">
          <div className="text-[11px] font-mono uppercase tracking-wider text-white/40 truncate">
            {item.client}
          </div>
          <div className="text-xs font-bold text-white/90 truncate mt-0.5">
            {item.name}
          </div>
        </div>
      </div>

      {/* Card Info Below */}
      <div className="flex flex-col gap-1.5 mt-4 relative z-10">
        <div className="text-xs font-bold uppercase tracking-widest text-brand-red">
          {item.category}
        </div>
        <h3 className="text-xl md:text-2xl font-display font-bold text-white group-hover:text-brand-red transition-colors duration-300">
          {item.name}
        </h3>
        <div className="text-white/60 font-medium text-sm">
          {item.client}
        </div>
      </div>
    </div>
  );
}
