import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { deleteLook } from "@/lib/looks";
import { deleteImage } from "@/lib/cloudinary";

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const resolvedParams = await params;
    const deleted = await deleteLook(resolvedParams.id);
    if (!deleted) return NextResponse.json({ error: "Look not found" }, { status: 404 });
    
    if (deleted.images && Array.isArray(deleted.images)) {
      for (const img of deleted.images) {
        if (img.publicId) await deleteImage(img.publicId);
      }
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting look:", error);
    return NextResponse.json({ error: "Failed to delete look" }, { status: 500 });
  }
}
