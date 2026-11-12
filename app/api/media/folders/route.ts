import { NextRequest, NextResponse } from "next/server";
import { secretMatches } from "@/lib/secret-match";
import { rm, rename, mkdir, access } from "fs/promises";
import { join, dirname } from "path";

export async function POST(request: NextRequest) {
  try {
    const { name, parentPath } = await request.json();
    const apiKey = request.headers.get("X-API-Key");

    console.log("[Create Folder API] Request received - name:", name, "parentPath:", parentPath);

    // Verify API key
    if (!secretMatches(apiKey, process.env.UPLOAD_API_KEY)) {
      console.error("[Create Folder API] Invalid API key");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!name) {
      console.error("[Create Folder API] No name provided");
      return NextResponse.json({ error: "Folder name is required" }, { status: 400 });
    }

    // Construct folder path
    const folderPath = parentPath ? `${parentPath}/${name}` : name;
    const absolutePath = join(process.cwd(), "public", "images", folderPath);

    console.log("[Create Folder API] Creating folder:", absolutePath);

    // Create the folder
    await mkdir(absolutePath, { recursive: true });

    console.log("[Create Folder API] Folder created successfully");

    return NextResponse.json({
      success: true,
      folder: {
        name,
        path: folderPath,
      },
    });
  } catch (error) {
    console.error("[Create Folder API] Error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Create failed" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const apiKey = request.headers.get("X-API-Key");
    const url = new URL(request.url);
    const path = url.searchParams.get("path");

    console.log("[Delete Folder API] Request received - path:", path);

    // Verify API key
    if (!secretMatches(apiKey, process.env.UPLOAD_API_KEY)) {
      console.error("[Delete Folder API] Invalid API key");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!path) {
      console.error("[Delete Folder API] No path provided");
      return NextResponse.json({ error: "Path is required" }, { status: 400 });
    }

    // Construct absolute folder path
    // Path comes as "gallery" or "photos/originals"
    const folderPath = join(process.cwd(), "public", "images", path);

    console.log("[Delete Folder API] Deleting folder:", folderPath);

    // Delete the folder recursively
    await rm(folderPath, { recursive: true, force: true });

    console.log("[Delete Folder API] Folder deleted successfully");

    return NextResponse.json({
      success: true,
      message: "Folder deleted successfully",
    });
  } catch (error) {
    console.error("[Delete Folder API] Error:", error);

    // If folder doesn't exist, that's ok
    if ((error as any)?.code === "ENOENT") {
      console.log("[Delete Folder API] Folder not found, considering it deleted");
      return NextResponse.json({
        success: true,
        message: "Folder not found (already deleted)",
      });
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Delete failed" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { apiKey, sourcePath, destPath } = await request.json();

    console.log("[Move Folder API] Request received - source:", sourcePath, "dest:", destPath);

    // Verify API key
    if (!secretMatches(apiKey, process.env.UPLOAD_API_KEY)) {
      console.error("[Move Folder API] Invalid API key");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!sourcePath || !destPath) {
      console.error("[Move Folder API] Missing sourcePath or destPath");
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

    // Prevent moving folder into itself or its subfolder
    if (destPath.startsWith(sourcePath + "/") || destPath === sourcePath) {
      return NextResponse.json(
        { error: "Cannot move folder into itself or its subfolder" },
        { status: 400 }
      );
    }

    // Construct absolute folder paths
    const absoluteSource = join(process.cwd(), "public", "images", sourcePath);
    const absoluteDest = join(process.cwd(), "public", "images", destPath);

    // Verify source folder exists
    try {
      await access(absoluteSource);
    } catch {
      console.error("[Move Folder API] Source folder not found:", absoluteSource);
      return NextResponse.json(
        { error: "Source folder not found" },
        { status: 404 }
      );
    }

    // Create parent directory of destination if it doesn't exist
    const destParent = dirname(absoluteDest);
    await mkdir(destParent, { recursive: true });

    // Move the folder
    await rename(absoluteSource, absoluteDest);

    console.log("[Move Folder API] Folder moved successfully:", sourcePath, "->", destPath);

    return NextResponse.json({
      success: true,
      folder: {
        path: destPath,
      },
    });
  } catch (error) {
    console.error("[Move Folder API] Error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Move failed" },
      { status: 500 }
    );
  }
}
