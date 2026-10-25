/**
 * Link in bio: the dashboard's public read endpoint (`/api/public/marketing-social/bio`) and the
 * normaliser the `/links` page renders from. The site holds no data of its own; the answer is
 * parsed defensively (a field of the wrong shape is dropped, never rendered) because it crosses a
 * service boundary.
 */
import { PLATFORM_URL, DOMAIN } from "@/lib/platform-env";
import { safeCssColor } from "@/lib/safe-css-color";
import { safeHref } from "@/lib/safe-href";
import { siteKeyOnlyHeaders } from "@/lib/site-key-headers";

export const BIO_MARKER = "ush-bio-1";
const FETCH_TIMEOUT_MS = 5000;

export type BioBlockKind =
  | "link"
  | "offer"
  | "course"
  | "form"
  | "whatsapp"
  | "latest_posts"
  | "social_icons";

const KINDS: ReadonlySet<string> = new Set([
  "link",
  "offer",
  "course",
  "form",
  "whatsapp",
  "latest_posts",
  "social_icons",
]);

export interface BioPost {
  imageUrl: string;
  href: string;
}

export interface BioIcon {
  label: string;
  href: string;
  network: string;
}

export interface BioBlock {
  id: string;
  kind: BioBlockKind;
  label: string;
  /** `/l/<code>` (or another safe link) or null when the block is not a link. */
  href: string | null;
  posts: BioPost[];
  icons: BioIcon[];
}

export type BioShape = "square" | "soft" | "pill";

/** The page's overrides of the site's own Brand Hub look. Every value is optional and validated. */
export interface BioLook {
  accent?: string;
  background?: string;
  text?: string;
  shape?: BioShape;
}

export interface BioPage {
  title: string;
  intro: string;
  look: BioLook;
  blocks: BioBlock[];
}

function str(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function record(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as Record<string, unknown>) : null;
}

/** A link target the page may render: relative path, https, mailto or tel; never a script scheme. */
function linkOrNull(value: unknown): string | null {
  const href = safeHref(value, "");
  return href || null;
}

function parseLook(raw: unknown): BioLook {
  const r = record(raw);
  if (!r) return {};
  const look: BioLook = {};
  const accent = safeCssColor(r.accent);
  const background = safeCssColor(r.background);
  const text = safeCssColor(r.text);
  if (accent) look.accent = accent;
  if (background) look.background = background;
  if (text) look.text = text;
  if (r.shape === "square" || r.shape === "soft" || r.shape === "pill") look.shape = r.shape;
  return look;
}

function parsePosts(raw: unknown): BioPost[] {
  if (!Array.isArray(raw)) return [];
  const out: BioPost[] = [];
  for (const item of raw) {
    const r = record(item);
    const imageUrl = r ? str(r.imageUrl) : "";
    const href = r ? linkOrNull(r.href) : null;
    if (imageUrl && /^(https?:\/\/|\/)/i.test(imageUrl) && href) out.push({ imageUrl, href });
  }
  return out;
}

function parseIcons(block: Record<string, unknown>, fallbackHref: string | null, label: string): BioIcon[] {
  const ref = record(block.ref);
  const list = ref && Array.isArray(ref.networks) ? ref.networks : ref && Array.isArray(ref.links) ? ref.links : null;
  if (!list) return fallbackHref ? [{ label, href: fallbackHref, network: "" }] : [];
  const out: BioIcon[] = [];
  for (const item of list) {
    const r = record(item);
    if (!r) continue;
    const href = linkOrNull(r.href ?? r.url);
    const network = str(r.network);
    const iconLabel = str(r.label) || network || label;
    if (href) out.push({ label: iconLabel, href, network });
  }
  return out;
}

/** Normalises the dashboard answer; null when it is not a bio answer carrying our marker. */
export function parseBioAnswer(raw: unknown): BioPage | null {
  const root = record(raw);
  if (!root || root.marker !== BIO_MARKER) return null;
  const page = record(root.page);
  if (!page || !Array.isArray(root.blocks)) return null;
  const blocks: BioBlock[] = [];
  for (const item of root.blocks) {
    const r = record(item);
    if (!r || typeof r.kind !== "string" || !KINDS.has(r.kind)) continue;
    const id = str(r.id);
    if (!id) continue;
    const label = str(r.label);
    const href = linkOrNull(r.href);
    const kind = r.kind as BioBlockKind;
    blocks.push({
      id,
      kind,
      label,
      href,
      posts: kind === "latest_posts" ? parsePosts(r.posts) : [],
      icons: kind === "social_icons" ? parseIcons(r, href, label) : [],
    });
  }
  return { title: str(page.title), intro: str(page.intro), look: parseLook(page.look), blocks };
}

/** Inline CSS variables for the look's overrides; absent keys leave the site's Brand Hub values. */
export function bioLookStyle(look: BioLook): Record<string, string> {
  const style: Record<string, string> = {};
  if (look.accent) style["--bio-accent"] = look.accent;
  if (look.background) style["--bio-bg"] = look.background;
  if (look.text) style["--bio-text"] = look.text;
  return style;
}

export function bioShapeRadius(shape: BioShape | undefined): string {
  if (shape === "square") return "0";
  if (shape === "pill") return "9999px";
  return "var(--radius, 0.75rem)";
}

/**
 * The bio answer for this site's host. Null on a 404 (unpublished or unknown page), a transport
 * failure or an answer without our marker: the page then answers with the site's normal 404.
 * The read writes and counts nothing, so it sends only `x-service-key` (COURSES_SERVICE_KEY, server-only), never the
 * visitor IP: the page stays one shared ISR read and the dashboard limits it per site.
 */
export async function fetchBioPage(): Promise<BioPage | null> {
  if (!DOMAIN) return null;
  const url = `${PLATFORM_URL.replace(/\/+$/, "")}/api/public/marketing-social/bio?host=${encodeURIComponent(DOMAIN)}`;
  try {
    const res = await fetch(url, { headers: siteKeyOnlyHeaders(), next: { revalidate: 60 }, signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) });
    if (!res.ok) return null;
    return parseBioAnswer(await res.json());
  } catch {
    return null;
  }
}
