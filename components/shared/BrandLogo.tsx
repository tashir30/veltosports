interface BrandLogoProps {
  variant?: "default" | "inverse";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const veltoSizeClasses = {
  sm: "text-lg tracking-[0.14em] sm:text-xl",
  md: "text-xl tracking-[0.16em] sm:text-2xl",
  lg: "text-2xl tracking-[0.18em] sm:text-3xl",
};

const sportsSizeClasses = {
  sm: "text-[10px] tracking-[0.28em] sm:text-xs",
  md: "text-xs tracking-[0.3em] sm:text-sm",
  lg: "text-sm tracking-[0.32em] sm:text-base",
};

export function BrandLogo({
  variant = "default",
  size = "md",
  className = "",
}: BrandLogoProps) {
  const velColor =
    variant === "inverse" ? "text-white" : "text-brand-navy";
  const sportsColor =
    variant === "inverse" ? "text-white/75" : "text-brand-navy/60";

  return (
    <span
      className={`font-display inline-flex flex-wrap items-baseline justify-center gap-x-1.5 gap-y-0.5 font-bold uppercase sm:gap-x-2 ${className}`}
      aria-label="VELTO Sports"
    >
      <span className={`inline-flex ${veltoSizeClasses[size]}`}>
        <span className={velColor}>VEL</span>
        <span className="text-brand-orange">TO</span>
      </span>
      <span
        className={`font-semibold ${sportsSizeClasses[size]} ${sportsColor}`}
      >
        Sports
      </span>
    </span>
  );
}
