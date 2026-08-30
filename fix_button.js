const fs = require('fs');
let content = fs.readFileSync('components/ProductManager.tsx', 'utf8');

content = content.replace(
  /style=\{\{ flex: 2,\n\s*style=\{\{/g,
  'style={{ flex: 2,'
);

fs.writeFileSync('components/ProductManager.tsx', content);
