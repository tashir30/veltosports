import Link from "next/link";
import { ProductImage } from "@/components/shared/ProductImage";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import type { Product, SiteConfig } from "@/types/product";
import { formatPrice, getProductPagePath } from "@/utils/products";
import { buildWhatsAppOrderUrl } from "@/utils/whatsapp";

interface ProductCardProps {
  product: Product;
  site: SiteConfig;
}

export function ProductCard({ product, site }: ProductCardProps) {
  const productPath = getProductPagePath(product.id);
  const productUrl = `${site.siteUrl}${productPath}`;
  const whatsappUrl = buildWhatsAppOrderUrl(site.whatsappPhone, product);

  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md sm:rounded-2xl">
      <Link
        href={productPath}
        className="relative aspect-square bg-slate-100 sm:aspect-[4/3]"
      >
        <ProductImage
          src={product.images[0] ?? "/products/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover"
        />
      </Link>
      <div className="flex flex-1 flex-col p-3 sm:p-5">
        <div className="flex items-start justify-between gap-1 sm:gap-2">
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-medium uppercase tracking-wide text-sky-700 sm:text-xs">
              {product.category}
            </p>
            <h3 className="mt-0.5 line-clamp-2 text-sm font-semibold text-slate-900 sm:mt-1 sm:text-lg sm:font-bold">
              <Link href={productPath} className="hover:text-sky-700">
                {product.name}
              </Link>
            </h3>
          </div>
          <p className="shrink-0 text-sm font-bold text-slate-900 sm:text-lg">
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
          <WhatsAppButton
            href={whatsappUrl}
            className="w-full justify-center px-3 py-2 text-xs sm:w-auto sm:px-5 sm:py-2.5 sm:text-sm"
            label={
              <>
                <span className="sm:hidden">Order</span>
                <span className="hidden sm:inline">Order on WhatsApp</span>
              </>
            }
          />
        </div>
        <Link
          href={productPath}
          className="mt-2 hidden text-center text-xs font-medium text-sky-700 hover:underline sm:block sm:mt-3"
        >
          View details
        </Link>
        <span className="sr-only">Product page: {productUrl}</span>
      </div>
    </article>
  );
}
