"use client";

import { useCallback, useEffect, useState } from "react";
import type { Product } from "@/types/product";
import {
  clearAdminStorage,
  createEmptyProduct,
  exportProductsJson,
  loadProductsFromStorage,
  saveProductsToStorage,
  validateProduct,
} from "@/utils/admin";
import { getCategoryNames } from "@/utils/products";

interface AdminPanelProps {
  initialProducts: Product[];
}

export function AdminPanel({ initialProducts }: AdminPanelProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [editing, setEditing] = useState<Product | null>(null);
  const [message, setMessage] = useState("");
  const categories = getCategoryNames();

  useEffect(() => {
    setProducts(loadProductsFromStorage(initialProducts));
  }, [initialProducts]);

  const persist = useCallback((next: Product[]) => {
    setProducts(next);
    saveProductsToStorage(next);
  }, []);

  const handleSave = () => {
    if (!editing) return;
    const normalized: Product = {
      ...editing,
      id: editing.id.trim().toUpperCase(),
      name: editing.name.trim(),
      price: Number(editing.price),
    };
    const errors = validateProduct(normalized);
    if (errors.length > 0) {
      setMessage(errors.join(" "));
      return;
    }

    const exists = products.some(
      (p) => p.id.toUpperCase() === normalized.id.toUpperCase(),
    );
    const isEdit = products.some(
      (p) =>
        p.id.toUpperCase() === normalized.id.toUpperCase() &&
        editing.id.toUpperCase() !== normalized.id.toUpperCase(),
    );

    let next: Product[];
    const index = products.findIndex(
      (p) => p.id.toUpperCase() === editing.id.toUpperCase(),
    );

    if (index >= 0) {
      next = [...products];
      next[index] = normalized;
    } else if (exists && !isEdit) {
      setMessage("Product ID already exists.");
      return;
    } else {
      next = [...products, normalized];
    }

    persist(next);
    setEditing(null);
    setMessage("Product saved to browser storage. Export JSON to deploy.");
  };

  const handleDelete = (id: string) => {
    if (!confirm(`Delete product ${id}?`)) return;
    persist(products.filter((p) => p.id !== id));
    setMessage(`Deleted ${id}. Export JSON to update deployment.`);
  };

  const handleImageFile = (file: File | null) => {
    if (!file || !editing) return;
    if (file.size > 5 * 1024 * 1024) {
      setMessage("Image must be under 5 MB.");
      return;
    }
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 80);
    const suggestedPath = `/products/${editing.id.toLowerCase() || "new"}-${safeName}`;
    setEditing({
      ...editing,
      images: [...editing.images, suggestedPath],
    });
    setMessage(
      `Added path ${suggestedPath}. Copy your image file to public${suggestedPath} before deploying.`,
    );
  };

  const handleImport = (file: File | null) => {
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      setMessage("JSON file must be under 2 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result)) as Product[];
        if (!Array.isArray(parsed)) throw new Error("Invalid format");
        persist(parsed);
        setMessage(`Imported ${parsed.length} products.`);
      } catch {
        setMessage("Invalid products.json file.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
        <strong>Static site admin:</strong> Changes are stored in your browser
        only. Use <em>Export products.json</em>, replace{" "}
        <code className="rounded bg-amber-100 px-1">data/products.json</code>,
        add images under <code className="rounded bg-amber-100 px-1">public/products/</code>,
        then rebuild and redeploy.
      </div>

      {message ? (
        <p className="rounded-lg bg-sky-50 px-4 py-3 text-sm text-sky-900" role="status">
          {message}
        </p>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => {
            setEditing(createEmptyProduct());
            setMessage("");
          }}
          className="rounded-lg bg-sky-700 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-800"
        >
          Add product
        </button>
        <button
          type="button"
          onClick={() => exportProductsJson(products)}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold hover:bg-slate-50"
        >
          Export products.json
        </button>
        <label className="cursor-pointer rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold hover:bg-slate-50">
          Import JSON
          <input
            type="file"
            accept="application/json"
            className="sr-only"
            onChange={(e) => handleImport(e.target.files?.[0] ?? null)}
          />
        </label>
        <button
          type="button"
          onClick={() => {
            clearAdminStorage();
            setProducts(initialProducts);
            setMessage("Reset to bundled products.json.");
          }}
          className="rounded-lg border border-red-300 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-50"
        >
          Reset to default
        </button>
      </div>

      {editing ? (
        <form
          className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
        >
          <h2 className="md:col-span-2 text-xl font-bold">
            {products.some((p) => p.id === editing.id) ? "Edit" : "Add"} product
          </h2>
          {(
            [
              ["id", "ID", "text"],
              ["name", "Name", "text"],
              ["price", "Price", "number"],
              ["size", "Size", "text"],
              ["shortDescription", "Short description", "text"],
            ] as const
          ).map(([key, label, type]) => (
            <label key={key} className="block text-sm">
              <span className="font-medium text-slate-700">{label}</span>
              <input
                type={type}
                required={key === "id" || key === "name"}
                value={String(editing[key] ?? "")}
                onChange={(e) =>
                  setEditing({
                    ...editing,
                    [key]: type === "number" ? Number(e.target.value) : e.target.value,
                  })
                }
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
              />
            </label>
          ))}
          <label className="block text-sm">
            <span className="font-medium text-slate-700">Category</span>
            <select
              value={editing.category}
              onChange={(e) => setEditing({ ...editing, category: e.target.value })}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
          <label className="flex items-center gap-2 text-sm md:col-span-2">
            <input
              type="checkbox"
              checked={editing.featured}
              onChange={(e) =>
                setEditing({ ...editing, featured: e.target.checked })
              }
            />
            Featured on home page
          </label>
          <label className="block text-sm md:col-span-2">
            <span className="font-medium text-slate-700">Description</span>
            <textarea
              value={editing.description}
              onChange={(e) =>
                setEditing({ ...editing, description: e.target.value.slice(0, 2000) })
              }
              rows={4}
              maxLength={2000}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
            />
          </label>
          <label className="block text-sm md:col-span-2">
            <span className="font-medium text-slate-700">YouTube URL</span>
            <input
              type="url"
              value={editing.youtube ?? ""}
              onChange={(e) => setEditing({ ...editing, youtube: e.target.value })}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
            />
          </label>
          <label className="block text-sm md:col-span-2">
            <span className="font-medium text-slate-700">
              Image paths (one per line, under /products/)
            </span>
            <textarea
              value={editing.images.join("\n")}
              onChange={(e) =>
                setEditing({
                  ...editing,
                  images: e.target.value
                    .split("\n")
                    .map((s) => s.trim())
                    .filter(Boolean)
                    .slice(0, 10),
                })
              }
              rows={3}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-xs"
            />
          </label>
          <label className="block text-sm md:col-span-2">
            <span className="font-medium text-slate-700">Add image path from file</span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageFile(e.target.files?.[0] ?? null)}
              className="mt-1 block w-full text-sm"
            />
          </label>
          <div className="flex gap-3 md:col-span-2">
            <button
              type="submit"
              className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setEditing(null)}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : null}

      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50">
            <tr>
              <th className="px-4 py-3 font-semibold">ID</th>
              <th className="px-4 py-3 font-semibold">Name</th>
              <th className="px-4 py-3 font-semibold">Price</th>
              <th className="px-4 py-3 font-semibold">Category</th>
              <th className="px-4 py-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b border-slate-100">
                <td className="px-4 py-3 font-mono">{p.id}</td>
                <td className="px-4 py-3">{p.name}</td>
                <td className="px-4 py-3">${p.price}</td>
                <td className="px-4 py-3">{p.category}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setEditing({ ...p });
                        setMessage("");
                      }}
                      className="text-sky-700 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(p.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
