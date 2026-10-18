import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use | The Upgrade Shop",
  description:
    "Terms of Use for The Upgrade Shop. Understand your rights and responsibilities, packages and billing, refunds and cancellation, your AI assistant, our managed service, and how you leave with your data, domain and website.",
  alternates: {
    canonical: "https://upgradeshop.ai/terms-of-use",
  },
  openGraph: {
    title: "Terms of Use | The Upgrade Shop",
    description:
      "Terms of Use for The Upgrade Shop. Billing, cancellation and refunds, your price, your AI assistant, our managed service, and your exit package.",
    url: "https://upgradeshop.ai/terms-of-use",
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

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background py-24">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
          Terms of Use
        </h1>
        <p className="text-foreground/60 mb-2">Effective date: October 18, 2026</p>
        <p className="text-foreground/60 mb-12">Last updated: October 18, 2026</p>

        <div className="space-y-12 text-foreground/80">

          {/* 1 */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              1. Acceptance of Terms and Who We Are
            </h2>
            <p className="leading-relaxed mb-4">
              Welcome to The Upgrade Shop. These Terms of Use (&ldquo;Terms&rdquo;) are a legally binding agreement between you (&ldquo;Customer,&rdquo; &ldquo;you,&rdquo; or &ldquo;your&rdquo;) and The Upgrade Shop (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;), a business registered in Israel under company registration number 300330123, with registered address at Har Hatzofim 11, Holon, Israel.
            </p>
            <p className="leading-relaxed mb-4">
              These Terms cover the use of our website at <strong>upgradeshop.ai</strong>, the assistant on that website, our waitlist, and every account, subscription and service we provide, including the dashboard at <strong>app.upgradeshop.ai</strong>. By creating an account, subscribing to any package or module, joining the waitlist, or using any of these, you confirm that you have read, understood, and agree to be bound by these Terms and our <a href="/privacy-policy" className="underline">Privacy Policy</a>.
            </p>
            <p className="leading-relaxed">
              Our services are for businesses. By accepting, you confirm that you are acting for a business, and that if you accept on behalf of a company or other legal entity, you have the authority to bind that entity. If you do not have that authority, or do not agree to these Terms, do not use our services.
            </p>
          </section>

          {/* 2 */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              2. What We Provide
            </h2>
            <p className="leading-relaxed mb-4">
              The Upgrade Shop is a fully managed digital and software agency for small businesses. We build, run and keep upgrading the digital side of your business for you: your website, CRM, email, WhatsApp messaging, social media, online store, digital courses, funnels, marketing, and more. People on our team (an account manager with every package, and a marketer and a designer at higher tiers) work with your own AI assistant, and everything is available through a single dashboard. If you need something we do not have yet, we can build it (see Section 14).
            </p>
            <p className="leading-relaxed mb-4">
              The services (together, the &ldquo;Service&rdquo; or the &ldquo;Platform&rdquo;) are made up of the modules, team support and features that your package or module subscription includes. Modules include, for example:
            </p>
            <ul className="list-disc list-inside space-y-1 mb-4 ml-2">
              <li>
                Website design, building, hosting, and content management
              </li>
              <li>
                CRM: contacts, companies, pipelines, and activity tracking
              </li>
              <li>
                Email marketing: campaigns, workflows, and sequences
              </li>
              <li>
                WhatsApp Business messaging, broadcasts, and conversations handled by your AI assistant
              </li>
              <li>
                Social media management, including Facebook and Instagram integrations
              </li>
              <li>
                The Marketing module: guided paid ad campaigns, a creative studio, and attribution
              </li>
              <li>
                Online store: products, orders, subscriptions, and payments
              </li>
              <li>
                Digital courses and a Learning Hub community
              </li>
              <li>
                Funnels and conversion pages
              </li>
              <li>
                Dispatch and field service management
              </li>
              <li>
                Forms, analytics, and reporting
              </li>
              <li>
                Project and task management
              </li>
              <li>
                Your own AI assistant that works with the modules your account has
              </li>
            </ul>
            <p className="leading-relaxed">
              This list is not fixed. Which modules you have depends on what you subscribe to. We keep improving the Service, and we may add, change, or retire features, modules and integrations. If we retire a module you pay for, we will give you at least 30 days&rsquo; notice by email, stop charging you for it from the day it is withdrawn, and keep your data in that module available to you under Section 26.
            </p>
          </section>

          {/* 3 */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              3. Accounts and Security
            </h2>
            <h3 className="font-display text-xl font-semibold text-foreground mb-3">
              3.1 Account Creation
            </h3>
            <p className="leading-relaxed mb-4">
              To use the Service you must register for an account and provide accurate, complete, and current information. You must be at least 18 years of age and have the legal authority to enter into a binding agreement.
            </p>
            <h3 className="font-display text-xl font-semibold text-foreground mb-3">
              3.2 Account Security
            </h3>
            <p className="leading-relaxed mb-4">
              You are responsible for keeping your login credentials confidential and for all activity that takes place under your account. Notify us immediately at <strong>hello@upgradeshop.ai</strong> if you become aware of any unauthorized access. We are not liable for any loss or damage arising from your failure to maintain account security.
            </p>
            <h3 className="font-display text-xl font-semibold text-foreground mb-3">
              3.3 One Account per Business
            </h3>
            <p className="leading-relaxed mb-4">
              Each subscription covers one business. A business may run several brands or websites under one account where they are sub-brands of that same business. A genuinely different brand for a different audience is a separate business and needs its own account. You may not share credentials across unaffiliated businesses or use your account to manage third-party businesses unless we have agreed in writing.
            </p>
            <h3 className="font-display text-xl font-semibold text-foreground mb-3">
              3.4 Team Members
            </h3>
            <p className="leading-relaxed">
              Packages do not charge per user, so you can add the members of your own team to your account at no extra cost. The standalone CRM module is priced per user, as shown on our <a href="https://upgradeshop.ai/pricing" className="underline">pricing page</a>. Team members must belong to your business, and you are responsible for what they do on your account.
            </p>
          </section>

          {/* 4 */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              4. Packages, Tiers, and Single Modules
            </h2>
            <h3 className="font-display text-xl font-semibold text-foreground mb-3">
              4.1 Packages
            </h3>
            <p className="leading-relaxed mb-4">
              We sell the Service as packages built for a type of business, and as single modules. The packages are named on our website and <a href="https://upgradeshop.ai/pricing" className="underline">pricing page</a>, and we may add or retire packages over time. Every package includes the modules listed for it, your own AI assistant, and an account manager.
            </p>
            <h3 className="font-display text-xl font-semibold text-foreground mb-3">
              4.2 Tiers
            </h3>
            <p className="leading-relaxed mb-4">
              Each package comes in three tiers, in this order: Managed, Growth Partner, and Digital Team. The tiers differ by who does the work on your account, not by how often someone looks at it:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-4 ml-2">
              <li>
                <strong>Managed.</strong> Your account manager makes sure your account and your AI assistant work well, suggests improvements, and answers your requests. No person does the day-to-day work: you and your AI assistant do.
              </li>
              <li>
                <strong>Growth Partner.</strong> Your account manager does the work (for example automations, follow-ups, pages, emails, and fixes). A marketer reviews your marketing with your account manager from time to time, and a designer is available for anything new. You set priorities and approve.
              </li>
              <li>
                <strong>Digital Team.</strong> A whole team works on your account and leads it: your account manager, a marketer and a designer, and others where we say so. The Marketing module is included. You approve the direction.
              </li>
            </ul>
            <p className="leading-relaxed mb-4">
              Design work beyond what your tier includes is quoted first, as described in Section 5. A human video editor is an optional add-on at every tier. The Marketing module is an add-on at Managed and Growth Partner. What each tier and package includes and what it costs is set out on our <a href="https://upgradeshop.ai/pricing" className="underline">pricing page</a>, and that page is part of these Terms for that purpose.
            </p>
            <h3 className="font-display text-xl font-semibold text-foreground mb-3">
              4.3 Account Manager
            </h3>
            <p className="leading-relaxed mb-4">
              An account manager comes with every package, at every tier, and is the same person throughout. We do not promise any exclusivity, or any particular number of accounts that a person looks after.
            </p>
            <h3 className="font-display text-xl font-semibold text-foreground mb-3">
              4.4 Single Modules
            </h3>
            <p className="leading-relaxed">
              A module bought on its own, outside a package, comes with the AI assistant and normal support (Section 15). It does not come with an account manager.
            </p>
          </section>

          {/* 5 */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              5. Action Points
            </h2>
            <p className="leading-relaxed mb-4">
              Action Points (&ldquo;AP&rdquo;) measure the work done on your behalf that is not covered by your subscription: the AI assistant&rsquo;s work, third-party compute (such as transcription, translation, and AI processing), and human requests that we quote. The proactive work your account manager and team do for your tier is covered by your subscription and is not counted in AP.
            </p>
            <p className="leading-relaxed mb-4">
              Each package and module includes an AP allowance for each billing period. Top-up packs can be bought, and they add to the same single pool for your account. Allowances, pack sizes and rates are shown on our <a href="https://upgradeshop.ai/pricing" className="underline">pricing page</a>.
            </p>
            <p className="leading-relaxed mb-4">
              Unused AP does not roll over to the next billing period. We may, at our own discretion, grant extra AP as a goodwill gesture.
            </p>
            <p className="leading-relaxed mb-4">
              Human work requested through AP is quoted first, in AP and in time. Work starts only after you approve the quote, and the final cost stays close to the quote. The quote is based on what you submitted, so unclear or incomplete requests can change it. Human tasks for one account are handled one at a time, in order.
            </p>
            <p className="leading-relaxed">
              If you use your whole allowance, work may continue for a limited margin beyond it, which is charged at the overage rate shown on our pricing page. Beyond that margin, AP-based work is paused until the next billing period or until you add a top-up pack. We will tell you as you approach your allowance.
            </p>
          </section>

          {/* 6 */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              6. Prices, Billing, and Tax
            </h2>
            <p className="leading-relaxed mb-4">
              All prices are in US dollars and exclude taxes. You pay any value added tax (VAT), sales tax, or similar tax that applies to your purchase. Current prices are on our <a href="https://upgradeshop.ai/pricing" className="underline">pricing page</a>.
            </p>
            <p className="leading-relaxed mb-4">
              Subscriptions are billed in advance for each billing period until you cancel, and each payment covers the period it pays for. The setup fee is a one-time charge. You authorize us to charge your payment method on a recurring basis until you cancel. There is no long-term contract.
            </p>
            <p className="leading-relaxed mb-4">
              Payments are processed by our payment provider. Our payment provider may act as the reseller of our service (the merchant of record). If it does, its own buyer terms also apply to your payment, and it may collect and account for tax on the sale.
            </p>
            <p className="leading-relaxed">
              If a payment fails, we will tell you and try again. If a payment is still unpaid 14 days after it was due, we may pause the service (the team&rsquo;s work, your AI assistant, and sending) until it is paid. While the service is paused, your data stays safe and the exit package in Section 26 stays available to you.
            </p>
          </section>

          {/* 7 */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              7. Refunds, Cancellation, and Your Price
            </h2>
            <h3 className="font-display text-xl font-semibold text-foreground mb-3">
              7.1 Cancelling
            </h3>
            <p className="leading-relaxed mb-4">
              You can cancel at any time, by asking your account manager or support, or from your account settings where that option is available. It is month to month, with no lock-in.
            </p>
            <h3 className="font-display text-xl font-semibold text-foreground mb-3">
              7.2 Refunds
            </h3>
            <ul className="list-disc list-inside space-y-2 mb-4 ml-2">
              <li>
                <strong>Setup fee.</strong> The setup fee is never refundable. Work starts as soon as it is paid.
              </li>
              <li>
                <strong>First payment.</strong> You can ask for a refund of your first subscription payment within 14 days of the first charge. A refund closes the account.
              </li>
              <li>
                <strong>After 14 days.</strong> Cancelling takes effect at the end of the billing period you have already paid for, and you keep the service until then. We do not give partial refunds for the rest of a period, unless the law requires it.
              </li>
            </ul>
            <h3 className="font-display text-xl font-semibold text-foreground mb-3">
              7.3 Your Price Is Kept
            </h3>
            <p className="leading-relaxed mb-4">
              You keep the price you joined at for as long as you stay subscribed. A price change applies to new customers only and does not change your price.
            </p>
            <p className="leading-relaxed mb-4">
              If you move to another package or tier, the new package or tier is charged at its price at the time of the change. A Founder Price carries over to the new package or tier (see Section 8).
            </p>
            <p className="leading-relaxed">
              Usage and top-up rates (Action Point packs and overage, email packs, and video packs) are not part of the price you joined at. We can change them by giving you at least 30 days&rsquo; notice by email. If you do not agree to the change, you can cancel before it takes effect.
            </p>
          </section>

          {/* 8 */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              8. Founder Price and the Waitlist
            </h2>
            <p className="leading-relaxed mb-4">
              Everyone who joined the waitlist before launch gets the Founder Price: 20% off the monthly price and 20% off the setup fee. It lasts for as long as you stay subscribed. A price change never touches it, and nothing ends it except cancelling. If you cancel and come back later, you pay the current full price.
            </p>
            <p className="leading-relaxed">
              When you join the waitlist, you give us your name, email address, and WhatsApp number. We use them to tell you about the launch and your Founder Price, as described in our <a href="/privacy-policy" className="underline">Privacy Policy</a>. You can ask us to stop at any time. Joining the waitlist does not oblige you to buy anything, and it does not guarantee a place or a date.
            </p>
          </section>

          {/* 9 */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              9. Costs Outside the Price
            </h2>
            <p className="leading-relaxed mb-4">
              The following are not included in your subscription price:
            </p>
            <ul className="list-disc list-inside space-y-1 mb-4 ml-2">
              <li>
                Ad spend. Your advertising budget is always yours, and you pay it directly to the ad platforms.
              </li>
              <li>
                Meta&rsquo;s WhatsApp fees. Meta charges for WhatsApp conversations, and you pay those fees to Meta.
              </li>
              <li>
                Email sends beyond your allowance, which can be bought as email packs or charged at the rate shown on our pricing page.
              </li>
              <li>
                Digital Courses video usage beyond your allowance, which can be bought as video packs, and transcription and dubbing, which are charged by use.
              </li>
              <li>
                Optional add-ons from our Shop, and human work that we quote and you approve.
              </li>
              <li>
                The one-time setup fee.
              </li>
            </ul>
            <p className="leading-relaxed">
              Amounts are on our <a href="https://upgradeshop.ai/pricing" className="underline">pricing page</a>.
            </p>
          </section>

          {/* 10 */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              10. Your AI Assistant
            </h2>
            <p className="leading-relaxed mb-4">
              Every account includes your own AI assistant, which you name. It works with the modules your account has, and it talks to you and, where the WhatsApp module is active, to your customers on WhatsApp. It can execute tasks, manage settings, send messages, update content, and interact with your customers on your behalf, on your instruction.
            </p>
            <p className="leading-relaxed mb-4">
              You acknowledge and agree that:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-4 ml-2">
              <li>
                Your assistant acts on your instruction. Anything that spends your money (such as ad budget) and any human work needs your approval first. You can see what it did and change it.
              </li>
              <li>
                AI-generated outputs are produced by large language models and may contain inaccuracies, errors, or incomplete information. You are responsible for reviewing outputs before acting on them in high-stakes contexts.
              </li>
              <li>
                You must not use the assistant to generate, distribute, or act upon content that is unlawful, harmful, deceptive, abusive, or in violation of any applicable law or third-party rights.
              </li>
              <li>
                Conversations with your assistant, and the model calls behind them, are logged, and we use them to run, support, and improve the service, as described in our <a href="/privacy-policy" className="underline">Privacy Policy</a>.
              </li>
              <li>
                The assistant operates within the boundaries of the Platform and is not a substitute for professional legal, financial, medical, or other regulated advice.
              </li>
              <li>
                We may update, retrain, or modify the assistant&rsquo;s behavior at any time to improve accuracy, safety, or compliance.
              </li>
            </ul>
            <p className="leading-relaxed">
              We are not liable for decisions you make based on your assistant&rsquo;s outputs or for any third-party claims arising from content it sends on your behalf at your instruction.
            </p>
          </section>

          {/* 11 */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              11. Max on Our Website
            </h2>
            <p className="leading-relaxed">
              Max is our own AI assistant on upgradeshop.ai. Max&rsquo;s answers are general information. They are not a quote, an offer, or a contract, and only these Terms, the pricing page, and a written order or agreement bind us. Conversations with Max are logged, as described in our <a href="/privacy-policy" className="underline">Privacy Policy</a>. Do not enter sensitive information in the chat, such as payment card numbers, passwords, or health information.
            </p>
          </section>

          {/* 12 */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              12. Account Managers and Our Team
            </h2>
            <p className="leading-relaxed mb-4">
              Your account manager and the other members of our team act on your account under your authority and on your instructions. They may be our employees or independent contractors, and all of them are bound by confidentiality. What each tier&rsquo;s people do is described in Section 4.2.
            </p>
            <p className="leading-relaxed mb-4">
              You understand and agree that:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>
                Our team&rsquo;s work is task- and outcome-based, not hour-tracked. There is no guaranteed number of hours per week.
              </li>
              <li>
                Our team communicates through the Platform&rsquo;s messaging channel and our other support channels. Response time is subject to business hours and workload.
              </li>
              <li>
                You are responsible for giving accurate directions, approvals, and the access credentials the team needs to complete work.
              </li>
              <li>
                Work done at your instruction is your responsibility. We are not liable for outcomes resulting from incorrect or incomplete instructions.
              </li>
              <li>
                Design work beyond what your tier includes is quoted in AP first.
              </li>
            </ul>
          </section>

          {/* 13 */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              13. Ad Accounts and Spend
            </h2>
            <p className="leading-relaxed">
              Where our team runs paid campaigns in your ad accounts, they use your budget and your ad accounts, and they do so under your authority. Money is spent only after you approve it. The rules of each ad platform apply to your ads, and you are responsible for your ad accounts and for complying with those rules. We do not guarantee any results from advertising, such as reach, leads, or sales.
            </p>
          </section>

          {/* 14 */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              14. Custom Builds, Enterprise, and Other Agreements
            </h2>
            <p className="leading-relaxed mb-4">
              If you need something we do not have yet, we can build it. A custom build, and Enterprise arrangements, are quoted to you first and begin only after you approve the quote, in writing. Features we build into the Platform, even when one customer asked for them, stay ours and may be offered to other customers (see Section 17.3).
            </p>
            <p className="leading-relaxed">
              A separate written agreement with us, such as a beta agreement or an Enterprise agreement, prevails over these Terms where it differs from them.
            </p>
          </section>

          {/* 15 */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              15. Support and Timing
            </h2>
            <p className="leading-relaxed mb-4">
              Every account gets support through the Platform&rsquo;s messaging channel and at <strong>hello@upgradeshop.ai</strong>. Support is subject to business hours and workload.
            </p>
            <p className="leading-relaxed">
              Timings we publish for setup, such as when to expect a first draft of your website or a first result, are targets and not guarantees. Setup includes revisions to your website design until you approve it. A complete change of direction after you have approved the design is new work, and we quote it first.
            </p>
          </section>

          {/* 16 */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              16. Acceptable Use Policy
            </h2>
            <p className="leading-relaxed mb-4">
              You agree to use the Service only for lawful purposes and in compliance with these Terms, all applicable laws, and the terms of any third-party services you connect. You must not:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-4 ml-2">
              <li>
                Use the Service to send spam, unsolicited messages, or bulk communications to recipients who have not consented
              </li>
              <li>
                Send messages via WhatsApp or email that violate Meta&rsquo;s, WhatsApp&rsquo;s, or any email service provider&rsquo;s acceptable use and messaging policies
              </li>
              <li>
                Run ads that violate the policies of the ad platform they run on
              </li>
              <li>
                Upload, transmit, or store content that is defamatory, obscene, abusive, threatening, or that infringes any third-party rights including copyright, trademark, or privacy
              </li>
              <li>
                Attempt to gain unauthorized access to any part of the Platform or any connected third-party service
              </li>
              <li>
                Reverse-engineer, decompile, or attempt to extract the source code of the Platform
              </li>
              <li>
                Use the Service to conduct phishing, fraud, identity theft, or any other deceptive practice
              </li>
              <li>
                Resell, sublicense, or white-label the Platform to third parties without our prior written consent
              </li>
              <li>
                Use automated tools to scrape, crawl, or extract data from the Platform beyond normal use
              </li>
              <li>
                Use the AI assistant to generate content that impersonates individuals, spreads misinformation, or circumvents platform safety measures
              </li>
            </ul>
            <p className="leading-relaxed">
              Violation of this policy may result in suspension or termination of your account under Section 27, and may expose you to civil or criminal liability.
            </p>
          </section>

          {/* 17 */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              17. Content and Ownership
            </h2>
            <h3 className="font-display text-xl font-semibold text-foreground mb-3">
              17.1 Your Content
            </h3>
            <p className="leading-relaxed mb-4">
              You retain all ownership rights to the content you upload, create, or generate through the Platform (&ldquo;Your Content&rdquo;), including content your AI assistant produces at your direction. By using the Service, you grant us a limited, worldwide, non-exclusive, royalty-free license to host, store, process, display, and transmit Your Content solely as necessary to provide the Service to you.
            </p>
            <p className="leading-relaxed mb-4">
              You represent and warrant that you have all necessary rights to Your Content and that Your Content does not infringe any third-party rights. We make no warranties about the originality of AI-generated content or its fitness for any purpose, and you are responsible for reviewing it before publishing or distributing it.
            </p>
            <h3 className="font-display text-xl font-semibold text-foreground mb-3">
              17.2 Work Made for You
            </h3>
            <p className="leading-relaxed mb-4">
              Once you have paid for it, you own the website design, copy, graphics, and campaign material that our team makes for you. You can use them for your business, including after you leave. Our team members assign their work to us so that we can pass these rights to you. We may use the general know-how we gain in doing the work.
            </p>
            <h3 className="font-display text-xl font-semibold text-foreground mb-3">
              17.3 What Stays Ours
            </h3>
            <p className="leading-relaxed">
              The Platform, including its software, interface, AI models, automation logic, templates, and all related documentation, and the code that connects a website to the Platform, belong to The Upgrade Shop and are protected by copyright, trade secret, and other applicable intellectual property laws. Features we build into the Platform, even when one customer asked for them, stay ours and may be offered to others. Nothing in these Terms grants you any ownership of or license in our intellectual property beyond the right to use the Service as described here.
            </p>
          </section>

          {/* 18 */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              18. Domains
            </h2>
            <p className="leading-relaxed">
              In most cases we register your domain name for you, and we keep it registered for as long as you stay subscribed. When you leave, the domain moves to you as part of the exit package in Section 26. You can also use your own domain from the start, in which case it remains yours and you keep control of it.
            </p>
          </section>

          {/* 19 */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              19. Third-Party Integrations
            </h2>
            <p className="leading-relaxed mb-4">
              The Platform integrates with third-party services including Meta (Facebook and Instagram), WhatsApp Business, Google, payment providers, email providers, and others. By enabling these integrations, you authorize us to access and use your data on those platforms in accordance with the permissions you grant and our <a href="/privacy-policy" className="underline">Privacy Policy</a>.
            </p>
            <p className="leading-relaxed mb-4">
              Your use of each integrated service is also subject to that service&rsquo;s own terms and policies. We are not responsible for the availability, accuracy, or conduct of third-party services. If a third-party service changes its API, policies, or availability in a way that affects our integration, we will make commercially reasonable efforts to restore functionality but cannot guarantee uninterrupted operation.
            </p>
            <p className="leading-relaxed">
              You are solely responsible for ensuring that your use of third-party integrations through our Platform complies with those services&rsquo; terms of service, community standards, and applicable laws.
            </p>
          </section>

          {/* 20 */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              20. WhatsApp Business Services
            </h2>
            <p className="leading-relaxed mb-4">
              The WhatsApp messaging features on the Platform are provided through the WhatsApp Business API, operated by Meta Platforms, Inc. By using WhatsApp features, you agree to comply with WhatsApp&rsquo;s <a href="https://www.whatsapp.com/legal/business-policy" target="_blank" rel="noopener noreferrer" className="underline">Business Policy</a> and <a href="https://www.whatsapp.com/legal/commerce-policy" target="_blank" rel="noopener noreferrer" className="underline">Commerce Policy</a>.
            </p>
            <p className="leading-relaxed mb-4">
              You acknowledge that:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-4 ml-2">
              <li>
                WhatsApp messaging is subject to Meta&rsquo;s review and can be limited or disabled by Meta at any time if policy violations are detected
              </li>
              <li>
                Template messages must be pre-approved by Meta before use; we will assist with submission but cannot guarantee approval
              </li>
              <li>
                You must only message recipients who have opted in to receive communications from your business
              </li>
              <li>
                Message delivery is subject to WhatsApp&rsquo;s infrastructure and is not guaranteed
              </li>
              <li>
                Meta charges fees for WhatsApp conversations, and you pay them to Meta (see Section 9)
              </li>
              <li>
                Sending spam, misleading, or prohibited content via WhatsApp may result in your WhatsApp number being restricted or banned by Meta, which is outside our control
              </li>
              <li>
                A WhatsApp number that is yours stays yours, and it can be moved to another provider through Meta&rsquo;s process
              </li>
            </ul>
            <p className="leading-relaxed">
              We are not liable for any WhatsApp account restrictions or bans arising from your messaging practices.
            </p>
          </section>

          {/* 21 */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              21. Data We Handle for You
            </h2>
            <p className="leading-relaxed mb-4">
              Our collection, use, and storage of personal data is governed by our <a href="/privacy-policy" className="underline">Privacy Policy</a>, which is incorporated into these Terms by reference.
            </p>
            <p className="leading-relaxed mb-4">
              You are responsible for ensuring that any personal data you upload or process through the Platform, including the data of your contacts, leads, and customers, has been collected lawfully and with appropriate consent, and that your use of our Platform to process that data complies with the data protection laws that apply to you and to those people.
            </p>
            <h3 className="font-display text-xl font-semibold text-foreground mb-3">
              21.1 When We Act for You
            </h3>
            <p className="leading-relaxed mb-4">
              For the personal data of your contacts, leads, and customers, you decide why and how it is used, and we process it for you. This section applies to that processing, and it is our data processing agreement with you. We will:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-4 ml-2">
              <li>
                process that data only to provide the Service to you and on your documented instructions (your use of the Platform and your instructions to your account manager and your AI assistant are your instructions);
              </li>
              <li>
                make sure that everyone we allow to access it, including our team and contractors, is bound by confidentiality;
              </li>
              <li>
                keep it secure with appropriate technical and organizational measures;
              </li>
              <li>
                use only the subprocessors listed in our <a href="/privacy-policy" className="underline">Privacy Policy</a>, under written terms that protect it. We will email you at least 30 days before we add or replace a subprocessor, and if you object on reasonable grounds you can cancel before the change takes effect;
              </li>
              <li>
                help you answer requests from the people whose data it is, and help you meet your own legal duties about it, where you ask and the law requires;
              </li>
              <li>
                tell you without undue delay if we become aware of a breach of security that affects that data; and
              </li>
              <li>
                delete it, or return it to you, when you leave (see Section 26), unless the law requires us to keep it.
              </li>
            </ul>
            <h3 className="font-display text-xl font-semibold text-foreground mb-3">
              21.2 Security
            </h3>
            <p className="leading-relaxed">
              We use reasonable technical and organizational security measures to protect data on our Platform. No system is perfectly secure, and we cannot guarantee the absolute security of your data.
            </p>
          </section>

          {/* 22 */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              22. Uptime and Service Availability
            </h2>
            <p className="leading-relaxed mb-4">
              We target high availability for the Platform and make commercially reasonable efforts to minimize downtime. However, we do not guarantee any specific uptime percentage. The Platform may be unavailable due to scheduled maintenance, unexpected outages, third-party service disruptions, or causes beyond our control.
            </p>
            <p className="leading-relaxed">
              We will endeavor to provide advance notice of scheduled maintenance where practicable and to restore service as quickly as possible following unplanned outages.
            </p>
          </section>

          {/* 23 */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              23. Disclaimers and Warranties
            </h2>
            <p className="leading-relaxed mb-4">
              THE PLATFORM IS PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
            </p>
            <p className="leading-relaxed mb-4">
              We do not warrant that:
            </p>
            <ul className="list-disc list-inside space-y-1 mb-4 ml-2">
              <li>
                The Platform will be uninterrupted, error-free, or secure
              </li>
              <li>
                Any errors or defects will be corrected within a specific timeframe
              </li>
              <li>
                AI-generated content will be accurate, complete, or suitable for your intended use
              </li>
              <li>
                Results obtained from the Platform or from our team&rsquo;s work (such as marketing outcomes, lead conversions, or sales) will meet your expectations
              </li>
            </ul>
            <p className="leading-relaxed">
              Some jurisdictions do not allow the exclusion of implied warranties. To the extent such exclusions are not permitted by applicable law, such warranties are limited to the minimum scope allowed by law.
            </p>
          </section>

          {/* 24 */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              24. Limitation of Liability
            </h2>
            <p className="leading-relaxed mb-4">
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, THE UPGRADE SHOP, ITS DIRECTORS, EMPLOYEES, AGENTS, AND SUPPLIERS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, PUNITIVE, OR EXEMPLARY DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, REVENUE, DATA, BUSINESS, OR GOODWILL, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
            </p>
            <p className="leading-relaxed mb-4">
              OUR TOTAL CUMULATIVE LIABILITY TO YOU FOR ALL CLAIMS ARISING OUT OF OR RELATED TO THESE TERMS OR THE PLATFORM SHALL NOT EXCEED THE GREATER OF: (A) THE TOTAL FEES PAID BY YOU TO US IN THE THREE (3) MONTHS IMMEDIATELY PRECEDING THE EVENT GIVING RISE TO THE CLAIM, OR (B) ONE HUNDRED US DOLLARS (USD 100).
            </p>
            <p className="leading-relaxed">
              This limitation of liability reflects a reasonable allocation of risk between the parties and is a fundamental element of the basis of the bargain between the parties.
            </p>
          </section>

          {/* 25 */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              25. Indemnification
            </h2>
            <p className="leading-relaxed">
              You agree to indemnify, defend, and hold harmless The Upgrade Shop, its officers, directors, employees, and agents from and against any claims, damages, losses, liabilities, costs, and expenses (including reasonable legal fees) arising out of or related to: (a) your use of the Service; (b) Your Content; (c) your violation of these Terms; (d) your violation of any applicable law or regulation; or (e) your violation of any third-party rights, including the rights of your customers or contacts whose data you process through the Platform.
            </p>
          </section>

          {/* 26 */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              26. Leaving and the Exit Package
            </h2>
            <h3 className="font-display text-xl font-semibold text-foreground mb-3">
              26.1 Leaving
            </h3>
            <p className="leading-relaxed mb-4">
              You can leave at any time. How cancellation works, and what is refunded, is in Section 7. Your access continues until the end of the billing period you have paid for, unless a refund closes the account earlier.
            </p>
            <h3 className="font-display text-xl font-semibold text-foreground mb-3">
              26.2 The Exit Package
            </h3>
            <p className="leading-relaxed mb-4">
              You are entitled to the exit package. Ask for it through your account manager or support, and we will deliver it within 14 days of your request. It has three parts:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-4 ml-2">
              <li>
                <strong>Your data.</strong> All the account&rsquo;s data in one archive, in common formats: contacts and companies, conversations and message history we hold, orders and documents issued, website and blog content, media, and course content.
              </li>
              <li>
                <strong>Your domain.</strong> The domain, if we registered it for you (see Section 18).
              </li>
              <li>
                <strong>Your website.</strong> A clean copy of your website: its HTML, CSS and assets, without the code that connects it to our system. You may use that copy for your business.
              </li>
            </ul>
            <h3 className="font-display text-xl font-semibold text-foreground mb-3">
              26.3 Deletion
            </h3>
            <p className="leading-relaxed mb-4">
              We keep the account&rsquo;s data for 30 days from when you have received everything in the exit package (the data archive, the domain, and the website copy). After that we delete it, except what the law makes us keep, such as billing records.
            </p>
            <h3 className="font-display text-xl font-semibold text-foreground mb-3">
              26.4 Survival
            </h3>
            <p className="leading-relaxed">
              Sections 10 (to the extent of outputs you have published), 17, 21, 23, 24, 25, 28, and 29 survive termination.
            </p>
          </section>

          {/* 27 */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              27. Termination by Us
            </h2>
            <p className="leading-relaxed mb-4">
              We may suspend or terminate your account immediately, without notice, if: (a) you breach these Terms; (b) we are required to do so by law or a regulatory body; (c) we reasonably believe your use of the Platform creates legal, security, or reputational risk; or (d) you have fees that remain unpaid after the steps described in Section 6.
            </p>
            <p className="leading-relaxed mb-4">
              If we end your account for one of these reasons, you still get the data archive. The website copy and the domain transfer follow once any unpaid fees are settled. We will not hand anything over where the law forbids it.
            </p>
            <p className="leading-relaxed">
              We may also end the Service entirely upon 30 days&rsquo; written notice, in which case you receive the full exit package and we stop charging you from the day the Service ends.
            </p>
          </section>

          {/* 28 */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              28. Governing Law and Jurisdiction
            </h2>
            <p className="leading-relaxed mb-4">
              These Terms are between businesses. They are governed by and construed in accordance with the laws of the State of Israel, without regard to conflict-of-law principles. Mandatory laws of your country that cannot be excluded by agreement still apply to you where they apply.
            </p>
            <p className="leading-relaxed">
              Subject to Section 29, and to any mandatory rule of your country that gives you the right to bring a claim in a different court, any dispute, claim, or controversy arising out of or relating to these Terms or the Platform shall be subject to the exclusive jurisdiction of the competent courts located in Tel Aviv, Israel, and you consent to such jurisdiction.
            </p>
          </section>

          {/* 29 */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              29. Dispute Resolution
            </h2>
            <p className="leading-relaxed mb-4">
              We prefer to resolve disputes amicably. Before filing any formal claim, you agree to contact us at <strong>hello@upgradeshop.ai</strong> and allow 30 days for us to attempt resolution in good faith.
            </p>
            <p className="leading-relaxed">
              If a dispute cannot be resolved informally, either party may pursue resolution through the courts as described in Section 28. Nothing in this section limits either party&rsquo;s right to seek emergency injunctive or equitable relief.
            </p>
          </section>

          {/* 30 */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              30. Changes to These Terms
            </h2>
            <p className="leading-relaxed">
              We may update these Terms from time to time. When we make material changes, we will notify you by email or by a prominent notice on the Platform at least 30 days before the changes take effect. If you do not agree to the updated Terms, you can cancel your subscription before the effective date, and the changes will not apply to you. If you keep using the Service after the effective date, you accept the updated Terms. Our <a href="/privacy-policy" className="underline">Privacy Policy</a> follows the same 30-day notice.
            </p>
          </section>

          {/* 31 */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              31. General Provisions
            </h2>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>
                <strong>Entire Agreement.</strong> These Terms, together with the Privacy Policy, our pricing page, and any order forms, statements of work, or separate written agreements, constitute the entire agreement between you and The Upgrade Shop with respect to the Service and supersede all prior agreements. A separate written agreement prevails where it differs (see Section 14).
              </li>
              <li>
                <strong>Severability.</strong> If any provision of these Terms is found to be unenforceable, the remaining provisions remain in full force and effect.
              </li>
              <li>
                <strong>Waiver.</strong> Our failure to enforce any provision of these Terms shall not constitute a waiver of that provision.
              </li>
              <li>
                <strong>Assignment.</strong> You may not assign your rights or obligations under these Terms without our prior written consent. We may assign our rights to any affiliate or in connection with a merger, acquisition, or sale of assets.
              </li>
              <li>
                <strong>Force Majeure.</strong> We are not liable for any delay or failure to perform resulting from causes beyond our reasonable control, including natural disasters, war, cyber attacks, government action, or third-party infrastructure failures.
              </li>
              <li>
                <strong>Language.</strong> These Terms are written in English. Any translation is provided for convenience only; the English version controls in the event of conflict.
              </li>
            </ul>
          </section>

          {/* 32 */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              32. Contact Information
            </h2>
            <p className="leading-relaxed mb-4">
              For any questions, concerns, or notices under these Terms:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>
                <strong>The Upgrade Shop</strong>
              </li>
              <li>Company registration number: 300330123</li>
              <li>Har Hatzofim 11, Holon, Israel</li>
              <li>Email: hello@upgradeshop.ai</li>
              <li>Legal notices: legal@upgradeshop.ai</li>
            </ul>
          </section>

        </div>
      </div>
    </div>
  );
}
