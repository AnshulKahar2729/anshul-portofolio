"use client";

import { motion } from "framer-motion";

const placeholders = [
  { 
    gradient: "from-purple-500 via-pink-500 to-red-500",
    icon: "💻",
    emoji: "🚀",
    text: "Code is Poetry",
    subtitle: "Writing elegant solutions"
  },
  { 
    gradient: "from-blue-500 via-cyan-500 to-teal-500",
    icon: "🔥",
    emoji: "⚡",
    text: "Shipping Fast",
    subtitle: "Move fast, break things"
  },
  { 
    gradient: "from-green-500 via-emerald-500 to-cyan-500",
    icon: "🎯",
    emoji: "💡",
    text: "Debug Mode: ON",
    subtitle: "console.log everything"
  },
  { 
    gradient: "from-orange-500 via-yellow-500 to-amber-500",
    icon: "🎨",
    emoji: "✨",
    text: "CSS is Magic",
    subtitle: "When it finally works"
  },
  { 
    gradient: "from-indigo-500 via-purple-500 to-pink-500",
    icon: "🧠",
    emoji: "🔮",
    text: "Think Different",
    subtitle: "Innovation over tradition"
  },
  { 
    gradient: "from-pink-500 via-rose-500 to-red-500",
    icon: "🎭",
    emoji: "🎪",
    text: "Tech Enthusiast",
    subtitle: "Always learning, always building"
  },
  { 
    gradient: "from-cyan-500 via-blue-500 to-indigo-500",
    icon: "🌟",
    emoji: "💫",
    text: "Stay Curious",
    subtitle: "Question everything"
  },
  { 
    gradient: "from-lime-500 via-green-500 to-emerald-500",
    icon: "🚀",
    emoji: "🛸",
    text: "Built Different",
    subtitle: "Not your average code"
  },
];

interface ArticlePlaceholderProps {
  title: string;
}

export function ArticlePlaceholder({ title }: ArticlePlaceholderProps) {
  // Use title hash to consistently pick the same placeholder
  const hash = title.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const placeholder = placeholders[hash % placeholders.length];

  return (
    <div className={`relative w-full h-48 bg-gradient-to-br ${placeholder.gradient} overflow-hidden`}>
      {/* Animated background pattern */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "20px 20px"
        }}
        animate={{
          backgroundPosition: ["0px 0px", "20px 20px"]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      {/* Floating icons */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl"
        animate={{
          y: [0, -10, 0],
          rotate: [0, 5, -5, 0]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {placeholder.icon}
      </motion.div>

      <motion.div
        className="absolute top-4 right-4 text-3xl"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 10, -10, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
      >
        {placeholder.emoji}
      </motion.div>

      {/* Text overlay with subtitle */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 via-black/50 to-transparent">
        <p className="text-white font-bold text-xl text-center mb-1">{placeholder.text}</p>
        <p className="text-white/80 text-sm text-center italic">{placeholder.subtitle}</p>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
    </div>
  );
}
