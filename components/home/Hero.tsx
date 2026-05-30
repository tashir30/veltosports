"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { BrandLogo } from "@/components/shared/BrandLogo";
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
      <div className="relative mx-auto flex h-full min-h-0 max-w-7xl flex-col items-center justify-center gap-1 px-4 py-4 text-center sm:gap-2 sm:px-6 sm:py-5 lg:px-8">
        <BrandLogo variant="inverse" size="sm" />
        <h1 className="font-display line-clamp-2 text-lg font-bold uppercase leading-tight tracking-tight sm:text-xl md:text-2xl">
          {site.tagline}
        </h1>
        <p className="line-clamp-1 max-w-2xl text-sm text-slate-300 sm:text-base">
          {site.description}
        </p>
      </div>
    </section>
  );
}
