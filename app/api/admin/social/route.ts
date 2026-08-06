import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { socialLinks } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const links = await getDb().select().from(socialLinks).orderBy(socialLinks.platform);
    return NextResponse.json(links);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Database error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { platform, url, active } = await request.json();
    if (!platform || !url) {
      return NextResponse.json({ error: "Platform and URL are required" }, { status: 400 });
    }

    // Validate url format against selected platform
    const platformLower = platform.toLowerCase();
    let isValid = false;
    let expectedFormat = "";

    if (platformLower === "instagram") {
      isValid = /^https:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9_\.]+\/?$/.test(url);
      expectedFormat = "https://instagram.com/username";
    } else if (platformLower === "facebook") {
      isValid = /^https:\/\/(www\.)?facebook\.com\/[a-zA-Z0-9_\.]+\/?$/.test(url);
      expectedFormat = "https://facebook.com/page-or-user";
    } else if (platformLower === "pinterest") {
      isValid = /^https:\/\/(www\.)?pinterest\.com\/[a-zA-Z0-9_\.]+\/?$/.test(url);
      expectedFormat = "https://pinterest.com/username";
    } else if (platformLower === "tiktok") {
      isValid = /^https:\/\/(www\.)?tiktok\.com\/@[a-zA-Z0-9_\.]+\/?$/.test(url);
      expectedFormat = "https://tiktok.com/@username";
    } else if (platformLower === "twitter") {
      isValid = /^https:\/\/(www\.)?(twitter|x)\.com\/[a-zA-Z0-9_]+\/?$/.test(url);
      expectedFormat = "https://x.com/username";
    } else if (platformLower === "whatsapp") {
      isValid = /^https:\/\/(wa\.me|api\.whatsapp\.com\/send)\/[0-9]+\/?$/.test(url);
      expectedFormat = "https://wa.me/2349064800187";
    } else if (platformLower === "youtube") {
      isValid = /^https:\/\/(www\.)?(youtube\.com\/[a-zA-Z0-9_@\-]+|youtu\.be\/[a-zA-Z0-9_]+)\/?$/.test(url);
      expectedFormat = "https://youtube.com/@channelname";
    } else {
      isValid = true;
    }

    if (!isValid) {
      return NextResponse.json({ error: `Invalid URL format for ${platform}. Expected: ${expectedFormat}` }, { status: 400 });
    }

    const db = getDb();
    
    // Check if it already exists
    const [existing] = await db.select().from(socialLinks).where(eq(socialLinks.platform, platform));
    
    if (existing) {
      // Update
      const [updated] = await db.update(socialLinks)
        .set({ url, active: active !== false, updatedAt: new Date() })
        .where(eq(socialLinks.platform, platform))
        .returning();
      return NextResponse.json(updated);
    } else {
      // Insert
      const [inserted] = await db.insert(socialLinks)
        .values({ platform, url, active: active !== false })
        .returning();
      return NextResponse.json(inserted);
    }
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Database error" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID is required" }, { status: 400 });

    await getDb().delete(socialLinks).where(eq(socialLinks.id, id));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Database error" }, { status: 500 });
  }
}
