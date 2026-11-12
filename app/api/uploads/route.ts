import { NextRequest, NextResponse } from "next/server";
import { secretMatches } from "@/lib/secret-match";
import { writeFile, mkdir, access } from "fs/promises";
import { join } from "path";
import { constants } from "fs";
import sharp from "sharp";

const MAX_FILE_SIZE_KB = 300; // 300KB target for images
const IMAGE_MIME_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];
const SVG_MIME_TYPES = ["image/svg+xml"];
const FONT_MIME_TYPES = ["font/ttf", "font/otf", "font/woff", "font/woff2", "application/x-font-ttf", "application/x-font-otf", "application/font-woff", "application/font-woff2"];
const ALLOWED_MIME_TYPES = [...IMAGE_MIME_TYPES, ...SVG_MIME_TYPES, ...FONT_MIME_TYPES];

async function optimizeImage(buffer: Buffer, originalType: string): Promise<Buffer> {
  const isWebP = originalType === "image/webp";
  const sizeInKB = buffer.length / 1024;

  // Skip re-optimization if already WebP and under 500KB
  if (isWebP && sizeInKB < 500) {
    console.log(`[Upload API] WebP already optimized: ${sizeInKB.toFixed(0)}KB - skipping re-optimization`);
    return buffer;
  }

  const quality = 75; // Always use 75% quality, never reduce
  let optimized: Buffer;
  let currentBuffer = buffer;

  // Get original dimensions
  const metadata = await sharp(buffer).metadata();
  let width = metadata.width || 1920;
  let height = metadata.height || 1080;

  // Convert to WebP with 75% quality
  optimized = await sharp(currentBuffer)
    .webp({ quality })
    .toBuffer();

  // If still too large, reduce resolution iteratively (10% each time)
  let resizePercent = 100;
  while (optimized.length > MAX_FILE_SIZE_KB * 1024 && resizePercent > 20) {
    resizePercent -= 10;
    const newWidth = Math.round(width * (resizePercent / 100));
    const newHeight = Math.round(height * (resizePercent / 100));

    optimized = await sharp(buffer)
      .resize(newWidth, newHeight, { fit: 'inside' })
      .webp({ quality })
      .toBuffer();
  }

  const resolutionInfo = resizePercent < 100 ? ` resized to ${resizePercent}%` : '';
  console.log(`[Upload API] Optimized: ${(buffer.length / 1024).toFixed(0)}KB → ${(optimized.length / 1024).toFixed(0)}KB (quality: ${quality}${resolutionInfo})`);

  return optimized;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const apiKey = formData.get("apiKey") as string;
    const destination = formData.get("destination") as string | null;
    const path = formData.get("path") as string | null;
    const overwrite = formData.get("overwrite") === "true";

    console.log("[Upload API] Request received - file:", file?.name, "path:", path, "destination:", destination);

    // Verify API key
    if (!secretMatches(apiKey, process.env.UPLOAD_API_KEY)) {
      console.error("[Upload API] Invalid API key");
      return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
    }

    if (!file) {
      console.error("[Upload API] No file provided");
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file type
    const isFont = FONT_MIME_TYPES.includes(file.type) || /\.(ttf|otf|woff|woff2)$/i.test(file.name);
    const isSVG = SVG_MIME_TYPES.includes(file.type) || /\.svg$/i.test(file.name);
    const isImage = IMAGE_MIME_TYPES.includes(file.type);

    if (!isImage && !isSVG && !isFont && !ALLOWED_MIME_TYPES.includes(file.type)) {
      const ext = file.name.split(".").pop()?.toLowerCase();
      console.error("[Upload API] Unsupported file type:", file.type, "extension:", ext);
      return NextResponse.json(
        { error: `Unsupported file type: .${ext}` },
        { status: 400 }
      );
    }

    // Get file buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Determine filename and extension
    const filenameParts = file.name.split(".");
    const originalExt = filenameParts.length > 1 ? filenameParts.pop() : "";
    const baseName = filenameParts.join(".");

    // If it's an image, convert to WebP and change extension
    // For SVG, fonts, and other files, keep original extension
    const finalExt = isImage ? "webp" : originalExt;

    // Sanitize filename - remove only filesystem-unsafe characters, keep Hebrew and other Unicode
    // Remove: / \ : * ? " < > | and control characters
    // Keep: Hebrew (א-ת), numbers, letters, spaces, dots, hyphens, underscores, etc.
    const sanitizedBaseName = baseName
      .replace(/[\/\\:*?"<>|\x00-\x1f\x80-\x9f]/g, "_")
      .replace(/\s+/g, "_") // Replace spaces with underscores for URL safety
      .replace(/_+/g, "_") // Replace multiple underscores with single
      .replace(/^_|_$/g, ""); // Remove leading/trailing underscores

    const sanitizedName = finalExt ? `${sanitizedBaseName}.${finalExt}` : sanitizedBaseName;

    // Determine directory path
    let dirPath: string;
    let urlBasePath: string;

    if (destination === "private/digital-products") {
      // Private files (for digital products)
      dirPath = join(process.cwd(), "private", "digital-products");
      urlBasePath = "/private/digital-products";
    } else if (path) {
      // Custom path under /public/images
      dirPath = join(process.cwd(), "public", "images", path);
      urlBasePath = `/images/${path}`;
    } else {
      // Default to /public/images/uploads
      dirPath = join(process.cwd(), "public", "images", "uploads");
      urlBasePath = "/images/uploads";
    }

    // Create directory if it doesn't exist
    await mkdir(dirPath, { recursive: true });

    // Check if file exists and find unique filename
    let filename = sanitizedName;
    let savePath = join(dirPath, filename);

    // If overwrite=true, skip deduplication and use the original filename (re-import case)
    if (!overwrite) {
      let counter = 1;
      while (true) {
        try {
          await access(savePath, constants.F_OK);
          // File exists, try next number
          filename = `${sanitizedBaseName}-${counter}.${finalExt}`;
          savePath = join(dirPath, filename);
          counter++;
        } catch {
          // File doesn't exist, we can use this name
          break;
        }
      }
    }

    console.log("[Upload API] Saving file as:", filename, "Type:", isFont ? "font" : isSVG ? "svg" : isImage ? "image" : "other");

    // Optimize image if applicable, save fonts and other files as-is
    let finalBuffer: Buffer;
    if (isImage) {
      finalBuffer = await optimizeImage(buffer, file.type);
    } else {
      // For SVG, fonts, and other non-bitmap files, save directly without optimization
      finalBuffer = buffer;
    }

    // Save file
    await writeFile(savePath, finalBuffer);

    const urlPath = `${urlBasePath}/${filename}`;

    console.log("[Upload API] Upload successful - URL:", urlPath);

    // Get image dimensions if it's an image
    let dimensions;
    if (isImage) {
      try {
        const metadata = await sharp(finalBuffer).metadata();
        dimensions = {
          width: metadata.width,
          height: metadata.height,
        };
      } catch (error) {
        console.error("[Upload API] Failed to get dimensions:", error);
      }
    }

    // Return result
    return NextResponse.json({
      url: urlPath,
      filename,
      size: finalBuffer.length,
      originalSize: buffer.length,
      type: isImage ? "image/webp" : file.type,
      optimized: isImage,
      dimensions,
    });
  } catch (error) {
    console.error("[Upload API] Error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Upload failed" },
      { status: 500 }
    );
  }
}
