import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { FadeIn, SlideUp } from "@/components/MotionWrappers";

export default function BespokeProcessPage() {
  const steps = [
    {
      title: "Production Timeline",
      desc: "Each bespoke garment is handcrafted to order. Production typically requires 8–24 weeks, depending on the complexity of the design, embroidery, embellishments, fabric sourcing, and fitting schedule. We recommend beginning your couture journey at least six months before your event."
    },
    {
      title: "Fabrics & Materials",
      desc: "House of Anazodo carefully sources premium fabrics and embellishments from trusted suppliers worldwide. Clients may choose to provide their own fabrics; however, House of Anazodo accepts no responsibility for the quality, durability, or performance of client-supplied materials."
    },
    {
      title: "Fittings",
      desc: "Couture is an intentional process that requires patience and precision. Multiple fittings may be required to achieve the impeccable fit synonymous with House of Anazodo. We kindly ask clients to allocate sufficient time for each fitting session."
    },
    {
      title: "Alterations & Design Changes",
      desc: "Once fabric has been purchased and production has commenced, orders become non-refundable. Requests to change the approved design, fabric, lining, or embellishments after production has begun will incur additional charges."
    },
    {
      title: "Collection Policy",
      desc: "Completed garments must be collected within 14 days of completion. Due to limited storage capacity, garments that remain uncollected for more than 28 calendar days may be donated to charity, paid or unpaid."
    }
  ];

  return (
    <>
      <Header />
      <main className="bg-[#FDFBF7] min-h-screen pb-32">
        {/* HERO SECTION */}
        <section className="pt-24 pb-16 px-6 md:px-12 text-center bg-[#EAE6DF] border-b border-[#d7af78]/30">
          <SlideUp className="max-w-4xl mx-auto">
            <span className="uppercase tracking-[0.3em] text-[10px] text-[#5B21A8] mb-6 block font-semibold">
              THE EXPERIENCE
            </span>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-light mb-8 text-[#0B0A0D] tracking-wide leading-tight">
              Bespoke <span className="italic text-[#5B21A8]">&</span> Custom Couture
            </h1>
            <p className="text-[#0B0A0D]/70 text-sm md:text-base leading-relaxed font-light max-w-3xl mx-auto">
              Every House of Anazodo creation is meticulously designed and handcrafted to reflect the individuality, lifestyle, and vision of its wearer. Our bespoke service offers a highly personalized couture experience, where each garment is made exclusively for you with exceptional attention to detail, precision, and artistry.
            </p>
          </SlideUp>
        </section>

        {/* PROCESS STEPS */}
        <section className="max-w-[1000px] mx-auto px-6 md:px-12 py-24">
          <div className="space-y-12">
            {steps.map((step, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="flex flex-col md:flex-row gap-6 md:gap-12 bg-white p-8 md:p-12 border border-[#d7af78]/30 shadow-sm hover:border-[#5B21A8]/50 transition-colors group">
                  <div className="md:w-1/3 shrink-0 flex flex-col justify-start">
                    <span className="text-[#d7af78] font-serif italic text-3xl block mb-2 opacity-80">
                      0{i + 1}
                    </span>
                    <h3 className="text-xl md:text-2xl font-serif text-[#0B0A0D] uppercase tracking-wide group-hover:text-[#5B21A8] transition-colors mt-2">
                      {step.title}
                    </h3>
                  </div>
                  <div className="md:w-2/3 md:border-l md:border-[#d7af78]/30 md:pl-12 flex items-center">
                    <p className="text-[#0B0A0D]/70 text-sm md:text-[15px] leading-loose font-light">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* PRICING CALLOUT */}
          <FadeIn delay={0.3}>
            <div className="mt-24 bg-[#EAE6DF]/50 p-12 text-center border border-[#d7af78]/30">
              <h2 className="text-3xl font-serif mb-4 text-[#0B0A0D]">Investment & Pricing</h2>
              <p className="text-[#0B0A0D]/70 mb-8 max-w-2xl mx-auto text-sm md:text-[15px] leading-loose font-light">
                Our bespoke creations are individually priced according to their level of craftsmanship, design complexity, and embellishment.
              </p>
              <Link href="/pricing" className="inline-block bg-[#0B0A0D]! text-white! px-10 py-5 uppercase tracking-[0.2em] text-[11px] font-semibold hover:bg-[#d7af78] transition-colors">
                View Pricing Guide
              </Link>
            </div>
          </FadeIn>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
