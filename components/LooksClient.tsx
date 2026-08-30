"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { FadeIn } from "@/components/MotionWrappers";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { Look } from "@/lib/db/schema";

export default function LooksClient({ looks }: { looks: Look[] }) {
  const [activeLookId, setActiveLookId] = useState<string | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const activeLook = looks.find((l) => l.id === activeLookId);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!activeLook) return;
    if (e.key === "Escape") setActiveLookId(null);
    if (e.key === "ArrowLeft") {
      setActiveImageIndex((prev) => Math.max(0, prev - 1));
    }
    if (e.key === "ArrowRight") {
      setActiveImageIndex((prev) => Math.min(activeLook.images.length - 1, prev + 1));
    }
  }, [activeLook]);

  useEffect(() => {
    if (activeLookId) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeLookId, handleKeyDown]);

  const openLightbox = (lookId: string) => {
    setActiveLookId(lookId);
    setActiveImageIndex(0);
  };

  return (
    <>
      <div className="flex overflow-x-auto gap-6 md:gap-10 pb-12 snap-x snap-mandatory hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {looks.map((look, i) => (
          <FadeIn key={look.id} delay={i * 0.1} className="snap-start shrink-0 w-[80vw] md:w-[400px] lg:w-[450px]">
            <div 
              className="relative aspect-[3/4] bg-white group overflow-hidden mb-6 cursor-pointer"
              onClick={() => openLightbox(look.id)}
            >
              {look.images?.[0]?.url && (
                <Image
                  src={look.images[0].url}
                  alt={look.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  sizes="(max-width: 768px) 80vw, 450px"
                />
              )}
              {look.images?.length > 1 && (
                <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 text-[10px] uppercase tracking-widest font-semibold z-10">
                  {look.images.length} Images
                </div>
              )}
            </div>
            <span className="uppercase tracking-[0.2em] text-[10px] text-[#5B21A8] mb-2 block font-medium">
              {look.category}
            </span>
            <h3 className="font-serif text-xl md:text-2xl text-[#0B0A0D] mb-2">{look.title}</h3>
            {look.priceRange && (
              <p className="text-gray-500 text-sm uppercase tracking-widest">
                {look.priceRange}
              </p>
            )}
          </FadeIn>
        ))}
      </div>

      {activeLook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B0A0D]/95 backdrop-blur-sm" onClick={() => setActiveLookId(null)}>
          <button 
            className="absolute top-6 right-6 text-white hover:text-[#d7af78] transition"
            onClick={() => setActiveLookId(null)}
          >
            <X size={32} strokeWidth={1} />
          </button>
          
          {activeLook.images.length > 1 && (
            <button 
              className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 text-white hover:text-[#d7af78] transition disabled:opacity-20 disabled:cursor-not-allowed"
              onClick={(e) => { e.stopPropagation(); setActiveImageIndex((prev) => Math.max(0, prev - 1)); }}
              disabled={activeImageIndex === 0}
            >
              <ChevronLeft size={48} strokeWidth={1} />
            </button>
          )}

          <div className="relative w-[90vw] max-w-4xl h-[70vh] md:h-[85vh] flex flex-col items-center justify-center pointer-events-none">
            <div className="relative w-full h-full mb-8">
              <Image
                src={activeLook.images[activeImageIndex].url}
                alt={`${activeLook.title} - Image ${activeImageIndex + 1}`}
                fill
                className="object-contain pointer-events-auto"
                sizes="(max-width: 1024px) 100vw, 1024px"
                priority
              />
            </div>
            <div className="absolute bottom-[-30px] left-0 right-0 text-center pointer-events-auto">
              <h3 className="text-white font-serif text-2xl md:text-3xl tracking-wide">{activeLook.title}</h3>
              {activeLook.images.length > 1 && (
                <div className="flex items-center justify-center gap-2 mt-4">
                  {activeLook.images.map((_, idx) => (
                    <div 
                      key={idx} 
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${idx === activeImageIndex ? 'bg-[#d7af78] w-6' : 'bg-white/40'}`} 
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {activeLook.images.length > 1 && (
            <button 
              className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 text-white hover:text-[#d7af78] transition disabled:opacity-20 disabled:cursor-not-allowed"
              onClick={(e) => { e.stopPropagation(); setActiveImageIndex((prev) => Math.min(activeLook.images.length - 1, prev + 1)); }}
              disabled={activeImageIndex === activeLook.images.length - 1}
            >
              <ChevronRight size={48} strokeWidth={1} />
            </button>
          )}
        </div>
      )}
    </>
  );
}
