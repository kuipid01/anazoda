"use client";

import { Grid2X2, List } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function ShopControls() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const view = params.get("view") === "list" ? "list" : "grid";

  function update(key: string, value: string, defaultValue: string) {
    const next = new URLSearchParams(params.toString());
    value === defaultValue ? next.delete(key) : next.set(key, value);
    next.delete("page");
    router.push(`${pathname}?${next.toString()}`);
  }

  return (
    <div className="shop-controls">
      <button className={view === "grid" ? "active" : ""} onClick={() => update("view", "grid", "grid")} aria-label="Grid view"><Grid2X2 /></button>
      <button className={view === "list" ? "active" : ""} onClick={() => update("view", "list", "grid")} aria-label="List view"><List /></button>
      <select value={params.get("sort") || "newest"} onChange={(event) => update("sort", event.target.value, "newest")} aria-label="Sort products">
        <option value="newest">Default sorting</option>
        <option value="price-asc">Price: low to high</option>
        <option value="price-desc">Price: high to low</option>
        <option value="name">Name</option>
      </select>
    </div>
  );
}
