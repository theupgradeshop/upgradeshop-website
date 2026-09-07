import { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchProductsFromDB } from "@/lib/db-products";
import { enrichWithStaticData } from "@/lib/fetch-products";
import { allProducts } from "@/lib/products";
import { getProductContent } from "@/lib/product-content";
import ProductPageClient from "./product-page-client";
import WebsiteProductPage from "./website-product-page";
import AiAgentProductPage from "./ai-agent-product-page";

export const revalidate = 60;

// No generateStaticParams here, deliberately.
//
// It used to export one for [slug], which made Next attempt STATIC generation of
// this route. It could never succeed: [locale] has no generateStaticParams, so no
// concrete page was ever prerendered (the prerender-manifest listed this route
// with zero pages). What it did instead was make every on-demand render run in a
// static context — where app/[locale]/layout.tsx's getMessages() call, a
// next-intl server API, needs request scope and throws.
//
// Result: EVERY slug returned 500 with digest DYNAMIC_SERVER_USAGE, including
// slugs that should have 404'd, on staging AND production. Sibling routes
// (/[locale], /[locale]/pricing) export no generateStaticParams, render
// dynamically, and have always worked.
//
// Removing it costs nothing — the static generation it requested never happened —
// and restores parity with those siblings.
//
// The fuller fix, if this route should genuinely be static one day, is the
// documented next-intl setup: generateStaticParams for [locale] plus
// setRequestLocale(locale) in the layout and in every page beneath it. That
// touches every page on the site and is a separate piece of work.

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const content = getProductContent(slug);
  const product = allProducts.find((p) => p.slug === slug);

  if (!content) {
    return { title: "Product Not Found | The Upgrade Shop" };
  }

  const name = slug === "website"
    ? "Professional Website"
    : slug === "ai-agent"
    ? "AI Agent"
    : (product?.name || slug);
  const description = slug === "ai-agent"
    ? content.overviewParagraphs[0]
    : (product?.description || content.overviewParagraphs[0]);

  return {
    title: `${name} | The Upgrade Shop`,
    description,
    openGraph: {
      title: `${name} | The Upgrade Shop`,
      description,
      url: `https://upgradeshop.ai/products/${slug}`,
      siteName: "The Upgrade Shop",
      type: "website",
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const content = getProductContent(slug);

  if (!content) {
    notFound();
  }

  // Fetch from DB (source of truth) and enrich with static features
  const dbProducts = await fetchProductsFromDB();
  const enrichedProducts = enrichWithStaticData(dbProducts);

  // Find this product - DB first, static fallback
  const product = enrichedProducts.find((p) => p.slug === slug) ||
    allProducts.find((p) => p.slug === slug);

  if (!product && slug !== "website" && slug !== "ai-agent") {
    notFound();
  }

  // Dedicated AI Agent product page
  if (slug === "ai-agent") {
    const aiAgentProduct = enrichedProducts.find(
      (p) => p.slug === "ai-agent"
    ) || product || null;

    return <AiAgentProductPage aiAgentProduct={aiAgentProduct} />;
  }

  // Dedicated Website product page
  if (slug === "website") {
    const addonProducts = enrichedProducts.filter(
      (p) => p.category === "website-addon"
    );

    return (
      <WebsiteProductPage
        addonProducts={addonProducts}
        websiteVariants={[]}
      />
    );
  }

  // Get related products - DB first, static fallback
  const relatedProducts = content.relatedSlugs
    .map((rs) => {
      if (rs === "website") return null; // Website is a service, not a product card
      return enrichedProducts.find((p) => p.slug === rs) || allProducts.find((p) => p.slug === rs);
    })
    .filter(Boolean) as typeof allProducts;

  return (
    <ProductPageClient
      product={product || null}
      content={content}
      relatedProducts={relatedProducts}
      isWebsiteService={false}
      serviceName={undefined}
      websiteTiers={undefined}
      websiteFeatures={undefined}
    />
  );
}
