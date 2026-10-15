"use client";

import React from "react";
import {
  LayoutDashboard,
  Globe,
  Briefcase,
  Sliders,
  FileText,
  Award,
  Image as ImageIcon,
  Compass,
  Inbox,
  ShieldCheck,
  ExternalLink,
  LogOut,
  X,
  Users,
} from "lucide-react";

export type AdminTab =
  | "overview"
  | "homepage"
  | "services"
  | "settings"
  | "blogs"
  | "campaigns"
  | "media"
  | "seo"
  | "leads"
  | "admins"
  | "system";

interface AdminSidebarProps {
  activeTab: AdminTab;
  setActiveTab: (tab: AdminTab) => void;
  newLeadsCount: number;
  onLogout: () => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export function AdminSidebar({
  activeTab,
  setActiveTab,
  newLeadsCount,
  onLogout,
  isMobileOpen = false,
  onCloseMobile,
}: AdminSidebarProps) {
  const navSections = [
    {
      label: "MAIN",
      items: [
        { id: "overview" as AdminTab, label: "Dashboard", icon: LayoutDashboard },
      ],
    },
    {
      label: "WEBSITE & LAYOUT",
      items: [
        { id: "homepage" as AdminTab, label: "Homepage Sections", icon: Globe },
        { id: "services" as AdminTab, label: "Services (12)", icon: Briefcase },
        { id: "settings" as AdminTab, label: "Global Settings", icon: Sliders },
      ],
    },
    {
      label: "CONTENT & PORTFOLIO",
      items: [
        { id: "blogs" as AdminTab, label: "Blog Posts", icon: FileText },
        { id: "campaigns" as AdminTab, label: "Campaign Reports", icon: Award },
      ],
    },
    {
      label: "ASSETS & SEO",
      items: [
        { id: "media" as AdminTab, label: "Media Library", icon: ImageIcon },
        { id: "seo" as AdminTab, label: "SEO & Redirects", icon: Compass },
      ],
    },
    {
      label: "OPERATIONS",
      items: [
        {
          id: "leads" as AdminTab,
          label: "Inbound Leads",
          icon: Inbox,
          badge: newLeadsCount > 0 ? newLeadsCount : undefined,
        },
        { id: "admins" as AdminTab, label: "Admins & Team", icon: Users },
        { id: "system" as AdminTab, label: "System & Security", icon: ShieldCheck },
      ],
    },
  ];

  const handleSelectTab = (tab: AdminTab) => {
    setActiveTab(tab);
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Brand Header (Strictly Non-Navigational Brand Mark) */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10 select-none">
        <div>
          <div className="font-display font-bold text-xl tracking-tighter text-white flex items-center gap-2 pointer-events-none">
            <span>CREATE.</span>
            <span className="text-[10px] font-mono uppercase bg-brand-red text-white px-2 py-0.5 rounded font-bold">
              CMS
            </span>
          </div>
          <span className="text-[10px] font-mono tracking-widest uppercase text-white/40 block mt-1 pointer-events-none">
            Studio Operations Portal
          </span>
        </div>

        {/* Mobile Close Button */}
        {onCloseMobile && (
          <button
            onClick={onCloseMobile}
            className="md:hidden p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 cursor-pointer"
            aria-label="Close navigation"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Nav Menu */}
      <div className="flex-1 overflow-y-auto space-y-6 pr-1 custom-scrollbar">
        {navSections.map((sec, idx) => (
          <div key={idx}>
            <div className="text-[10px] font-mono uppercase tracking-widest text-white/30 px-3 mb-2 font-semibold select-none">
              {sec.label}
            </div>
            <nav className="space-y-1 font-mono text-xs">
              {sec.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectTab(item.id)}
                    className={`w-full px-3 py-2.5 rounded-lg text-left transition-colors flex items-center justify-between cursor-pointer ${
                      isActive
                        ? "bg-brand-red text-white font-bold shadow-md shadow-brand-red/20"
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Icon className="w-4 h-4 shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </div>
                    {item.badge !== undefined && (
                      <span
                        className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${
                          isActive
                            ? "bg-white text-black"
                            : "bg-brand-red text-white"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        ))}
      </div>

      {/* Sidebar Footer */}
      <div className="mt-6 pt-5 border-t border-white/10 flex flex-col gap-2 font-mono text-xs">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between text-white/50 hover:text-white transition-colors px-3 py-2 rounded hover:bg-white/5"
          title="Open public website in a new tab"
        >
          <span className="uppercase tracking-widest text-[11px]">View Live Site</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
        <button
          onClick={onLogout}
          className="flex items-center justify-between text-brand-red hover:text-white transition-colors px-3 py-2 rounded hover:bg-brand-red/10 cursor-pointer"
        >
          <span className="uppercase tracking-widest text-[11px] font-bold">Sign Out</span>
          <LogOut className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside className="hidden md:flex w-64 h-screen sticky top-0 border-r border-white/10 p-5 shrink-0 bg-[#080808] flex-col z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={onCloseMobile}
          />
          {/* Slide-out Sidebar */}
          <div className="relative w-72 max-w-[85vw] bg-[#080808] border-r border-white/10 p-5 flex flex-col z-50 shadow-2xl h-full">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
