"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function SubtleBackground() {
  const [particles, setParticles] = useState<Array<{ x: number; y: number; size: number; delay: number }>>([]);
  const [floatingParticles, setFloatingParticles] = useState<Array<{ x: number; y: number; size: number; delay: number; duration: number }>>([]);

  useEffect(() => {
    // Twinkling static particles - INCREASED DENSITY
    const newParticles = Array.from({ length: 100 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 5
    }));
    setParticles(newParticles);

    // Floating space particles - INCREASED DENSITY
    const newFloatingParticles = Array.from({ length: 150 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      delay: Math.random() * 10,
      duration: 20 + Math.random() * 30
    }));
    setFloatingParticles(newFloatingParticles);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" style={{ backgroundColor: "#0f0f0f" }}>
      {/* Twinkling static particles */}
      {particles.map((particle, i) => (
        <motion.div
          key={`static-${i}`}
          className="absolute rounded-full bg-white"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            opacity: [0.05, 0.15, 0.05],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8 + particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay
          }}
        />
      ))}

      {/* Floating space particles drifting across */}
      {floatingParticles.map((particle, i) => (
        <motion.div
          key={`float-${i}`}
          className="absolute rounded-full bg-white/40"
          style={{
            width: particle.size,
            height: particle.size,
          }}
          initial={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            x: [0, 100, 200],
            y: [0, -20, -40],
            opacity: [0, 0.6, 0.4, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "linear",
            delay: particle.delay
          }}
        />
      ))}

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent" />
    </div>
  );
}
