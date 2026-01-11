"use client";

import React, { useEffect, useState } from "react";
import { ExternalLink, Calendar, Clock } from "lucide-react";
import BlurFade from "@/components/magicui/blur-fade";
import { Badge } from "@/components/ui/badge";
import { ArticlePlaceholder } from "@/components/article-placeholder";
import Image from "next/image";

interface MediumArticle {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  thumbnail?: string;
  categories: string[];
  author: string;
  guid: string;
}

const BLUR_FADE_DELAY = 0.04;

export function MediumArticles() {
  const [articles, setArticles] = useState<MediumArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMediumArticles();
  }, []);

  const fetchMediumArticles = async () => {
    try {
      setLoading(true);
      // Using RSS2JSON service to fetch Medium RSS feed
      const response = await fetch(
        `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@anshulkahar2211`
      );
      
      if (!response.ok) {
        throw new Error("Failed to fetch articles");
      }

      const data = await response.json();
      
      if (data.status === "ok") {
        const formattedArticles: MediumArticle[] = data.items.map((item: any) => {
          const thumbnail = item.thumbnail || extractImageFromContent(item.content);
          return {
            title: item.title,
            link: item.link,
            pubDate: item.pubDate,
            description: item.description?.replace(/<[^>]*>/g, "").substring(0, 200) + "..." || "",
            thumbnail: thumbnail && thumbnail.trim() !== "" ? thumbnail : undefined,
            categories: item.categories || [],
            author: item.author,
            guid: item.guid,
          };
        });
        setArticles(formattedArticles);
      } else {
        throw new Error("Invalid response from RSS feed");
      }
    } catch (err) {
      console.error("Error fetching Medium articles:", err);
      setError("Unable to load articles at the moment");
    } finally {
      setLoading(false);
    }
  };

  const extractImageFromContent = (content: string): string | undefined => {
    const imgRegex = /<img[^>]+src="([^">]+)"/;
    const match = content?.match(imgRegex);
    return match ? match[1] : undefined;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const calculateReadTime = (description: string) => {
    const wordsPerMinute = 200;
    const wordCount = description.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <BlurFade delay={BLUR_FADE_DELAY}>
          <div className="text-center space-y-4">
            <div className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
              Latest Articles
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">
              From My Blog
            </h2>
            <p className="text-muted-foreground text-lg">
              Loading articles from Medium...
            </p>
          </div>
        </BlurFade>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-96 rounded-lg border bg-card animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <BlurFade delay={BLUR_FADE_DELAY}>
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Unable to Load Articles</h2>
          <p className="text-muted-foreground">{error}</p>
          <a
            href="https://medium.com/@anshulkahar2211"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
          >
            Visit Medium Profile
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </BlurFade>
    );
  }

  if (articles.length === 0) {
    return null;
  }

  return (
    <div className="space-y-12">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <div className="text-center space-y-4">
          <div className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
            Latest Articles
          </div>
          <h2 className="text-3xl md:text-4xl font-bold">
            From My Blog
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Insights, tutorials, and thoughts on software development,
            web technologies, and everything in between.
          </p>
        </div>
      </BlurFade>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.slice(0, 6).map((article, idx) => (
            <BlurFade key={article.guid} delay={BLUR_FADE_DELAY * 2 + idx * 0.1}>
              <a
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block h-full"
              >
                <div className="flex h-full flex-col overflow-hidden rounded-lg border border-white/20 bg-white/50 dark:bg-black/20 backdrop-blur-xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/50 hover:-translate-y-1">
                  {article.thumbnail && article.thumbnail.trim() !== "" ? (
                    <div className="relative h-48 w-full overflow-hidden bg-muted">
                      <img
                        src={article.thumbnail}
                        alt={article.title}
                        onError={(e) => {
                          // If image fails to load, replace with placeholder
                          const parent = e.currentTarget.parentElement;
                          if (parent) {
                            parent.innerHTML = '';
                            const placeholder = document.createElement('div');
                            placeholder.className = 'w-full h-48';
                            parent.appendChild(placeholder);
                          }
                        }}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    </div>
                  ) : (
                    <ArticlePlaceholder title={article.title} />
                  )}
                  <div className="flex flex-1 flex-col p-6 space-y-4">
                    <div className="space-y-2">
                      <h3 className="line-clamp-2 text-xl font-bold text-foreground transition-colors duration-300 group-hover:text-primary">
                        {article.title}
                      </h3>
                      <p className="line-clamp-3 text-sm text-muted-foreground">
                        {article.description}
                      </p>
                    </div>

                    {article.categories.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {article.categories.slice(0, 3).map((category, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-xs transition-all duration-300 group-hover:bg-primary/10"
                          >
                            {category}
                          </Badge>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 mt-auto border-t">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{formatDate(article.pubDate)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{calculateReadTime(article.description)}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm font-medium text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      Read article
                      <ExternalLink className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </a>
          </BlurFade>
        ))}
      </div>

      <BlurFade delay={BLUR_FADE_DELAY * 3}>
        <div className="text-center mt-12">
          <a
            href="https://medium.com/@anshulkahar2211"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all hover:scale-105 hover:shadow-lg"
          >
            View All Articles on Medium
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </BlurFade>
    </div>
  );
}
