import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import WhatsAppButton from "@/components/WhatsAppButton";
import { FadeIn, SlideUp } from "@/components/MotionWrappers";

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="bg-[#FDFBF7] min-h-screen pb-32">
        {/* HERO SECTION */}
        <section className="pt-24 pb-16 px-6 md:px-12 text-center bg-[#EAE6DF] border-b border-[#d7af78]/30">
          <SlideUp className="max-w-3xl mx-auto">
            <span className="uppercase tracking-[0.3em] text-[10px] text-[#5B21A8] mb-6 block font-semibold">
              ABOUT THE FOUNDER
            </span>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-light mb-8 text-[#0B0A0D] tracking-wide leading-tight">
              Precious Anazodo:<br />
              <span className="italic text-[#5B21A8]">A Visionary in Fashion</span>
            </h1>
          </SlideUp>
        </section>

        {/* INTRO BLOCK */}
        <section className="max-w-[1200px] mx-auto px-6 md:px-12 pt-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-center mb-32">
            <FadeIn>
              <div className="relative h-[70vh] min-h-[500px] w-full bg-[#EAE6DF]">
                <Image
                  src="/images/portrait-3.jpg"
                  alt="Precious Anazodo"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="space-y-8 text-[#0B0A0D]/70 leading-loose text-sm md:text-base font-light pr-4">
                <p>
                  Precious Anazodo is the visionary founder and Creative Director of House of Anazodo, a luxury couture fashion house established in 2025. Guided by an inventive imagination and an uncompromising pursuit of excellence, she has built a brand that transforms fabric into wearable works of art.
                </p>
                <p>
                  Her design philosophy goes beyond creating beautiful garments—it is about redefining modern couture through innovation, craftsmanship, and artistic expression. Every piece is thoughtfully designed to celebrate individuality, evoke confidence, and leave a lasting impression.
                </p>
                <p>
                  With a vision to shape the future of 21st-century fashion, Precious continues to push the boundaries of bespoke couture, creating statement pieces that embody elegance, sophistication, and timeless luxury.
                </p>
              </div>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 xl:gap-24 mb-32">
            <FadeIn>
              <h2 className="text-3xl font-serif mb-8 text-[#0B0A0D]">A Journey Rooted in Excellence</h2>
              <div className="space-y-6 text-[#0B0A0D]/70 leading-loose text-sm md:text-base font-light">
                <p>Born and raised in Lagos, Nigeria, Precious’s journey into fashion began long before the launch of her brand. Growing up under the guidance of her mother, a highly skilled seamstress, she developed a deep appreciation for garment construction, meticulous craftsmanship, and the artistry behind every stitch.</p>
                <p>She later refined her skills by studying Fashion Design and Clothing Technology at Yaba College of Technology, where she strengthened both her technical expertise and creative vision. This combination of early mentorship and formal education laid the foundation for what would become House of Anazodo—a luxury fashion house dedicated to exceptional craftsmanship, innovative design, and uncompromising quality.</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="text-3xl font-serif mb-8 text-[#0B0A0D]">A Distinct Aesthetic</h2>
              <div className="space-y-6 text-[#0B0A0D]/70 leading-loose text-sm md:text-base font-light">
                <p>At the heart of House of Anazodo lies a signature aesthetic that celebrates femininity through impeccable tailoring, sculptural silhouettes, and exquisite detailing. Precious possesses a refined understanding of the female form, creating garments that flatter, empower, and inspire confidence.</p>
                <p>Drawing subtle inspiration from her Nigerian heritage while embracing a contemporary global perspective, her designs seamlessly blend culture, artistry, and modern couture.</p>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* QUOTE BLOCK */}
        <section className="bg-[#0B0A0D] py-32 px-6 md:px-12 text-center my-16">
          <FadeIn>
            <p className="text-3xl md:text-5xl lg:text-6xl font-serif italic text-white max-w-5xl mx-auto leading-snug">
              "Fashion is more than clothing—it is a powerful expression of identity, confidence, and individuality."
            </p>
          </FadeIn>
        </section>

        {/* VISION & MISSION */}
        <section className="max-w-[1200px] mx-auto px-6 md:px-12 py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 xl:gap-24">
            <FadeIn>
              <span className="text-[#d7af78] font-serif italic text-xl block mb-4 opacity-70">01</span>
              <h2 className="text-3xl font-serif mb-8 text-[#0B0A0D]">Our Vision</h2>
              <div className="space-y-6 text-[#0B0A0D]/70 leading-loose text-sm md:text-base font-light">
                <p>At House of Anazodo, our vision is to redefine contemporary luxury couture by creating timeless designs that celebrate individuality, confidence, and exceptional craftsmanship.</p>
                <p>We aspire to become one of Africa’s leading luxury fashion houses, recognized globally for our innovation, artistry, and uncompromising commitment to excellence. Every garment we create is designed to transcend trends, becoming a lasting expression of elegance and personal style.</p>
                <p>Beyond fashion, we envision a future where House of Anazodo inspires creativity, empowers women to embrace their uniqueness, and showcases the richness of African craftsmanship on the global stage. Our commitment is to continuously push the boundaries of design, delivering couture experiences that are as unforgettable as the women who wear them.</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <span className="text-[#d7af78] font-serif italic text-xl block mb-4 opacity-70">02</span>
              <h2 className="text-3xl font-serif mb-8 text-[#0B0A0D]">Our Mission</h2>
              <div className="space-y-6 text-[#0B0A0D]/70 leading-loose text-sm md:text-base font-light">
                <p>At House of Anazodo, our mission is to create exceptional couture through uncompromising craftsmanship, innovation, and meticulous attention to detail.</p>
                <p>Driven by continuous research, creative exploration, and the refinement of both traditional and contemporary techniques, we are committed to elevating the art of bespoke fashion. Every garment is thoughtfully designed and expertly handcrafted to deliver timeless elegance, impeccable quality, and an unforgettable client experience.</p>
                <p>Our purpose is to transform each client’s vision into a masterpiece that reflects their individuality, confidence, and personal style.</p>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.2} className="text-center mt-32">
            <Link href="/consultation" className="inline-block bg-[#0B0A0D] text-white! px-10 py-5 uppercase tracking-[0.2em] text-[11px] font-semibold hover:bg-[#d7af78] transition-colors">
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
