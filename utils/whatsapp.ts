import type { CartItem } from "@/types/cart";
import type { Product } from "@/types/product";
import { formatPrice } from "@/utils/products";

const MAX_PRODUCT_NAME_LENGTH = 120;
const MAX_PRODUCT_ID_LENGTH = 32;
const MAX_WHATSAPP_URL_LENGTH = 1800;

function sanitizeProductField(value: string, maxLength: number): string {
  const trimmed = value.trim().slice(0, maxLength);
  return trimmed.replace(/[\r\n<>]/g, "");
}

function buildWaMeUrl(phone: string, message: string): string {
  const digitsOnly = phone.replace(/\D/g, "").slice(0, 20);
  const encoded = encodeURIComponent(message);
  const url = `https://wa.me/${digitsOnly}?text=${encoded}`;
  if (url.length > MAX_WHATSAPP_URL_LENGTH) {
    return `https://wa.me/${digitsOnly}`;
  }
  return url;
}

export function buildWhatsAppOrderUrl(
  phone: string,
  product: Pick<Product, "id" | "name">,
): string {
  const safeName = sanitizeProductField(product.name, MAX_PRODUCT_NAME_LENGTH);
  const safeId = sanitizeProductField(product.id, MAX_PRODUCT_ID_LENGTH);
  const message = `Hi, I want to order ${safeName} (ID:${safeId})`;
  return buildWaMeUrl(phone, message);
}

export function buildWhatsAppCartOrderUrl(
  phone: string,
  items: CartItem[],
  currency: string,
): string {
  if (items.length === 0) {
    return buildGeneralWhatsAppUrl(phone);
  }

  const lines = items.map((item) => {
    const safeName = sanitizeProductField(item.name, MAX_PRODUCT_NAME_LENGTH);
    const safeId = sanitizeProductField(item.productId, MAX_PRODUCT_ID_LENGTH);
    const lineTotal = formatPrice(item.price * item.quantity, currency);
    return `• ${safeName} (ID:${safeId}) x ${item.quantity} — ${lineTotal}`;
  });

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const message = [
    "Hi, I would like to order:",
    "",
    ...lines,
    "",
    `Estimated total: ${formatPrice(total, currency)}`,
  ].join("\n");

  return buildWaMeUrl(phone, message);
}

export function buildGeneralWhatsAppUrl(phone: string): string {
  return buildWaMeUrl(phone, "Hi, I'd like to know more about your kites.");
}
