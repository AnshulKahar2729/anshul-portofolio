"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Activity, FileJson, Code2, Radio, ArrowRight, Wrench } from "lucide-react";
import BlurFade from "@/components/magicui/blur-fade";
import { TimeBasedBackground } from "@/components/time-based-background";
import { SubtleBackground } from "@/components/subtle-background";
import { useState } from "react";

const BLUR_FADE_DELAY = 0.04;

const tools = [
  {
    name: "Network Latency Tester",
    description: "Test your connection speed to popular services in real-time with visual feedback",
    icon: Activity,
    href: "/tools/network-latency",
    gradient: "from-blue-500/20 to-purple-500/20",
    iconColor: "text-blue-500",
  },
  {
    name: "JSON Formatter",
    description: "Format, validate, and beautify JSON with syntax highlighting and error detection",
    icon: FileJson,
    href: "/tools/json-formatter",
    gradient: "from-green-500/20 to-emerald-500/20",
    iconColor: "text-green-500",
  },
  {
    name: "Regex Tester",
    description: "Test and visualize regular expressions with live matching and helpful examples",
    icon: Code2,
    href: "/tools/regex-tester",
    gradient: "from-purple-500/20 to-pink-500/20",
    iconColor: "text-purple-500",
  },
  {
    name: "WebSocket Visualizer",
    description: "Connect to WebSocket servers and visualize real-time message flow",
    icon: Radio,
    href: "/tools/websocket-visualizer",
    gradient: "from-orange-500/20 to-red-500/20",
    iconColor: "text-orange-500",
  },
];

export default function ToolsPage() {
  const [showTimeBackground, setShowTimeBackground] = useState(false);

  return (
    <main className="flex flex-col min-h-screen relative overflow-hidden">
      {/* Background - Time-based or Subtle */}
      {showTimeBackground ? <TimeBasedBackground /> : <SubtleBackground />}
      
      {/* Hero Section */}
      <section className="min-h-[40vh] flex items-center justify-center px-6 py-20 relative">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <BlurFade delay={BLUR_FADE_DELAY}>
            <motion.div
              className="inline-block px-4 py-2 rounded-full text-sm font-medium border relative overflow-hidden group cursor-default backdrop-blur-2xl"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.08))",
                borderColor: "rgba(255,255,255,0.3)",
                boxShadow: "0 4px 16px rgba(255,255,255,0.1), inset 0 1px 0 rgba(255,255,255,0.2)",
                color: "hsl(var(--foreground))"
              }}
            >
              <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              <span className="relative z-10 flex items-center gap-2">
                <Wrench className="h-4 w-4" />
                Developer Utilities
              </span>
            </motion.div>
          </BlurFade>

          <BlurFade delay={BLUR_FADE_DELAY * 2}>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground">
              Interactive Tools
            </h1>
          </BlurFade>

          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A collection of useful developer utilities I built to make development easier.
              Try them out and see how they work!
            </p>
          </BlurFade>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="px-6 py-12 max-w-6xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-6">
          {tools.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <BlurFade key={tool.href} delay={BLUR_FADE_DELAY * 4 + index * 0.1}>
                <Link href={tool.href}>
                  <motion.div
                    className="group p-6 rounded-2xl border border-white/10 backdrop-blur-xl relative overflow-hidden cursor-pointer"
                    style={{
                      background: "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))"
                    }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {/* Gradient overlay on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                    
                    {/* Content */}
                    <div className="relative z-10 space-y-4">
                      <div className="flex items-start justify-between">
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${tool.gradient} backdrop-blur-sm`}>
                          <Icon className={`h-6 w-6 ${tool.iconColor}`} />
                        </div>
                        <motion.div
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                          initial={{ x: -10 }}
                          whileHover={{ x: 0 }}
                        >
                          <ArrowRight className="h-5 w-5 text-muted-foreground" />
                        </motion.div>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-foreground mb-2">
                          {tool.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {tool.description}
                        </p>
                      </div>

                      <div className="pt-2">
                        <span className="text-sm text-primary font-medium group-hover:underline">
                          Launch Tool →
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </BlurFade>
            );
          })}
        </div>
      </section>

      {/* Back to Home */}
      <section className="px-6 py-12 text-center">
        <Link href="/">
          <motion.button
            className="px-6 py-3 rounded-xl font-medium backdrop-blur-xl border transition-all"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
              borderColor: "rgba(255,255,255,0.2)",
              color: "hsl(var(--foreground))"
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ← Back to Home
          </motion.button>
        </Link>
      </section>
    </main>
  );
}
