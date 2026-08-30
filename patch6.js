const fs = require('fs');
let code = fs.readFileSync('app/page.tsx', 'utf8');

const regex = /\{\/\* EXPERIENCE STRIP \*\/\}\n        <section className="relative py-32 px-6 md:px-12 overflow-hidden bg-\[\#EAE6DF\]" id="academy">[\s\S]*?<\/section>/;

const replacement = `{/* EXPERIENCE STRIP */}
        <section className="py-24 px-6 md:px-12 bg-white" id="academy">
          <FadeIn className="relative max-w-[1400px] mx-auto h-[60vh] md:h-[80vh] overflow-hidden group">
            <Image 
              src="/images/featured/featured-29.jpg" 
              alt="The Anazodo Experience" 
              fill 
              className="object-cover object-center transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-700" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Link
                href="/consultation"
                className="bg-white text-[#0B0A0D] px-10 py-5 uppercase tracking-[0.2em] text-xs font-semibold shadow-lg transition-all hover:bg-[#8B5CF6] hover:text-white"
              >
                Book a consultation
              </Link>
            </div>
          </FadeIn>
        </section>`;

code = code.replace(regex, replacement);
fs.writeFileSync('app/page.tsx', code);
