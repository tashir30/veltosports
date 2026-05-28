"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { SiteConfig } from "@/types/product";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/catalog/", label: "Catalog" },
  { href: "/categories/", label: "Categories" },
];

interface HeaderProps {
  site: SiteConfig;
}

export function Header({ site }: HeaderProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src={site.logo}
            alt={`${site.businessName} logo`}
            width={44}
            height={44}
            className="h-11 w-11"
          />
          <div className="hidden sm:block">
            <span className="block text-lg font-bold text-slate-900">
              {site.businessName}
            </span>
            <span className="block text-xs text-sky-700">{site.tagline}</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Main">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition hover:text-sky-700 ${
                link.href === "/"
                  ? pathname === "/"
                  : pathname?.startsWith(link.href)
                    ? "text-sky-700"
                    : "text-slate-700"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="inline-flex rounded-lg p-2 text-slate-700 hover:bg-slate-100 md:hidden"
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
                  className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
