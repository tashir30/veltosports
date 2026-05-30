import Image from "next/image";
import type { SiteConfig } from "@/types/product";

interface InstagramSectionProps {
  site: SiteConfig;
}

export function InstagramSection({ site }: InstagramSectionProps) {
  const previewImages = [
    "/products/k101-1.svg",
    "/products/k301-1.svg",
    "/products/k201-1.svg",
    "/products/k401-1.svg",
  ];

  return (
    <section className="bg-gradient-to-br from-brand-navy via-brand-navy-light to-brand-orange py-16 text-white sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-brand-orange">
              Social
            </p>
            <h2 className="font-display mt-2 text-3xl font-bold uppercase tracking-tight">
              Follow the flight
            </h2>
            <p className="mt-4 text-lg text-white/90">
              New arrivals, flying clips, and builds on Instagram. Order through
              the catalog — we reply fast on WhatsApp.
            </p>
            <a
              href={site.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex rounded-md bg-white px-8 py-3 text-sm font-bold uppercase tracking-wide text-brand-navy transition hover:bg-slate-100"
            >
              {site.instagramHandle}
            </a>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {previewImages.map((src) => (
              <div
                key={src}
                className="relative aspect-square overflow-hidden rounded-xl ring-2 ring-white/20"
              >
                <Image src={src} alt="" fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
