interface ProductBadgeProps {
  label: string;
  variant?: "featured" | "new" | "sale";
}

const VARIANTS = {
  featured: "bg-brand-orange text-white",
  new: "bg-brand-navy text-white",
  sale: "bg-red-600 text-white",
};

export function ProductBadge({
  label,
  variant = "featured",
}: ProductBadgeProps) {
  return (
    <span
      className={`inline-block rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${VARIANTS[variant]}`}
    >
      {label}
    </span>
  );
}
