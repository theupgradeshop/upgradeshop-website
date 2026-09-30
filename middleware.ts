import { NextResponse, type NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

// /pricing is retired while the site is a holding page (2026-09-30); the new site brings it back.
// Permanent 301 (next.config redirects would send 308) to the homepage of the same locale.
const PRICING = /^\/(?:(en|he)\/)?pricing\/?$/;

export default function middleware(request: NextRequest) {
  const match = PRICING.exec(request.nextUrl.pathname);
  if (match) {
    const url = request.nextUrl.clone();
    url.pathname = match[1] === "he" ? "/he" : "/";
    url.search = "";
    url.hash = "";
    return NextResponse.redirect(url, 301);
  }
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    "/",
    "/(he|en)/:path*",
    "/((?!api|_next|images|fonts|favicon|.*\\..*).*)",
  ],
};
