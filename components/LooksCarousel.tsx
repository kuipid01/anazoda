import { getLooks } from "@/lib/looks";
import { SlideUp } from "@/components/MotionWrappers";
import LooksClient from "./LooksClient";

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
        
        <LooksClient looks={looks} />
        
        <style dangerouslySetInnerHTML={{__html: `
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}} />
      </div>
    </section>
  );
}
