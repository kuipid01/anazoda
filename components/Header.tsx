"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Heart, Menu, Search, ShoppingBag, Trash2, UserRound, X } from "lucide-react";
import { useState, useEffect } from "react";
import { getCart, getWishlist, removeFromCart, removeFromWishlist, updateCartQuantity, addToCart, CartItem, WishlistItem } from "@/lib/cart";

// Brand tokens, consistent with Home / Consultation pages:
// bg #FDFBF7  ink #0B0A0D  purple #5B21A8  purple-soft #8B5CF6

const links = [
  { label: "Home", href: "/" },
  { label: "The House", href: "/about" },
  {
    label: "Collections", href: "/shop", children: [
      { label: "Shop All", href: "/shop" },
      { label: "Couture", href: "/shop?category=Couture" },
      { label: "Bridal", href: "/shop?category=Bridal" },
      { label: "Evening Wear", href: "/shop?category=Evening%20Wear" },
      { label: "Ready to Wear", href: "/shop?category=Ready%20to%20Wear" }
    ]
  },
  { label: "Pricing", href: "/pricing" },
  { label: "Consultation", href: "/consultation" },
  { label: "FAQ", href: "/faq" }
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  useEffect(() => {
    setCart(getCart());
    setWishlist(getWishlist());

    function handleCartUpdate() {
      setCart(getCart());
    }
    function handleWishlistUpdate() {
      setWishlist(getWishlist());
    }

    window.addEventListener("cart-updated", handleCartUpdate);
    window.addEventListener("wishlist-updated", handleWishlistUpdate);

    return () => {
      window.removeEventListener("cart-updated", handleCartUpdate);
      window.removeEventListener("wishlist-updated", handleWishlistUpdate);
    };
  }, []);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/shop?search=${encodeURIComponent(searchQuery.trim())}`;
      setMobileSearchOpen(false);
    }
  }

  return (
    <nav className="z-10 relative">
      <div className="bg-[#0B0A0D] z-10 relative text-white! text-[11px] tracking-[0.2em] uppercase px-4 md:px-8 py-2.5 flex items-center justify-between">
        <span className="mx-auto md:mx-0 font-medium">Designed to be remembered.</span>
        <span className="hidden md:flex items-center gap-2 text-white/70">
          Follow us: <b aria-label="Instagram" className="not-italic">◎</b>
        </span>
      </div>

      {/* MAIN HEADER — 3-column: nav left / logo centered / search + icons right */}
      <header className="relative bg-black/25 backdrop-blur-md border-b border-white/10">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center px-4 md:px-8 py-5 max-w-[1600px] mx-auto">
          {/* LEFT — desktop nav */}
          <div>
            <nav className="hidden lg:flex items-center gap-8">
              {links.filter((l) => l.label !== "Home").map((link) => (
                <div className="relative group" key={link.label}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-1 text-[11px] uppercase tracking-[0.18em] text-white! hover:text-[#8B5CF6] transition-colors"
                  >
                    {link.label}
                    {link.children && <span className="text-[9px] mt-[1px]">⌄</span>}
                  </Link>
                  {link.children && (
                    <div className="absolute left-0 top-full pt-4 hidden group-hover:block z-30">
                      <div className="bg-white border border-black/5 shadow-lg min-w-[190px] py-2">
                        {link.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className="block px-5 py-2.5 text-[11px] uppercase tracking-[0.14em] text-[#0B0A0D]/80 hover:text-[#5B21A8] hover:bg-[#FDFBF7]"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>

          {/* CENTER — logo */}
          <Link href="/" aria-label="House of Anazodo home" className="flex flex-col items-center justify-self-center">
            <span className="font-serif italic text-2xl text-white leading-none">PA</span>
            <small className="text-[9px] tracking-[0.3em] uppercase text-white mt-1">House of Anazodo</small>
          </Link>

          {/* RIGHT — inline search + icons (desktop) */}
          <div className="hidden lg:flex items-center justify-end gap-6">
            <form onSubmit={submitSearch} className="flex items-center border-b border-white/30 focus-within:border-[#8B5CF6] transition-colors">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-32 xl:w-44 bg-transparent outline-none text-[13px] tracking-wide text-white placeholder:text-white/50 py-1"
              />
              <button type="submit" aria-label="Search" className="text-white/70 hover:text-[#8B5CF6] transition-colors pl-2">
                <Search size={16} />
              </button>
            </form>

            <button onClick={() => setWishlistOpen(true)} aria-label="Wishlist" className="relative text-white! hover:text-[#8B5CF6] transition-colors">
              <Heart size={19} />
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#5B21A8] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>
            <Link href="/admin" aria-label="Admin Profile" className="text-white! hover:text-[#8B5CF6] transition-colors">
              <UserRound size={19} />
            </Link>
            <button onClick={() => setCartOpen(true)} aria-label="Cart" className="relative text-white hover:text-[#8B5CF6] transition-colors">
              <ShoppingBag size={19} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#5B21A8] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* MOBILE — search toggle + hamburger */}
          <div className="lg:hidden flex items-center gap-4 justify-self-end">
            <button onClick={() => setMobileSearchOpen(!mobileSearchOpen)} aria-label="Search" className="text-white">
              <Search size={20} />
            </button>
            <button aria-label="Open menu" onClick={() => setOpen(true)} className="text-white">
              <Menu size={22} />
            </button>
          </div>
        </div>

        {/* MOBILE SEARCH OVERLAY — inline bar unavailable on small screens, so this stays a dropdown */}
        {mobileSearchOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-[#FDFBF7] border-b border-black/10 px-4 py-4 z-30">
            <form className="flex items-center gap-3" onSubmit={submitSearch}>
              <Search size={18} className="text-[#0B0A0D]/50" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="flex-1 bg-transparent outline-none text-sm tracking-wide placeholder:text-[#0B0A0D]/40"
              />
              <button type="button" onClick={() => setMobileSearchOpen(false)} aria-label="Close Search" className="text-[#0B0A0D]">
                <X size={18} />
              </button>
            </form>
          </div>
        )}
      </header>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-[#d7af78] flex flex-col items-center pt-8 px-6 lg:hidden"
          >
            <button aria-label="Close menu" onClick={() => setOpen(false)} className="self-end text-[#0B0A0D]">
              <X size={24} />
            </button>
            <div className="font-serif italic text-3xl text-[#0B0A0D] mt-6 mb-10">PA</div>
            <nav className="w-full max-w-xs flex flex-col items-center gap-6">
              {links.map((link, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                  className="flex flex-col items-center gap-3"
                  key={link.label}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="text-sm uppercase tracking-[0.2em] text-[#0B0A0D]"
                  >
                    {link.label}
                  </Link>
                  {link.children?.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href}
                      onClick={() => setOpen(false)}
                      className="text-xs uppercase tracking-[0.15em] text-[#0B0A0D]/70 hover:text-[#0B0A0D]"
                    >
                      {child.label}
                    </Link>
                  ))}
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WISHLIST DRAWER */}
      {wishlistOpen && (
        <div className="fixed inset-0 z-50 bg-black/40" onClick={() => setWishlistOpen(false)}>
          <div
            className="absolute right-0 top-0 h-full w-full max-w-md bg-[#FDFBF7] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-black/10">
              <h2 className="font-serif text-lg">Your Wishlist ({wishlist.length})</h2>
              <button onClick={() => setWishlistOpen(false)} aria-label="Close Wishlist" className="text-[#0B0A0D]">
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-6">
              {wishlist.length === 0 ? (
                <p className="text-sm text-[#0B0A0D]/50">Your wishlist is empty.</p>
              ) : (
                <div className="flex flex-col gap-6">
                  {wishlist.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="relative w-20 h-24 bg-gray-100 shrink-0">
                        <Image src={item.imageUrl} alt={item.name} fill unoptimized className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm mb-1">
                          <Link href={`/shop/${item.slug}`} onClick={() => setWishlistOpen(false)} className="hover:text-[#5B21A8]">
                            {item.name}
                          </Link>
                        </h4>
                        <p className="text-sm text-[#5B21A8] font-medium mb-3">
                          {new Intl.NumberFormat("en-NG", { style: "currency", currency: item.currency, maximumFractionDigits: 0 }).format(item.price / 100)}
                        </p>
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => {
                              addToCart({ ...item });
                              removeFromWishlist(item.id);
                            }}
                            className="text-[10px] uppercase tracking-[0.15em] border border-[#0B0A0D] px-3 py-2 hover:bg-[#0B0A0D] hover:text-white transition-colors"
                          >
                            Add to Cart
                          </button>
                          <button
                            onClick={() => removeFromWishlist(item.id)}
                            aria-label="Remove from wishlist"
                            className="ml-auto text-[#0B0A0D]/40 hover:text-[#5B21A8]"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* CART DRAWER */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 bg-black/40" onClick={() => setCartOpen(false)}>
          <div
            className="absolute right-0 top-0 h-full w-full max-w-md bg-[#FDFBF7] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-black/10">
              <h2 className="font-serif text-lg">Shopping Cart ({cartCount})</h2>
              <button onClick={() => setCartOpen(false)} aria-label="Close Cart" className="text-[#0B0A0D]">
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-6">
              {cart.length === 0 ? (
                <p className="text-sm text-[#0B0A0D]/50">Your cart is empty.</p>
              ) : (
                <div className="flex flex-col gap-6">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="relative w-20 h-24 bg-gray-100 shrink-0">
                        <Image src={item.imageUrl} alt={item.name} fill unoptimized className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm mb-1">
                          <Link href={`/shop/${item.slug}`} onClick={() => setCartOpen(false)} className="hover:text-[#5B21A8]">
                            {item.name}
                          </Link>
                        </h4>
                        <p className="text-sm text-[#5B21A8] font-medium mb-3">
                          {new Intl.NumberFormat("en-NG", { style: "currency", currency: item.currency, maximumFractionDigits: 0 }).format(item.price / 100)}
                        </p>
                        <div className="flex items-center gap-3">
                          <button onClick={() => updateCartQuantity(item.id, item.quantity - 1)} className="w-6 h-6 border border-black/20 text-sm">-</button>
                          <span className="text-sm">{item.quantity}</span>
                          <button onClick={() => updateCartQuantity(item.id, item.quantity + 1)} className="w-6 h-6 border border-black/20 text-sm">+</button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            aria-label="Remove from cart"
                            className="ml-auto text-[#0B0A0D]/40 hover:text-[#5B21A8]"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {cart.length > 0 && (
              <div className="px-6 py-6 border-t border-black/10">
                <div className="flex justify-between items-center mb-5">
                  <span className="text-sm text-[#0B0A0D]/60">Subtotal</span>
                  <strong className="text-lg">
                    {new Intl.NumberFormat("en-NG", { style: "currency", currency: cart[0]?.currency || "NGN", maximumFractionDigits: 0 }).format(
                      cart.reduce((sum, item) => sum + item.price * item.quantity, 0) / 100
                    )}
                  </strong>
                </div>
                <Link
                  href="/consultation"
                  onClick={() => setCartOpen(false)}
                  className="block text-center bg-[#0B0A0D] text-white uppercase tracking-[0.2em] text-[11px] py-4 hover:bg-[#5B21A8] transition-colors"
                >
                  Proceed to Consultation
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}