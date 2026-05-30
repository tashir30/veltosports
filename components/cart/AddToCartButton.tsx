"use client";

import { useState } from "react";
import type { Product } from "@/types/product";
import { useCart } from "@/components/cart/CartProvider";
import { QuantitySelector } from "@/components/cart/QuantitySelector";

interface AddToCartButtonProps {
  product: Product;
  compact?: boolean;
  className?: string;
}

export function AddToCartButton({
  product,
  compact = false,
  className = "",
}: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [feedback, setFeedback] = useState("");

  const handleAdd = () => {
    const ok = addToCart(product, quantity);
    if (ok) {
      setFeedback("Added");
      setTimeout(() => setFeedback(""), 1500);
    } else {
      setFeedback("Cart full");
      setTimeout(() => setFeedback(""), 2000);
    }
  };

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <div
        className={
          compact
            ? "flex items-center justify-start gap-1.5"
            : "flex items-center gap-2"
        }
      >
        <QuantitySelector
          value={quantity}
          onChange={setQuantity}
          size={compact ? "sm" : "md"}
          className="shrink-0"
        />
        <button
          type="button"
          onClick={handleAdd}
          className={
            compact
              ? "shrink-0 rounded-md bg-brand-orange px-2.5 py-1.5 text-[11px] font-bold uppercase leading-none tracking-wide text-white shadow-none transition hover:bg-brand-orange-dark sm:text-xs"
              : "shrink-0 rounded-full bg-brand-orange px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-white shadow-none transition hover:bg-brand-orange-dark"
          }
        >
          {compact ? "Add" : "Add to cart"}
        </button>
      </div>
      {feedback ? (
        <p className="text-xs font-medium text-brand-orange" role="status">
          {feedback}
        </p>
      ) : null}
    </div>
  );
}
