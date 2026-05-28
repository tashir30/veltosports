"use client";

import { useState } from "react";
import { ProductImage } from "@/components/shared/ProductImage";

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const gallery = images.length > 0 ? images : ["/products/placeholder.svg"];
  const [active, setActive] = useState(0);

  return (
    <div className="space-y-4">
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-slate-100">
        <ProductImage
          src={gallery[active]}
          alt={`${productName} - image ${active + 1}`}
          fill
          className="object-cover"
          priority
        />
      </div>
      {gallery.length > 1 ? (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {gallery.map((src, i) => (
            <button
              key={`${src}-${i}`}
              type="button"
              onClick={() => setActive(i)}
              className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-lg ring-2 transition ${
                i === active ? "ring-sky-600" : "ring-transparent hover:ring-slate-300"
              }`}
              aria-label={`Show image ${i + 1}`}
              aria-current={i === active}
            >
              <ProductImage src={src} alt="" fill className="object-cover" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
