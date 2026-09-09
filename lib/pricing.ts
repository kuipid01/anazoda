import { asc, eq } from "drizzle-orm";
import { getDb } from "./db";
import { pricingItems, type PricingItem } from "./db/schema";

export async function getPricingItems() {
  return await getDb().select().from(pricingItems).orderBy(asc(pricingItems.position));
}

export async function getActivePricingItems() {
  return await getDb().select().from(pricingItems).where(eq(pricingItems.active, true)).orderBy(asc(pricingItems.position));
}

export async function createPricingItem(data: {
  name: string;
  description?: string;
  price: number;
  currency?: string;
  secondaryPrice?: number | null;
  secondaryCurrency?: string;
  position: number;
  active?: boolean;
}) {
  const values: any = {
    name: data.name,
    description: data.description || "",
    price: data.price,
    currency: data.currency || "USD",
    secondaryCurrency: data.secondaryCurrency || "NGN",
    position: data.position,
    active: data.active ?? true
  };
  if (data.secondaryPrice !== null && data.secondaryPrice !== undefined) {
    values.secondaryPrice = data.secondaryPrice;
  }
  const [item] = await getDb()
    .insert(pricingItems)
    .values(values)
    .returning();
  return item;
}

export async function updatePricingItem(id: string, data: Partial<{
  name: string;
  description: string;
  price: number;
  currency: string;
  secondaryPrice: number | null;
  secondaryCurrency: string;
  position: number;
  active: boolean;
}>) {
  const [updated] = await getDb()
    .update(pricingItems)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(pricingItems.id, id))
    .returning();
  return updated;
}

export async function deletePricingItem(id: string) {
  const [deleted] = await getDb()
    .delete(pricingItems)
    .where(eq(pricingItems.id, id))
    .returning();
  return deleted;
}
