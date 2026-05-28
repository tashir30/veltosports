import type { Product } from "@/types/product";

const MAX_PRODUCT_NAME_LENGTH = 120;
const MAX_PRODUCT_ID_LENGTH = 32;

function sanitizeProductField(value: string, maxLength: number): string {
  const trimmed = value.trim().slice(0, maxLength);
  return trimmed.replace(/[\r\n<>]/g, "");
}

export function buildWhatsAppOrderUrl(
  phone: string,
  product: Pick<Product, "id" | "name">,
): string {
  const digitsOnly = phone.replace(/\D/g, "").slice(0, 20);
  const safeName = sanitizeProductField(product.name, MAX_PRODUCT_NAME_LENGTH);
  const safeId = sanitizeProductField(product.id, MAX_PRODUCT_ID_LENGTH);
  const message = `Hi, I want to order ${safeName} (ID:${safeId})`;
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${digitsOnly}?text=${encoded}`;
}

export function buildGeneralWhatsAppUrl(phone: string): string {
  const digitsOnly = phone.replace(/\D/g, "").slice(0, 20);
  const message = encodeURIComponent("Hi, I'd like to know more about your kites.");
  return `https://wa.me/${digitsOnly}?text=${message}`;
}
