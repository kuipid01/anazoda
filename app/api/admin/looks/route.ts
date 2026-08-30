import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { getLooks, createLook } from "@/lib/looks";
import { uploadProductImage } from "@/lib/cloudinary";

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const looks = await getLooks();
  return NextResponse.json(looks);
}

export async function POST(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  
  try {
    const form = await req.formData();
    const image = form.get("image");
    
    if (!image || !(image instanceof File) || image.size === 0) {
      return NextResponse.json({ error: "Image is required" }, { status: 400 });
    }
    if (!image.type.startsWith("image/")) {
      return NextResponse.json({ error: "Must be a valid image" }, { status: 400 });
    }
    if (image.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: "Image must be under 10MB" }, { status: 400 });
    }

    const uploaded = await uploadProductImage(image);

    const title = String(form.get("title") || "").trim();
    const priceRange = String(form.get("priceRange") || "").trim();
    const category = String(form.get("category") || "").trim();
    const position = Number(form.get("position")) || 0;

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }
    if (!category) {
      return NextResponse.json({ error: "Category is required" }, { status: 400 });
    }

    const look = await createLook({
      title,
      priceRange,
      category,
      position,
      imageUrl: uploaded.imageUrl,
      imagePublicId: uploaded.imagePublicId
    });

    return NextResponse.json(look);
  } catch (error) {
    console.error("Error creating look:", error);
    return NextResponse.json({ error: "Failed to create look" }, { status: 500 });
  }
}
