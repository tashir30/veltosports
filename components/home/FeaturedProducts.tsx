import Link from "next/link";
import { ProductCard } from "@/components/products/ProductCard";
import { SectionTitle } from "@/components/shared/SectionTitle";
import type { Product, SiteConfig } from "@/types/product";

interface FeaturedProductsProps {
  products: Product[];
  site: SiteConfig;
}

export function FeaturedProducts({ products, site }: FeaturedProductsProps) {
  if (products.length === 0) return null;

  return (
    <section className="bg-white pt-4 pb-8 sm:pt-5 sm:pb-10 lg:pt-6 lg:pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-2 md:flex-row md:items-end md:justify-between">
          <SectionTitle title="Top picks" compact centered={false} />
          <Link
            href="/catalog/"
            className="text-sm font-bold uppercase tracking-wide text-brand-orange hover:text-brand-orange-dark"
          >
            View all →
          </Link>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:mt-4 sm:gap-4 lg:mt-5 lg:grid-cols-3 lg:gap-6">
          {products.slice(0, 6).map((product) => (
            <ProductCard key={product.id} product={product} site={site} />
          ))}
        </div>
      </div>
    </section>
  );
}
