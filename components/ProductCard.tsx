import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/db/schema";

export default function ProductCard({ product }: { product: Product }) {
  const price = new Intl.NumberFormat("en-NG", { style: "currency", currency: product.currency, maximumFractionDigits: 0 }).format(product.price / 100);
  return (
    <Link className="product-card" href={`/shop/${product.slug}`}>
      <div><Image src={product.imageUrl} alt={product.name} fill sizes="(max-width: 700px) 100vw, 33vw" unoptimized /></div>
      <span>{product.category}</span><h2>{product.name}</h2><p>{price}</p>
    </Link>
  );
}
