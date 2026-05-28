import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductGallery } from "@/components/products/ProductGallery";
import { ProductSpecs } from "@/components/products/ProductSpecs";
import { ProductVideo } from "@/components/products/ProductVideo";
import { QRCodeDisplay } from "@/components/shared/QRCodeDisplay";
import { StarRating } from "@/components/shared/StarRating";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import {
  formatPrice,
  getAllProducts,
  getProductById,
  getProductPagePath,
  getReviewsForProduct,
  getSiteConfig,
} from "@/utils/products";
import { buildProductJsonLd, buildProductMetadata } from "@/utils/seo";
import { buildWhatsAppOrderUrl } from "@/utils/whatsapp";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return getAllProducts().map((product) => ({
    id: product.id.toLowerCase(),
  }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);
  const site = getSiteConfig();
  if (!product) return { title: "Product Not Found" };
  return buildProductMetadata(product, site);
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) notFound();

  const site = getSiteConfig();
  const reviews = getReviewsForProduct(product.id);
  const whatsappUrl = buildWhatsAppOrderUrl(site.whatsappPhone, product);
  const productUrl = `${site.siteUrl}${getProductPagePath(product.id)}`;
  const jsonLd = buildProductJsonLd(product, site);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav className="mb-6 text-sm text-slate-500">
        <Link href="/" className="hover:text-sky-700">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/catalog/" className="hover:text-sky-700">
          Catalog
        </Link>
        <span className="mx-2">/</span>
        <span className="text-slate-900">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <ProductGallery images={product.images} productName={product.name} />

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-sky-700">
            {product.category}
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
            {product.name}
          </h1>
          <p className="mt-4 text-3xl font-bold text-slate-900">
            {formatPrice(product.price, site.currency)}
          </p>
          <p className="mt-6 leading-relaxed text-slate-700">
            {product.description}
          </p>

          <div className="mt-8 flex flex-wrap items-start gap-8">
            <WhatsAppButton href={whatsappUrl} className="text-base" />
            <div className="flex gap-6">
              <QRCodeDisplay
                value={whatsappUrl}
                size={120}
                label="WhatsApp order"
              />
              <QRCodeDisplay
                value={productUrl}
                size={120}
                label="Product page"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        <ProductSpecs
          specifications={product.specifications}
          size={product.size}
          category={product.category}
          productId={product.id}
        />
        {reviews.length > 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-bold text-slate-900">Reviews</h2>
            <ul className="mt-4 space-y-4">
              {reviews.map((review) => (
                <li key={review.id} className="border-b border-slate-100 pb-4 last:border-0">
                  <StarRating rating={review.rating} />
                  <p className="mt-2 text-slate-700">&ldquo;{review.text}&rdquo;</p>
                  <p className="mt-2 text-sm font-semibold text-slate-900">
                    {review.author}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>

      <ProductVideo youtubeUrl={product.youtube} productName={product.name} />
    </div>
  );
}
