import type { Product } from "@/types/product";
import type { CartItem } from "@/types/cart";
import {
  CART_STORAGE_KEY,
  MAX_CART_LINE_ITEMS,
  MAX_CART_QUANTITY,
} from "@/types/cart";
import { sanitizeAssetPath } from "@/utils/security";

const PRODUCT_ID_PATTERN = /^K[A-Z0-9]{2,8}$/i;

export function clampQuantity(qty: number): number {
  return Math.min(MAX_CART_QUANTITY, Math.max(1, Math.floor(qty)));
}

export function getCartCount(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

export function getCartTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function productToCartItem(
  product: Product,
  quantity: number,
): CartItem {
  return {
    productId: product.id,
    name: product.name,
    price: product.price,
    quantity: clampQuantity(quantity),
    image: product.images[0],
  };
}

export function addItemToCart(
  items: CartItem[],
  product: Product,
  quantity: number,
): CartItem[] {
  const qty = clampQuantity(quantity);
  const index = items.findIndex((i) => i.productId === product.id);

  if (index >= 0) {
    const next = [...items];
    next[index] = {
      ...next[index],
      quantity: clampQuantity(next[index].quantity + qty),
    };
    return next;
  }

  if (items.length >= MAX_CART_LINE_ITEMS) {
    return items;
  }

  return [...items, productToCartItem(product, qty)];
}

export function updateItemQuantity(
  items: CartItem[],
  productId: string,
  quantity: number,
): CartItem[] {
  if (quantity < 1) {
    return items.filter((i) => i.productId !== productId);
  }
  const qty = clampQuantity(quantity);
  return items.map((i) =>
    i.productId === productId ? { ...i, quantity: qty } : i,
  );
}

export function removeItemFromCart(
  items: CartItem[],
  productId: string,
): CartItem[] {
  return items.filter((i) => i.productId !== productId);
}

export function parseStoredCart(raw: string): CartItem[] {
  const parsed = JSON.parse(raw) as unknown;
  if (!Array.isArray(parsed)) return [];

  return parsed
    .filter(
      (item): item is CartItem =>
        typeof item === "object" &&
        item !== null &&
        typeof (item as CartItem).productId === "string" &&
        typeof (item as CartItem).name === "string" &&
        typeof (item as CartItem).price === "number" &&
        typeof (item as CartItem).quantity === "number",
    )
    .map((item) => ({
      productId: item.productId.slice(0, 32),
      name: item.name.slice(0, 120),
      price: Math.min(100000, Math.max(0, item.price)),
      quantity: clampQuantity(item.quantity),
      image: sanitizeAssetPath(item.image),
    }))
    .slice(0, MAX_CART_LINE_ITEMS);
}

export function loadCartFromStorage(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    return parseStoredCart(raw);
  } catch {
    return [];
  }
}

export function saveCartToStorage(items: CartItem[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
}

export function reconcileCartWithCatalog(
  items: CartItem[],
  products: Product[],
): CartItem[] {
  const byId = new Map(
    products.map((product) => [product.id.toUpperCase(), product]),
  );

  return items
    .filter((item) => PRODUCT_ID_PATTERN.test(item.productId))
    .flatMap((item) => {
      const product = byId.get(item.productId.toUpperCase());
      if (!product) return [];

      return [
        {
          productId: product.id,
          name: product.name.slice(0, 120),
          price: product.price,
          quantity: clampQuantity(item.quantity),
          image: sanitizeAssetPath(product.images[0]),
        } satisfies CartItem,
      ];
    })
    .slice(0, MAX_CART_LINE_ITEMS);
}
