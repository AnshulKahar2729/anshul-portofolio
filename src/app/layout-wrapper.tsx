"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Sidebar } from "@/components/sidebar";
import { MobileNav } from "@/components/mobile-nav";
import { TechIdeaPopup } from "@/components/tech-idea-popup";
import { CursorSpotlight } from "@/components/cursor-spotlight";
import { HoverParticles } from "@/components/hover-particles";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <TooltipProvider delayDuration={0}>
        {/* Cursor Spotlight Effect */}
        <CursorSpotlight />
        
        {/* Hover Particles */}
        <HoverParticles />

        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <Sidebar />
        </div>

        {/* Mobile Navigation */}
        <MobileNav />

        {/* Main Content */}
        <div className="lg:pl-64 pt-16 lg:pt-0">
          {children}
        </div>

        {/* Tech Idea Popup */}
        <TechIdeaPopup />
      </TooltipProvider>
    </ThemeProvider>
  );
}
