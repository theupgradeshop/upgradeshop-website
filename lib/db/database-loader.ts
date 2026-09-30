/**
 * Database Loader for Customer Data
 *
 * Loads client data directly from PostgreSQL via SSH tunnel.
 *
 * Database connection via SSH tunnel:
 * ssh -f -N -L 5433:localhost:5432 root@37.27.216.44
 */

import pg from 'pg'
import {
  MaxClientData,
  ExtendedClientData,
  DataItem,
  ItemKey,
  CustomerInfo,
  ConversationMessage,
  SubscriptionPlan,
  WebsitePage,
  DesignElement,
  UploadedFile,
  WebsiteVersion,
  CustomerSubscription,
  ChecklistFileItem,
  CustomerDocument,
  CustomerAssets,
  REQUIRED_ITEMS,
} from './types'

const { Pool } = pg

// =============================================================================
// Database Configuration
// =============================================================================

const DB_CONFIG = {
  host: 'localhost',
  port: 5433, // SSH tunnel port
  database: 'max',
  user: 'upgradeu_ops',
  password: process.env.DB_PASSWORD || '',
}

// =============================================================================
// Types
// =============================================================================

export interface LoaderResult {
  success: boolean
  mode: 'database' | 'file'
  data: MaxClientData | null
  warnings: string[]
  errors: string[]
  missingRequired: ItemKey[]
}

export interface ExtendedLoaderResult {
  success: boolean
  mode: 'database' | 'file'
  data: ExtendedClientData | null
  warnings: string[]
  errors: string[]
  missingRequired: ItemKey[]
  subscriptionTier?: string
  websiteStatus?: string
  pagesReadyCount?: number
  totalPagesCount?: number
}

// =============================================================================
// Database Queries
// =============================================================================

const QUERIES = {
  customer: `
    SELECT id, first_name, last_name, email, wa_id, language, created_at,
           onboarding_status, website_status, domain_name
    FROM contacts
    WHERE id = $1
  `,

  checklistItems: `
    SELECT
      item_key,
      item_label,
      status,
      extracted_data,
      full_text,
      is_required,
      priority
    FROM onboarding_checklist_items
    WHERE customer_id = $1
    ORDER BY priority, item_key
  `,

  messages: `
    SELECT m.content, m.direction as role, m.timestamp
    FROM messages m
    JOIN conversations c ON m.conversation_id = c.id
    WHERE c.wa_id = $1
    ORDER BY m.timestamp ASC
  `,

  onboardingProgress: `
    SELECT current_stage, completion_percentage, updated_at
    FROM onboarding_progress
    WHERE customer_id = $1
    ORDER BY updated_at DESC
    LIMIT 1
  `,

  websitePages: `
    SELECT id, customer_id, page_slug, page_title, page_type, page_purpose,
           target_audience, key_messages, status, display_order, show_in_nav,
           is_policy_page, sections, content, meta_title, meta_description,
           build_notes, created_at, updated_at
    FROM website_pages
    WHERE customer_id = $1
    ORDER BY display_order
  `,

  designElements: `
    SELECT id, customer_id, website_version_id, element_type, element_key,
           element_value, source, display_label, description, created_at
    FROM design_elements
    WHERE customer_id = $1
  `,

  uploadedFiles: `
    SELECT id, customer_id, file_type, original_filename, stored_filename,
           storage_path, file_size_bytes, mime_type, uploaded_via, purpose,
           processing_status, processing_error, metadata, created_at
    FROM uploaded_files
    WHERE customer_id = $1
  `,

  websiteVersions: `
    SELECT id, customer_id, version_number, status, preview_url, live_url,
           google_doc_url, design_notes, feedback, generation_metadata,
           content_locked, html_stored_path, css_stored_path, js_stored_path,
           assets_folder_path, created_at, deployed_at
    FROM website_versions
    WHERE customer_id = $1
    ORDER BY version_number DESC
  `,

  customerSubscriptions: `
    SELECT cs.*, pr.product_key, pp.plan_key, pp.max_pages, pp.monthly_changes
    FROM customer_subscriptions cs
    JOIN products pr ON cs.product_id = pr.id
    JOIN product_plans pp ON cs.plan_id = pp.id
    WHERE cs.customer_id = $1 AND cs.status IN ('active', 'trial')
    ORDER BY cs.is_addon ASC, cs.created_at ASC
  `,

  primaryProduct: `
    SELECT
      pr.id, pr.product_key, pr.product_name, pr.description,
      pr.can_be_addon, pr.is_active, pr.display_order,
      pp.id as plan_id, pp.plan_key, pp.plan_name,
      pp.max_pages, pp.monthly_changes, pp.includes_policy_pages,
      pp.monthly_content_pages, pp.monthly_blog_posts, pp.features, pp.limits
    FROM customer_subscriptions cs
    JOIN products pr ON cs.product_id = pr.id
    JOIN product_plans pp ON cs.plan_id = pp.id
    WHERE cs.customer_id = $1
      AND cs.status IN ('active', 'trial')
      AND pr.product_key IN ('website', 'landing_page')
      AND cs.is_addon = false
    ORDER BY cs.created_at ASC
    LIMIT 1
  `,

  checklistFileItems: `
    SELECT id, customer_id, item_key, item_label, status, content_data,
           created_at, last_updated as updated_at
    FROM onboarding_checklist_items
    WHERE customer_id = $1
      AND item_key IN ('logo', 'content_images', 'business_photos')
      AND content_data IS NOT NULL
      AND content_data->'files' IS NOT NULL
  `,

  customerDocuments: `
    SELECT id, customer_id, document_url, document_type, title, status,
           items_extracted, google_file_id, mime_type, shared_at,
           processed_at, notes, message_content, created_at, updated_at
    FROM customer_documents
    WHERE customer_id = $1
    ORDER BY created_at DESC
  `,

  hasOAuthAccess: `
    SELECT id, scopes, expires_at
    FROM customer_oauth_tokens
    WHERE customer_id = $1
      AND refresh_token IS NOT NULL
    LIMIT 1
  `,
}

// =============================================================================
// Helper Functions
// =============================================================================

function detectLanguageFromItems(items: Record<ItemKey, DataItem>): string {
  for (const item of Object.values(items)) {
    if (item.full_text) {
      const hasHebrew = /[\u0590-\u05FF]/.test(item.full_text)
      const hasArabic = /[\u0600-\u06FF]/.test(item.full_text)
      if (hasHebrew) return 'he'
      if (hasArabic) return 'ar'
    }
  }
  return 'en'
}

// =============================================================================
// Main Loader Function
// =============================================================================

/**
 * Load extended client data including website pages, design elements, etc.
 * This is the primary loader for the website builder workflow.
 */
export async function loadExtendedClientData(
  customerId: string
): Promise<ExtendedLoaderResult> {
  const result: ExtendedLoaderResult = {
    success: false,
    mode: 'database',
    data: null,
    warnings: [],
    errors: [],
    missingRequired: [],
  }

  const pool = new Pool(DB_CONFIG)

  try {
    // Get customer info
    const customerResult = await pool.query(QUERIES.customer, [customerId])
    const customerRow = customerResult.rows[0]

    if (!customerRow) {
      result.errors.push(`Customer not found: ${customerId}`)
      await pool.end()
      return result
    }

    result.websiteStatus = customerRow.website_status as string

    // Build customer object
    const customer: CustomerInfo = {
      id: customerRow.id,
      name: `${customerRow.first_name || ''} ${customerRow.last_name || ''}`.trim() || 'Unknown',
      email: customerRow.email,
      phone: customerRow.wa_id,
      language: customerRow.language,
      created_at: customerRow.created_at,
    }

    // Get customer subscriptions
    const subsResult = await pool.query(QUERIES.customerSubscriptions, [customerId])
    const customer_subscriptions: CustomerSubscription[] = subsResult.rows as CustomerSubscription[]

    // Get primary product
    const productResult = await pool.query(QUERIES.primaryProduct, [customerId])
    const primary_product = productResult.rows[0]

    const subscriptionTier = primary_product?.plan_key
    result.subscriptionTier = subscriptionTier

    // Legacy subscription plan
    let subscriptionPlan: SubscriptionPlan | undefined
    if (subscriptionTier && primary_product) {
      subscriptionPlan = {
        plan_key: primary_product.plan_key,
        plan_name: primary_product.plan_name,
        max_pages: primary_product.max_pages || 1,
        includes_policy_pages: primary_product.includes_policy_pages || false,
        monthly_content_pages: primary_product.monthly_content_pages || 0,
        monthly_blog_posts: primary_product.monthly_blog_posts || 0,
        features: primary_product.features || {},
      }
    }

    // Get checklist items
    const itemsResult = await pool.query(QUERIES.checklistItems, [customerId])
    const items: Record<ItemKey, DataItem> = {} as Record<ItemKey, DataItem>

    for (const row of itemsResult.rows) {
      const itemKey = row.item_key as ItemKey
      items[itemKey] = {
        item_key: itemKey,
        item_label: row.item_label as string,
        status: row.status as DataItem['status'],
        extracted_data: row.extracted_data as DataItem['extracted_data'],
        full_text: row.full_text as string | null,
        is_required: row.is_required as boolean,
        priority: row.priority as DataItem['priority'],
      }
    }

    // Get messages
    const messagesResult = await pool.query(QUERIES.messages, [customer.phone])
    const messages: ConversationMessage[] = messagesResult.rows.map(row => ({
      content: row.content as string,
      role: row.role === 'incoming' ? 'user' : 'assistant' as 'user' | 'assistant',
      timestamp: row.timestamp as string,
    }))

    // Get website pages
    const pagesResult = await pool.query(QUERIES.websitePages, [customerId])
    const websitePages: WebsitePage[] = pagesResult.rows.map(row => ({
      id: row.id,
      customer_id: row.customer_id,
      page_slug: row.page_slug,
      page_title: row.page_title,
      page_type: row.page_type,
      page_purpose: row.page_purpose,
      target_audience: row.target_audience,
      key_messages: row.key_messages,
      status: row.status,
      display_order: row.display_order,
      show_in_nav: row.show_in_nav,
      is_policy_page: row.is_policy_page,
      sections: row.sections,
      content: row.content,
      meta_title: row.meta_title,
      meta_description: row.meta_description,
      build_notes: row.build_notes,
      created_at: row.created_at,
      updated_at: row.updated_at,
    }))

    result.totalPagesCount = websitePages.length
    result.pagesReadyCount = websitePages.filter(p => p.status === 'content_ready').length

    // Get design elements
    const designResult = await pool.query(QUERIES.designElements, [customerId])
    const designElements: DesignElement[] = designResult.rows.map(row => ({
      id: row.id,
      customer_id: row.customer_id,
      website_version_id: row.website_version_id,
      element_type: row.element_type,
      element_key: row.element_key,
      element_value: row.element_value,
      source: row.source,
      display_label: row.display_label,
      description: row.description,
      created_at: row.created_at,
    }))

    // Get uploaded files
    const filesResult = await pool.query(QUERIES.uploadedFiles, [customerId])
    const uploadedFiles: UploadedFile[] = filesResult.rows.map(row => ({
      id: row.id,
      customer_id: row.customer_id,
      file_type: row.file_type,
      original_filename: row.original_filename,
      stored_filename: row.stored_filename,
      storage_path: row.storage_path,
      file_size_bytes: row.file_size_bytes,
      mime_type: row.mime_type,
      uploaded_via: row.uploaded_via,
      purpose: row.purpose,
      processing_status: row.processing_status,
      processing_error: row.processing_error,
      metadata: row.metadata,
      created_at: row.created_at,
    }))

    // Get website versions
    const versionsResult = await pool.query(QUERIES.websiteVersions, [customerId])
    const websiteVersions: WebsiteVersion[] = versionsResult.rows.map(row => ({
      id: row.id,
      customer_id: row.customer_id,
      version_number: row.version_number,
      status: row.status,
      preview_url: row.preview_url,
      live_url: row.live_url,
      google_doc_url: row.google_doc_url,
      design_notes: row.design_notes,
      feedback: row.feedback,
      generation_metadata: row.generation_metadata,
      content_locked: row.content_locked,
      html_stored_path: row.html_stored_path,
      css_stored_path: row.css_stored_path,
      js_stored_path: row.js_stored_path,
      assets_folder_path: row.assets_folder_path,
      created_at: row.created_at,
      deployed_at: row.deployed_at,
    }))

    // Get checklist file items (logos, images, photos)
    const fileItemsResult = await pool.query(QUERIES.checklistFileItems, [customerId])
    const checklist_files: ChecklistFileItem[] = fileItemsResult.rows.map(row => ({
      id: row.id,
      customer_id: row.customer_id,
      item_key: row.item_key as 'logo' | 'content_images' | 'business_photos',
      item_label: row.item_label,
      status: row.status,
      content_data: row.content_data || { files: [] },
      created_at: row.created_at,
      updated_at: row.updated_at,
    }))

    // Get customer documents
    const docsResult = await pool.query(QUERIES.customerDocuments, [customerId])
    const customer_documents: CustomerDocument[] = docsResult.rows.map(row => ({
      id: row.id,
      customer_id: row.customer_id,
      document_url: row.document_url,
      document_type: row.document_type,
      title: row.title,
      status: row.status,
      items_extracted: row.items_extracted,
      google_file_id: row.google_file_id,
      mime_type: row.mime_type,
      shared_at: row.shared_at,
      processed_at: row.processed_at,
      notes: row.notes,
      message_content: row.message_content,
      created_at: row.created_at,
      updated_at: row.updated_at,
    }))

    // Check OAuth access
    const oauthResult = await pool.query(QUERIES.hasOAuthAccess, [customerId])
    const hasOAuthAccess = oauthResult.rows.length > 0 &&
      oauthResult.rows[0].scopes?.some((s: string) => s.includes('drive'))

    // Build customer assets summary
    const customer_assets: CustomerAssets = {
      logos: [],
      images: [],
      businessPhotos: [],
      documents: customer_documents,
      hasOAuthAccess,
    }

    // Extract files from checklist items
    for (const item of checklist_files) {
      const files = item.content_data?.files || []
      switch (item.item_key) {
        case 'logo':
          customer_assets.logos = files
          break
        case 'content_images':
          customer_assets.images = files
          break
        case 'business_photos':
          customer_assets.businessPhotos = files
          break
      }
    }

    // Get onboarding progress
    const progressResult = await pool.query(QUERIES.onboardingProgress, [customerId])
    const progress = progressResult.rows[0]

    // Check for missing required items
    for (const key of REQUIRED_ITEMS) {
      const item = items[key]
      if (!item || item.status !== 'completed') {
        result.missingRequired.push(key)
        if (!item || item.status === 'not_started') {
          result.warnings.push(`Required item missing: ${key}`)
        } else if (item.status === 'skipped') {
          result.warnings.push(`Required item skipped by client: ${key}`)
        }
      }
    }

    // Build ExtendedClientData
    result.data = {
      customer_id: customerId,
      customer_info: customer,
      items,
      messages,
      metadata: {
        language: customer.language || detectLanguageFromItems(items),
        completion_percentage: (progress?.completion_percentage as number) || 0,
        onboarding_stage: progress?.current_stage as string,
        customer_name: customer.name,
      },
      subscription_plan: subscriptionPlan,
      website_pages: websitePages,
      design_elements: designElements,
      uploaded_files: uploadedFiles,
      website_versions: websiteVersions,
      customer_subscriptions,
      primary_product,
      product_plan: primary_product,
      checklist_files,
      customer_documents,
      customer_assets,
    }

    result.success = true
    await pool.end()
    return result
  } catch (error) {
    result.errors.push(`Database error: ${error}`)
    await pool.end()
    return result
  }
}

/**
 * Test database connection
 */
export async function testConnection(): Promise<{ success: boolean; error?: string }> {
  const pool = new Pool(DB_CONFIG)
  try {
    await pool.query('SELECT 1')
    await pool.end()
    return { success: true }
  } catch (error) {
    await pool.end()
    return { success: false, error: String(error) }
  }
}

// Export types
export type { ExtendedClientData, CustomerInfo, WebsitePage, DesignElement, CustomerAssets }
