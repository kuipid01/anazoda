const fs = require('fs');
let code = fs.readFileSync('app/page.tsx', 'utf8');

// Wrap OUR VALUES grid
code = code.replace(
  /<div className="max-w-\[1400px\] mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">([\s\S]*?)<\/section>/g,
  '<div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">\n            <FadeIn delay={0.1} className="text-center md:text-left">\n              <div className="aspect-[4/5] bg-[#EAE6DF] mb-6" />\n              <h3 className="font-serif text-xl mb-3">Craftsmanship First</h3>\n              <p className="text-gray-500 text-sm leading-relaxed font-light">\n                Every garment is thoughtfully designed and expertly handcrafted,\n                built on continuous research and the refinement of both\n                traditional and contemporary technique.\n              </p>\n            </FadeIn>\n            <FadeIn delay={0.2} className="text-center md:text-left">\n              <div className="aspect-[4/5] bg-[#EAE6DF] mb-6" />\n              <h3 className="font-serif text-xl mb-3">Individuality, Tailored</h3>\n              <p className="text-gray-500 text-sm leading-relaxed font-light">\n                Each piece is made exclusively for its wearer &mdash; celebrating\n                individuality, evoking confidence, and leaving a lasting\n                impression.\n              </p>\n            </FadeIn>\n            <FadeIn delay={0.3} className="text-center md:text-left">\n              <div className="aspect-[4/5] bg-[#EAE6DF] mb-6" />\n              <h3 className="font-serif text-xl mb-3">Heritage, Global Perspective</h3>\n              <p className="text-gray-500 text-sm leading-relaxed font-light">\n                Drawing subtle inspiration from Nigerian heritage while\n                embracing a contemporary global outlook &mdash; culture,\n                artistry and modern couture, seamlessly blended.\n              </p>\n            </FadeIn>\n          </div>\n        </section>'
);

// Wrap EXPERIENCE STRIP content
code = code.replace(
  /<div className="max-w-2xl text-center md:text-left">([\s\S]*?)<\/div>\n\n            <div className="hidden md:flex w-1\/3 justify-end items-center opacity-10 select-none">/g,
  '<SlideUp className="max-w-2xl text-center md:text-left">$1</SlideUp>\n\n            <FadeIn delay={0.3} className="hidden md:flex w-1/3 justify-end items-center opacity-10 select-none">'
);

// Close FadeIn for EXPERIENCE STRIP
code = code.replace(
  /<span className="font-serif text-\[250px\] leading-none text-\[\#5B21A8\]">PA<\/span>\n            <\/div>\n          <\/div>\n        <\/section>/g,
  '<span className="font-serif text-[250px] leading-none text-[#5B21A8]">PA</span>\n            </FadeIn>\n          </div>\n        </section>'
);

// Wrap MANTRA STRIP
code = code.replace(
  /<span className="font-serif italic text-2xl md:text-4xl text-\[\#C4A6F0\] block max-w-3xl mx-auto leading-snug">/g,
  '<FadeIn>\n          <span className="font-serif italic text-2xl md:text-4xl text-[#C4A6F0] block max-w-3xl mx-auto leading-snug">'
);
code = code.replace(
  /of identity, confidence, and individuality.&rdquo;\n          <\/span>\n        <\/section>/g,
  'of identity, confidence, and individuality.&rdquo;\n          </span>\n          </FadeIn>\n        </section>'
);

// Wrap CRAFT NUMBERS STRIP grid
code = code.replace(
  /<div className="max-w-\[1200px\] mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 text-center">\n            <div>/g,
  '<div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 text-center">\n            <FadeIn delay={0.1}>'
);
code = code.replace(
  /House Established<\/div>\n            <\/div>\n            <div>/g,
  'House Established</div>\n            </FadeIn>\n            <FadeIn delay={0.2}>'
);
code = code.replace(
  /Weeks, Handcrafted to Order<\/div>\n            <\/div>\n            <div>/g,
  'Weeks, Handcrafted to Order</div>\n            </FadeIn>\n            <FadeIn delay={0.3}>'
);
code = code.replace(
  /Bespoke, Made to Measure<\/div>\n            <\/div>\n            <div>/g,
  'Bespoke, Made to Measure</div>\n            </FadeIn>\n            <FadeIn delay={0.4}>'
);
code = code.replace(
  /Atelier, Serving Clients Worldwide<\/div>\n            <\/div>\n          <\/div>/g,
  'Atelier, Serving Clients Worldwide</div>\n            </FadeIn>\n          </div>'
);

// Wrap SOCIAL GRID
code = code.replace(
  /<span className="uppercase tracking-\[0.3em\] text-\[10px\] text-\[\#5B21A8\] mb-6 block font-semibold">([\s\S]*?)<\/p>/g,
  '<FadeIn>\n          <span className="uppercase tracking-[0.3em] text-[10px] text-[#5B21A8] mb-6 block font-semibold">$1</p>\n          </FadeIn>'
);
code = code.replace(
  /Add photo\n              <\/div>\n            \)}\)\}\n          <\/div>/g,
  'Add photo\n              </FadeIn>\n            ))}\n          </div>'
);
code = code.replace(
  /<div\n                key=\{i\}\n                className="aspect-square bg-\[\#EAE6DF\] flex items-center justify-center text-\[10px\] uppercase tracking-widest text-gray-400"\n              >/g,
  '<FadeIn\n                key={i}\n                delay={i * 0.1}\n                className="aspect-square bg-[#EAE6DF] flex items-center justify-center text-[10px] uppercase tracking-widest text-gray-400"\n              >'
);

// Wrap FAQ PREVIEW
code = code.replace(
  /<div className="max-w-3xl mx-auto">/g,
  '<FadeIn className="max-w-3xl mx-auto">'
);
code = code.replace(
  /Explore our client guide &rarr;\n            <\/a>\n          <\/div>/g,
  'Explore our client guide &rarr;\n            </a>\n          </FadeIn>'
);

fs.writeFileSync('app/page.tsx', code);
