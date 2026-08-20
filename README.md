# Website Builder Template

Build beautiful, unique marketing websites for clients using Claude Code + database-driven workflow.

---

## How It Works

1. **You provide a customer UUID** (from the Max database)
2. **Claude Code fetches all data** from the database (services, about, testimonials, assets, etc.)
3. **Claude Code builds the website** using skills and self-review checklists
4. **You review and iterate**

---

## Quick Start (For Each New Client)

### 1. Start SSH Tunnel (Required for Database Access)

```bash
ssh -f -N -L 5433:localhost:5432 root@<db-host>
```

See [docs/ssh-tunnel-setup.md](docs/ssh-tunnel-setup.md) for troubleshooting.

### 2. Copy This Template

```bash
cp -r agents_and_skills client-name-website
cd client-name-website
```

### 3. Open in Claude Code and Build

Open the project in VS Code with Claude Code, then:

```
Build a website for customer [CUSTOMER-UUID].
Fetch their data from the database.
```

Claude Code will:
- Query the database for all client data
- Download assets (logo, images) from Google Drive
- Generate unique design and authentic copy
- Build the Next.js website
- Run quality checks
- Deliver a production-ready site

---

## Finding Customer UUIDs

Query the database to find customers:

```sql
-- List recent customers
SELECT id, first_name, last_name, email, website_status
FROM contacts
ORDER BY created_at DESC
LIMIT 20;

-- Search by name
SELECT id, first_name, last_name, email
FROM contacts
WHERE first_name ILIKE '%ofir%' OR last_name ILIKE '%ofir%';
```

---

## Skills (Pre-installed)

Skills are already installed at `~/.claude/skills/`:

| Skill | Purpose |
|-------|---------|
| `next-shadcn-stack` | Next.js + shadcn/ui best practices |
| `marketing-website-strategy` | Conversion-focused design patterns |
| `unique-design-principles` | **NEW** - Avoid template look |
| `authentic-copywriting` | **NEW** - Avoid generic copy |
| `hebrew-rtl-design` | Hebrew RTL layout, fonts, navigation |
| `web-accessibility` | WCAG 2.1 AA compliance |

Invoke a skill: `/skill unique-design-principles`

---

## Database Access

### SSH Tunnel (Required)

```bash
ssh -f -N -L 5433:localhost:5432 root@<db-host>
```

### Using the Node.js Loader

Claude Code uses `.agent/loaders/database-loader.ts` to fetch data:

```typescript
import { loadExtendedClientData } from './.agent/loaders/database-loader.js'

const result = await loadExtendedClientData('customer-uuid')

if (result.success) {
  const data = result.data
  // data.customer_info - Customer details
  // data.items - Onboarding checklist items (services, about, testimonials)
  // data.website_pages - Pages with content ready to build
  // data.design_elements - Colors, fonts, brand elements
  // data.customer_assets - Logos, images from Google Drive
}
```

See [docs/database-access.md](docs/database-access.md) for complete reference.

### Database Connection Details

- **Host:** localhost (via SSH tunnel)
- **Port:** 5433
- **Database:** max
- **User:** upgradeu_ops
- **Password:** set via `DB_PASSWORD` env var

### Key Tables

| Table | Data |
|-------|------|
| `contacts` | Customer info (name, email, phone) |
| `onboarding_checklist_items` | Services, about, testimonials, etc. |
| `website_pages` | Pages with content ready to build |
| `design_elements` | Brand colors, fonts |
| `customer_subscriptions` | Plan tier (starter, professional) |

See [client-data-collection-spec.md](client-data-collection-spec.md) for complete schema.

---

## Google Drive Assets

### Using the Node.js Loader

Claude Code uses `.agent/loaders/google-drive-loader.ts` to download files:

```typescript
import { downloadAllCustomerAssets } from './.agent/loaders/google-drive-loader.js'

// OAuth tokens stored in database (customer_oauth_tokens table)
const downloadResult = await downloadAllCustomerAssets(
  customerId,
  data.customer_assets,
  projectRoot
)

// Files downloaded to: public/assets/{customerId}/
// - logos/
// - images/
// - documents/
```

See [docs/google-drive-access.md](docs/google-drive-access.md) for details.

---

## Project Structure

```
├── .agent/                      # Website builder agent
│   ├── loaders/
│   │   ├── database-loader.ts   # PostgreSQL data loader
│   │   └── google-drive-loader.ts  # Google Drive file downloader
│   └── types/
│       └── client-data.ts       # Database schema types
│
├── docs/                        # Quick reference documentation
│   ├── database-access.md       # How to use database loader
│   ├── google-drive-access.md   # How to download Google Drive files
│   └── ssh-tunnel-setup.md      # SSH tunnel setup
│
├── app/                         # Next.js App Router
├── components/                  # React components
│   └── ui/                      # shadcn/ui (pre-installed)
├── CLAUDE.md                    # Project instructions for Claude Code
└── package.json
```

---

## Tech Stack

- **Next.js 14+** (App Router)
- **Tailwind CSS**
- **shadcn/ui** components
- **Framer Motion** animations
- **Lucide React** icons

---

## Quality Standards

Claude Code follows a **6-phase workflow** with built-in quality checks:

### Technical (Required - Blocking)
- Build compiles without errors
- No placeholder text
- Lighthouse scores > 90
- WCAG AA compliant

### Copy Quality (Target ≥70% - Warning)
- Sounds like THIS client (not generic)
- Zero generic phrases ("Transform your life", etc.)
- Zero AI patterns ("Whether you're", "In today's world")
- Client's actual words incorporated
- Specific CTAs

### Design Quality (Target ≥65% - Warning)
- Not using template patterns
- Custom colors (not default Tailwind)
- Visual variety in components
- Purposeful animations

See [CLAUDE.md](CLAUDE.md) for complete workflow and quality gates.

---

## Troubleshooting

### Database Connection Failed
```
Is SSH tunnel running?
```
Start it: `ssh -f -N -L 5433:localhost:5432 root@<db-host>`

Check: [docs/ssh-tunnel-setup.md](docs/ssh-tunnel-setup.md)

### Customer Not Found
Check the customer UUID is correct:
```sql
SELECT * FROM contacts WHERE id = 'your-uuid';
```

### No Pages Ready
Pages need `status = 'content_ready'` in the database. Check:
```sql
SELECT page_slug, status FROM website_pages WHERE customer_id = 'uuid';
```

### Google Drive Access Denied
Customer needs to grant OAuth access via Max by sharing files.

---

## Documentation

- **[CLAUDE.md](CLAUDE.md)** - Complete 6-phase workflow for Claude Code
- **[docs/database-access.md](docs/database-access.md)** - Database loader usage
- **[docs/google-drive-access.md](docs/google-drive-access.md)** - Google Drive file downloads
- **[docs/ssh-tunnel-setup.md](docs/ssh-tunnel-setup.md)** - SSH tunnel setup
- **[client-data-collection-spec.md](client-data-collection-spec.md)** - Complete database schema

---

## Skills Reference

- **Skills location:** `~/.claude/skills/`
- **Invoke in Claude Code:** `/skill next-shadcn-stack`
- **New skills:**
  - `unique-design-principles` - Avoid template designs
  - `authentic-copywriting` - Avoid generic copy
