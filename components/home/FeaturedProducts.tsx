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
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Featured Kites"
          subtitle="Our most popular picks — order in seconds via WhatsApp"
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.slice(0, 6).map((product) => (
            <ProductCard key={product.id} product={product} site={site} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/catalog/"
            className="text-sm font-semibold text-sky-700 hover:text-sky-900"
          >
            View full catalog →
          </Link>
        </div>
      </div>
    </section>
  );
}
