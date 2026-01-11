"use client";

import { useEffect, useState } from "react";
import { X, Lightbulb, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const TECH_IDEAS = [
  "💡 Build an AI that predicts your bugs before you write them",
  "🚀 Create a IDE extension that roasts your code in real-time",
  "🤖 Make a chatbot that only speaks in memes",
  "⚡ Build a tool that converts coffee into code (literally)",
  "🎮 Create a game where you debug code to defeat enemies",
  "🔥 Make an app that turns your commits into a rap song",
  "🎨 Build a CSS generator powered by your Spotify playlists",
  "🍕 Create an API that rates your code based on pizza toppings",
  "🎭 Make a plugin that translates code to Shakespeare",
  "🌈 Build a tool that assigns colors to your functions based on complexity",
  "🎪 Create a browser extension that makes every website look like it's from 1999",
  "🦄 Build an AI that generates startup ideas using only emojis",
  "🎲 Make a random bug generator for testing your debugging skills",
  "🎸 Create a synthesizer that plays music based on your code metrics",
  "🌮 Build a Taco Bell ordering system using only regex",
  "🎯 Make a game where you hunt down memory leaks like Pokémon",
  "🍩 Create a donut chart generator that only uses actual donuts",
  "🎬 Build a tool that generates movie trailers for your projects",
  "🧙 Make a wizard that auto-comments your code with dad jokes",
  "🎨 Create a paint app where every stroke runs a test suite",
];

export function TechIdeaPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [idea, setIdea] = useState("");
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Check if we've shown the popup in this session
    const shown = sessionStorage.getItem("tech-idea-shown");
    
    if (!shown) {
      // Show popup after 2 seconds
      const timer = setTimeout(() => {
        const randomIdea = TECH_IDEAS[Math.floor(Math.random() * TECH_IDEAS.length)];
        setIdea(randomIdea);
        setIsVisible(true);
        sessionStorage.setItem("tech-idea-shown", "true");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleNewIdea = () => {
    const randomIdea = TECH_IDEAS[Math.floor(Math.random() * TECH_IDEAS.length)];
    setIdea(randomIdea);
  };

  return (
    <AnimatePresence>
      {isVisible && (
          <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-6 right-6 z-[60] max-w-sm"
        >
          <div className="relative overflow-hidden rounded-lg border-2 border-primary/50 bg-white/70 dark:bg-black/30 backdrop-blur-xl shadow-2xl">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-500/10 to-pink-500/10 animate-gradient" />
            
            <div className="relative p-6 space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: [0, 20, -20, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Lightbulb className="h-6 w-6 text-yellow-500 fill-yellow-500" />
                  </motion.div>
                  <div>
                    <h3 className="font-bold text-lg text-foreground">Daily Tech Idea</h3>
                    <p className="text-xs text-muted-foreground">Totally feasible™</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleClose}
                  className="h-6 w-6 rounded-full hover:bg-destructive/20"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Content */}
              <motion.div
                key={idea}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="p-4 rounded-lg bg-background/50 border border-primary/20"
              >
                <p className="text-foreground font-medium text-center">{idea}</p>
              </motion.div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button
                  onClick={handleNewIdea}
                  variant="outline"
                  size="sm"
                  className="flex-1 gap-2 border-primary/30 hover:bg-primary/10"
                >
                  <Sparkles className="h-4 w-4" />
                  Another one!
                </Button>
                <Button
                  onClick={handleClose}
                  size="sm"
                  className="flex-1"
                >
                  Got it!
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
