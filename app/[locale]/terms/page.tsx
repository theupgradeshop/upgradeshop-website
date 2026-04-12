import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | The Upgrade Shop",
  description: "Terms of service for The Upgrade Shop platform",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background py-24">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-8">
          Terms of Service
        </h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-foreground/80 text-lg mb-8">
            Last updated: January 22, 2026
          </p>

          <section className="mb-12">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              1. Acceptance of Terms
            </h2>
            <p className="text-foreground/80 mb-4">
              By accessing or using The Upgrade Shop platform and services, you
              agree to be bound by these Terms of Service. If you do not agree
              to these terms, please do not use our services.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              2. Description of Service
            </h2>
            <p className="text-foreground/80 mb-4">
              The Upgrade Shop provides website building, CRM, email marketing,
              and WhatsApp integration services. Our platform enables businesses
              to manage their online presence and customer relationships through
              an integrated suite of tools.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              3. Subscription and Payments
            </h2>
            <p className="text-foreground/80 mb-4">
              Our services are provided on a subscription basis. Payment terms
              are specified at the time of purchase. Subscriptions automatically
              renew unless cancelled before the renewal date.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              4. User Responsibilities
            </h2>
            <p className="text-foreground/80 mb-4">
              You are responsible for maintaining the confidentiality of your
              account credentials and for all activities that occur under your
              account. You agree to use our services in compliance with all
              applicable laws and regulations.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              5. Intellectual Property
            </h2>
            <p className="text-foreground/80 mb-4">
              The Upgrade Shop platform and all related content, including but
              not limited to software, text, graphics, and logos, are the
              property of The Upgrade Shop and are protected by copyright and
              other intellectual property laws.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              6. Limitation of Liability
            </h2>
            <p className="text-foreground/80 mb-4">
              The Upgrade Shop shall not be liable for any indirect, incidental,
              special, consequential, or punitive damages resulting from your
              use of or inability to use our services.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              7. Termination
            </h2>
            <p className="text-foreground/80 mb-4">
              We reserve the right to terminate or suspend access to our
              services at any time, with or without notice, for any reason,
              including violation of these Terms of Service.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              8. Changes to Terms
            </h2>
            <p className="text-foreground/80 mb-4">
              We reserve the right to modify these Terms of Service at any time.
              Changes will be effective immediately upon posting. Your continued
              use of our services after changes are posted constitutes
              acceptance of the modified terms.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              9. Contact Information
            </h2>
            <p className="text-foreground/80 mb-4">
              If you have any questions about these Terms of Service, please
              contact us at:
            </p>
            <p className="text-foreground/80">
              Email: hello@upgradeshop.ai
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-foreground/10">
          <a
            href="/"
            className="text-gold hover:text-gold-dark font-medium"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
