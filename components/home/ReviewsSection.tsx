import { SectionTitle } from "@/components/shared/SectionTitle";
import { StarRating } from "@/components/shared/StarRating";
import type { Review } from "@/types/product";

interface ReviewsSectionProps {
  reviews: Review[];
}

export function ReviewsSection({ reviews }: ReviewsSectionProps) {
  return (
    <section className="bg-white py-10 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Customer Reviews"
          subtitle="Trusted by kite flyers worldwide"
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <article
              key={review.id}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-6"
            >
              <StarRating rating={review.rating} />
              <p className="mt-4 text-slate-700">&ldquo;{review.text}&rdquo;</p>
              <footer className="mt-4 text-sm font-semibold text-slate-900">
                {review.author}
                <span className="ml-2 font-normal text-slate-500">
                  {review.date}
                </span>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
