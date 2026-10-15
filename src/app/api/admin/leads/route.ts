import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "createadmin2026";
const COOKIE_NAME = "create_admin_session";

function getExpectedToken(): string {
  const secret = process.env.ADMIN_SECRET || DEFAULT_ADMIN_PASSWORD;
  return crypto.createHash("sha256").update(`create-admin-auth-${secret}`).digest("hex");
}

async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  return !!token && token === getExpectedToken();
}

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json({
      supabaseConfigured: false,
      leads: [],
      message: "Supabase credentials are not configured in environment variables.",
    });
  }

  try {
    const { data: leads, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[ADMIN_LEADS_FETCH_ERROR]", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      supabaseConfigured: true,
      leads: leads || [],
    });
  } catch (err: any) {
    console.error("[ADMIN_LEADS_ERROR]", err);
    return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });
  }

  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: "Missing id or status" }, { status: 400 });
    }

    const { error } = await supabase
      .from("leads")
      .update({ status })
      .eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, id, status });
  } catch (err: any) {
    return NextResponse.json({ error: "Failed to update lead" }, { status: 500 });
  }
}
