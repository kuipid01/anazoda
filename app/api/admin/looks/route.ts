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
    const contentType = req.headers.get("content-type") || "";
    if (!contentType.includes("multipart/form-data")) {
      return NextResponse.json({ error: "Invalid request format. Please use the form to submit." }, { status: 400 });
    }

    const form = await req.formData();
    const imageFiles = form.getAll("images");
    
    if (!imageFiles || imageFiles.length === 0) {
      return NextResponse.json({ error: "At least one image is required" }, { status: 400 });
    }

    const uploadedImages = [];
    for (const file of imageFiles) {
      if (file instanceof File && file.size > 0) {
        if (!file.type.startsWith("image/")) {
          return NextResponse.json({ error: `"${file.name}" is not a valid image file. Please use JPG, PNG, or WebP.` }, { status: 400 });
        }
        if (file.size > 20 * 1024 * 1024) {
          return NextResponse.json({ error: `"${file.name}" exceeds the 20MB size limit. Please compress the image or choose a smaller file.` }, { status: 400 });
        }
        try {
          const uploaded = await uploadProductImage(file);
          uploadedImages.push({ url: uploaded.imageUrl, publicId: uploaded.imagePublicId });
        } catch (uploadError) {
          console.error(`Failed to upload ${file.name}:`, uploadError);
          return NextResponse.json({ 
            error: uploadError instanceof Error ? uploadError.message : `Failed to upload "${file.name}". Please check your connection and try again.` 
          }, { status: 502 });
        }
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
    if (error instanceof Error && error.message.includes("timeout")) {
      return NextResponse.json({ error: "Upload timed out. Your internet connection may be slow. Please try again." }, { status: 504 });
    }
    return NextResponse.json({ error: "Failed to create look. Please try again." }, { status: 500 });
  }
}
