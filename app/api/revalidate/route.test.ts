import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";

const revalidatePathMock = vi.fn();

vi.mock("next/cache", () => ({
  revalidatePath: (...args: unknown[]) => revalidatePathMock(...args),
}));

// Imported after the mock so the route picks up the mocked revalidatePath.
import { POST } from "./route";

const ENDPOINT = "https://staging.upgradeshop.ai/api/revalidate";

function makeRequest(options: {
  headerSecret?: string;
  bodySecret?: string;
  path?: string;
}) {
  const headers: Record<string, string> = { "content-type": "application/json" };
  if (options.headerSecret !== undefined) {
    headers["x-revalidate-secret"] = options.headerSecret;
  }
  const body: Record<string, unknown> = {};
  if (options.path !== undefined) body.path = options.path;
  if (options.bodySecret !== undefined) body.secret = options.bodySecret;

  return new NextRequest(ENDPOINT, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });
}

const ORIGINAL_SECRET = process.env.REVALIDATE_SECRET;

describe("POST /api/revalidate", () => {
  beforeEach(() => {
    revalidatePathMock.mockReset();
    process.env.REVALIDATE_SECRET = "correct-secret";
  });

  afterEach(() => {
    if (ORIGINAL_SECRET === undefined) {
      delete process.env.REVALIDATE_SECRET;
    } else {
      process.env.REVALIDATE_SECRET = ORIGINAL_SECRET;
    }
  });

  it("accepts the correct secret sent in the x-revalidate-secret header", async () => {
    const request = makeRequest({ headerSecret: "correct-secret", path: "/" });
    const response = await POST(request);
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json.revalidated).toBe(true);
    expect(revalidatePathMock).toHaveBeenCalledWith("/");
  });

  it("accepts the correct secret sent in the body (legacy callers)", async () => {
    const request = makeRequest({ bodySecret: "correct-secret", path: "/" });
    const response = await POST(request);
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json.revalidated).toBe(true);
    expect(revalidatePathMock).toHaveBeenCalledWith("/");
  });

  it("rejects a wrong header value with no body secret", async () => {
    const request = makeRequest({ headerSecret: "wrong-secret", path: "/" });
    const response = await POST(request);

    expect(response.status).toBe(401);
    expect(revalidatePathMock).not.toHaveBeenCalled();
  });

  it("rejects a request with no header and no body secret", async () => {
    const request = makeRequest({ path: "/" });
    const response = await POST(request);

    expect(response.status).toBe(401);
    expect(revalidatePathMock).not.toHaveBeenCalled();
  });

  it("rejects when REVALIDATE_SECRET is unset, even if the request supplies no secret at all", async () => {
    delete process.env.REVALIDATE_SECRET;
    const request = makeRequest({ path: "/" });
    const response = await POST(request);

    expect(response.status).toBe(401);
    expect(revalidatePathMock).not.toHaveBeenCalled();
  });
});
