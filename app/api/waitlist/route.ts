import { NextResponse } from "next/server";
import { splitName } from "@/lib/first-name";
import { clientIp } from "@/lib/client-ip";

const PLATFORM_URL =
  process.env.NEXT_PUBLIC_PLATFORM_URL || "https://app.staging.upgradeshop.ai";

// Runtime server-side SITE_DOMAIN wins (staging sets it: the baked public URL
// there is the production domain), then the public URL's host, then staging.
function siteDomain(): string {
  const explicit = process.env.SITE_DOMAIN?.trim();
  if (explicit) return explicit;
  const fromPublicUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/^https?:\/\//, "").replace(/\/.*$/, "");
  return fromPublicUrl || "staging.upgradeshop.ai";
}

// Simple in-memory rate limiting (5 requests per IP per 10 minutes)
const RATE_LIMIT_WINDOW = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX = 5;
const ipRequests = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const requests = ipRequests.get(ip) || [];
  const recent = requests.filter((t) => now - t < RATE_LIMIT_WINDOW);
  if (recent.length >= RATE_LIMIT_MAX) return true;
  recent.push(now);
  ipRequests.set(ip, recent);
  return false;
}

export async function POST(request: Request) {
  try {
    const ip = clientIp(request);
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { email, phone, language, name } = body;
    const { firstName, lastName } = splitName(
      typeof name === "string" ? name.slice(0, 120) : ""
    );

    if (!email || !phone) {
      return NextResponse.json(
        { error: "Email and phone are required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    const safeLanguage = ["en", "he"].includes(language) ? language : "en";

    const serviceKey = process.env.COURSES_SERVICE_KEY || "";
    if (!serviceKey) {
      console.error("[waitlist] COURSES_SERVICE_KEY is not set; calling without a site key");
    }

    const apiUrl = `${PLATFORM_URL}/api/public/contacts/find-or-create?domain=${siteDomain()}`;
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(serviceKey ? { "x-service-key": serviceKey } : {}),
        "x-tus-end-user-ip": ip,
      },
      body: JSON.stringify({
        email,
        ...(firstName ? { firstName } : {}),
        ...(lastName ? { lastName } : {}),
        phone,
        wa_id: phone, // pre-built international number, bypass normalizeToWaId
        source: "waitlist",
        tags: ["waitlist"],
        language: safeLanguage,
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      console.error("[waitlist] Dashboard API error:", err);
      return NextResponse.json(
        { error: "Failed to join waitlist" },
        { status: 500 }
      );
    }

    const data = await res.json();

    // The dashboard says whether this contact already had the waitlist tag.
    // An older dashboard sends no flag: keep the success response.
    if (data.alreadyOnWaitlist === true) {
      return NextResponse.json(
        { error: "Already on the waitlist", code: "already_on_waitlist" },
        { status: 409 }
      );
    }

    return NextResponse.json({
      success: true,
      contactId: data.contactId,
      created: data.created,
    });
  } catch (error) {
    console.error("[waitlist] Error:", error);
    return NextResponse.json(
      { error: "Internal error" },
      { status: 500 }
    );
  }
}
