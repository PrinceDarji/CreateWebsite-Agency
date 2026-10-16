"use client";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  video: {
    type: 'youtube' | 'drive' | 'url';
    idOrUrl: string;
  } | null;
}


function getSafeUrl(url: string, type: 'youtube' | 'drive' | 'url'): string {
  try {
    if (type === 'youtube') {
      // Validate that the ID is strictly alphanumeric/underscores/hyphens
      if (!/^[a-zA-Z0-9_-]{11}$/.test(url)) return '';
      return `https://www.youtube.com/embed/${url}?autoplay=1&rel=0`;
    }
    if (type === 'drive') {
      if (!/^[a-zA-Z0-9_-]+$/.test(url)) return '';
      return `https://drive.google.com/file/d/${url}/preview`;
    }
    if (type === 'url') {
      const parsed = new URL(url);
      if (parsed.protocol !== 'https:') return '';
      const allowedDomains = ['www.youtube.com', 'youtube.com', 'www.instagram.com', 'instagram.com', 'drive.google.com'];
      if (!allowedDomains.includes(parsed.hostname)) return '';
      return parsed.toString();
    }
  } catch (e) {
    return '';
  }
  return '';
}

export function VideoModal({ isOpen, onClose, video }: VideoModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEsc);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && video && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }} 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050505]/95 backdrop-blur-md p-4 md:p-12"
          onClick={onClose}
        >
          <button 
            className="absolute top-4 right-4 md:top-8 md:right-8 text-white/70 hover:text-brand-red transition-colors z-[110] p-2 rounded-full bg-black/60 md:bg-transparent backdrop-blur-md md:backdrop-blur-none border border-white/10 md:border-transparent flex items-center justify-center"
            onClick={onClose}
            aria-label="Close video"
          >
            <svg className="w-7 h-7 md:w-10 md:h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>

          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className={`w-full relative bg-black shadow-2xl overflow-hidden border border-white/10 ${video.type === 'url' && video.idOrUrl.includes('instagram.com') ? 'max-w-md aspect-[9/16] max-h-[85vh] mx-auto rounded-2xl' : 'max-w-7xl aspect-video rounded-xl'}`}
            onClick={(e) => e.stopPropagation()}
          >
            {video.type === 'youtube' && (
              <iframe 
                src={getSafeUrl(video.idOrUrl, "youtube")} 
                title="YouTube Video Player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="w-full h-full border-0 absolute inset-0"
              ></iframe>
            )}
            {video.type === 'drive' && (
              <iframe 
                src={getSafeUrl(video.idOrUrl, "drive")} 
                title="Google Drive Video Player"
                allow="autoplay" 
                allowFullScreen
                className="w-full h-full border-0 absolute inset-0"
              ></iframe>
            )}
            {video.type === 'url' && (
              <>
                <iframe 
                  src={getSafeUrl(video.idOrUrl, "url")} 
                  title="Video Player"
                  allow="autoplay; encrypted-media; picture-in-picture" 
                  allowFullScreen
                  className="w-full h-full border-0 absolute inset-0"
                ></iframe>
                {video.idOrUrl.includes('instagram.com') && (
                  <div className="absolute bottom-3 left-0 right-0 text-center z-30 pointer-events-auto">
                    <a 
                      href={video.idOrUrl.replace('/embed', '')} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-black/80 hover:bg-brand-red text-white/80 hover:text-white text-xs font-medium rounded-full transition-colors backdrop-blur-sm border border-white/20 shadow-lg"
                    >
                      <span>Open on Instagram</span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                    </a>
                  </div>
                )}
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
