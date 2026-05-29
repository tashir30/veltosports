import type { MetadataRoute } from "next";
import {
  getAllCategories,
  getAllProducts,
  getSiteConfig,
} from "@/utils/products";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const site = getSiteConfig();
  const base = site.siteUrl.replace(/\/$/, "");

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/catalog/`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/categories/`, changeFrequency: "weekly", priority: 0.8 },
  ];

  const productRoutes: MetadataRoute.Sitemap = getAllProducts().map(
    (product) => ({
      url: `${base}/products/${product.id.toLowerCase()}/`,
      changeFrequency: "weekly" as const,
      priority: 0.7,
      lastModified: product.createdAt,
    }),
  );

  const categoryRoutes: MetadataRoute.Sitemap = getAllCategories().map(
    (category) => ({
      url: `${base}/categories/${category.slug}/`,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }),
  );

  return [...staticRoutes, ...productRoutes, ...categoryRoutes];
}
