# Website Builder Template

This is a template for building marketing websites for clients. Each client has data stored in a database that you'll fetch and use to build their unique website.

---

## Workflow Overview

When the user gives you a **customer UUID**, follow these phases:

1. **Setup** - Connect to database, fetch customer data, download assets
2. **Content Strategy** - Plan page structure using `/skill marketing-website-strategy`
3. **Copywriting** - Write authentic copy using `/skill authentic-copywriting`
4. **Build** - Create distinctive pages using `/skill frontend-design` + `/skill next-shadcn-stack`
5. **Quality Check** - Test, screenshot, verify

---

# Phase 1: Setup

## 1.1 Start SSH Tunnel

Database access requires an SSH tunnel. Ask the user to run:

```bash
ssh -f -N -L 5433:localhost:5432 root@<db-host>
```

**Check if already running:**
```bash
# Linux/macOS
ps aux | grep "ssh -f -N -L 5433"

# Windows PowerShell
Get-Process | Where-Object {$_.ProcessName -eq "ssh"}
```

## 1.2 Install Dependencies

```bash
npm install
```

## 1.3 Fetch Customer Data

Use the TypeScript database loader to fetch all customer data:

```typescript
import { loadExtendedClientData } from './lib/db'

const customerId = 'CUSTOMER-UUID-HERE'
const result = await loadExtendedClientData(customerId)

if (!result.success) {
  console.error('Failed:', result.errors)
  // Make sure SSH tunnel is running!
  return
}

const data = result.data
```

### What You Get

```typescript
{
  customer_info: {
    id: string
    name: string
    email: string
    phone: string
    language: 'he' | 'en' | 'ar'
  },
  items: Record<ItemKey, DataItem>, // ⚠️ Object, not array!
  website_pages: WebsitePage[],
  design_elements: DesignElement[],
  customer_assets: CustomerAssets,
  // ... more fields
}
```

### ⚠️ IMPORTANT: `items` is an Object, NOT an Array

```typescript
// ✅ Correct - iterate over object
Object.values(data.items).forEach(item => {
  console.log(item.item_key, item.full_text)
})

// ✅ Correct - access specific item
const businessName = data.items['business_name']?.extracted_data?.value

// ❌ Wrong - will cause error
data.items.forEach(...) // TypeError: items.forEach is not a function
```

### Available Item Keys

**Required - Business (6):**
- `business_name`, `services`, `target_audience`, `pain_points`, `solutions`, `about_story`

**Required - Design (4):**
- `inspiration_sites`, `mood_feeling`, `color_preferences`, `brand_colors`

**Optional (7):**
- `unique_value`, `success_stories`, `testimonials`, `professional_image`, `photo_style`, `aesthetic`, `icon_style`

## 1.4 Download Google Drive Assets

If customer has OAuth access, download their files:

```typescript
import { downloadAllCustomerAssets } from './lib/db'

if (data.customer_assets?.hasOAuthAccess) {
  const downloadResult = await downloadAllCustomerAssets(
    customerId,
    data.customer_assets,
    process.cwd()
  )

  console.log(`Downloaded ${downloadResult.downloadedFiles.length} files`)
  // Files saved to public/logos/, public/images/, public/documents/
}
```

**Assets are organized:**
```
public/
├── logos/          # Logo files
├── images/         # Content images
└── documents/      # PDFs, docs
```

---

# Phase 2: Content Strategy

**Invoke Skill:** `/skill marketing-website-strategy`

**Purpose**: Plan page structure, sections, and conversion flow based on customer's business type and services.

**What to Analyze:**
- `data.items['services']` - What services they offer
- `data.items['target_audience']` - Who they serve
- `data.items['pain_points']` - Customer problems
- `data.items['solutions']` - How they help
- `data.website_pages` - Pages already planned in database

**Output**: Understanding of page structure, sections needed, and conversion strategy.

---

# Phase 3: Copywriting

**Invoke Skill:** `/skill authentic-copywriting`

**Purpose**: Write authentic copy that sounds like THIS specific client, not generic template text.

**What to Use:**
- `data.items[key].full_text` - Customer's original responses in their own words
- `data.items['about_story'].full_text` - Their story in their voice
- Extract 2-3 actual phrases from their responses
- Match their tone (formal/casual), sentence length, and style

**Output**: Page copy written directly in components (or save separately if preferred).

---

# Phase 4: Build Website

**Invoke Skills:**
- `/skill frontend-design` - Create distinctive visual design
- `/skill next-shadcn-stack` - Next.js + shadcn/ui implementation
- `/skill hebrew-rtl-design` - If `data.customer_info.language === 'he'` or `'ar'`
- `/skill web-accessibility` - WCAG AA compliance

**What to Build:**
Pages based on `data.website_pages` or standard structure:
1. Homepage - Hero, services, testimonials, CTA
2. About - Story, values, credentials
3. Services - Service details, benefits
4. Contact - Form, contact info

**Assets**: Use images from `public/logos/`, `public/images/`

**Critical**:
- Use REAL content only (no placeholders)
- Create distinctive design (not template layouts)
- Check language: `const isRTL = data.customer_info.language === 'he' || data.customer_info.language === 'ar'`
- Set `dir="rtl"` in `app/layout.tsx` if RTL

---

# Phase 5: Quality Check

## 5.1 Build Test

```bash
npm run build
```

**Must compile without errors** (blocking requirement).

## 5.2 Visual Check

```bash
npm run dev
```

Take screenshots:
- Desktop (1920x1080)
- Mobile (390x844)

## 5.3 Verification Checklist

**Technical:**
- [ ] Build succeeds without errors
- [ ] No placeholder text anywhere
- [ ] All images load correctly
- [ ] RTL formatting works (if applicable)

**Design:**
- [ ] Not using generic template layout (Hero → 3 Cards → Testimonials)
- [ ] Colors feel custom (not default Tailwind palette)
- [ ] Components show visual variety
- [ ] Animations are present and purposeful

**Copy:**
- [ ] Uses customer's actual voice/phrases
- [ ] No generic phrases ("transform your life", "begin your journey")
- [ ] CTAs are specific ("Book free 20-min call" not "Learn more")

---

# Database Schema Reference

## Key Tables

**contacts** - Customer info
- `id`, `first_name`, `last_name`, `email`, `wa_id`, `language`

**onboarding_checklist_items** - Business and design data
- `item_key`: business_name, services, target_audience, etc.
- `extracted_data`: Structured JSON with `{value, confidence, source}`
- `full_text`: Customer's original response (⭐ use this for voice!)

**website_pages** - Pages to build
- `page_slug`, `page_type`, `page_purpose`, `status`, `sections`, `content`
- Only build pages with `status = 'content_ready'`

**design_elements** - Colors, fonts
- `element_type`: color, typography, style
- `element_key`: primary, secondary, heading_font, etc.
- `element_value`: The actual value

---

# Quick Reference

**SSH Tunnel:**
```bash
ssh -f -N -L 5433:localhost:5432 root@<db-host>
```

**Load Data:**
```typescript
import { loadExtendedClientData } from './lib/db'
const result = await loadExtendedClientData('CUSTOMER-UUID')
const data = result.data
```

**Download Assets:**
```typescript
import { downloadAllCustomerAssets } from './lib/db'
await downloadAllCustomerAssets(customerId, data.customer_assets, process.cwd())
```

**Check Language:**
```typescript
const isRTL = data.customer_info.language === 'he' || data.customer_info.language === 'ar'
```

**Iterate Items (Object):**
```typescript
// ✅ Correct
Object.values(data.items).forEach(item => { ... })
Object.entries(data.items).forEach(([key, item]) => { ... })

// ❌ Wrong
data.items.forEach(...) // TypeError!
```

---

# Skills Reference

Use these skills during the workflow:

- `/skill marketing-website-strategy` - Page structure & conversion patterns
- `/skill authentic-copywriting` - Write in client's voice
- `/skill frontend-design` - Distinctive visual design
- `/skill next-shadcn-stack` - Next.js implementation
- `/skill hebrew-rtl-design` - Hebrew/Arabic RTL sites
- `/skill web-accessibility` - WCAG AA compliance

---

# File Structure

```
project/
├── public/
│   ├── logos/          # Downloaded logos
│   ├── images/         # Downloaded images
│   └── documents/      # Downloaded docs
├── app/
│   ├── page.tsx        # Homepage
│   ├── about/page.tsx  # About page
│   └── ...             # Other pages
├── lib/db/
│   ├── database-loader.ts
│   ├── google-drive-loader.ts
│   └── types.ts
└── ...
```

**Note**: No `customer-data/` folder needed - work directly with loaded data in memory.

---

# Link in bio (`/links`) and short links (`/l/[code]`)

Ported from the base template (template b882579). Full behaviour: `/home/master/templates/base_website_template/CLAUDE.md`, section "Link in bio (`/links`) and short links (`/l/[code]`)". Adaptations on this site:

- `/links` lives at `app/[locale]/links/page.tsx` (this site routes through next-intl, `localePrefix: "as-needed"`, so a page outside `[locale]` would be rewritten to `/en/links` and 404). It renders without `SiteShell`: `app/[locale]/layout.tsx` already renders Header, `<main>` and Footer. `/he/links` serves the same bio page. Its test is `.test.ts` (this site's vitest only includes `*.test.ts`, node environment).
- `/l/[code]` is `app/l/[code]/route.ts` (outside `[locale]`, as in the template); `middleware.ts` returns early on `/l/` before the RETIRED / language routing. Tests: `middleware.test.ts` (mocks next-intl's middleware), `app/l/[code]/route.test.ts`.
- This site has no `lib/portal-login.ts`: `siteKeyHeaders` / `siteKeyOnlyHeaders` (template bodies) are in `lib/site-key-headers.ts`, using this site's `lib/client-ip.ts` (same rule as the template's `clientIp`). `lib/platform-env.ts`, `lib/safe-css-color.ts`, `lib/safe-href.ts` are copied unchanged.
- No `lib/builtin-routes.ts` here (no dashboard redirect lookup in the middleware), so nothing was added for it.
- `COURSES_SERVICE_KEY` is optional. This site's globals.css has no `.t-*` role classes, so `t-button`/`t-heading`/`t-body`/`t-subheading` on the page are inert; the buttons take their colour/shape from inline `--primary`/`--radius` styles.

## Coupon in a link

`?coupon=CODE` on any page is parked by `components/coupon-link-capture.tsx` (root layout, `lib/coupon-link.ts`); `components/payment-pages/payment-page-checkout.tsx` feeds it into the quote path (`setQuoteCode`) on arrival, never over the page's own coupon; cleared on a typed apply, remove, a refused/dropped quote coupon, a `coupon_refused` submit and success. Component tests (`*.coupon-link.test.tsx`, `coupon-link-capture.test.tsx`) need jsdom and @testing-library, which this site does not install: run them on another checkout's node_modules (they are excluded from tsc).
