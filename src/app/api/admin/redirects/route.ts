import { NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/cms/auth";
import { getRedirectRules, saveRedirectRule, deleteRedirectRule } from "@/lib/cms/storage";

export async function GET() {
  const session = await verifyAdminSession();
  if (!session.authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const redirects = await getRedirectRules();
  return NextResponse.json({ redirects });
}

export async function POST(req: Request) {
  const session = await verifyAdminSession();
  if (!session.authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { source, destination, permanent } = await req.json();

    if (!source || !destination) {
      return NextResponse.json({ error: "Source and destination are required" }, { status: 400 });
    }

    // Check for redirect loop
    if (source.trim() === destination.trim()) {
      return NextResponse.json({ error: "Cannot redirect a path to itself (redirect loop detected)" }, { status: 400 });
    }

    const saved = await saveRedirectRule({ source, destination, permanent: !!permanent }, session.actor || "admin");
    return NextResponse.json({ success: true, redirect: saved });
  } catch (err) {
    return NextResponse.json({ error: "Failed to create redirect rule" }, { status: 500 });
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
    if (!id) return NextResponse.json({ error: "ID is required" }, { status: 400 });

    const success = await deleteRedirectRule(id, session.actor || "admin");
    return NextResponse.json({ success });
  } catch (err) {
    return NextResponse.json({ error: "Failed to delete redirect rule" }, { status: 500 });
  }
}
