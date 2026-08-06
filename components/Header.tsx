"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, Menu, Search, ShoppingBag, UserRound, X } from "lucide-react";
import { useState, useEffect } from "react";
import { getCart, getWishlist, removeFromCart, removeFromWishlist, updateCartQuantity, addToCart, CartItem, WishlistItem } from "@/lib/cart";

const links = [
  { label: "Home", href: "/" },
  { label: "The House", href: "/about" },
  { label: "Collections", href: "/shop", children: [
    { label: "Shop All", href: "/shop" },
    { label: "Couture", href: "/shop?category=Couture" },
    { label: "Bridal", href: "/shop?category=Bridal" },
    { label: "Evening Wear", href: "/shop?category=Evening%20Wear" },
    { label: "Ready to Wear", href: "/shop?category=Ready%20to%20Wear" }
  ] },
  { label: "Pricing", href: "/pricing" },
  { label: "Consultation", href: "/consultation" },
  { label: "FAQ", href: "/faq" }
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
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

  return (
    <>
      <div className="topbar">
        <strong>Designed to be remembered.</strong>
        <span className="follow">Follow us: <b aria-label="Instagram">◎</b></span>
      </div>
      <header className="header" style={{ position: "relative" }}>
        <Link href="/" className="brand" aria-label="House of Anazodo home"><span className="brand-mark">PA</span><small>HOUSE OF ANAZODO</small></Link>
        <nav className="desktop-nav">
          {links.map((link) => (
            <div className={`nav-item ${link.children ? "has-dropdown" : ""}`} key={link.label}>
              <Link href={link.href}>{link.label}{link.children && <span>⌄</span>}</Link>
              {link.children && <div className="nav-dropdown">{link.children.map((child) => <Link key={child.label} href={child.href}>{child.label}</Link>)}</div>}
            </div>
          ))}
        </nav>
        <div className="header-actions">
          <button onClick={() => setSearchOpen(!searchOpen)} aria-label="Search"><Search /></button>
          <Link href="/admin" aria-label="Admin Profile"><UserRound /></Link>
          <button onClick={() => setWishlistOpen(true)} aria-label="Wishlist">
            <Heart />
            {wishlist.length > 0 && <span className="badge">{wishlist.length}</span>}
          </button>
          <button onClick={() => setCartOpen(true)} aria-label="Cart">
            <ShoppingBag />
            {cart.reduce((sum, item) => sum + item.quantity, 0) > 0 && (
              <span className="badge">{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
            )}
          </button>
        </div>
        <button className="menu-button" aria-label="Open menu" onClick={() => setOpen(true)}>
          <Menu />
        </button>

        {searchOpen && (
          <div className="search-bar-overlay">
            <form onSubmit={(e) => {
              e.preventDefault();
              if (searchQuery.trim()) {
                window.location.href = `/shop?search=${encodeURIComponent(searchQuery.trim())}`;
                setSearchOpen(false);
              }
            }}>
              <input
                type="text"
                placeholder="Search our collection..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <button type="submit" aria-label="Search"><Search /></button>
              <button type="button" onClick={() => setSearchOpen(false)} aria-label="Close Search"><X /></button>
            </form>
          </div>
        )}
      </header>

      {open && (
        <div className="mobile-drawer">
          <button aria-label="Close menu" onClick={() => setOpen(false)}><X /></button>
          <div className="brand-mark">PA</div>
          <nav>
            {links.map((link) => <div className="mobile-nav-group" key={link.label}><Link href={link.href} onClick={() => setOpen(false)}>{link.label}</Link>{link.children?.map((child) => <Link className="mobile-sub-link" key={child.label} href={child.href} onClick={() => setOpen(false)}>{child.label}</Link>)}</div>)}
          </nav>
        </div>
      )}

      {/* Wishlist Drawer */}
      {wishlistOpen && (
        <div className="side-drawer-overlay" onClick={() => setWishlistOpen(false)}>
          <div className="side-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <h2>Your Wishlist ({wishlist.length})</h2>
              <button onClick={() => setWishlistOpen(false)} aria-label="Close Wishlist"><X /></button>
            </div>
            <div className="drawer-content">
              {wishlist.length === 0 ? (
                <p className="empty-message">Your wishlist is empty.</p>
              ) : (
                <div className="drawer-items">
                  {wishlist.map((item) => (
                    <div key={item.id} className="drawer-item">
                      <div className="item-img">
                        <Image src={item.imageUrl} alt={item.name} fill unoptimized />
                      </div>
                      <div className="item-details">
                        <h4><Link href={`/shop/${item.slug}`} onClick={() => setWishlistOpen(false)}>{item.name}</Link></h4>
                        <p className="item-price">
                          {new Intl.NumberFormat("en-NG", { style: "currency", currency: item.currency, maximumFractionDigits: 0 }).format(item.price / 100)}
                        </p>
                        <div className="item-actions">
                          <button onClick={() => {
                            addToCart({ ...item });
                            removeFromWishlist(item.id);
                          }}>Add to Cart</button>
                          <button onClick={() => removeFromWishlist(item.id)} className="text-remove">Remove</button>
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

      {/* Cart Drawer */}
      {cartOpen && (
        <div className="side-drawer-overlay" onClick={() => setCartOpen(false)}>
          <div className="side-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <h2>Shopping Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})</h2>
              <button onClick={() => setCartOpen(false)} aria-label="Close Cart"><X /></button>
            </div>
            <div className="drawer-content">
              {cart.length === 0 ? (
                <p className="empty-message">Your cart is empty.</p>
              ) : (
                <>
                  <div className="drawer-items">
                    {cart.map((item) => (
                      <div key={item.id} className="drawer-item">
                        <div className="item-img">
                          <Image src={item.imageUrl} alt={item.name} fill unoptimized />
                        </div>
                        <div className="item-details">
                          <h4><Link href={`/shop/${item.slug}`} onClick={() => setCartOpen(false)}>{item.name}</Link></h4>
                          <p className="item-price">
                            {new Intl.NumberFormat("en-NG", { style: "currency", currency: item.currency, maximumFractionDigits: 0 }).format(item.price / 100)}
                          </p>
                          <div className="item-qty">
                            <button onClick={() => updateCartQuantity(item.id, item.quantity - 1)}>-</button>
                            <span>{item.quantity}</span>
                            <button onClick={() => updateCartQuantity(item.id, item.quantity + 1)}>+</button>
                            <button onClick={() => removeFromCart(item.id)} className="text-remove" style={{ marginLeft: 'auto' }}>Remove</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="drawer-footer">
                    <div className="subtotal">
                      <span>Subtotal</span>
                      <strong>
                        {new Intl.NumberFormat("en-NG", { style: "currency", currency: cart[0]?.currency || "NGN", maximumFractionDigits: 0 }).format(
                          cart.reduce((sum, item) => sum + item.price * item.quantity, 0) / 100
                        )}
                      </strong>
                    </div>
                    <Link href="/consultation" onClick={() => setCartOpen(false)} className="checkout-btn">
                      Proceed to Consultation
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
