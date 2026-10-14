import { NextResponse } from "next/server";

// Same PLATFORM_URL / DOMAIN resolution as lib/pages-api.ts.
const PLATFORM_URL =
  process.env.NEXT_PUBLIC_UPGRADESHOP_API_URL ||
  process.env.NEXT_PUBLIC_PLATFORM_URL ||
  "https://app.upgradeshop.ai";
const DOMAIN = process.env.NEXT_PUBLIC_SITE_DOMAIN || "upgradeshop.ai";

// GET /api/indexnow-key
// Serves the IndexNow API key verification file dynamically by fetching it
// from the platform. This allows IndexNow domain ownership verification
// without committing a static key file to each customer repo.
export async function GET() {
  try {
    const url = `${PLATFORM_URL}/api/public/indexnow-key?domain=${encodeURIComponent(DOMAIN)}`;
    const response = await fetch(url, { next: { revalidate: 3600 } });

    if (!response.ok) {
      return new NextResponse("Not found", { status: 404 });
    }

    const key = await response.text();

    return new NextResponse(key, {
      status: 200,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch {
    return new NextResponse("Internal server error", { status: 500 });
  }
}
