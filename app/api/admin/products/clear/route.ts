import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { neon } from "@neondatabase/serverless";

export async function POST() {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not configured");
    const sql = neon(process.env.DATABASE_URL);
    await sql`DELETE FROM product_images`;
    await sql`DELETE FROM products`;
    await sql`DELETE FROM categories`;
    return NextResponse.json({ success: true, message: "Database cleared successfully" });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Database error" }, { status: 500 });
  }
}
