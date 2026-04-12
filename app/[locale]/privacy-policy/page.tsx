import { Metadata } from "next";
import { Container } from "@/components/layout/container";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy - The Upgrade Shop",
  description: "Privacy Policy for The Upgrade Shop platform. Learn how we collect, use, and protect your data.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="py-20 md:py-28">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Privacy Policy
            </h1>
            <p className="text-foreground/60 mb-8">
              Last Updated: January 29, 2026
            </p>

            <div className="prose prose-lg max-w-none">
              <div className="space-y-8 text-foreground/80">
                {/* Introduction */}
                <section>
                  <h2 className="font-display text-2xl font-normal text-foreground mb-4">
                    1. Introduction
                  </h2>
                  <p className="leading-relaxed">
                    Welcome to The Upgrade Shop (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We are committed
                    to protecting your personal information and your right to privacy. This Privacy
                    Policy explains how we collect, use, disclose, and safeguard your information
                    when you use our platform at upgradeshop.ai (the &quot;Platform&quot;).
                  </p>
                  <p className="leading-relaxed mt-4">
                    The Upgrade Shop provides an AI-powered website building and management platform
                    that helps businesses create, manage, and optimize their online presence. Our
                    platform includes features such as content management, analytics integration,
                    SEO optimization, and customer relationship management.
                  </p>
                  <p className="leading-relaxed mt-4">
                    By using our Platform, you agree to the collection and use of information in
                    accordance with this Privacy Policy. If you do not agree with our policies and
                    practices, please do not use our Platform.
                  </p>
                </section>

                {/* Information We Collect */}
                <section>
                  <h2 className="font-display text-2xl font-normal text-foreground mb-4">
                    2. Information We Collect
                  </h2>

                  <h3 className="font-display text-xl font-normal text-foreground mb-3 mt-6">
                    2.1 Information You Provide to Us
                  </h3>
                  <p className="leading-relaxed">
                    We collect information that you voluntarily provide when using our Platform:
                  </p>
                  <ul className="list-disc list-inside space-y-2 mt-3 ml-4">
                    <li>
                      <strong>Account Information:</strong> Name, email address, business name,
                      phone number, and password when you create an account
                    </li>
                    <li>
                      <strong>Business Information:</strong> Business description, industry,
                      services, products, pricing, and other content you provide for your website
                    </li>
                    <li>
                      <strong>Payment Information:</strong> Billing address and payment details
                      (processed securely through our payment processor)
                    </li>
                    <li>
                      <strong>Communications:</strong> Information you provide when contacting our
                      support team or communicating with our AI assistant Max
                    </li>
                    <li>
                      <strong>Customer Data:</strong> Information about your customers that you
                      input into our CRM system
                    </li>
                  </ul>

                  <h3 className="font-display text-xl font-normal text-foreground mb-3 mt-6">
                    2.2 Information Collected Automatically
                  </h3>
                  <p className="leading-relaxed">
                    When you access our Platform, we automatically collect certain information:
                  </p>
                  <ul className="list-disc list-inside space-y-2 mt-3 ml-4">
                    <li>
                      <strong>Usage Data:</strong> Pages viewed, features used, time spent on the
                      Platform, and interaction patterns
                    </li>
                    <li>
                      <strong>Device Information:</strong> Browser type, operating system, device
                      identifiers, and IP address
                    </li>
                    <li>
                      <strong>Cookies and Tracking:</strong> We use cookies and similar
                      technologies to enhance your experience (see Section 7)
                    </li>
                  </ul>

                  <h3 className="font-display text-xl font-normal text-foreground mb-3 mt-6">
                    2.3 Third-Party Integrations and OAuth Data
                  </h3>
                  <p className="leading-relaxed">
                    When you connect third-party services to your account, we access limited data
                    to provide our services. We only request read-only access and never modify your
                    data without your explicit instruction:
                  </p>
                  <ul className="list-disc list-inside space-y-2 mt-3 ml-4">
                    <li>
                      <strong>Google Search Console (webmasters scope):</strong> We access your
                      website&apos;s search performance data, indexing status, and search analytics
                      to provide SEO insights and optimization recommendations
                    </li>
                    <li>
                      <strong>Google Site Verification (siteverification scope):</strong> We verify
                      your ownership of websites to enable secure connections between your sites
                      and our Platform
                    </li>
                    <li>
                      <strong>Google Analytics (analytics.readonly scope):</strong> We read your
                      website analytics data to provide traffic insights, user behavior analysis,
                      and performance metrics within our dashboard
                    </li>
                    <li>
                      <strong>Google Docs (documents.readonly scope):</strong> We read Google Docs
                      you choose to import for content creation and website building purposes
                    </li>
                    <li>
                      <strong>Google Drive (drive.readonly scope):</strong> We access files you
                      choose to import for website content, such as images, documents, and media
                      assets
                    </li>
                  </ul>
                  <p className="leading-relaxed mt-4">
                    <strong>Important:</strong> All Google OAuth scopes we request are read-only.
                    We never modify, delete, or share your Google data without your explicit
                    permission. You can revoke our access at any time through your Google Account
                    settings.
                  </p>
                </section>

                {/* How We Use Your Information */}
                <section>
                  <h2 className="font-display text-2xl font-normal text-foreground mb-4">
                    3. How We Use Your Information
                  </h2>
                  <p className="leading-relaxed">
                    We use the information we collect for the following purposes:
                  </p>
                  <ul className="list-disc list-inside space-y-2 mt-3 ml-4">
                    <li>
                      <strong>Service Delivery:</strong> To create, host, and manage your website
                      and provide the features you&apos;ve subscribed to
                    </li>
                    <li>
                      <strong>AI-Powered Features:</strong> To power our AI assistant Max for
                      content generation, website optimization, and customer support
                    </li>
                    <li>
                      <strong>Analytics and Insights:</strong> To provide you with analytics,
                      performance metrics, and actionable insights about your website
                    </li>
                    <li>
                      <strong>SEO Optimization:</strong> To analyze search performance and provide
                      recommendations for improving your website&apos;s visibility
                    </li>
                    <li>
                      <strong>Account Management:</strong> To manage your account, process
                      payments, and communicate about your subscription
                    </li>
                    <li>
                      <strong>Customer Support:</strong> To respond to your inquiries and provide
                      technical assistance
                    </li>
                    <li>
                      <strong>Platform Improvement:</strong> To analyze usage patterns and improve
                      our features and user experience
                    </li>
                    <li>
                      <strong>Security:</strong> To detect, prevent, and address fraud, security
                      issues, and technical problems
                    </li>
                    <li>
                      <strong>Legal Compliance:</strong> To comply with legal obligations and
                      enforce our Terms of Use
                    </li>
                  </ul>
                </section>

                {/* How We Share Your Information */}
                <section>
                  <h2 className="font-display text-2xl font-normal text-foreground mb-4">
                    4. How We Share Your Information
                  </h2>
                  <p className="leading-relaxed">
                    We do not sell your personal information. We may share your information in the
                    following circumstances:
                  </p>
                  <ul className="list-disc list-inside space-y-2 mt-3 ml-4">
                    <li>
                      <strong>Service Providers:</strong> With third-party vendors who perform
                      services on our behalf (hosting, payment processing, analytics, AI services)
                    </li>
                    <li>
                      <strong>Business Transfers:</strong> In connection with a merger,
                      acquisition, or sale of assets
                    </li>
                    <li>
                      <strong>Legal Requirements:</strong> When required by law, court order, or
                      governmental authority
                    </li>
                    <li>
                      <strong>Protection of Rights:</strong> To protect our rights, property,
                      safety, or that of our users
                    </li>
                    <li>
                      <strong>With Your Consent:</strong> When you explicitly authorize us to share
                      your information
                    </li>
                  </ul>
                  <p className="leading-relaxed mt-4">
                    <strong>Third-Party Services We Use:</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-2 mt-3 ml-4">
                    <li>OpenAI and Anthropic for AI-powered features</li>
                    <li>Google Cloud Platform for hosting and infrastructure</li>
                    <li>Stripe for payment processing</li>
                    <li>PostgreSQL for database services</li>
                  </ul>
                </section>

                {/* Data Retention */}
                <section>
                  <h2 className="font-display text-2xl font-normal text-foreground mb-4">
                    5. Data Retention
                  </h2>
                  <p className="leading-relaxed">
                    We retain your information for as long as necessary to provide our services and
                    fulfill the purposes outlined in this Privacy Policy. Specifically:
                  </p>
                  <ul className="list-disc list-inside space-y-2 mt-3 ml-4">
                    <li>
                      <strong>Account Data:</strong> Retained while your account is active and for
                      90 days after account closure
                    </li>
                    <li>
                      <strong>Website Content:</strong> Retained while your subscription is active
                    </li>
                    <li>
                      <strong>Transaction Records:</strong> Retained for 7 years for legal and
                      accounting purposes
                    </li>
                    <li>
                      <strong>Analytics Data:</strong> Aggregated and anonymized data may be
                      retained indefinitely
                    </li>
                  </ul>
                  <p className="leading-relaxed mt-4">
                    You can request deletion of your data at any time by contacting us at{" "}
                    <a
                      href="mailto:privacy@upgradeshop.ai"
                      className="text-gold hover:text-gold-dark underline"
                    >
                      privacy@upgradeshop.ai
                    </a>
                  </p>
                </section>

                {/* Data Security */}
                <section>
                  <h2 className="font-display text-2xl font-normal text-foreground mb-4">
                    6. Data Security
                  </h2>
                  <p className="leading-relaxed">
                    We implement appropriate technical and organizational security measures to
                    protect your information:
                  </p>
                  <ul className="list-disc list-inside space-y-2 mt-3 ml-4">
                    <li>Industry-standard encryption for data in transit (TLS/SSL)</li>
                    <li>Encrypted storage for sensitive data at rest</li>
                    <li>Regular security audits and vulnerability assessments</li>
                    <li>Access controls and authentication mechanisms</li>
                    <li>Regular backups and disaster recovery procedures</li>
                  </ul>
                  <p className="leading-relaxed mt-4">
                    While we strive to protect your information, no method of transmission or
                    storage is 100% secure. We cannot guarantee absolute security.
                  </p>
                </section>

                {/* Cookies and Tracking */}
                <section>
                  <h2 className="font-display text-2xl font-normal text-foreground mb-4">
                    7. Cookies and Tracking Technologies
                  </h2>
                  <p className="leading-relaxed">
                    We use cookies and similar tracking technologies to enhance your experience:
                  </p>
                  <ul className="list-disc list-inside space-y-2 mt-3 ml-4">
                    <li>
                      <strong>Essential Cookies:</strong> Required for basic platform functionality
                      and authentication
                    </li>
                    <li>
                      <strong>Performance Cookies:</strong> Help us understand how you use the
                      Platform to improve performance
                    </li>
                    <li>
                      <strong>Functional Cookies:</strong> Remember your preferences and settings
                    </li>
                  </ul>
                  <p className="leading-relaxed mt-4">
                    You can control cookies through your browser settings. Disabling certain
                    cookies may limit your ability to use some features.
                  </p>
                </section>

                {/* Your Rights and Choices */}
                <section>
                  <h2 className="font-display text-2xl font-normal text-foreground mb-4">
                    8. Your Rights and Choices
                  </h2>
                  <p className="leading-relaxed">
                    Depending on your location, you may have the following rights:
                  </p>
                  <ul className="list-disc list-inside space-y-2 mt-3 ml-4">
                    <li>
                      <strong>Access:</strong> Request a copy of the personal information we hold
                      about you
                    </li>
                    <li>
                      <strong>Correction:</strong> Request correction of inaccurate or incomplete
                      information
                    </li>
                    <li>
                      <strong>Deletion:</strong> Request deletion of your personal information
                    </li>
                    <li>
                      <strong>Portability:</strong> Request transfer of your data to another
                      service
                    </li>
                    <li>
                      <strong>Object:</strong> Object to certain processing of your information
                    </li>
                    <li>
                      <strong>Withdraw Consent:</strong> Withdraw consent for data processing at
                      any time
                    </li>
                    <li>
                      <strong>Revoke OAuth Access:</strong> Disconnect third-party integrations
                      through your account settings or directly through Google Account settings
                    </li>
                  </ul>
                  <p className="leading-relaxed mt-4">
                    To exercise these rights, contact us at{" "}
                    <a
                      href="mailto:privacy@upgradeshop.ai"
                      className="text-gold hover:text-gold-dark underline"
                    >
                      privacy@upgradeshop.ai
                    </a>
                  </p>
                </section>

                {/* Children's Privacy */}
                <section>
                  <h2 className="font-display text-2xl font-normal text-foreground mb-4">
                    9. Children&apos;s Privacy
                  </h2>
                  <p className="leading-relaxed">
                    Our Platform is not intended for users under 18 years of age. We do not
                    knowingly collect personal information from children. If you believe we have
                    collected information from a child, please contact us immediately.
                  </p>
                </section>

                {/* International Data Transfers */}
                <section>
                  <h2 className="font-display text-2xl font-normal text-foreground mb-4">
                    10. International Data Transfers
                  </h2>
                  <p className="leading-relaxed">
                    Your information may be transferred to and processed in countries other than
                    your own. We ensure appropriate safeguards are in place to protect your
                    information in accordance with this Privacy Policy.
                  </p>
                </section>

                {/* Changes to Privacy Policy */}
                <section>
                  <h2 className="font-display text-2xl font-normal text-foreground mb-4">
                    11. Changes to This Privacy Policy
                  </h2>
                  <p className="leading-relaxed">
                    We may update this Privacy Policy from time to time. We will notify you of
                    material changes by posting the new Privacy Policy on this page and updating
                    the &quot;Last Updated&quot; date. Your continued use of the Platform after
                    changes constitutes acceptance of the updated policy.
                  </p>
                </section>

                {/* Contact Us */}
                <section>
                  <h2 className="font-display text-2xl font-normal text-foreground mb-4">
                    12. Contact Us
                  </h2>
                  <p className="leading-relaxed">
                    If you have questions about this Privacy Policy or our privacy practices,
                    please contact us:
                  </p>
                  <div className="mt-4 p-6 bg-foreground/[0.02] rounded-xl">
                    <p className="leading-relaxed">
                      <strong>The Upgrade Shop</strong>
                      <br />
                      Email:{" "}
                      <a
                        href="mailto:privacy@upgradeshop.ai"
                        className="text-gold hover:text-gold-dark underline"
                      >
                        privacy@upgradeshop.ai
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
