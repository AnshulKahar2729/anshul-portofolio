"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DATA } from "@/data/resume";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { Separator } from "@/components/ui/separator";
import { Home, User, Briefcase, Code, Lightbulb, Mail, Wrench, LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface NavItem {
  icon: LucideIcon;
  label: string;
  href: string;
  external?: boolean;
}

const navItems: NavItem[] = [
  { icon: Home, label: "Home", href: "#home" },
  { icon: Briefcase, label: "Experience", href: "#work" },
  { icon: Code, label: "Projects", href: "#projects" },
  { icon: Wrench, label: "Tools", href: "/tools", external: true },
  { icon: Lightbulb, label: "Blog", href: "#articles" },
  { icon: Mail, label: "Contact", href: "#contact" },
];

export function Sidebar() {
  const [activeSection, setActiveSection] = useState("home");
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      if (!isHomePage) return; // Only track sections on home page
      
      const sections = navItems.filter(item => !item.external).map(item => item.href.slice(1));
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      let currentSection = sections[0];
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const sectionTop = element.offsetTop;
          const sectionHeight = element.offsetHeight;
          const sectionMiddle = sectionTop + sectionHeight / 2;
          
          if (scrollPosition >= sectionMiddle) {
            currentSection = section;
          }
        }
      }
      
      setActiveSection(currentSection);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  const scrollToSection = (href: string, external?: boolean) => {
    if (external) {
      window.location.href = href;
      return;
    }
    
    // If home link clicked and not on home page, redirect to home
    if (href === "#home" && !isHomePage) {
      window.location.href = "/";
      return;
    }
    
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r border-white/10 z-50 flex flex-col shadow-2xl overflow-hidden">
      {/* Animated glass background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/40 to-white/60 dark:from-black/40 dark:via-black/20 dark:to-black/40"
        animate={{
          backgroundPosition: ["0% 0%", "0% 100%", "0% 0%"],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          backgroundSize: "100% 200%"
        }}
      />
      <div className="absolute inset-0 backdrop-blur-xl" />
      <div className="relative z-10 flex flex-col h-full">
      {/* Header */}
      <div className="p-6 space-y-4">
        <div className="flex items-center gap-4">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Avatar className="h-16 w-16 border-2 border-white/30 shadow-lg">
              <AvatarImage src={DATA.avatarUrl} alt={DATA.name} />
              <AvatarFallback className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 text-foreground">{DATA.initials}</AvatarFallback>
            </Avatar>
          </motion.div>
          <div>
            <h2 className="font-bold text-lg text-foreground">{DATA.name}</h2>
            <p className="text-xs text-muted-foreground font-medium">
              {DATA.work[0]?.title || "Developer"}
            </p>
            <p className="text-xs text-primary/80">
              @ {DATA.work[0]?.company || ""}
            </p>
          </div>
        </div>
        
      </div>

      <Separator />

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 relative">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = !item.external && isHomePage && activeSection === item.href.slice(1);
          
          return (
            <motion.button
              key={item.href}
              onClick={() => scrollToSection(item.href, item.external)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all relative overflow-hidden group ${
                isActive
                  ? "text-white"
                  : "hover:bg-white/10 dark:hover:bg-white/5 text-foreground"
              }`}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              {isActive && (
                <>
                  <motion.div
                    layoutId="activeSection"
                    className="absolute inset-0 rounded-lg shadow-lg backdrop-blur-xl border overflow-hidden"
                    style={{
                      background: "linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.08))",
                      borderColor: "rgba(255,255,255,0.3)",
                      boxShadow: "0 8px 32px 0 rgba(255,255,255,0.1), inset 0 1px 0 rgba(255,255,255,0.3)"
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30
                    }}
                  />
                  {/* Shiny effect - shimmer */}
                  <motion.div
                    className="pointer-events-none absolute inset-0 z-20"
                    initial={false}
                    animate={{}}
                  >
                    <motion.div
                      className="absolute inset-y-0 left-[-60%] w-[60%] bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-70 group-hover:animate-shine"
                      style={{
                        filter: 'blur(1px)'
                      }}
                      initial={false}
                      animate={isActive ? { left: ["-60%", "120%"] } : {}}
                      transition={
                        isActive
                          ? {
                              duration: 1.2,
                              repeat: Infinity,
                              ease: "linear",
                            }
                          : {}
                      }
                    />
                  </motion.div>
                </>
              )}
              <Icon className="h-5 w-5 relative z-10" />
              <span className="font-medium relative z-10">{item.label}</span>
              <style jsx>{`
                .group:hover .group-hover\\:animate-shine {
                  animation: shineMove 1.2s linear forwards;
                }
                @keyframes shineMove {
                  0% {
                    left: -60%;
                  }
                  60% {
                    left: 120%;
                  }
                  100% {
                    left: 120%;
                  }
                }
              `}</style>
            </motion.button>
          );
        })}
      </nav>

      <Separator />

      {/* Social Links */}
      <div className="p-6 border-t">
        <p className="text-xs text-muted-foreground mb-3">Connect with me</p>
        <div className="flex gap-2">
          {Object.entries(DATA.contact.social)
            .filter(([_, social]) => social.navbar)
            .map(([name, social], index) => {
              const Icon = social.icon;
              return (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center h-10 w-10 rounded-lg border border-border bg-card hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                </motion.div>
              );
            })}
        </div>
      </div>
      </div>
    </aside>
  );
}
