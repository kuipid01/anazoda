import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen py-16 px-6 md:px-20 lg:px-32">
        <section className="mb-20">
          <div className="text-center mb-16">
            <span className="text-[#5B21A8] font-semibold tracking-widest text-xs uppercase">About the Founder</span>
            <h1 className="text-4xl md:text-6xl font-medium mt-4 font-serif">Precious Anazodo:<br />A Visionary in Fashion</h1>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[60vh] w-full bg-gray-100">
              <Image src="/images/portrait-3.jpg" alt="Precious Anazodo" fill className="object-cover" />
            </div>
            <div className="space-y-6 text-gray-700 leading-relaxed text-lg">
              <p>Precious Anazodo is the visionary founder and Creative Director of House of Anazodo, a luxury couture fashion house established in 2025. Guided by an inventive imagination and an uncompromising pursuit of excellence, she has built a brand that transforms fabric into wearable works of art.</p>
              <p>Her design philosophy goes beyond creating beautiful garments—it is about redefining modern couture through innovation, craftsmanship, and artistic expression. Every piece is thoughtfully designed to celebrate individuality, evoke confidence, and leave a lasting impression.</p>
              <p>With a vision to shape the future of 21st-century fashion, Precious continues to push the boundaries of bespoke couture, creating statement pieces that embody elegance, sophistication, and timeless luxury.</p>
            </div>
          </div>
        </section>

        <section className="mb-20 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-serif mb-6">A Journey Rooted in Excellence</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>Born and raised in Lagos, Nigeria, Precious’s journey into fashion began long before the launch of her brand. Growing up under the guidance of her mother, a highly skilled seamstress, she developed a deep appreciation for garment construction, meticulous craftsmanship, and the artistry behind every stitch.</p>
              <p>She later refined her skills by studying Fashion Design and Clothing Technology at Yaba College of Technology, where she strengthened both her technical expertise and creative vision. This combination of early mentorship and formal education laid the foundation for what would become House of Anazodo—a luxury fashion house dedicated to exceptional craftsmanship, innovative design, and uncompromising quality.</p>
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-serif mb-6">A Distinct Aesthetic</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>At the heart of House of Anazodo lies a signature aesthetic that celebrates femininity through impeccable tailoring, sculptural silhouettes, and exquisite detailing. Precious possesses a refined understanding of the female form, creating garments that flatter, empower, and inspire confidence.</p>
              <p>Drawing subtle inspiration from her Nigerian heritage while embracing a contemporary global perspective, her designs seamlessly blend culture, artistry, and modern couture.</p>
            </div>
          </div>
        </section>

        <blockquote className="my-24 text-center px-4">
          <p className="text-3xl md:text-5xl font-serif italic text-black max-w-4xl mx-auto leading-tight">
            "Fashion is more than clothing—it is a powerful expression of identity, confidence, and individuality."
          </p>
        </blockquote>
        
        <section className="mb-20 bg-gray-50 p-12 text-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
             <article className="text-left">
                <span className="text-[#5B21A8] font-bold text-sm block mb-2">01</span>
                <h2 className="text-2xl font-serif mb-4">Our Vision</h2>
                <p className="text-gray-600 mb-4">At House of Anazodo, our vision is to redefine contemporary luxury couture by creating timeless designs that celebrate individuality, confidence, and exceptional craftsmanship.</p>
                <p className="text-gray-600 mb-4">We aspire to become one of Africa’s leading luxury fashion houses, recognized globally for our innovation, artistry, and uncompromising commitment to excellence. Every garment we create is designed to transcend trends, becoming a lasting expression of elegance and personal style.</p>
                <p className="text-gray-600">Beyond fashion, we envision a future where House of Anazodo inspires creativity, empowers women to embrace their uniqueness, and showcases the richness of African craftsmanship on the global stage. Our commitment is to continuously push the boundaries of design, delivering couture experiences that are as unforgettable as the women who wear them.</p>
             </article>
             <article className="text-left">
                <span className="text-[#5B21A8] font-bold text-sm block mb-2">02</span>
                <h2 className="text-2xl font-serif mb-4">Our Mission</h2>
                <p className="text-gray-600 mb-4">At House of Anazodo, our mission is to create exceptional couture through uncompromising craftsmanship, innovation, and meticulous attention to detail.</p>
                <p className="text-gray-600 mb-4">Driven by continuous research, creative exploration, and the refinement of both traditional and contemporary techniques, we are committed to elevating the art of bespoke fashion. Every garment is thoughtfully designed and expertly handcrafted to deliver timeless elegance, impeccable quality, and an unforgettable client experience.</p>
                <p className="text-gray-600">Our purpose is to transform each client’s vision into a masterpiece that reflects their individuality, confidence, and personal style.</p>
             </article>
          </div>
        </section>

        <div className="text-center mt-20">
          <Link href="/consultation" className="inline-block border border-black px-8 py-4 uppercase tracking-widest text-xs font-semibold hover:bg-[#8B5CF6] hover:border-[#8B5CF6] hover:text-white transition-colors">
            Begin Your Couture Journey
          </Link>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
