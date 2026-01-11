"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function CursorSpotlight() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-30">
      {isVisible && (
        <>
          {/* Subtle main glow */}
          <motion.div
            className="absolute w-[500px] h-[500px] rounded-full"
            style={{
              left: mousePosition.x - 250,
              top: mousePosition.y - 250,
              background: "radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)",
              filter: "blur(60px)",
            }}
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Subtle color accent */}
          <motion.div
            className="absolute w-[300px] h-[300px] rounded-full"
            style={{
              left: mousePosition.x - 150,
              top: mousePosition.y - 150,
              background: "radial-gradient(circle, rgba(147, 197, 253, 0.06) 0%, rgba(167, 139, 250, 0.04) 30%, transparent 70%)",
              filter: "blur(40px)",
            }}
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.5, 0.7, 0.5],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Small center highlight */}
          <motion.div
            className="absolute w-[150px] h-[150px] rounded-full"
            style={{
              left: mousePosition.x - 75,
              top: mousePosition.y - 75,
              background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 60%)",
              filter: "blur(25px)",
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </>
      )}
    </div>
  );
}
