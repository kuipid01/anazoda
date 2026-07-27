import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import ProductGallery from "@/components/ProductGallery";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getProduct, getProductImages, getRelatedProducts } from "@/lib/products";

export const dynamic = "force-dynamic";
export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const product = await getProduct(slug); if (!product) notFound();
  const [related, images] = await Promise.all([
    getRelatedProducts(product.category, product.id),
    getProductImages(product.id, { imageUrl: product.imageUrl, imagePublicId: product.imagePublicId })
  ]);
  const price = new Intl.NumberFormat("en-NG", { style: "currency", currency: product.currency, maximumFractionDigits: 0 }).format(product.price / 100);
  return <><Header /><main className="product-page">
    <section className="product-detail">
      <ProductGallery images={images.map((image) => ({ id: image.id, imageUrl: image.imageUrl }))} name={product.name} />
      <section className="product-summary"><span className="stock">Available to order</span><span className="product-category">{product.category}</span><h1>{product.name}</h1><div className="detail-price">{price}</div><p>{product.description}</p>
        <small>Each piece is made with couture care. Availability and production times are confirmed during your consultation.</small>
        <Link href={`/consultation?product=${encodeURIComponent(product.slug)}`}>Make an enquiry</Link>
        <div className="product-meta"><span>Category:</span> {product.category}</div>
      </section>
    </section>
    <section className="product-reviews"><h2>Reviews <span>(0)</span></h2><div>There are no reviews yet.</div><p>Reviews will be available for verified House of Anazodo clients.</p></section>
    {related.length > 0 && <section className="related-products"><h2>Related products</h2><div>{related.map((item) => <ProductCard product={item} key={item.id} />)}</div></section>}
  </main><Footer /><WhatsAppButton /></>;
}
