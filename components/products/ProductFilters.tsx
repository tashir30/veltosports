"use client";

import type { ProductFilters as Filters, SortOption } from "@/types/product";

interface ProductFiltersProps {
  filters: Filters;
  categories: string[];
  onChange: (filters: Filters) => void;
  resultCount: number;
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "latest", label: "Latest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

export function ProductFiltersBar({
  filters,
  categories,
  onChange,
  resultCount,
}: ProductFiltersProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Search</span>
          <input
            type="search"
            value={filters.query}
            onChange={(e) =>
              onChange({ ...filters, query: e.target.value.slice(0, 100) })
            }
            placeholder="Search by name or ID..."
            maxLength={100}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Category</span>
          <select
            value={filters.category}
            onChange={(e) =>
              onChange({ ...filters, category: e.target.value })
            }
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
          >
            <option value="">All categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Sort by</span>
          <select
            value={filters.sort}
            onChange={(e) =>
              onChange({
                ...filters,
                sort: e.target.value as SortOption,
              })
            }
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>
        <div className="flex items-end">
          <p className="text-sm text-slate-600">
            <span className="font-semibold text-slate-900">{resultCount}</span>{" "}
            product{resultCount !== 1 ? "s" : ""} found
          </p>
        </div>
      </div>
    </div>
  );
}
