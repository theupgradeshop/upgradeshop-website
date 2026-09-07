import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

/**
 * On-demand cache revalidation endpoint
 *
 * Called by the UpgradeShop dashboard after content is saved
 * to immediately update the cached page content.
 *
 * POST /api/revalidate
 * Body: { path: "/", secret: "..." }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { path, secret } = body;

    // Validate the revalidation secret. The header (`x-revalidate-secret`) is
    // canonical — that's what the dashboard sends. The body's `secret` field
    // is a transitional fallback for older dashboard call sites and should be
    // removed once nothing depends on it.
    const expectedSecret = process.env.REVALIDATE_SECRET;
    const headerSecret = request.headers.get("x-revalidate-secret");
    const secretIsValid =
      !!expectedSecret && (headerSecret === expectedSecret || secret === expectedSecret);

    if (!secretIsValid) {
      return NextResponse.json(
        { error: "Invalid revalidation secret" },
        { status: 401 }
      );
    }

    if (!path) {
      return NextResponse.json(
        { error: "Path is required" },
        { status: 400 }
      );
    }

    // Revalidate the specified path
    revalidatePath(path);

    return NextResponse.json({
      revalidated: true,
      path,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Revalidation error:", error);
    return NextResponse.json(
      { error: "Failed to revalidate" },
      { status: 500 }
    );
  }
}

/**
 * Health check for the revalidation endpoint
 */
export async function GET() {
  return NextResponse.json({
    status: "ok",
    endpoint: "revalidate",
    timestamp: new Date().toISOString(),
  });
}
