import type { Metadata } from "next";
import { CartView } from "@/components/cart/CartView";
import { getSiteConfig } from "@/utils/products";

export const metadata: Metadata = {
  title: "Cart",
  description: "Review your kite order before sending on WhatsApp.",
  robots: { index: false, follow: false },
};

export default function CartPage() {
  const site = getSiteConfig();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
      <h1 className="font-display text-2xl font-bold uppercase tracking-tight text-brand-navy sm:text-3xl">
        Your cart
      </h1>
      <p className="mt-2 text-slate-600">
        Review items, then tap Order to send everything in one WhatsApp message.
      </p>
      <div className="mt-8">
        <CartView site={site} />
      </div>
    </div>
  );
}
