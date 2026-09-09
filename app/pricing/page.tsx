import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import WhatsAppButton from "@/components/WhatsAppButton";
import PricingGuide from "@/components/PricingGuide";
import { FadeIn, SlideUp } from "@/components/MotionWrappers";
import { getActivePricingItems } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Investment | House of Anazodo",
  description: "Explore the investment guidelines for House of Anazodo's bespoke and bridal couture."
};

export const dynamic = "force-dynamic";

export default async function PricingPage() {
  const items = await getActivePricingItems();

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

        <PricingGuide items={items} />

        <FadeIn delay={0.2} className="text-center mt-12 px-6">
          <Link href="/consultation" className="inline-block bg-[#0B0A0D] text-white! px-10 py-5 uppercase tracking-[0.2em] text-[11px] font-semibold hover:bg-[#d7af78] transition-colors">
            Begin Your Couture Journey
          </Link>
        </FadeIn>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
