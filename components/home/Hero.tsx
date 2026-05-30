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
      <a
        href={site.instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Follow us on Instagram ${site.instagramHandle}`}
        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full p-2 text-white/80 transition hover:bg-white/10 hover:text-white sm:right-6 lg:right-8"
      >
        <InstagramIcon />
      </a>
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

function InstagramIcon() {
  return (
    <svg
      className="h-5 w-5 sm:h-6 sm:w-6"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}
