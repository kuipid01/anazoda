import Image from "next/image";
import { getLooks } from "@/lib/looks";
import { FadeIn, SlideUp } from "@/components/MotionWrappers";

export default async function LooksCarousel() {
  const looks = await getLooks();
  
  if (!looks || looks.length === 0) return null;

  return (
    <section className="py-24 bg-[#EAE6DF] border-y border-[#d7af78]/20 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <SlideUp>
          <span className="uppercase tracking-[0.3em] text-[10px] text-[#5B21A8] mb-4 block font-semibold">
            EXPERIENCES
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-[#0B0A0D] mb-12 tracking-wide">
            Looks <span className="italic text-[#5B21A8]">to</span> Experiences
          </h2>
        </SlideUp>
        
        <div className="flex overflow-x-auto gap-6 md:gap-10 pb-12 snap-x snap-mandatory hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {looks.map((look, i) => (
            <FadeIn key={look.id} delay={i * 0.1} className="snap-start shrink-0 w-[80vw] md:w-[400px] lg:w-[450px]">
              <div className="relative aspect-[3/4] bg-white group overflow-hidden mb-6">
                <Image
                  src={look.images?.[0]?.url}
                  alt={look.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  sizes="(max-width: 768px) 80vw, 450px"
                />
              </div>
              <span className="uppercase tracking-[0.2em] text-[10px] text-[#5B21A8] mb-2 block font-medium">
                {look.category}
              </span>
              <h3 className="font-serif text-xl md:text-2xl text-[#0B0A0D] mb-2">{look.title}</h3>
              {look.priceRange && (
                <p className="text-gray-500 text-sm uppercase tracking-widest">
                  {look.priceRange}
                </p>
              )}
            </FadeIn>
          ))}
        </div>
        <style dangerouslySetInnerHTML={{__html: `
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}} />
      </div>
    </section>
  );
}
