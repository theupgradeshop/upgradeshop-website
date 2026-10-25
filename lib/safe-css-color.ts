/**
 * Safe inline colour values for editor-written `metadata.color` (icon) and
 * `metadata.iconColor` (icon_list). The page editor writes `var(--brand-color-<name>)` for a
 * brand swatch and `#rrggbb` for a custom colour; "Default" removes the key. Anything else is
 * ignored (returns undefined) so a hand-edited or corrupted value can never inject CSS.
 */
const HEX = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
const BRAND_VAR = /^var\(--brand-color-[A-Za-z0-9-]+\)$/;
const KEYWORD = /^(?:transparent|currentcolor)$/i;

/** The colour string when it is safe to apply as an inline `color`, otherwise undefined. */
export function safeCssColor(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const v = value.trim();
  if (!v) return undefined;
  if (HEX.test(v) || BRAND_VAR.test(v) || KEYWORD.test(v)) return v;
  return undefined;
}

/** `{ color }` for an inline style, or undefined when the key is absent/unsafe (no style attribute). */
export function colorStyle(value: unknown): { color: string } | undefined {
  const color = safeCssColor(value);
  return color ? { color } : undefined;
}
