import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Investment | House of Anazodo",
  description: "Explore the investment guidelines for House of Anazodo's bespoke and bridal couture."
};

export default function PricingPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen py-16 px-6 md:px-20 lg:px-32 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[#5B21A8] font-semibold tracking-widest text-xs uppercase block mb-4">Investment</span>
          <h1 className="text-4xl md:text-6xl font-medium font-serif">Pricing Guide</h1>
          <p className="mt-6 text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">
            Our bespoke creations are individually priced according to their level of craftsmanship, design complexity, and embellishment.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div className="bg-gray-50 p-10 border border-gray-100 shadow-sm">
            <h2 className="text-2xl font-serif mb-6 border-b border-gray-200 pb-4">Starting Investment</h2>
            <ul className="space-y-6">
              <li className="flex justify-between items-end border-b border-gray-200 pb-2 border-dashed">
                <span className="text-gray-700 font-medium text-lg">Bespoke Couture</span>
                <span className="text-[#8B5CF6] font-semibold">From $1,500 (₦1,500,000)</span>
              </li>
              <li className="flex justify-between items-end border-b border-gray-200 pb-2 border-dashed">
                <span className="text-gray-700 font-medium text-lg">Fully Hand-Beaded Couture</span>
                <span className="text-[#8B5CF6] font-semibold">From $5,000 (₦7,760,000)</span>
              </li>
              <li className="flex justify-between items-end border-b border-gray-200 pb-2 border-dashed">
                <span className="text-gray-700 font-medium text-lg">Bridal Couture</span>
                <span className="text-[#8B5CF6] font-semibold">From $3,000</span>
              </li>
            </ul>
            <p className="mt-8 text-sm text-gray-500 italic leading-relaxed">
              * A detailed quotation is provided following your consultation. To preserve the privacy and exclusivity of our clientele, we do not disclose the prices of previously commissioned garments. Consultation fees are required to secure an appointment.
            </p>
          </div>

          <div className="bg-white p-10 border border-gray-100 shadow-sm">
            <h2 className="text-2xl font-serif mb-6 border-b border-gray-200 pb-4">Payment Policy</h2>
            <div className="space-y-6 text-gray-700">
              <div className="flex gap-4">
                <div className="text-[#5B21A8] font-bold text-xl">80%</div>
                <p>Deposit is required before production begins.</p>
              </div>
              <div className="flex gap-4">
                <div className="text-[#5B21A8] font-bold text-xl">20%</div>
                <p>Remaining balance must be paid in full before collection or delivery.</p>
              </div>
              <p className="mt-6 text-sm text-gray-500 border-t border-gray-100 pt-4">
                We accept payments in Nigerian Naira.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link href="/consultation" className="inline-block border border-black bg-black text-white px-8 py-4 uppercase tracking-widest text-xs font-semibold hover:bg-[#8B5CF6] hover:border-[#8B5CF6] hover:text-white transition-colors">
            Begin Your Couture Journey
          </Link>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
