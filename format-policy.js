const fs = require('fs');

function formatFile(filepath, pageTitle, subtitle) {
  const content = fs.readFileSync(filepath, 'utf8');

  // Extract sections
  const sections = [];
  const sectionRegex = /<section[^>]*>([\s\S]*?)<\/section>/g;
  
  let match;
  while ((match = sectionRegex.exec(content)) !== null) {
    const sectionContent = match[1];
    
    // Extract title (h2)
    const titleMatch = sectionContent.match(/<h2[^>]*>(.*?)<\/h2>/);
    const title = titleMatch ? titleMatch[1].replace(/<[^>]*>?/gm, '') : "Section";
    
    // Extract content
    let innerContent = sectionContent.replace(/<h2[^>]*>.*?<\/h2>/, '');
    
    // Format list-disc and paragraphs for tailwind
    innerContent = innerContent.replace(/<p[^>]*>/g, '<p className="mb-6">');
    innerContent = innerContent.replace(/<ul[^>]*>/g, '<ul className="list-disc pl-5 space-y-2 mb-6">');
    
    sections.push({ title, content: innerContent.trim() });
  }

  // Generate new file content
  const newContent = `import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FadeIn, SlideUp } from "@/components/MotionWrappers";

export default function PolicyPage() {
  const policies = [
${sections.map(s => `    {
      title: ${JSON.stringify(s.title)},
      content: (
        <>
          ${s.content}
        </>
      )
    }`).join(',\n')}
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
              ${pageTitle}
            </h1>
            <p className="text-[#0B0A0D]/70 text-sm md:text-base leading-relaxed font-light max-w-2xl mx-auto">
              ${subtitle}
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
`;

  fs.writeFileSync(filepath, newContent);
  console.log(`Reformatted ${filepath}`);
}

formatFile('app/shipping/page.tsx', 'Delivery <span className="italic text-[#5B21A8]">&</span> Shipping', 'Information regarding processing times, shipping rates, and delivery conditions for House of Anazodo.');
formatFile('app/privacy-policy/page.tsx', 'Privacy <span className="italic text-[#5B21A8]">Policy</span>', 'Information on how we collect, use, and protect your personal data.');
