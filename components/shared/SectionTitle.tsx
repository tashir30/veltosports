interface SectionTitleProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  compact?: boolean;
}

export function SectionTitle({
  title,
  subtitle,
  centered = true,
  compact = false,
}: SectionTitleProps) {
  return (
    <div className={centered ? "text-center md:text-left" : ""}>
      <h2
        className={
          compact
            ? "font-display text-lg font-bold uppercase tracking-tight text-brand-navy sm:text-xl lg:text-2xl"
            : "font-display text-2xl font-bold uppercase tracking-tight text-brand-navy sm:text-3xl"
        }
      >
        {title}
      </h2>
      {subtitle && !compact ? (
        <p className="mt-2 text-slate-600 sm:text-lg">{subtitle}</p>
      ) : null}
    </div>
  );
}
