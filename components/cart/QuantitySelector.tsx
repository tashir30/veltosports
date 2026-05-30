"use client";

import { MAX_CART_QUANTITY } from "@/types/cart";

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  size?: "sm" | "md";
  className?: string;
}

export function QuantitySelector({
  value,
  onChange,
  size = "md",
  className = "",
}: QuantitySelectorProps) {
  const btn = size === "sm" ? "h-7 w-7 text-sm" : "h-9 w-9 text-base";
  const input = size === "sm" ? "h-7 w-8 text-xs" : "h-9 w-10 text-sm";

  return (
    <div
      className={`inline-flex items-center rounded-lg border border-slate-200 bg-white ${className}`}
      role="group"
      aria-label="Quantity"
    >
      <button
        type="button"
        onClick={() => onChange(Math.max(1, value - 1))}
        disabled={value <= 1}
        className={`${btn} rounded-l-lg text-slate-600 transition hover:bg-slate-50 disabled:opacity-40`}
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span
        className={`${input} flex items-center justify-center border-x border-slate-200 font-semibold tabular-nums text-slate-900`}
        aria-live="polite"
      >
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(MAX_CART_QUANTITY, value + 1))}
        disabled={value >= MAX_CART_QUANTITY}
        className={`${btn} rounded-r-lg text-slate-600 transition hover:bg-slate-50 disabled:opacity-40`}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
