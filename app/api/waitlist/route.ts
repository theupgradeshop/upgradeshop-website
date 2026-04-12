import { NextResponse } from "next/server";

const PLATFORM_URL =
  process.env.NEXT_PUBLIC_PLATFORM_URL || "https://app.staging.upgradeshop.ai";
const SITE_DOMAIN =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/^https?:\/\//, "") ||
  "staging.upgradeshop.ai";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, phone, language } = body;

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

    const apiUrl = `${PLATFORM_URL}/api/public/contacts/find-or-create?domain=${SITE_DOMAIN}`;
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        phone,
        source: "waitlist",
        tags: ["waitlist"],
        language: language || "en",
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
