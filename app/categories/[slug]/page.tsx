import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CatalogClient } from "@/components/products/CatalogClient";
import {
  getAllCategories,
  getCategoryBySlug,
  getProductsByCategory,
  getSiteConfig,
} from "@/utils/products";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllCategories().map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return { title: "Category Not Found" };
  return {
    title: category.name,
    description: category.description,
  };
}

export default async function CategoryDetailPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const products = getProductsByCategory(category.name);
  const site = getSiteConfig();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-2xl bg-slate-900 text-white">
        <div className="grid lg:grid-cols-2">
          <div className="relative aspect-[16/9] min-h-[200px] lg:aspect-auto">
            <Image
              src={category.image}
              alt={category.name}
              fill
              className="object-cover opacity-80"
            />
          </div>
          <div className="flex flex-col justify-center p-8 sm:p-12">
            <h1 className="text-3xl font-bold">{category.name}</h1>
            <p className="mt-4 text-sky-100">{category.description}</p>
            <p className="mt-4 text-sm text-sky-200">
              {products.length} product{products.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <CatalogClient
          products={products}
          site={site}
          initialCategory={category.name}
        />
      </div>
    </div>
  );
}
