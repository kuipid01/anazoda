const fs = require('fs');
let content = fs.readFileSync('components/ProductManager.tsx', 'utf8');

content = content.replace(
  /const \[lookImages, setLookImages\] = useState<Array<\{ file: File; preview: string \}>>\(\[\]\);/,
  'const [lookImages, setLookImages] = useState<Array<{ file?: File; preview: string; url?: string; publicId?: string }>>([]);'
);

fs.writeFileSync('components/ProductManager.tsx', content);
