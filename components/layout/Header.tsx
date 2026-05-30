"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { BrandLogo } from "@/components/shared/BrandLogo";
import type { SiteConfig } from "@/types/product";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/catalog/", label: "Catalog" },
  { href: "/categories/", label: "Categories" },
  { href: "/cart/", label: "Cart" },
];

interface HeaderProps {
  site: SiteConfig;
}

function CartIcon({ count }: { count: number }) {
  return (
    <span className="relative inline-flex">
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
      {count > 0 ? (
        <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-orange px-1 text-[10px] font-bold text-white">
          {count > 99 ? "99+" : count}
        </span>
      ) : null}
    </span>
  );
}

export function Header({ site }: HeaderProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemCount, hydrated } = useCart();
  const cartCount = hydrated ? itemCount : 0;

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-2.5">
          <BrandLogo size="sm" className="shrink-0" />
          <span className="hidden truncate text-xs font-medium text-brand-orange sm:block sm:max-w-[10rem] md:max-w-xs">
            {site.tagline}
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Main">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-semibold uppercase tracking-wide transition hover:text-brand-orange ${
                link.href === "/"
                  ? pathname === "/"
                  : pathname?.startsWith(link.href)
                    ? "text-brand-orange"
                    : "text-slate-700"
              }`}
            >
              {link.label === "Cart" ? (
                <span className="inline-flex items-center gap-1.5">
                  Cart
                  {cartCount > 0 ? (
                    <span className="rounded-full bg-brand-orange px-1.5 py-0.5 text-[10px] font-bold text-white">
                      {cartCount}
                    </span>
                  ) : null}
                </span>
              ) : (
                link.label
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 md:hidden">
          <Link
            href="/cart/"
            className="relative rounded-lg p-2 text-slate-700 hover:bg-slate-100"
            aria-label={`Cart${cartCount > 0 ? `, ${cartCount} items` : ""}`}
          >
            <CartIcon count={cartCount} />
          </Link>
          <button
            type="button"
            className="inline-flex rounded-lg p-2 text-slate-700 hover:bg-slate-100"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span className="sr-only">Toggle menu</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen ? (
        <nav
          id="mobile-menu"
          className="border-t border-slate-200 px-4 py-3 md:hidden"
          aria-label="Mobile"
        >
          <ul className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                  {link.href === "/cart/" && cartCount > 0 ? (
                    <span className="rounded-full bg-brand-orange px-2 py-0.5 text-xs font-bold text-white">
                      {cartCount}
                    </span>
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
