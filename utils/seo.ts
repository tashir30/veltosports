import type { Metadata } from "next";
import type { Product, SiteConfig } from "@/types/product";
import { getProductPagePath } from "@/utils/products";

export function buildSiteMetadata(site: SiteConfig): Metadata {
  return {
    metadataBase: new URL(site.siteUrl),
    title: {
      default: `${site.businessName} | ${site.tagline}`,
      template: `%s | ${site.businessName}`,
    },
    description: site.description,
    openGraph: {
      type: "website",
      locale: "en_US",
      url: site.siteUrl,
      siteName: site.businessName,
      title: `${site.businessName} | ${site.tagline}`,
      description: site.description,
      images: [{ url: `${site.siteUrl}${site.logo}`, alt: site.businessName }],
    },
    twitter: {
      card: "summary_large_image",
      title: site.businessName,
      description: site.description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function buildProductMetadata(
  product: Product,
  site: SiteConfig,
): Metadata {
  const url = `${site.siteUrl}${getProductPagePath(product.id)}`;
  const image = product.images[0]
    ? `${site.siteUrl}${product.images[0]}`
    : `${site.siteUrl}${site.logo}`;

  return {
    title: product.name,
    description: product.shortDescription ?? product.description.slice(0, 160),
    openGraph: {
      type: "website",
      url,
      title: product.name,
      description: product.shortDescription ?? product.description,
      images: [{ url: image, alt: product.name }],
    },
  };
}

export function buildProductJsonLd(
  product: Product,
  site: SiteConfig,
): Record<string, unknown> {
  const url = `${site.siteUrl}${getProductPagePath(product.id)}`;
  const images = product.images.map((img) => `${site.siteUrl}${img}`);

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    sku: product.id,
    image: images,
    offers: {
      "@type": "Offer",
      url,
      priceCurrency: site.currency,
      price: product.price,
      availability: "https://schema.org/InStock",
    },
    brand: {
      "@type": "Brand",
      name: site.businessName,
    },
  };
}
