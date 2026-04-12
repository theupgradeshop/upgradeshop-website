import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PaymentPageCheckout } from "@/components/payment-pages/payment-page-checkout";
import { HideChrome } from "@/components/payment-pages/hide-chrome";

const PLATFORM_URL = process.env.NEXT_PUBLIC_UPGRADESHOP_API_URL || "https://app.staging.upgradeshop.ai";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://anahata.staging.upgradeshop.ai";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function fetchPaymentPage(slug: string) {
  try {
    const domain = new URL(SITE_URL).hostname;
    const response = await fetch(
      `${PLATFORM_URL}/api/public/payment-pages/${slug}?domain=${domain}`,
      {
        next: { revalidate: 60 }, // ISR with 60 second revalidation
      }
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.found ? data.paymentPage : null;
  } catch (error) {
    console.error("Error fetching payment page:", error);
    return null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const paymentPage = await fetchPaymentPage(slug);

  if (!paymentPage) {
    return {
      title: "Payment Page Not Found",
    };
  }

  return {
    title: paymentPage.title,
    description: paymentPage.description || `Checkout for ${paymentPage.title}`,
  };
}

export default async function PaymentPagePage({ params }: PageProps) {
  const { slug } = await params;
  const paymentPage = await fetchPaymentPage(slug);

  if (!paymentPage) {
    notFound();
  }

  return (
    <div className="bg-background">
      <HideChrome
        hideHeader={paymentPage.hideHeader ?? true}
        hideFooter={paymentPage.hideFooter ?? true}
      />
      <div className="max-w-[1280px] mx-auto px-4 pt-16 pb-8">
        <PaymentPageCheckout paymentPage={paymentPage} slug={slug} />
      </div>
    </div>
  );
}
