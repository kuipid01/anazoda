"use client";

import Image from "next/image";
import { useState } from "react";

type GalleryImage = { id: string; imageUrl: string };

export default function ProductGallery({ images, name }: { images: GalleryImage[]; name: string }) {
  const [active, setActive] = useState(0);
  return <div className="product-gallery">
    <div className="product-thumbnails">
      {images.map((image, index) => <button className={active === index ? "active" : ""} key={image.id} onClick={() => setActive(index)} aria-label={`View image ${index + 1} of ${name}`}>
        <Image src={image.imageUrl} alt="" fill sizes="90px" unoptimized />
      </button>)}
    </div>
    <div className="product-detail-image"><Image src={images[active].imageUrl} alt={`${name} — image ${active + 1}`} fill sizes="(max-width: 900px) 100vw, 55vw" unoptimized priority /></div>
  </div>;
}
