const fs = require('fs');
let code = fs.readFileSync('app/page.tsx', 'utf8');

// Hero section height tweak
code = code.replace(
  /<section className="relative w-full h-\[120vh\] overflow-hidden">/,
  '<section className="relative w-full h-[100svh] overflow-hidden">'
);

// Craft Numbers Strip gap tweak
code = code.replace(
  /<div className="max-w-\[1200px\] mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 text-center">/,
  '<div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 text-center">'
);

fs.writeFileSync('app/page.tsx', code);
