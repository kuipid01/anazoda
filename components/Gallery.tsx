"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const looks = Array.from({ length: 8 }, (_, i) => `/images/look-${i + 1}.jpg`);

export default function Gallery() {
  const [start, setStart] = useState(0);
  const visible = [0, 1, 2, 3].map((offset) => looks[(start + offset) % looks.length]);
  return (
    <div className="gallery-wrap">
      <button aria-label="Previous looks" onClick={() => setStart((v) => (v - 1 + looks.length) % looks.length)}><ChevronLeft /></button>
      <div className="gallery">
        {visible.map((src, i) => <Image key={`${src}-${i}`} src={src} alt="Styled by Layo look" width={720} height={720} />)}
      </div>
      <button aria-label="Next looks" onClick={() => setStart((v) => (v + 1) % looks.length)}><ChevronRight /></button>
      <div className="dots">{looks.map((_, i) => <span key={i} className={i === start ? "active" : ""} />)}</div>
    </div>
  );
}
