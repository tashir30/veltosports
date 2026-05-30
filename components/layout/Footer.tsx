import Link from "next/link";
import type { SiteConfig } from "@/types/product";
import { buildGeneralWhatsAppUrl } from "@/utils/whatsapp";

interface FooterProps {
  site: SiteConfig;
}

export function Footer({ site }: FooterProps) {
  const whatsappUrl = buildGeneralWhatsAppUrl(site.whatsappPhone);
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t-4 border-brand-orange bg-brand-navy text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <p className="font-display text-lg font-bold uppercase tracking-wide text-white">{site.businessName}</p>
          <p className="mt-2 text-sm">{site.tagline}</p>
        </div>
        <div>
          <p className="font-semibold text-white">Explore</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/catalog/" className="hover:text-white">
                Product Catalog
              </Link>
            </li>
            <li>
              <Link href="/categories/" className="hover:text-white">
                Categories
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-white">Connect</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a
                href={site.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                Instagram {site.instagramHandle}
              </a>
            </li>
            <li>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                WhatsApp
              </a>
            </li>
            {site.email ? (
              <li>
                <a href={`mailto:${site.email}`} className="hover:text-white">
                  {site.email}
                </a>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-800 py-4 text-center text-xs text-slate-500">
        © {year} {site.businessName}. All rights reserved.
      </div>
    </footer>
  );
}
