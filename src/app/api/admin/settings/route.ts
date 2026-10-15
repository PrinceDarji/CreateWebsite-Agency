import { NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/cms/auth";
import { getSiteSettings, saveSiteSettings } from "@/lib/cms/storage";

export async function GET() {
  const session = await verifyAdminSession();
  if (!session.authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const settings = await getSiteSettings();
  return NextResponse.json({ settings });
}

export async function POST(req: Request) {
  const session = await verifyAdminSession();
  if (!session.authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const settings = await req.json();
    const saved = await saveSiteSettings(settings, session.actor || "admin");
    return NextResponse.json({ success: true, settings: saved });
  } catch (err) {
    return NextResponse.json({ error: "Failed to save site settings" }, { status: 500 });
  }
}
