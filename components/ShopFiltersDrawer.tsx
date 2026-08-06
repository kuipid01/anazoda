"use client";

import { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import Link from "next/link";

interface ShopFiltersDrawerProps {
  categories: Array<{ name: string; value: number }>;
  totalProductCount: number;
  activeCategory?: string;
  minPrice?: string;
  maxPrice?: string;
  sort?: string;
  search?: string;
}

export default function ShopFiltersDrawer({
  categories,
  totalProductCount,
  activeCategory,
  minPrice,
  maxPrice,
  sort,
  search
}: ShopFiltersDrawerProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile filter button */}
      <button 
        className="mobile-filter-trigger" 
        onClick={() => setOpen(true)}
      >
        <SlidersHorizontal size={14} /> Filter & Refine
      </button>

      {/* Sidebar container (regular sidebar on desktop, modal drawer on mobile) */}
      <aside className={`shop-sidebar ${open ? "mobile-open" : ""}`}>
        <div className="sidebar-header-mobile">
          <h3>Filter & Refine</h3>
          <button onClick={() => setOpen(false)} aria-label="Close filters">
            <X size={20} />
          </button>
        </div>

        <section>
          <h2>Categories</h2>
          <Link 
            className={!activeCategory ? "active" : ""} 
            href="/shop"
            onClick={() => setOpen(false)}
          >
            All Products <span>({totalProductCount})</span>
          </Link>
          {categories.map((item) => (
            <Link 
              className={activeCategory === item.name ? "active" : ""} 
              key={item.name} 
              href={`/shop?category=${encodeURIComponent(item.name)}`}
              onClick={() => setOpen(false)}
            >
              {item.name} <span>({item.value})</span>
            </Link>
          ))}
        </section>

        <section>
          <h2>Price</h2>
          <form className="price-filter" onSubmit={() => setOpen(false)}>
            {activeCategory && <input type="hidden" name="category" value={activeCategory} />}
            {sort && sort !== "newest" && <input type="hidden" name="sort" value={sort} />}
            {search && <input type="hidden" name="search" value={search} />}
            <div>
              <label>
                Minimum
                <input type="number" name="min" min="0" defaultValue={minPrice} placeholder="₦0" />
              </label>
              <label>
                Maximum
                <input type="number" name="max" min="0" defaultValue={maxPrice} placeholder="₦5,000,000" />
              </label>
            </div>
            <button type="submit">Apply Filter</button>
          </form>
        </section>

        <section>
          <h2>The House</h2>
          <p>Every piece is designed and handcrafted by House of Anazodo.</p>
        </section>
      </aside>
    </>
  );
}
