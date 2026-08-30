import { getDb } from "./db";
import { looks, type Look } from "./db/schema";
import { desc, eq, asc } from "drizzle-orm";

export async function getLooks() {
  return await getDb().select().from(looks).orderBy(asc(looks.position));
}

export async function createLook(data: { title: string; priceRange?: string; category: string; imageUrl: string; imagePublicId: string; position: number }) {
  const [look] = await getDb().insert(looks).values({
    title: data.title,
    priceRange: data.priceRange || null,
    category: data.category,
    imageUrl: data.imageUrl,
    imagePublicId: data.imagePublicId,
    position: data.position
  }).returning();
  return look;
}

export async function updateLook(id: string, data: Partial<Look>) {
  const [look] = await getDb().update(looks)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(looks.id, id))
    .returning();
  return look;
}

export async function deleteLook(id: string) {
  const [look] = await getDb().delete(looks).where(eq(looks.id, id)).returning();
  return look;
}
