import Link from "next/link";
import { ProductImage } from "@/components/shared/ProductImage";
import { ProductBadge } from "@/components/shared/ProductBadge";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import type { Product, SiteConfig } from "@/types/product";
import { formatPrice, getProductPagePath } from "@/utils/products";

interface ProductCardProps {
  product: Product;
  site: SiteConfig;
}

export function ProductCard({ product, site }: ProductCardProps) {
  const productPath = getProductPagePath(product.id);
  const productUrl = `${site.siteUrl}${productPath}`;

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:border-brand-orange/40 sm:rounded-2xl">
      <Link
        href={productPath}
        className="relative aspect-square bg-slate-100 sm:aspect-[4/3]"
      >
        <ProductImage
          src={product.images[0] ?? "/products/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover transition duration-300 group-hover:scale-[1.02]"
        />
        {product.featured ? (
          <div className="absolute left-2 top-2">
            <ProductBadge label="Top pick" variant="featured" />
          </div>
        ) : null}
      </Link>
      <div className="flex flex-1 flex-col p-3 sm:p-5">
        <div className="flex items-start justify-between gap-1 sm:gap-2">
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-bold uppercase tracking-wide text-brand-orange sm:text-xs">
              {product.category}
            </p>
            <h3 className="font-display mt-0.5 line-clamp-2 text-sm font-semibold uppercase text-brand-navy sm:mt-1 sm:text-base">
              <Link href={productPath} className="hover:text-brand-orange">
                {product.name}
              </Link>
            </h3>
          </div>
          <p className="shrink-0 text-sm font-bold text-brand-navy sm:text-lg">
            {formatPrice(product.price, site.currency)}
          </p>
        </div>
        <p className="mt-2 hidden line-clamp-2 text-sm text-slate-600 sm:block">
          {product.shortDescription ?? product.description}
        </p>
        <p className="mt-2 hidden text-xs text-slate-500 sm:block">
          Size: {product.size} · ID: {product.id}
        </p>
        <div className="mt-2 sm:mt-4">
          <AddToCartButton product={product} compact />
        </div>
        <Link
          href={productPath}
          className="mt-2 hidden text-center text-xs font-semibold uppercase tracking-wide text-brand-orange hover:underline sm:block sm:mt-3"
        >
          View details
        </Link>
        <span className="sr-only">Product page: {productUrl}</span>
      </div>
    </article>
  );
}
