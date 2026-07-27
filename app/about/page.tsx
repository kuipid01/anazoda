import Image from "next/image";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function AboutPage() {
  return <><Header /><main className="about-page">
    <section className="about-founder">
      <div className="about-image"><Image src="/images/portrait-3.jpg" alt="Precious Anazodo, founder and creative director" fill sizes="(max-width: 900px) 100vw, 45vw" /></div>
      <div><span>ABOUT THE FOUNDER</span><h1>Precious Anazodo:<br />A Visionary in Fashion</h1>
        <p>Precious Anazodo is the visionary founder and Creative Director of House of Anazodo, a luxury couture fashion house established in 2025. Guided by an inventive imagination and an uncompromising pursuit of excellence, she transforms fabric into wearable works of art.</p>
        <p>Born and raised in Lagos, her journey began under the guidance of her mother, a highly skilled seamstress. She later studied Fashion Design and Clothing Technology at Yaba College of Technology, refining the technical expertise and creative vision behind the house.</p>
        <p>Her signature aesthetic celebrates femininity through impeccable tailoring, sculptural silhouettes and exquisite detail—blending subtle Nigerian influence with a contemporary global perspective.</p>
      </div>
    </section>
    <section className="vision-grid"><article><span>01</span><h2>Our Vision</h2><p>To redefine contemporary luxury couture through timeless designs that celebrate individuality, confidence and exceptional craftsmanship—and to showcase African artistry on the global stage.</p></article><article><span>02</span><h2>Our Mission</h2><p>To create exceptional couture through uncompromising craftsmanship, innovation and meticulous attention to detail, transforming each client’s vision into a masterpiece.</p></article></section>
  </main><Footer /><WhatsAppButton /></>;
}
