"use client";

import { useState } from "react";
import { Heart, Plus, Minus } from "lucide-react";
import { addToCart, toggleWishlist, isInWishlist } from "@/lib/cart";
import type { Product } from "@/lib/db/schema";

const SIZES = ["XS", "S", "M", "L", "XL"];
const COLORS = [
  { name: "Cream", hex: "#EAE6DF" },
  { name: "Camel", hex: "#d7af78" },
  { name: "Ink", hex: "#0B0A0D" }
];

export default function ProductActions({ product }: { product: Product }) {
  const [inWishlist, setInWishlist] = useState(false);
  const [addedText, setAddedText] = useState(false);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState(COLORS[1].name);
  
  const [openAccordion, setOpenAccordion] = useState<string | null>("shipping");

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      currency: product.currency,
      imageUrl: product.imageUrl,
      category: product.category
    });
    setAddedText(true);
    setTimeout(() => setAddedText(false), 2000);
  };

  return (
    <div className="w-full flex flex-col pt-8">
      {/* Size Selector */}
      <div className="mb-6">
        <div className="text-[10px] uppercase tracking-[0.15em] mb-3 text-[#0B0A0D]/70 font-semibold">Size:</div>
        <div className="flex flex-wrap gap-2">
          {SIZES.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`w-9 h-9 flex items-center justify-center text-xs tracking-wider transition-colors ${
                selectedSize === size 
                  ? "bg-[#0B0A0D] text-white" 
                  : "bg-transparent text-[#0B0A0D] border border-black/10 hover:border-black/30"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Color Selector */}
      <div className="mb-10">
        <div className="text-[10px] uppercase tracking-[0.15em] mb-3 text-[#0B0A0D]/70 font-semibold">Color:</div>
        <div className="flex gap-3">
          {COLORS.map((color) => (
            <button
              key={color.name}
              onClick={() => setSelectedColor(color.name)}
              className={`w-6 h-6 rounded-full border-2 transition-all ${
                selectedColor === color.name ? "border-[#0B0A0D] scale-110" : "border-transparent hover:scale-110"
              }`}
              style={{ backgroundColor: color.hex }}
              aria-label={color.name}
              title={color.name}
            />
          ))}
        </div>
      </div>

      {/* Add to Cart */}
      <div className="flex gap-3 mb-12">
        <button 
          className="flex-1 bg-[#d7af78] text-white uppercase tracking-[0.15em] text-[11px] font-semibold py-4 hover:bg-[#cba367] transition-colors"
          onClick={handleAddToCart}
        >
          {addedText ? "Added to Cart" : "Add to Cart"}
        </button>
        <button 
          className="w-12 h-12 flex items-center justify-center border border-black/10 hover:border-black/30 text-[#0B0A0D] transition-colors"
          onClick={() => {
            toggleWishlist(product as any);
            setInWishlist(!inWishlist);
          }}
          aria-label="Wishlist"
        >
          <Heart size={18} fill={inWishlist ? "#0B0A0D" : "none"} />
        </button>
      </div>

      {/* Accordions */}
      <div className="border-t border-black/10">
        {[
          { id: "shipping", title: "Shipping & Return", content: "Complimentary worldwide shipping on all couture orders. Given the bespoke nature of our pieces, returns are accepted within 14 days of delivery for store credit only." },
          { id: "design", title: "Design Notes", content: "Sculptural silhouettes met with impeccable tailoring. Every seam is finished by hand in our Lagos atelier." },
          { id: "fit", title: "Fit & Size Notes", content: "Designed for a relaxed yet tailored fit. We recommend taking your true size." },
          { id: "composition", title: "Composition & Care", content: "100% ethically sourced premium silk and raw cotton. Dry clean only. Iron on low heat if necessary." }
        ].map((item) => (
          <div key={item.id} className="border-b border-black/10">
            <button 
              className="w-full py-5 flex items-center justify-between text-[11px] uppercase tracking-[0.15em] font-semibold text-[#0B0A0D]"
              onClick={() => toggleAccordion(item.id)}
            >
              {item.title}
              {openAccordion === item.id ? <Minus size={14} /> : <Plus size={14} />}
            </button>
            <div 
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openAccordion === item.id ? "max-h-40 pb-5 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <p className="text-[13px] text-[#0B0A0D]/70 leading-relaxed pr-6">
                {item.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
