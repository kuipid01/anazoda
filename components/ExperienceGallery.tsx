"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { FadeIn } from "./MotionWrappers";

const images = [
  "/images/featured/featured-13.jpg",
  "/images/featured/featured-14.jpg",
  "/images/featured/featured-15.jpg",
  "/images/featured/featured-16.jpg",
  "/images/featured/featured-17.jpg",
  "/images/featured/featured-18.jpg",
];

export default function ExperienceGallery() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-transition every 10 seconds when lightbox is open
  useEffect(() => {
    if (!isOpen) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [isOpen]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => { document.body.style.overflow = "auto"; };
  }, [isOpen]);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section className="py-24 px-6 md:px-12 bg-[#FDFBF7]">
      <FadeIn className="max-w-[1400px] mx-auto text-center mb-12">
        <span className="uppercase tracking-[0.3em] text-[10px] text-[#5B21A8] mb-4 block font-semibold">
          BEHIND THE SCENES
        </span>
        <h2 className="font-serif text-3xl md:text-4xl font-light tracking-wide text-[#0B0A0D]">
          The Atelier
        </h2>
      </FadeIn>

      {/* 2-Column Grid */}
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <FadeIn delay={0.1}><div className="relative aspect-[4/5] md:aspect-square overflow-hidden cursor-pointer group" onClick={() => { setCurrentIndex(0); setIsOpen(true); }}>
          <Image 
            src={images[0]} 
            alt="Atelier Preview 1" 
            fill 
            className="object-cover transition-transform duration-1000 group-hover:scale-105" 
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
        </div></FadeIn>
        
        <FadeIn delay={0.2}><div className="relative aspect-[4/5] md:aspect-square overflow-hidden cursor-pointer group" onClick={() => { setCurrentIndex(1); setIsOpen(true); }}>
          <Image 
            src={images[1]} 
            alt="Atelier Preview 2" 
            fill 
            className="object-cover transition-transform duration-1000 group-hover:scale-105" 
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
        </div></FadeIn>
      </div>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
            onClick={() => setIsOpen(false)}
          >
            {/* Close Button */}
            <button 
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-50 p-2"
              onClick={() => setIsOpen(false)}
            >
              <X size={32} strokeWidth={1} />
            </button>

            {/* Prev Button */}
            <button 
              className="absolute left-4 md:left-12 text-white/50 hover:text-white transition-colors z-50 p-4"
              onClick={handlePrev}
            >
              <ChevronLeft size={48} strokeWidth={1} />
            </button>

            {/* Next Button */}
            <button 
              className="absolute right-4 md:right-12 text-white/50 hover:text-white transition-colors z-50 p-4"
              onClick={handleNext}
            >
              <ChevronRight size={48} strokeWidth={1} />
            </button>

            {/* Image Container with Soft Crossfade */}
            <div className="relative w-full h-full max-w-6xl max-h-[85vh] mx-auto px-16 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 1.02, filter: "blur(4px)", position: "absolute" }}
                  transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
                  className="relative w-full h-full"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Image 
                    src={images[currentIndex]} 
                    alt={`Atelier ${currentIndex + 1}`} 
                    fill 
                    className="object-contain"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Progress indicators */}
            <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 z-50">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setCurrentIndex(i); }}
                  className={`h-1 rounded-full transition-all duration-500 ${i === currentIndex ? 'w-8 bg-white' : 'w-2 bg-white/30'}`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
