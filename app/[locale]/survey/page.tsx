import type { Metadata } from "next";
import { SurveyForm } from "@/components/survey/survey-form";
import { fetchSurveyFormConfig } from "@/lib/survey-form";

export const metadata: Metadata = {
  title: "Help us set our prices | The Upgrade Shop",
  robots: { index: false, follow: false },
};

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ email?: string | string[] }>;
};

export default async function SurveyPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { email } = await searchParams;
  const rawEmail = Array.isArray(email) ? email[0] : email;
  const initialEmail = rawEmail && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(rawEmail) ? rawEmail.slice(0, 254) : undefined;
  const config = await fetchSurveyFormConfig();

  // The survey is in English on both language versions for now.
  return (
    <div className="min-h-screen bg-background py-24" dir="ltr">
      <div className="max-w-2xl mx-auto px-6">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">Help us set our prices</h1>
        <p className="text-lg text-foreground/70 mb-10">
          Two minutes, seven questions. Your answers decide what The Upgrade Shop costs, and everyone who answers is among the first we invite to join as a founder.
        </p>
        {config && config.formId ? (
          <SurveyForm config={config} initialEmail={initialEmail} language={locale} />
        ) : (
          <p className="text-foreground/70">The survey is not open right now. Please check back soon.</p>
        )}
      </div>
    </div>
  );
}
