export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export const MAX_CART_QUANTITY = 99;
export const MAX_CART_LINE_ITEMS = 20;
export const CART_STORAGE_KEY = "veltosports-cart";
