import Image from "next/image";
import Link from "next/link";
import { SectionTitle } from "@/components/shared/SectionTitle";
import type { Category } from "@/types/product";

interface CategoriesSectionProps {
  categories: Category[];
}

export function CategoriesSection({ categories }: CategoriesSectionProps) {
  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Shop by Category"
          subtitle="Fighter, festival, premium, and more"
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/categories/${category.slug}/`}
              className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="relative aspect-[16/10] bg-sky-100">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <h3 className="font-bold text-slate-900">{category.name}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-slate-600">
                  {category.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
