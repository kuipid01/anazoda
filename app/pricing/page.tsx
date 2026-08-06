import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Pricing Guide | House of Anazodo",
  description: "Explore the pricing guidelines for House of Anazodo's bespoke couture, including civil dresses, traditional attire, reception gowns, and hand-beaded creations."
};

export default function PricingPage() {
  return (
    <>
      <Header />
      <main className="pricing-page">
        <div className="page-hero dark">
          <span>ATELIER SERVICES</span>
          <h1>Our Pricing Guide</h1>
          <p>Transparent pricing guidelines for our custom couture garments handcrafted in Lagos.</p>
        </div>
        
        <section className="pricing-content">
          <div className="pricing-grid">
            <article className="pricing-card">
              <h3>Traditional Dresses</h3>
              <div className="price-tag">From ₦1,500,000 & above</div>
              <p>Meticulously tailored traditional attire featuring exquisite finishes and custom design options tailored to celebrate rich cultural heritage.</p>
              <div className="note">
                <strong>N/B:</strong> This is the price for tailoring only (fabric exclusive) and can increase depending on the style of your dress.
              </div>
            </article>

            <article className="pricing-card">
              <h3>Reception & Evening Gowns</h3>
              <div className="price-tag">From ₦1,500,000 & above</div>
              <p>Stunning, head-turning gowns designed to command attention at your reception or evening event. Handcrafted to your measurements.</p>
              <div className="note">
                <strong>N/B:</strong> Fabric and tailoring are inclusive. Tailoring-only options range from ₦1,000,000 & above depending on the design style.
              </div>
            </article>

            <article className="pricing-card">
              <h3>Aso-Oke Dresses</h3>
              <div className="price-tag">From ₦2,000,000 & above</div>
              <p>Stately and regal custom-made Aso-Oke ensembles. Features traditional luxury textures infused with modern couture silhouettes.</p>
              <div className="note">
                <strong>N/B:</strong> Custom fabric and tailoring are inclusive. This dress comes with a custom fan and a veil if needed.
              </div>
            </article>

            <article className="pricing-card">
              <h3>Civil Dress</h3>
              <div className="price-tag">From ₦800,000 & above</div>
              <p>Clean, sophisticated silhouettes designed for modern civil ceremonies. Elegant tailoring with minimal, luxurious finishes.</p>
              <div className="note">
                <strong>N/B:</strong> Fabric and tailoring are inclusive. This dress comes with a custom veil.
              </div>
            </article>
          </div>

          <div className="pricing-additional">
            <div>
              <h3>Special Commissions & Hand Beading</h3>
              <p>
                <strong>Fully Hand-Beaded Dresses:</strong> Gowns without fabrics, featuring beads on a bare bodice from base to finish, start from <strong>₦4,000,000 & above</strong> due to the intensive labor and couture techniques involved.
              </p>
              <p>
                <strong>Multi-Dress Discount:</strong> We are pleased to guarantee a discount if we create more than two dresses for the same client.
              </p>
            </div>
            <div className="cta-container">
              <Link href="/consultation" id="btn-book-pricing-cta">Book a Consultation</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
