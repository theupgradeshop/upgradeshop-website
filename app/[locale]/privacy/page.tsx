import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | The Upgrade Shop",
  description:
    "Privacy policy for The Upgrade Shop platform. How we collect, use, store, and protect your personal data and the data you authorize us to access on connected platforms including Facebook and Instagram.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background py-24">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
          Privacy Policy
        </h1>
        <p className="text-foreground/60 mb-2">
          Effective date: May 18, 2026
        </p>
        <p className="text-foreground/60 mb-12">
          Last updated: May 18, 2026
        </p>

        <div className="prose prose-lg max-w-none text-foreground/80 space-y-12">
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              1. Introduction
            </h2>
            <p className="mb-4">
              This Privacy Policy explains how The Upgrade Shop ("we", "us",
              "our") collects, uses, stores, shares, and protects personal
              information when you use our platform at upgradeshop.ai and
              app.upgradeshop.ai (the "Platform"), and when you connect
              third-party accounts to the Platform (including Facebook,
              Instagram, and other services).
            </p>
            <p className="mb-4">
              We act as a data controller for personal information you provide
              directly to us as a customer of the Platform. For personal
              information of your own end-users that you process through the
              Platform (for example, contacts in your CRM or leads from your
              advertising), we act as a data processor on your behalf, and
              you remain the controller.
            </p>
            <p>
              By using the Platform, you agree to the practices described in
              this Privacy Policy. If you do not agree, please do not use the
              Platform.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              2. Who We Are
            </h2>
            <p className="mb-4">
              The Platform is operated by:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-1">
              <li>
                Legal entity: <strong>The Upgrade Shop</strong>
              </li>
              <li>
                Company registration (ח.פ.): <strong>300330123</strong>
              </li>
              <li>
                Registered office: <strong>Har Hatzofim 11, Holon, Israel</strong>
              </li>
              <li>Country of incorporation: Israel</li>
              <li>
                General contact: hello@upgradeshop.ai
              </li>
              <li>
                Privacy and data protection contact: privacy@upgradeshop.ai
              </li>
            </ul>
            <p>
              The Upgrade Shop is the developer of the Facebook and Instagram
              app integration referred to in this Privacy Policy as the "Meta
              App". The Meta App is registered in the Meta for Developers
              platform and operates under the same legal entity described
              above.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              3. Information We Collect
            </h2>

            <h3 className="font-display text-xl font-semibold text-foreground mb-3">
              3.1 Information you provide directly
            </h3>
            <p className="mb-3">
              When you create an account, subscribe to a plan, or use the
              Platform, we collect:
            </p>
            <ul className="list-disc list-inside mb-6 space-y-1">
              <li>Name, email address, phone number</li>
              <li>Business name, business type, business address</li>
              <li>
                Payment information (processed by our payment partners, see
                Section 9)
              </li>
              <li>
                Content you create using the Platform (websites, products,
                courses, emails, automations, AI agent configurations)
              </li>
              <li>
                Contacts you import or that are submitted through forms,
                leads, or messages
              </li>
              <li>Support communications you send us</li>
            </ul>

            <h3 className="font-display text-xl font-semibold text-foreground mb-3">
              3.2 Information from connected platforms (Meta, Google, others)
            </h3>
            <p className="mb-3">
              When you connect a third-party account to the Platform, we
              receive only the data your authorization permits. See Section 4
              for the full Meta Platform Data disclosure.
            </p>

            <h3 className="font-display text-xl font-semibold text-foreground mb-3">
              3.3 Information collected automatically
            </h3>
            <ul className="list-disc list-inside space-y-1">
              <li>
                Device and browser information (user agent, IP address,
                operating system, screen size)
              </li>
              <li>
                Usage data (pages visited, features used, time spent,
                referrers)
              </li>
              <li>Cookies and similar technologies (see Section 10)</li>
              <li>Logs, error reports, and performance telemetry</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              4. Meta Platform Data (Facebook and Instagram)
            </h2>
            <p className="mb-4">
              The Platform integrates with Facebook and Instagram through the
              Meta App so that you can manage your social presence,
              communicate with your customers, and analyze your performance
              from one place. This section describes exactly what we access,
              how we use it, and how you can revoke our access.
            </p>

            <h3 className="font-display text-xl font-semibold text-foreground mb-3">
              4.1 What we access from Facebook
            </h3>
            <ul className="list-disc list-inside mb-6 space-y-1">
              <li>
                Your Facebook profile id, name, and email address (to identify
                the user who connected the account)
              </li>
              <li>
                The list of Facebook Pages you manage and a Page access token
                for each (only for Pages you select during the connection
                flow)
              </li>
              <li>
                Public content on connected Pages: posts, comments, reviews
                and recommendations, and engagement metrics
              </li>
              <li>
                Messenger conversations sent to and from the connected Page
              </li>
              <li>
                Lead Ads form definitions attached to the connected Page and
                the lead submissions delivered through those forms
              </li>
              <li>
                Ad campaign data, ad insights, and ad account metadata for the
                ad account you authorize
              </li>
            </ul>

            <h3 className="font-display text-xl font-semibold text-foreground mb-3">
              4.2 What we access from Instagram
            </h3>
            <ul className="list-disc list-inside mb-6 space-y-1">
              <li>
                Your Instagram Business or Creator account id, username,
                display name, profile picture, and account type
              </li>
              <li>Your recent posts and their public metadata</li>
              <li>
                Comments on your posts and direct messages sent to and from
                your account
              </li>
              <li>
                Account-level insights such as reach, views, and engagement
                metrics (only with your authorization)
              </li>
            </ul>

            <h3 className="font-display text-xl font-semibold text-foreground mb-3">
              4.3 How we use Meta Platform Data
            </h3>
            <ul className="list-disc list-inside mb-6 space-y-1">
              <li>
                To display your connected Pages and accounts inside your
                Platform dashboard
              </li>
              <li>
                To deliver real-time events (new comments, new messages, new
                leads, new reviews) to your Platform inbox and CRM
              </li>
              <li>
                To run automations you configure (for example, auto-reply to
                comments, auto-DM a commenter, route a lead to a sales
                pipeline)
              </li>
              <li>
                To publish content (images, reels, carousels) to your
                Instagram account when you request it from the Platform
              </li>
              <li>
                To show you analytics about your paid and organic performance
              </li>
              <li>
                To pause, resume, or adjust budgets on ad campaigns you
                authorize
              </li>
            </ul>

            <h3 className="font-display text-xl font-semibold text-foreground mb-3">
              4.4 What we do NOT do with Meta Platform Data
            </h3>
            <ul className="list-disc list-inside mb-6 space-y-1">
              <li>
                We do not sell, rent, or lease Meta Platform Data to any third
                party
              </li>
              <li>
                We do not use Meta Platform Data for advertising other than
                the advertising of your own business that you authorize us to
                manage
              </li>
              <li>
                We do not share Meta Platform Data across the accounts of
                different Platform customers
              </li>
              <li>
                We do not use Meta Platform Data to train general-purpose
                machine learning models
              </li>
              <li>
                We do not retain Meta Platform Data after you disconnect the
                integration, except as required by law or to maintain audit
                logs that contain no personal data
              </li>
            </ul>

            <h3 className="font-display text-xl font-semibold text-foreground mb-3">
              4.5 How to revoke our access to Meta Platform Data
            </h3>
            <p className="mb-3">You can revoke access at any time, in two ways:</p>
            <ul className="list-disc list-inside mb-3 space-y-1">
              <li>
                Inside the Platform: go to <em>Social</em>, find the connected
                Facebook or Instagram account, and click <em>Disconnect</em>.
                This invalidates the access token we hold and stops all
                processing.
              </li>
              <li>
                Inside Facebook: go to{" "}
                <em>
                  Settings &amp; Privacy &rarr; Settings &rarr; Apps and
                  Websites
                </em>{" "}
                and remove The Upgrade Shop from the list of authorized apps.
              </li>
            </ul>
            <p>
              After revocation, we delete the relevant access tokens
              immediately and purge stored Meta Platform Data within 30 days,
              except where retention is required by law.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              5. How We Use Your Information
            </h2>
            <p className="mb-3">We process personal data to:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Provide, operate, and improve the Platform</li>
              <li>Process payments and manage subscriptions</li>
              <li>Communicate with you about your account and the service</li>
              <li>Provide customer support</li>
              <li>Detect, prevent, and respond to fraud or abuse</li>
              <li>Comply with legal obligations</li>
              <li>
                Send marketing communications about the Platform (you can opt
                out at any time)
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              6. Lawful Basis for Processing (GDPR)
            </h2>
            <p className="mb-3">
              When EU/EEA or UK data subjects are involved, we rely on the
              following lawful bases under the GDPR:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                <strong>Contract</strong> (Art. 6(1)(b)): to deliver the
                Platform to you and perform the agreement between us
              </li>
              <li>
                <strong>Legitimate interests</strong> (Art. 6(1)(f)): to
                secure the Platform, prevent fraud, and improve our services
              </li>
              <li>
                <strong>Consent</strong> (Art. 6(1)(a)): for marketing
                communications, cookies that are not strictly necessary, and
                for integrations you choose to authorize
              </li>
              <li>
                <strong>Legal obligation</strong> (Art. 6(1)(c)): to comply
                with tax, accounting, and other statutory requirements
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              7. Sharing and Sub-Processors
            </h2>
            <p className="mb-4">
              We do not sell personal information. We share data with the
              following categories of recipients only as needed to operate
              the Platform:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-1">
              <li>
                <strong>Hosting:</strong> Hetzner Online GmbH (Germany, EU)
              </li>
              <li>
                <strong>Network and security:</strong> Cloudflare, Inc.
              </li>
              <li>
                <strong>Transactional email:</strong> Amazon Web Services
                (SES)
              </li>
              <li>
                <strong>Payments:</strong> SUMIT, and additional payment
                providers we may add (such as Stripe), to process subscription
                and one-time charges
              </li>
              <li>
                <strong>AI processing:</strong> Anthropic PBC (Claude), OpenAI
                Inc., and other AI vendors we may add, to power the in-product
                AI agent and content tools
              </li>
              <li>
                <strong>Maps and routing:</strong> Google LLC
              </li>
              <li>
                <strong>Video and media:</strong> Gumlet Inc., ElevenLabs Inc.
                (for course dubbing)
              </li>
              <li>
                <strong>Connected platforms:</strong> Meta Platforms, Inc.
                (Facebook and Instagram) and other social or communication
                platforms you authorize. These are not sub-processors of our
                data — they are platforms we integrate with at your direction.
              </li>
              <li>
                <strong>Professional advisors:</strong> our legal, accounting,
                and audit professionals when required
              </li>
              <li>
                <strong>Authorities:</strong> when required by law, court
                order, or to protect rights, property, or safety
              </li>
            </ul>
            <p>
              Each sub-processor is bound by a data processing agreement and
              is required to maintain appropriate technical and organizational
              security measures.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              8. Data Security
            </h2>
            <p>
              We implement industry-standard technical and organizational
              measures to protect personal data, including TLS encryption in
              transit, encryption at rest for sensitive fields, role-based
              access controls, audit logging, regular backups, network
              isolation between customer environments, secret rotation, and
              employee security training. No method of transmission or
              storage is 100% secure; we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              9. Payment Information
            </h2>
            <p>
              Payment information is processed by our payment partners
              (currently SUMIT, and additional providers we may add). We do
              not store full card numbers on our servers. Payment tokens
              required for recurring billing are stored encrypted by the
              payment processor. Our payment partners are PCI DSS compliant.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              10. Cookies and Tracking
            </h2>
            <p className="mb-3">We use cookies and similar technologies to:</p>
            <ul className="list-disc list-inside mb-3 space-y-1">
              <li>Keep you signed in (essential)</li>
              <li>
                Remember your preferences such as language and locale
                (essential)
              </li>
              <li>
                Measure usage of the Platform so we can improve it
                (analytics, with consent where required)
              </li>
              <li>
                Detect fraudulent or abusive activity (security, essential)
              </li>
            </ul>
            <p>
              You can manage cookies through your browser settings. Disabling
              essential cookies will prevent the Platform from working
              correctly.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              11. Your Rights
            </h2>
            <p className="mb-3">
              Depending on your jurisdiction, you have the right to:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-1">
              <li>Access the personal information we hold about you</li>
              <li>Correct or update inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Object to or restrict certain processing</li>
              <li>Withdraw consent at any time, where consent is the basis</li>
              <li>
                Receive your information in a portable, machine-readable
                format
              </li>
              <li>
                Lodge a complaint with a supervisory authority — in Israel,
                the Privacy Protection Authority
                (https://www.gov.il/en/departments/the_privacy_protection_authority);
                in the EU, your local data protection authority; in the UK,
                the Information Commissioner's Office (ICO)
              </li>
            </ul>
            <p>
              To exercise any of these rights, email
              privacy@upgradeshop.ai. We will respond within 30 days (or
              shorter where required by law).
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              12. International Data Transfers
            </h2>
            <p>
              We are based in Israel. Israel has been recognized by the
              European Commission as providing an adequate level of data
              protection under GDPR Article 45. Some of our sub-processors
              are located in the United States and other jurisdictions. Where
              required, we rely on the European Commission's Standard
              Contractual Clauses, the UK International Data Transfer
              Addendum, or other lawful transfer mechanisms.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              13. Data Retention
            </h2>
            <p>
              We retain personal data for as long as your account is active
              and for a reasonable period afterward to support compliance
              with our legal obligations, resolve disputes, and enforce our
              agreements. When you cancel your account, we delete or
              anonymize personal data within 90 days, except where retention
              is required by law (for example, tax records). Meta Platform
              Data is purged within 30 days of integration disconnection.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              14. Children's Privacy
            </h2>
            <p>
              The Platform is not directed to children under 16. We do not
              knowingly collect personal data from anyone under 16. If you
              believe a child has provided us with personal data, contact us
              and we will delete it.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              15. Israeli Privacy Protection Law
            </h2>
            <p>
              We comply with the Israeli Protection of Privacy Law,
              5741-1981, and the Privacy Protection (Data Security)
              Regulations, 5777-2017. The database operated by the Platform
              is registered with the Israeli Registrar of Databases where
              required. Data subjects have the right to inspect their data
              under Section 13 of the Law and to request correction under
              Section 14. Requests should be sent to privacy@upgradeshop.ai.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              16. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. The
              "Last updated" date at the top of this page reflects the most
              recent revision. Material changes will be communicated by email
              or by a prominent notice inside the Platform at least 30 days
              before the change takes effect.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              17. Contact Us
            </h2>
            <p className="mb-3">
              For questions about this Privacy Policy, to exercise your
              rights, or to report a privacy concern:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>Privacy contact: privacy@upgradeshop.ai</li>
              <li>General contact: hello@upgradeshop.ai</li>
              <li>
                Postal: <strong>Har Hatzofim 11, Holon, Israel</strong>
              </li>
            </ul>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-foreground/10">
          <a
            href="/"
            className="text-gold hover:text-gold-dark font-medium"
          >
            &larr; Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
