"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { WordpressPost } from "@/types/wordpress";
import { getFeaturedImage, getPostCategories } from "@/lib/api/wordpress";
import { Badge } from "@/components/ui/badge";

interface HeroCarouselProps {
  posts: WordpressPost[];
  intervalMs?: number;
}

export default function HeroCarousel({ posts = [], intervalMs = 5000 }: HeroCarouselProps) {
  const slides = useMemo(() => posts.slice(0, 8), [posts]);
  const [index, setIndex] = useState(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (slides.length <= 1) return;
    timerRef.current = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, intervalMs);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [slides.length, intervalMs]);

  if (slides.length === 0) return null;

  const current = slides[index];
  const featured = getFeaturedImage(current);
  const categories = getPostCategories(current);

  return (
    <section aria-label="Artigos recentes" className="relative">
      <div className="group relative rounded-lg border overflow-hidden bg-card">
        <Link href={`/blog/${current.slug}`} prefetch={true}>
          <div className="relative">
            {featured ? (
              <img
                src={featured.url}
                alt={featured.alt || current.title.rendered}
                className="w-full h-56 md:h-72 lg:h-80 object-cover"
              />
            ) : (
              <div className="w-full h-56 md:h-72 lg:h-80 bg-muted" />
            )}
            <div className="absolute top-3 left-3">
              <Badge className="bg-accent text-accent-foreground">
                {categories[0]?.name || "Sem categoria"}
              </Badge>
            </div>
          </div>
          <div className="p-3 md:p-4">
            <h2 className="text-base md:text-lg font-semibold line-clamp-2">
              <span dangerouslySetInnerHTML={{ __html: current.title.rendered }} />
            </h2>
          </div>
        </Link>
      </div>

      <div className="mt-3 flex items-center gap-2" aria-hidden="true">
        {slides.map((_, i) => (
          <span
            key={i}
            className={`h-2 w-2 rounded-full transition-colors ${
              i === index ? "bg-primary" : "bg-muted"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
