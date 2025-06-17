"use client";

import { motion } from "framer-motion";

export const WaveEmoji = () => {
  return (
    <motion.span
      className="inline-block ml-1"
      animate={{
        rotate: [0, 14, -8, 14, -4, 10, 0],
      }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{ 
        transformOrigin: "70% 70%",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "1.2em",
        height: "1.2em"
      }}
    >
      👋
    </motion.span>
  );
};