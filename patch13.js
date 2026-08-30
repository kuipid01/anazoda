const fs = require('fs');
let code = fs.readFileSync('components/Header.tsx', 'utf8');

const regex = /<nav className="hidden lg:flex items-center gap-8">/;
const replacement = `<div><nav className="hidden lg:flex items-center gap-8">`;

code = code.replace(regex, replacement);

const regex2 = /<\/nav>\n\n          \{\/\* CENTER — logo \*\/\}/;
const replacement2 = `</nav></div>\n\n          {/* CENTER — logo */}`;

code = code.replace(regex2, replacement2);

fs.writeFileSync('components/Header.tsx', code);
