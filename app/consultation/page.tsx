import Image from "next/image";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ConsultationForm from "@/components/ConsultationForm";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getProduct } from "@/lib/products";

export const dynamic = "force-dynamic";

export default async function ConsultationPage({ searchParams }: { searchParams: Promise<{ product?: string | string[] }> }) {
  const rawProduct = (await searchParams).product;
  const slug = Array.isArray(rawProduct) ? rawProduct[0] : rawProduct;
  const product = slug ? await getProduct(slug) : null;
  const selectedProduct = product ? {
    name: product.name,
    price: new Intl.NumberFormat("en-NG", { style: "currency", currency: product.currency, maximumFractionDigits: 0 }).format(product.price / 100)
  } : null;
  return (
    <>
      <Header />
      <main>
        <section className="consult-intro">
          <span>PRIVATE APPOINTMENTS</span>
          <h1>Begin Your Couture Journey</h1>
          <div className="consult-grid">
            <div className="consult-image"><Image src="/images/portrait-2.jpg" alt="Styled by Layo creative director" fill sizes="(max-width: 900px) 100vw, 50vw" /></div>
            <div className="consult-copy">
              <p>Every House of Anazodo commission begins with an exclusive one-on-one consultation with our creative team.</p>
              <p>Your session can be held physically at our Lekki studio or virtually. We will explore your dream outfit, share recommendations and create a direction that brings your vision to life.</p>
              <p>Production timelines typically range between 7–18 weeks depending on the intricacy of your design and embellishments. You’ll receive updates throughout the process.</p>
              <ul>
                <li>Tell us about your event and dream design.</li>
                <li>Choose a physical or virtual consultation.</li>
                <li>Continue the conversation directly on WhatsApp.</li>
              </ul>
              <a href="#consultation-form">Book now</a>
            </div>
          </div>
        </section>
        <ConsultationForm selectedProduct={selectedProduct} />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
