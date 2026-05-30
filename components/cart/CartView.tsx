"use client";

import Link from "next/link";
import type { SiteConfig } from "@/types/product";
import { useCart } from "@/components/cart/CartProvider";
import { CartLineItem } from "@/components/cart/CartLineItem";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { formatPrice } from "@/utils/products";
import { getCartTotal } from "@/utils/cart";
import { buildWhatsAppCartOrderUrl } from "@/utils/whatsapp";

interface CartViewProps {
  site: SiteConfig;
}

export function CartView({ site }: CartViewProps) {
  const { items, hydrated, updateQuantity, removeFromCart, clearCart } =
    useCart();

  if (!hydrated) {
    return (
      <p className="py-12 text-center text-slate-500">Loading cart...</p>
    );
  }

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 py-16 text-center">
        <p className="text-lg font-semibold text-slate-900">Your cart is empty</p>
        <p className="mt-2 text-slate-600">Add kites from the catalog to get started.</p>
        <Link
          href="/catalog/"
          className="mt-6 inline-block rounded-full bg-brand-orange px-6 py-2.5 text-sm font-bold uppercase tracking-wide text-white hover:bg-brand-orange-dark"
        >
          Browse catalog
        </Link>
      </div>
    );
  }

  const total = getCartTotal(items);
  const orderUrl = buildWhatsAppCartOrderUrl(
    site.whatsappPhone,
    items,
    site.currency,
  );

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <ul className="divide-y divide-slate-100 rounded-2xl border border-slate-200 bg-white px-4 sm:px-6">
          {items.map((item) => (
            <CartLineItem
              key={item.productId}
              item={item}
              site={site}
              onUpdateQuantity={updateQuantity}
              onRemove={removeFromCart}
            />
          ))}
        </ul>
        <button
          type="button"
          onClick={clearCart}
          className="mt-4 text-sm font-medium text-slate-500 hover:text-red-600"
        >
          Clear cart
        </button>
      </div>
      <div className="h-fit rounded-2xl border border-slate-200 bg-slate-50 p-6">
        <h2 className="font-display text-lg font-bold uppercase tracking-wide text-brand-navy">Order summary</h2>
        <p className="mt-4 flex justify-between text-slate-700">
          <span>Subtotal ({items.reduce((n, i) => n + i.quantity, 0)} items)</span>
          <span className="font-bold text-slate-900">
            {formatPrice(total, site.currency)}
          </span>
        </p>
        <p className="mt-2 text-xs text-slate-500">
          Prices are estimates. Confirm total and shipping on WhatsApp.
        </p>
        <WhatsAppButton
          href={orderUrl}
          label="Order"
          className="mt-6 w-full justify-center"
        />
        <Link
          href="/catalog/"
          className="mt-4 block text-center text-sm font-semibold uppercase tracking-wide text-brand-orange hover:underline"
        >
          Continue shopping
        </Link>
      </div>
    </div>
  );
}
