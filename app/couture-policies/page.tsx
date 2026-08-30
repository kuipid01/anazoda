import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FadeIn, SlideUp } from "@/components/MotionWrappers";

export default function CouturePoliciesPage() {
  const policies = [
    {
      title: "Fabrics & Materials",
      content: (
        <>
          <p className="mb-6">
            House of Anazodo carefully sources premium fabrics and embellishments from trusted suppliers worldwide.
          </p>
          <p>
            Clients may choose to provide their own fabrics; however, House of Anazodo accepts no responsibility for the quality, durability, or performance of client-supplied materials. Any production limitations arising from externally sourced fabrics remain the client’s responsibility.
          </p>
        </>
      )
    },
    {
      title: "Fittings & Etiquette",
      content: (
        <>
          <p className="mb-6 font-serif italic text-lg text-[#5B21A8]">
            "Couture is an intentional process that requires patience and precision."
          </p>
          <p className="mb-6">
            Multiple fittings may be required to achieve the impeccable fit synonymous with House of Anazodo. We kindly ask clients to allocate sufficient time for each fitting session and arrive promptly for appointments.
          </p>
          <p className="text-[#d7af78] font-medium">
            Appointments scheduled outside regular business hours may attract additional fees.
          </p>
        </>
      )
    },
    {
      title: "Alterations & Design Changes",
      content: (
        <>
          <p className="mb-6 font-medium text-[#0B0A0D]">
            Once fabric has been purchased and production has commenced, orders become non-refundable.
          </p>
          <p>
            Requests to change the approved design, fabric, lining, or embellishments after production has begun will incur additional charges, starting from 50% of the original production cost, depending on the extent of the revision.
          </p>
        </>
      )
    },
    {
      title: "Collection Policy",
      content: (
        <>
          <p className="mb-6 font-medium text-[#0B0A0D]">
            Completed garments must be collected within 14 days of completion.
          </p>
          <p>
            Due to limited storage capacity, garments that remain uncollected for more than 28 calendar days may be donated to charity, paid or unpaid.
          </p>
        </>
      )
    },
    {
      title: "Garment Care & Responsibility",
      content: (
        <>
          <p className="mb-6">
            Garments featuring illusion mesh, tulle, or delicate couture fabrics require careful handling.
          </p>
          <p>
            Once a garment has been collected or worn, House of Anazodo cannot be held responsible for tears, snags, damage, or wear resulting from use. Any post-delivery alterations or repairs requested by the client will attract additional charges.
          </p>
        </>
      )
    }
  ];

  return (
    <>
      <Header />
      <main className="bg-[#FDFBF7] min-h-screen pb-32">
        {/* HERO SECTION */}
        <section className="pt-24 pb-16 px-6 md:px-12 text-center bg-[#EAE6DF] border-b border-[#d7af78]/30">
          <SlideUp className="max-w-3xl mx-auto">
            <span className="uppercase tracking-[0.3em] text-[10px] text-[#5B21A8] mb-6 block font-semibold">
              HOUSE EXPECTATIONS
            </span>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-light mb-8 text-[#0B0A0D] tracking-wide">
              Couture <span className="italic text-[#5B21A8]">Policies</span>
            </h1>
            <p className="text-[#0B0A0D]/70 text-sm md:text-base leading-relaxed font-light max-w-2xl mx-auto">
              Our couture policies outline the expectations and responsibilities for both House of Anazodo and our clients, ensuring a seamless and exceptional bespoke experience.
            </p>
          </SlideUp>
        </section>

        {/* POLICIES LIST */}
        <section className="max-w-[1000px] mx-auto px-6 md:px-12 pt-24">
          <div className="space-y-20">
            {policies.map((policy, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="flex flex-col md:flex-row gap-6 md:gap-16 group">
                  <div className="md:w-1/3 shrink-0">
                    <span className="text-[#d7af78] font-serif italic text-xl block mb-2 opacity-70">
                      0{i + 1}
                    </span>
                    <h2 className="text-xl md:text-2xl font-serif text-[#0B0A0D] uppercase tracking-wide group-hover:text-[#5B21A8] transition-colors">
                      {policy.title}
                    </h2>
                  </div>
                  <div className="md:w-2/3 border-t border-[#d7af78]/30 pt-6 md:border-t-0 md:pt-0 md:border-l md:pl-16 text-[#0B0A0D]/70 text-sm md:text-[15px] leading-loose font-light">
                    {policy.content}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
