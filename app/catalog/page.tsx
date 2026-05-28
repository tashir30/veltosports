import type { Metadata } from "next";
import { CatalogClient } from "@/components/products/CatalogClient";
import { getAllProducts, getSiteConfig } from "@/utils/products";

export const metadata: Metadata = {
  title: "Kite Catalog",
  description: "Browse our full collection of fighter, festival, premium, and kids kites.",
};

export default function CatalogPage() {
  const products = getAllProducts();
  const site = getSiteConfig();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
          Kite Catalog
        </h1>
        <p className="mt-3 text-slate-600">
          Search, filter, and order any kite directly on WhatsApp.
        </p>
      </div>
      <CatalogClient products={products} site={site} />
    </div>
  );
}
