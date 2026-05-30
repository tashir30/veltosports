import { CategoriesSection } from "@/components/home/CategoriesSection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { Hero } from "@/components/home/Hero";
import { InstagramSection } from "@/components/home/InstagramSection";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { TrustStrip } from "@/components/home/TrustStrip";
import { WhyVeltosports } from "@/components/home/WhyVeltosports";
import {
  getAllCategories,
  getAllProducts,
  getFeaturedProducts,
  getGeneralReviews,
  getSiteConfig,
} from "@/utils/products";

export default function HomePage() {
  const site = getSiteConfig();
  const featured = getFeaturedProducts();
  const categories = getAllCategories();
  const reviews = getGeneralReviews(6);
  const products = getAllProducts();

  return (
    <>
      <Hero site={site} />
      <TrustStrip />
      <FeaturedProducts products={featured} site={site} />
      <WhyVeltosports
        productCount={products.length}
        categoryCount={categories.length}
      />
      <CategoriesSection categories={categories} />
      <ReviewsSection reviews={reviews} />
      <InstagramSection site={site} />
    </>
  );
}
