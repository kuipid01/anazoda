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

const UPLOAD_TIMEOUT_MS = 120_000;
const MAX_RETRIES = 2;

async function uploadWithTimeout(file: File, retries = MAX_RETRIES): Promise<{ imageUrl: string; imagePublicId: string }> {
  const bytes = Buffer.from(await file.arrayBuffer());
  
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      stream.destroy(new Error("Upload timed out. Please check your internet connection and try again."));
    }, UPLOAD_TIMEOUT_MS);

    const stream = getCloudinary().uploader.upload_stream(
      { 
        folder: "house-of-anazodo/products", 
        resource_type: "image", 
        transformation: [{ width: 1600, height: 2000, crop: "limit" }, { quality: "auto", fetch_format: "auto" }] 
      },
      (error, value) => {
        clearTimeout(timeoutId);
        if (error || !value) {
          if (retries > 0) {
            setTimeout(() => {
              uploadWithTimeout(file, retries - 1).then(resolve).catch(reject);
            }, 1000 * (MAX_RETRIES - retries + 1));
            return;
          }
          reject(error || new Error("Upload failed with no response from image service."));
          return;
        }
        resolve({ imageUrl: value.secure_url, imagePublicId: value.public_id });
      }
    ).end(bytes);
  });
}

export async function uploadProductImage(file: File) {
  if (!process.env.CLOUDINARY_CLOUD_NAME) throw new Error("Cloudinary is not configured");
  if (file.size > 20 * 1024 * 1024) {
    throw new Error(`Image "${file.name}" is too large. Please select an image under 20MB.`);
  }
  return uploadWithTimeout(file);
}

export async function deleteImage(publicId: string) {
  if (!process.env.CLOUDINARY_CLOUD_NAME) return;
  try {
    await getCloudinary().uploader.destroy(publicId);
  } catch (error) {
    console.error("Cloudinary delete error:", error);
  }
}
