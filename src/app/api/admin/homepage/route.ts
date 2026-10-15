import { NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/cms/auth";
import {
  getHomepageSections,
  saveHomepageSection,
  reorderHomepageSections
} from "@/lib/cms/storage";

export async function GET() {
  const session = await verifyAdminSession();
  if (!session.authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const sections = await getHomepageSections();
  return NextResponse.json({ sections });
}

export async function POST(req: Request) {
  const session = await verifyAdminSession();
  if (!session.authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { action, section, sectionIds } = body;

    if (action === "reorder" && Array.isArray(sectionIds)) {
      const reordered = await reorderHomepageSections(sectionIds, session.actor || "admin");
      return NextResponse.json({ success: true, sections: reordered });
    }

    if (section && section.id) {
      const saved = await saveHomepageSection(section, session.actor || "admin");
      return NextResponse.json({ success: true, section: saved });
    }

    return NextResponse.json({ error: "Invalid request payload" }, { status: 400 });
  } catch (err) {
    console.error("[HOMEPAGE_CMS_ERROR]", err);
    return NextResponse.json({ error: "Failed to update homepage section" }, { status: 500 });
  }
}
