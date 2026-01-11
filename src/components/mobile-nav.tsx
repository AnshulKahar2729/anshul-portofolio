"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DATA } from "@/data/resume";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Icons } from "@/components/icons";

interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

const navItems: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "Experience", href: "#work" },
  { label: "Tech Stack", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Tools", href: "/tools", external: true },
  { label: "Blog", href: "#articles" },
  { label: "Contact", href: "#contact" },
];

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const scrollToSection = (href: string, external?: boolean) => {
    if (external) {
      window.location.href = href;
      setIsOpen(false);
      return;
    }
    
    // If home link clicked and not on home page, redirect to home
    if (href === "#home" && !isHomePage) {
      window.location.href = "/";
      setIsOpen(false);
      return;
    }
    
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 border-b border-white/10 backdrop-blur-xl bg-white/70 dark:bg-black/30 z-50 flex items-center justify-between px-4 shadow-lg">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border border-primary/20">
            <AvatarImage src={DATA.avatarUrl} alt={DATA.name} />
            <AvatarFallback className="bg-primary/10 text-primary">{DATA.initials}</AvatarFallback>
          </Avatar>
          <span className="font-bold text-foreground">{DATA.name.split(" ")[0]}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </header>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 top-16 backdrop-blur-xl bg-white/70 dark:bg-black/30 z-40">
          <nav className="flex flex-col p-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href, item.external)}
                className="text-left px-4 py-3 rounded-lg transition-all text-foreground hover:backdrop-blur-xl border border-transparent"
                style={{
                  ['--hover-bg' as any]: `linear-gradient(135deg, hsla(var(--primary), 0.1), hsla(var(--primary), 0.05))`,
                  ['--hover-border' as any]: `hsla(var(--primary), 0.3)`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, hsla(var(--primary), 0.1), hsla(var(--primary), 0.05))';
                  e.currentTarget.style.borderColor = 'hsla(var(--primary), 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.borderColor = 'transparent';
                }}
              >
                {item.label}
              </button>
            ))}
            
            <div className="pt-4 border-t border-border mt-4">
              <p className="text-xs text-muted-foreground mb-3 px-4">Connect</p>
              <div className="flex gap-2 px-4">
                {Object.entries(DATA.contact.social)
                  .filter(([_, social]) => social.navbar)
                  .map(([name, social]) => {
                    const Icon = social.icon;
                    return (
                      <Link
                        key={name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center h-10 w-10 rounded-lg border border-border bg-card hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
                      >
                        <Icon className="h-5 w-5" />
                      </Link>
                    );
                  })}
              </div>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
