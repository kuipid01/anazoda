import { boolean, integer, pgTable, text, timestamp, uuid, jsonb } from "drizzle-orm/pg-core";

export const categories = pgTable("categories", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull().unique(),
  slug: text("slug").notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull()
});

export const products = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull().default(""),
  price: integer("price").notNull(),
  currency: text("currency").notNull().default("NGN"),
  category: text("category").notNull().default("Couture"),
  imageUrl: text("image_url").notNull(),
  imagePublicId: text("image_public_id").notNull(),
  featured: boolean("featured").notNull().default(false),
  published: boolean("published").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull()
});

export const productImages = pgTable("product_images", {
  id: uuid("id").defaultRandom().primaryKey(),
  productId: uuid("product_id").notNull().references(() => products.id, { onDelete: "cascade" }),
  imageUrl: text("image_url").notNull(),
  imagePublicId: text("image_public_id").notNull(),
  position: integer("position").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull()
});

export type Product = typeof products.$inferSelect;
export type Category = typeof categories.$inferSelect;
export type ProductImage = typeof productImages.$inferSelect;

export const socialLinks = pgTable("social_links", {
  id: uuid("id").defaultRandom().primaryKey(),
  platform: text("platform").notNull().unique(),
  url: text("url").notNull(),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull()
});

export type SocialLink = typeof socialLinks.$inferSelect;

export const looks = pgTable("looks", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  priceRange: text("price_range"),
  category: text("category").notNull().default("Couture"),
  images: jsonb("images").$type<Array<{url: string, publicId: string}>>().notNull().default([]),
  position: integer("position").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull()
});

export type Look = typeof looks.$inferSelect;
