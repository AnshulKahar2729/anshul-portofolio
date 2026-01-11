"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type TimeOfDay = "morning" | "noon" | "evening" | "night";

export function TimeBasedBackground() {
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>("night");

  useEffect(() => {
    const updateTimeOfDay = () => {
      const hour = new Date().getHours();
      
      if (hour >= 6 && hour < 12) setTimeOfDay("morning");
      else if (hour >= 12 && hour < 17) setTimeOfDay("noon");
      else if (hour >= 17 && hour < 21) setTimeOfDay("evening");
      else setTimeOfDay("night");
    };

    updateTimeOfDay();
    const interval = setInterval(updateTimeOfDay, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-black">
      {/* MORNING - Rising sun and birds (6am-12pm) */}
      {timeOfDay === "morning" && (
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-[#FFB5BA] via-[#FFD6A5] to-[#87CEEB]" />
          {/* Rising Sun */}
          <motion.div
            className="absolute bottom-32 right-20 w-32 h-32 rounded-full"
            style={{
              background: "radial-gradient(circle, #FDB813 0%, #FF6B35 100%)",
              boxShadow: "0 0 80px 40px rgba(253, 184, 19, 0.6)"
            }}
            animate={{
              y: [-20, 0, -20],
              scale: [1, 1.05, 1]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          {/* Sunrise glow */}
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#FF6B35]/30 via-[#FFD6A5]/20 to-transparent" />
          {/* Light rays */}
          <div className="absolute bottom-32 right-20 w-64 h-64 opacity-20">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute top-1/2 left-1/2 w-1 h-32 bg-gradient-to-t from-yellow-300 to-transparent origin-bottom"
                style={{
                  transform: `rotate(${i * 45}deg) translateX(-50%)`
                }}
                animate={{
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: i * 0.3
                }}
              />
            ))}
          </div>
        </>
      )}

      {/* NOON - Bright sun with floating clouds (12pm-5pm) */}
      {timeOfDay === "noon" && (
        <>
          {/* Bright sky glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-400/5 via-cyan-300/5 to-transparent" />
          
          {/* Bright sun at top */}
          <motion.div
            className="absolute top-16 right-24 w-32 h-32 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(255, 235, 59, 0.3) 0%, rgba(255, 193, 7, 0.2) 100%)",
              boxShadow: "0 0 80px 40px rgba(255, 235, 59, 0.4)"
            }}
            animate={{
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Floating clouds */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute opacity-10"
              style={{
                top: `${15 + i * 20}%`,
                left: `${-10 + i * 10}%`
              }}
              animate={{
                x: [0, window.innerWidth + 100, 0]
              }}
              transition={{
                duration: 40 + i * 10,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <div className="relative w-32 h-16">
                <div className="absolute w-20 h-10 bg-white rounded-full blur-md" />
                <div className="absolute left-6 w-24 h-12 bg-white rounded-full blur-md" />
                <div className="absolute right-4 w-16 h-8 bg-white rounded-full blur-md" />
              </div>
            </motion.div>
          ))}
        </>
      )}

      {/* EVENING - Sunset glow (5pm-9pm) */}
      {timeOfDay === "evening" && (
        <>
          {/* Sunset glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 via-pink-400/5 to-purple-600/5" />
          
          {/* Setting sun */}
          <motion.div
            className="absolute bottom-20 left-24 w-28 h-28 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(255, 99, 71, 0.4) 0%, rgba(255, 69, 0, 0.3) 70%, rgba(139, 0, 0, 0.2) 100%)",
              boxShadow: "0 0 70px 35px rgba(255, 69, 0, 0.4)"
            }}
            animate={{
              y: [0, 15, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Flying birds silhouettes */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-3xl opacity-30"
              style={{
                top: `${30 + i * 10}%`,
                left: "-10%"
              }}
              animate={{
                x: [0, window.innerWidth + 100]
              }}
              transition={{
                duration: 20 + i * 5,
                repeat: Infinity,
                ease: "linear",
                delay: i * 3
              }}
            >
              🦅
            </motion.div>
          ))}
        </>
      )}

      {/* NIGHT - Moon and shooting stars (9pm-6am) */}
      {timeOfDay === "night" && (
        <>
          {/* Moon */}
          <motion.div
            className="absolute top-20 right-28 w-24 h-24 rounded-full"
            style={{
              background: "radial-gradient(circle at 30% 30%, rgba(255, 250, 205, 0.3) 0%, rgba(240, 230, 140, 0.2) 50%, rgba(218, 165, 32, 0.1) 100%)",
              boxShadow: "0 0 60px 25px rgba(255, 250, 205, 0.3), inset -8px -8px 20px rgba(0,0,0,0.2)"
            }}
            animate={{
              boxShadow: [
                "0 0 60px 25px rgba(255, 250, 205, 0.3), inset -8px -8px 20px rgba(0,0,0,0.2)",
                "0 0 80px 30px rgba(255, 250, 205, 0.4), inset -8px -8px 20px rgba(0,0,0,0.2)",
                "0 0 60px 25px rgba(255, 250, 205, 0.3), inset -8px -8px 20px rgba(0,0,0,0.2)"
              ]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {/* Moon craters */}
            <div className="absolute top-4 left-6 w-4 h-4 rounded-full bg-white/10 blur-[2px]" />
            <div className="absolute top-10 right-6 w-3 h-3 rounded-full bg-white/10 blur-[1px]" />
            <div className="absolute bottom-6 left-8 w-3 h-3 rounded-full bg-white/10 blur-[2px]" />
          </motion.div>

          {/* Multiple Shooting stars */}
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={`shooting-${i}`}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                boxShadow: "0 0 8px 2px rgba(255,255,255,0.8)",
                left: `${20 + i * 20}%`,
                top: `${5 + i * 10}%`,
              }}
              initial={{ x: 0, y: 0, opacity: 0 }}
              animate={{
                x: [0, 250],
                y: [0, 250],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 4 + i * 2,
                ease: "easeOut",
                delay: i * 2
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent w-20 h-[2px] blur-sm" />
            </motion.div>
          ))}

          {/* Twinkling stars */}
          {[...Array(80)].map((_, i) => (
            <motion.div
              key={`twinkle-${i}`}
              className="absolute rounded-full bg-white"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 60}%`,
                width: Math.random() * 2 + 0.5,
                height: Math.random() * 2 + 0.5,
              }}
              animate={{
                opacity: [0.1, 0.6, 0.1],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 5
              }}
            />
          ))}
        </>
      )}
    </div>
  );
}
