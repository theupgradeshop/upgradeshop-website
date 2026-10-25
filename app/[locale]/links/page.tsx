import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Globe, Mail, MessageCircle } from "lucide-react";
import {
  bioLookStyle,
  bioShapeRadius,
  fetchBioPage,
  type BioBlock,
  type BioIcon,
  type BioPage,
} from "@/lib/bio-page";

// Lives under [locale]: the next-intl middleware rewrites /links to /en/links. What is shared across visitors is the
// dashboard read: fetchBioPage uses fetch with next: { revalidate: 60 } and a constant
// x-service-key (no per-visitor header), so the Data Cache serves one entry for 60 s.
export const revalidate = 60;

// The dashboard's probe looks for exactly this tag to learn the site carries the Link in bio page.
export async function generateMetadata(): Promise<Metadata> {
  const bio = await fetchBioPage();
  return {
    title: bio?.title || undefined,
    description: bio?.intro || undefined,
    other: { "ush-bio": "1" },
  };
}

function IconFor({ network }: { network: string }) {
  const n = network.toLowerCase();
  if (n === "email" || n === "mail") return <Mail aria-hidden="true" className="h-5 w-5" />;
  if (n === "whatsapp") return <MessageCircle aria-hidden="true" className="h-5 w-5" />;
  return <Globe aria-hidden="true" className="h-5 w-5" />;
}

const BUTTON_CLASS =
  "t-button block w-full px-5 py-3.5 text-center font-medium transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";
const BUTTON_STYLE = {
  background: "var(--bio-accent, hsl(var(--primary)))",
  color: "hsl(var(--primary-foreground))",
  borderRadius: "var(--bio-radius)",
  outlineColor: "var(--bio-accent, hsl(var(--primary)))",
} as const;

function SocialIcons({ icons }: { icons: BioIcon[] }) {
  if (icons.length === 0) return null;
  return (
    <ul className="flex flex-wrap justify-center gap-3">
      {icons.map((icon) => (
        <li key={`${icon.network}-${icon.href}`}>
          <a
            href={icon.href}
            aria-label={icon.label}
            title={icon.label}
            className="flex h-11 w-11 items-center justify-center border transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{
              borderColor: "var(--bio-accent, hsl(var(--primary)))",
              color: "var(--bio-accent, hsl(var(--primary)))",
              borderRadius: "var(--bio-radius)",
            }}
          >
            <IconFor network={icon.network} />
          </a>
        </li>
      ))}
    </ul>
  );
}

function LatestPosts({ block }: { block: BioBlock }) {
  if (block.posts.length === 0) return null;
  return (
    <section aria-label={block.label || undefined}>
      {block.label && <h2 className="t-subheading mb-3 text-start">{block.label}</h2>}
      <ul className="grid grid-cols-3 gap-2">
        {block.posts.map((post, i) => (
          <li key={`${post.href}-${i}`}>
            <a
              href={post.href}
              className="block overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{ borderRadius: "calc(var(--bio-radius) / 2)", outlineColor: "var(--bio-accent, hsl(var(--primary)))" }}
            >
              {/* A plain <img>: the URLs are the owner's remote post images, not site assets. */}
              <img
                src={post.imageUrl}
                alt={`${block.label} ${i + 1}`.trim()}
                width={320}
                height={320}
                loading="lazy"
                className="aspect-square w-full object-cover"
              />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Block({ block }: { block: BioBlock }) {
  if (block.kind === "latest_posts") return <LatestPosts block={block} />;
  if (block.kind === "social_icons") return <SocialIcons icons={block.icons} />;
  if (!block.href) {
    return block.label ? <h2 className="t-subheading text-start">{block.label}</h2> : null;
  }
  return (
    <a href={block.href} className={BUTTON_CLASS} style={BUTTON_STYLE}>
      {block.label || block.href}
    </a>
  );
}

function BioContent({ bio }: { bio: BioPage }) {
  const style = {
    ...bioLookStyle(bio.look),
    "--bio-radius": bioShapeRadius(bio.look.shape),
    background: "var(--bio-bg, hsl(var(--background)))",
    color: "var(--bio-text, hsl(var(--foreground)))",
  } as React.CSSProperties;
  return (
    <div style={style} className="min-h-[70vh] px-4 py-10">
      <div className="mx-auto flex w-full max-w-md flex-col gap-6">
        <header className="text-center">
          {bio.title && <h1 className="t-heading mb-2">{bio.title}</h1>}
          {bio.intro && <p className="t-body">{bio.intro}</p>}
        </header>
        <ul className="flex flex-col gap-4">
          {bio.blocks.map((block) => (
            <li key={block.id}>
              <Block block={block} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default async function LinksPage() {
  const bio = await fetchBioPage();
  if (!bio) notFound();
  // The [locale] layout already renders the header, <main> and footer (the template's SiteShell).
  return <BioContent bio={bio} />;
}
