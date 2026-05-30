import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center">
      <p className="text-6xl font-bold text-sky-200">404</p>
      <h1 className="mt-4 text-2xl font-bold text-slate-900">Page not found</h1>
      <p className="mt-2 text-slate-600">
        This kite may have flown away. Head back to the catalog.
      </p>
      <Link
        href="/catalog/"
        className="mt-8 rounded-full bg-brand-orange px-6 py-3 text-sm font-bold uppercase tracking-wide text-white hover:bg-brand-orange-dark"
      >
        Browse catalog
      </Link>
    </div>
  );
}
