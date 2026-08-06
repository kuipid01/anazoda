"use client";

import { useState, useEffect } from "react";
import { Heart, ShoppingBag } from "lucide-react";
import { addToCart, toggleWishlist, isInWishlist } from "@/lib/cart";
import type { Product } from "@/lib/db/schema";
import Link from "next/link";

export default function ProductActions({ product }: { product: Product }) {
  const [inWishlist, setInWishlist] = useState(false);
  const [addedText, setAddedText] = useState(false);

  useEffect(() => {
    setInWishlist(isInWishlist(product.id));

    function handleWishlistUpdate() {
      setInWishlist(isInWishlist(product.id));
    }
    window.addEventListener("wishlist-updated", handleWishlistUpdate);
    return () => {
      window.removeEventListener("wishlist-updated", handleWishlistUpdate);
    };
  }, [product.id]);

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

  const handleToggleWishlist = () => {
    toggleWishlist({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      currency: product.currency,
      imageUrl: product.imageUrl,
      category: product.category
    });
  };

  return (
    <div className="product-actions-wrapper">
      <div className="action-buttons-row">
        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          <ShoppingBag size={18} />
          {addedText ? "Added to Cart" : "Add to Cart"}
        </button>
        <button className={`wishlist-btn ${inWishlist ? "active" : ""}`} onClick={handleToggleWishlist} aria-label="Toggle Wishlist">
          <Heart size={20} fill={inWishlist ? "var(--purple-bright)" : "none"} />
        </button>
      </div>
      <Link href={`/consultation?product=${encodeURIComponent(product.slug)}`} className="enquire-now-btn">
        Enquire Directly
      </Link>
    </div>
  );
}
