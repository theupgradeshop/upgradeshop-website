/**
 * Pages API client for fetching editable page sections
 * from the UpgradeShop platform
 *
 * This enables the visual editor on app.upgradeshop.ai to edit
 * content on this website without code deployments.
 */

const PLATFORM_URL =
  process.env.NEXT_PUBLIC_UPGRADESHOP_API_URL ||
  process.env.NEXT_PUBLIC_PLATFORM_URL ||
  "https://app.upgradeshop.ai";
const DOMAIN = process.env.NEXT_PUBLIC_SITE_DOMAIN || "upgradeshop.ai";

export interface SectionField {
  id: string;
  fieldType:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "p"
    | "quote"
    | "ul"
    | "ol"
    | "image"
    | "button"
    | "carousel";
  fieldContent: string;
  fieldKey?: string;
  metadata?: Record<string, unknown>;
  position: number;
}

export interface PageSection {
  id: string;
  sectionKey: string;
  headingLevel: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | null;
  headingText: string | null;
  content: string;
  position: number;
  fields: SectionField[];
}

export interface PageSectionsResponse {
  found: boolean;
  preview?: boolean;
  pageTitle?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  sections: PageSection[];
}

/**
 * Fetch page sections for a specific page slug
 * Uses ISR with 60-second revalidation for optimal performance
 */
export async function fetchPageSections(
  slug: string,
  previewToken?: string
): Promise<PageSectionsResponse> {
  try {
    const url = new URL(`${PLATFORM_URL}/api/public/pages/${slug}`);
    url.searchParams.set("domain", DOMAIN);
    if (previewToken) {
      url.searchParams.set("preview", previewToken);
    }

    const response = await fetch(url.toString(), {
      ...(previewToken ? { cache: "no-store" as const } : { next: { revalidate: 60 } }),
    });

    if (!response.ok) {
      console.error("Failed to fetch page sections:", response.status);
      return {
        found: false,
        sections: [],
      };
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching page sections:", error);
    return {
      found: false,
      sections: [],
    };
  }
}

/**
 * Get a specific section by key from an array of sections
 */
export function getSection(
  sections: PageSection[],
  sectionKey: string
): PageSection | null {
  return sections.find((s) => s.sectionKey === sectionKey) || null;
}

/**
 * Strip HTML tags from content (for plain text display)
 */
function stripHtml(html: string): string {
  if (!html) return html;
  // Remove HTML tags and decode common entities
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .trim();
}

/**
 * Helper to get editable text content from a section
 * Returns plain text (HTML tags stripped) for use in text elements
 */
export function getEditableText(
  sections: PageSection[],
  sectionKey: string,
  fieldType: string,
  fallback: string,
  index: number = 0
): string {
  const section = getSection(sections, sectionKey);
  if (!section || !section.fields || section.fields.length === 0) {
    return fallback;
  }

  const fieldsOfType = section.fields.filter((f) => f.fieldType === fieldType);
  if (fieldsOfType.length > index) {
    // Use ?? instead of || so empty string is respected (not treated as falsy)
    const content = fieldsOfType[index].fieldContent ?? fallback;
    // Strip HTML tags for plain text display
    return stripHtml(content);
  }

  return fallback;
}

/**
 * Helper to get editable HTML content from a section
 * Returns raw HTML for use with dangerouslySetInnerHTML
 */
export function getEditableHtml(
  sections: PageSection[],
  sectionKey: string,
  fieldType: string,
  fallback: string,
  index: number = 0
): string {
  const section = getSection(sections, sectionKey);
  if (!section || !section.fields || section.fields.length === 0) {
    return fallback;
  }

  const fieldsOfType = section.fields.filter((f) => f.fieldType === fieldType);
  if (fieldsOfType.length > index) {
    return fieldsOfType[index].fieldContent ?? fallback;
  }

  return fallback;
}

/**
 * Helper to get rich text content (preserves HTML for rendering)
 * Falls back to the fallback string if no DB content found
 */
export function getEditableRichText(
  sections: PageSection[],
  sectionKey: string,
  fieldType: string,
  fallback: string,
  index: number = 0
): string {
  const section = getSection(sections, sectionKey);
  if (!section || !section.fields || section.fields.length === 0) {
    return fallback;
  }

  const fieldsOfType = section.fields.filter((f) => f.fieldType === fieldType);
  if (fieldsOfType.length > index) {
    return fieldsOfType[index].fieldContent ?? fallback;
  }

  return fallback;
}

/**
 * Helper to get short field ID for data attributes
 * Returns first 8 chars of UUID for minimal bloat
 */
export function getFieldId(
  sections: PageSection[],
  sectionKey: string,
  fieldType: string,
  index: number = 0
): string | null {
  const section = getSection(sections, sectionKey);
  if (!section || !section.fields || section.fields.length === 0) {
    return null;
  }

  const fieldsOfType = section.fields.filter((f) => f.fieldType === fieldType);
  if (fieldsOfType.length > index) {
    // Return first 8 chars of UUID for short hash
    return fieldsOfType[index].id.substring(0, 8);
  }

  return null;
}

/**
 * Helper to get editable image URL from a section
 */
export function getEditableImage(
  sections: PageSection[],
  sectionKey: string,
  fallback: string,
  index: number = 0
): string {
  const section = getSection(sections, sectionKey);
  if (!section || !section.fields || section.fields.length === 0) {
    return fallback;
  }

  const imageFields = section.fields.filter((f) => f.fieldType === "image");
  if (imageFields.length > index) {
    return imageFields[index].fieldContent || fallback;
  }

  return fallback;
}

/**
 * Helper to get carousel images from a section
 */
export function getCarouselImages(
  sections: PageSection[],
  sectionKey: string,
  fallback: Array<{ src: string; alt: string }> = [],
  index: number = 0
): Array<{ src: string; alt: string }> {
  const section = getSection(sections, sectionKey);
  if (!section?.fields || section.fields.length === 0) {
    return fallback;
  }

  // First try to find a carousel field
  const carouselFields = section.fields.filter(
    (f) => f.fieldType === "carousel"
  );
  if (carouselFields.length > index) {
    try {
      const data = JSON.parse(carouselFields[index].fieldContent || "[]");
      if (Array.isArray(data) && data.length > 0) {
        return data;
      }
    } catch (e) {
      console.error("Failed to parse carousel:", e);
    }
  }

  // If no carousel field, collect all image fields as carousel items
  const imageFields = section.fields.filter((f) => f.fieldType === "image");
  if (imageFields.length > 0) {
    const images = imageFields.map((field) => ({
      src: field.fieldContent,
      alt: (field.metadata?.alt as string) || "",
    }));
    return images;
  }

  return fallback;
}

/**
 * Helper to get list items from a section
 * Handles both array format and newline-separated string
 */
export function getEditableList(
  sections: PageSection[],
  sectionKey: string,
  fieldType: "ul" | "ol",
  fallback: string[],
  index: number = 0
): string[] {
  const section = getSection(sections, sectionKey);
  if (!section || !section.fields || section.fields.length === 0) {
    return fallback;
  }

  const fieldsOfType = section.fields.filter((f) => f.fieldType === fieldType);
  if (fieldsOfType.length > index) {
    const content = fieldsOfType[index].fieldContent;
    if (!content) return fallback;

    // Try to parse as JSON array first
    try {
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed)) {
        return parsed.map((item) => stripHtml(String(item)));
      }
    } catch {
      // Not JSON, treat as newline-separated string
    }

    // Split by newlines or <li> tags
    if (content.includes("<li>")) {
      const matches = content.match(/<li[^>]*>([^<]*)<\/li>/g);
      if (matches) {
        return matches.map((match) => stripHtml(match));
      }
    }

    // Split by newlines
    return content
      .split("\n")
      .map((line) => stripHtml(line))
      .filter((line) => line.length > 0);
  }

  return fallback;
}

/**
 * Helper to get button data (text + URL) from a section
 */
export function getEditableButton(
  sections: PageSection[],
  sectionKey: string,
  fallbackText: string,
  fallbackUrl: string,
  index: number = 0
): { text: string; url: string } {
  const section = getSection(sections, sectionKey);
  if (!section || !section.fields || section.fields.length === 0) {
    return { text: fallbackText, url: fallbackUrl };
  }

  const buttonFields = section.fields.filter((f) => f.fieldType === "button");
  if (buttonFields.length > index) {
    const field = buttonFields[index];
    return {
      text: stripHtml(field.fieldContent) || fallbackText,
      url: (field.metadata?.url as string) || fallbackUrl,
    };
  }

  return { text: fallbackText, url: fallbackUrl };
}
