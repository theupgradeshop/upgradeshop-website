/**
 * The survey form's stored definition. The questions are never written in this site: they come from the
 * `form_config` field of the dashboard page `survey` (a Forms-module form, same JSON the page editor and the
 * Forms tab edit), read through the public pages API like every other editable page content.
 */
import { fetchPageSections } from "@/lib/pages-api";

export const SURVEY_PAGE_SLUG = "survey";
/** The only form the /api/form-submit proxy forwards (Forms-module formId of "Help us set our prices"). */
export const SURVEY_FORM_ID = "7f03813f-fc06-4b4b-bc34-595c45933a06";

export interface SurveyFormField {
  key: string;
  type: string;
  label: string;
  placeholder?: string;
  helpText?: string;
  required?: boolean;
  enabled?: boolean;
  options?: string[];
  min?: number;
  max?: number;
  defaultValue?: string;
}

export interface SurveyFormConfig {
  formId?: string;
  fields: SurveyFormField[];
  submitButtonText?: string;
  successMessage?: string;
  errorMessage?: string;
}

/** A stored form_config (JSON string, possibly double-encoded, or object) as a config; null when it has no questions. */
export function parseSurveyFormConfig(raw: unknown): SurveyFormConfig | null {
  let value: unknown = raw;
  for (let i = 0; i < 2 && typeof value === "string"; i++) {
    try {
      value = JSON.parse(value);
    } catch {
      return null;
    }
  }
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const obj = value as Record<string, unknown>;
  if (!Array.isArray(obj.fields)) return null;
  const fields = obj.fields.filter(
    (f): f is SurveyFormField =>
      !!f && typeof f === "object" && typeof (f as SurveyFormField).key === "string" && (f as SurveyFormField).enabled !== false,
  );
  if (fields.length === 0) return null;
  return { ...(obj as Partial<SurveyFormConfig>), fields };
}

/** The survey page's form_config, or null when the page / section / field is not there. */
export async function fetchSurveyFormConfig(): Promise<SurveyFormConfig | null> {
  const page = await fetchPageSections(SURVEY_PAGE_SLUG);
  for (const section of page.sections ?? []) {
    const field = section.fields?.find((f) => (f.fieldType as string) === "form_config");
    if (field) return parseSurveyFormConfig(field.fieldContent);
  }
  return null;
}
