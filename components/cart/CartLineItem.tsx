"use client";

import Link from "next/link";
import type { CartItem } from "@/types/cart";
import type { SiteConfig } from "@/types/product";
import { QuantitySelector } from "@/components/cart/QuantitySelector";
import { ProductImage } from "@/components/shared/ProductImage";
import { formatPrice, getProductPagePath } from "@/utils/products";

interface CartLineItemProps {
  item: CartItem;
  site: SiteConfig;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}

export function CartLineItem({
  item,
  site,
  onUpdateQuantity,
  onRemove,
}: CartLineItemProps) {
  const lineTotal = item.price * item.quantity;

  return (
    <li className="flex gap-3 border-b border-slate-100 py-4 sm:gap-4">
      <Link
        href={getProductPagePath(item.productId)}
        className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-slate-100 sm:h-24 sm:w-24"
      >
        <ProductImage
          src={item.image ?? "/products/placeholder.svg"}
          alt={item.name}
          fill
          className="object-cover"
        />
      </Link>
      <div className="min-w-0 flex-1">
        <Link
          href={getProductPagePath(item.productId)}
          className="line-clamp-2 font-semibold text-slate-900 hover:text-brand-orange"
        >
          {item.name}
        </Link>
        <p className="mt-0.5 text-xs text-slate-500">ID: {item.productId}</p>
        <p className="mt-1 text-sm font-bold text-slate-900">
          {formatPrice(lineTotal, site.currency)}
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <QuantitySelector
            value={item.quantity}
            onChange={(qty) => onUpdateQuantity(item.productId, qty)}
            size="sm"
          />
          <button
            type="button"
            onClick={() => onRemove(item.productId)}
            className="text-xs font-medium text-red-600 hover:underline"
          >
            Remove
          </button>
        </div>
      </div>
    </li>
  );
}
