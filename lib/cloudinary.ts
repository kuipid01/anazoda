import { v2 as cloudinary } from "cloudinary";

export function getCloudinary() {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
  });
  return cloudinary;
}

export async function uploadProductImage(file: File) {
  if (!process.env.CLOUDINARY_CLOUD_NAME) throw new Error("Cloudinary is not configured");
  const bytes = Buffer.from(await file.arrayBuffer());
  const result = await new Promise<{ secure_url: string; public_id: string }>((resolve, reject) => {
    getCloudinary().uploader.upload_stream(
      { folder: "house-of-anazodo/products", resource_type: "image", transformation: [{ width: 1600, height: 2000, crop: "limit" }, { quality: "auto", fetch_format: "auto" }] },
      (error, value) => error || !value ? reject(error) : resolve(value)
    ).end(bytes);
  });
  return { imageUrl: result.secure_url, imagePublicId: result.public_id };
}
