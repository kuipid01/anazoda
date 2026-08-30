const fs = require('fs');
let code = fs.readFileSync('components/ExperienceGallery.tsx', 'utf8');

code = code.replace(
  /<FadeIn delay=\{0.1\} className="relative aspect-\[4\/5\] md:aspect-square overflow-hidden cursor-pointer group" onClick=\{[\s\S]*?\}>/g,
  '<FadeIn delay={0.1}><div className="relative aspect-[4/5] md:aspect-square overflow-hidden cursor-pointer group" onClick={() => { setCurrentIndex(0); setIsOpen(true); }}>'
);
code = code.replace(
  /<\/FadeIn>\n        \n        <FadeIn delay=\{0.2\} className="relative aspect-\[4\/5\] md:aspect-square overflow-hidden cursor-pointer group" onClick=\{[\s\S]*?\}>/g,
  '</div></FadeIn>\n        \n        <FadeIn delay={0.2}><div className="relative aspect-[4/5] md:aspect-square overflow-hidden cursor-pointer group" onClick={() => { setCurrentIndex(1); setIsOpen(true); }}>'
);
code = code.replace(
  /<\/FadeIn>\n      <\/div>/g,
  '</div></FadeIn>\n      </div>'
);

fs.writeFileSync('components/ExperienceGallery.tsx', code);
