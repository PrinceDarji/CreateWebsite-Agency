import { NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/cms/auth";
import { getServices, saveService } from "@/lib/cms/storage";
import { validateSlug } from "@/lib/cms/sanitizer";

export async function GET() {
  const session = await verifyAdminSession();
  if (!session.authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const services = await getServices();
  return NextResponse.json({ services });
}

export async function POST(req: Request) {
  const session = await verifyAdminSession();
  if (!session.authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const service = await req.json();

    if (!service.name || !service.slug) {
      return NextResponse.json({ error: "Name and slug are required" }, { status: 400 });
    }

    if (!validateSlug(service.slug)) {
      return NextResponse.json({ error: "Invalid service URL slug" }, { status: 400 });
    }

    const saved = await saveService(service, session.actor || "admin");
    return NextResponse.json({ success: true, service: saved });
  } catch (err) {
    console.error("[SERVICES_CMS_ERROR]", err);
    return NextResponse.json({ error: "Failed to save service" }, { status: 500 });
  }
}
