import { asc, eq } from "drizzle-orm";
import { getDb } from "./db";
import { looks, type Look } from "./db/schema";

export async function getLooks() {
  return await getDb().select().from(looks).orderBy(asc(looks.position));
}

export async function createLook(data: {
  title: string;
  category: string;
  priceRange?: string;
  images: Array<{ url: string; publicId: string }>;
  position: number;
}) {
  const [look] = await getDb()
    .insert(looks)
    .values(data)
    .returning();
  return look;
}

export async function deleteLook(id: string) {
  const [deleted] = await getDb()
    .delete(looks)
    .where(eq(looks.id, id))
    .returning();
  return deleted;
}

export async function updateLook(id: string, data: Partial<{
  title: string;
  category: string;
  priceRange: string;
  images: Array<{ url: string; publicId: string }>;
  position: number;
}>) {
  const [updated] = await getDb()
    .update(looks)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(looks.id, id))
    .returning();
  return updated;
}
