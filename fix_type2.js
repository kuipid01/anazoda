const fs = require('fs');
let content = fs.readFileSync('components/ProductManager.tsx', 'utf8');

content = content.replace(
  /lookImages\.forEach\(\(img\) => payload\.append\("images", img\.file\)\);/g,
  'lookImages.forEach((img) => { if (img.file) payload.append("images", img.file); });'
);

fs.writeFileSync('components/ProductManager.tsx', content);
