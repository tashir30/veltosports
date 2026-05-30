interface TrustStripProps {
  items?: string[];
}

const DEFAULT_ITEMS = [
  "Worldwide shipping",
  "WhatsApp ordering",
  "Premium fighter kites",
  "Secure catalog",
];

export function TrustStrip({ items = DEFAULT_ITEMS }: TrustStripProps) {
  return (
    <div className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-6 gap-y-2 px-4 py-2.5 text-center sm:gap-x-8 sm:px-6 lg:px-8">
        {items.map((item) => (
          <span
            key={item}
            className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-slate-600 sm:text-xs"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand-orange" aria-hidden="true" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
