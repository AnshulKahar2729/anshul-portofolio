"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function SubtleBackground() {
  const [particles, setParticles] = useState<Array<{ x: number; y: number; size: number; delay: number }>>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 30 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 5
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-black">
      {/* Subtle white particles */}
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            opacity: [0.05, 0.15, 0.05],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8 + particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay
          }}
        />
      ))}

      {/* Realistic Shooting Stars with Gravity */}
      {[0, 1, 2, 3, 4].map((i) => {
        const startX = 10 + Math.random() * 80;
        const startY = 5 + Math.random() * 30;
        return (
          <motion.div
            key={`star-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              boxShadow: "0 0 8px 2px rgba(255,255,255,0.9)",
              left: `${startX}%`,
              top: `${startY}%`,
            }}
            initial={{ x: 0, y: 0, opacity: 0 }}
            animate={{
              x: [0, 200 + Math.random() * 200],
              y: [0, 150 + Math.random() * 150, 180 + Math.random() * 200],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 1.5 + Math.random() * 0.5,
              repeat: Infinity,
              repeatDelay: 6 + i * 2.5,
              ease: [0.25, 0.1, 0.25, 1], // Custom easing for gravity effect
              delay: i * 2
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent w-32 h-[2px] blur-[1px]" 
                 style={{ transform: "rotate(-25deg)" }} />
          </motion.div>
        );
      })}

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent" />
    </div>
  );
}
