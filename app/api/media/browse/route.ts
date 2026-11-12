import { NextRequest, NextResponse } from "next/server";
import { secretMatches } from "@/lib/secret-match";
import { readdir, stat } from "fs/promises";
import { join } from "path";

export async function GET(request: NextRequest) {
  try {
    const apiKey = request.headers.get("X-API-Key");

    // Verify API key
    if (!secretMatches(apiKey, process.env.UPLOAD_API_KEY)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const path = searchParams.get("path") || "";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "50");
    const search = searchParams.get("search") || "";

    // Base path is always /public/images
    const basePath = join(process.cwd(), "public", "images", path);

    // Read directory
    const entries = await readdir(basePath, { withFileTypes: true });

    const files = [];
    const folders = [];

    for (const entry of entries) {
      // Skip hidden files
      if (entry.name.startsWith(".")) continue;

      if (entry.isDirectory()) {
        // Count items in the folder
        const folderPath = join(basePath, entry.name);
        let itemCount = 0;
        try {
          const folderEntries = await readdir(folderPath, { withFileTypes: true });
          itemCount = folderEntries.filter(e => !e.name.startsWith(".")).length;
        } catch {
          itemCount = 0;
        }

        folders.push({
          name: entry.name,
          path: path ? `${path}/${entry.name}` : entry.name,
          itemCount,
        });
      } else {
        // If searching, filter by filename
        if (search && !entry.name.toLowerCase().includes(search.toLowerCase())) {
          continue;
        }

        const filePath = join(basePath, entry.name);
        const fileStat = await stat(filePath);

        files.push({
          name: entry.name,
          path: path ? `${path}/${entry.name}` : entry.name,
          url: `/images/${path ? path + "/" : ""}${entry.name}`,
          size: fileStat.size,
          type: getContentType(entry.name),
          modifiedAt: fileStat.mtime.toISOString(),
        });
      }
    }

    // Sort files by name
    files.sort((a, b) => a.name.localeCompare(b.name));
    folders.sort((a, b) => a.name.localeCompare(b.name));

    // Pagination
    const totalFiles = files.length;
    const totalPages = Math.ceil(totalFiles / limit);
    const startIdx = (page - 1) * limit;
    const endIdx = startIdx + limit;
    const paginatedFiles = files.slice(startIdx, endIdx);

    // Generate breadcrumbs
    const breadcrumbs = [];
    if (path) {
      const parts = path.split("/");
      let currentPath = "";
      breadcrumbs.push({ name: "Home", path: "" });

      for (const part of parts) {
        currentPath = currentPath ? `${currentPath}/${part}` : part;
        breadcrumbs.push({ name: part, path: currentPath });
      }
    } else {
      breadcrumbs.push({ name: "Home", path: "" });
    }

    return NextResponse.json({
      files: paginatedFiles,
      folders,
      breadcrumbs,
      currentPath: path,
      totalFiles,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    console.error("Browse error:", error);

    // If directory doesn't exist, return empty result
    if ((error as any)?.code === "ENOENT") {
      return NextResponse.json({
        files: [],
        folders: [],
        breadcrumbs: [{ name: "Home", path: "" }],
        currentPath: "",
        totalFiles: 0,
        totalPages: 0,
        currentPage: 1,
      });
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Browse failed" },
      { status: 500 }
    );
  }
}

// Helper to determine MIME type from filename
function getContentType(filename: string): string {
  const ext = filename.split(".").pop()?.toLowerCase();
  const mimeTypes: Record<string, string> = {
    // Images
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    gif: "image/gif",
    webp: "image/webp",
    svg: "image/svg+xml",
    // Fonts
    ttf: "font/ttf",
    otf: "font/otf",
    woff: "font/woff",
    woff2: "font/woff2",
    // Documents
    pdf: "application/pdf",
    zip: "application/zip",
    // Video
    mp4: "video/mp4",
  };
  return mimeTypes[ext || ""] || "application/octet-stream";
}
