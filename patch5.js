const fs = require('fs');
let code = fs.readFileSync('components/Gallery.tsx', 'utf8');

const imageList = [20, 21, 22, 23, 25, 26, 27, 28];
const replacement = `const looks = [\n  ${imageList.map((num, i) => `{ src: "/images/featured/featured-${num}.jpg", name: "Look ${String(i + 1).padStart(2, '0')}" }`).join(',\n  ')}\n];`;

code = code.replace(
  /const looks = Array\.from\(\{ length: 8 \}, \(\_, i\) => \(\{\n  src: `\/images\/look-\$\{i \+ 1\}\.jpg`,\n  name: `Look \$\{String\(i \+ 1\)\.padStart\(2, "0"\)\}`,\n\}\)\);/,
  replacement
);

fs.writeFileSync('components/Gallery.tsx', code);
