import { NextResponse } from "next/server";
import { siteKeyHeaders } from "@/lib/site-key-headers";
import { clientIp } from "@/lib/client-ip";
import { createIpRateLimiter } from "@/lib/ip-rate-limit";
import { fetchSurveyFormConfig, SURVEY_FORM_ID } from "@/lib/survey-form";

/**
 * Forms-module form proxy. Forwards a submission to the dashboard (POST /api/forms/submissions) with the form's
 * `config_id`. The dashboard resolves the tenant from the Origin header and applies the stored form's tags, lists and
 * CRM mapping itself; nothing of that is taken from the browser.
 * Env: COURSES_SERVICE_KEY (site key, already set for the waitlist), SITE_DOMAIN / NEXT_PUBLIC_SITE_URL, platform URL.
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LANGUAGES = ["en", "he"];
const MAX_VALUE_LENGTH = 2000;
const MAX_EMAIL_LENGTH = 254;
const MAX_SUBMISSION_AGE_MS = 24 * 60 * 60 * 1000;
// A visitor's clock may run a little ahead of the server's.
const MAX_CLOCK_SKEW_MS = 5 * 60 * 1000;
const isRateLimited = createIpRateLimiter(10 * 60 * 1000, 5);

const PLATFORM_URL =
  process.env.UPGRADESHOP_API_URL ||
  process.env.NEXT_PUBLIC_UPGRADESHOP_API_URL ||
  process.env.NEXT_PUBLIC_PLATFORM_URL ||
  "https://app.upgradeshop.ai";

function siteOrigin(): string {
  const explicit = process.env.SITE_DOMAIN?.trim();
  if (explicit) return `https://${explicit}`;
  return process.env.NEXT_PUBLIC_SITE_URL || "https://upgradeshop.ai";
}

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return !!v && typeof v === "object" && !Array.isArray(v);
}

export async function POST(request: Request) {
  try {
    if (isRateLimited(clientIp(request))) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const body = await request.json();
    const { config_id, honeypot_field, submission_time, language } = body ?? {};
    // Only the survey form is forwarded; the proxy never adds the site key to another config_id.
    if (config_id !== SURVEY_FORM_ID || !isPlainObject(body.form_data)) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    const config = await fetchSurveyFormConfig();
    if (!config || config.formId !== SURVEY_FORM_ID) {
      return NextResponse.json({ error: "Form unavailable" }, { status: 503 });
    }
    // Keep only the configured questions, with capped values.
    const allowedKeys = new Set(config.fields.map((f) => f.key));
    const formData: Record<string, string> = {};
    for (const [k, v] of Object.entries(body.form_data)) {
      if (!allowedKeys.has(k) || typeof v !== "string" || v === "") continue;
      formData[k] = v.slice(0, k === "email" ? MAX_EMAIL_LENGTH : MAX_VALUE_LENGTH);
    }
    const email = formData.email ?? "";
    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    // Bot protection: silent success, bots must not learn they were blocked.
    if (typeof honeypot_field === "string" && honeypot_field.trim() !== "") return NextResponse.json({ success: true });
    if (!submission_time) return NextResponse.json({ success: true });
    const startedAt = parseInt(String(submission_time), 10);
    const now = Date.now();
    if (Number.isNaN(startedAt) || startedAt > now + MAX_CLOCK_SKEW_MS || now - startedAt > MAX_SUBMISSION_AGE_MS) {
      return NextResponse.json({ error: "Invalid submission time" }, { status: 400 });
    }
    if ((now - startedAt) / 1000 < 3) return NextResponse.json({ success: true });

    const userIp =
      request.headers.get("x-real-ip") || request.headers.get("x-forwarded-for")?.split(",").pop()?.trim() || "";
    const safeLanguage = typeof language === "string" && LANGUAGES.includes(language) ? language : "en";

    const res = await fetch(`${PLATFORM_URL}/api/forms/submissions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: siteOrigin(),
        ...(userIp ? { "x-forwarded-for": userIp } : {}),
        ...siteKeyHeaders(request),
      },
      body: JSON.stringify({
        submitter_name: formData.name ?? "",
        submitter_email: email,
        submitter_phone: formData.phone || null,
        form_data: formData,
        config_id: SURVEY_FORM_ID,
        page_title: "Survey",
        language: safeLanguage,
        honeypot_field: honeypot_field || "",
        submission_time: String(submission_time),
        wa_whatsapp_consent: false,
      }),
    });

    if (!res.ok) {
      console.error("[form-submit] Platform API error:", res.status, await res.json().catch(() => ({})));
      return NextResponse.json({ error: "Failed to send" }, { status: 500 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[form-submit] Error:", error);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
