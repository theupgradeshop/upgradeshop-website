import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-url";
import { isStagingDeployment } from "@/lib/staging-robots";

export default function robots(): MetadataRoute.Robots {
  if (isStagingDeployment()) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
