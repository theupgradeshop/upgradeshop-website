import { NextResponse, type NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

// /pricing and the priced /products/* pages are retired while the site is a holding page
// (2026-09-30); the new site brings /pricing back. Permanent 301 (next.config redirects
// would send 308) to the homepage of the same locale.
const RETIRED = /^\/(?:(en|he)\/)?(?:pricing|products(?:\/[^/]+)?)\/?$/;

// Checkout and payment pages stay reachable (shared payment links may exist) but are
// kept out of search results.
const NOINDEX = /^\/(?:(?:en|he)\/)?(?:checkout|pay)(?:\/|$)/;

export default function middleware(request: NextRequest) {
  const match = RETIRED.exec(request.nextUrl.pathname);
  if (match) {
    const url = request.nextUrl.clone();
    url.pathname = match[1] === "he" ? "/he" : "/";
    url.search = "";
    url.hash = "";
    return NextResponse.redirect(url, 301);
  }
  const response = intlMiddleware(request);
  if (NOINDEX.test(request.nextUrl.pathname)) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }
  return response;
}

export const config = {
  matcher: [
    "/",
    "/(he|en)/:path*",
    "/((?!api|_next|images|fonts|favicon|.*\\..*).*)",
  ],
};
