import type { Product } from "@/types/product";

export const ADMIN_STORAGE_KEY = "veltosports-admin-products";

export function loadProductsFromStorage(
  fallback: Product[],
): Product[] {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(ADMIN_STORAGE_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as Product[];
    if (!Array.isArray(parsed)) return fallback;
    return parsed;
  } catch {
    return fallback;
  }
}

export function saveProductsToStorage(products: Product[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(products, null, 2));
}

export function clearAdminStorage(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(ADMIN_STORAGE_KEY);
}

export function exportProductsJson(products: Product[]): void {
  const blob = new Blob([JSON.stringify(products, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "products.json";
  anchor.click();
  URL.revokeObjectURL(url);
}

export function createEmptyProduct(): Product {
  const now = new Date().toISOString().slice(0, 10);
  return {
    id: "",
    name: "",
    price: 0,
    description: "",
    shortDescription: "",
    category: "Fighter Kites",
    size: "Medium",
    featured: false,
    images: ["/products/placeholder.svg"],
    youtube: "",
    specifications: {},
    createdAt: now,
  };
}

export function validateProduct(product: Product): string[] {
  const errors: string[] = [];
  if (!/^K[A-Z0-9]{2,8}$/i.test(product.id.trim())) {
    errors.push("ID must look like K101 (letter K + alphanumeric).");
  }
  if (!product.name.trim() || product.name.length > 120) {
    errors.push("Name is required (max 120 characters).");
  }
  if (product.price < 0 || product.price > 100000) {
    errors.push("Price must be between 0 and 100000.");
  }
  if (!product.description.trim() || product.description.length > 2000) {
    errors.push("Description is required (max 2000 characters).");
  }
  if (!product.category.trim()) {
    errors.push("Category is required.");
  }
  if (!product.size.trim()) {
    errors.push("Size is required.");
  }
  if (product.images.length === 0) {
    errors.push("At least one image path is required.");
  }
  return errors;
}
