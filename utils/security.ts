import type { SortOption } from "@/types/product";

const ASSET_PATH_PATTERN = /^\/(?:products\/[a-zA-Z0-9._-]+|logo\.svg)$/;

const SORT_OPTIONS: readonly SortOption[] = [
  "latest",
  "price-asc",
  "price-desc",
];

export function isAllowedAssetPath(path: string): boolean {
  return ASSET_PATH_PATTERN.test(path);
}

export function sanitizeAssetPath(
  path: string | undefined,
  fallback = "/products/placeholder.svg",
): string {
  if (path && isAllowedAssetPath(path)) {
    return path;
  }
  return fallback;
}

export function parseSortOption(value: string): SortOption {
  return SORT_OPTIONS.includes(value as SortOption)
    ? (value as SortOption)
    : "latest";
}

export function isSafeHttpsUrl(
  url: string,
  allowedHosts?: readonly string[],
): boolean {
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:") return false;
    if (allowedHosts && !allowedHosts.includes(parsed.hostname)) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}
