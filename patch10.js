const fs = require('fs');
let code = fs.readFileSync('app/page.tsx', 'utf8');

let i = 0;
const replacements = [
  '<div className="relative aspect-[4/5] bg-[#EAE6DF] mb-6 overflow-hidden"><Image src="/images/featured/featured-9.jpg" alt="Craftsmanship First" fill className="object-cover transition-transform duration-1000 hover:scale-105" /></div>',
  '<div className="relative aspect-[4/5] bg-[#EAE6DF] mb-6 overflow-hidden"><Image src="/images/featured/featured-19.jpg" alt="Individuality, Tailored" fill className="object-cover transition-transform duration-1000 hover:scale-105" /></div>',
  '<div className="relative aspect-[4/5] bg-[#EAE6DF] mb-6 overflow-hidden"><Image src="/images/featured/featured-30.jpg" alt="Heritage, Global Perspective" fill className="object-cover transition-transform duration-1000 hover:scale-105" /></div>'
];

code = code.replace(/<div className="aspect-\[4\/5\] bg-\[\#EAE6DF\] mb-6" \/>/g, (match) => {
  return replacements[i++];
});

fs.writeFileSync('app/page.tsx', code);
