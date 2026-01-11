"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Ripple {
  x: number;
  y: number;
  id: number;
}

export function WaterRipple() {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const newRipple = {
        x: e.clientX,
        y: e.clientY,
        id: Date.now()
      };
      
      setRipples(prev => [...prev, newRipple]);
      
      // Remove ripple after animation
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== newRipple.id));
      }, 1000);
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          className="absolute w-4 h-4 rounded-full border-2 border-primary/50"
          style={{
            left: ripple.x - 8,
            top: ripple.y - 8,
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{
            scale: [0, 20, 40],
            opacity: [1, 0.5, 0],
          }}
          transition={{
            duration: 1,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  );
}
