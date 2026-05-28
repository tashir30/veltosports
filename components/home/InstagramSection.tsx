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
    <section className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 py-16 text-white sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold">Follow us on Instagram</h2>
            <p className="mt-4 text-lg text-white/90">
              See new arrivals, flying clips, and behind-the-scenes builds. DM us
              or order through our catalog — we reply fast on WhatsApp.
            </p>
            <a
              href={site.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex rounded-full bg-white px-8 py-3 text-sm font-bold text-pink-700 shadow-lg transition hover:bg-pink-50"
            >
              {site.instagramHandle}
            </a>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {previewImages.map((src) => (
              <div
                key={src}
                className="relative aspect-square overflow-hidden rounded-xl ring-2 ring-white/30"
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
