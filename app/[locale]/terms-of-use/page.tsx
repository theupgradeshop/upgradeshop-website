import { Metadata } from "next";
import { Container } from "@/components/layout/container";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Use - The Upgrade Shop",
  description: "Terms of Use for The Upgrade Shop platform. Understand your rights and responsibilities when using our service.",
};

export default function TermsOfUsePage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="py-20 md:py-28">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Terms of Use
            </h1>
            <p className="text-foreground/60 mb-8">
              Last Updated: January 29, 2026
            </p>

            <div className="prose prose-lg max-w-none">
              <div className="space-y-8 text-foreground/80">
                {/* Introduction */}
                <section>
                  <h2 className="font-display text-2xl font-normal text-foreground mb-4">
                    1. Acceptance of Terms
                  </h2>
                  <p className="leading-relaxed">
                    Welcome to The Upgrade Shop. These Terms of Use (&quot;Terms&quot;) govern
                    your access to and use of the upgradeshop.ai platform (the &quot;Platform&quot;),
                    including all websites, applications, content, products, and services
                    (&quot;Services&quot;) offered by The Upgrade Shop (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;).
                  </p>
                  <p className="leading-relaxed mt-4">
                    By accessing or using our Platform, you agree to be bound by these Terms and
                    our Privacy Policy. If you do not agree to these Terms, you may not access or
                    use our Services.
                  </p>
                </section>

                {/* Description of Service */}
                <section>
                  <h2 className="font-display text-2xl font-normal text-foreground mb-4">
                    2. Description of Service
                  </h2>
                  <p className="leading-relaxed">
                    The Upgrade Shop provides an AI-powered website building and management
                    platform that enables businesses to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 mt-3 ml-4">
                    <li>Create and host professional websites and landing pages</li>
                    <li>Manage website content through an intuitive dashboard</li>
                    <li>Access AI-powered content generation and optimization tools</li>
                    <li>Integrate with third-party services (Google Analytics, Search Console, etc.)</li>
                    <li>Manage customer relationships through our CRM system</li>
                    <li>Track website analytics and performance metrics</li>
                    <li>Access additional modules and add-ons as subscribed</li>
                  </ul>
                  <p className="leading-relaxed mt-4">
                    We reserve the right to modify, suspend, or discontinue any aspect of the
                    Services at any time, with or without notice.
                  </p>
                </section>

                {/* Account Registration */}
                <section>
                  <h2 className="font-display text-2xl font-normal text-foreground mb-4">
                    3. Account Registration and Security
                  </h2>

                  <h3 className="font-display text-xl font-normal text-foreground mb-3 mt-6">
                    3.1 Account Creation
                  </h3>
                  <p className="leading-relaxed">
                    To use our Services, you must create an account and provide accurate,
                    complete, and current information. You agree to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 mt-3 ml-4">
                    <li>Provide accurate and truthful information</li>
                    <li>Maintain and update your information as needed</li>
                    <li>Be at least 18 years of age</li>
                    <li>Have the authority to enter into these Terms on behalf of your business</li>
                  </ul>

                  <h3 className="font-display text-xl font-normal text-foreground mb-3 mt-6">
                    3.2 Account Security
                  </h3>
                  <p className="leading-relaxed">
                    You are responsible for:
                  </p>
                  <ul className="list-disc list-inside space-y-2 mt-3 ml-4">
                    <li>Maintaining the confidentiality of your account credentials</li>
                    <li>All activities that occur under your account</li>
                    <li>Notifying us immediately of any unauthorized access</li>
                    <li>Ensuring your password meets security best practices</li>
                  </ul>
                  <p className="leading-relaxed mt-4">
                    We are not liable for any loss or damage arising from your failure to protect
                    your account information.
                  </p>
                </section>

                {/* Subscription and Payment */}
                <section>
                  <h2 className="font-display text-2xl font-normal text-foreground mb-4">
                    4. Subscription and Payment Terms
                  </h2>

                  <h3 className="font-display text-xl font-normal text-foreground mb-3 mt-6">
                    4.1 Subscription Plans
                  </h3>
                  <p className="leading-relaxed">
                    Our Services are offered through various subscription plans with different
                    features and pricing. By subscribing, you agree to pay the applicable fees for
                    your chosen plan.
                  </p>

                  <h3 className="font-display text-xl font-normal text-foreground mb-3 mt-6">
                    4.2 Billing and Payments
                  </h3>
                  <ul className="list-disc list-inside space-y-2 mt-3 ml-4">
                    <li>
                      <strong>Recurring Billing:</strong> Subscriptions renew automatically on a
                      monthly basis unless cancelled
                    </li>
                    <li>
                      <strong>Payment Method:</strong> You must provide a valid payment method and
                      authorize us to charge it
                    </li>
                    <li>
                      <strong>Price Changes:</strong> We may change pricing with 30 days&apos;
                      notice. Changes apply at next billing cycle
                    </li>
                    <li>
                      <strong>Failed Payments:</strong> Failed payments may result in service
                      suspension or termination
                    </li>
                    <li>
                      <strong>Taxes:</strong> Prices are exclusive of applicable taxes unless
                      otherwise stated
                    </li>
                  </ul>

                  <h3 className="font-display text-xl font-normal text-foreground mb-3 mt-6">
                    4.3 Cancellation and Refunds
                  </h3>
                  <ul className="list-disc list-inside space-y-2 mt-3 ml-4">
                    <li>You may cancel your subscription at any time through your account settings</li>
                    <li>Cancellation takes effect at the end of the current billing period</li>
                    <li>No refunds for partial months or unused features</li>
                    <li>
                      We reserve the right to issue refunds or credits at our sole discretion
                    </li>
                  </ul>

                  <h3 className="font-display text-xl font-normal text-foreground mb-3 mt-6">
                    4.4 Free Trials
                  </h3>
                  <p className="leading-relaxed">
                    We may offer free trials for certain plans. Free trials automatically convert
                    to paid subscriptions unless cancelled before the trial period ends. No
                    charges apply during the trial period.
                  </p>
                </section>

                {/* Acceptable Use */}
                <section>
                  <h2 className="font-display text-2xl font-normal text-foreground mb-4">
                    5. Acceptable Use Policy
                  </h2>
                  <p className="leading-relaxed">
                    You agree to use our Services only for lawful purposes and in accordance with
                    these Terms. You agree NOT to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 mt-3 ml-4">
                    <li>
                      Violate any applicable laws, regulations, or third-party rights
                    </li>
                    <li>
                      Upload, publish, or transmit illegal, harmful, threatening, abusive, or
                      offensive content
                    </li>
                    <li>
                      Distribute viruses, malware, or other malicious code
                    </li>
                    <li>
                      Attempt to gain unauthorized access to our systems or other users&apos; accounts
                    </li>
                    <li>
                      Use automated systems (bots, scrapers) to access the Platform without permission
                    </li>
                    <li>
                      Interfere with or disrupt the Services or servers
                    </li>
                    <li>
                      Impersonate any person or entity or misrepresent your affiliation
                    </li>
                    <li>
                      Use the Services for spamming or unsolicited marketing
                    </li>
                    <li>
                      Collect or harvest user information without consent
                    </li>
                    <li>
                      Reverse engineer, decompile, or attempt to extract source code
                    </li>
                    <li>
                      Resell or redistribute our Services without authorization
                    </li>
                  </ul>
                  <p className="leading-relaxed mt-4">
                    We reserve the right to suspend or terminate accounts that violate this
                    Acceptable Use Policy.
                  </p>
                </section>

                {/* Content and Intellectual Property */}
                <section>
                  <h2 className="font-display text-2xl font-normal text-foreground mb-4">
                    6. Content and Intellectual Property
                  </h2>

                  <h3 className="font-display text-xl font-normal text-foreground mb-3 mt-6">
                    6.1 Your Content
                  </h3>
                  <p className="leading-relaxed">
                    You retain all ownership rights to content you upload, create, or provide
                    through the Platform (&quot;Your Content&quot;). By using our Services, you grant us
                    a limited license to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 mt-3 ml-4">
                    <li>Host, store, and display Your Content</li>
                    <li>Process Your Content to provide the Services</li>
                    <li>Use AI models to analyze and generate content based on your instructions</li>
                    <li>Create backups for service continuity</li>
                  </ul>
                  <p className="leading-relaxed mt-4">
                    This license terminates when you delete Your Content or close your account,
                    except for content cached or archived in our systems.
                  </p>

                  <h3 className="font-display text-xl font-normal text-foreground mb-3 mt-6">
                    6.2 Your Responsibilities
                  </h3>
                  <p className="leading-relaxed">
                    You represent and warrant that:
                  </p>
                  <ul className="list-disc list-inside space-y-2 mt-3 ml-4">
                    <li>You own or have the rights to all content you provide</li>
                    <li>Your Content does not infringe third-party rights</li>
                    <li>Your Content complies with applicable laws and these Terms</li>
                    <li>You are responsible for obtaining necessary licenses or permissions</li>
                  </ul>

                  <h3 className="font-display text-xl font-normal text-foreground mb-3 mt-6">
                    6.3 Our Intellectual Property
                  </h3>
                  <p className="leading-relaxed">
                    The Platform, including all software, designs, text, graphics, logos, and
                    other content provided by us, is owned by The Upgrade Shop and protected by
                    intellectual property laws. You may not:
                  </p>
                  <ul className="list-disc list-inside space-y-2 mt-3 ml-4">
                    <li>Copy, modify, or create derivative works of our Platform</li>
                    <li>Use our trademarks or branding without written permission</li>
                    <li>Remove or alter any copyright or proprietary notices</li>
                  </ul>

                  <h3 className="font-display text-xl font-normal text-foreground mb-3 mt-6">
                    6.4 AI-Generated Content
                  </h3>
                  <p className="leading-relaxed">
                    Content generated by our AI tools (including Max, our AI assistant) is
                    provided to you for your use. However, you acknowledge that:
                  </p>
                  <ul className="list-disc list-inside space-y-2 mt-3 ml-4">
                    <li>AI-generated content should be reviewed before publication</li>
                    <li>You are responsible for ensuring AI content is accurate and appropriate</li>
                    <li>We do not guarantee the accuracy or quality of AI-generated content</li>
                    <li>Similar content may be generated for other users based on similar inputs</li>
                  </ul>
                </section>

                {/* Third-Party Integrations */}
                <section>
                  <h2 className="font-display text-2xl font-normal text-foreground mb-4">
                    7. Third-Party Integrations
                  </h2>
                  <p className="leading-relaxed">
                    Our Platform integrates with third-party services (Google Analytics, Search
                    Console, Google Drive, etc.) to enhance functionality. When you connect these
                    services:
                  </p>
                  <ul className="list-disc list-inside space-y-2 mt-3 ml-4">
                    <li>
                      You authorize us to access data from those services on your behalf
                    </li>
                    <li>
                      You agree to comply with the third-party service&apos;s terms of service
                    </li>
                    <li>
                      We are not responsible for third-party service availability or data loss
                    </li>
                    <li>
                      You can revoke access at any time through your account settings
                    </li>
                    <li>
                      We only request read-only access and never modify your third-party data
                      without your explicit instruction
                    </li>
                  </ul>
                  <p className="leading-relaxed mt-4">
                    Links to third-party websites are provided for convenience. We are not
                    responsible for the content or practices of external sites.
                  </p>
                </section>

                {/* Data and Privacy */}
                <section>
                  <h2 className="font-display text-2xl font-normal text-foreground mb-4">
                    8. Data and Privacy
                  </h2>
                  <p className="leading-relaxed">
                    Our collection and use of personal information is governed by our{" "}
                    <Link
                      href="/privacy-policy"
                      className="text-gold hover:text-gold-dark underline"
                    >
                      Privacy Policy
                    </Link>
                    . By using our Services, you consent to such collection and use.
                  </p>

                  <h3 className="font-display text-xl font-normal text-foreground mb-3 mt-6">
                    8.1 Data Security
                  </h3>
                  <p className="leading-relaxed">
                    We implement reasonable security measures to protect your data. However, no
                    system is completely secure. You acknowledge that:
                  </p>
                  <ul className="list-disc list-inside space-y-2 mt-3 ml-4">
                    <li>You use the Services at your own risk</li>
                    <li>We cannot guarantee absolute security</li>
                    <li>You are responsible for maintaining secure backups of critical data</li>
                  </ul>

                  <h3 className="font-display text-xl font-normal text-foreground mb-3 mt-6">
                    8.2 Data Backup and Recovery
                  </h3>
                  <p className="leading-relaxed">
                    While we perform regular backups, you are responsible for maintaining your own
                    backups of important content. We are not liable for data loss except as
                    required by law.
                  </p>
                </section>

                {/* Disclaimers and Warranties */}
                <section>
                  <h2 className="font-display text-2xl font-normal text-foreground mb-4">
                    9. Disclaimers and Warranties
                  </h2>
                  <p className="leading-relaxed uppercase font-semibold">
                    THE SERVICES ARE PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF
                    ANY KIND, EITHER EXPRESS OR IMPLIED.
                  </p>
                  <p className="leading-relaxed mt-4">
                    To the maximum extent permitted by law, we disclaim all warranties, including:
                  </p>
                  <ul className="list-disc list-inside space-y-2 mt-3 ml-4">
                    <li>Merchantability, fitness for a particular purpose, and non-infringement</li>
                    <li>Uninterrupted, error-free, or secure operation</li>
                    <li>Accuracy, reliability, or completeness of content or data</li>
                    <li>Defects will be corrected or errors eliminated</li>
                  </ul>
                  <p className="leading-relaxed mt-4">
                    We do not warrant that the Services will meet your requirements or that any
                    results obtained will be accurate or reliable.
                  </p>
                </section>

                {/* Limitation of Liability */}
                <section>
                  <h2 className="font-display text-2xl font-normal text-foreground mb-4">
                    10. Limitation of Liability
                  </h2>
                  <p className="leading-relaxed uppercase font-semibold">
                    TO THE MAXIMUM EXTENT PERMITTED BY LAW, THE UPGRADE SHOP SHALL NOT BE LIABLE
                    FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR
                    ANY LOSS OF PROFITS, REVENUE, DATA, OR USE.
                  </p>
                  <p className="leading-relaxed mt-4">
                    Our total liability for any claims arising from your use of the Services shall
                    not exceed the amount you paid us in the 12 months preceding the claim, or
                    $100, whichever is greater.
                  </p>
                  <p className="leading-relaxed mt-4">
                    This limitation applies to all causes of action, whether in contract, tort,
                    negligence, strict liability, or otherwise.
                  </p>
                </section>

                {/* Indemnification */}
                <section>
                  <h2 className="font-display text-2xl font-normal text-foreground mb-4">
                    11. Indemnification
                  </h2>
                  <p className="leading-relaxed">
                    You agree to indemnify, defend, and hold harmless The Upgrade Shop and its
                    officers, directors, employees, and agents from any claims, damages, losses,
                    liabilities, and expenses (including legal fees) arising from:
                  </p>
                  <ul className="list-disc list-inside space-y-2 mt-3 ml-4">
                    <li>Your use of the Services</li>
                    <li>Your violation of these Terms</li>
                    <li>Your violation of any rights of another party</li>
                    <li>Your Content</li>
                  </ul>
                </section>

                {/* Termination */}
                <section>
                  <h2 className="font-display text-2xl font-normal text-foreground mb-4">
                    12. Termination
                  </h2>

                  <h3 className="font-display text-xl font-normal text-foreground mb-3 mt-6">
                    12.1 Termination by You
                  </h3>
                  <p className="leading-relaxed">
                    You may terminate your account at any time by cancelling your subscription
                    through your account settings. Termination takes effect at the end of your
                    current billing period.
                  </p>

                  <h3 className="font-display text-xl font-normal text-foreground mb-3 mt-6">
                    12.2 Termination by Us
                  </h3>
                  <p className="leading-relaxed">
                    We may suspend or terminate your account immediately if:
                  </p>
                  <ul className="list-disc list-inside space-y-2 mt-3 ml-4">
                    <li>You violate these Terms or our Acceptable Use Policy</li>
                    <li>Your payment fails or your account is past due</li>
                    <li>We are required to do so by law</li>
                    <li>Your use creates security risks or legal liability</li>
                    <li>We discontinue the Services (with reasonable notice)</li>
                  </ul>

                  <h3 className="font-display text-xl font-normal text-foreground mb-3 mt-6">
                    12.3 Effect of Termination
                  </h3>
                  <p className="leading-relaxed">
                    Upon termination:
                  </p>
                  <ul className="list-disc list-inside space-y-2 mt-3 ml-4">
                    <li>Your access to the Services will be immediately revoked</li>
                    <li>Your websites hosted on our Platform will be taken offline</li>
                    <li>Your data will be retained for 90 days before permanent deletion</li>
                    <li>You may request a data export within 30 days of termination</li>
                    <li>No refunds will be provided for partial billing periods</li>
                  </ul>
                </section>

                {/* Dispute Resolution */}
                <section>
                  <h2 className="font-display text-2xl font-normal text-foreground mb-4">
                    13. Dispute Resolution
                  </h2>

                  <h3 className="font-display text-xl font-normal text-foreground mb-3 mt-6">
                    13.1 Informal Resolution
                  </h3>
                  <p className="leading-relaxed">
                    Before filing a claim, you agree to contact us at{" "}
                    <a
                      href="mailto:legal@upgradeshop.ai"
                      className="text-gold hover:text-gold-dark underline"
                    >
                      legal@upgradeshop.ai
                    </a>{" "}
                    to attempt to resolve the dispute informally.
                  </p>

                  <h3 className="font-display text-xl font-normal text-foreground mb-3 mt-6">
                    13.2 Arbitration
                  </h3>
                  <p className="leading-relaxed">
                    Any disputes that cannot be resolved informally shall be resolved through
                    binding arbitration in accordance with commercial arbitration rules. You waive
                    your right to a jury trial or to participate in a class action lawsuit.
                  </p>
                </section>

                {/* General Provisions */}
                <section>
                  <h2 className="font-display text-2xl font-normal text-foreground mb-4">
                    14. General Provisions
                  </h2>

                  <h3 className="font-display text-xl font-normal text-foreground mb-3 mt-6">
                    14.1 Governing Law
                  </h3>
                  <p className="leading-relaxed">
                    These Terms are governed by and construed in accordance with the laws of the
                    jurisdiction in which The Upgrade Shop operates, without regard to conflict of
                    law principles.
                  </p>

                  <h3 className="font-display text-xl font-normal text-foreground mb-3 mt-6">
                    14.2 Modifications to Terms
                  </h3>
                  <p className="leading-relaxed">
                    We reserve the right to modify these Terms at any time. We will notify you of
                    material changes by email or through the Platform. Your continued use of the
                    Services after changes take effect constitutes acceptance of the modified
                    Terms.
                  </p>

                  <h3 className="font-display text-xl font-normal text-foreground mb-3 mt-6">
                    14.3 Severability
                  </h3>
                  <p className="leading-relaxed">
                    If any provision of these Terms is found to be invalid or unenforceable, the
                    remaining provisions shall remain in full force and effect.
                  </p>

                  <h3 className="font-display text-xl font-normal text-foreground mb-3 mt-6">
                    14.4 Entire Agreement
                  </h3>
                  <p className="leading-relaxed">
                    These Terms, together with our Privacy Policy, constitute the entire agreement
                    between you and The Upgrade Shop regarding the Services.
                  </p>

                  <h3 className="font-display text-xl font-normal text-foreground mb-3 mt-6">
                    14.5 Waiver
                  </h3>
                  <p className="leading-relaxed">
                    Our failure to enforce any right or provision of these Terms does not
                    constitute a waiver of that right or provision.
                  </p>

                  <h3 className="font-display text-xl font-normal text-foreground mb-3 mt-6">
                    14.6 Assignment
                  </h3>
                  <p className="leading-relaxed">
                    You may not assign or transfer these Terms or your account without our written
                    consent. We may assign these Terms without restriction.
                  </p>
                </section>

                {/* Contact Information */}
                <section>
                  <h2 className="font-display text-2xl font-normal text-foreground mb-4">
                    15. Contact Information
                  </h2>
                  <p className="leading-relaxed">
                    If you have questions about these Terms, please contact us:
                  </p>
                  <div className="mt-4 p-6 bg-foreground/[0.02] rounded-xl">
                    <p className="leading-relaxed">
                      <strong>The Upgrade Shop</strong>
                      <br />
                      Legal:{" "}
                      <a
                        href="mailto:legal@upgradeshop.ai"
                        className="text-gold hover:text-gold-dark underline"
                      >
                        legal@upgradeshop.ai
                      </a>
                      <br />
                      Support:{" "}
                      <a
                        href="mailto:support@upgradeshop.ai"
                        className="text-gold hover:text-gold-dark underline"
                      >
                        support@upgradeshop.ai
                      </a>
                      <br />
                      Website:{" "}
                      <a
                        href="https://upgradeshop.ai"
                        className="text-gold hover:text-gold-dark underline"
                      >
                        https://upgradeshop.ai
                      </a>
                      <br />
                      Address: Tel Aviv, Israel
                    </p>
                  </div>
                </section>

                {/* Back to Home */}
                <div className="pt-8 border-t border-foreground/10">
                  <Link
                    href="/"
                    className="text-gold hover:text-gold-dark underline font-medium"
                  >
                    ← Back to Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
