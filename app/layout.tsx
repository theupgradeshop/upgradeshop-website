import type { Metadata } from "next";
import { Newsreader, Anton } from "next/font/google";
import "./globals.css";
import { fetchWebsiteConfig } from "@/lib/analytics-api";
import { SITE_URL } from "@/lib/site-url";

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const websiteConfig = await fetchWebsiteConfig();

  return {
    metadataBase: new URL(SITE_URL),
    title: "The Upgrade Shop",
    verification: websiteConfig?.googleSiteVerification
      ? { google: websiteConfig.googleSiteVerification }
      : undefined,
    icons: {
      icon: "/images/brand/logo/logo_webp/v2_icon_on_black_-_no_bg_-_favicon-tight.webp",
      apple:
        "/images/brand/logo/logo_webp/v2_icon_on_black_-_no_bg_-_favicon-tight.webp",
    },
    openGraph: {
      title: "The Upgrade Shop",
      siteName: "The Upgrade Shop",
      type: "website",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${newsreader.variable} ${anton.variable}`}>
      <body className="font-sans antialiased min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
