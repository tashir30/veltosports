/**
 * Serialize JSON-LD for safe embedding in a <script type="application/ld+json"> tag.
 * Neutralizes script breakouts (e.g. "</script>" in string values).
 */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}
