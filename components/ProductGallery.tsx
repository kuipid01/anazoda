"use client";

import Image from "next/image";


type GalleryImage = { id: string; imageUrl: string };

export default function ProductGallery({ images, name }: { images: GalleryImage[]; name: string }) {
  if (!images || images.length === 0) return null;

  return (
    <div className="flex flex-col gap-2 md:gap-4 w-full">
      {/* Primary Image - Massive */}
      <div className="relative w-full aspect-[3/4] bg-[#FDFBF7]">
        <Image 
          src={images[0].imageUrl} 
          alt={`${name} — Main`} 
          fill 
          sizes="(max-width: 900px) 100vw, 55vw" 
          unoptimized 
          priority 
          className="object-cover"
        />
      </div>
      
      {/* Secondary Images - Grid */}
      {images.length > 1 && (
        <div className="grid grid-cols-2 gap-2 md:gap-4">
          {images.slice(1).map((image, i) => (
            <div key={image.id} className="relative w-full aspect-[3/4] bg-[#FDFBF7]">
              <Image 
                src={image.imageUrl} 
                alt={`${name} — Detail ${i + 1}`} 
                fill 
                sizes="(max-width: 900px) 50vw, 25vw" 
                unoptimized 
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
