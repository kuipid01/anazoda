import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { updateLook, deleteLook, getLooks } from "@/lib/looks";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function PUT(req: Request, props: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  
  try {
    const params = await props.params;
    const data = await req.json();
    const look = await updateLook(params.id, data);
    return NextResponse.json(look);
  } catch (error) {
    console.error("Error updating look:", error);
    return NextResponse.json({ error: "Failed to update look" }, { status: 500 });
  }
}

export async function DELETE(req: Request, props: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  
  try {
    const params = await props.params;
    
    // Fetch the look to get the public ID first
    const looksList = await getLooks();
    const lookToDelete = looksList.find((l: any) => l.id === params.id);
    
    if (lookToDelete && lookToDelete.imagePublicId) {
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(lookToDelete.imagePublicId);
    }
    
    const look = await deleteLook(params.id);
    return NextResponse.json(look);
  } catch (error) {
    console.error("Error deleting look:", error);
    return NextResponse.json({ error: "Failed to delete look" }, { status: 500 });
  }
}
