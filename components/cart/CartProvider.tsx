"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Product } from "@/types/product";
import type { CartItem } from "@/types/cart";
import { MAX_CART_LINE_ITEMS } from "@/types/cart";
import {
  addItemToCart,
  getCartCount,
  loadCartFromStorage,
  removeItemFromCart,
  saveCartToStorage,
  updateItemQuantity,
} from "@/utils/cart";

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  hydrated: boolean;
  addToCart: (product: Product, quantity: number) => boolean;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setItems(loadCartFromStorage());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      saveCartToStorage(items);
    }
  }, [items, hydrated]);

  const addToCart = useCallback((product: Product, quantity: number): boolean => {
    let added = false;
    setItems((prev) => {
      const exists = prev.some((i) => i.productId === product.id);
      if (!exists && prev.length >= MAX_CART_LINE_ITEMS) {
        return prev;
      }
      added = true;
      return addItemToCart(prev, product, quantity);
    });
    return added;
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    setItems((prev) => updateItemQuantity(prev, productId, quantity));
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setItems((prev) => removeItemFromCart(prev, productId));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const value = useMemo(
    () => ({
      items,
      itemCount: getCartCount(items),
      hydrated,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
    }),
    [items, hydrated, addToCart, updateQuantity, removeFromCart, clearCart],
  );

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
}
