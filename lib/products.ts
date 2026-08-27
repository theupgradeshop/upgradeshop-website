/**
 * Product data for UpgradeShop pricing page
 *
 * Terminology (updated March 2026):
 * - MODULES: Standalone products purchasable independently (CRM, Email, WhatsApp, Funnels, etc.)
 * - WEBSITE: Two tracks — AI-Built (included with any sub) or Professional Build (one-time service)
 * - ADDONS: Extensions for the website module (Booking, Events, Community, Courses integration)
 * - AI_ACTIONS: Credit packages for AI agent usage
 * - SERVICES: One-time products (Founder Launch, Professional Website Builds)
 *
 * The database is the source of truth for prices. Static definitions here provide
 * features/descriptions as fallback when the DB doesn't have them.
 */

export type ProductCategory = "module" | "website-addon" | "ai-actions" | "service" | "bundle" | "subscription-tier";

export interface Product {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  pricePrefix?: string;
  compareAtPrice?: number;
  prices?: Record<string, number> | null;
  billingCycle: "monthly" | "yearly" | "one-time";
  features: string[];
  isBundle?: boolean;
  category: ProductCategory;
  requires?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

// =============================================================================
// SUBSCRIPTION TIERS
// =============================================================================

export interface SubscriptionTier {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  price: number;
  highlight?: boolean;
  badge?: string;
  includes: string[];
  extras?: string[];
  extrasLabel?: string;
}

export const subscriptionTiers: SubscriptionTier[] = [
  {
    id: "6a12b6b0-c7aa-4c3f-82e0-f969a558901c",
    slug: "starter",
    name: "Starter",
    tagline: "For services, local businesses, coaches & consultants",
    price: 170,
    includes: [
      "AI-built website — 72hr human review before going live",
      "Full CRM — contacts, workflow automation",
      "Email Marketing — up to 1,000 sends/month included",
      "Automations — cross-module workflows, conversationally built",
      "Personal AI agent — named by you, from day one",
      "Up to 2 website rebuilds if you're not happy",
      "Human ticket support",
    ],
  },
  {
    id: "1c51a467-d33d-4032-afa1-8d62a3577991",
    slug: "ecommerce",
    name: "Ecommerce",
    tagline: "For businesses with a product catalog",
    price: 260,
    highlight: true,
    badge: "Best for online stores",
    includes: [
      "Everything in Starter",
      "Full store module — catalog, inventory, variants, shipping",
      "Order management",
      "Abandoned cart recovery",
      "AI generates product pages from your catalog",
      "Higher base AI credit allocation",
      "Shopify / WooCommerce migration available",
    ],
    extrasLabel: "The $90 difference covers the store infrastructure and the higher AI usage that running a store naturally generates.",
  },
];

// Product IDs from the database (store.products where customer_id = UpgradeShop)
export const PRODUCT_IDS = {
  // Modules
  crm: "25b9954a-85a9-4525-96ee-17ff8b8dd7c0",
  emailMarketing: "61f757fb-52cc-44f5-826e-44d6ffd10cfa",
  whatsapp: "b63888a8-2b23-49b4-8215-1eaf29b8f9c0",
  facebookInstagram: "e74360ec-35c2-45ad-baaf-2865d889611f",
  projectTaskManagement: "fde46275-5d68-4ce6-9039-78dbd2021d22",
  funnels: "97b09694-fb0b-443e-85b1-854c5351635f",
  digitalCourses: "a7d49a5d-bc11-4d42-bd16-b5ee7ecc4a6c",
  crmEmailBundle: "9fb28c2e-8e6f-48bf-a685-bb54ad05460a",
  community: "857bbe5f-6adc-4ba4-9843-f61f04217b49",
  // Website Addons
  bookingSystem: "a51a650f-c187-4af8-a61b-bfd2392c4833",
  eventsManagement: "759670a3-0b9c-4889-b9cb-4b97c61433e9",
  digitalCourseIntegration: "027e1552-5e7d-4958-bdf4-05daabbfe46e",
  // AI Actions (separate subscription products per tier)
  aiActionsStarter: "72e94130-2f55-47ab-87ee-1e93c9d1a99a",
  aiActionsGrowth: "efe5e83f-872e-4b98-ad79-970e13713f45",
  aiActionsPro: "fa201e93-50aa-4805-9df7-1e8fa6dd2f05",
  aiActionsScale: "f590964c-1a69-4aa4-89a5-21aa3042aad0",
  // Services (one-time)
  founderLaunch: "deae375e-f805-47d4-af2e-3e7996221de6",
  proWebsiteMarketing: "49c09e23-8547-4a50-9184-f2be02f7027a",
  proWebsiteEcommerce: "50f88414-c9e5-40cf-8e23-f37709624d02",
  // Built-in (not purchasable separately)
  aiAgent: "a9faff03-c67f-4f5b-8548-ca096558cb49",
} as const;

// =============================================================================
// MODULES — Standalone products purchasable independently
// =============================================================================

export const modules: Product[] = [
  {
    id: PRODUCT_IDS.crm,
    slug: "crm",
    name: "CRM",
    shortDescription: "Customer relationships, managed",
    description: "Full CRM with custom fields, workflow automation, activity tracking, and team collaboration. Configured for your business during onboarding.",
    price: 29,
    billingCycle: "monthly",
    category: "module",
    features: [
      "Contact management & sales tracking",
      "Custom fields & tags",
      "Workflow automation",
      "Activity tracking & notes",
      "Up to 5 users included",
      "AI agent for CRM management",
    ],
  },
  {
    id: PRODUCT_IDS.emailMarketing,
    slug: "email-marketing",
    name: "Email Marketing",
    shortDescription: "Campaigns, sequences & analytics",
    description: "AI-powered email campaigns, automated sequences, segmentation, and analytics. Tell your agent what you want to say, it handles the rest.",
    price: 25,
    billingCycle: "monthly",
    category: "module",
    features: [
      "5,000 sends/month included",
      "Unlimited campaigns & sequences",
      "Smart segmentation with CRM",
      "A/B testing",
      "Analytics & reporting",
      "AI agent writes & sends",
    ],
  },
  {
    id: PRODUCT_IDS.whatsapp,
    slug: "whatsapp",
    name: "WhatsApp Integration",
    shortDescription: "Messaging, bots & automation",
    description: "WhatsApp Business API integration for messaging, automation, and customer communication. Flows, welcome message, and auto-replies configured during onboarding.",
    price: 45,
    billingCycle: "monthly",
    category: "module",
    features: [
      "WhatsApp Business API",
      "Automated messaging & chatbots",
      "Broadcast messaging",
      "CRM integration (auto-create contacts)",
      "Conversation analytics",
      "AI agent for automation",
    ],
  },
  {
    id: PRODUCT_IDS.facebookInstagram,
    slug: "social-media",
    name: "Facebook & Instagram",
    shortDescription: "Social media automation",
    description: "Instagram DM automation, Facebook Messenger automation, comment auto-replies, lead capture to CRM, chatbot flows, review management. Direct Meta API integration.",
    price: 45,
    billingCycle: "monthly",
    category: "module",
    features: [
      "Instagram DM automation",
      "Facebook Messenger automation",
      "Comment auto-replies",
      "Lead capture to CRM",
      "Review management & responses",
      "AI agent for social automation",
    ],
  },
  {
    id: PRODUCT_IDS.funnels,
    slug: "funnels",
    name: "Funnels",
    shortDescription: "AI-built conversion pages & flows",
    description: "AI-powered funnel and landing page builder. Give the agent a brief, a Google doc, or a product — it builds a polished, high-converting page. Lead, Service, Course, and Product funnels. Fully integrated with CRM and order management.",
    price: 35,
    billingCycle: "monthly",
    category: "module",
    features: [
      "AI builds pages from your brief",
      "Lead & product funnels",
      "Multi-step sequences",
      "Forms wire to CRM automatically",
      "Payment integration built-in",
      "Conversion analytics",
    ],
  },
  {
    id: PRODUCT_IDS.digitalCourses,
    slug: "digital-courses",
    name: "Digital Courses",
    shortDescription: "Sell courses, manage students",
    description: "Standalone course platform for creators, coaches, and educators. Public storefront at courses.upgradeshop.ai. Payment gateway included — keep 100% of revenue. With Website module, courses embed into your own domain.",
    price: 39,
    billingCycle: "monthly",
    category: "module",
    features: [
      "Unlimited courses & lessons",
      "Student management & progress tracking",
      "Quizzes & certificates",
      "Public storefront included",
      "Payment gateway — keep 100% revenue",
      "AI agent for course creation",
    ],
  },
  {
    id: PRODUCT_IDS.community,
    slug: "community",
    name: "Community",
    shortDescription: "Member community for creators & businesses",
    description: "A branded member community — for course creators, membership businesses, or customer communities. Spaces, discussions, member profiles, gamification, and an AI agent that moderates, welcomes, and keeps members engaged.",
    price: 39,
    billingCycle: "monthly",
    category: "module",
    features: [
      "Discussion spaces & threaded conversations",
      "Member profiles, badges & leaderboards",
      "Free, paid & tiered membership access",
      "CRM integration — every member is a contact",
      "WhatsApp & email notifications",
      "AI agent moderates & welcomes members",
    ],
  },
  {
    id: PRODUCT_IDS.projectTaskManagement,
    slug: "project-task-management",
    name: "Projects & Tasks",
    shortDescription: "Planning, tracking & collaboration",
    description: "Project planning, task tracking, team collaboration, and workflow management. Integrates with CRM to auto-create tasks from customer actions.",
    price: 39,
    billingCycle: "monthly",
    category: "module",
    features: [
      "Unlimited projects & tasks",
      "Team collaboration",
      "Deadline & progress tracking",
      "CRM integration (auto-create tasks)",
      "Up to 5 users included",
      "AI agent for project management",
    ],
  },
];

// =============================================================================
// BUNDLE
// =============================================================================

export const crmEmailBundle: Product = {
  id: PRODUCT_IDS.crmEmailBundle,
  slug: "crm-email-bundle",
  name: "CRM + Email Bundle",
  shortDescription: "CRM + Email Marketing — save $5/mo",
  description: "Full CRM with custom fields and workflow automation — plus Email Marketing with 5,000 sends/month, sequences, segmentation, and A/B testing.",
  price: 49,
  billingCycle: "monthly",
  category: "bundle",
  isBundle: true,
  features: [
    "Everything in CRM ($29/mo)",
    "Everything in Email Marketing ($25/mo)",
    "Save $5/month",
    "Single subscription",
    "Cross-module automation",
    "AI agent manages both",
  ],
};

// =============================================================================
// WEBSITE — Two tracks (not subscription tiers)
// =============================================================================

export interface WebsiteTrack {
  key: string;
  name: string;
  tagline: string;
  description: string;
  price: number | null; // null = included
  priceLabel: string;
  features: string[];
  cta: string;
}

export const websiteTracks: WebsiteTrack[] = [
  {
    key: "ai-built",
    name: "AI-Built Website",
    tagline: "Fast, professional, included",
    description: "The AI agent builds your website from a conversational brief. Standard pages, forms connected to CRM, blog and payment gateway included. Human developer reviews before going live.",
    price: null,
    priceLabel: "Included with any subscription",
    features: [
      "Conversational setup — describe your business",
      "Home, About, Contact, Services pages",
      "Forms automatically connected to CRM",
      "Blog included — AI writes & publishes",
      "Payment gateway included",
      "SSL, mobile-optimized, responsive",
      "Human review before going live (72hr)",
      "AI agent manages ongoing updates",
    ],
    cta: "Included",
  },
  {
    key: "professional",
    name: "Professional Developer Build",
    tagline: "Custom branded, database-connected",
    description: "A human developer builds your website from scratch on our template system. Every section database-connected. Brand-specific templates created for your business. The premium web presence.",
    price: 1700,
    priceLabel: "From $1,700 one-time",
    features: [
      "Custom branded site by a developer",
      "Brand-specific section template library",
      "Every section database-connected",
      "Unlimited pages via template system",
      "Blog & payment gateway included",
      "E-commerce build: $2,600 — includes Shopify/WooCommerce migration",
      "AI agent manages ongoing updates",
      "Developer access via ticket system",
    ],
    cta: "Get a Quote",
  },
];

// =============================================================================
// WEBSITE ADDONS — Extensions that apply to both website tracks
// =============================================================================

export const websiteAddons: Product[] = [
  {
    id: PRODUCT_IDS.bookingSystem,
    slug: "booking-system",
    name: "Booking System",
    shortDescription: "Appointment scheduling & reminders",
    description: "Appointment scheduling with calendar sync, automated reminders, and payment collection.",
    price: 25,
    billingCycle: "monthly",
    category: "website-addon",
    requires: "website",
    features: [
      "Google Calendar sync",
      "Automated reminders",
      "Payment collection",
      "Custom availability",
      "Multiple time zones",
      "AI agent manages bookings",
    ],
  },
  {
    id: PRODUCT_IDS.eventsManagement,
    slug: "events-management",
    name: "Events System",
    shortDescription: "Listings, tickets & registration",
    description: "Event listings, ticketing, registration management, and attendee tracking.",
    price: 20,
    billingCycle: "monthly",
    category: "website-addon",
    requires: "website",
    features: [
      "Event creation & management",
      "Registration & ticketing",
      "Attendee tracking",
      "Event schedules",
      "Email notifications",
      "AI agent for event management",
    ],
  },
];

// =============================================================================
// AI ACTIONS — Credit packages
// =============================================================================

export interface AiActionsPlan {
  id: string;
  slug: string;
  name: string;
  credits: number;
  price: number;
  perAction: string;
  saving: string;
  highlight?: boolean;
}

export const aiActionsPlans: AiActionsPlan[] = [
  { id: PRODUCT_IDS.aiActionsStarter, slug: "ai-actions-starter", name: "Starter", credits: 500, price: 29, perAction: "$0.058", saving: "", highlight: false },
  { id: PRODUCT_IDS.aiActionsGrowth, slug: "ai-actions-growth", name: "Growth", credits: 2000, price: 59, perAction: "$0.030", saving: "48%", highlight: true },
  { id: PRODUCT_IDS.aiActionsPro, slug: "ai-actions-pro", name: "Pro", credits: 6000, price: 149, perAction: "$0.025", saving: "57%", highlight: false },
  { id: PRODUCT_IDS.aiActionsScale, slug: "ai-actions-scale", name: "Scale", credits: 20000, price: 349, perAction: "$0.017", saving: "70%", highlight: false },
];

// =============================================================================
// SERVICES — One-time products
// =============================================================================

export const services: Product[] = [
  {
    id: PRODUCT_IDS.founderLaunch,
    slug: "founder-launch",
    name: "Founder Launch",
    shortDescription: "Full-service assisted setup",
    description: "A human expert handles everything — business discovery, full module configuration, AI agent training, data migration, first automations, and a complete handoff walkthrough. No developer website included — uses your AI-built website.",
    price: 800,
    pricePrefix: "From",
    billingCycle: "one-time",
    category: "service",
    features: [
      "Deep-dive business discovery",
      "Full module configuration",
      "AI agent pre-trained on your business",
      "Data migration from existing tools",
      "First automations built & tested",
      "Handoff walkthrough via WhatsApp",
    ],
  },
  {
    id: PRODUCT_IDS.proWebsiteMarketing,
    slug: "pro-website-marketing",
    name: "Professional Website — Marketing",
    shortDescription: "Developer-built marketing website",
    description: "Custom branded marketing website built by a developer on our template system. Home, About, Contact, Services pages, blog, and payment gateway.",
    price: 1700,
    pricePrefix: "From",
    billingCycle: "one-time",
    category: "service",
    features: [
      "Custom branded design",
      "Full section template library",
      "Database-connected sections",
      "Blog & payment gateway",
      "SSL, mobile-optimized",
      "AI agent manages ongoing",
    ],
  },
  {
    id: PRODUCT_IDS.proWebsiteEcommerce,
    slug: "pro-website-ecommerce",
    name: "Professional Website — E-commerce",
    shortDescription: "Developer-built e-commerce website",
    description: "Everything in the Marketing build plus shop pages, product templates, cart and checkout flow, full store infrastructure. Includes Shopify and WooCommerce migration.",
    price: 2600,
    pricePrefix: "From",
    billingCycle: "one-time",
    category: "service",
    features: [
      "Everything in Marketing build",
      "Shop & product page templates",
      "Cart & checkout flow",
      "Full store infrastructure",
      "Inventory & order management",
      "AI agent manages ongoing",
    ],
  },
];

// =============================================================================
// COMBINED EXPORTS
// =============================================================================

export const allProducts: Product[] = [
  ...modules,
  crmEmailBundle,
  ...websiteAddons,
  ...services,
];

export function getProductById(id: string): Product | undefined {
  return allProducts.find((p) => p.id === id);
}

export function getProductBySlug(slug: string): Product | undefined {
  return allProducts.find((p) => p.slug === slug);
}

export function calculateCartTotal(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.product.price * item.quantity, 0);
}
