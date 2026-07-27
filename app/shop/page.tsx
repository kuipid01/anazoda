import Link from "next/link";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import ShopControls from "@/components/ShopControls";
import ShopPagination from "@/components/ShopPagination";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getShopProducts, SHOP_PAGE_SIZE } from "@/lib/products";

export const dynamic = "force-dynamic";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;
const one = (value: string | string[] | undefined) => Array.isArray(value) ? value[0] : value;

export default async function ShopPage({ searchParams }: { searchParams: SearchParams }) {
  const raw = await searchParams;
  const category = one(raw.category);
  const sortValue = one(raw.sort);
  const sort = sortValue === "price-asc" || sortValue === "price-desc" || sortValue === "name" ? sortValue : "newest";
  const minPrice = Number(one(raw.min));
  const maxPrice = Number(one(raw.max));
  const requestedPage = Math.max(1, Number(one(raw.page)) || 1);
  const view = one(raw.view) === "list" ? "list" : "grid";
  const data = await getShopProducts({
    page: requestedPage, category, sort,
    minPrice: Number.isFinite(minPrice) && minPrice > 0 ? minPrice : undefined,
    maxPrice: Number.isFinite(maxPrice) && maxPrice > 0 ? maxPrice : undefined
  });
  const start = data.total ? (data.page - 1) * SHOP_PAGE_SIZE + 1 : 0;
  const end = Math.min(data.page * SHOP_PAGE_SIZE, data.total);
  const preserved = { category, sort: sort === "newest" ? undefined : sort, min: one(raw.min), max: one(raw.max), view: view === "list" ? "list" : undefined };

  return <><Header /><main className="shop-page">
    <div className="shop-toolbar">
      <p>{data.total ? `Showing ${start}–${end} of ${data.total} results` : "Showing 0 results"}</p>
      <ShopControls />
    </div>
    <div className="shop-layout">
      <aside className="shop-sidebar">
        <section><h2>Categories</h2><Link className={!category ? "active" : ""} href="/shop">All Products <span>({data.categories.reduce((sum, item) => sum + Number(item.value), 0)})</span></Link>
          {data.categories.map((item) => <Link className={category === item.name ? "active" : ""} key={item.name} href={`/shop?category=${encodeURIComponent(item.name)}`}>{item.name} <span>({item.value})</span></Link>)}
        </section>
        <section><h2>Price</h2><form className="price-filter">
          {category && <input type="hidden" name="category" value={category} />}
          {sort !== "newest" && <input type="hidden" name="sort" value={sort} />}
          <div><label>Minimum<input type="number" name="min" min="0" defaultValue={one(raw.min)} placeholder="₦0" /></label><label>Maximum<input type="number" name="max" min="0" defaultValue={one(raw.max)} placeholder="₦5,000,000" /></label></div>
          <button type="submit">Filter</button>
        </form></section>
        <section><h2>House</h2><p>Every piece is designed and handcrafted by House of Anazodo.</p></section>
      </aside>
      <section className="shop-results">
        {data.items.length ? <div className={`shop-product-grid ${view === "list" ? "list-view" : ""}`}>{data.items.map((product) => <ProductCard product={product} key={product.id} />)}</div>
          : <div className="collection-empty"><h2>No pieces match these filters.</h2><p>Reset the filters to explore the complete collection.</p><Link href="/shop">View all products</Link></div>}
        <ShopPagination page={data.page} totalPages={data.totalPages} params={preserved} />
      </section>
    </div>
  </main><Footer /><WhatsAppButton /></>;
}
