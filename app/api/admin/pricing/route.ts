import { asc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { pricingItems } from "@/lib/db/schema";
import { createPricingItem, getPricingItems } from "@/lib/pricing";

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const items = await getPricingItems();
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Database error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await request.json();
    const name = String(body.name || "").trim();
    const description = String(body.description || "").trim();
    const price = Number(body.price);
    const currency = String(body.currency || "USD").trim();
    const secondaryPrice = body.secondaryPrice !== undefined && body.secondaryPrice !== "" ? Number(body.secondaryPrice) : null;
    const secondaryCurrency = String(body.secondaryCurrency || "NGN").trim();
    const position = Number(body.position) || 0;
    const active = body.active !== undefined ? Boolean(body.active) : true;

    if (!name) return NextResponse.json({ error: "Item name is required" }, { status: 400 });
    if (isNaN(price) || price < 0) return NextResponse.json({ error: "Valid price is required" }, { status: 400 });
    if (secondaryPrice !== null && (isNaN(secondaryPrice) || secondaryPrice < 0)) return NextResponse.json({ error: "Valid secondary price is required" }, { status: 400 });

    const item = await createPricingItem({ name, description, price, currency, secondaryPrice, secondaryCurrency, position, active });
    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to add pricing item" }, { status: 500 });
  }
}
