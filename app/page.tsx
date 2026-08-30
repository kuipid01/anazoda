import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getFeaturedProducts } from "@/lib/products";
import { ArrowRight } from "lucide-react";
import { FadeIn, SlideUp, ParallaxImage } from "@/components/MotionWrappers";
import ExperienceGallery from "@/components/ExperienceGallery";

export const dynamic = "force-dynamic";

// Brand tokens carried over from ConsultationPage — kept consistent site-wide:
// bg  #FDFBF7 (ivory)   ink #0B0A0D   purple #5B21A8   purple-soft #8B5CF6

export default async function Home() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <div className="text-[#0B0A0D] font-sans selection:bg-[#5B21A8] selection:text-white">
      <main>
        {/* HERO SECTION — now a normal-flow section with real height (h-screen),
            not `absolute`, so it pushes everything below it down instead of
            being overlapped. Header lives INSIDE it, absolutely positioned,
            so it overlays transparently on the photo. */}
        <section className="relative w-full h-[100svh] overflow-hidden">
          <Image
            src="/images/landing-1.JPG"
            alt="House of Anazodo couture"
            fill
            priority
            className="object-cover object-[center_50%]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

          {/* Header overlaid on the hero — transparent header row over the photo,
              announcement bar stays solid black on top of it. */}
          <div className="absolute inset-x-0 top-0 z-20">
            <Header />
          </div>

          <div className="absolute bottom-10 left-6 md:bottom-14 md:left-12 z-10 text-left max-w-md">
            <FadeIn>
              <span className="uppercase tracking-[0.35em] text-[25px] text-white/80 mb-4 block font-medium">
                House of Anazodo
              </span>

              <Link
                href="/shop"
                className="inline-flex items-center gap-2 text-white uppercase tracking-[0.2em] text-[10px] font-light hover:font-semibold hover:text-purple-400 transition-all duration-75"
              >
                Shop now
                <div className="flex items-center relative w-40 h-[0.5px] bg-white">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-white rounded-full" />
                </div>
              </Link>
            </FadeIn>
          </div>
        </section>

        {/* COLLECTION SECTION */}
        <section className="py-24 md:py-32 px-6 md:px-12 max-w-[1600px] mx-auto text-center" id="collections">
          <FadeIn>
            <span className="uppercase tracking-[0.3em] text-[10px] md:text-xs text-[#5B21A8] mb-4 block font-semibold">
              {featuredProducts.length ? "FEATURED PIECES" : "THE COLLECTION"}
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light mb-6 text-[#0B0A0D] tracking-wide">
              {featuredProducts.length ? "Selected by the House" : "Couture in Motion"}
            </h2>
            <p className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto mb-16 tracking-wide font-light">
              {featuredProducts.length
                ? "Discover signature pieces selected from our current collection."
                : "Sculptural silhouettes, impeccable tailoring and exquisite detailing."}
            </p>
          </FadeIn>

          <div className="mt-12">
            {featuredProducts.length ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                {featuredProducts.map((product, i) => (
                  <FadeIn delay={i * 0.1} key={product.id}>
                    <ProductCard product={product} />
                  </FadeIn>
                ))}
              </div>
            ) : (
              <FadeIn delay={0.2}>
                <div className="opacity-90 grayscale-[20%] hover:grayscale-0 transition-all duration-700">
                  <Gallery />
                </div>
              </FadeIn>
            )}
          </div>
        </section>

        {/* OUR VALUES — three-column editorial block */}
        <section className="py-24 md:py-32 px-6 md:px-12 bg-white" id="values">
          <FadeIn className="max-w-[1400px] mx-auto text-center mb-16">
            <span className="uppercase tracking-[0.3em] text-[10px] text-[#5B21A8] mb-4 block font-semibold">
              THE HOUSE STANDS FOR
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-light tracking-wide">
              Our <span className="italic text-[#5B21A8]">Values</span>
            </h2>
          </FadeIn>

          <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            <FadeIn delay={0.1} className="text-center md:text-left">
              <div className="relative aspect-[4/5] bg-[#EAE6DF] mb-6 overflow-hidden"><Image src="/images/featured/featured-9.jpg" alt="Craftsmanship First" fill className="object-cover transition-transform duration-1000 hover:scale-105" /></div>
              <h3 className="font-serif text-xl mb-3">Craftsmanship First</h3>
              <p className="text-gray-500 text-sm leading-relaxed font-light">
                Every garment is thoughtfully designed and expertly handcrafted,
                built on continuous research and the refinement of both
                traditional and contemporary technique.
              </p>
            </FadeIn>
            <FadeIn delay={0.2} className="text-center md:text-left">
              <div className="relative aspect-[4/5] bg-[#EAE6DF] mb-6 overflow-hidden"><Image src="/images/featured/featured-19.jpg" alt="Individuality, Tailored" fill className="object-cover transition-transform duration-1000 hover:scale-105" /></div>
              <h3 className="font-serif text-xl mb-3">Individuality, Tailored</h3>
              <p className="text-gray-500 text-sm leading-relaxed font-light">
                Each piece is made exclusively for its wearer &mdash; celebrating
                individuality, evoking confidence, and leaving a lasting
                impression.
              </p>
            </FadeIn>
            <FadeIn delay={0.3} className="text-center md:text-left">
              <div className="relative aspect-[4/5] bg-[#EAE6DF] mb-6 overflow-hidden"><Image src="/images/featured/featured-30.jpg" alt="Heritage, Global Perspective" fill className="object-cover transition-transform duration-1000 hover:scale-105" /></div>
              <h3 className="font-serif text-xl mb-3">Heritage, Global Perspective</h3>
              <p className="text-gray-500 text-sm leading-relaxed font-light">
                Drawing subtle inspiration from Nigerian heritage while
                embracing a contemporary global outlook &mdash; culture,
                artistry and modern couture, seamlessly blended.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* EXPERIENCE STRIP */}
        <section className="py-24 bg-white" id="academy">
          <FadeIn className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden group">
            <Image
              src="/images/featured/featured-1.jpg"
              alt="The Anazodo Experience"
              fill
              className="object-cover object-[center_30%] transition-transform duration-1000 group-hover:scale-105"
            />
            {/* Bottom-weighted gradient instead of a flat overlay — keeps the top of the
        photo clear and gives the text real contrast to sit on. */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 transition-colors duration-700" />

            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16">
              <div className="max-w-xl">
                <span className="uppercase tracking-[0.3em] text-[10px] text-[#C4A6F0] mb-4 block font-semibold">
                  The Anazodo Experience
                </span>
                <h2 className="font-serif text-3xl md:text-5xl leading-[1.15] font-light text-white mb-8 tracking-wide">
                  Created for the woman who <i className="italic text-[#C4A6F0]">enters a room</i> and owns it.
                </h2>
                <Link
                  href="/consultation"
                  className="inline-block bg-white text-[#0B0A0D] px-8 py-4 uppercase tracking-[0.2em] text-[10px] font-semibold transition-all hover:bg-[#8B5CF6] hover:text-white"
                >
                  Book a consultation
                </Link>
              </div>
            </div>
          </FadeIn>
        </section>
        {/* EXPERIENCE GALLERY (LIGHTBOX) */}
        <ExperienceGallery />

        {/* MANTRA STRIP */}
        <section className="py-20 px-6 text-center bg-[#0B0A0D]">
          <FadeIn>
            <span className="font-serif italic text-2xl md:text-4xl text-[#C4A6F0] block max-w-3xl mx-auto leading-snug">
              &ldquo;Fashion is more than clothing &mdash; it is a powerful expression
              of identity, confidence, and individuality.&rdquo;
            </span>
          </FadeIn>
        </section>

        {/* CRAFT NUMBERS STRIP */}
        <section className="py-16 px-6 md:px-12 bg-white border-y border-gray-100">
          <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 text-center">
            <FadeIn delay={0.1}>
              <div className="font-serif text-3xl md:text-4xl text-[#5B21A8] mb-2">2025</div>
              <div className="uppercase tracking-[0.2em] text-[10px] text-gray-500">House Established</div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="font-serif text-3xl md:text-4xl text-[#5B21A8] mb-2">8&ndash;24</div>
              <div className="uppercase tracking-[0.2em] text-[10px] text-gray-500">Weeks, Handcrafted to Order</div>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="font-serif text-3xl md:text-4xl text-[#5B21A8] mb-2">100%</div>
              <div className="uppercase tracking-[0.2em] text-[10px] text-gray-500">Bespoke, Made to Measure</div>
            </FadeIn>
            <FadeIn delay={0.4}>
              <div className="font-serif text-3xl md:text-4xl text-[#5B21A8] mb-2">Lagos</div>
              <div className="uppercase tracking-[0.2em] text-[10px] text-gray-500">Atelier, Serving Clients Worldwide</div>
            </FadeIn>
          </div>
        </section>

        {/* SOCIAL GRID — placeholder tiles only */}
        <section className="py-24 px-6 md:px-12 text-center bg-[#FDFBF7]">
          <FadeIn>
            <span className="uppercase tracking-[0.3em] text-[10px] text-[#5B21A8] mb-6 block font-semibold">
              Follow the House
            </span>
            <p className="font-serif text-lg mb-10">@houseofanazodo</p>
          </FadeIn>
          <div className="max-w-[1400px] mx-auto grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num, i) => (
              <FadeIn
                key={num}
                delay={i * 0.1}
                className="relative aspect-square bg-[#EAE6DF] flex items-center justify-center overflow-hidden group"
              >
                <Image
                  src={`/images/featured/featured-${num}.jpg`}
                  alt={`Anazodo featured ${num}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </FadeIn>
            ))}
          </div>
        </section>

        {/* FAQ PREVIEW */}
        <section className="py-32 px-6 text-center bg-white" id="faq">
          <FadeIn className="max-w-3xl mx-auto">
            <span className="uppercase tracking-[0.3em] text-[10px] md:text-xs text-[#5B21A8] mb-6 block font-semibold">
              COUTURE, MADE PERSONAL
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-[#0B0A0D] mb-8 tracking-wide">
              Made for you, from first sketch to final fitting.
            </h2>
            <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-12 font-light">
              Every bespoke experience starts with a private conversation about your vision, event and personal style.
            </p>
            <a
              href="/faq"
              className="inline-block border-b border-[#5B21A8] text-[#5B21A8] uppercase tracking-widest text-xs font-semibold pb-1 hover:text-[#8B5CF6] hover:border-[#8B5CF6] transition-colors"
            >
              Explore our client guide &rarr;
            </a>
          </FadeIn>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
