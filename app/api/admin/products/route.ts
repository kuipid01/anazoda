import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { uploadProductImage } from "@/lib/cloudinary";
import { getDb } from "@/lib/db";
import { productImages, products } from "@/lib/db/schema";

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    return NextResponse.json(await getDb().select().from(products).orderBy(desc(products.createdAt)));
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Database error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const form = await request.formData();
    const images = form.getAll("images").filter((value): value is File => value instanceof File && value.size > 0);
    if (!images.length || images.some((image) => !image.type.startsWith("image/"))) {
      return NextResponse.json({ error: "At least one valid image is required" }, { status: 400 });
    }
    if (images.length > 8) return NextResponse.json({ error: "A maximum of 8 images is allowed" }, { status: 400 });
    if (images.some((image) => image.size > 10 * 1024 * 1024)) return NextResponse.json({ error: "Each image must be under 10MB" }, { status: 400 });
    const uploadedImages = await Promise.all(images.map(uploadProductImage));
    const uploaded = uploadedImages[0];
    const name = String(form.get("name") || "").trim();
    const slug = String(form.get("slug") || name).toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const [product] = await getDb().insert(products).values({
      name, slug, description: String(form.get("description") || ""), price: Math.round(Number(form.get("price")) * 100),
      currency: String(form.get("currency") || "NGN"), category: String(form.get("category") || "Couture"),
      featured: form.get("featured") === "true", published: form.get("published") !== "false", ...uploaded
    }).returning();
    await getDb().insert(productImages).values(uploadedImages.map((image, position) => ({ productId: product.id, position, ...image })));
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to create product" }, { status: 500 });
  }
}
