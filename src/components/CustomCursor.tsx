"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function CustomCursor() {
  const pathname = usePathname();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorText, setCursorText] = useState("");
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  useEffect(() => {
    // Disable on mobile
    if (window.innerWidth > 768) {
      setIsMobile(false);
    }

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Look up the DOM tree for a data-cursor attribute
      const cursorElement = target.closest('[data-cursor]');
      
      if (cursorElement) {
        setIsHovering(true);
        const text = cursorElement.getAttribute('data-cursor') || "";
        setCursorText(text);
      } else if (target.closest('a') || target.closest('button')) {
        setIsHovering(true);
        setCursorText("");
      } else {
        setIsHovering(false);
        setCursorText("");
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  if (isMobile) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-[100] flex items-center justify-center text-center mix-blend-difference overflow-hidden"
      animate={{
        x: mousePosition.x - (isHovering && cursorText ? 40 : (isHovering ? 16 : 8)),
        y: mousePosition.y - (isHovering && cursorText ? 40 : (isHovering ? 16 : 8)),
        width: isHovering && cursorText ? 80 : (isHovering ? 32 : 16),
        height: isHovering && cursorText ? 80 : (isHovering ? 32 : 16),
        backgroundColor: isHovering && cursorText ? "#FF3B00" : "#fff",
      }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 28,
        mass: 0.5
      }}
    >
      <AnimatePresence mode="wait">
        {isHovering && cursorText && (
          <motion.span 
            key="text"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="text-[10px] font-bold text-white font-sans uppercase tracking-widest leading-none block"
          >
            {cursorText}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
