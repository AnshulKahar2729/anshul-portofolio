"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import Markdown from "react-markdown";
import { ExternalLink, Github } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  title: string;
  href?: string;
  description: string;
  dates: string;
  tags: readonly string[];
  link?: string;
  image?: string;
  video?: string;
  links?: readonly {
    icon: React.ReactNode;
    type: string;
    href: string;
  }[];
  className?: string;
}

export function ProjectCard({
  title,
  href,
  description,
  dates,
  tags,
  link,
  image,
  video,
  links,
  className,
}: Props) {
  return (
    <div className="group transform transition-all duration-500 hover:-translate-y-2 hover:scale-[1.01] w-full">
      <Card className="flex flex-col overflow-hidden border-2 border-white/20 hover:border-primary/50 hover:shadow-2xl transition-all duration-500 ease-out h-full bg-white/50 dark:bg-black/20 backdrop-blur-xl">
        {/* Image/Video Section - Full Width */}
        <div className="relative overflow-hidden w-full">
          <Link
            href={href || "#"}
            className={cn("block cursor-pointer", className)}
          >
            {video && (
              <video
                src={video}
                autoPlay
                loop
                muted
                playsInline
                className="pointer-events-none w-full h-48 sm:h-56 md:h-64 object-cover transition-transform duration-500 group-hover:scale-105"
              />
            )}
            {image && (
              <Image
                src={image}
                alt={title}
                width={800}
                height={400}
                className="w-full h-48 sm:h-56 md:h-64 object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
            )}
            {/* Overlay for better readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
        </div>

        {/* Content Section */}
        <div className="flex flex-col flex-1 p-6">
          <CardHeader className="p-0 pb-4">
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                <CardTitle className="text-xl md:text-2xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
                  {title}
                </CardTitle>
                {dates && (
                  <time className="text-sm font-medium text-muted-foreground bg-secondary/50 px-3 py-1 rounded-full whitespace-nowrap self-start">
                    {dates}
                  </time>
                )}
              </div>
              <div className="hidden font-sans text-sm text-muted-foreground print:visible">
                {link?.replace("https://", "").replace("www.", "").replace("/", "")}
              </div>
            </div>
          </CardHeader>

          <CardContent className="flex-1 p-0 pb-4">
            <Markdown className="prose prose-sm max-w-full text-pretty font-sans text-muted-foreground dark:prose-invert leading-relaxed mb-4">
              {description}
            </Markdown>
            
            {/* Technologies with animated icons */}
            {tags && tags.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-semibold mb-3 text-foreground flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  Tech Stack:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <motion.div
                      key={tag}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <Badge
                        variant="secondary"
                        className="px-3 py-1.5 text-xs font-medium hover:bg-primary hover:text-primary-foreground transition-colors duration-200 cursor-default"
                      >
                        {tag}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>

          {/* Links/Actions */}
          <CardFooter className="p-0 mt-auto">
            {links && links.length > 0 && (
              <div className="flex flex-wrap gap-3 w-full">
                {links.map((link, idx) => {
                  const isGithub = link.type.toLowerCase().includes('source') || link.type.toLowerCase().includes('github');
                  const isWebsite = link.type.toLowerCase().includes('website') || link.type.toLowerCase().includes('demo');
                  
                  return (
                    <Link 
                      href={link.href} 
                      key={idx} 
                      target="_blank"
                      className="group/link relative overflow-hidden inline-block"
                    >
                      <div
                        className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium backdrop-blur-2xl border rounded-lg relative overflow-hidden group cursor-pointer transition-all duration-300 hover:scale-105"
                        style={{
                          background: "linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.08))",
                          borderColor: "rgba(255,255,255,0.3)",
                          boxShadow: "0 4px 16px rgba(255,255,255,0.1), inset 0 1px 0 rgba(255,255,255,0.2)",
                          color: "hsl(var(--foreground))"
                        }}
                      >
                        {/* Shine animation */}
                        <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                        {isWebsite ? (
                          <ExternalLink className="size-4 transition-transform group-hover/link:translate-x-0.5 relative z-10" />
                        ) : isGithub ? (
                          <Github className="size-4 transition-transform group-hover/link:rotate-12 relative z-10" />
                        ) : (
                          <span className="relative z-10">{link.icon}</span>
                        )}
                        <span className="relative z-10">{link.type}</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </CardFooter>
        </div>
      </Card>
    </div>
  );
}
