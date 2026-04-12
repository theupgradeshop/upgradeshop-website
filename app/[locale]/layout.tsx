import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CartProvider } from "@/components/cart/cart-provider";
import { ScrollListener } from "@/components/scroll-listener";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "he")) {
    notFound();
  }

  const messages = await getMessages();
  const dir = locale === "he" ? "rtl" : "ltr";

  return (
    <div dir={dir}>
      <NextIntlClientProvider messages={messages}>
        <CartProvider>
          <ScrollListener />
          <div id="site-header">
            <Header />
          </div>
          <main className="flex-1">{children}</main>
          <div id="site-footer">
            <Footer />
          </div>
        </CartProvider>
      </NextIntlClientProvider>
    </div>
  );
}
