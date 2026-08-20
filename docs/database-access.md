# Database Access Guide

Quick reference for accessing the Max PostgreSQL database using the Node.js loader.

---

## Prerequisites

1. **SSH Tunnel must be running** (see [ssh-tunnel-setup.md](ssh-tunnel-setup.md))
2. Node.js project with dependencies installed

---

## Import the Loader

```typescript
import { loadExtendedClientData } from './lib/db/database-loader.js'
// Or: import { loadExtendedClientData } from './lib/db'
```

---

## Load Customer Data

```typescript
// Load all customer data (onboarding + website data)
const result = await loadExtendedClientData(customerId)

if (!result.success) {
  console.error('Failed to load data:', result.errors)
  process.exit(1)
}

const data = result.data  // ExtendedClientData
```

---

## What Data is Returned

The `loadExtendedClientData()` function returns:

```typescript
interface ExtendedClientData {
  customer_id: string

  // Basic customer info
  customer_info: {
    id: string
    name: string
    email: string
    phone: string
    language: 'he' | 'en' | 'ar'
    created_at: string
  }

  // Onboarding checklist items (services, about, testimonials, etc.)
  items: Record<ItemKey, DataItem>

  // Conversation history with Max
  messages: ConversationMessage[]

  // Metadata
  metadata: {
    language: string
    completion_percentage: number
    onboarding_stage: string
    customer_name: string
  }

  // Website pages defined in Max
  website_pages: WebsitePage[]

  // Design elements (colors, fonts)
  design_elements: DesignElement[]

  // Uploaded files
  uploaded_files: UploadedFile[]

  // Website versions (previous builds)
  website_versions: WebsiteVersion[]

  // Subscription & product info
  customer_subscriptions: CustomerSubscription[]
  primary_product: Product & ProductPlan

  // Google Drive assets (logos, images, documents)
  customer_assets: {
    logos: DriveFile[]
    images: DriveFile[]
    businessPhotos: DriveFile[]
    documents: CustomerDocument[]
    hasOAuthAccess: boolean
  }

  // Checklist items with Google Drive files
  checklist_files: ChecklistFileItem[]
  customer_documents: CustomerDocument[]
}
```

---

## ⚠️ IMPORTANT: `items` is an Object, NOT an Array

The `items` field is a `Record<ItemKey, DataItem>` (object), not an array. Attempting to use array methods will cause errors.

### ✅ Correct Ways to Iterate

```typescript
// Iterate over all items
Object.values(data.items).forEach(item => {
  console.log(item.item_key, item.full_text)
})

// Get keys and values
Object.entries(data.items).forEach(([key, item]) => {
  console.log(key, item.extracted_data?.value)
})

// Check if item exists
if ('business_name' in data.items) {
  console.log('Has business name')
}

// Access specific item
const businessName = data.items['business_name']?.extracted_data?.value
const services = data.items.services?.full_text
```

### ❌ Wrong - Will Cause Errors

```typescript
// TypeError: data.items.forEach is not a function
data.items.forEach(item => { ... })

// TypeError: data.items.map is not a function
const names = data.items.map(item => item.item_key)

// TypeError: data.items.filter is not a function
const required = data.items.filter(item => item.is_required)
```

**Why?** `items` is a key-value map (object), not an array. Use `Object.values()`, `Object.entries()`, or `Object.keys()` to convert it before iterating.

---

## Common Access Patterns

### Get Customer Name
```typescript
const customerName = data.customer_info.name
```

### Get Services
```typescript
const services = data.items.services?.extracted_data?.value
// Returns: string[] or null
```

### Get About/Story
```typescript
const about = data.items.about_story?.full_text
// Returns: string or null
```

### Get Testimonials
```typescript
const testimonials = data.items.testimonials?.extracted_data?.value
// Returns: Testimonial[] or null
```

### Get Inspiration Sites
```typescript
const inspirationSites = data.items.inspiration_sites?.extracted_data?.value
// Returns: string[] (URLs)
```

### Get Brand Colors
```typescript
const colors = data.design_elements.filter(el => el.element_type === 'color')
```

### Get Pages Ready to Build
```typescript
const readyPages = data.website_pages.filter(p => p.status === 'content_ready')
```

### Check Google Drive Access
```typescript
if (data.customer_assets.hasOAuthAccess) {
  // Can download files from Google Drive
  const logos = data.customer_assets.logos
  const images = data.customer_assets.images
}
```

---

## Item Keys Reference

All onboarding checklist items (`data.items`) use these keys:

### Required Items (Part 1: Business Info)
- `business_name` - Business name and type
- `services` - Services offered (string[])
- `target_audience` - Who their ideal customers are
- `pain_points` - Problems their clients face
- `solutions` - How they solve those problems
- `about_story` - Background, story, credentials

### Required Items (Part 2: Design)
- `inspiration_sites` - Website examples they like (string[])
- `mood_feeling` - Overall emotional tone (string)
- `color_preferences` - Colors they like/avoid
- `brand_colors` - Existing brand colors (if any)

### Optional Items
- `unique_value` - What makes them different
- `success_stories` - Case studies, results
- `testimonials` - Client reviews
- `professional_image` - Formal vs casual style
- `photo_style` - Natural, professional, illustrated
- `aesthetic` - Minimal vs detailed
- `icon_style` - Icon preferences

---

## Checking Data Completeness

```typescript
// Check for missing required items
if (result.missingRequired.length > 0) {
  console.warn('Missing required items:', result.missingRequired)
}

// Check completion percentage
console.log(`Onboarding: ${data.metadata.completion_percentage}% complete`)

// Check page readiness
const readyCount = data.website_pages.filter(p => p.status === 'content_ready').length
const totalCount = data.website_pages.length
console.log(`Pages ready: ${readyCount}/${totalCount}`)
```

---

## Error Handling

```typescript
try {
  const result = await loadExtendedClientData(customerId)

  if (!result.success) {
    // Handle errors
    console.error('Errors:', result.errors)

    // Check warnings (non-critical issues)
    if (result.warnings.length > 0) {
      console.warn('Warnings:', result.warnings)
    }

    return
  }

  // Use data
  const data = result.data

} catch (error) {
  console.error('Database connection failed:', error)
  console.log('Make sure SSH tunnel is running:')
  console.log('ssh -f -N -L 5433:localhost:5432 root@<db-host>')
}
```

---

## Troubleshooting

### "Connection refused" or "ECONNREFUSED"
- SSH tunnel is not running
- Run: `ssh -f -N -L 5433:localhost:5432 root@<db-host>`

### "Customer not found"
- Check the customer ID (UUID) is correct
- Query database directly to verify: `SELECT * FROM contacts WHERE id = 'uuid'`

### "No pages ready to build"
- Pages need `status = 'content_ready'` in the database
- Check: `SELECT page_slug, status FROM website_pages WHERE customer_id = 'uuid'`

---

## Advanced: Direct SQL Queries

If you need to query the database directly:

```typescript
import pg from 'pg'
const { Pool } = pg

const pool = new Pool({
  host: 'localhost',
  port: 5433,
  database: 'max',
  user: 'upgradeu_ops',
  password: process.env.DB_PASSWORD,
})

// Example: Get customer by ID
const result = await pool.query(
  'SELECT * FROM contacts WHERE id = $1',
  [customerId]
)

await pool.end()
```

See [client-data-collection-spec.md](../client-data-collection-spec.md) for complete database schema.

---

## See Also

- [google-drive-access.md](google-drive-access.md) - Download Google Drive assets
- [ssh-tunnel-setup.md](ssh-tunnel-setup.md) - SSH tunnel configuration
- [client-data-collection-spec.md](../client-data-collection-spec.md) - Full database schema
