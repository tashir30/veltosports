"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { SiteConfig } from "@/types/product";

interface HeroProps {
  site: SiteConfig;
}

export function Hero({ site }: HeroProps) {
  const images = site.heroImages;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <section className="relative max-h-[200px] overflow-hidden bg-brand-navy text-white sm:max-h-[240px] md:max-h-[260px] lg:max-h-[280px] xl:max-h-[300px]">
      <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy-light/90 to-brand-navy" />
      <div className="absolute inset-0 opacity-15">
        {images.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt=""
            fill
            className={`object-cover transition-opacity duration-1000 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
            priority={i === 0}
          />
        ))}
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-brand-orange" aria-hidden="true" />
      <div className="relative mx-auto flex h-full min-h-0 max-w-7xl flex-col items-center justify-center gap-2 px-4 py-4 text-center sm:gap-3 sm:px-6 sm:py-5 md:flex-row md:items-center md:justify-between md:py-6 md:text-left lg:px-8">
        <div className="min-w-0 flex-1 md:pr-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-orange sm:text-xs">
            Veltosports
          </p>
          <h1 className="font-display line-clamp-2 text-lg font-bold uppercase leading-tight tracking-tight sm:text-xl md:text-2xl lg:text-3xl">
            {site.tagline}
          </h1>
          <p className="mx-auto mt-1 line-clamp-1 max-w-2xl text-sm text-slate-300 sm:text-base md:mx-0">
            {site.description}
          </p>
        </div>
        <div className="flex shrink-0 flex-row items-center gap-2">
          <Link
            href="/catalog/"
            className="rounded-md bg-brand-orange px-4 py-2 text-xs font-bold uppercase tracking-wide text-white shadow-none transition hover:bg-brand-orange-dark sm:px-5 sm:text-sm"
          >
            Shop now
          </Link>
          <a
            href={site.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-md border border-white/30 px-4 py-2 text-xs font-semibold uppercase tracking-wide transition hover:bg-white/10 md:inline-flex sm:text-sm"
          >
            Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
