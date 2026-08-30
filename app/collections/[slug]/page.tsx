import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import ProductGallery from "@/components/ProductGallery";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getProduct, getProductImages, getRelatedProducts } from "@/lib/products";
import ProductActions from "@/components/ProductActions";
import { FadeIn } from "@/components/MotionWrappers";

export const dynamic = "force-dynamic";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; 
  const product = await getProduct(slug); 
  if (!product) notFound();
  
  const [related, images] = await Promise.all([
    getRelatedProducts(product.category, product.id),
    getProductImages(product.id, { imageUrl: product.imageUrl, imagePublicId: product.imagePublicId })
  ]);
  
  const price = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(product.price / 100);

  return (
    <>
      <Header />
      <main className="bg-[#FDFBF7] min-h-screen pt-8 pb-32">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          
          {/* Breadcrumbs */}
          <div className="text-[9px] uppercase tracking-[0.15em] text-[#0B0A0D]/50 mb-10">
            <Link href="/" className="hover:text-[#0B0A0D]">Home</Link> / 
            <Link href="/shop" className="hover:text-[#0B0A0D] ml-1">Latest Resortwear Drop</Link> / 
            <span className="text-[#0B0A0D] ml-1">{product.name}</span>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 xl:gap-24 relative">
            
            {/* Left side: Images (Scrollable) */}
            <div className="flex-1 w-full lg:w-[60%]">
              <FadeIn>
                <ProductGallery 
                  images={images.map((img) => ({ id: img.id, imageUrl: img.imageUrl }))} 
                  name={product.name} 
                />
              </FadeIn>
            </div>

            {/* Right side: Product Info (Sticky) */}
            <div className="w-full lg:w-[35%] xl:w-[30%]">
              <div className="sticky top-12 pt-4">
                <FadeIn delay={0.1}>
                  <h1 className="font-serif italic text-4xl text-[#0B0A0D] mb-4">{product.name}</h1>
                  <div className="text-sm text-[#0B0A0D] mb-8">{price}</div>
                  
                  <p className="text-[13px] text-[#0B0A0D]/70 leading-relaxed font-light mb-10 pr-4">
                    Born under the sun, inspired by the sea — Anazodo creates timeless resortwear that celebrates freedom, femininity, and effortless elegance.
                  </p>

                  <ProductActions product={product} />
                </FadeIn>
              </div>
            </div>
          </div>
        </div>

        {/* You may also like */}
        {related.length > 0 && (
          <section className="mt-40 border-t border-black/10 pt-24 pb-12 max-w-[1600px] mx-auto px-4 md:px-8">
            <FadeIn>
              <h2 className="font-serif italic text-3xl text-center mb-16 text-[#0B0A0D]">You may also like</h2>
            </FadeIn>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
              {related.map((item, i) => (
                <FadeIn key={item.id} delay={i * 0.1}>
                  <ProductCard product={item} />
                </FadeIn>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
