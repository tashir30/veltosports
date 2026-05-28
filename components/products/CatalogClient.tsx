"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductFiltersBar } from "@/components/products/ProductFilters";
import type { Product, ProductFilters, SiteConfig } from "@/types/product";
import { filterAndSortProducts, getCategoryNames } from "@/utils/products";

interface CatalogClientProps {
  products: Product[];
  site: SiteConfig;
  initialCategory?: string;
}

export function CatalogClient({
  products,
  site,
  initialCategory = "",
}: CatalogClientProps) {
  const [filters, setFilters] = useState<ProductFilters>({
    query: "",
    category: initialCategory,
    sort: "latest",
  });

  const filtered = useMemo(
    () => filterAndSortProducts(products, filters),
    [products, filters],
  );

  const categories = useMemo(() => getCategoryNames(), []);

  return (
    <div className="space-y-8">
      <ProductFiltersBar
        filters={filters}
        categories={categories}
        onChange={setFilters}
        resultCount={filtered.length}
      />
      {filtered.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 py-16 text-center text-slate-600">
          No kites match your filters. Try a different search or category.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} site={site} />
          ))}
        </div>
      )}
    </div>
  );
}
