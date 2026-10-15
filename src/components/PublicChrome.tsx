"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";

/**
 * PublicChrome renders public-facing navigational chrome and interactive widgets:
 * - Public navigation header with CREATE logo linking to "/"
 * - Public full-screen mobile menu overlay
 * - Scroll-triggered floating "Start a Project" conversion CTA
 * - Custom brand cursor
 * 
 * It strictly excludes all "/admin" routes so that the CMS dashboard
 * operates as an independent, isolated administrative application.
 */
export default function PublicChrome() {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return null;
  }

  return (
    <>
      <CustomCursor />
      <Navigation />
    </>
  );
}
