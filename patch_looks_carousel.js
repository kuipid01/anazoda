const fs = require('fs');
let content = fs.readFileSync('components/LooksCarousel.tsx', 'utf8');

content = content.replace(
  /<Image\n\s*src=\{look\.imageUrl\}/,
  '<Image\n                  src={look.images?.[0]?.url}'
);

fs.writeFileSync('components/LooksCarousel.tsx', content);
