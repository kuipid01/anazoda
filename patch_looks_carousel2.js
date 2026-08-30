const fs = require('fs');
let content = fs.readFileSync('components/LooksCarousel.tsx', 'utf8');

content = content.replace(
  /<Image[\s\S]*?sizes="\(max-width: 768px\) 80vw, 450px"\n\s*\/>/,
  `{look.images?.[0]?.url && (
                  <Image
                    src={look.images[0].url}
                    alt={look.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    sizes="(max-width: 768px) 80vw, 450px"
                  />
                )}`
);

fs.writeFileSync('components/LooksCarousel.tsx', content);
