import { NextResponse } from "next/server";
import { siteKeyHeaders } from "@/lib/site-key-headers";

/**
 * Forms-module form proxy. Forwards a submission to the dashboard (POST /api/forms/submissions) with the form's
 * `config_id`. The dashboard resolves the tenant from the Origin header and applies the stored form's tags, lists and
 * CRM mapping itself; nothing of that is taken from the browser.
 * Env: COURSES_SERVICE_KEY (site key, already set for the waitlist), SITE_DOMAIN / NEXT_PUBLIC_SITE_URL, platform URL.
 */
const CONFIG_ID_UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
    const body = await request.json();
    const { config_id, honeypot_field, submission_time, page_title, language } = body ?? {};
    if (typeof config_id !== "string" || !CONFIG_ID_UUID.test(config_id) || !isPlainObject(body.form_data)) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    const formData: Record<string, string> = {};
    for (const [k, v] of Object.entries(body.form_data)) {
      if (typeof v === "string" && v !== "" && k.length <= 80) formData[k] = v.slice(0, 5000);
    }
    const email = formData.email ?? "";
    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    // Bot protection: silent success, bots must not learn they were blocked.
    if (typeof honeypot_field === "string" && honeypot_field.trim() !== "") return NextResponse.json({ success: true });
    if (!submission_time) return NextResponse.json({ success: true });
    const elapsed = (Date.now() - parseInt(String(submission_time), 10)) / 1000;
    if (Number.isNaN(elapsed) || (elapsed >= 0 && elapsed < 3)) return NextResponse.json({ success: true });

    const userIp =
      request.headers.get("x-real-ip") || request.headers.get("x-forwarded-for")?.split(",").pop()?.trim() || "";

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
        config_id,
        page_title: typeof page_title === "string" && page_title ? page_title : "Survey",
        ...(typeof language === "string" && language.trim() ? { language: language.trim() } : {}),
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
