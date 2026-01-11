"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

interface ResumeCardProps {
  logoUrl: string;
  altText: string;
  title: string;
  subtitle?: string;
  href?: string;
  badges?: readonly string[];
  period: string;
  description?: string;
}
export const ResumeCard = ({
  logoUrl,
  altText,
  title,
  subtitle,
  href,
  badges,
  period,
  description,
}: ResumeCardProps) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (description) {
      e.preventDefault();
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div>
      <Link
        href={href || "#"}
        className="block cursor-pointer group"
        onClick={handleClick}
      >
        <Card className="flex border border-white/20 bg-white/50 dark:bg-black/20 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden p-4 group/card"
          style={{
            borderColor: 'rgba(255,255,255,0.2)',
            boxShadow: '0 4px 16px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.1)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
          }}
        >
          <div className="absolute inset-0 translate-x-[-100%] group-hover/card:translate-x-[100%] transition-transform duration-1500 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
          <div className="flex-none">
            <Avatar className="border border-border size-12 m-auto bg-muted">
              <AvatarImage
                src={logoUrl}
                alt={altText}
                className="object-contain"
              />
              <AvatarFallback className="bg-primary/10 text-primary">{altText[0]}</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex-grow ml-4 items-center flex-col group">
            <CardHeader className="p-0">
              <div className="flex items-center justify-between gap-x-4 text-base">
                <h3 className="inline-flex items-center justify-center font-semibold leading-none text-xs sm:text-sm text-foreground gap-2">
                  {title}
                  {badges && (
                    <span className="inline-flex gap-x-1">
                      {badges.map((badge, index) => (
                        <Badge
                          variant="secondary"
                          className="align-middle text-xs"
                          key={index}
                        >
                          {badge}
                        </Badge>
                      ))}
                    </span>
                  )}
                  <ChevronRightIcon
                    className={cn(
                      "size-4 translate-x-0 transform opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100",
                      isExpanded ? "rotate-90" : "rotate-0"
                    )}
                  />
                </h3>
                <div className="text-xs sm:text-sm tabular-nums text-muted-foreground text-right relative group/date">
                  {period}
                  <ChevronRightIcon
                    className="absolute -right-5 top-1/2 -translate-y-1/2 size-4 opacity-0 group-hover/date:opacity-100 transition-all duration-300 text-foreground"
                  />
                </div>
              </div>
              {subtitle && <div className="font-sans text-xs mt-1 text-muted-foreground">{subtitle}</div>}
            </CardHeader>
            {description && (
              <div
                className={`mt-3 text-xs sm:text-sm text-muted-foreground ${
                  isExpanded ? "" : "hidden"
                }`}
              >
                {description}
              </div>
            )}
          </div>
        </Card>
      </Link>
    </div>
  );
};
