"use client";

import { useEffect } from "react";
import { normalizeCouponCode, savePendingCoupon } from "@/lib/coupon-link";

/**
 * Coupon-in-link capture. Mounted once in the root layout; renders nothing.
 * `?coupon=CODE` on any page is parked as the pending coupon (the checkout applies it) and the param
 * is stripped from the address bar. Reads `window.location`, never `useSearchParams` (a global
 * client component using it breaks static prerender).
 * Does nothing on /preview* or inside an iframe (the page editor).
 */
export function CouponLinkCapture() {
  useEffect(() => {
    try {
      if (window.location.pathname.startsWith("/preview")) return;
      let inIframe = false;
      try {
        inIframe = window.self !== window.top;
      } catch {
        inIframe = true;
      }
      if (inIframe) return;

      const url = new URL(window.location.href);
      if (!url.searchParams.has("coupon")) return;

      const code = normalizeCouponCode(url.searchParams.get("coupon"));
      if (code) savePendingCoupon(code);

      url.searchParams.delete("coupon");
      const search = url.searchParams.toString();
      const target = `${url.pathname}${search ? `?${search}` : ""}${url.hash}`;
      // Deferred so it runs after Next's patched history is installed on the first mount.
      // The code is already saved above.
      setTimeout(() => {
        try {
          window.history.replaceState(window.history.state, "", target);
        } catch {
          /* ignore */
        }
      }, 0);
    } catch {
      /* never break the page over a coupon link */
    }
  }, []);

  return null;
}
