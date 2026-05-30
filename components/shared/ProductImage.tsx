"use client";

import Image from "next/image";
import { useState } from "react";
import { sanitizeAssetPath } from "@/utils/security";

interface ProductImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

export function ProductImage({
  src,
  alt,
  fill = false,
  width,
  height,
  className = "",
  priority = false,
}: ProductImageProps) {
  const safeSrc = sanitizeAssetPath(src);
  const [imgSrc, setImgSrc] = useState(safeSrc);

  const shared = {
    src: imgSrc,
    alt,
    className,
    priority,
    onError: () => setImgSrc("/products/placeholder.svg"),
  };

  if (fill) {
    return <Image {...shared} fill sizes="(max-width: 768px) 100vw, 50vw" />;
  }

  return (
    <Image
      {...shared}
      width={width ?? 400}
      height={height ?? 400}
    />
  );
}
