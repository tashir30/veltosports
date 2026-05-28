import { CategoriesSection } from "@/components/home/CategoriesSection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { Hero } from "@/components/home/Hero";
import { InstagramSection } from "@/components/home/InstagramSection";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import {
  getAllCategories,
  getFeaturedProducts,
  getGeneralReviews,
  getSiteConfig,
} from "@/utils/products";

export default function HomePage() {
  const site = getSiteConfig();
  const featured = getFeaturedProducts();
  const categories = getAllCategories();
  const reviews = getGeneralReviews(6);

  return (
    <>
      <Hero site={site} />
      <FeaturedProducts products={featured} site={site} />
      <CategoriesSection categories={categories} />
      <ReviewsSection reviews={reviews} />
      <InstagramSection site={site} />
    </>
  );
}
