import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import WhatsAppButton from "@/components/WhatsAppButton";
import { FadeIn, SlideUp } from "@/components/MotionWrappers";

export const metadata: Metadata = {
  title: "Investment | House of Anazodo",
  description: "Explore the investment guidelines for House of Anazodo's bespoke and bridal couture."
};

export default function PricingPage() {
  return (
    <>
      <Header />
      <main className="bg-[#FDFBF7] min-h-screen pb-32">
        {/* HERO SECTION */}
        <section className="pt-24 pb-16 px-6 md:px-12 text-center bg-[#EAE6DF] border-b border-[#d7af78]/30">
          <SlideUp className="max-w-3xl mx-auto">
            <span className="uppercase tracking-[0.3em] text-[10px] text-[#5B21A8] mb-6 block font-semibold">
              INVESTMENT
            </span>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-light mb-8 text-[#0B0A0D] tracking-wide">
              Pricing <span className="italic text-[#5B21A8]">Guide</span>
            </h1>
            <p className="text-[#0B0A0D]/70 text-sm md:text-base leading-relaxed font-light max-w-2xl mx-auto">
              Our bespoke creations are individually priced according to their level of craftsmanship, design complexity, and embellishment.
            </p>
          </SlideUp>
        </section>

        <section className="max-w-[1000px] mx-auto px-6 md:px-12 pt-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            <FadeIn>
              <div className="p-10 border border-[#d7af78]/30 bg-[#FDFBF7] h-full flex flex-col">
                <h2 className="text-2xl font-serif mb-8 border-b border-[#d7af78]/30 pb-4 text-[#0B0A0D]">Starting Investment</h2>
                <ul className="space-y-6 flex-1">
                  <li className="flex justify-between items-end border-b border-[#d7af78]/30 pb-3 border-dashed">
                    <span className="text-[#0B0A0D]/80 font-medium text-lg">Bespoke Couture</span>
                    <span className="text-[#5B21A8] font-semibold text-right">From $1,500 <br/><span className="text-xs text-[#0B0A0D]/50">(₦1,500,000)</span></span>
                  </li>
                  <li className="flex justify-between items-end border-b border-[#d7af78]/30 pb-3 border-dashed">
                    <span className="text-[#0B0A0D]/80 font-medium text-lg">Fully Hand-Beaded</span>
                    <span className="text-[#5B21A8] font-semibold text-right">From $5,000 <br/><span className="text-xs text-[#0B0A0D]/50">(₦7,760,000)</span></span>
                  </li>
                  <li className="flex justify-between items-end border-b border-[#d7af78]/30 pb-3 border-dashed">
                    <span className="text-[#0B0A0D]/80 font-medium text-lg">Bridal Couture</span>
                    <span className="text-[#5B21A8] font-semibold text-right">From $3,000</span>
                  </li>
                </ul>
                <p className="mt-10 text-xs text-[#0B0A0D]/60 italic leading-relaxed">
                  * A detailed quotation is provided following your consultation. To preserve the privacy and exclusivity of our clientele, we do not disclose the prices of previously commissioned garments. Consultation fees are required to secure an appointment.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="p-10 border border-[#d7af78]/30 bg-white h-full flex flex-col">
                <h2 className="text-2xl font-serif mb-8 border-b border-[#d7af78]/30 pb-4 text-[#0B0A0D]">Payment Policy</h2>
                <div className="space-y-8 text-[#0B0A0D]/80 flex-1 pt-4">
                  <div className="flex gap-6 items-start">
                    <div className="text-[#d7af78] font-serif text-4xl">80<span className="text-2xl">%</span></div>
                    <p className="pt-2 text-sm leading-relaxed">Deposit is required before production begins.</p>
                  </div>
                  <div className="flex gap-6 items-start">
                    <div className="text-[#d7af78] font-serif text-4xl">20<span className="text-2xl">%</span></div>
                    <p className="pt-2 text-sm leading-relaxed">Remaining balance must be paid in full before collection or delivery.</p>
                  </div>
                </div>
                <p className="mt-10 text-xs text-[#0B0A0D]/60 border-t border-[#d7af78]/30 pt-6">
                  We accept payments in Nigerian Naira.
                </p>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.2} className="text-center mt-12">
            <Link href="/consultation" className="inline-block bg-[#0B0A0D] text-white px-10 py-5 uppercase tracking-[0.2em] text-[11px] font-semibold hover:bg-[#d7af78] transition-colors">
              Begin Your Couture Journey
            </Link>
          </FadeIn>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
