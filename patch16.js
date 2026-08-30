const fs = require('fs');
let code = fs.readFileSync('app/consultation/page.tsx', 'utf8');

code = code.replace(
  /<FadeIn delay=\{0\.2\} id="consultation-form" className="scroll-mt-20">/,
  '<div id="consultation-form" className="scroll-mt-20"><FadeIn delay={0.2}>'
);
code = code.replace(
  /<\/ConsultationForm>\n\s*<\/div>\n\s*<\/FadeIn>/,
  '</ConsultationForm>\n            </div>\n          </FadeIn></div>'
);

// Wait, the ConsultationForm is self closing in my code! Let's check how I wrote it.
