import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | The Upgrade Shop",
  description:
    "Terms of Service for The Upgrade Shop platform. Understand your rights, responsibilities, subscription terms, AI agent services, and managed service agreement when using our platform.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background py-24">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
          Terms of Service
        </h1>
        <p className="text-foreground/60 mb-2">Effective date: May 26, 2026</p>
        <p className="text-foreground/60 mb-12">Last updated: May 26, 2026</p>

        <div className="space-y-12 text-foreground/80">

          {/* 1 */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              1. Acceptance of Terms
            </h2>
            <p className="leading-relaxed mb-4">
              Welcome to The Upgrade Shop. These Terms of Service
              (&ldquo;Terms&rdquo;) are a legally binding agreement between you
              (&ldquo;Customer,&rdquo; &ldquo;you,&rdquo; or
              &ldquo;your&rdquo;) and The Upgrade Shop (&ldquo;we,&rdquo;
              &ldquo;our,&rdquo; or &ldquo;us&rdquo;), a business registered in
              Israel under ח.פ. 300330123, with registered address at Har
              Hatzofim 11, Holon, Israel.
            </p>
            <p className="leading-relaxed mb-4">
              By creating an account, subscribing to any plan, or using any
              part of the platform at{" "}
              <strong>app.upgradeshop.ai</strong> or any associated services,
              you confirm that you have read, understood, and agree to be bound
              by these Terms and our{" "}
              <a href="/privacy" className="underline">
                Privacy Policy
              </a>
              .
            </p>
            <p className="leading-relaxed">
              If you are accepting on behalf of a company or other legal entity,
              you represent that you have the authority to bind that entity to
              these Terms. If you do not have such authority, or if you do not
              agree to these Terms, do not use the Platform.
            </p>
          </section>

          {/* 2 */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              2. About The Upgrade Shop Platform
            </h2>
            <p className="leading-relaxed mb-4">
              The Upgrade Shop is an AI-managed digital infrastructure platform
              for small and medium-sized businesses. Rather than requiring you
              to manage a stack of separate tools, we bring together your
              website, CRM, email marketing, WhatsApp Business messaging, social
              media automation, online store, digital courses, funnels, dispatch
              management, and more — all controlled through a single dashboard
              and operated on your behalf by an AI agent.
            </p>
            <p className="leading-relaxed mb-4">
              Depending on your subscription tier, the Platform includes some or
              all of the following modules and capabilities:
            </p>
            <ul className="list-disc list-inside space-y-1 mb-4 ml-2">
              <li>Website building, hosting, and content management</li>
              <li>CRM — contacts, companies, pipelines, and activity tracking</li>
              <li>Email marketing — campaigns, automations, and sequences</li>
              <li>WhatsApp Business messaging, broadcasts, and AI-powered conversations</li>
              <li>Social media management — Facebook and Instagram integrations</li>
              <li>Marketing automation workflows</li>
              <li>Online store — products, orders, subscriptions, and payments</li>
              <li>Digital courses and a Learning Hub community</li>
              <li>Funnels and conversion pages</li>
              <li>Dispatch and field service management</li>
              <li>Forms, analytics, and reporting</li>
              <li>Project and task management</li>
              <li>A personal AI agent that manages and operates your account</li>
            </ul>
            <p className="leading-relaxed">
              We reserve the right to add, modify, or discontinue any feature,
              module, or integration at any time. We will provide reasonable
              notice of material changes where possible.
            </p>
          </section>

          {/* 3 */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              3. Account Registration and Security
            </h2>

            <h3 className="font-display text-xl font-semibold text-foreground mb-3">
              3.1 Account Creation
            </h3>
            <p className="leading-relaxed mb-4">
              To use the Platform you must register for an account and provide
              accurate, complete, and current information. You must be at least
              18 years of age and have the legal authority to enter into a
              binding agreement.
            </p>

            <h3 className="font-display text-xl font-semibold text-foreground mb-3">
              3.2 Account Security
            </h3>
            <p className="leading-relaxed mb-4">
              You are responsible for keeping your login credentials
              confidential and for all activity that takes place under your
              account. Notify us immediately at{" "}
              <strong>hello@upgradeshop.ai</strong> if you become aware of any
              unauthorized access. We are not liable for any loss or damage
              arising from your failure to maintain account security.
            </p>

            <h3 className="font-display text-xl font-semibold text-foreground mb-3">
              3.3 One Account per Business
            </h3>
            <p className="leading-relaxed">
              Each subscription covers one business entity. You may not share
              credentials across unaffiliated businesses or use your account to
              manage third-party businesses unless you are subscribed to the
              Marketer Dashboard add-on or otherwise agreed in writing.
            </p>
          </section>

          {/* 4 */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              4. Subscription Plans, Action Points, and Payment
            </h2>

            <h3 className="font-display text-xl font-semibold text-foreground mb-3">
              4.1 Plans and Tiers
            </h3>
            <p className="leading-relaxed mb-4">
              The Platform is offered on a subscription basis. Plans differ in
              the modules included, the level of managed-service involvement,
              and the Action Points allowance. Current plans are described on
              our pricing page and may include:
            </p>
            <ul className="list-disc list-inside space-y-1 mb-4 ml-2">
              <li>
                <strong>Core</strong> — AI-managed. The personal AI agent
                manages, suggests, and executes work on your behalf. You review
                and approve. Work is tracked via Action Points.
              </li>
              <li>
                <strong>Pro</strong> — Core plus a dedicated Account Manager
                who proactively works your account on a weekly cadence.
              </li>
              <li>
                <strong>Elite</strong> — Same as Pro at a daily cadence. A
                near-fractional growth operator working your account every day.
              </li>
            </ul>
            <p className="leading-relaxed mb-4">
              Plans are further organized by package (Starter, Ecommerce,
              Creator/Educator, Field Service) depending on which modules your
              business requires. All packages include everything in the
              Core/Starter tier plus their specific modules.
            </p>

            <h3 className="font-display text-xl font-semibold text-foreground mb-3">
              4.2 Action Points
            </h3>
            <p className="leading-relaxed mb-4">
              Action Points (&ldquo;AP&rdquo;) are the unit by which work
              performed on your behalf is measured, including AI agent
              execution, Account Manager tasks, and third-party compute (such
              as transcription, translation, and AI processing). Each plan
              includes a base AP allowance per billing period. Additional AP
              can be purchased in expansion packs. Unused AP does not roll over
              to the next billing period unless otherwise specified.
            </p>

            <h3 className="font-display text-xl font-semibold text-foreground mb-3">
              4.3 Billing and Payment
            </h3>
            <p className="leading-relaxed mb-4">
              Subscriptions are billed in advance on a monthly or annual basis,
              depending on the billing cycle you select. Payment is processed
              via our authorized payment provider. You authorize us to charge
              your payment method on a recurring basis until you cancel.
            </p>
            <p className="leading-relaxed mb-4">
              If a payment fails, we will attempt to notify you and may suspend
              access to the Platform until payment is resolved. We reserve the
              right to automatically pause subscriptions after a defined number
              of consecutive failed charges.
            </p>

            <h3 className="font-display text-xl font-semibold text-foreground mb-3">
              4.4 Refunds and Cancellations
            </h3>
            <p className="leading-relaxed mb-4">
              You may cancel your subscription at any time from your account
              settings. Cancellation takes effect at the end of the current
              billing period. We do not offer prorated refunds for partial
              periods unless required by applicable law.
            </p>
            <p className="leading-relaxed">
              One-time setup fees are non-refundable once onboarding has
              commenced. Annual subscriptions that are cancelled within 14 days
              of the initial purchase may be eligible for a full refund at our
              discretion, provided no significant Platform use has occurred.
            </p>

            <h3 className="font-display text-xl font-semibold text-foreground mb-3 mt-6">
              4.5 Price Changes
            </h3>
            <p className="leading-relaxed">
              We may change subscription prices at any time. We will give you
              at least 30 days&rsquo; notice before a price change takes effect
              for existing subscriptions. Your continued use of the Platform
              after the effective date constitutes acceptance of the new price.
              Founder Pricing and other locked-rate commitments made at
              enrollment are honored for the duration specified at the time of
              the commitment.
            </p>
          </section>

          {/* 5 */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              5. AI Agent Services
            </h2>
            <p className="leading-relaxed mb-4">
              Every account includes a personal AI agent that communicates with
              you and your customers via WhatsApp and the Platform dashboard.
              The AI agent can execute tasks, manage platform settings, send
              messages, update content, and interact with your customers on your
              behalf.
            </p>
            <p className="leading-relaxed mb-4">
              You acknowledge and agree that:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-4 ml-2">
              <li>
                AI-generated outputs are produced by large language models and
                may contain inaccuracies, errors, or incomplete information. You
                are responsible for reviewing outputs before acting on them in
                high-stakes contexts.
              </li>
              <li>
                You must not use the AI agent to generate, distribute, or act
                upon content that is unlawful, harmful, deceptive, abusive, or
                in violation of any applicable law or third-party rights.
              </li>
              <li>
                Conversations with the AI agent may be logged and used to
                improve service quality, subject to our Privacy Policy.
              </li>
              <li>
                The AI agent operates within the boundaries of the Platform and
                is not a substitute for professional legal, financial, medical,
                or other regulated advice.
              </li>
              <li>
                We may update, retrain, or modify the AI agent&rsquo;s behavior
                at any time to improve accuracy, safety, or compliance.
              </li>
            </ul>
            <p className="leading-relaxed">
              We are not liable for decisions you make based on AI agent outputs
              or for any third-party claims arising from content the AI agent
              sends on your behalf at your instruction.
            </p>
          </section>

          {/* 6 */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              6. Managed Services and Account Managers
            </h2>
            <p className="leading-relaxed mb-4">
              Pro and Elite subscribers receive a dedicated Account Manager — a
              human operator who proactively works your account at a weekly (Pro)
              or daily (Elite) cadence. Account Managers may execute tasks such
              as building automations, writing email sequences, updating website
              content, conducting research, and managing campaigns.
            </p>
            <p className="leading-relaxed mb-4">
              You understand and agree that:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-4 ml-2">
              <li>
                Account Manager work is task- and outcome-based, not
                hour-tracked. There is no guaranteed number of hours per week.
              </li>
              <li>
                Account Managers communicate via the Platform&rsquo;s messaging
                channel. Response time is subject to business hours and
                workload.
              </li>
              <li>
                You are responsible for providing accurate directions,
                approvals, and access credentials required for the Account
                Manager to complete work.
              </li>
              <li>
                Work performed by Account Managers at your instruction is your
                responsibility. We are not liable for outcomes resulting from
                incorrect or incomplete instructions.
              </li>
              <li>
                Trust Mode — available at Pro/Elite — allows you to pre-approve
                categories of actions, which the Account Manager may then
                execute without per-task approval. You may revoke Trust Mode at
                any time from your account settings.
              </li>
            </ul>
          </section>

          {/* 7 */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              7. Acceptable Use Policy
            </h2>
            <p className="leading-relaxed mb-4">
              You agree to use the Platform only for lawful purposes and in
              compliance with these Terms, all applicable laws, and the terms of
              any third-party services you connect. You must not:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-4 ml-2">
              <li>
                Use the Platform to send spam, unsolicited messages, or bulk
                communications to recipients who have not consented
              </li>
              <li>
                Send messages via WhatsApp or email that violate Meta&rsquo;s,
                WhatsApp&rsquo;s, or any email service provider&rsquo;s
                acceptable use and messaging policies
              </li>
              <li>
                Upload, transmit, or store content that is defamatory,
                obscene, abusive, threatening, or that infringes any
                third-party rights including copyright, trademark, or privacy
              </li>
              <li>
                Attempt to gain unauthorized access to any part of the Platform
                or any connected third-party service
              </li>
              <li>
                Reverse-engineer, decompile, or attempt to extract the source
                code of the Platform
              </li>
              <li>
                Use the Platform to conduct phishing, fraud, identity theft, or
                any other deceptive practice
              </li>
              <li>
                Resell, sublicense, or white-label the Platform to third parties
                without our prior written consent
              </li>
              <li>
                Use automated tools to scrape, crawl, or extract data from the
                Platform beyond normal use
              </li>
              <li>
                Use the AI agent to generate content that impersonates
                individuals, spreads misinformation, or circumvents platform
                safety measures
              </li>
            </ul>
            <p className="leading-relaxed">
              Violation of this policy may result in immediate suspension or
              termination of your account without refund, and may expose you to
              civil or criminal liability.
            </p>
          </section>

          {/* 8 */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              8. Content and Intellectual Property
            </h2>

            <h3 className="font-display text-xl font-semibold text-foreground mb-3">
              8.1 Your Content
            </h3>
            <p className="leading-relaxed mb-4">
              You retain all ownership rights to the content you upload, create,
              or generate through the Platform (&ldquo;Your Content&rdquo;). By
              using the Platform, you grant us a limited, worldwide,
              non-exclusive, royalty-free license to host, store, process,
              display, and transmit Your Content solely as necessary to provide
              the Services to you.
            </p>
            <p className="leading-relaxed mb-4">
              You represent and warrant that you have all necessary rights to
              Your Content and that Your Content does not infringe any
              third-party rights.
            </p>

            <h3 className="font-display text-xl font-semibold text-foreground mb-3">
              8.2 Our Intellectual Property
            </h3>
            <p className="leading-relaxed mb-4">
              The Platform, including its software, design, interface, AI
              models, automation logic, templates, and all related documentation,
              is the exclusive property of The Upgrade Shop and is protected by
              copyright, trade secret, and other applicable intellectual property
              laws. Nothing in these Terms grants you any ownership or license
              in our intellectual property beyond the right to use the Platform
              as described herein.
            </p>

            <h3 className="font-display text-xl font-semibold text-foreground mb-3">
              8.3 AI-Generated Content
            </h3>
            <p className="leading-relaxed">
              Content produced by the AI agent at your direction is considered
              Your Content for the purpose of ownership. However, we make no
              warranties about its originality or fitness for any particular
              purpose. You are responsible for reviewing AI-generated content
              before publishing or distributing it.
            </p>
          </section>

          {/* 9 */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              9. Third-Party Integrations
            </h2>
            <p className="leading-relaxed mb-4">
              The Platform integrates with third-party services including Meta
              (Facebook and Instagram), WhatsApp Business, Google, payment
              processors, email providers, and others. By enabling these
              integrations, you authorize us to access and use your data on
              those platforms in accordance with the permissions you grant and
              our{" "}
              <a href="/privacy" className="underline">
                Privacy Policy
              </a>
              .
            </p>
            <p className="leading-relaxed mb-4">
              Your use of each integrated service is also subject to that
              service&rsquo;s own terms and policies. We are not responsible for
              the availability, accuracy, or conduct of third-party services.
              If a third-party service changes its API, policies, or
              availability in a way that affects our integration, we will make
              commercially reasonable efforts to restore functionality but
              cannot guarantee uninterrupted operation.
            </p>
            <p className="leading-relaxed">
              You are solely responsible for ensuring that your use of
              third-party integrations through our Platform complies with those
              services&rsquo; terms of service, community standards, and
              applicable laws.
            </p>
          </section>

          {/* 10 */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              10. WhatsApp Business Services
            </h2>
            <p className="leading-relaxed mb-4">
              The WhatsApp messaging features on the Platform are provided
              through the WhatsApp Business API, operated by Meta Platforms,
              Inc. By using WhatsApp features, you agree to comply with
              WhatsApp&rsquo;s{" "}
              <a
                href="https://www.whatsapp.com/legal/business-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Business Policy
              </a>{" "}
              and{" "}
              <a
                href="https://www.whatsapp.com/legal/commerce-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Commerce Policy
              </a>
              .
            </p>
            <p className="leading-relaxed mb-4">
              You acknowledge that:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-4 ml-2">
              <li>
                WhatsApp messaging is subject to Meta&rsquo;s review and can be
                limited or disabled by Meta at any time if policy violations are
                detected
              </li>
              <li>
                Template messages must be pre-approved by Meta before use; we
                will assist with submission but cannot guarantee approval
              </li>
              <li>
                You must only message recipients who have opted in to receive
                communications from your business
              </li>
              <li>
                Message delivery is subject to WhatsApp&rsquo;s infrastructure
                and is not guaranteed
              </li>
              <li>
                Sending spam, misleading, or prohibited content via WhatsApp
                may result in your WhatsApp number being restricted or banned
                by Meta, which is outside our control
              </li>
            </ul>
            <p className="leading-relaxed">
              We are not liable for any WhatsApp account restrictions or bans
              arising from your messaging practices.
            </p>
          </section>

          {/* 11 */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              11. Data, Privacy, and Security
            </h2>
            <p className="leading-relaxed mb-4">
              Our collection, use, and storage of your personal data and the
              data of your customers is governed by our{" "}
              <a href="/privacy" className="underline">
                Privacy Policy
              </a>
              , which is incorporated into these Terms by reference.
            </p>
            <p className="leading-relaxed mb-4">
              You are responsible for ensuring that any personal data you upload
              or process through the Platform — including the data of your
              contacts, leads, and customers — has been collected lawfully and
              with appropriate consent, and that your use of our Platform to
              process that data complies with applicable data protection laws
              including the Israeli Privacy Protection Law 5741-1981, the GDPR
              where applicable, and any other relevant legislation.
            </p>
            <p className="leading-relaxed">
              We implement industry-standard technical and organizational
              security measures to protect data on our Platform. However, no
              system is perfectly secure, and we cannot guarantee the absolute
              security of your data.
            </p>
          </section>

          {/* 12 */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              12. Uptime and Service Availability
            </h2>
            <p className="leading-relaxed mb-4">
              We target high availability for the Platform and make
              commercially reasonable efforts to minimize downtime. However, we
              do not guarantee any specific uptime percentage. The Platform may
              be unavailable due to scheduled maintenance, unexpected outages,
              third-party service disruptions, or causes beyond our control.
            </p>
            <p className="leading-relaxed">
              We will endeavor to provide advance notice of scheduled
              maintenance where practicable and to restore service as quickly as
              possible following unplanned outages.
            </p>
          </section>

          {/* 13 */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              13. Disclaimers and Warranties
            </h2>
            <p className="leading-relaxed mb-4">
              THE PLATFORM IS PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS
              AVAILABLE&rdquo; WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS
              OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF
              MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
              NON-INFRINGEMENT.
            </p>
            <p className="leading-relaxed mb-4">
              We do not warrant that:
            </p>
            <ul className="list-disc list-inside space-y-1 mb-4 ml-2">
              <li>The Platform will be uninterrupted, error-free, or secure</li>
              <li>
                Any errors or defects will be corrected within a specific
                timeframe
              </li>
              <li>
                AI-generated content will be accurate, complete, or suitable
                for your intended use
              </li>
              <li>
                Results obtained from the Platform (such as marketing outcomes,
                lead conversions, or sales) will meet your expectations
              </li>
            </ul>
            <p className="leading-relaxed">
              Some jurisdictions do not allow the exclusion of implied
              warranties. To the extent such exclusions are not permitted by
              applicable law, such warranties are limited to the minimum scope
              allowed by law.
            </p>
          </section>

          {/* 14 */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              14. Limitation of Liability
            </h2>
            <p className="leading-relaxed mb-4">
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, THE UPGRADE
              SHOP, ITS DIRECTORS, EMPLOYEES, AGENTS, AND SUPPLIERS SHALL NOT
              BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL,
              PUNITIVE, OR EXEMPLARY DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS
              OF PROFITS, REVENUE, DATA, BUSINESS, OR GOODWILL, EVEN IF WE
              HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
            </p>
            <p className="leading-relaxed mb-4">
              OUR TOTAL CUMULATIVE LIABILITY TO YOU FOR ALL CLAIMS ARISING OUT
              OF OR RELATED TO THESE TERMS OR THE PLATFORM SHALL NOT EXCEED THE
              GREATER OF: (A) THE TOTAL FEES PAID BY YOU TO US IN THE THREE (3)
              MONTHS IMMEDIATELY PRECEDING THE EVENT GIVING RISE TO THE CLAIM,
              OR (B) ONE HUNDRED US DOLLARS (USD 100).
            </p>
            <p className="leading-relaxed">
              This limitation of liability reflects a reasonable allocation of
              risk between the parties and is a fundamental element of the basis
              of the bargain between the parties.
            </p>
          </section>

          {/* 15 */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              15. Indemnification
            </h2>
            <p className="leading-relaxed">
              You agree to indemnify, defend, and hold harmless The Upgrade
              Shop, its officers, directors, employees, and agents from and
              against any claims, damages, losses, liabilities, costs, and
              expenses (including reasonable legal fees) arising out of or
              related to: (a) your use of the Platform; (b) Your Content; (c)
              your violation of these Terms; (d) your violation of any
              applicable law or regulation; or (e) your violation of any
              third-party rights, including the rights of your customers or
              contacts whose data you process through the Platform.
            </p>
          </section>

          {/* 16 */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              16. Termination
            </h2>

            <h3 className="font-display text-xl font-semibold text-foreground mb-3">
              16.1 Termination by You
            </h3>
            <p className="leading-relaxed mb-4">
              You may cancel your subscription at any time from your account
              settings. Your access continues until the end of the current
              billing period. Cancellation does not entitle you to a refund of
              prepaid fees except as described in Section 4.4.
            </p>

            <h3 className="font-display text-xl font-semibold text-foreground mb-3">
              16.2 Termination by Us
            </h3>
            <p className="leading-relaxed mb-4">
              We may suspend or terminate your account immediately, without
              notice, if: (a) you breach these Terms; (b) we are required to do
              so by law or a regulatory body; (c) we reasonably believe your
              use of the Platform creates legal, security, or reputational risk;
              or (d) you have outstanding unpaid fees after multiple failed
              payment attempts.
            </p>
            <p className="leading-relaxed mb-4">
              We may also terminate the Platform entirely upon 30 days&rsquo;
              written notice.
            </p>

            <h3 className="font-display text-xl font-semibold text-foreground mb-3">
              16.3 Effect of Termination
            </h3>
            <p className="leading-relaxed">
              Upon termination, your access to the Platform ceases. We will
              retain Your Content for a period of 30 days following termination,
              during which you may request an export. After that period, we may
              delete Your Content in accordance with our data retention
              practices. Sections 5 (to the extent of AI outputs you have
              published), 8, 13, 14, 15, 17, and 18 survive termination.
            </p>
          </section>

          {/* 17 */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              17. Governing Law and Jurisdiction
            </h2>
            <p className="leading-relaxed mb-4">
              These Terms are governed by and construed in accordance with the
              laws of the State of Israel, without regard to conflict-of-law
              principles.
            </p>
            <p className="leading-relaxed">
              Subject to Section 18, any dispute, claim, or controversy arising
              out of or relating to these Terms or the Platform shall be subject
              to the exclusive jurisdiction of the competent courts located in
              Tel Aviv, Israel, and you irrevocably consent to such
              jurisdiction.
            </p>
          </section>

          {/* 18 */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              18. Dispute Resolution
            </h2>
            <p className="leading-relaxed mb-4">
              We prefer to resolve disputes amicably. Before filing any formal
              claim, you agree to contact us at{" "}
              <strong>hello@upgradeshop.ai</strong> and allow 30 days for us to
              attempt resolution in good faith.
            </p>
            <p className="leading-relaxed">
              If a dispute cannot be resolved informally, either party may
              pursue resolution through the courts as described in Section 17.
              Nothing in this section limits either party&rsquo;s right to seek
              emergency injunctive or equitable relief.
            </p>
          </section>

          {/* 19 */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              19. Changes to These Terms
            </h2>
            <p className="leading-relaxed">
              We may update these Terms from time to time. When we make
              material changes, we will notify you by email or by a prominent
              notice on the Platform at least 30 days before the changes take
              effect. Your continued use of the Platform after the effective
              date constitutes acceptance of the updated Terms. If you do not
              agree to the updated Terms, you must stop using the Platform and
              cancel your subscription before the effective date.
            </p>
          </section>

          {/* 20 */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              20. General Provisions
            </h2>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>
                <strong>Entire Agreement.</strong> These Terms, together with
                the Privacy Policy and any order forms or statements of work,
                constitute the entire agreement between you and The Upgrade Shop
                with respect to the Platform and supersede all prior agreements.
              </li>
              <li>
                <strong>Severability.</strong> If any provision of these Terms
                is found to be unenforceable, the remaining provisions remain in
                full force and effect.
              </li>
              <li>
                <strong>Waiver.</strong> Our failure to enforce any provision of
                these Terms shall not constitute a waiver of that provision.
              </li>
              <li>
                <strong>Assignment.</strong> You may not assign your rights or
                obligations under these Terms without our prior written consent.
                We may assign our rights to any affiliate or in connection with
                a merger, acquisition, or sale of assets.
              </li>
              <li>
                <strong>Force Majeure.</strong> We are not liable for any delay
                or failure to perform resulting from causes beyond our
                reasonable control, including natural disasters, war, cyber
                attacks, government action, or third-party infrastructure
                failures.
              </li>
              <li>
                <strong>Language.</strong> These Terms are written in English.
                Any translation is provided for convenience only; the English
                version controls in the event of conflict.
              </li>
            </ul>
          </section>

          {/* 21 */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              21. Contact Information
            </h2>
            <p className="leading-relaxed mb-4">
              For any questions, concerns, or notices under these Terms:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>
                <strong>The Upgrade Shop</strong>
              </li>
              <li>ח.פ. 300330123</li>
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
