import { NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/cms/auth";
import { createClient } from "@supabase/supabase-js";
import fs from "fs/promises";
import path from "path";

export async function GET() {
  const session = await verifyAdminSession();
  if (!session.authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 1. Supabase Connectivity Check
  let supabaseStatus: "CONNECTED" | "NOT_CONFIGURED" | "FAILED" = "NOT_CONFIGURED";
  let supabaseMessage = "Missing credentials in environment variables.";

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (supabaseUrl && supabaseKey) {
    try {
      const client = createClient(supabaseUrl, supabaseKey);
      const { error } = await client.from("leads").select("id").limit(1);
      if (!error) {
        supabaseStatus = "CONNECTED";
        supabaseMessage = "Successfully connected to Supabase database.";
      } else {
        supabaseStatus = "FAILED";
        supabaseMessage = `Database query error: ${error.message}`;
      }
    } catch (err: any) {
      supabaseStatus = "FAILED";
      supabaseMessage = `Connection failure: ${err?.message || "Unknown error"}`;
    }
  }

  // 2. Resend Email Status
  const resendKey = process.env.RESEND_API_KEY;
  const resendStatus = resendKey ? "CONFIGURED" : "NOT_CONFIGURED";

  // 3. Storage Health
  let storageStatus: "HEALTHY" | "ERROR" = "HEALTHY";
  try {
    const dataDir = path.join(process.cwd(), ".cms_data");
    await fs.mkdir(dataDir, { recursive: true });
  } catch {
    storageStatus = "ERROR";
  }

  return NextResponse.json({
    system: {
      timestamp: new Date().toISOString(),
      nodeVersion: process.version,
      environment: process.env.NODE_ENV || "development",
      uptime: Math.round(process.uptime()),
    },
    integrations: {
      supabase: {
        status: supabaseStatus,
        configured: !!(supabaseUrl && supabaseKey),
        message: supabaseMessage,
      },
      resend: {
        status: resendStatus,
        configured: !!resendKey,
        recipient: process.env.LEAD_RECIPIENT_EMAIL || "createforbrands@gmail.com",
        sender: process.env.EMAIL_FROM || "onboarding@resend.dev",
      },
      storage: {
        status: storageStatus,
        provider: "Local Hybrid + Supabase Sync",
      },
      scheduler: {
        status: "ACTIVE",
        endpoint: "/api/cron/publish-scheduled",
      }
    }
  });
}
