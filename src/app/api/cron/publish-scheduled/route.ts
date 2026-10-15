import { NextResponse } from "next/server";
import { getBlogPosts, saveBlogPost, addAuditLog } from "@/lib/cms/storage";

export async function GET(req: Request) {
  return handlePublishScheduled(req);
}

export async function POST(req: Request) {
  return handlePublishScheduled(req);
}

async function handlePublishScheduled(req: Request) {
  // Protect cron endpoint with CRON_SECRET or Bearer token if configured
  const authHeader = req.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const blogs = await getBlogPosts();
    const now = new Date();
    const publishedIds: string[] = [];

    for (const blog of blogs) {
      if (blog.status === "SCHEDULED" && blog.scheduledAt) {
        const scheduledDate = new Date(blog.scheduledAt);
        if (scheduledDate <= now) {
          await saveBlogPost(
            {
              id: blog.id,
              title: blog.title,
              slug: blog.slug,
              status: "PUBLISHED",
              publishedAt: now.toISOString(),
            },
            "system-scheduler"
          );
          publishedIds.push(blog.id);
          await addAuditLog("system-scheduler", "AUTO_PUBLISH_BLOG", `Auto-published blog: ${blog.title} (${blog.slug})`);
        }
      }
    }

    return NextResponse.json({
      success: true,
      timestamp: now.toISOString(),
      publishedCount: publishedIds.length,
      publishedIds,
    });
  } catch (err: any) {
    console.error("[CRON_SCHEDULED_PUBLISH_ERROR]", err);
    return NextResponse.json({ error: "Scheduled publishing error" }, { status: 500 });
  }
}
