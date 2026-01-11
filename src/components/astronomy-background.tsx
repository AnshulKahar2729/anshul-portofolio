"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function AstronomyBackground() {
  const [stars, setStars] = useState<Array<{ x: number; y: number; size: number; delay: number }>>([]);

  useEffect(() => {
    // Generate random stars
    const newStars = Array.from({ length: 100 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 5
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Space gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-950 via-purple-900 to-black dark:from-black dark:via-indigo-950 dark:to-black" />
      
      {/* Stars */}
      {stars.map((star, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3 + star.delay,
            repeat: Infinity,
            ease: "easeInOut",
            delay: star.delay
          }}
        />
      ))}

      {/* Planets/Celestial bodies */}
      <motion.div
        className="absolute top-20 right-20 w-32 h-32 rounded-full bg-gradient-to-br from-blue-400/30 to-purple-600/30 blur-2xl"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <motion.div
        className="absolute bottom-40 left-20 w-24 h-24 rounded-full bg-gradient-to-br from-orange-400/20 to-red-600/20 blur-xl"
        animate={{
          scale: [1, 1.3, 1],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <motion.div
        className="absolute top-1/2 left-1/3 w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400/25 to-blue-600/25 blur-lg"
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Shooting stars */}
      <motion.div
        className="absolute top-20 left-0 w-1 h-1 bg-white rounded-full shadow-[0_0_10px_2px_rgba(255,255,255,0.8)]"
        initial={{ x: 0, y: 0, opacity: 0 }}
        animate={{
          x: [0, 300],
          y: [0, 300],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 8,
          ease: "easeOut"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent w-20 h-[2px] blur-sm" />
      </motion.div>

      <motion.div
        className="absolute top-40 right-0 w-1 h-1 bg-white rounded-full shadow-[0_0_10px_2px_rgba(255,255,255,0.8)]"
        initial={{ x: 0, y: 0, opacity: 0 }}
        animate={{
          x: [-300, 0],
          y: [0, 300],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          repeatDelay: 12,
          ease: "easeOut"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-l from-white to-transparent w-20 h-[2px] blur-sm" />
      </motion.div>

      {/* Nebula effect */}
      <div className="absolute inset-0 bg-gradient-radial from-purple-500/10 via-transparent to-transparent blur-3xl" />
      
      {/* Aurora borealis effect */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-green-400/5 via-blue-400/5 to-transparent"
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
}
