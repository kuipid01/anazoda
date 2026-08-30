import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { FadeIn, SlideUp } from "@/components/MotionWrappers";
import { ArrowRight } from "lucide-react";

export default function TermsOfServicePage() {
  const policies = [
    {
      title: "Couture Policies",
      href: "/couture-policies",
      desc: "Information regarding garment care, fittings, alterations, and client responsibilities."
    },
    {
      title: "Delivery & Shipping Policy",
      href: "/shipping",
      desc: "Information regarding processing times, shipping rates, and delivery conditions."
    },
    {
      title: "Privacy Policy",
      href: "/privacy-policy",
      desc: "Information on how we collect, use, and protect your personal data."
    },
    {
      title: "Pricing & Payments",
      href: "/pricing",
      desc: "Information regarding deposits, accepted payment methods, and starting investments."
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
              LEGAL
            </span>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-light mb-8 text-[#0B0A0D] tracking-wide">
              Terms of <span className="italic text-[#5B21A8]">Service</span>
            </h1>
            <p className="text-[#0B0A0D]/70 text-sm md:text-base leading-relaxed font-light max-w-2xl mx-auto mb-6">
              The following Terms of Service govern your use of the House of Anazodo website and the purchase of our products and services. By accessing our website, booking a consultation, or placing an order, you acknowledge that you have read, understood, and agree to these terms.
            </p>
            <p className="text-[#d7af78] font-medium text-sm max-w-2xl mx-auto">
              Please note that additional policies relating to Bespoke Couture, Consultations, Privacy, Returns, and Payments form part of these Terms of Service.
            </p>
          </SlideUp>
        </section>

        {/* RELATED POLICIES DIRECTORY */}
        <section className="max-w-[1000px] mx-auto px-6 md:px-12 pt-24">
          <FadeIn className="mb-16">
            <h2 className="font-serif italic text-3xl md:text-4xl text-[#0B0A0D] text-center md:text-left">
              Related Policies
            </h2>
          </FadeIn>
          
          <div className="space-y-6">
            {policies.map((policy, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <Link href={policy.href} className="group block">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-8 border border-black/10 hover:border-[#5B21A8]/50 hover:bg-[#EAE6DF]/30 transition-all duration-300 gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <span className="text-[#d7af78] font-serif italic text-lg opacity-80">
                          0{i + 1}
                        </span>
                        <h3 className="text-lg md:text-xl font-serif text-[#0B0A0D] uppercase tracking-wide group-hover:text-[#5B21A8] transition-colors">
                          {policy.title}
                        </h3>
                      </div>
                      <p className="text-[#0B0A0D]/60 text-sm md:text-[15px] font-light md:ml-10">
                        {policy.desc}
                      </p>
                    </div>
                    <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full border border-black/10 text-[#0B0A0D]/50 group-hover:bg-[#5B21A8] group-hover:text-white group-hover:border-[#5B21A8] transition-all duration-300">
                      <ArrowRight size={18} strokeWidth={1.5} />
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
