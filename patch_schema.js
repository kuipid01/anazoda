const fs = require('fs');
let content = fs.readFileSync('lib/db/schema.ts', 'utf8');

// replace imports to include jsonb
content = content.replace(
  /import \{ boolean, integer, pgTable, text, timestamp, uuid \} from "drizzle-orm\/pg-core";/,
  'import { boolean, integer, pgTable, text, timestamp, uuid, jsonb } from "drizzle-orm/pg-core";'
);

content = content.replace(
  /export const looks = pgTable\("looks", \{[\s\S]*?\}\);/,
  `export const looks = pgTable("looks", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  priceRange: text("price_range"),
  category: text("category").notNull().default("Couture"),
  images: jsonb("images").$type<Array<{url: string, publicId: string}>>().notNull().default([]),
  position: integer("position").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull()
});`
);

fs.writeFileSync('lib/db/schema.ts', content);
