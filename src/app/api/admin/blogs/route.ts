import { NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/cms/auth";
import {
  getBlogPosts,
  getBlogPostById,
  saveBlogPost,
  deleteBlogPost,
  getBlogRevisions,
  restoreBlogRevision
} from "@/lib/cms/storage";
import { sanitizeHtml, validateSlug } from "@/lib/cms/sanitizer";

export async function GET(req: Request) {
  const session = await verifyAdminSession();
  if (!session.authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const action = searchParams.get("action");

  if (action === "revisions" && id) {
    const revisions = await getBlogRevisions(id);
    return NextResponse.json({ revisions });
  }

  if (id) {
    const blog = await getBlogPostById(id);
    if (!blog) return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    return NextResponse.json({ blog });
  }

  const blogs = await getBlogPosts();
  return NextResponse.json({ blogs });
}

export async function POST(req: Request) {
  const session = await verifyAdminSession();
  if (!session.authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { action, revisionId, ...postData } = body;

    if (action === "restore" && revisionId) {
      const restored = await restoreBlogRevision(revisionId, session.actor || "admin");
      if (!restored) {
        return NextResponse.json({ error: "Revision not found" }, { status: 404 });
      }
      return NextResponse.json({ success: true, blog: restored });
    }

    if (!postData.title || typeof postData.title !== "string") {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    // Auto-generate or validate slug
    let slug = (postData.slug || postData.title)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    if (!validateSlug(slug)) {
      return NextResponse.json({ error: "Invalid URL slug format" }, { status: 400 });
    }

    // Sanitize rich-text content
    const sanitizedContent = sanitizeHtml(postData.content || "");

    const saved = await saveBlogPost(
      {
        ...postData,
        slug,
        content: sanitizedContent,
      },
      session.actor || "admin"
    );

    return NextResponse.json({ success: true, blog: saved });
  } catch (err: any) {
    console.error("[ADMIN_BLOGS_POST_ERROR]", err);
    return NextResponse.json({ error: "Failed to save blog post" }, { status: 500 });
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

    if (!id) {
      return NextResponse.json({ error: "Blog ID is required" }, { status: 400 });
    }

    const success = await deleteBlogPost(id, session.actor || "admin");
    if (!success) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Failed to delete blog post" }, { status: 500 });
  }
}
