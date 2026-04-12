import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | The Upgrade Shop",
  description: "Privacy policy for The Upgrade Shop platform",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background py-24">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-8">
          Privacy Policy
        </h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-foreground/80 text-lg mb-8">
            Last updated: January 22, 2026
          </p>

          <section className="mb-12">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              1. Information We Collect
            </h2>
            <p className="text-foreground/80 mb-4">
              We collect information that you provide directly to us when you
              create an account, make a purchase, or use our services. This may
              include:
            </p>
            <ul className="list-disc list-inside text-foreground/80 mb-4 space-y-2">
              <li>Name and contact information (email, phone number)</li>
              <li>Company information</li>
              <li>Payment information</li>
              <li>Website content and data you create using our services</li>
              <li>Usage data and analytics</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              2. How We Use Your Information
            </h2>
            <p className="text-foreground/80 mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside text-foreground/80 mb-4 space-y-2">
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>Send technical notices and support messages</li>
              <li>Respond to your comments and questions</li>
              <li>Monitor and analyze usage patterns and trends</li>
              <li>Detect and prevent fraud and abuse</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              3. Information Sharing
            </h2>
            <p className="text-foreground/80 mb-4">
              We do not sell or rent your personal information to third parties.
              We may share your information with:
            </p>
            <ul className="list-disc list-inside text-foreground/80 mb-4 space-y-2">
              <li>Service providers who assist in operating our platform</li>
              <li>Payment processors to handle transactions</li>
              <li>
                Law enforcement or regulatory authorities when required by law
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              4. Data Security
            </h2>
            <p className="text-foreground/80 mb-4">
              We implement appropriate technical and organizational measures to
              protect your personal information against unauthorized access,
              alteration, disclosure, or destruction. This includes encryption,
              access controls, and secure data storage.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              5. Payment Information
            </h2>
            <p className="text-foreground/80 mb-4">
              Payment information is processed by our secure payment gateway
              partners (SUMIT and others). We do not store full credit card
              details on our servers. Payment tokens are encrypted and stored
              securely for recurring billing purposes.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              6. Cookies and Tracking
            </h2>
            <p className="text-foreground/80 mb-4">
              We use cookies and similar tracking technologies to collect usage
              information and improve our services. You can control cookies
              through your browser settings, though this may affect
              functionality.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              7. Your Rights
            </h2>
            <p className="text-foreground/80 mb-4">
              You have the right to:
            </p>
            <ul className="list-disc list-inside text-foreground/80 mb-4 space-y-2">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Object to processing of your information</li>
              <li>Export your data</li>
            </ul>
            <p className="text-foreground/80 mb-4">
              To exercise these rights, please contact us at hello@upgradeshop.ai
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              8. Data Retention
            </h2>
            <p className="text-foreground/80 mb-4">
              We retain your information for as long as necessary to provide our
              services and comply with legal obligations. When you cancel your
              account, we will delete or anonymize your information, except
              where retention is required by law.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              9. International Transfers
            </h2>
            <p className="text-foreground/80 mb-4">
              Your information may be transferred to and processed in countries
              other than your country of residence. We ensure appropriate
              safeguards are in place to protect your information.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              10. Changes to This Policy
            </h2>
            <p className="text-foreground/80 mb-4">
              We may update this Privacy Policy from time to time. We will
              notify you of significant changes by posting a notice on our
              website or sending you an email.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              11. Contact Us
            </h2>
            <p className="text-foreground/80 mb-4">
              If you have questions about this Privacy Policy or our data
              practices, please contact us at:
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
