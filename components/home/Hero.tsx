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
    <section className="relative overflow-hidden bg-gradient-to-br from-sky-900 via-sky-800 to-cyan-700 text-white">
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
      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 py-20 text-center sm:px-6 sm:py-28 lg:px-8">
        <Image
          src={site.logo}
          alt={`${site.businessName} logo`}
          width={80}
          height={80}
          className="rounded-2xl bg-white/10 p-2 backdrop-blur"
        />
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-sky-200">
            {site.businessName}
          </p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            {site.tagline}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-sky-100">
            {site.description}
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/catalog/"
            className="rounded-full bg-white px-8 py-3 text-sm font-bold text-sky-900 shadow-lg transition hover:bg-sky-50"
          >
            Browse Catalog
          </Link>
          <a
            href={site.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border-2 border-white/80 px-8 py-3 text-sm font-bold transition hover:bg-white/10"
          >
            Follow on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
