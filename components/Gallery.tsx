"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Brand tokens, consistent site-wide: ink #0B0A0D  purple #5B21A8  purple-soft #8B5CF6

const looks = [
  { src: "/images/featured/featured-20.jpg", name: "Look 01" },
  { src: "/images/featured/featured-21.jpg", name: "Look 02" },
  { src: "/images/featured/featured-22.jpg", name: "Look 03" },
  { src: "/images/featured/featured-23.jpg", name: "Look 04" },
  { src: "/images/featured/featured-25.jpg", name: "Look 05" },
  { src: "/images/featured/featured-26.jpg", name: "Look 06" },
  { src: "/images/featured/featured-27.jpg", name: "Look 07" },
  { src: "/images/featured/featured-28.jpg", name: "Look 08" }
];

export default function Gallery() {
  const [start, setStart] = useState(0);
  const visible = [0, 1, 2, 3].map((offset) => looks[(start + offset) % looks.length]);

  return (
    <div className="w-full">
      {/* Edge-to-edge 4-up grid — no gap between columns, like the reference */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <AnimatePresence mode="popLayout">
          {visible.map((look, i) => (
            <motion.div
              key={`${look.src}-${i}-${start}`}
              layout
              initial={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative group"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-[#EAE6DF]">
                <Image
                  src={look.src}
                  alt={`Styled by House of Anazodo — ${look.name}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                {/* Purple undertone on hover instead of tinting the photo itself */}
                <div className="absolute inset-0 bg-[#5B21A8]/0 group-hover:bg-[#5B21A8]/10 transition-colors duration-500" />
              </div>
              <div className="pt-4 pb-2 text-left px-1">
                <p className="font-serif text-sm text-[#0B0A0D] group-hover:text-[#5B21A8] transition-colors">
                  {look.name}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Arrows + dots, centered under the grid */}
      <div className="flex items-center justify-center gap-6 mt-10">
        <button
          aria-label="Previous looks"
          onClick={() => setStart((v) => (v - 1 + looks.length) % looks.length)}
          className="text-[#0B0A0D]/60 hover:text-[#5B21A8] transition-colors"
        >
          <ChevronLeft size={18} />
        </button>
        <div className="flex items-center gap-2">
          {looks.map((_, i) => (
            <span
              key={i}
              className={`rounded-full transition-all duration-300 ${i === start ? "w-2 h-2 bg-[#5B21A8]" : "w-1.5 h-1.5 bg-[#0B0A0D]/20"
                }`}
            />
          ))}
        </div>
        <button
          aria-label="Next looks"
          onClick={() => setStart((v) => (v + 1) % looks.length)}
          className="text-[#0B0A0D]/60 hover:text-[#5B21A8] transition-colors"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}