import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ConsultationForm from "@/components/ConsultationForm";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getProduct } from "@/lib/products";
import { FadeIn, SlideUp } from "@/components/MotionWrappers";

export const dynamic = "force-dynamic";

export default async function ConsultationPage({ searchParams }: { searchParams: Promise<{ product?: string | string[] }> }) {
  const rawProduct = (await searchParams).product;
  const slug = Array.isArray(rawProduct) ? rawProduct[0] : rawProduct;
  const product = slug ? await getProduct(slug) : null;
  const selectedProduct = product ? {
    name: product.name,
    price: new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(product.price / 100)
  } : null;

  return (
    <>
      <Header />
      <main className="bg-[#FDFBF7] min-h-screen pb-32">
        {/* HERO SECTION */}
        <section className="pt-24 pb-16 px-6 md:px-12 text-center bg-[#EAE6DF] border-b border-[#d7af78]/30">
          <SlideUp className="max-w-3xl mx-auto">
            <span className="uppercase tracking-[0.3em] text-[10px] text-[#5B21A8] mb-6 block font-semibold">
              PRIVATE APPOINTMENTS
            </span>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-light mb-8 text-[#0B0A0D] tracking-wide leading-tight">
              Consultation <span className="italic text-[#5B21A8]">&</span> Services
            </h1>
            <p className="text-[#0B0A0D]/70 text-sm md:text-base leading-relaxed font-light max-w-2xl mx-auto">
              Every bespoke commission begins with a private consultation.
            </p>
          </SlideUp>
        </section>

        <section className="max-w-[1200px] mx-auto px-6 md:px-12 pt-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16 mb-24">
            
            {/* Standard Consultation */}
            <FadeIn>
              <div className="bg-[#EAE6DF]/30 p-10 border border-[#d7af78]/30 h-full flex flex-col">
                <h2 className="text-3xl font-serif mb-8 border-b border-[#d7af78]/30 pb-4 text-[#0B0A0D]">
                  Standard Consultation
                </h2>
                <div className="space-y-6 text-[#0B0A0D]/70 leading-loose text-sm md:text-base font-light flex-1">
                  <p>
                    Each consultation lasts approximately 40 minutes and is tailored to
                    understanding your vision, event, style preferences, and garment
                    requirements.
                  </p>
                  <p>Consultations may be conducted via:</p>
                  <ul className="space-y-3">
                    {["WhatsApp", "FaceTime", "WhatsApp Video", "Email", "In-person (by appointment)"].map((item) => (
                      <li key={item} className="flex items-center gap-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#d7af78] opacity-80" />
                        <span className="text-[#0B0A0D]/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="font-medium text-[#0B0A0D] pt-6 mt-6 border-t border-[#d7af78]/30">
                    Consultation fees must be paid before your appointment is confirmed.
                    Please note that consultation fees are non-refundable and
                    non-transferable.
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* Premium Services */}
            <FadeIn delay={0.1}>
              <div className="bg-[#0B0A0D] text-white p-10 h-full flex flex-col relative overflow-hidden border border-black">
                {/* Decorative Element */}
                <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#5B21A8] opacity-20 blur-3xl pointer-events-none" />

                <h2 className="text-3xl font-serif mb-8 border-b border-white/20 pb-4 relative">
                  Premium Services
                </h2>

                <div className="space-y-12 flex-1 relative z-10">
                  <div>
                    <h3 className="text-xl font-serif mb-4 text-[#d7af78]">Home Consultation</h3>
                    <p className="text-white/60 text-sm font-light mb-6 leading-loose">
                      For clients who prefer consultations at their residence or preferred
                      location:
                    </p>
                    <ul className="space-y-4 text-sm font-light">
                      <li className="flex justify-between border-b border-white/10 pb-3">
                        <span className="text-white/80">Within Lagos</span>
                        <span className="font-medium text-[#d7af78]">$100 (₦100,000) / hr</span>
                      </li>
                      <li className="flex justify-between border-b border-white/10 pb-3">
                        <span className="text-white/80">Outside Lagos</span>
                        <span className="font-medium text-[#d7af78]">$1,000 (₦1,000,000) / day</span>
                      </li>
                      <li className="flex justify-between border-b border-white/10 pb-3">
                        <span className="text-white/80">International</span>
                        <span className="font-medium text-[#d7af78]">From $5,000 / day*</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-serif mb-4 text-[#d7af78]">Dressing Service</h3>
                    <p className="text-white/60 text-sm font-light mb-6 leading-loose">
                      Our professional dressing service ensures every detail of your look is
                      flawlessly executed on the day of your event.
                    </p>
                    <ul className="space-y-4 text-sm font-light">
                      <li className="flex justify-between border-b border-white/10 pb-3">
                        <span className="text-white/80">Within Lagos</span>
                        <span className="font-medium text-[#d7af78]">$100 (₦100,000) / hr</span>
                      </li>
                      <li className="flex justify-between border-b border-white/10 pb-3">
                        <span className="text-white/80">Outside Lagos</span>
                        <span className="font-medium text-[#d7af78]">$1,000 (₦1,000,000) / day</span>
                      </li>
                      <li className="flex justify-between border-b border-white/10 pb-3">
                        <span className="text-white/80">International</span>
                        <span className="font-medium text-[#d7af78]">From $5,000 / day*</span>
                      </li>
                    </ul>
                    <p className="text-xs text-white/40 mt-6 italic">
                      * International rates exclude travel and accommodation expenses.
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>

          </div>

          <div id="consultation-form" className="scroll-mt-20">
            <FadeIn delay={0.2}>
              <div className="max-w-3xl mx-auto">
                <ConsultationForm selectedProduct={selectedProduct} />
              </div>
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
