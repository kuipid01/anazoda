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
    const imageFiles = form.getAll("images");
    
    if (!imageFiles || imageFiles.length === 0) {
      return NextResponse.json({ error: "At least one image is required" }, { status: 400 });
    }

    const uploadedImages = [];
    for (const file of imageFiles) {
      if (file instanceof File && file.size > 0) {
        if (!file.type.startsWith("image/")) {
          return NextResponse.json({ error: "All files must be valid images" }, { status: 400 });
        }
        if (file.size > 10 * 1024 * 1024) {
          return NextResponse.json({ error: "Images must be under 10MB" }, { status: 400 });
        }
        const uploaded = await uploadProductImage(file);
        uploadedImages.push({ url: uploaded.imageUrl, publicId: uploaded.imagePublicId });
      }
    }

    if (uploadedImages.length === 0) {
      return NextResponse.json({ error: "No valid images were uploaded" }, { status: 400 });
    }

    const title = String(form.get("title") || "").trim();
    const priceRange = String(form.get("priceRange") || "").trim();
    const category = String(form.get("category") || "").trim();
    const position = Number(form.get("position")) || 1;

    if (!title) return NextResponse.json({ error: "Title is required" }, { status: 400 });
    if (!category) return NextResponse.json({ error: "Category is required" }, { status: 400 });

    const look = await createLook({
      title,
      priceRange,
      category,
      position,
      images: uploadedImages
    });

    return NextResponse.json(look);
  } catch (error) {
    console.error("Error creating look:", error);
    return NextResponse.json({ error: "Failed to create look" }, { status: 500 });
  }
}
