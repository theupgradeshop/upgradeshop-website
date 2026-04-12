import { fetchPageSections } from "@/lib/pages-api";
import { PreviewBanner } from "@/components/preview-banner";
import { HeroSection } from "@/components/sections/hero-section";
import { ProblemSection } from "@/components/sections/problem-section";
import { SolutionSection } from "@/components/sections/solution-section";
import { WebsiteCalloutSection } from "@/components/sections/website-callout-section";
import { CapabilitiesSection } from "@/components/sections/capabilities-section";
import { ImprovementSection } from "@/components/sections/improvement-section";
import { HowItWorksSection } from "@/components/sections/how-it-works-section";
import { PricingPreviewSection } from "@/components/sections/pricing-preview-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { ExamplesSection } from "@/components/sections/examples-section";
import { FAQSection } from "@/components/sections/faq-section";
import { FinalCTASection } from "@/components/sections/final-cta-section";

// ISR: Revalidate every 60 seconds
export const revalidate = 60;

export default async function HomePage({ searchParams }: { searchParams: Promise<{ preview?: string }> }) {
  const { preview } = await searchParams;
  // Fetch page sections from CMS with fallback
  const data = await fetchPageSections("home", preview);
  const sections = data?.sections || [];

  return (
    <main>
      {data?.preview && preview && <PreviewBanner token={preview} />}

      {/* Hero - Immediate emotional connection + core promise */}
      <HeroSection sections={sections} />

      {/* Problem - Build empathy, acknowledge their pain */}
      <ProblemSection sections={sections} />

      {/* Solution - Introduce The Upgrade Shop as the third option */}
      <SolutionSection sections={sections} />

      {/* Website Callout - Two tracks, no editor, AI-managed */}
      <WebsiteCalloutSection sections={sections} />

      {/* Capabilities - Show the full ecosystem */}
      <CapabilitiesSection sections={sections} />

      {/* Continuous Improvement - Differentiate from static software */}
      <ImprovementSection sections={sections} />

      {/* How It Works - Reduce friction, show simplicity */}
      <HowItWorksSection sections={sections} />

      {/* Pricing Preview - Transparency + conversion */}
      <PricingPreviewSection sections={sections} />

      {/* Testimonials - Build trust (placeholder for now) */}
      <TestimonialsSection sections={sections} />

      {/* Examples - Show real results (placeholder for now) */}
      <ExamplesSection sections={sections} />

      {/* FAQ - Address objections */}
      <FAQSection sections={sections} />

      {/* Final CTA - Convert */}
      <FinalCTASection sections={sections} />
    </main>
  );
}
