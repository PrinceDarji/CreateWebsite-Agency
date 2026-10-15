import { NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/cms/auth";
import { getCampaignReports, saveCampaignReport } from "@/lib/cms/storage";

export async function GET() {
  const session = await verifyAdminSession();
  if (!session.authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const reports = await getCampaignReports();
  return NextResponse.json({ reports });
}

export async function POST(req: Request) {
  const session = await verifyAdminSession();
  if (!session.authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const report = await req.json();
    if (!report.title || !report.client) {
      return NextResponse.json({ error: "Title and client are required" }, { status: 400 });
    }

    const saved = await saveCampaignReport(report, session.actor || "admin");
    return NextResponse.json({ success: true, report: saved });
  } catch (err) {
    return NextResponse.json({ error: "Failed to save campaign report" }, { status: 500 });
  }
}
