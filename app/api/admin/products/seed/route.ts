import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { neon } from "@neondatabase/serverless";

const categoryData = [
  { name: "Couture", slug: "couture" },
  { name: "Bridal", slug: "bridal" },
  { name: "Evening Wear", slug: "evening-wear" },
  { name: "Ready to Wear", slug: "ready-to-wear" }
];

const productData = [
  {
    name: "Amina Bridal Gown",
    slug: "amina-bridal-gown",
    description: "A stunning off-shoulder ball gown featuring hand-beaded lace appliqué and a dramatic cathedral train. Designed for the unforgettable modern bride.",
    price: 180000000,
    category: "Bridal",
    imageUrl: "/images/look-1.jpg",
    imagePublicId: "local/look-1",
    featured: true
  },
  {
    name: "Kemi Reception Dress",
    slug: "kemi-reception-dress",
    description: "Elegant asymmetrical neckline gown with structural draped folds and a soaring thigh-high slit. Perfectly captures the spirit of celebration.",
    price: 150000000,
    category: "Evening Wear",
    imageUrl: "/images/look-2.jpg",
    imagePublicId: "local/look-2",
    featured: true
  },
  {
    name: "Adaeze Aso-Oke Ensemble",
    slug: "adaeze-aso-oke-ensemble",
    description: "Traditional custom-woven metallic Aso-Oke outfit with hand-embellished bead detailing. Comes with a matching custom fan and hand-tailored veil.",
    price: 220000000,
    category: "Couture",
    imageUrl: "/images/look-3.jpg",
    imagePublicId: "local/look-3",
    featured: true
  },
  {
    name: "Ngozi Civil Suit",
    slug: "ngozi-civil-suit",
    description: "A precision-tailored cream crepe suit featuring a custom-draped blazer and high-waisted wide-leg trousers. Sophistication for civil unions.",
    price: 85000000,
    category: "Couture",
    imageUrl: "/images/look-4.jpg",
    imagePublicId: "local/look-4",
    featured: true
  },
  {
    name: "Zara Silk Slip",
    slug: "zara-silk-slip",
    description: "Minimalist luxury bias-cut slip dress featuring a fluid cowl neck, made from 100% heavy mulberry silk.",
    price: 25000000,
    category: "Ready to Wear",
    imageUrl: "/images/look-5.jpg",
    imagePublicId: "local/look-5",
    featured: false
  },
  {
    name: "Chioma Corset Dress",
    slug: "chioma-corset-dress",
    description: "A structured, boned corset gown embellished with hand-stitched crystals and featuring a sheer pleated georgette skirt.",
    price: 160000000,
    category: "Evening Wear",
    imageUrl: "/images/look-6.jpg",
    imagePublicId: "local/look-6",
    featured: false
  },
  {
    name: "Bisi Wrapper Set",
    slug: "bisi-wrapper-set",
    description: "A contemporary revision of the traditional double wrapper and lace blouse, custom-tailored with premium cord lace.",
    price: 120000000,
    category: "Couture",
    imageUrl: "/images/look-7.jpg",
    imagePublicId: "local/look-7",
    featured: false
  },
  {
    name: "Funke Mikado Gown",
    slug: "funke-mikado-gown",
    description: "Architectural Mikado silk mermaid wedding gown with a sculpted neckline and a statement back bow.",
    price: 250000000,
    category: "Bridal",
    imageUrl: "/images/look-8.jpg",
    imagePublicId: "local/look-8",
    featured: false
  },
  {
    name: "Tari Satin Jumpsuit",
    slug: "tari-satin-jumpsuit",
    description: "Ultra-chic satin halter jumpsuit featuring an open back and flowing, elegant wide-leg trousers.",
    price: 30000000,
    category: "Ready to Wear",
    imageUrl: "/images/portrait-1.jpg",
    imagePublicId: "local/portrait-1",
    featured: false
  },
  {
    name: "Halima Hand-Beaded Corset",
    slug: "halima-hand-beaded-corset",
    description: "A masterpiece of hand-craftsmanship. Fully beaded with Swarovski crystals, pearls, and glass tubes on sheer nude netting.",
    price: 450000000,
    category: "Couture",
    imageUrl: "/images/portrait-2.jpg",
    imagePublicId: "local/portrait-2",
    featured: false
  }
];

export async function POST() {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not configured");
    const sql = neon(process.env.DATABASE_URL);
    
    // Seed Categories
    for (const cat of categoryData) {
      await sql`
        INSERT INTO categories (name, slug)
        VALUES (${cat.name}, ${cat.slug})
        ON CONFLICT (name) DO NOTHING
      `;
    }
    
    // Seed Products
    for (const prod of productData) {
      await sql`
        INSERT INTO products (name, slug, description, price, category, image_url, image_public_id, featured, published)
        VALUES (${prod.name}, ${prod.slug}, ${prod.description}, ${prod.price}, ${prod.category}, ${prod.imageUrl}, ${prod.imagePublicId}, ${prod.featured}, true)
        ON CONFLICT (slug) DO UPDATE
        SET name = EXCLUDED.name, description = EXCLUDED.description, price = EXCLUDED.price, category = EXCLUDED.category, image_url = EXCLUDED.image_url, featured = EXCLUDED.featured
      `;
    }
    
    return NextResponse.json({ success: true, message: "Products seeded successfully" });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Database error" }, { status: 500 });
  }
}
