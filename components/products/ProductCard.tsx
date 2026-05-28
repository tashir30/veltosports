import Link from "next/link";
import { ProductImage } from "@/components/shared/ProductImage";
import { QRCodeDisplay } from "@/components/shared/QRCodeDisplay";
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
    <article className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
      <Link href={productPath} className="relative aspect-[4/3] bg-slate-100">
        <ProductImage
          src={product.images[0] ?? "/products/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover"
        />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-sky-700">
              {product.category}
            </p>
            <h3 className="mt-1 text-lg font-bold text-slate-900">
              <Link href={productPath} className="hover:text-sky-700">
                {product.name}
              </Link>
            </h3>
          </div>
          <p className="shrink-0 text-lg font-bold text-slate-900">
            {formatPrice(product.price, site.currency)}
          </p>
        </div>
        <p className="mt-2 line-clamp-2 text-sm text-slate-600">
          {product.shortDescription ?? product.description}
        </p>
        <p className="mt-2 text-xs text-slate-500">
          Size: {product.size} · ID: {product.id}
        </p>
        <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
          <WhatsAppButton href={whatsappUrl} className="text-xs sm:text-sm" />
          <QRCodeDisplay
            value={whatsappUrl}
            size={72}
            label="Scan to order"
          />
        </div>
        <Link
          href={productPath}
          className="mt-3 text-center text-xs font-medium text-sky-700 hover:underline"
        >
          View details & page QR
        </Link>
        <span className="sr-only">Product page: {productUrl}</span>
      </div>
    </article>
  );
}
