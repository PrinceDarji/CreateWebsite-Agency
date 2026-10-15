"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (pathname?.startsWith("/admin")) return;
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const navLinks = [{ name: "Work", href: "/work" }, { name: "Services", href: "/services" }, { name: "About", href: "/about" }, { name: "Insights", href: "/insights" }];

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-4 bg-black/80 backdrop-blur-xl' : 'py-8 md:py-12'} px-6 md:px-12 pointer-events-none flex justify-between items-center`}>
        <Link href="/" onClick={(e) => { if (pathname === "/") { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); } setIsOpen(false); }} className="pointer-events-auto relative w-32 md:w-48 h-16 md:h-20 opacity-90 hover:opacity-100 transition-opacity" data-cursor="HOME">
          {/* Removed mix-blend-difference to fix the unwanted visible box/container around the logo */}
          <Image 
            src="/create-logo-transparent.png" 
            alt="CREATE. Logo" 
            fill 
            sizes="(max-width: 768px) 128px, 192px"
            className="object-contain object-left"
            priority
          />
        </Link>
        
        <div className="flex items-center pointer-events-auto">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="group flex flex-col items-end gap-[5px] p-2"
            data-cursor={isOpen ? "CLOSE" : "MENU"}
          >
            <motion.div 
              animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 7 : 0 }} 
              className="w-8 h-[2px] bg-white transition-colors"
            />
            <motion.div 
              animate={{ opacity: isOpen ? 0 : 1 }} 
              className="w-6 h-[2px] bg-white group-hover:w-8 group-hover:bg-brand-red transition-all"
            />
            <motion.div 
              animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -7 : 0, width: isOpen ? 32 : 16 }} 
              className="w-4 h-[2px] bg-white group-hover:w-8 transition-all"
            />
          </button>
        </div>
      </header>

      {/* Elegant Floating CTA */}
      <motion.div 
        className="fixed bottom-8 right-8 z-40 pointer-events-auto hidden md:block"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: scrolled ? 1 : 0, y: scrolled ? 0 : 20 }}
        transition={{ duration: 0.5 }}
      >
        <Link 
          href="/contact"
          className="bg-brand-red text-white px-8 py-4 font-sans font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-all duration-300 rounded-full shadow-2xl"
          data-cursor="LET'S TALK"
        >
          Start a Project
        </Link>
      </motion.div>

      {/* Cinematic Full Screen Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-black text-white flex flex-col px-6 md:px-24 pt-32 md:pt-40 pb-12 overflow-y-auto"
          >
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start my-auto">
              
              {/* Left Column: Primary Navigation */}
              <nav className="flex flex-col space-y-1 md:space-y-2">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ delay: 0.1 * i, duration: 0.6, ease: "easeOut" }}
                  >
                    <Link
                      href={link.href}
                      className="text-[clamp(2rem,4vw,3.5rem)] font-display font-bold hover:text-brand-red transition-colors tracking-tight inline-block leading-tight"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Right Column: Contact & Social */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="flex flex-col gap-10 md:gap-12 md:border-l md:border-white/10 md:pl-16 py-4"
              >
                <div>
                    <h4 className="text-base md:text-lg font-bold uppercase tracking-widest text-brand-red mb-4">START SOMETHING</h4>
                    <Link
                      href="/contact"
                      className="text-4xl md:text-5xl font-display font-bold text-white hover:text-brand-red transition-colors tracking-tight flex items-center gap-4 group"
                      onClick={() => setIsOpen(false)}
                    >
                      Let's Talk 
                      <svg 
                        className="w-8 h-8 md:w-10 md:h-10 group-hover:translate-x-2 transition-transform" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-brand-red mb-4">Social</h4><div className="flex flex-col gap-3"><a href="#" className="text-[clamp(1rem,1.5vw,1.25rem)] font-sans font-medium text-white/80 hover:text-white transition-colors">Instagram</a><a href="#" className="text-[clamp(1rem,1.5vw,1.25rem)] font-sans font-medium text-white/80 hover:text-white transition-colors">LinkedIn</a><a href="#" className="text-[clamp(1rem,1.5vw,1.25rem)] font-sans font-medium text-white/80 hover:text-white transition-colors">Vimeo</a></div>
                </div>
              </motion.div>
              
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}



