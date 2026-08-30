const fs = require('fs');
let code = fs.readFileSync('app/page.tsx', 'utf8');

const regex = /\{\/\* EXPERIENCE STRIP \*\/\}\n        <section className="py-24 px-6 md:px-12 bg-white" id="academy">\n          <FadeIn className="relative max-w-\[1400px\] mx-auto h-\[60vh\] md:h-\[80vh\] overflow-hidden group">\n            <Image \n              src="\/images\/featured\/featured-29\.jpg" \n              alt="The Anazodo Experience" \n              fill \n              className="object-cover object-center transition-transform duration-1000 group-hover:scale-105"\n            \/>\n            <div className="absolute inset-0 bg-black\/10 group-hover:bg-black\/20 transition-colors duration-700" \/>/g;

const replacement = `{/* EXPERIENCE STRIP */}
        <section className="py-24 bg-white" id="academy">
          <FadeIn className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden group">
            <Image 
              src="/images/featured/featured-29.jpg" 
              alt="The Anazodo Experience" 
              fill 
              className="object-cover object-center transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-700" />`;

code = code.replace(regex, replacement);
fs.writeFileSync('app/page.tsx', code);
