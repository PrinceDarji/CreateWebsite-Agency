import { NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/cms/auth";
import { getAuditLogs } from "@/lib/cms/storage";

export async function GET() {
  const session = await verifyAdminSession();
  if (!session.authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const logs = await getAuditLogs();
  return NextResponse.json({ logs });
}
