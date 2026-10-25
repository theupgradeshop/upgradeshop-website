/**
 * safeHref — allowlists a button/link field's `metadata.href` (or legacy
 * `metadata.url`) before it reaches a rendered `<a href>`.
 *
 * DB-authored field metadata comes from the dashboard's button config panel
 * (an admin surface), not end-user input — but a careless/compromised owner
 * account, or a future automated writer (AI agent, import script), could
 * still write a `javascript:`/`data:`/`vbscript:` URL, which the browser
 * executes on click. Security review, 2026-09-28 (courses lane, fixing the
 * bundle-cta/-hero secondary CTA's metadata.href wiring).
 *
 * Deliberately an ALLOWLIST, not a blocklist of dangerous schemes: a blocklist
 * only covers the schemes its author thought of (case variants, embedded
 * control characters, etc. are the classic bypasses). Accepted, after trim:
 * relative paths (leading `/`, `#`, `?`; never `//host` or `/\\host`, which are other origins), `http(s)://`, `mailto:`, `tel:`.
 * Anything else — including every unrecognised scheme — falls back to the
 * caller's own default.
 *
 * NOTE: `components/field-renderer.tsx`'s own "button"/"nav_link" cases read
 * `metadata.href`/`metadata.url` the same unguarded way and have the same
 * gap. Deliberately NOT touched here (outside this unit's scope) — filed
 * separately.
 */
export function safeHref(value: unknown, fallback: string): string {
  if (typeof value !== "string") return fallback;
  const trimmed = value.trim();
  if (!trimmed) return fallback;
  // `//host` and `/\host` start with "/" but the browser reads them as another origin (backslash = slash).
  if (/^[/\\]{2}/.test(trimmed.replace(/\\/g, "/"))) return fallback;
  if (/^[/#?]/.test(trimmed)) return trimmed;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  if (/^mailto:/i.test(trimmed)) return trimmed;
  if (/^tel:/i.test(trimmed)) return trimmed;
  return fallback;
}
