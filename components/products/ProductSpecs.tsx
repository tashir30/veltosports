import type { ProductSpecifications } from "@/types/product";

interface ProductSpecsProps {
  specifications?: ProductSpecifications;
  size: string;
  category: string;
  productId: string;
}

export function ProductSpecs({
  specifications,
  size,
  category,
  productId,
}: ProductSpecsProps) {
  const entries = specifications
    ? Object.entries(specifications).filter(([, v]) => v)
    : [];

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
      <h2 className="text-lg font-bold text-slate-900">Specifications</h2>
      <dl className="mt-4 space-y-3 text-sm">
        <div className="flex justify-between gap-4 border-b border-slate-200 pb-2">
          <dt className="text-slate-600">Product ID</dt>
          <dd className="font-medium text-slate-900">{productId}</dd>
        </div>
        <div className="flex justify-between gap-4 border-b border-slate-200 pb-2">
          <dt className="text-slate-600">Category</dt>
          <dd className="font-medium text-slate-900">{category}</dd>
        </div>
        <div className="flex justify-between gap-4 border-b border-slate-200 pb-2">
          <dt className="text-slate-600">Size</dt>
          <dd className="font-medium text-slate-900">{size}</dd>
        </div>
        {entries.map(([key, value]) => (
          <div
            key={key}
            className="flex justify-between gap-4 border-b border-slate-200 pb-2 capitalize"
          >
            <dt className="text-slate-600">
              {key.replace(/([A-Z])/g, " $1").trim()}
            </dt>
            <dd className="text-right font-medium text-slate-900">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
