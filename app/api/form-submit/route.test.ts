// @vitest-environment node
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/survey-form", async () => {
  const actual = await vi.importActual<typeof import("@/lib/survey-form")>("@/lib/survey-form");
  return {
    ...actual,
    fetchSurveyFormConfig: async () => ({
      formId: actual.SURVEY_FORM_ID,
      fields: [{ key: "email", type: "email", label: "Email", required: true }],
    }),
  };
});

import { POST } from "./route";
import { SURVEY_FORM_ID } from "@/lib/survey-form";

function req(ip: string) {
  return new Request("http://localhost/api/form-submit", {
    method: "POST",
    headers: { "content-type": "application/json", "x-real-ip": ip },
    body: JSON.stringify({
      config_id: SURVEY_FORM_ID,
      form_data: { email: "a@b.co", extra: "dropped" },
      submission_time: Date.now() - 10_000,
      honeypot_field: "",
      language: "xx",
    }),
  });
}

function stubFetch() {
  const f = vi.fn(async () => new Response("{}", { status: 201 }));
  vi.stubGlobal("fetch", f);
  return f;
}
const init = (f: ReturnType<typeof stubFetch>) => (f.mock.calls[0] as unknown[])[1] as { headers: Record<string, string>; body: string };

describe("POST /api/form-submit", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("takes the Origin from SITE_DOMAIN when set", async () => {
    vi.stubEnv("SITE_DOMAIN", " staging.upgradeshop.ai ");
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://upgradeshop.ai");
    const f = stubFetch();
    expect((await POST(req("198.51.100.20"))).status).toBe(200);
    expect(init(f).headers.Origin).toBe("https://staging.upgradeshop.ai");
  });

  it("falls back to the public site URL when SITE_DOMAIN is unset", async () => {
    vi.stubEnv("SITE_DOMAIN", "");
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://upgradeshop.ai");
    const f = stubFetch();
    await POST(req("198.51.100.21"));
    expect(init(f).headers.Origin).toBe("https://upgradeshop.ai");
  });

  it("forwards only configured keys and an allowed language", async () => {
    const f = stubFetch();
    await POST(req("198.51.100.22"));
    const sent = JSON.parse(init(f).body);
    expect(sent.form_data).toEqual({ email: "a@b.co" });
    expect(sent.language).toBe("en");
    expect(sent.config_id).toBe(SURVEY_FORM_ID);
  });
});
