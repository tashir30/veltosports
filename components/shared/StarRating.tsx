interface StarRatingProps {
  rating: number;
  max?: number;
}

export function StarRating({ rating, max = 5 }: StarRatingProps) {
  const safeRating = Math.min(Math.max(0, rating), max);

  return (
    <div
      className="flex gap-0.5 text-amber-400"
      role="img"
      aria-label={`${safeRating} out of ${max} stars`}
    >
      {Array.from({ length: max }, (_, i) => (
        <span key={i} aria-hidden="true">
          {i < Math.round(safeRating) ? "★" : "☆"}
        </span>
      ))}
    </div>
  );
}
