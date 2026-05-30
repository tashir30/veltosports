"use client";

import type { Product, SiteConfig } from "@/types/product";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { buildWhatsAppOrderUrl } from "@/utils/whatsapp";

interface ProductPurchaseActionsProps {
  product: Product;
  site: SiteConfig;
}

export function ProductPurchaseActions({
  product,
  site,
}: ProductPurchaseActionsProps) {
  const orderUrl = buildWhatsAppOrderUrl(site.whatsappPhone, product);

  return (
    <div className="mt-8 space-y-4">
      <AddToCartButton product={product} />
      <div className="flex items-center gap-3">
        <span className="text-sm text-slate-500">or</span>
        <WhatsAppButton href={orderUrl} label="Order" variant="outline" />
        <span className="text-xs text-slate-400">single item, qty 1</span>
      </div>
    </div>
  );
}
