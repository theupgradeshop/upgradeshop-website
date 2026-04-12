import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  allowedDevOrigins: ["staging.upgradeshop.ai"],
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Frame-Options",
            value: "ALLOW-FROM https://app.upgradeshop.ai",
          },
          {
            key: "Content-Security-Policy",
            value:
              "frame-ancestors 'self' https://app.upgradeshop.ai https://app.staging.upgradeshop.ai",
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
