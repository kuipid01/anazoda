const fs = require('fs');
let code = fs.readFileSync('app/page.tsx', 'utf8');

const socialGridRegex = /<div className="max-w-\[1400px\] mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">[\s\S]*?<\/div>/;

const newSocialGrid = `<div className="max-w-[1400px] mx-auto grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num, i) => (
              <FadeIn
                key={num}
                delay={i * 0.1}
                className="relative aspect-square bg-[#EAE6DF] flex items-center justify-center overflow-hidden group"
              >
                <Image 
                  src={\`/images/featured/featured-\${num}.jpg\`} 
                  alt={\`Anazodo featured \${num}\`} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-105" 
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </FadeIn>
            ))}
          </div>`;

code = code.replace(socialGridRegex, newSocialGrid);
fs.writeFileSync('app/page.tsx', code);
