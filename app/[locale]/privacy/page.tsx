import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | The Upgrade Shop",
  description:
    "Privacy policy for The Upgrade Shop platform. How we collect, use, store, and protect your personal data and the data you authorize us to access on connected platforms including Facebook, Instagram, WhatsApp, and Google.",
  openGraph: {
    title: "Privacy Policy | The Upgrade Shop",
    description:
      "Privacy policy for The Upgrade Shop platform. How we collect, use, store, and protect your personal data.",
    url: "https://upgradeshop.ai/privacy",
    siteName: "The Upgrade Shop",
    images: [
      {
        url: "https://upgradeshop.ai/images/brand/logo/logo_webp/upgrade_shop_logo_black_on_cream-_no_bg.webp",
        width: 1200,
        height: 630,
        alt: "The Upgrade Shop",
      },
    ],
    type: "website",
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background py-24">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
          Privacy Policy
        </h1>
        <p className="text-foreground/60 mb-2">Effective date: May 26, 2026</p>
        <p className="text-foreground/60 mb-12">Last updated: May 26, 2026</p>

        <div className="space-y-12 text-foreground/80">

          {/* 1 */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              1. Who We Are
            </h2>
            <p className="leading-relaxed mb-4">
              The Upgrade Shop (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or
              &ldquo;us&rdquo;) is an AI-managed digital infrastructure
              platform for small and medium-sized businesses, registered in
              Israel under ח.פ. 300330123, with registered address at Har
              Hatzofim 11, Holon, Israel.
            </p>
            <p className="leading-relaxed">
              We provide business owners with a single platform covering
              website management, CRM, email marketing, WhatsApp Business
              messaging, social media automation, online store, digital
              courses infrastructure, funnels, dispatch management, and a
              personal AI agent — all accessible through our dashboard at{" "}
              <strong>app.upgradeshop.ai</strong>.
            </p>
          </section>

          {/* 2 */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              2. Scope of This Policy — Two Roles We Play
            </h2>
            <p className="leading-relaxed mb-4">
              Depending on the context, we act in one of two legal roles with
              respect to personal data:
            </p>

            <h3 className="font-display text-xl font-semibold text-foreground mb-3">
              2.1 Data Controller — for our direct users
            </h3>
            <p className="leading-relaxed mb-4">
              When a business owner creates an account on The Upgrade Shop and
              uses our dashboard, we are the <strong>data controller</strong>{" "}
              for that person&rsquo;s data. This policy describes how we
              handle that data.
            </p>

            <h3 className="font-display text-xl font-semibold text-foreground mb-3">
              2.2 Data Processor — for our customers&rsquo; end users
            </h3>
            <p className="leading-relaxed mb-4">
              When a business owner uses our platform to manage their own
              customers — storing contacts in the CRM, sending WhatsApp
              messages, running email campaigns, hosting a website, operating
              an online store, or managing course students — the business
              owner is the <strong>data controller</strong> for their
              customers&rsquo; personal data, and we act as their{" "}
              <strong>data processor</strong>.
            </p>
            <p className="leading-relaxed">
              In that capacity we process end-user data only on the business
              owner&rsquo;s documented instructions and in accordance with our
              Data Processing Agreement. Business owners are responsible for
              having a lawful basis to collect their customers&rsquo; data and
              for providing their customers with an appropriate privacy notice.
            </p>
          </section>

          {/* 3 */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              3. Information We Collect About You (Dashboard Users)
            </h2>

            <h3 className="font-display text-xl font-semibold text-foreground mb-3">
              3.1 Account and registration data
            </h3>
            <ul className="list-disc list-inside mb-4 space-y-1 ml-2">
              <li>Name, email address, and password (or OAuth token from Google sign-in)</li>
              <li>Business name, website URL, and contact details you provide during onboarding</li>
              <li>Profile picture if connected via Google</li>
            </ul>

            <h3 className="font-display text-xl font-semibold text-foreground mb-3">
              3.2 Billing and payment data
            </h3>
            <p className="leading-relaxed mb-3">
              We use a third-party payment processor (SUMIT) to handle
              subscription billing. We do not store full card numbers on our
              servers. We retain:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-1 ml-2">
              <li>Subscription plan, billing cycle, and payment status</li>
              <li>Invoice history and transaction references</li>
              <li>Billing address if provided</li>
            </ul>

            <h3 className="font-display text-xl font-semibold text-foreground mb-3">
              3.3 Platform usage data
            </h3>
            <ul className="list-disc list-inside mb-4 space-y-1 ml-2">
              <li>Pages and features accessed inside the dashboard</li>
              <li>Actions taken (automations created, campaigns sent, content published)</li>
              <li>Error logs and performance diagnostics</li>
              <li>IP address, browser type, and device information</li>
            </ul>

            <h3 className="font-display text-xl font-semibold text-foreground mb-3">
              3.4 Support and communications
            </h3>
            <ul className="list-disc list-inside mb-4 space-y-1 ml-2">
              <li>Messages you send to our support team</li>
              <li>Feedback, bug reports, and feature requests</li>
              <li>Conversations with our AI agent (Max) during onboarding and support</li>
            </ul>
          </section>

          {/* 4 */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              4. Meta Platform Data (Facebook and Instagram)
            </h2>
            <p className="mb-4 leading-relaxed">
              The Platform integrates with Facebook and Instagram through the
              Meta Graph API so that you can manage your social presence,
              respond to customers, run and monitor ad campaigns, and analyse
              performance from one place. This section describes exactly what
              we access, how we use it, and how you can revoke our access.
            </p>

            <h3 className="font-display text-xl font-semibold text-foreground mb-3">
              4.1 What we access from Facebook
            </h3>
            <ul className="list-disc list-inside mb-4 space-y-1 ml-2">
              <li>Your Facebook profile ID, name, and email address (to identify the connecting user)</li>
              <li>The list of Facebook Pages you manage and a Page access token for each (only for Pages you select)</li>
              <li>Public content on connected Pages: posts, comments, reviews, ratings, and engagement metrics</li>
              <li>Messenger conversations sent to and from the connected Page</li>
              <li>Lead Ads form definitions and lead submissions delivered through those forms</li>
              <li>Ad campaign data, ad insights, ad creatives, and ad account metadata for the ad account you authorise</li>
              <li>Page-level insights: organic reach, impressions, and engagement metrics</li>
            </ul>

            <h3 className="font-display text-xl font-semibold text-foreground mb-3">
              4.2 What we access from Instagram
            </h3>
            <ul className="list-disc list-inside mb-4 space-y-1 ml-2">
              <li>Your Instagram Business or Creator account ID, username, display name, profile picture, and account type</li>
              <li>Your recent posts and their public metadata (media URLs, captions, timestamps)</li>
              <li>Comments on your posts and direct messages sent to and from your account</li>
              <li>Account-level insights: reach, views, impressions, and engagement metrics</li>
            </ul>

            <h3 className="font-display text-xl font-semibold text-foreground mb-3">
              4.3 How we use Meta Platform Data
            </h3>
            <ul className="list-disc list-inside mb-4 space-y-1 ml-2">
              <li>To display your connected Pages and accounts on your dashboard</li>
              <li>To show Facebook reviews and recommendations in your dashboard and optionally on your public website</li>
              <li>To execute comment auto-reply and DM automations you configure</li>
              <li>To surface inbound messages in your shared inbox so your team can respond</li>
              <li>To display ad campaign performance, spend, leads, and ROI in your Marketing module</li>
              <li>To allow you to pause, resume, or adjust ad campaign budgets from the dashboard</li>
              <li>To pull Lead Ads form submissions into your CRM automatically</li>
              <li>To publish images, reels, and carousels to your connected Instagram account at your direction</li>
              <li>To show organic reach and engagement alongside paid ad performance in one combined view</li>
            </ul>

            <h3 className="font-display text-xl font-semibold text-foreground mb-3">
              4.4 What we do NOT do with Meta Platform Data
            </h3>
            <ul className="list-disc list-inside mb-4 space-y-1 ml-2">
              <li>We do not sell, rent, or lease Meta Platform Data to any third party</li>
              <li>We do not use Meta Platform Data for advertising targeting other than as explicitly authorised by you</li>
              <li>We do not share Meta Platform Data across the accounts of different customers</li>
              <li>We do not use Meta Platform Data to train general-purpose AI or machine-learning models</li>
              <li>We do not retain Meta Platform Data after you disconnect the integration, except where required by law</li>
            </ul>

            <h3 className="font-display text-xl font-semibold text-foreground mb-3">
              4.5 How to revoke our access to Meta Platform Data
            </h3>
            <p className="mb-3 leading-relaxed">You can revoke access at any time in two ways:</p>
            <ul className="list-disc list-inside mb-4 space-y-1 ml-2">
              <li>
                <strong>Inside the Platform:</strong> go to Social, find the connected Facebook or Instagram account, and click Disconnect. This invalidates the access token and stops all processing immediately.
              </li>
              <li>
                <strong>Inside Facebook:</strong> go to Settings &amp; Privacy &rarr; Settings &rarr; Apps and Websites and remove The Upgrade Shop from the list of authorised apps.
              </li>
            </ul>
            <p className="leading-relaxed">
              After revocation we delete the relevant access tokens immediately
              and purge stored Meta Platform Data within 30 days, except where
              retention is required by law.
            </p>
          </section>

          {/* 5 */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              5. WhatsApp Business Data
            </h2>
            <p className="leading-relaxed mb-4">
              The Platform integrates with the WhatsApp Business API (operated
              by Meta Platforms, Inc.) to enable business messaging. When you
              connect a WhatsApp Business number, we access and process:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-1 ml-2">
              <li>Your WhatsApp Business Account ID and phone number</li>
              <li>Message templates you create and submit for Meta approval</li>
              <li>Inbound and outbound messages between your business number and your customers</li>
              <li>Delivery and read status of messages</li>
              <li>Contact phone numbers and names of people who message your business</li>
            </ul>
            <p className="leading-relaxed mb-4">
              We use this data to operate the shared inbox, run broadcast
              campaigns, power AI agent conversations with your customers, and
              trigger automation workflows.
            </p>
            <p className="leading-relaxed">
              You are responsible for ensuring that your customers have opted
              in to receive WhatsApp communications from your business. Message
              history is retained for the period necessary to provide the
              service and support your inbox, after which it is deleted
              according to our retention schedule.
            </p>
          </section>

          {/* 6 */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              6. Google Integration Data
            </h2>
            <p className="leading-relaxed mb-4">
              If you connect Google services, we access the following with
              your authorisation:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-1 ml-2">
              <li>
                <strong>Google Analytics:</strong> aggregated website traffic
                metrics (sessions, users, bounce rate, top pages) for your
                connected website. We do not access individual visitor
                identities.
              </li>
              <li>
                <strong>Google Search Console:</strong> search performance data
                (impressions, clicks, average position, top queries) for your
                website&rsquo;s domain.
              </li>
            </ul>
            <p className="leading-relaxed">
              This data is fetched on demand and displayed in your Analytics
              module. We do not store raw Google Analytics data in our
              database; aggregated metrics are cached temporarily for
              performance. You can disconnect Google integrations at any time
              from your dashboard settings.
            </p>
          </section>

          {/* 7 */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              7. Payment and Billing Data
            </h2>
            <p className="leading-relaxed mb-4">
              Subscription billing is handled by our payment processor,
              SUMIT. When you subscribe, SUMIT processes your payment details
              directly under their own privacy policy. We receive and store
              only:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-1 ml-2">
              <li>A tokenised customer reference from SUMIT (no raw card data on our servers)</li>
              <li>Transaction IDs, amounts, dates, and statuses</li>
              <li>Subscription plan, billing cycle, and renewal dates</li>
              <li>Invoices issued to your business</li>
            </ul>
            <p className="leading-relaxed">
              We retain billing records for the period required by Israeli tax
              and accounting law (currently 7 years). Subscription payment
              data for your own customers (if you use the Store module for
              your business) is processed on your behalf as described in
              Section 9.
            </p>
          </section>

          {/* 8 */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              8. AI Agent and Conversation Data
            </h2>
            <p className="leading-relaxed mb-4">
              Every account includes a personal AI agent that can communicate
              with you via WhatsApp and the dashboard. Additionally, your
              customers may interact with your own AI agent (configured by
              you) through your WhatsApp Business number.
            </p>
            <ul className="list-disc list-inside mb-4 space-y-1 ml-2">
              <li>
                <strong>Your conversations with our platform&rsquo;s AI agent (Max):</strong> logged
                and used to improve response quality, provide onboarding
                support, and maintain context across sessions.
              </li>
              <li>
                <strong>Your customers&rsquo; conversations with your AI agent:</strong> processed
                on your behalf (see Section 9). Your customers&rsquo; message
                content is used to generate responses and may be stored in a
                knowledge graph to maintain conversational context over time.
              </li>
            </ul>
            <p className="leading-relaxed mb-4">
              AI responses are generated using large language models provided
              by third-party AI providers (see Sub-processors in Section 11).
              Conversation data sent to these providers is subject to our data
              processing agreements with them and is not used to train their
              public models.
            </p>
            <p className="leading-relaxed">
              You can request deletion of AI conversation history by emailing
              privacy@upgradeshop.ai.
            </p>
          </section>

          {/* 9 */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              9. Data We Process on Your Customers&rsquo; Behalf
            </h2>
            <p className="leading-relaxed mb-4">
              When you use The Upgrade Shop to run your business, you entrust
              us with your customers&rsquo; personal data. You are the data
              controller; we are your data processor. The categories of data
              we process on your behalf include:
            </p>

            <h3 className="font-display text-xl font-semibold text-foreground mb-3">
              9.1 CRM — Contacts and Companies
            </h3>
            <ul className="list-disc list-inside mb-4 space-y-1 ml-2">
              <li>Names, phone numbers, email addresses, and business details of your contacts</li>
              <li>Pipeline stage, lead source, and activity history</li>
              <li>Custom fields you define for your business</li>
              <li>Tags, notes, and communication logs</li>
            </ul>

            <h3 className="font-display text-xl font-semibold text-foreground mb-3">
              9.2 Messaging and Inbox
            </h3>
            <ul className="list-disc list-inside mb-4 space-y-1 ml-2">
              <li>WhatsApp, Facebook Messenger, and Instagram DM conversations with your customers</li>
              <li>Message content, timestamps, and delivery status</li>
              <li>Broadcast campaign recipient lists and engagement data</li>
            </ul>

            <h3 className="font-display text-xl font-semibold text-foreground mb-3">
              9.3 Email Marketing
            </h3>
            <ul className="list-disc list-inside mb-4 space-y-1 ml-2">
              <li>Email addresses and names of your mailing list subscribers</li>
              <li>Subscription preferences, opt-in/opt-out status, and consent timestamps</li>
              <li>Campaign open rates, click-through rates, and bounce data</li>
            </ul>

            <h3 className="font-display text-xl font-semibold text-foreground mb-3">
              9.4 Website Visitors
            </h3>
            <ul className="list-disc list-inside mb-4 space-y-1 ml-2">
              <li>Form submissions made on websites we host for you</li>
              <li>Analytics events collected on your website (depending on your tracking configuration)</li>
            </ul>

            <h3 className="font-display text-xl font-semibold text-foreground mb-3">
              9.5 Online Store
            </h3>
            <ul className="list-disc list-inside mb-4 space-y-1 ml-2">
              <li>Order details, product purchases, and transaction history of your customers</li>
              <li>Subscription plan and billing status of your customers&rsquo; recurring orders</li>
              <li>Shipping addresses if collected</li>
            </ul>

            <h3 className="font-display text-xl font-semibold text-foreground mb-3">
              9.6 Digital Courses Infrastructure
            </h3>
            <p className="leading-relaxed mb-3">
              If you run digital courses through our platform, we process
              data about your enrolled students on your behalf:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-1 ml-2">
              <li>Student names and email addresses</li>
              <li>Enrollment status, progress through course content, and completion records</li>
              <li>Video watch progress and assessment results</li>
            </ul>
            <p className="leading-relaxed">
              You are responsible for including appropriate disclosures about
              this data processing in your own privacy policy presented to
              your students.
            </p>

            <h3 className="font-display text-xl font-semibold text-foreground mb-3">
              9.7 Dispatch and Field Service
            </h3>
            <ul className="list-disc list-inside mb-4 space-y-1 ml-2">
              <li>Customer names and contact details associated with service jobs</li>
              <li>Job details, status history, and technician assignments</li>
              <li>Scheduling and appointment data</li>
            </ul>
          </section>

          {/* 10 */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              10. How We Use Your Information
            </h2>
            <p className="leading-relaxed mb-3">We process your personal data to:</p>
            <ul className="list-disc list-inside mb-4 space-y-1 ml-2">
              <li>Provide, operate, and improve the Platform and its features</li>
              <li>Process payments and manage your subscription</li>
              <li>Send service notifications, billing alerts, and product updates</li>
              <li>Provide customer support and respond to enquiries</li>
              <li>Power the AI agent features on your account</li>
              <li>Detect, investigate, and prevent fraud, abuse, and security incidents</li>
              <li>Comply with our legal obligations</li>
              <li>Enforce our Terms of Service</li>
            </ul>

            <h3 className="font-display text-xl font-semibold text-foreground mb-3">
              10.1 Lawful Basis for Processing (GDPR and Israeli Privacy Law)
            </h3>
            <p className="leading-relaxed mb-3">
              We rely on the following lawful bases under the GDPR where
              applicable, and the Israeli Privacy Protection Law 5741-1981:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li><strong>Contract performance</strong> — processing necessary to deliver the Platform services you subscribed to</li>
              <li><strong>Legitimate interests</strong> — platform security, fraud prevention, service improvement</li>
              <li><strong>Legal obligation</strong> — retaining billing records as required by law</li>
              <li><strong>Consent</strong> — where you have opted in to marketing communications or connected a third-party integration</li>
            </ul>
          </section>

          {/* 11 */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              11. Sub-processors and Data Sharing
            </h2>
            <p className="leading-relaxed mb-4">
              We do not sell your personal data. We share it only with trusted
              sub-processors required to operate the Platform, and only to
              the extent necessary:
            </p>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-foreground/20">
                    <th className="text-left py-2 pr-4 font-semibold text-foreground">Sub-processor</th>
                    <th className="text-left py-2 pr-4 font-semibold text-foreground">Purpose</th>
                    <th className="text-left py-2 font-semibold text-foreground">Location</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-foreground/10">
                  <tr><td className="py-2 pr-4">Hetzner Online GmbH</td><td className="py-2 pr-4">Cloud server infrastructure and database hosting</td><td className="py-2">Germany / EU</td></tr>
                  <tr><td className="py-2 pr-4">Cloudflare, Inc.</td><td className="py-2 pr-4">CDN, DDoS protection, DNS</td><td className="py-2">USA</td></tr>
                  <tr><td className="py-2 pr-4">Anthropic, PBC</td><td className="py-2 pr-4">AI language model provider (Claude)</td><td className="py-2">USA</td></tr>
                  <tr><td className="py-2 pr-4">OpenAI, Inc.</td><td className="py-2 pr-4">AI language model provider (GPT models)</td><td className="py-2">USA</td></tr>
                  <tr><td className="py-2 pr-4">Meta Platforms, Inc.</td><td className="py-2 pr-4">Facebook and Instagram Graph API integration</td><td className="py-2">USA</td></tr>
                  <tr><td className="py-2 pr-4">Meta / WhatsApp</td><td className="py-2 pr-4">WhatsApp Business API messaging</td><td className="py-2">USA</td></tr>
                  <tr><td className="py-2 pr-4">Google LLC</td><td className="py-2 pr-4">Google Analytics and Search Console integrations, Google sign-in</td><td className="py-2">USA</td></tr>
                  <tr><td className="py-2 pr-4">SUMIT</td><td className="py-2 pr-4">Subscription billing and payment processing</td><td className="py-2">Israel</td></tr>
                  <tr><td className="py-2 pr-4">Amazon Web Services</td><td className="py-2 pr-4">File and media storage (R2-compatible object storage via Cloudflare)</td><td className="py-2">USA / EU</td></tr>
                  <tr><td className="py-2 pr-4">Bunny.net</td><td className="py-2 pr-4">Video hosting and streaming for digital courses</td><td className="py-2">EU</td></tr>
                  <tr><td className="py-2 pr-4">ElevenLabs</td><td className="py-2 pr-4">AI voice dubbing for course videos (when enabled)</td><td className="py-2">USA</td></tr>
                  <tr><td className="py-2 pr-4">Resend / email provider</td><td className="py-2 pr-4">Transactional email delivery</td><td className="py-2">USA</td></tr>
                </tbody>
              </table>
            </div>
            <p className="leading-relaxed">
              We also share data when required by law, court order, or
              governmental authority, and in connection with a merger,
              acquisition, or sale of assets (in which case we will notify
              you).
            </p>
          </section>

          {/* 12 */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              12. Data Retention
            </h2>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>
                <strong>Account data</strong> — retained for the duration of
                your subscription and for 30 days after cancellation (to allow
                data export), then deleted.
              </li>
              <li>
                <strong>Billing records</strong> — retained for 7 years as
                required by Israeli law.
              </li>
              <li>
                <strong>Meta Platform Data</strong> — deleted within 30 days
                of disconnecting the integration, except where legally
                required.
              </li>
              <li>
                <strong>WhatsApp message history</strong> — retained while
                your account is active; deleted within 30 days of account
                closure unless you request an export.
              </li>
              <li>
                <strong>AI conversation logs</strong> — retained to maintain
                context and improve responses; deletable on request via
                privacy@upgradeshop.ai.
              </li>
              <li>
                <strong>Customer data processed on your behalf</strong> —
                retained in accordance with your instructions or until account
                closure, whichever comes first.
              </li>
            </ul>
          </section>

          {/* 13 */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              13. Security
            </h2>
            <p className="leading-relaxed mb-4">
              We implement industry-standard technical and organisational
              measures to protect personal data, including:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Encrypted connections (HTTPS/TLS) for all data in transit</li>
              <li>Encrypted storage for sensitive credentials and access tokens</li>
              <li>Access controls limiting data access to authorised personnel</li>
              <li>Regular automated database backups</li>
              <li>Monitoring for unusual activity and security incidents</li>
            </ul>
            <p className="leading-relaxed mt-4">
              No method of transmission over the internet is 100% secure. If
              we become aware of a data breach affecting your personal data, we
              will notify you as required by applicable law.
            </p>
          </section>

          {/* 14 */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              14. Your Rights
            </h2>
            <p className="leading-relaxed mb-3">
              Depending on your jurisdiction, you have the right to:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-1 ml-2">
              <li>Access the personal information we hold about you</li>
              <li>Correct or update inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Object to or restrict certain processing</li>
              <li>Withdraw consent at any time, where consent is the basis</li>
              <li>Receive your information in a portable, machine-readable format</li>
              <li>
                Lodge a complaint with a supervisory authority — in Israel, the
                Privacy Protection Authority (gov.il); in the EU, your local
                data protection authority; in the UK, the ICO
              </li>
            </ul>
            <p className="leading-relaxed">
              To exercise any of these rights, email{" "}
              <strong>privacy@upgradeshop.ai</strong>. We will respond within
              30 days (or sooner where required by law).
            </p>
          </section>

          {/* 15 */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              15. International Data Transfers
            </h2>
            <p className="leading-relaxed mb-4">
              We are based in Israel. Israel has been recognised by the
              European Commission as providing an adequate level of data
              protection under GDPR Article 45.
            </p>
            <p className="leading-relaxed">
              Some of our sub-processors are located in the United States and
              other jurisdictions. Where required, we rely on the European
              Commission&rsquo;s Standard Contractual Clauses or equivalent
              transfer mechanisms. A list of sub-processors and their locations
              is in Section 11.
            </p>
          </section>

          {/* 16 */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              16. Children&rsquo;s Privacy
            </h2>
            <p className="leading-relaxed">
              The Platform is intended for business use by adults. We do not
              knowingly collect personal data from anyone under 18 years of
              age. If we become aware that we have inadvertently collected such
              data, we will delete it promptly.
            </p>
          </section>

          {/* 17 */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              17. Changes to This Policy
            </h2>
            <p className="leading-relaxed">
              We may update this policy from time to time. When we make
              material changes, we will notify you by email or by a prominent
              notice on the Platform at least 14 days before they take effect.
              The &ldquo;Last updated&rdquo; date at the top of this page
              reflects the most recent revision.
            </p>
          </section>

          {/* 18 */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              18. Contact Us
            </h2>
            <p className="leading-relaxed mb-4">
              For privacy-related questions, data requests, or complaints:
            </p>
            <ul className="list-none space-y-1 ml-2">
              <li><strong>The Upgrade Shop</strong></li>
              <li>ח.פ. 300330123</li>
              <li>Har Hatzofim 11, Holon, Israel</li>
              <li>Privacy enquiries: privacy@upgradeshop.ai</li>
              <li>General contact: hello@upgradeshop.ai</li>
            </ul>
          </section>

        </div>
      </div>
    </div>
  );
}
