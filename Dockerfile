# Next.js Multi-Stage Docker Build
# For The Upgrade Shop main brand website

FROM node:22-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat git
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Disable telemetry during build
ENV NEXT_TELEMETRY_DISABLED=1

# Build application
# Build-time configuration.
#
# The build inlines exactly these four NEXT_PUBLIC_* values. Everything else this
# site reads - DB_HOST/PORT/NAME/USER/PASSWORD, DATABASE_URL, UPLOAD_API_KEY,
# REVALIDATE_SECRET, AWS_*, GOOGLE_OAUTH_* - is read at RUNTIME and arrives via
# `env_file:` at container start.
#
# The build does NOT query the database, which is why no credential is needed
# here. Verified: the only generateStaticParams (app/[locale]/products/[slug])
# returns getAllProductSlugs(), a static list from lib/product-content; the
# [locale] segment has no generateStaticParams, so no locale route is
# prerendered at all and every page body renders on demand.
#
# NEVER add a secret as a build arg: an arg promoted to ENV is stored in the
# image config, which is the defect this change removes. In particular the
# operations-DB password must not appear here - removing the baking does not
# remove this site's direct DB dependency (BOARD 23), it only stops shipping
# the credential inside the image.
#
# Every arg compose passes MUST have an ARG here or it is dropped SILENTLY.
ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_SITE_DOMAIN
ARG NEXT_PUBLIC_UPGRADESHOP_API_URL
ARG NEXT_PUBLIC_PLATFORM_URL
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_SITE_DOMAIN=$NEXT_PUBLIC_SITE_DOMAIN
ENV NEXT_PUBLIC_UPGRADESHOP_API_URL=$NEXT_PUBLIC_UPGRADESHOP_API_URL
ENV NEXT_PUBLIC_PLATFORM_URL=$NEXT_PUBLIC_PLATFORM_URL

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app
RUN apk upgrade --no-cache

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy public assets
COPY --from=builder /app/public ./public

# Create upload directories and fix all permissions
RUN mkdir -p ./public/images/uploads ./public/images/thumbnails
RUN chown -R nextjs:nodejs ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Copy build output - standalone mode
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
