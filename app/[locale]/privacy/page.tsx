import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | The Upgrade Shop",
  description:
    "Privacy policy for The Upgrade Shop. How we collect, use, store, and protect your personal data and the data you authorize us to access on connected platforms including Facebook, Instagram, WhatsApp, and Google.",
  alternates: {
    canonical: "https://upgradeshop.ai/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy | The Upgrade Shop",
    description:
      "Privacy policy for The Upgrade Shop. How we collect, use, store, and protect your personal data.",
    url: "https://upgradeshop.ai/privacy-policy",
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
        <p className="text-foreground/60 mb-2">Effective date: October 19, 2026</p>
        <p className="text-foreground/60 mb-12">Last updated: October 23, 2026</p>

        <div className="space-y-12 text-foreground/80">

          {/* 1 */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              1. Who We Are
            </h2>
            <p className="leading-relaxed mb-4">
              The Upgrade Shop (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is a fully managed digital and software agency for small businesses. We build and run a business&rsquo;s website, CRM, email, WhatsApp, online store, courses, funnels and other digital tools for the owner. A real person, the account manager, looks after every package, and each account has its own AI assistant that works alongside the team. We are registered in Israel under company registration number 300330123, with registered address at Har Hatzofim 11, Holon, Israel.
            </p>
            <p className="leading-relaxed">
              Customers use our service through the dashboard at <strong>app.upgradeshop.ai</strong>. This policy also covers our public website at <strong>upgradeshop.ai</strong>, including the waitlist form, the contact form and the chat with Max, our own AI assistant on that website. The terms that govern the service are in our <a href="/terms-of-use" className="underline">Terms of Use</a>.
            </p>
          </section>

          {/* 2 */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              2. Scope of This Policy: The Roles We Play
            </h2>
            <p className="leading-relaxed mb-4">
              Depending on the context, we act in one of two legal roles with respect to personal data:
            </p>

            <h3 className="font-display text-xl font-semibold text-foreground mb-3">
              2.1 Data controller: for our own customers and visitors
            </h3>
            <p className="leading-relaxed mb-4">
              We are the <strong>data controller</strong> for the personal data of:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-1 ml-2">
              <li>Account holders and their team members who use our dashboard</li>
              <li>People who join our waitlist</li>
              <li>People who chat with Max or use the contact form on upgradeshop.ai</li>
              <li>People who buy from us through our checkout</li>
              <li>Prospects and customers we correspond with</li>
            </ul>
            <p className="leading-relaxed mb-4">
              This policy describes how we handle that data.
            </p>

            <h3 className="font-display text-xl font-semibold text-foreground mb-3">
              2.2 Data processor: for our customers&rsquo; contacts
            </h3>
            <p className="leading-relaxed mb-4">
              When a business owner uses our service to manage their own contacts and customers (storing contacts in the CRM, sending WhatsApp messages, running email campaigns, hosting a website, operating an online store, or managing course students), the business owner is the <strong>data controller</strong> for that data, and we act as their <strong>data processor</strong>.
            </p>
            <p className="leading-relaxed">
              In that role we process the data only on the business owner&rsquo;s instructions and under the terms in the &ldquo;Data we handle for you&rdquo; section of our <a href="/terms-of-use" className="underline">Terms of Use</a>. The list of sub-processors is in Section 12 of this policy, and we give customers 30 days&rsquo; notice by email before we add or replace one. Business owners are responsible for having a lawful basis to collect their contacts&rsquo; data and for giving their contacts an appropriate privacy notice.
            </p>
          </section>

          {/* 3 */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              3. Information We Collect About You
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
              Our online reseller Paddle.com handles subscription billing (see Section 7). We do not store full card numbers on our servers. We retain:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-1 ml-2">
              <li>Subscription package, tier, billing period, and payment status</li>
              <li>Invoice history and transaction references</li>
              <li>Billing address and tax details if provided</li>
            </ul>

            <h3 className="font-display text-xl font-semibold text-foreground mb-3">
              3.3 Service usage data
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
              <li>Messages you send to your account manager, our team or our support</li>
              <li>Feedback, bug reports, requests and approvals</li>
              <li>Conversations with your AI assistant, and with Max while you are setting up</li>
            </ul>

            <h3 className="font-display text-xl font-semibold text-foreground mb-3">
              3.5 Visitors to upgradeshop.ai
            </h3>
            <p className="leading-relaxed mb-3">
              If you use our public website we collect only what you give us or what your browser sends:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li><strong>Waitlist:</strong> your name, email address, WhatsApp number and language, and the IP address of your request. We use them to manage the waitlist, to tell you about the launch and about the Founder Price, and to contact you by email or WhatsApp about those things. You can ask us to stop at any time.</li>
              <li><strong>Contact form:</strong> your name, email address, phone number if you give one, and your message. We use them to answer you.</li>
              <li><strong>Chat with Max:</strong> Max is an AI assistant, not a person. We log the conversation to run and improve the chat. We keep conversations anonymous unless you give us your name, email address or phone number. Please do not type sensitive personal information, such as health or payment card details, into the chat.</li>
              <li><strong>Checkout:</strong> the details needed to take payment and issue your invoice, handled as described in Section 7.</li>
              <li><strong>Browser storage:</strong> the website stores your language choice in a cookie and in your browser&rsquo;s local storage so that it remembers it on your next visit. If you start our checkout, the form keeps what you have typed in your browser&rsquo;s local storage so that you don&rsquo;t lose it; it stays on your device. We do not run advertising cookies or third-party analytics on upgradeshop.ai.</li>
            </ul>
          </section>

          {/* 4 */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              4. Meta Platform Data (Facebook and Instagram)
            </h2>
            <p className="mb-4 leading-relaxed">
              The service integrates with Facebook and Instagram through the Meta Graph API so that you can manage your social presence, respond to customers, run and monitor ad campaigns, and analyse performance from one place. Facebook and Instagram are your own accounts: they are services you connect, not our sub-processors. This section describes exactly what we access, how we use it, and how you can revoke our access.
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
              <li>To allow you, or your account manager with your approval, to pause, resume, or adjust ad campaign budgets</li>
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
              <li>We do not keep Meta Platform Data after you disconnect the integration, beyond the deletion period in Section 4.5 and any period the law requires</li>
            </ul>

            <h3 className="font-display text-xl font-semibold text-foreground mb-3">
              4.5 How to revoke our access to Meta Platform Data
            </h3>
            <p className="mb-3 leading-relaxed">
              You can revoke access at any time in two ways:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-1 ml-2">
              <li>
                <strong>Inside the service:</strong> go to Social, find the connected Facebook or Instagram account, and click Disconnect. This invalidates the access token and stops all processing immediately.
              </li>
              <li>
                <strong>Inside Facebook:</strong> go to Settings &amp; Privacy &rarr; Settings &rarr; Apps and Websites and remove The Upgrade Shop from the list of authorised apps.
              </li>
            </ul>
            <p className="leading-relaxed">
              After revocation we delete the relevant access tokens immediately and delete stored Meta Platform Data within 30 days, except where retention is required by law. You can also ask us to delete your Meta Platform Data by emailing <strong>privacy@upgradeshop.ai</strong>.
            </p>
          </section>

          {/* 5 */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              5. WhatsApp Business Data
            </h2>
            <p className="leading-relaxed mb-4">
              The service integrates with the WhatsApp Business API (operated by Meta Platforms, Inc., an independent company) to enable business messaging. When you connect a WhatsApp Business number, we access and process:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-1 ml-2">
              <li>Your WhatsApp Business Account ID and phone number</li>
              <li>Message templates you create and submit for Meta approval</li>
              <li>Inbound and outbound messages between your business number and your customers</li>
              <li>Delivery and read status of messages</li>
              <li>Contact phone numbers and names of people who message your business</li>
            </ul>
            <p className="leading-relaxed mb-4">
              We use this data to operate the shared inbox, run broadcast campaigns, power your AI assistant&rsquo;s conversations with your customers, and trigger automation workflows.
            </p>
            <p className="leading-relaxed">
              You are responsible for ensuring that your customers have opted in to receive WhatsApp communications from your business. Message history is kept while your account is active. When the account ends it is handled as set out in Section 13.
            </p>
          </section>

          {/* 6 */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              6. Google Integration Data
            </h2>
            <p className="leading-relaxed mb-4">
              If you connect Google services, we access the following with your authorisation, and only for the services you connect:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-1 ml-2">
              <li><strong>Google sign-in:</strong> your name, email address and profile picture, to identify you.</li>
              <li><strong>Google Analytics:</strong> aggregated website traffic metrics (sessions, users, bounce rate, top pages) for your connected website. We do not access individual visitor identities.</li>
              <li><strong>Google Search Console:</strong> search performance data (impressions, clicks, average position, top queries) for your website&rsquo;s domain, and site verification for that domain.</li>
              <li><strong>Gmail:</strong> reading and sending email from your connected mailbox, for the email features you use.</li>
              <li><strong>Google Drive, Docs and Sheets:</strong> read-only access to the files and spreadsheets you choose to use with the service.</li>
              <li><strong>Google Calendar:</strong> reading your calendar and creating or changing events on it.</li>
              <li><strong>Google Contacts:</strong> read-only access to your contacts, so that you can import them.</li>
            </ul>
            <p className="leading-relaxed">
              Analytics and Search Console data is fetched from Google every day and stored in our database as daily summaries (for Analytics) and as search performance rows (for Search Console), so that your Analytics module can show trends over time. It stays there while the integration is connected and is deleted with the rest of your account data under Section 13, or sooner if you ask us. We use data we receive from Google only to provide the features you connected it for. We do not sell it, and we do not use it for advertising. You can disconnect any Google integration at any time from your dashboard settings.
            </p>
          </section>

          {/* 7 */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              7. Payment and Billing Data
            </h2>
            <p className="leading-relaxed mb-4">
              Prices are in US dollars. Subscriptions are sold through our online reseller Paddle.com, which is the Merchant of Record for all our orders. Paddle receives the details it needs to take your payment, handle tax and prevent fraud, and uses them under its own privacy notice. Accounts that started before we moved to Paddle may still be billed through our previous payment provider, SUMIT, until they move. We receive and store only:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-1 ml-2">
              <li>A tokenised customer reference from the provider (no raw card data on our servers)</li>
              <li>Transaction IDs, amounts, dates, and statuses</li>
              <li>Package, tier, billing period, and renewal dates</li>
              <li>Invoices issued to your business</li>
            </ul>
            <p className="leading-relaxed mb-4">
              We keep billing records for as long as the tax and accounting laws that apply to us and to your account require.
            </p>
            <p className="leading-relaxed">
              If you use the Store or Payments modules, you connect your own payment gateway (for example SUMIT, Green Invoice or Stripe). That gateway is your own provider, not our sub-processor. We store the connection tokens and the order and payment data needed to show your orders, and we process that data on your behalf as described in Section 10. Tax documents issued through your gateway are yours.
            </p>
          </section>

          {/* 8 */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              8. Your AI Assistant and Conversation Data
            </h2>
            <p className="leading-relaxed mb-4">
              Every account has its own AI assistant, named by you, that works with the modules your account has. It talks to you in the dashboard, and where you have the WhatsApp module it also talks to you and to your customers through your WhatsApp Business number. Max is our own AI assistant, on our own website and while you set up.
            </p>
            <ul className="list-disc list-inside mb-4 space-y-1 ml-2">
              <li><strong>Your conversations with your AI assistant and with Max:</strong> logged, and used to run the service, provide support, and keep context across sessions.</li>
              <li><strong>Your customers&rsquo; conversations with your AI assistant:</strong> processed on your behalf (see Section 10). The message content is used to generate responses and is kept as a memory of the conversation with that contact, so that the assistant remembers earlier exchanges.</li>
            </ul>
            <p className="leading-relaxed mb-4">
              We keep technical logs of requests sent to AI providers and the responses, to run the service and investigate problems. These logs and the contact memory are deleted with the rest of the account data under Section 13. A customer can ask us to delete the memory or logs for a particular contact by emailing <strong>privacy@upgradeshop.ai</strong>.
            </p>
            <p className="leading-relaxed">
              AI responses are generated by third-party AI providers, listed in Section 12 with the task each one is used for. We send each provider only what the task needs. Each provider processes that data under its own terms for business customers. The people talking to an assistant should be told that it is an AI assistant, and customers are responsible for that notice in their own conversations. If you prefer that your account&rsquo;s data is not sent to DeepSeek, ask your account manager or email <strong>privacy@upgradeshop.ai</strong> and we will stop using DeepSeek on your account. The tasks it handled then run on other AI providers, which cost more, so some actions may use more Action Points.
            </p>
          </section>

          {/* 9 */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              9. Who Can Access Your Data: Our People
            </h2>
            <p className="leading-relaxed mb-4">
              We are a managed service, so people work inside customer accounts. Depending on the package and tier, that includes your account manager, a marketer, a designer, and other members of our team. They may be our employees or independent contractors, and they may be in different countries.
            </p>
            <p className="leading-relaxed">
              They can see and use the contacts, conversations, content and settings of an account only as far as they need to in order to do the work for that customer, and they are required to keep it confidential. Spending your advertising budget and work that we quote for need your approval first. We do not allow anyone to use account data for any other purpose.
            </p>
          </section>

          {/* 10 */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              10. Data We Process on Your Customers&rsquo; Behalf
            </h2>
            <p className="leading-relaxed mb-4">
              When you use The Upgrade Shop to run your business, you entrust us with your customers&rsquo; personal data. You are the data controller; we are your data processor. The categories of data we process on your behalf include:
            </p>

            <h3 className="font-display text-xl font-semibold text-foreground mb-3">
              10.1 CRM: Contacts and Companies
            </h3>
            <ul className="list-disc list-inside mb-4 space-y-1 ml-2">
              <li>Names, phone numbers, email addresses, and business details of your contacts</li>
              <li>Pipeline stage, lead source, and activity history</li>
              <li>Custom fields you define for your business</li>
              <li>Tags, notes, and communication logs</li>
            </ul>

            <h3 className="font-display text-xl font-semibold text-foreground mb-3">
              10.2 Messaging and Inbox
            </h3>
            <ul className="list-disc list-inside mb-4 space-y-1 ml-2">
              <li>WhatsApp, Facebook Messenger, and Instagram DM conversations with your customers</li>
              <li>Message content, timestamps, and delivery status</li>
              <li>Broadcast campaign recipient lists and engagement data</li>
            </ul>

            <h3 className="font-display text-xl font-semibold text-foreground mb-3">
              10.3 Email Marketing
            </h3>
            <ul className="list-disc list-inside mb-4 space-y-1 ml-2">
              <li>Email addresses and names of your mailing list subscribers</li>
              <li>Subscription preferences, opt-in/opt-out status, and consent timestamps</li>
              <li>Campaign open rates, click-through rates, and bounce data</li>
            </ul>

            <p className="leading-relaxed mb-4">
              <strong>Mail sent to your business&rsquo;s domain.</strong> If you turn on email forwarding, mail that people send to addresses on your domain is received by Amazon Web Services and forwarded to you. We keep the full message for 30 days and the sender&rsquo;s address for 30 days, so we can forward it and look into delivery problems, and then we delete them. We process this mail on your behalf, like the rest of the data in this section.
            </p>

            <h3 className="font-display text-xl font-semibold text-foreground mb-3">
              10.4 Website Visitors
            </h3>
            <ul className="list-disc list-inside mb-4 space-y-1 ml-2">
              <li>Form submissions made on websites we host for you</li>
              <li>Analytics events collected on your website (depending on your tracking configuration)</li>
            </ul>
            <p className="leading-relaxed mb-4">
              You are responsible for the cookie and consent notices that your website needs, as the controller of your visitors&rsquo; data. Your account manager can tell you what your website collects.
            </p>

            <h3 className="font-display text-xl font-semibold text-foreground mb-3">
              10.5 Online Store
            </h3>
            <ul className="list-disc list-inside mb-4 space-y-1 ml-2">
              <li>Order details, product purchases, and transaction history of your customers</li>
              <li>Subscription plan and billing status of your customers&rsquo; recurring orders</li>
              <li>Shipping addresses if collected</li>
            </ul>

            <h3 className="font-display text-xl font-semibold text-foreground mb-3">
              10.6 Digital Courses
            </h3>
            <p className="leading-relaxed mb-3">
              If you run digital courses through our service, we process data about your enrolled students on your behalf:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-1 ml-2">
              <li>Student names and email addresses</li>
              <li>Enrollment status, progress through course content, and completion records</li>
              <li>Video watch progress and assessment results</li>
            </ul>
            <p className="leading-relaxed mb-4">
              You are responsible for including appropriate disclosures about this data processing in your own privacy policy presented to your students.
            </p>

            <h3 className="font-display text-xl font-semibold text-foreground mb-3">
              10.7 Dispatch and Field Service
            </h3>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Customer names and contact details associated with service jobs</li>
              <li>Job details, status history, and technician assignments</li>
              <li>Scheduling and appointment data. If you use maps and routing, addresses are sent to Google Maps to plan routes.</li>
            </ul>
          </section>

          {/* 11 */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              11. How We Use Your Information, and Our Legal Bases
            </h2>
            <p className="leading-relaxed mb-3">
              We process personal data to:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-1 ml-2">
              <li>Provide, operate, and improve the service and its features</li>
              <li>Do the work you have asked our team to do</li>
              <li>Process payments and manage your subscription</li>
              <li>Send service notifications, billing alerts, and product updates</li>
              <li>Run the waitlist and tell waitlist members about the launch and the Founder Price</li>
              <li>Provide customer support and respond to enquiries</li>
              <li>Power the AI assistant features on your account</li>
              <li>Detect, investigate, and prevent fraud, abuse, and security incidents</li>
              <li>Comply with our legal obligations</li>
              <li>Enforce our Terms of Use</li>
            </ul>

            <h3 className="font-display text-xl font-semibold text-foreground mb-3">
              11.1 Lawful Basis for Processing
            </h3>
            <p className="leading-relaxed mb-3">
              Where the GDPR, the UK GDPR, the Israeli Privacy Protection Law 5741-1981 or a similar law applies, we rely on these bases:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li><strong>Customers and their team members:</strong> contract performance, to deliver the service you subscribed to; legitimate interests, for security, fraud prevention and service improvement; legal obligation, to keep billing records.</li>
              <li><strong>Waitlist members:</strong> your consent to be contacted about the launch and the Founder Price, which you can withdraw at any time; and our legitimate interest in running the waitlist.</li>
              <li><strong>Visitors who chat with Max or use the contact form:</strong> our legitimate interest in answering you and running the chat, and taking steps at your request before a contract.</li>
              <li><strong>Our customers&rsquo; contacts:</strong> the basis is your customer&rsquo;s, as the controller. We process the data on their instructions.</li>
              <li><strong>Integrations you connect:</strong> your consent when you connect them.</li>
            </ul>
          </section>

          {/* 12 */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              12. Sub-processors and Data Sharing
            </h2>
            <p className="leading-relaxed mb-4">
              We do not sell your personal data. We share it only with the providers needed to run the service, and only as far as the task needs. These are our sub-processors:
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
                  <tr><td className="py-2 pr-4">Hetzner Online GmbH</td><td className="py-2 pr-4">Servers and database hosting</td><td className="py-2">Germany (EU)</td></tr>
                  <tr><td className="py-2 pr-4">Anthropic</td><td className="py-2 pr-4">AI models for the assistants and dashboard AI features</td><td className="py-2">United States</td></tr>
                  <tr><td className="py-2 pr-4">OpenAI</td><td className="py-2 pr-4">AI models (fallback, classification, memory embeddings)</td><td className="py-2">United States</td></tr>
                  <tr><td className="py-2 pr-4">DeepSeek</td><td className="py-2 pr-4">AI models for background tasks (classification, extraction, contact summaries, translation). You can ask us to stop using it on your account (Section 8)</td><td className="py-2">China</td></tr>
                  <tr><td className="py-2 pr-4">Google (Gemini)</td><td className="py-2 pr-4">AI models for document extraction, logo analysis, images, short labels</td><td className="py-2">United States</td></tr>
                  <tr><td className="py-2 pr-4">Amazon Web Services (SES)</td><td className="py-2 pr-4">Email sending, and receiving and forwarding mail sent to your domain (SES, S3)</td><td className="py-2">EU region</td></tr>
                  <tr><td className="py-2 pr-4">Cloudflare</td><td className="py-2 pr-4">File and media storage (R2), DNS</td><td className="py-2">United States, global network</td></tr>
                  <tr><td className="py-2 pr-4">Bunny.net</td><td className="py-2 pr-4">Course video hosting and delivery</td><td className="py-2">Slovenia (EU), global network</td></tr>
                  <tr><td className="py-2 pr-4">Gumlet</td><td className="py-2 pr-4">Course video hosting (existing courses)</td><td className="py-2">India</td></tr>
                  <tr><td className="py-2 pr-4">ElevenLabs</td><td className="py-2 pr-4">AI dubbing of course videos</td><td className="py-2">United States</td></tr>
                  <tr><td className="py-2 pr-4">Paddle.com Market Limited</td><td className="py-2 pr-4">Reseller and Merchant of Record for our subscriptions: payments, tax and fraud prevention (Paddle acts under its own privacy notice)</td><td className="py-2">United Kingdom</td></tr>
                  <tr><td className="py-2 pr-4">SUMIT</td><td className="py-2 pr-4">Payment processing for accounts billed before our move to Paddle</td><td className="py-2">Israel</td></tr>
                </tbody>
              </table>
            </div>
            <p className="leading-relaxed mb-4">
              We give customers 30 days&rsquo; notice by email before we add a sub-processor or replace one.
            </p>
            <p className="leading-relaxed mb-4">
              The services you connect yourself (Google services, Meta, WhatsApp, Facebook and Instagram, your own payment gateways, and Google Maps for Dispatch) are your own providers, described in Sections 4 to 7 and 10. They are not our sub-processors.
            </p>
            <p className="leading-relaxed">
              We also share data when required by law, court order, or governmental authority, and in connection with a merger, acquisition, or sale of assets (in which case we will notify you).
            </p>
          </section>

          {/* 13 */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              13. Data Retention
            </h2>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li><strong>Account data</strong>: kept while your account is active. When you leave, we keep it for 30 days from when you have received everything in your exit package (the data archive, your domain and your website copy), then delete it, except what the law makes us keep.</li>
              <li><strong>Billing records</strong>: kept for as long as the tax and accounting laws that apply require.</li>
              <li><strong>Meta Platform Data</strong>: deleted within 30 days of disconnecting the integration, except where legally required.</li>
              <li><strong>WhatsApp message history</strong>: kept while your account is active, then handled with the rest of the account data as above.</li>
              <li><strong>AI conversation logs and contact memory</strong>: kept while your account is active and deleted with the rest of the account data. You can ask us to delete them sooner by emailing privacy@upgradeshop.ai.</li>
              <li><strong>Customer data processed on your behalf</strong>: kept on your instructions while your account is active, and deleted with the rest of the account data as above.</li>
              <li><strong>Waitlist, contact form and chat data</strong>: kept while we run the waitlist and the related launch messages, or until we have answered your message. You can ask us to delete it at any time.</li>
            </ul>
          </section>

          {/* 14 */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              14. Security
            </h2>
            <p className="leading-relaxed mb-4">
              We implement industry-standard technical and organisational measures to protect personal data, including:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Encrypted connections (HTTPS/TLS) for all data in transit</li>
              <li>Encrypted storage for sensitive credentials and access tokens</li>
              <li>Access controls limiting data access to authorised personnel</li>
              <li>Regular automated database backups</li>
              <li>Monitoring for unusual activity and security incidents</li>
            </ul>
            <p className="leading-relaxed mt-4">
              No method of transmission over the internet is 100% secure. If we become aware of a data breach affecting personal data we hold, we will notify the people affected as required by applicable law. Where we process data as a processor for a customer, we will tell that customer without undue delay after we become aware of it, with what we know about what happened and what data is affected.
            </p>
          </section>

          {/* 15 */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              15. Your Rights
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
              <li>Lodge a complaint with a supervisory authority: in Israel, the Privacy Protection Authority (gov.il); in the EU, your local data protection authority; in the UK, the ICO; elsewhere, the authority in your country</li>
            </ul>
            <p className="leading-relaxed mb-4">
              To exercise any of these rights, email <strong>privacy@upgradeshop.ai</strong>. We will respond within 30 days (or sooner where required by law).
            </p>
            <p className="leading-relaxed">
              If you are a contact or customer of one of our customers, that business is the controller of your data. Please ask the business first. If you write to us, we will pass your request to the business and help it respond.
            </p>
          </section>

          {/* 16 */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              16. International Data Transfers
            </h2>
            <p className="leading-relaxed mb-4">
              Our production servers are in Germany. We are established in Israel, and our team members and contractors may work from other countries. Some of our sub-processors are in the United States, and others are in China, India and Israel, as listed in Section 12. Data can also reach the places where our people work.
            </p>
            <p className="leading-relaxed">
              Where the law requires a transfer mechanism, we rely on the European Commission&rsquo;s Standard Contractual Clauses or an equivalent mechanism. Where a country has been recognised as providing an adequate level of protection, we may rely on that instead.
            </p>
          </section>

          {/* 17 */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              17. Children&rsquo;s Privacy
            </h2>
            <p className="leading-relaxed">
              The service is intended for business use by adults. We do not knowingly collect personal data from anyone under 18 years of age. If we become aware that we have inadvertently collected such data, we will delete it promptly.
            </p>
          </section>

          {/* 18 */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              18. Changes to This Policy
            </h2>
            <p className="leading-relaxed">
              We may update this policy from time to time. When we make material changes, we will notify you by email or by a prominent notice on the service at least 30 days before they take effect. The &ldquo;Last updated&rdquo; date at the top of this page reflects the most recent revision.
            </p>
          </section>

          {/* 19 */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              19. Contact Us
            </h2>
            <p className="leading-relaxed mb-4">
              For privacy-related questions, data requests, or complaints:
            </p>
            <ul className="list-none space-y-1 ml-2">
              <li><strong>The Upgrade Shop</strong></li>
              <li>Company registration number 300330123</li>
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
