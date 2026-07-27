import { and, asc, count, desc, eq, gte, lte, ne, SQL } from "drizzle-orm";
import { getDb } from "./db";
import { productImages, products } from "./db/schema";

export const SHOP_PAGE_SIZE = 8;

export type ShopFilters = {
  page?: number;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: "newest" | "price-asc" | "price-desc" | "name";
};

export async function getPublishedProducts() {
  try { return await getDb().select().from(products).where(eq(products.published, true)).orderBy(desc(products.createdAt)); }
  catch { return []; }
}

export async function getFeaturedProducts() {
  try {
    return await getDb().select().from(products)
      .where(and(eq(products.published, true), eq(products.featured, true)))
      .orderBy(desc(products.createdAt)).limit(4);
  } catch {
    return [];
  }
}

export async function getShopProducts(filters: ShopFilters = {}) {
  const page = Math.max(1, filters.page || 1);
  const clauses: SQL[] = [eq(products.published, true)];
  if (filters.category) clauses.push(eq(products.category, filters.category));
  if (typeof filters.minPrice === "number") clauses.push(gte(products.price, Math.round(filters.minPrice * 100)));
  if (typeof filters.maxPrice === "number") clauses.push(lte(products.price, Math.round(filters.maxPrice * 100)));
  const where = and(...clauses);
  const orderBy = filters.sort === "price-asc" ? asc(products.price)
    : filters.sort === "price-desc" ? desc(products.price)
    : filters.sort === "name" ? asc(products.name)
    : desc(products.createdAt);
  try {
    const db = getDb();
    const [[totalRow], items, categories] = await Promise.all([
      db.select({ value: count() }).from(products).where(where),
      db.select().from(products).where(where).orderBy(orderBy).limit(SHOP_PAGE_SIZE).offset((page - 1) * SHOP_PAGE_SIZE),
      db.select({ name: products.category, value: count() }).from(products).where(eq(products.published, true)).groupBy(products.category).orderBy(asc(products.category))
    ]);
    const total = Number(totalRow?.value || 0);
    return { items, total, page, totalPages: Math.max(1, Math.ceil(total / SHOP_PAGE_SIZE)), categories };
  } catch {
    return { items: [], total: 0, page, totalPages: 1, categories: [] };
  }
}

export async function getProduct(slug: string) {
  try {
    const [product] = await getDb().select().from(products).where(and(eq(products.slug, slug), eq(products.published, true)));
    return product || null;
  } catch { return null; }
}

export async function getRelatedProducts(category: string, excludeId: string) {
  try {
    return await getDb().select().from(products)
      .where(and(eq(products.published, true), eq(products.category, category), ne(products.id, excludeId)))
      .orderBy(desc(products.createdAt)).limit(2);
  } catch {
    return [];
  }
}

export async function getProductImages(productId: string, fallback: { imageUrl: string; imagePublicId: string }) {
  try {
    const images = await getDb().select().from(productImages).where(eq(productImages.productId, productId)).orderBy(asc(productImages.position));
    return images.length ? images : [{ id: "cover", productId, position: 0, createdAt: new Date(), ...fallback }];
  } catch {
    return [{ id: "cover", productId, position: 0, createdAt: new Date(), ...fallback }];
  }
}
