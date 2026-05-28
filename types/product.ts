export interface ProductSpecifications {
  material?: string;
  frame?: string;
  windRange?: string;
  lineIncluded?: string;
  weight?: string;
  [key: string]: string | undefined;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  shortDescription?: string;
  category: string;
  size: string;
  featured: boolean;
  images: string[];
  youtube?: string;
  specifications?: ProductSpecifications;
  createdAt?: string;
}

export type SortOption = "price-asc" | "price-desc" | "latest";

export interface ProductFilters {
  query: string;
  category: string;
  sort: SortOption;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  productId?: string;
  date: string;
}

export interface Category {
  name: string;
  slug: string;
  description: string;
  image: string;
}

export interface SiteConfig {
  businessName: string;
  tagline: string;
  description: string;
  whatsappPhone: string;
  instagramUrl: string;
  instagramHandle: string;
  siteUrl: string;
  logo: string;
  currency: string;
  heroImages: string[];
  email?: string;
}
