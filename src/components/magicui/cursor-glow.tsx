"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface CursorGlowProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  glowSize?: number;
  glowIntensity?: number;
}

export const CursorGlow = ({
  children,
  className = "",
  glowColor = "rgba(255, 255, 255, 0.15)",
  glowSize = 100,
  glowIntensity = 0.5,
}: CursorGlowProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const glow = glowRef.current;

    if (!container || !glow) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      glow.style.left = `${x}px`;
      glow.style.top = `${y}px`;
    };

    container.addEventListener("mousemove", handleMouseMove);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
    >
      <motion.div
        ref={glowRef}
        className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: glowSize,
          height: glowSize,
          background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
          filter: `blur(${glowSize * 0.2}px)`,
          opacity: glowIntensity,
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {children}
    </div>
  );
};

