import { NextRequest, NextResponse } from "next/server";
import { secretMatches } from "@/lib/secret-match";
import { rename, mkdir, access } from "fs/promises";
import { join, dirname } from "path";

export async function PUT(request: NextRequest) {
  try {
    const { apiKey, sourcePath, destPath } = await request.json();

    console.log("[Move API] Request received - source:", sourcePath, "dest:", destPath);

    // Verify API key
    if (!secretMatches(apiKey, process.env.UPLOAD_API_KEY)) {
      console.error("[Move API] Invalid API key");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!sourcePath || !destPath) {
      console.error("[Move API] Missing sourcePath or destPath");
      return NextResponse.json(
        { error: "sourcePath and destPath are required" },
        { status: 400 }
      );
    }

    // Prevent path traversal
    if (sourcePath.includes("..") || destPath.includes("..")) {
      return NextResponse.json(
        { error: "Invalid path" },
        { status: 400 }
      );
    }

    // Construct absolute file paths
    // Paths come as "brand/logo.jpg" (relative to public/images/)
    const absoluteSource = join(process.cwd(), "public", "images", sourcePath);
    const absoluteDest = join(process.cwd(), "public", "images", destPath);

    // Verify source file exists
    try {
      await access(absoluteSource);
    } catch {
      console.error("[Move API] Source file not found:", absoluteSource);
      return NextResponse.json(
        { error: "Source file not found" },
        { status: 404 }
      );
    }

    // Create destination directory if it doesn't exist
    const destDir = dirname(absoluteDest);
    await mkdir(destDir, { recursive: true });

    // Move the file (fs.rename is instant on same filesystem)
    await rename(absoluteSource, absoluteDest);

    console.log("[Move API] File moved successfully:", sourcePath, "->", destPath);

    // Build the new URL path
    const newUrl = `/images/${destPath}`;

    return NextResponse.json({
      success: true,
      file: {
        path: destPath,
        url: newUrl,
      },
    });
  } catch (error) {
    console.error("[Move API] Error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Move failed" },
      { status: 500 }
    );
  }
}
