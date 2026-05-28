import productsData from "@/data/products.json";
import categoriesData from "@/data/categories.json";
import reviewsData from "@/data/reviews.json";
import siteData from "@/data/site.json";
import type {
  Category,
  Product,
  ProductFilters,
  Review,
  SiteConfig,
} from "@/types/product";

const products = productsData as Product[];
const categories = categoriesData as Category[];
const reviews = reviewsData as Review[];
const site = siteData as SiteConfig;

export function getSiteConfig(): SiteConfig {
  return site;
}

export function getAllProducts(): Product[] {
  return products;
}

export function getProductById(id: string): Product | undefined {
  const normalized = id.trim().toUpperCase();
  return products.find((p) => p.id.toUpperCase() === normalized);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getProductsByCategory(categoryName: string): Product[] {
  return products.filter(
    (p) => p.category.toLowerCase() === categoryName.toLowerCase(),
  );
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getAllCategories(): Category[] {
  return categories;
}

export function getCategoryNames(): string[] {
  return categories.map((c) => c.name);
}

export function getReviewsForProduct(productId: string): Review[] {
  return reviews.filter((r) => r.productId === productId);
}

export function getGeneralReviews(limit = 6): Review[] {
  return reviews.slice(0, limit);
}

export function getAllReviews(): Review[] {
  return reviews;
}

export function slugifyCategory(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function filterAndSortProducts(
  items: Product[],
  filters: ProductFilters,
): Product[] {
  let result = [...items];

  const query = filters.query.trim().toLowerCase();
  if (query) {
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.id.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query),
    );
  }

  if (filters.category) {
    result = result.filter(
      (p) => p.category.toLowerCase() === filters.category.toLowerCase(),
    );
  }

  switch (filters.sort) {
    case "price-asc":
      result.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      result.sort((a, b) => b.price - a.price);
      break;
    case "latest":
      result.sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA;
      });
      break;
    default:
      break;
  }

  return result;
}

export function formatPrice(price: number, currency: string): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(price);
}

export function getProductPagePath(id: string): string {
  return `/products/${id.toLowerCase()}/`;
}
