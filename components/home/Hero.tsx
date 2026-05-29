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
    <section className="relative max-h-[min(70vh,520px)] overflow-hidden bg-gradient-to-br from-sky-900 via-sky-800 to-cyan-700 text-white sm:max-h-none">
      <div className="absolute inset-0 opacity-30">
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
      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-10 text-center sm:gap-8 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <Image
          src={site.logo}
          alt={`${site.businessName} logo`}
          width={64}
          height={64}
          className="h-12 w-12 rounded-2xl bg-white/10 p-1.5 backdrop-blur sm:h-16 sm:w-16 sm:p-2"
        />
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-sky-200 sm:text-sm">
            {site.businessName}
          </p>
          <h1 className="mt-2 text-2xl font-extrabold tracking-tight sm:mt-3 sm:text-4xl lg:text-5xl">
            {site.tagline}
          </h1>
          <p className="mx-auto mt-2 max-w-2xl line-clamp-3 text-sm text-sky-100 sm:mt-4 sm:line-clamp-none sm:text-base lg:text-lg">
            {site.description}
          </p>
        </div>
        <div className="flex w-full max-w-md flex-col gap-2 sm:max-w-none sm:flex-row sm:justify-center sm:gap-4">
          <Link
            href="/catalog/"
            className="rounded-full bg-white px-5 py-2.5 text-center text-xs font-bold text-sky-900 shadow-lg transition hover:bg-sky-50 sm:px-8 sm:py-3 sm:text-sm"
          >
            Browse Catalog
          </Link>
          <a
            href={site.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border-2 border-white/80 px-5 py-2.5 text-center text-xs font-bold transition hover:bg-white/10 sm:px-8 sm:py-3 sm:text-sm"
          >
            Follow on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
