interface WhyVeltosportsProps {
  productCount: number;
  categoryCount: number;
}

const PILLARS = [
  {
    title: "Performance gear",
    text: "Fighter, competition, and festival kites built for real flying.",
    icon: "⚡",
  },
  {
    title: "Order in one tap",
    text: "Add to cart, review, and send your full order on WhatsApp.",
    icon: "💬",
  },
  {
    title: "Ship worldwide",
    text: "From India to your sky — we pack and ship with care.",
    icon: "🌍",
  },
];

export function WhyVeltosports({
  productCount,
  categoryCount,
}: WhyVeltosportsProps) {
  return (
    <section className="border-y border-slate-200 bg-brand-navy text-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-brand-orange">
              Why Veltosports
            </p>
            <h2 className="font-display mt-2 text-2xl font-bold uppercase tracking-tight sm:text-3xl">
              Built for flyers who mean business
            </h2>
            <p className="mt-3 text-sm text-slate-300 sm:text-base">
              {productCount}+ kites across {categoryCount} collections. Browse
              like a pro shop, order like an app.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {PILLARS.map((p) => (
              <div
                key={p.title}
                className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm"
              >
                <span className="text-2xl" aria-hidden="true">
                  {p.icon}
                </span>
                <h3 className="mt-2 font-display text-sm font-bold uppercase tracking-wide">
                  {p.title}
                </h3>
                <p className="mt-1 text-xs text-slate-300">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
