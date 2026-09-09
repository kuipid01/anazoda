import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { pricingItems } from "@/lib/db/schema";
import { deletePricingItem, updatePricingItem } from "@/lib/pricing";

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const resolvedParams = await params;
    const deleted = await deletePricingItem(resolvedParams.id);
    if (!deleted) return NextResponse.json({ error: "Pricing item not found" }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete pricing item" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const resolvedParams = await params;
    const body = await req.json();

    const data: any = {};
    if (body.name !== undefined) data.name = String(body.name || "").trim();
    if (body.description !== undefined) data.description = String(body.description || "").trim();
    if (body.price !== undefined) {
      const p = Number(body.price);
      if (isNaN(p) || p < 0) return NextResponse.json({ error: "Valid price is required" }, { status: 400 });
      data.price = p;
    }
    if (body.currency !== undefined) data.currency = String(body.currency || "USD").trim();
    if (body.secondaryPrice !== undefined) {
      data.secondaryPrice = body.secondaryPrice !== "" ? Number(body.secondaryPrice) : null;
      if (data.secondaryPrice !== null && (isNaN(data.secondaryPrice) || data.secondaryPrice < 0)) return NextResponse.json({ error: "Valid secondary price is required" }, { status: 400 });
    }
    if (body.secondaryCurrency !== undefined) data.secondaryCurrency = String(body.secondaryCurrency || "NGN").trim();
    if (body.position !== undefined) data.position = Number(body.position);
    if (body.active !== undefined) data.active = Boolean(body.active);

    const updated = await updatePricingItem(resolvedParams.id, data);
    if (!updated) return NextResponse.json({ error: "Pricing item not found" }, { status: 404 });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update pricing item" }, { status: 500 });
  }
}
