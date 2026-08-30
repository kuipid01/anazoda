const fs = require('fs');
let code = fs.readFileSync('app/page.tsx', 'utf8');

// 1. Add import
code = code.replace(
  /import \{ FadeIn, SlideUp, ParallaxImage \} from "@\/components\/MotionWrappers";/,
  'import { FadeIn, SlideUp, ParallaxImage } from "@/components/MotionWrappers";\nimport ExperienceGallery from "@/components/ExperienceGallery";'
);

// 2. Insert below academy section
const academySectionEnd = /<span className="font-serif text-\[250px\] leading-none text-\[\#5B21A8\]">PA<\/span>\n            <\/FadeIn>\n          <\/div>\n        <\/section>/;

code = code.replace(
  academySectionEnd,
  `<span className="font-serif text-[250px] leading-none text-[#5B21A8]">PA</span>
            </FadeIn>
          </div>
        </section>

        {/* EXPERIENCE GALLERY (LIGHTBOX) */}
        <ExperienceGallery />`
);

fs.writeFileSync('app/page.tsx', code);
