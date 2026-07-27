import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getFeaturedProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

export default async function Home() {
  const featuredProducts = await getFeaturedProducts();
  return (
    <>
      <Header />
      <main>
        <section className="hero">
          <Image src="/images/portrait-1.jpg" alt="House of Anazodo couture" fill priority sizes="100vw" />
          <div className="hero-shade" />
          <div className="hero-content">
            <span>House of Anazodo</span>
            <h1>Designed to<br className="mobile-break" /> be remembered.</h1>
            <p>Luxury couture for life’s most unforgettable moments.</p>
            <Link href="/consultation">Book a consultation</Link>
          </div>
          <div className="hero-dots"><i /><i /><i /></div>
        </section>

        <section className="real-life" id="collections">
          <span>{featuredProducts.length ? "FEATURED PIECES" : "THE COLLECTION"}</span>
          <h2>{featuredProducts.length ? "Selected by the House" : "Couture in Motion"}</h2>
          <p>{featuredProducts.length ? "Discover signature pieces selected from our current collection." : "Sculptural silhouettes, impeccable tailoring and exquisite detailing."}</p>
          {featuredProducts.length ? <div className="featured-home-grid">{featuredProducts.map((product) => <ProductCard product={product} key={product.id} />)}</div> : <Gallery />}
        </section>

        <section className="academy-strip" id="academy">
          <div>
            <span>THE ANAZODO EXPERIENCE</span>
            <h2>Created for the woman who enters a room and owns it.</h2>
          </div>
          <Link href="/consultation">Begin your journey</Link>
        </section>

        <section className="faq-preview" id="faq">
          <span>COUTURE, MADE PERSONAL</span>
          <h2>Made for you, from first sketch to final fitting.</h2>
          <p>Every bespoke experience starts with a private conversation about your vision, event and personal style.</p><a className="text-link" href="/faq">Explore our client guide →</a>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
