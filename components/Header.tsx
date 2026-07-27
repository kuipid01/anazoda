"use client";

import Link from "next/link";
import { Heart, Menu, Search, ShoppingBag, UserRound, X } from "lucide-react";
import { useState } from "react";

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
  { label: "Consultation", href: "/consultation" },
  { label: "FAQ", href: "/faq" }
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="topbar">
        <span>USD⌄</span>
        <span>ENGLISH⌄</span>
        <strong>Designed to be remembered.</strong>
        <span className="follow">Follow us: <b aria-label="Instagram">◎</b></span>
      </div>
      <header className="header">
        <Link href="/" className="brand" aria-label="House of Anazodo home"><span className="brand-mark">PA</span><small>HOUSE OF ANAZODO</small></Link>
        <nav className="desktop-nav">
          {links.map((link, i) => (
            <div className={`nav-item ${link.children ? "has-dropdown" : ""}`} key={link.label}>
              <Link href={link.href}>{link.label}{i < 3 && <span>⌄</span>}</Link>
              {link.children && <div className="nav-dropdown">{link.children.map((child) => <Link key={child.label} href={child.href}>{child.label}</Link>)}</div>}
            </div>
          ))}
        </nav>
        <div className="header-actions">
          <Search />
          <UserRound />
          <Heart />
          <ShoppingBag />
        </div>
        <button className="menu-button" aria-label="Open menu" onClick={() => setOpen(true)}>
          <Menu />
        </button>
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
    </>
  );
}
