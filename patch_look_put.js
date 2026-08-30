const fs = require('fs');
let content = fs.readFileSync('app/api/admin/looks/[id]/route.ts', 'utf8');

const putCode = `
import { updateLook, getLooks } from "@/lib/looks";
import { uploadProductImage } from "@/lib/cloudinary";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const resolvedParams = await params;
    const form = await req.formData();
    
    const title = String(form.get("title") || "").trim();
    const priceRange = String(form.get("priceRange") || "").trim();
    const category = String(form.get("category") || "").trim();
    const position = Number(form.get("position")) || 1;
    const layoutStr = String(form.get("imageLayout") || "[]");
    
    if (!title) return NextResponse.json({ error: "Title is required" }, { status: 400 });
    if (!category) return NextResponse.json({ error: "Category is required" }, { status: 400 });
    
    let layout: any[] = [];
    try { layout = JSON.parse(layoutStr); } catch (e) { }
    
    const newFiles = form.getAll("newImages");
    const finalImages: Array<{ url: string; publicId: string }> = [];
    
    // Fetch existing look to handle Cloudinary deletions
    const existingLooks = await getLooks();
    const existingLook = existingLooks.find((l: any) => l.id === resolvedParams.id);
    if (!existingLook) return NextResponse.json({ error: "Look not found" }, { status: 404 });
    
    for (const item of layout) {
      if (item.type === "existing") {
        finalImages.push({ url: item.url, publicId: item.publicId });
      } else if (item.type === "new" && typeof item.fileIndex === "number") {
        const file = newFiles[item.fileIndex];
        if (file instanceof File && file.size > 0) {
           const uploaded = await uploadProductImage(file);
           finalImages.push({ url: uploaded.imageUrl, publicId: uploaded.imagePublicId });
        }
      }
    }
    
    if (finalImages.length === 0) {
      return NextResponse.json({ error: "At least one image is required" }, { status: 400 });
    }
    
    // Delete removed images from Cloudinary
    if (existingLook.images && Array.isArray(existingLook.images)) {
      for (const oldImg of existingLook.images) {
        if (!finalImages.find((fi) => fi.publicId === oldImg.publicId)) {
          if (oldImg.publicId) await deleteImage(oldImg.publicId);
        }
      }
    }
    
    const updated = await updateLook(resolvedParams.id, {
      title,
      priceRange,
      category,
      position,
      images: finalImages
    });
    
    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating look:", error);
    return NextResponse.json({ error: "Failed to update look" }, { status: 500 });
  }
}
`;

content = content.replace('import { deleteLook } from "@/lib/looks";', putCode.split('export async function PUT')[0] + 'import { deleteLook } from "@/lib/looks";');
content += '\n' + putCode.substring(putCode.indexOf('export async function PUT'));

fs.writeFileSync('app/api/admin/looks/[id]/route.ts', content);
