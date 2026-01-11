"use client";

import { WebSocketVisualizer } from "@/components/tools/websocket-visualizer";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { TimeBasedBackground } from "@/components/time-based-background";
import { SubtleBackground } from "@/components/subtle-background";
import { useState } from "react";

export default function WebSocketVisualizerPage() {
  const [showTimeBackground, setShowTimeBackground] = useState(false);

  return (
    <main className="flex flex-col min-h-screen relative overflow-hidden">
      {/* Background - Time-based or Subtle */}
      {showTimeBackground ? <TimeBasedBackground /> : <SubtleBackground />}
      
      <div className="px-6 py-12 max-w-6xl mx-auto relative z-10">
      <div className="mb-8">
        <Link href="/tools">
          <motion.button
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium backdrop-blur-xl border transition-all text-sm"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
              borderColor: "rgba(255,255,255,0.2)",
              color: "hsl(var(--foreground))"
            }}
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Tools
          </motion.button>
        </Link>
      </div>

      <div className="p-8 rounded-2xl border border-white/10 backdrop-blur-xl"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))"
        }}
      >
        <WebSocketVisualizer />
      </div>
      </div>
    </main>
  );
}
