export interface CompressedImage {
  file: File;
  preview: string;
  originalSize: number;
  compressedSize: number;
}

export async function compressImage(file: File, maxWidth = 1920, quality = 0.8): Promise<File> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let { width, height } = img;

        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("Canvas not supported"));

        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (!blob) return reject(new Error("Compression failed"));
            const compressed = new File([blob], file.name, {
              type: "image/jpeg",
              lastModified: Date.now()
            });
            resolve(compressed);
          },
          "image/jpeg",
          quality
        );
      };
      img.onerror = () => reject(new Error("Failed to load image"));
      img.src = event.target?.result as string;
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}

export async function compressImages(files: FileList | File[]): Promise<File[]> {
  const fileArray = Array.isArray(files) ? files : Array.from(files);
  const compressed = await Promise.all(fileArray.map((file) => compressImage(file)));
  return compressed;
}
