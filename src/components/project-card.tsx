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
      <Card className="flex flex-col overflow-hidden border-2 hover:border-primary/50 hover:shadow-2xl transition-all duration-500 ease-out h-full bg-gradient-to-br from-background to-background/80 backdrop-blur-sm">
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
                <CardTitle className="text-xl md:text-2xl font-bold tracking-tight group-hover:text-primary transition-colors duration-300 line-clamp-2">
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
            
            {/* Technologies */}
            {tags && tags.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-semibold mb-3 text-foreground/80">Technologies Used:</h4>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="px-3 py-1.5 text-xs font-medium hover:bg-primary hover:text-primary-foreground transition-colors duration-200 cursor-default"
                    >
                      {tag}
                    </Badge>
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
                      className="group/link"
                    >
                      <Badge 
                        className={cn(
                          "flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all duration-300 cursor-pointer",
                           "bg-primary hover:bg-primary/90 text-primary-foreground hover:scale-105 hover:shadow-lg hover:text-primary-foreground",
                         
                        )}
                      >
                        {isWebsite ? (
                          <ExternalLink className="size-4 transition-transform group-hover/link:translate-x-0.5" />
                        ) : isGithub ? (
                          <Github className="size-4 transition-transform group-hover/link:rotate-12" />
                        ) : (
                          link.icon
                        )}
                        {link.type}
                      </Badge>
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
