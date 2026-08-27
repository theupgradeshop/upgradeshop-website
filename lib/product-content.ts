export interface ProductFeatureDetail {
  icon: string;
  title: string;
  description: string;
}

export interface ProductUseCase {
  title: string;
  description: string;
}

export interface ProductPageContent {
  slug: string;
  tagline: string;
  icon: string;
  overviewTitle: string;
  overviewParagraphs: string[];
  detailedFeatures: ProductFeatureDetail[];
  useCases: ProductUseCase[];
  relatedSlugs: string[];
}

const productContent: Record<string, ProductPageContent> = {
  crm: {
    slug: "crm",
    tagline: "Know every customer. Close every deal.",
    icon: "Users",
    overviewTitle: "Everything you need to manage customer relationships",
    overviewParagraphs: [
      "Track every lead from first contact to closed deal. Our CRM gives you a clear visual pipeline so you always know where each opportunity stands and what needs attention next.",
      "Every interaction is logged automatically \u2014 calls, emails, meetings, notes. Your entire team sees the same customer history, so nobody drops the ball and every handoff is seamless.",
      "Built for small teams who need power without complexity. Custom fields let you track what matters to your business, while smart filters help you focus on the opportunities that will close.",
    ],
    detailedFeatures: [
      { icon: "UserPlus", title: "Lead Capture", description: "Automatically capture leads from your website forms, landing pages, and manual entry. Never miss an opportunity." },
      { icon: "Kanban", title: "Visual Pipeline", description: "Drag-and-drop pipeline stages customized to your sales process. See every deal at a glance and know exactly what needs attention." },
      { icon: "Clock", title: "Contact Timeline", description: "Complete history of every interaction with each contact \u2014 calls, emails, meetings, notes \u2014 all in chronological order." },
      { icon: "Settings", title: "Custom Fields", description: "Add fields that match your business needs. Track industry, deal size, referral source, or anything else that matters." },
      { icon: "Users", title: "Team Assignments", description: "Assign leads and deals to team members. Set permissions so everyone sees what they need and nothing they don't." },
      { icon: "BarChart3", title: "Activity Tracking", description: "Track all sales activities \u2014 calls made, emails sent, meetings held. Understand what drives results for your team." },
      { icon: "FileText", title: "Notes & Attachments", description: "Attach documents, proposals, and contracts to any contact or deal. Add notes that the whole team can reference." },
      { icon: "Database", title: "Import & Export", description: "Import contacts from CSV or other CRMs. Export your data anytime \u2014 your data always belongs to you." },
    ],
    useCases: [
      { title: "Service Businesses", description: "Track leads from inquiry to signed contract. Know which prospects need follow-up, which proposals are outstanding, and which clients are ready to close." },
      { title: "Sales Teams", description: "Give your team a shared pipeline view. Assign leads, track activities, and forecast revenue \u2014 all without spreadsheets or sticky notes." },
      { title: "Freelancers & Consultants", description: "Organize your clients and prospects in one place. Track project history, payment status, and follow-up reminders to keep your business running smoothly." },
    ],
    relatedSlugs: ["email-marketing", "whatsapp", "ai-agent"],
  },

  "email-marketing": {
    slug: "email-marketing",
    tagline: "Reach your audience. Grow your business.",
    icon: "Mail",
    overviewTitle: "Professional email campaigns without the complexity",
    overviewParagraphs: [
      "Send beautiful, professional email campaigns that land in inboxes \u2014 not spam folders. Our templates are designed to look great on every device, and our deliverability optimization ensures your messages get seen.",
      "Smart segmentation lets you send the right message to the right people. Group your contacts by behavior, purchase history, or any custom attribute. A/B test subject lines and content to maximize engagement.",
      "5,000 emails per month included with detailed analytics on opens, clicks, and conversions. Set up automation sequences that nurture leads while you focus on running your business.",
    ],
    detailedFeatures: [
      { icon: "Layout", title: "Email Templates", description: "Choose from professionally designed templates or build your own. Every template looks perfect on desktop, tablet, and mobile." },
      { icon: "Target", title: "Smart Segmentation", description: "Group contacts by behavior, demographics, purchase history, or any custom field. Send targeted campaigns that resonate with each audience." },
      { icon: "PieChart", title: "A/B Testing", description: "Test different subject lines, content, and send times. Let data guide your decisions and improve campaign performance over time." },
      { icon: "BarChart3", title: "Analytics Dashboard", description: "Track opens, clicks, bounces, and unsubscribes in real-time. Understand what content drives engagement and conversions." },
      { icon: "Zap", title: "Automation Sequences", description: "Set up drip campaigns that automatically send the right emails at the right time. Welcome series, follow-ups, and re-engagement \u2014 all on autopilot." },
      { icon: "Users", title: "Contact Management", description: "Import contacts, manage lists, and keep your database clean. Automatic bounce handling and duplicate detection included." },
      { icon: "Shield", title: "Compliance Built-in", description: "Automatic unsubscribe handling, CAN-SPAM compliance, and GDPR-friendly tools. Send confidently knowing you're following best practices." },
      { icon: "Send", title: "Deliverability Optimization", description: "SPF, DKIM, and DMARC authentication handled for you. Our infrastructure ensures your emails reach the inbox, not the spam folder." },
    ],
    useCases: [
      { title: "E-commerce Stores", description: "Send product announcements, promotional offers, and abandoned cart reminders. Drive repeat purchases with targeted campaigns based on purchase history." },
      { title: "Service Businesses", description: "Nurture leads with educational content sequences. Share expertise, build trust, and convert subscribers into paying clients over time." },
      { title: "Content Creators", description: "Build and engage your audience with newsletters. Share updates, promote new content, and monetize your subscriber base with targeted offers." },
    ],
    relatedSlugs: ["crm", "whatsapp", "ai-agent"],
  },

  whatsapp: {
    slug: "whatsapp",
    tagline: "Meet your customers where they already are.",
    icon: "MessageCircle",
    overviewTitle: "WhatsApp marketing that actually works",
    overviewParagraphs: [
      "WhatsApp has a 98% open rate \u2014 compared to 20% for email. Your customers are already on WhatsApp every day. Our platform lets you reach them with broadcasts, campaigns, and automated responses through the official WhatsApp Business API.",
      "Send rich media messages with images, videos, documents, and interactive buttons. Create template messages approved by Meta for transactional and marketing use. Track delivery, read receipts, and response rates for every campaign.",
      "Automate responses to common questions, set up quick replies for your team, and schedule messages for optimal timing. All while maintaining the personal, conversational feel that makes WhatsApp so effective.",
    ],
    detailedFeatures: [
      { icon: "Megaphone", title: "Broadcast Messaging", description: "Send messages to thousands of contacts at once. Unlike WhatsApp groups, broadcasts feel personal \u2014 each recipient sees it as a direct message." },
      { icon: "FileText", title: "Template Messages", description: "Create Meta-approved message templates for marketing, transactional, and utility messages. Use variables for personalization at scale." },
      { icon: "BarChart3", title: "Campaign Analytics", description: "Track delivery rates, read receipts, response rates, and click-throughs. Know exactly how your campaigns perform and optimize accordingly." },
      { icon: "Zap", title: "Auto-Responses", description: "Set up automatic replies for common questions, business hours, and frequently asked topics. Keep conversations moving even when you're away." },
      { icon: "Users", title: "Contact List Management", description: "Organize contacts into lists and segments. Import from CSV, sync with your CRM, and keep your contact database clean and organized." },
      { icon: "Smartphone", title: "Rich Media Messages", description: "Send images, videos, PDFs, and interactive buttons. Create engaging content that stands out in your customers' WhatsApp conversations." },
      { icon: "MessageCircle", title: "Quick Replies", description: "Pre-written responses for common questions. Your team responds in seconds with consistent, professional answers every time." },
      { icon: "Clock", title: "Message Scheduling", description: "Schedule messages and campaigns for the optimal time. Reach your audience when they're most likely to engage and respond." },
    ],
    useCases: [
      { title: "Restaurants & Food Service", description: "Send daily specials, weekend menus, and event announcements directly to your regulars. Take reservations and answer questions instantly." },
      { title: "Retail Stores", description: "Announce sales, new arrivals, and exclusive offers. Send personalized recommendations based on past purchases and preferences." },
      { title: "Service Providers", description: "Send appointment reminders, follow-up messages, and satisfaction surveys. Build relationships that turn one-time clients into loyal customers." },
    ],
    relatedSlugs: ["ai-agent", "crm", "email-marketing"],
  },

  "ai-agent": {
    slug: "ai-agent",
    tagline: "Your business, always available. On every channel.",
    icon: "Bot",
    overviewTitle: "An AI assistant that knows your business inside out",
    overviewParagraphs: [
      "Your AI agent handles customer inquiries across WhatsApp, Telegram, Messenger, and Instagram DM \u2014 simultaneously. It learns your business, speaks your brand voice, and never takes a day off. Customers get instant, accurate answers 24 hours a day.",
      "Unlike generic chatbots, our AI agents are trained specifically on your business. Feed it your FAQ, product catalog, pricing, and policies. It understands context, remembers previous conversations, and knows when to escalate to a human.",
      "Every conversation is logged and analyzed. See what customers are asking about most, identify gaps in your content, and continuously improve your agent's performance. It gets smarter with every interaction.",
    ],
    detailedFeatures: [
      { icon: "Globe", title: "Multi-Channel Support", description: "One AI agent handles WhatsApp, Telegram, Facebook Messenger, and Instagram DM. Consistent experience across every platform your customers use." },
      { icon: "Palette", title: "Custom Personality", description: "Define your agent's tone, style, and personality. Professional, friendly, casual, or formal \u2014 it speaks in your brand voice on every channel." },
      { icon: "Cpu", title: "Context-Aware Conversations", description: "Your agent remembers conversation history and context. It doesn't ask customers to repeat themselves and understands follow-up questions naturally." },
      { icon: "Users", title: "Human Handoff", description: "When a conversation needs a human touch, the agent seamlessly transfers to your team with full context. No information lost, no customer frustration." },
      { icon: "BookOpen", title: "Knowledge Base", description: "Upload documents, FAQs, product catalogs, and policies. Your agent references this knowledge to give accurate, consistent answers every time." },
      { icon: "BarChart3", title: "Conversation Analytics", description: "See what customers ask about most, where the agent excels, and where it needs improvement. Data-driven insights to optimize your support." },
      { icon: "Globe", title: "Multi-Language", description: "Your agent communicates in multiple languages, switching automatically based on the customer's preference. Serve a global audience effortlessly." },
      { icon: "Settings", title: "Training Interface", description: "Easy-to-use interface for teaching your agent new information. Add answers, correct responses, and refine behavior without any technical knowledge." },
    ],
    useCases: [
      { title: "High-Volume FAQ Handling", description: "If your team answers the same 20 questions repeatedly, an AI agent handles them instantly \u2014 freeing your team for complex issues that need a human touch." },
      { title: "24/7 Customer Support", description: "Customers don't wait for business hours. Your AI agent handles inquiries at midnight, on weekends, and during holidays \u2014 with the same quality as your best team member." },
      { title: "Lead Qualification", description: "Your agent asks the right questions, qualifies prospects, and routes hot leads to your sales team. Automatically collect contact info and schedule follow-ups." },
    ],
    relatedSlugs: ["whatsapp", "crm", "employee-management"],
  },

  "employee-management": {
    slug: "employee-management",
    tagline: "Organize your team. Simplify your schedule.",
    icon: "CalendarDays",
    overviewTitle: "Employee scheduling that runs itself",
    overviewParagraphs: [
      "Stop juggling spreadsheets and group chats. Our employee management module handles scheduling, shift assignments, and availability tracking in one clean dashboard. Your team sees their schedule, submits availability, and swaps shifts \u2014 all without calling you.",
      "The standout feature: employees submit their availability via WhatsApp. They simply text when they're available, and our AI processes natural language in Hebrew and English. No app to download, no portal to log into \u2014 just a WhatsApp message.",
      "Managers get a complete team calendar with drag-and-drop scheduling, schedule templates for recurring patterns, and automatic conflict detection. Notifications keep everyone in sync, and mobile access means you can manage your team from anywhere.",
    ],
    detailedFeatures: [
      { icon: "CalendarDays", title: "Shift Scheduling", description: "Create and assign shifts with drag-and-drop simplicity. Set recurring schedules, manage open shifts, and handle last-minute changes without chaos." },
      { icon: "Clock", title: "Time Tracking", description: "Track hours worked, breaks, and overtime. Generate timesheets automatically and export for payroll processing." },
      { icon: "MessageCircle", title: "WhatsApp Availability", description: "Employees submit their availability by sending a WhatsApp message. AI processes natural language \u2014 no forms, no apps, no friction." },
      { icon: "Calendar", title: "Team Calendar", description: "See your entire team's schedule at a glance. Filter by department, role, or location. Spot gaps and conflicts before they become problems." },
      { icon: "FileText", title: "Schedule Templates", description: "Save and reuse common schedule patterns. Weekly templates, rotating schedules, and seasonal patterns \u2014 set them once and apply them instantly." },
      { icon: "Smartphone", title: "Mobile Access", description: "Managers and employees access schedules from any device. No app required \u2014 it works in any web browser on phone, tablet, or desktop." },
      { icon: "Bell", title: "Notifications", description: "Automatic alerts for schedule changes, shift reminders, and availability requests. Nobody misses a shift because they didn't check the board." },
      { icon: "BarChart3", title: "Reporting", description: "Track labor costs, overtime trends, and scheduling efficiency. Make data-driven decisions about staffing and resource allocation." },
    ],
    useCases: [
      { title: "Restaurants & Hospitality", description: "Manage shift workers across breakfast, lunch, and dinner services. Handle availability requests, last-minute swaps, and seasonal staffing changes." },
      { title: "Retail Stores", description: "Schedule rotating staff across weekdays, weekends, and holidays. Track hours for part-time employees and manage multiple locations." },
      { title: "Service Businesses", description: "Coordinate field teams, assign jobs, and track time on-site. Know who's available, who's working, and who's off at any moment." },
    ],
    relatedSlugs: ["project-task-management", "ai-agent", "whatsapp"],
  },

  "project-task-management": {
    slug: "project-task-management",
    tagline: "Track every project. Finish every task.",
    icon: "ListTodo",
    overviewTitle: "Project management that doesn't overwhelm",
    overviewParagraphs: [
      "Lightweight project management built for small teams. Create projects, break them into tasks, assign to team members, and track progress \u2014 all without the complexity of enterprise tools that require a training course.",
      "Everything lives in one place: task lists, comments, file attachments, time tracking, and due dates. Filter by label, assignee, or status. See what's overdue, what's in progress, and what's coming up next.",
      "Time tracking is built right in. Log hours against tasks, see where time is actually spent, and make informed decisions about project scope and resource allocation. No separate time tracking app needed.",
    ],
    detailedFeatures: [
      { icon: "Kanban", title: "Project Boards", description: "Organize work with Kanban boards or list views. Drag tasks between stages, set priorities, and see project progress at a glance." },
      { icon: "CheckCircle", title: "Task Management", description: "Create tasks with descriptions, subtasks, due dates, and assignees. Break complex work into manageable pieces that move forward every day." },
      { icon: "Tag", title: "Labels & Filters", description: "Categorize tasks with custom labels. Filter by assignee, due date, priority, or label to find exactly what you need in seconds." },
      { icon: "Users", title: "Team Collaboration", description: "Assign tasks to team members, share files, and keep everyone aligned. See who's working on what and where help is needed." },
      { icon: "Clock", title: "Time Tracking", description: "Start and stop timers on any task. Log time manually or use automatic tracking. See where hours go and invoice clients accurately." },
      { icon: "MessageCircle", title: "Comments & Discussions", description: "Discuss tasks in context. Mention team members, share updates, and keep all project communication organized alongside the work." },
      { icon: "FileText", title: "File Attachments", description: "Attach documents, designs, and reference materials to any task. Everything related to the work stays with the work." },
      { icon: "Bell", title: "Due Date Reminders", description: "Never miss a deadline. Automatic reminders for upcoming and overdue tasks keep projects moving forward on schedule." },
    ],
    useCases: [
      { title: "Agencies & Studios", description: "Manage multiple client projects simultaneously. Track deliverables, log billable hours, and keep every project on deadline and on budget." },
      { title: "Growing Teams", description: "Coordinate work across team members without endless meetings. Everyone knows their tasks, priorities, and deadlines \u2014 no micromanagement required." },
      { title: "Freelancers", description: "Track deliverables across multiple clients. Log time for accurate invoicing and maintain a clear overview of all your commitments." },
    ],
    relatedSlugs: ["employee-management", "crm", "email-marketing"],
  },

  "landing-page": {
    slug: "landing-page",
    tagline: "One page. Maximum impact.",
    icon: "FileText",
    overviewTitle: "A single page designed to convert",
    overviewParagraphs: [
      "Sometimes you don't need a full website \u2014 you need one perfect page that drives action. Our landing pages are built by real developers, designed for conversion, and optimized for every device.",
      "Perfect for product launches, lead generation campaigns, event promotions, and seasonal offers. Your landing page loads fast, looks professional, and guides visitors toward the action you want them to take.",
      "After launch, Max AI handles all your content updates. Need to change the headline, swap an image, or update pricing? Just ask Max. No developer needed, no delays, no extra cost.",
    ],
    detailedFeatures: [
      { icon: "Palette", title: "Professional Design", description: "Custom-designed to match your brand. No templates, no cookie-cutter layouts. A page that looks and feels uniquely yours." },
      { icon: "Code", title: "Developer-Built", description: "Built by human developers, not dragged together in a website builder. Clean code, fast loading, and built to best practices." },
      { icon: "Bot", title: "Max AI Updates", description: "Need a content change? Tell Max in plain language. Headlines, images, text, and CTAs \u2014 updated without waiting for a developer." },
      { icon: "Smartphone", title: "Mobile-Optimized", description: "Looks perfect on every screen size. Responsive design ensures your page converts on phones, tablets, and desktops." },
      { icon: "Search", title: "SEO Optimized", description: "Built with search engines in mind. Proper meta tags, structured data, fast loading, and clean URLs from day one." },
      { icon: "Shield", title: "SSL Included", description: "HTTPS security included at no extra cost. Your visitors see the lock icon, and their data is encrypted in transit." },
      { icon: "Zap", title: "Fast Loading", description: "Optimized images, minimal JavaScript, and efficient code. Your page loads in under 2 seconds on any connection." },
      { icon: "BarChart3", title: "Analytics Ready", description: "Google Analytics and conversion tracking built in. Know exactly how many visitors you get and how many convert." },
    ],
    useCases: [
      { title: "Product Launches", description: "Create buzz and capture early interest with a dedicated launch page. Collect email signups, display features, and build anticipation." },
      { title: "Lead Generation", description: "Drive traffic from ads to a focused landing page. Clear value proposition, strong CTA, and a form that captures leads efficiently." },
      { title: "Event Promotion", description: "Promote workshops, webinars, or conferences with a dedicated event page. Display schedule, speakers, and registration form." },
    ],
    relatedSlugs: ["website", "simple-store", "booking-system"],
  },

  website: {
    slug: "website",
    tagline: "Built by developers. Managed by AI.",
    icon: "Globe",
    overviewTitle: "A fully managed website service, not a website builder",
    overviewParagraphs: [
      "This isn't another DIY website builder. Our team of developers builds your website from scratch, custom-designed for your business. You get a professional site without learning to code, fighting with templates, or spending agency-level budgets.",
      "Once your site is live, Max AI takes over content management. Need to update text, swap images, change business hours, or add a new page? Just tell Max. Updates happen in minutes, not days. No more waiting for a developer or struggling with a CMS.",
      "We handle everything: hosting, SSL certificates, security updates, performance optimization, and backups. Your website is always fast, secure, and up-to-date. You focus on running your business \u2014 we handle the digital infrastructure.",
    ],
    detailedFeatures: [
      { icon: "Code", title: "Built by Human Developers", description: "Real developers write real code for your website. No drag-and-drop limitations, no template constraints. Custom solutions for your specific needs." },
      { icon: "Bot", title: "Max AI Content Updates", description: "Tell Max what you want changed in plain language. Text, images, layouts \u2014 updated without scheduling a developer or learning a CMS." },
      { icon: "Wrench", title: "24/7 Ticket System", description: "Submit requests to our development team anytime. Design changes, new features, bug fixes \u2014 we handle it all with fast turnaround." },
      { icon: "Smartphone", title: "Responsive Design", description: "Your site looks perfect on every device. Phone, tablet, laptop, and desktop \u2014 every visitor gets a great experience." },
      { icon: "Search", title: "SEO Optimized", description: "Built with search engine visibility in mind. Proper structure, meta tags, sitemaps, and performance optimization for better rankings." },
      { icon: "Shield", title: "SSL & Security", description: "HTTPS encryption, regular security updates, and monitoring included. Your site and your visitors' data stay protected." },
      { icon: "TrendingUp", title: "Affordable Alternative", description: "Get agency-quality results at a fraction of the cost. No $10,000+ project fees, no hourly billing surprises. Simple monthly pricing." },
      { icon: "Zap", title: "Higher Quality Than DIY", description: "Skip the frustration of Wix, Squarespace, and WordPress. Get a website that actually looks custom \u2014 because it is." },
    ],
    useCases: [
      { title: "Businesses Replacing Outdated Sites", description: "Your current website is embarrassing or broken. Get a modern, professional site that represents your business the way it deserves \u2014 without the project management headache." },
      { title: "Companies Tired of DIY Builders", description: "You've tried Wix, Squarespace, or WordPress and the result always looks like a template. Get a developer-built site that actually stands out." },
      { title: "Growing Businesses", description: "Your business is growing and your web presence needs to keep up. Start with a professional foundation that scales with you \u2014 add e-commerce, booking, courses, and more." },
    ],
    relatedSlugs: ["landing-page", "digital-course-platform", "booking-system"],
  },

  "digital-course-platform": {
    slug: "digital-course-platform",
    tagline: "Teach what you know. Earn while you sleep.",
    icon: "GraduationCap",
    overviewTitle: "Everything you need to create and sell online courses",
    overviewParagraphs: [
      "Turn your expertise into income. Create unlimited online courses with video lessons, downloadable materials, quizzes, and certificates. Host everything on your own website \u2014 no third-party platform taking a cut of your revenue.",
      "Manage students effortlessly with enrollment tracking, progress monitoring, and automated completion certificates. Set up drip content to release lessons on a schedule, or let students learn at their own pace.",
      "Integrated payment processing means you start selling immediately. Set course prices, offer bundles, and create coupon codes. Your course platform lives on your website, under your brand, with your domain.",
    ],
    detailedFeatures: [
      { icon: "BookOpen", title: "Unlimited Courses", description: "Create as many courses as you want. Short workshops, comprehensive programs, or multi-module academies \u2014 no limits on content." },
      { icon: "Users", title: "Student Management", description: "Track enrollments, monitor progress, and manage students from a single dashboard. See who's active, who's stuck, and who's completed." },
      { icon: "Video", title: "Video Hosting", description: "Upload and stream video lessons directly from your course. No YouTube links, no third-party embeds. Professional delivery under your brand." },
      { icon: "CheckCircle", title: "Quizzes & Assessments", description: "Test student knowledge with multiple choice, true/false, and open-ended questions. Set passing scores and prerequisites between modules." },
      { icon: "Award", title: "Certificate Generation", description: "Automatically generate branded completion certificates. Students can download and share them \u2014 adding credibility to your program." },
      { icon: "BarChart3", title: "Progress Tracking", description: "Students see their progress through each course. Completion percentages, time spent, and milestones achieved keep them motivated." },
      { icon: "Clock", title: "Drip Content", description: "Release lessons on a schedule. Keep students engaged over weeks or months with timed content delivery that prevents overwhelm." },
      { icon: "CreditCard", title: "Payment Integration", description: "Accept payments directly through your website. One-time purchases, subscription access, or pay-per-course \u2014 you choose the model." },
    ],
    useCases: [
      { title: "Coaches & Consultants", description: "Package your expertise into structured courses. Scale your 1-on-1 knowledge to reach hundreds of students simultaneously." },
      { title: "Educators", description: "Build an online academy with multiple courses, tracks, and certifications. Offer professional development that students can take at their own pace." },
      { title: "Businesses", description: "Create training programs for customers, partners, or employees. Onboarding courses, product tutorials, and continuing education \u2014 all self-service." },
    ],
    relatedSlugs: ["website", "booking-system", "events-management"],
  },

  "booking-system": {
    slug: "booking-system",
    tagline: "Let clients book 24/7. You just show up.",
    icon: "CalendarCheck",
    overviewTitle: "Appointment scheduling that works while you sleep",
    overviewParagraphs: [
      "Stop playing phone tag. Your booking system lets clients schedule appointments anytime, from any device. They see your real-time availability, pick a time that works, and book instantly \u2014 no back-and-forth emails needed.",
      "Google Calendar integration keeps everything in sync. When a client books, it appears in your calendar automatically. When you block time off, it's removed from available slots. No double-bookings, no conflicts, no surprises.",
      "Automated email and SMS reminders reduce no-shows by up to 80%. Clients receive a confirmation immediately, a reminder the day before, and a follow-up after their appointment. You spend zero time on administrative messaging.",
    ],
    detailedFeatures: [
      { icon: "Calendar", title: "Google Calendar Sync", description: "Two-way sync with Google Calendar. Bookings appear automatically, and your personal events block out availability. Always accurate, always current." },
      { icon: "Bell", title: "Automated Reminders", description: "Email and SMS reminders sent automatically before appointments. Customizable timing and messaging to reduce no-shows significantly." },
      { icon: "Settings", title: "Custom Availability", description: "Set your working hours, break times, and vacation days. Different availability for different service types. Block specific dates with one click." },
      { icon: "Globe", title: "Multiple Time Zones", description: "Clients see availability in their local time zone. No confusion, no missed appointments due to time zone math errors." },
      { icon: "Mail", title: "Email Notifications", description: "Instant notifications when someone books, reschedules, or cancels. Stay informed without checking your calendar constantly." },
      { icon: "Layout", title: "Booking Page", description: "A clean, branded booking page embedded right on your website. Clients select a service, choose a time, and book \u2014 no redirect needed." },
      { icon: "Clock", title: "Buffer Times", description: "Set buffer time between appointments for preparation, travel, or breaks. Never get back-to-back bookings that leave you rushing." },
      { icon: "CalendarDays", title: "Recurring Appointments", description: "Clients can book recurring sessions \u2014 weekly therapy, monthly coaching, bi-weekly check-ins. Set it once, done for the series." },
    ],
    useCases: [
      { title: "Therapists & Consultants", description: "Let clients book their own sessions. Manage different session lengths, set preparation time between appointments, and handle recurring bookings effortlessly." },
      { title: "Hair Salons & Spas", description: "Multiple service types with different durations. Clients pick their service, choose their preferred professional, and book the perfect time slot." },
      { title: "Professional Service Providers", description: "Lawyers, accountants, financial advisors \u2014 let clients schedule consultations online. Professional booking experience that matches your practice." },
    ],
    relatedSlugs: ["website", "events-management", "crm"],
  },

  "events-management": {
    slug: "events-management",
    tagline: "From registration to recap. Events, simplified.",
    icon: "CalendarDays",
    overviewTitle: "Complete event management in one platform",
    overviewParagraphs: [
      "Whether you're running a workshop for 20 people or a conference for 500, our events module handles registration, ticketing, schedules, and attendee management all in one place. No Eventbrite fees, no third-party platform limitations.",
      "Create beautiful event pages on your own website. Display schedules, speaker bios, ticket types, and venue details. Attendees register and pay directly through your site \u2014 you keep 100% of ticket revenue.",
      "On event day, manage check-ins digitally, track attendance in real-time, and communicate with attendees via email. After the event, access detailed analytics on registrations, attendance, and revenue.",
    ],
    detailedFeatures: [
      { icon: "CalendarDays", title: "Event Creation", description: "Create events with rich descriptions, images, schedules, and speaker profiles. Single-day workshops or multi-day conferences \u2014 any format works." },
      { icon: "FileText", title: "Registration Forms", description: "Custom registration forms that collect exactly the information you need. Name, email, dietary preferences, t-shirt size \u2014 whatever matters for your event." },
      { icon: "CreditCard", title: "Ticket Sales", description: "Sell tickets directly through your website. Multiple ticket types, early bird pricing, group discounts, and promo codes included." },
      { icon: "Users", title: "Attendee Tracking", description: "See who registered, who paid, and who checked in. Export attendee lists, manage waitlists, and handle cancellations and refunds." },
      { icon: "ListTodo", title: "Event Schedules", description: "Create detailed schedules with sessions, speakers, and locations. Attendees see the agenda on your event page and can plan their day." },
      { icon: "Mail", title: "Email Notifications", description: "Automatic confirmation emails, event reminders, and post-event follow-ups. Keep attendees informed at every stage without manual effort." },
      { icon: "CheckCircle", title: "Check-in System", description: "Digital check-in via QR code or name search. Track attendance in real-time and know exactly who's in the room." },
      { icon: "BarChart3", title: "Post-Event Analytics", description: "Registration vs. attendance rates, revenue reports, and attendee demographics. Data to make your next event even better." },
    ],
    useCases: [
      { title: "Workshop Organizers", description: "Run paid workshops with limited capacity. Manage registrations, collect payments, send materials in advance, and track attendance \u2014 all from one dashboard." },
      { title: "Conference Planners", description: "Multi-day events with multiple tracks, speakers, and ticket types. Handle the complexity with tools designed for large-scale event management." },
      { title: "Community Event Hosts", description: "Free or paid community events \u2014 meetups, networking nights, classes. Simple registration, easy communication, and turnout tracking." },
    ],
    relatedSlugs: ["website", "booking-system", "email-marketing"],
  },

  "simple-store": {
    slug: "simple-store",
    tagline: "Start selling today. No complexity required.",
    icon: "ShoppingBag",
    overviewTitle: "Everything you need to sell online, nothing you don't",
    overviewParagraphs: [
      "You don't need Shopify to sell 10 products. Our Simple Store gives you everything a small catalog needs: product pages, a clean checkout, payment processing, and order management. Set up in days, not weeks.",
      "Perfect for businesses with up to 25 products. Upload photos, write descriptions, set prices, and you're selling. Customers browse, add to cart, and pay \u2014 with a checkout experience that feels professional and trustworthy.",
      "Track orders from purchase to fulfillment. Manage inventory so you never oversell. Send automatic email receipts and order confirmations. Simple doesn't mean lacking \u2014 it means focused on what actually matters.",
    ],
    detailedFeatures: [
      { icon: "Package", title: "Up to 25 Products", description: "List up to 25 products with multiple images, descriptions, and pricing. Perfect for curated catalogs and small product lines." },
      { icon: "CreditCard", title: "Payment Processing", description: "Accept credit cards and other payment methods securely. PCI-compliant processing with trusted payment gateways." },
      { icon: "ShoppingCart", title: "Clean Checkout", description: "A straightforward checkout flow that converts. Guest checkout, saved addresses, and clear order summaries reduce cart abandonment." },
      { icon: "ListTodo", title: "Order Management", description: "View, filter, and manage all orders from your dashboard. Mark as fulfilled, add tracking numbers, and handle returns." },
      { icon: "Layout", title: "Product Pages", description: "Each product gets its own page with images, descriptions, pricing, and variants. Share direct links in social media and marketing." },
      { icon: "Database", title: "Inventory Tracking", description: "Track stock levels in real-time. Get alerts when inventory is low and never sell a product you don't have in stock." },
      { icon: "Mail", title: "Email Receipts", description: "Customers receive automatic order confirmations and receipts. Professional emails with order details and your branding." },
      { icon: "Smartphone", title: "Mobile-Friendly", description: "Your store looks great on phones and tablets. Customers can browse and buy from any device with a seamless experience." },
    ],
    useCases: [
      { title: "Artisans & Makers", description: "Sell handmade goods, crafts, or art directly from your website. Showcase your work with beautiful product pages and accept payments online." },
      { title: "Small Shops Going Online", description: "Take your physical store online without the overhead of a full e-commerce platform. List your best sellers and start taking orders today." },
      { title: "Service Businesses", description: "Sell packages, gift cards, or digital products alongside your services. Let clients purchase directly from your website." },
    ],
    relatedSlugs: ["full-ecommerce", "website", "digital-course-platform"],
  },

  "full-ecommerce": {
    slug: "full-ecommerce",
    tagline: "Your complete online store. No limits.",
    icon: "ShoppingCart",
    overviewTitle: "Full-featured e-commerce for serious sellers",
    overviewParagraphs: [
      "When 25 products isn't enough, Full E-commerce removes the limits. Unlimited products, product variants (sizes, colors, materials), advanced inventory management, and powerful sales tools designed for businesses that are serious about selling online.",
      "Recover lost revenue with abandoned cart recovery \u2014 automatic emails remind customers about items they left behind. Create discount codes for promotions and keep orders moving from purchase to fulfillment.",
      "Detailed sales analytics show you what's selling, what's not, and where your revenue is trending. Make data-driven decisions about inventory, pricing, and marketing with insights built right into your dashboard.",
    ],
    detailedFeatures: [
      { icon: "Package", title: "Unlimited Products", description: "List as many products as your business needs. No caps, no tiers, no paying more as your catalog grows." },
      { icon: "Settings", title: "Product Variants", description: "Sizes, colors, materials, custom options \u2014 create variants with individual pricing, SKUs, and inventory tracking for each combination." },
      { icon: "Database", title: "Inventory Management", description: "Track stock across all variants. Low-stock alerts, reorder points, and inventory reports help you never miss a sale." },
      { icon: "ShoppingCart", title: "Abandoned Cart Recovery", description: "Automatic email sequences remind customers about items left in their cart, encouraging them to come back and complete their purchase." },
      { icon: "Truck", title: "Shipping & Fulfillment", description: "Track fulfillment status for every order so nothing falls through the cracks." },
      { icon: "Tag", title: "Discount Codes", description: "Create percentage or fixed-amount discounts. Set expiration dates, usage limits, and minimum order amounts for promotions." },
      { icon: "BarChart3", title: "Sales Analytics", description: "Track revenue, order volume, average order value, and product performance. Dashboards that give you the insights you need to grow." },
    ],
    useCases: [
      { title: "Growing Online Retailers", description: "Your catalog is expanding and you need tools that scale. Unlimited products, advanced inventory, and sales analytics for businesses ready to grow." },
      { title: "Multi-Product Businesses", description: "Clothing with sizes and colors, food with flavors and quantities, electronics with configurations \u2014 product variants handle any catalog complexity." },
      { title: "Upgrading from Simple Store", description: "You've outgrown 25 products and need abandoned cart recovery and advanced inventory management. Full E-commerce picks up where Simple Store leaves off." },
    ],
    relatedSlugs: ["simple-store", "website", "crm"],
  },

  "test-subscription-5ils": {
    slug: "test-subscription-5ils",
    tagline: "Test product for SUMIT payment gateway",
    icon: "TestTube",
    overviewTitle: "Monthly subscription test product",
    overviewParagraphs: [
      "This is a test product for SUMIT payment gateway integration. It charges 5 ILS per month as a recurring subscription.",
      "Use this product to test subscription creation, recurring charges, subscription management (pause, resume, cancel), and auto-renewal behavior.",
    ],
    detailedFeatures: [
      { icon: "RefreshCcw", title: "Recurring Charges", description: "Test monthly recurring billing at 5 ILS per month." },
      { icon: "Settings", title: "Subscription Management", description: "Test pause, resume, and cancel functionality." },
      { icon: "Calendar", title: "Auto-Renewal", description: "Verify automatic renewal after each billing cycle." },
      { icon: "CreditCard", title: "SUMIT Integration", description: "End-to-end testing of SUMIT payment gateway." },
    ],
    useCases: [
      { title: "QA Testing", description: "Quality assurance testing for subscription workflows." },
      { title: "Gateway Integration", description: "Test SUMIT payment gateway integration." },
      { title: "Billing Verification", description: "Verify recurring billing and subscription management." },
    ],
    relatedSlugs: ["test-onetime-10ils"],
  },

  "founder-launch": {
    slug: "founder-launch",
    tagline: "Full platform setup — zero friction, zero technical work",
    icon: "Rocket",
    overviewTitle: "Everything configured. Everything migrated. Everything ready.",
    overviewParagraphs: [
      "Founder Launch is a done-for-you onboarding service where an Upgrade Shop expert handles your entire platform setup from start to finish. We interview you about your business, then configure every module — CRM, email, WhatsApp, AI agent, automations, and your website — so everything works together the moment we hand it over.",
      "Your AI-built website goes live as part of the package. We pre-train your AI agent on your services, pricing, FAQs, and brand voice, then build your first automations so leads are captured and followed up with immediately. For businesses switching from multiple disconnected tools, we migrate your contacts, deal history, and content into the platform cleanly.",
      "Ideal for founders who want zero technical involvement and businesses that need to be operational quickly. The full setup takes 3–5 business days. You get a kick-off call, a handoff walkthrough, and 72 hours of post-launch human review to catch anything that needs adjustment.",
    ],
    detailedFeatures: [
      { icon: "Search", title: "Business Discovery", description: "A structured kick-off call where we learn your business model, target customers, services, pricing, and goals. Everything we need to configure your platform correctly the first time." },
      { icon: "Settings", title: "Full Module Configuration", description: "Every module you've subscribed to is configured for your specific workflow. CRM pipeline stages, email templates, booking services, product catalog — all set up and ready to use." },
      { icon: "Bot", title: "AI Agent Pre-Training", description: "Your AI agent is trained on your business before launch. We feed it your services, pricing, FAQs, policies, and brand voice so it handles customer inquiries accurately from day one." },
      { icon: "Database", title: "Data Migration", description: "We import your existing contacts, deal history, and product data from spreadsheets, previous CRMs, or other platforms. You don't lose your history when you switch." },
      { icon: "Zap", title: "Automations Built", description: "Your first automation workflows are built during setup — lead capture sequences, appointment reminders, follow-up emails, and WhatsApp responses. Not templates. Actual working automations for your business." },
      { icon: "MessageCircle", title: "WhatsApp Handoff", description: "Your WhatsApp Business number is connected, message templates are created and submitted for Meta approval, and your AI agent is live on WhatsApp before we hand over." },
      { icon: "Globe", title: "AI-Built Website", description: "A professionally structured AI-built website goes live as part of Founder Launch. Your homepage, services pages, and contact form are live and linked to your platform." },
      { icon: "Shield", title: "72hr Human Review", description: "After handoff, our team monitors your platform for 72 hours. We catch edge cases in your automations, adjust AI agent responses based on real conversations, and fix anything before you rely on it fully." },
    ],
    useCases: [
      { title: "Switching from Multiple Tools", description: "You're currently using separate tools for CRM, email, scheduling, and customer support. Founder Launch consolidates everything into one platform and migrates your data so the switch doesn't cost you momentum." },
      { title: "Zero Technical Involvement", description: "You're a business owner, not a developer. You don't want to spend weeks in settings menus. Founder Launch means you show up to the kick-off call and come back to a fully working platform." },
      { title: "Quick Launch", description: "You need to be operational in days, not months. Whether you're launching a new business or finally getting your systems in order, Founder Launch gets everything live and tested in under a week." },
    ],
    relatedSlugs: ["pro-website-marketing", "crm", "email-marketing"],
  },

  "pro-website-marketing": {
    slug: "pro-website-marketing",
    tagline: "Custom branded website built by a developer — not a template fill",
    icon: "Globe",
    overviewTitle: "A genuinely premium web presence for your business",
    overviewParagraphs: [
      "Pro Website Marketing is a developer-built site using our custom template system — not a drag-and-drop builder and not a generic theme you'd find on any competitor. A real developer designs and builds your site to your brand, then connects it to your Upgrade Shop platform so your AI agent can update content and your CRM captures every lead.",
      "Every site includes your homepage, about page, services pages, and contact page as standard. Blog is included if you want to publish content for SEO. All pages are database-connected through our visual editor, which means your AI agent can make updates in plain language without anyone touching the code.",
      "The process starts with a brand consultation — we look at your visual identity, your competitors, and what you want visitors to feel when they land on your site. From there we design, build, and launch, typically within 5–10 business days from the consultation call.",
    ],
    detailedFeatures: [
      { icon: "Palette", title: "Custom Branded Design", description: "Your site is designed to your brand — your colors, fonts, logo, and visual identity. No picking from preset themes. A developer creates a design system specifically for you." },
      { icon: "Database", title: "Database-Connected Sections", description: "Every content section is connected to our visual editor. Text, images, CTAs — all editable through the dashboard without touching code. Your AI agent can make updates on your behalf." },
      { icon: "Layers", title: "Brand Template Library", description: "Once your design system is built, every new page you add inherits it automatically. Your brand stays consistent as your site grows — no need to redesign every time you add content." },
      { icon: "Bot", title: "AI Agent Managed", description: "Your AI agent can update your website content in response to a WhatsApp message from you. Change your headline, swap an image, or update pricing — just tell your agent." },
      { icon: "FileText", title: "Blog Included", description: "A full blog section is included at no extra cost. Publish SEO content, case studies, and updates. Your AI agent can help draft and publish posts on your schedule." },
      { icon: "CreditCard", title: "Payment Gateway", description: "A payment gateway is connected if you want to sell services, packages, or deposit payments directly from your website. No separate checkout setup needed." },
      { icon: "Smartphone", title: "Mobile Optimized", description: "Your site is built and tested for mobile from the start — not an afterthought. Every page looks and works correctly on phones, tablets, and desktop." },
      { icon: "Lock", title: "SSL Certificate", description: "HTTPS security is included and configured from launch. Your visitors see the lock icon, their data is encrypted, and your site is trusted by search engines." },
    ],
    useCases: [
      { title: "Premium Brand Presence", description: "You're a consultant, agency, or professional service provider and your website needs to instantly communicate quality and credibility. A developer-built site does that — a template doesn't." },
      { title: "Service Businesses", description: "You offer services, not products, and your website's job is to explain what you do, build trust, and get visitors to book or contact you. Pro Website Marketing is built specifically for this conversion path." },
      { title: "Upgrade from AI-Built", description: "You launched with an AI-built site and it served its purpose, but now you need something that matches the quality of your brand. Pro Website Marketing is the natural upgrade." },
    ],
    relatedSlugs: ["pro-website-ecommerce", "founder-launch", "booking-system"],
  },

  "pro-website-ecommerce": {
    slug: "pro-website-ecommerce",
    tagline: "Custom e-commerce website with full Shopify migration included",
    icon: "ShoppingBag",
    overviewTitle: "A complete online store — built by a developer, managed by your AI agent",
    overviewParagraphs: [
      "Pro Website Ecommerce includes everything in Pro Website Marketing plus a full e-commerce storefront. Product catalog, cart, checkout, order management, inventory tracking, abandoned cart recovery — all custom-built to your brand and connected to your Upgrade Shop platform. No third-party e-commerce platform, no revenue share, no monthly Shopify fees.",
      "Shopify and WooCommerce migration is included. We export your product catalog, customer data, and order history and import it into your new store cleanly. Your product URLs, SEO rankings, and customer accounts are preserved where possible. You switch platforms without losing what you've built.",
      "Once live, your AI agent generates on-brand product descriptions for new additions, manages inventory updates on request, and handles customer inquiries about orders, shipping, and returns through WhatsApp. Your store is genuinely managed — not just hosted.",
    ],
    detailedFeatures: [
      { icon: "ShoppingBag", title: "Full Store Infrastructure", description: "Complete e-commerce functionality: product catalog, collections, variants, cart, secure checkout, order management, and customer accounts — all custom-built to your brand." },
      { icon: "ArrowRight", title: "Shopify/WooCommerce Migration", description: "We handle the full migration from Shopify or WooCommerce. Products, customer data, order history, SEO metadata — imported cleanly so you don't start from scratch." },
      { icon: "Palette", title: "Custom Brand Templates", description: "Your store design is unique to your brand. Product pages, collection pages, and checkout flow are designed as part of your brand system — not a modified template." },
      { icon: "Bot", title: "AI Product Pages", description: "Your AI agent generates product descriptions in your brand voice for new products. Ask it to write, update, or optimize any product page through a simple WhatsApp message." },
      { icon: "ShoppingCart", title: "Cart & Checkout", description: "A fast, conversion-optimized checkout with guest checkout, saved addresses, multiple payment methods, and clear order summaries. Reduces friction at the most critical step." },
      { icon: "BarChart3", title: "Abandoned Cart Recovery", description: "Automatic email sequences recover customers who left items in their cart. Customizable timing and messaging with real performance analytics to measure recovery rate." },
      { icon: "Globe", title: "Everything in Marketing Build", description: "All the features of Pro Website Marketing are included: custom design, blog, database-connected sections, AI agent content management, SSL, and mobile optimization." },
      { icon: "Zap", title: "Cross-Platform Automation", description: "Order confirmations, shipping updates, and review requests are sent automatically via email and WhatsApp. Your post-purchase experience runs on autopilot." },
    ],
    useCases: [
      { title: "Shopify Replacement", description: "You're paying Shopify fees, app fees, and transaction fees that add up to hundreds of dollars a month. Pro Website Ecommerce replaces Shopify entirely with a one-time build and your Upgrade Shop subscription." },
      { title: "Growing E-commerce Brands", description: "You've outgrown basic store solutions and need a website that matches your brand quality, integrates with your CRM and email marketing, and gives your AI agent real control over store content." },
      { title: "WooCommerce Migration", description: "Your WooCommerce site is slow, needs constant plugin updates, or has become too technically complex to manage. We migrate everything and rebuild it on a modern, managed stack." },
    ],
    relatedSlugs: ["pro-website-marketing", "founder-launch", "whatsapp"],
  },

  "test-onetime-10ils": {
    slug: "test-onetime-10ils",
    tagline: "Test product for SUMIT payment gateway",
    icon: "TestTube",
    overviewTitle: "One-time purchase test product",
    overviewParagraphs: [
      "This is a test product for SUMIT payment gateway integration. It charges 10 ILS as a single one-time payment.",
      "Use this product to test one-time payment processing, standard checkout flow, order completion, and receipt generation.",
    ],
    detailedFeatures: [
      { icon: "CreditCard", title: "One-Time Payment", description: "Test single payment processing at 10 ILS." },
      { icon: "ShoppingCart", title: "Checkout Flow", description: "Verify standard checkout process end-to-end." },
      { icon: "CheckCircle", title: "Order Completion", description: "Test order creation and fulfillment workflow." },
      { icon: "Receipt", title: "Receipt Generation", description: "Verify receipt and confirmation email delivery." },
    ],
    useCases: [
      { title: "QA Testing", description: "Quality assurance testing for one-time purchase workflows." },
      { title: "Gateway Integration", description: "Test SUMIT payment gateway integration." },
      { title: "Order Verification", description: "Verify order processing and receipt generation." },
    ],
    relatedSlugs: ["test-subscription-5ils"],
  },
};

export function getProductContent(slug: string): ProductPageContent | null {
  return productContent[slug] || null;
}

export function getAllProductSlugs(): string[] {
  return Object.keys(productContent);
}
