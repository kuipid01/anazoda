import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

function href(page: number, params: Record<string, string | undefined>) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => { if (value) query.set(key, value); });
  if (page > 1) query.set("page", String(page));
  return `/shop${query.size ? `?${query}` : ""}`;
}

export default function ShopPagination({ page, totalPages, params }: { page: number; totalPages: number; params: Record<string, string | undefined> }) {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1).filter((value) => value === 1 || value === totalPages || Math.abs(value - page) <= 1);
  return <nav className="shop-pagination" aria-label="Product pages">
    {page > 1 && <Link href={href(page - 1, params)} aria-label="Previous page"><ChevronLeft /></Link>}
    {pages.map((value, index) => <span key={value}>
      {index > 0 && value - pages[index - 1] > 1 && <i>…</i>}
      <Link className={value === page ? "active" : ""} href={href(value, params)}>{value}</Link>
    </span>)}
    {page < totalPages && <Link href={href(page + 1, params)} aria-label="Next page"><ChevronRight /></Link>}
  </nav>;
}
