import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { verifyAdminSession } from "@/lib/cms/auth";
import { getMediaAssets, saveMediaAsset, deleteMediaAsset, checkMediaUsage } from "@/lib/cms/storage";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml"
]);

export async function GET(req: Request) {
  const session = await verifyAdminSession();
  if (!session.authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const checkUrl = searchParams.get("checkUsage");

  if (checkUrl) {
    const usages = await checkMediaUsage(checkUrl);
    return NextResponse.json({ inUse: usages });
  }

  const media = await getMediaAssets();
  return NextResponse.json({ media });
}

export async function POST(req: Request) {
  const session = await verifyAdminSession();
  if (!session.authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const altText = (formData.get("altText") as string) || "";
    const caption = (formData.get("caption") as string) || "";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "File exceeds maximum size of 10MB" }, { status: 400 });
    }

    if (!ALLOWED_MIME_TYPES.has(file.type)) {
      return NextResponse.json({ error: `File type ${file.type} is not supported. Use JPG, PNG, WEBP, or SVG.` }, { status: 400 });
    }

    // Sanitize filename
    const ext = path.extname(file.name).toLowerCase();
    const baseName = path.basename(file.name, ext).replace(/[^a-zA-Z0-9_-]/g, "_");
    const safeFilename = `${baseName}_${Date.now()}${ext}`;

    await fs.mkdir(UPLOAD_DIR, { recursive: true });
    const buffer = Buffer.from(await file.arrayBuffer());

    // SVG sanitization check
    if (file.type === "image/svg+xml") {
      const svgContent = buffer.toString("utf-8");
      if (/<script|onload|onerror|javascript:/i.test(svgContent)) {
        return NextResponse.json({ error: "SVG contains unsafe scripts or event handlers." }, { status: 400 });
      }
    }

    const filePath = path.join(UPLOAD_DIR, safeFilename);
    await fs.writeFile(filePath, buffer);

    const publicUrl = `/uploads/${safeFilename}`;

    const asset = await saveMediaAsset(
      {
        id: `med-${Date.now()}`,
        filename: safeFilename,
        url: publicUrl,
        mimeType: file.type,
        size: file.size,
        altText: altText || baseName,
        caption,
        uploadedBy: session.actor || "admin",
        createdAt: new Date().toISOString(),
      },
      session.actor || "admin"
    );

    return NextResponse.json({ success: true, asset });
  } catch (err: any) {
    console.error("[MEDIA_UPLOAD_ERROR]", err);
    return NextResponse.json({ error: "Failed to upload media file" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const session = await verifyAdminSession();
  if (!session.authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const force = searchParams.get("force") === "true";

    if (!id) {
      return NextResponse.json({ error: "Media ID is required" }, { status: 400 });
    }

    const result = await deleteMediaAsset(id, session.actor || "admin");
    if (!result.success && result.inUse && !force) {
      return NextResponse.json(
        {
          error: "Asset is currently in use across the website.",
          inUse: result.inUse,
        },
        { status: 409 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Failed to delete media asset" }, { status: 500 });
  }
}
