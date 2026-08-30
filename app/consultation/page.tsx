"use client"
import Image from "next/image";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ConsultationForm from "@/components/ConsultationForm";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getProduct } from "@/lib/products";

export const dynamic = "force-dynamic";

// Brand palette, sourced from packaging (box: black + glitter amethyst-purple + white)
// brand-ink:    #0B0A0D  (near-black, matches box)
// brand-purple: #5B21A8  (deep amethyst — replaces generic Tailwind purple-700)
// brand-purple-soft: #8B5CF6 (lighter accent for hovers / secondary text)

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
      <main className="min-h-screen py-16 px-6 md:px-20 lg:px-32 max-w-6xl mx-auto bg-white">
        <section className="mb-20 text-center">
          <span className="text-[#5B21A8] font-semibold tracking-[0.25em] text-xs uppercase block mb-4">
            Private Appointments
          </span>
          <h1 className="text-4xl md:text-6xl font-medium font-serif mb-6 text-[#0B0A0D]">
            Consultation &amp; Services
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Every bespoke commission begins with a private consultation.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
          {/* Standard Consultation */}
          <div>
            <h2 className="text-2xl font-serif mb-6 border-b-2 border-[#5B21A8]/20 pb-4 text-[#0B0A0D]">
              Standard Consultation
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed mb-6">
              <p>
                Each consultation lasts approximately 40 minutes and is tailored to
                understanding your vision, event, style preferences, and garment
                requirements.
              </p>
              <p>Consultations may be conducted via:</p>
              <ul className="space-y-2 text-gray-600">
                {["WhatsApp", "FaceTime", "WhatsApp Video", "Email", "In-person (by appointment)"].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5B21A8]" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="font-medium text-[#0B0A0D] mt-6 pt-4 border-t border-gray-100">
                Consultation fees must be paid before your appointment is confirmed.
                Please note that consultation fees are non-refundable and
                non-transferable.
              </p>
            </div>
            <button
              onClick={() => window.location.href = "/consultation#consultation-form"}
              className="inline-block bg-[#0B0A0D] text-white px-6 py-3 uppercase tracking-widest text-xs font-semibold border border-[#0B0A0D] hover:bg-[#8B5CF6] hover:border-[#8B5CF6] hover:text-white transition-colors"
            >
              Book Now
            </button>
          </div>

          {/* Premium Services */}
          <div className="bg-[#0B0A0D] text-white p-8 rounded-sm relative overflow-hidden">
            {/* subtle purple glow, echoing the glitter edge on the box */}
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#5B21A8] opacity-30 blur-3xl pointer-events-none" />

            <h2 className="text-2xl font-serif mb-6 border-b border-white/15 pb-4 relative">
              Premium Services
            </h2>

            <div className="mb-8 relative">
              <h3 className="text-lg font-medium mb-3">Home Consultation</h3>
              <p className="text-white/60 text-sm mb-4">
                For clients who prefer consultations at their residence or preferred
                location:
              </p>
              <ul className="space-y-3 text-sm">
                <li className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-white/80">Within Lagos</span>
                  <span className="font-semibold text-[#C4A6F0]">$100 (₦100,000) per hour</span>
                </li>
                <li className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-white/80">Outside Lagos</span>
                  <span className="font-semibold text-[#C4A6F0]">$1,000 (₦1,000,000) per day</span>
                </li>
                <li className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-white/80">International</span>
                  <span className="font-semibold text-[#C4A6F0]">From $5,000 per day*</span>
                </li>
              </ul>
            </div>

            <div className="relative">
              <h3 className="text-lg font-medium mb-3">Dressing Service</h3>
              <p className="text-white/60 text-sm mb-4">
                Our professional dressing service ensures every detail of your look is
                flawlessly executed on the day of your event.
              </p>
              <ul className="space-y-3 text-sm">
                <li className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-white/80">Within Lagos</span>
                  <span className="font-semibold text-[#C4A6F0]">$100 (₦100,000) per hour</span>
                </li>
                <li className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-white/80">Outside Lagos</span>
                  <span className="font-semibold text-[#C4A6F0]">$1,000 (₦1,000,000) per day</span>
                </li>
                <li className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-white/80">International</span>
                  <span className="font-semibold text-[#C4A6F0]">From $5,000 per day*</span>
                </li>
              </ul>
              <p className="text-xs text-white/40 mt-4 italic">
                * International rates exclude travel and accommodation expenses.
              </p>
            </div>
          </div>
        </div>

        <div id="consultation-form" className="scroll-mt-20">
          {/*
            DEV NOTE (not shown to clients): ConsultationForm is flagged for
            future functional integration with a booking system.
          */}
          <ConsultationForm selectedProduct={selectedProduct} />
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}