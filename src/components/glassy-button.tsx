"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode, useState } from "react";

interface GlassyButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  className?: string;
}

export function GlassyButton({ children, href, onClick, variant = "primary", className = "" }: GlassyButtonProps) {
  const Component = href ? motion.a : motion.button;
  const [clickEffect, setClickEffect] = useState(false);
  
  const baseStyles = "inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-medium shadow-lg backdrop-blur-2xl relative overflow-hidden group border";
  
  const handleClick = (e: any) => {
    setClickEffect(true);
    setTimeout(() => setClickEffect(false), 600);
    if (onClick) onClick();
  };
  
  return (
    <Component
      href={href as any}
      onClick={handleClick}
      target={href ? "_blank" : undefined}
      rel={href ? "noopener noreferrer" : undefined}
      className={`${baseStyles} ${className}`}
      style={{
        background: variant === "primary"
          ? "linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.08))"
          : "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.02))",
        borderColor: "rgba(255,255,255,0.3)",
        boxShadow: "0 8px 32px 0 rgba(255,255,255,0.1), inset 0 1px 0 rgba(255,255,255,0.3)",
        color: "hsl(var(--foreground))"
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      {/* Periodic shine animation */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
        animate={{
          x: ["-100%", "200%"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatDelay: 2,
          ease: "easeInOut"
        }}
      />

      {/* Hover shine animation */}
      <div 
        className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent"
      />

      {/* Click effect - Ripple */}
      <AnimatePresence>
        {clickEffect && (
          <motion.div
            className="absolute inset-0 rounded-2xl"
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 2, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              background: "radial-gradient(circle, rgba(255,255,255,0.6) 0%, transparent 70%)",
            }}
          />
        )}
      </AnimatePresence>
      
      {/* Content */}
      <div className="relative z-10 flex items-center gap-2">
        {children}
      </div>
    </Component>
  );
}
