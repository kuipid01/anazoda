import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { getCloudinary } from "@/lib/cloudinary";
import { getDb } from "@/lib/db";
import { productImages, products } from "@/lib/db/schema";

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { id } = await params;
    const [product] = await getDb().select().from(products).where(eq(products.id, id));
    if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });
    const images = await getDb().select().from(productImages).where(eq(productImages.productId, id));
    const publicIds = images.length ? images.map((image) => image.imagePublicId) : [product.imagePublicId];
    await Promise.all(publicIds.map((publicId) => getCloudinary().uploader.destroy(publicId)));
    await getDb().delete(products).where(eq(products.id, id));
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to delete product" }, { status: 500 });
  }
}
