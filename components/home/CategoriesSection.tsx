import Image from "next/image";
import Link from "next/link";
import { SectionTitle } from "@/components/shared/SectionTitle";
import type { Category } from "@/types/product";

interface CategoriesSectionProps {
  categories: Category[];
}

export function CategoriesSection({ categories }: CategoriesSectionProps) {
  return (
    <section className="bg-slate-50 py-10 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Collections"
          subtitle="Fighter, festival, premium, and more"
        />
        <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-4 lg:grid-cols-3 lg:gap-6">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/categories/${category.slug}/`}
              className="group overflow-hidden rounded-xl bg-white ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:ring-brand-orange/50 sm:rounded-2xl"
            >
              <div className="relative aspect-[4/3] bg-brand-navy/5 sm:aspect-[16/10]">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 to-transparent opacity-0 transition group-hover:opacity-100" />
              </div>
              <div className="p-3 sm:p-5">
                <h3 className="font-display line-clamp-1 text-sm font-bold uppercase tracking-wide text-brand-navy sm:text-base">
                  {category.name}
                </h3>
                <p className="mt-1 hidden line-clamp-2 text-sm text-slate-600 sm:block">
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
