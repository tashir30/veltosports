import type { Metadata } from "next";
import { CategoriesSection } from "@/components/home/CategoriesSection";
import { getAllCategories } from "@/utils/products";

export const metadata: Metadata = {
  title: "Categories",
  description: "Browse kites by category — fighter, premium, festival, and more.",
};

export default function CategoriesPage() {
  const categories = getAllCategories();

  return (
    <div>
      <div className="bg-sky-900 px-4 py-12 text-center text-white sm:px-6">
        <h1 className="text-3xl font-bold sm:text-4xl">Categories</h1>
        <p className="mx-auto mt-3 max-w-2xl text-sky-100">
          Find the perfect kite for competition, festivals, kids, or international styles.
        </p>
      </div>
      <CategoriesSection categories={categories} />
    </div>
  );
}
