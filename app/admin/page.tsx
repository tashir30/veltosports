import type { Metadata } from "next";
import { AdminPanel } from "@/components/admin/AdminPanel";
import { getAllProducts } from "@/utils/products";

export const metadata: Metadata = {
  title: "Admin",
  description: "Manage product catalog and export products.json for deployment.",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  const products = getAllProducts();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900">Product Admin</h1>
      <p className="mt-2 text-slate-600">
        Manage your catalog locally — no server required.
      </p>
      <div className="mt-8">
        <AdminPanel initialProducts={products} />
      </div>
    </div>
  );
}
