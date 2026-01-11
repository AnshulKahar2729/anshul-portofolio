"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

interface KeyboardKeyProps {
  skill: string;
  index: number;
}

// Tech stack logos mapping
const TECH_LOGOS: Record<string, string> = {
  "React": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "React Native": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "Next.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  "Typescript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  "TypeScript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  "JavaScript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  "Node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  "Python": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  "GoLang": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg",
  "Postgres": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  "PostgreSQL": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  "MongoDB": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  "Docker": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  "Kubernetes": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
  "GraphQL": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",
  "Prisma": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg",
  "Drizzle": "https://cdn.simpleicons.org/drizzle/C5F74F",
  "AWS": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
  "Git": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  "Tailwind": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
  "Redux": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",
};

export function KeyboardKey({ skill, index }: KeyboardKeyProps) {
  const [isPressed, setIsPressed] = useState(false);
  const logo = TECH_LOGOS[skill] || TECH_LOGOS[skill.split("/")[0]];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.03,
        duration: 0.3
      }}
      whileHover={{
        y: -8,
        scale: 1.05,
        transition: { duration: 0.2 }
      }}
      whileTap={{
        scale: 0.95,
        transition: { duration: 0.1 }
      }}
      onHoverStart={() => setIsPressed(false)}
      onHoverEnd={() => setIsPressed(false)}
      style={{
        perspective: "2000px",
        transformStyle: "preserve-3d"
      }}
      className="relative group cursor-pointer overflow-hidden"
    >
      {/* Periodic shine animation */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent z-50 pointer-events-none"
        animate={{
          x: ["-100%", "200%"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatDelay: 2 + index * 0.1,
          ease: "easeInOut"
        }}
      />
      {/* Key Base - True 3D Keyboard style */}
      <motion.div
        className="relative"
        style={{
          transformStyle: "preserve-3d"
        }}
      >
        {/* Key Top Face */}
        <motion.div
          className="relative z-10 w-28 h-28 flex flex-col items-center justify-center rounded-xl bg-gradient-to-br from-white/30 to-white/10 dark:from-white/15 dark:to-white/5 backdrop-blur-2xl border border-white/30 dark:border-white/15 shadow-2xl"
          style={{
            transformStyle: "preserve-3d",
            transform: "translateZ(8px)",
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.15), inset 0 2px 0 rgba(255, 255, 255, 0.2), inset 0 -2px 0 rgba(0, 0, 0, 0.1)"
          }}
        >
          {/* Shine effect */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Logo */}
          {logo && (
            <div className="relative z-10 mb-2 w-10 h-10 flex items-center justify-center">
              <Image
                src={logo}
                alt={skill}
                width={40}
                height={40}
                className="w-full h-full object-contain filter drop-shadow-lg"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          )}
          
          {/* Text */}
          <div className="relative z-10 text-center px-2">
            <p className="text-xs font-bold text-foreground group-hover:text-primary transition-colors duration-200">
              {skill}
            </p>
          </div>
          
          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 rounded-xl bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ transform: "translateZ(-10px)" }}
          />
        </motion.div>

        {/* Key Side Faces - Front */}
        <div
          className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-b from-white/10 to-transparent rounded-b-xl"
          style={{
            transform: "rotateX(90deg) translateZ(6px)",
            transformOrigin: "bottom"
          }}
        />
        
        {/* Key Side Faces - Back */}
        <div
          className="absolute inset-x-0 top-0 h-2 bg-gradient-to-b from-transparent to-white/5 rounded-t-xl"
          style={{
            transform: "rotateX(-90deg) translateZ(6px)",
            transformOrigin: "top"
          }}
        />

        {/* Key Shadow/Base */}
        <motion.div
          className="absolute inset-0 rounded-xl bg-gradient-to-b from-black/20 to-black/40 dark:from-black/30 dark:to-black/60"
          style={{
            transform: "translateZ(-8px) translateY(6px)",
            transformStyle: "preserve-3d",
            filter: "blur(4px)"
          }}
          animate={{
            transform: isPressed 
              ? "translateZ(-8px) translateY(2px)"
              : "translateZ(-8px) translateY(6px)",
            opacity: isPressed ? 0.5 : 1
          }}
        />
      </motion.div>

      {/* Ripple effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-xl border-2 border-primary/50"
        initial={{ scale: 1, opacity: 0 }}
        whileHover={{
          scale: [1, 1.2, 1.4],
          opacity: [0.5, 0.25, 0],
          transition: { duration: 0.6, ease: "easeOut" }
        }}
      />
    </motion.div>
  );
}
