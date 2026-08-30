const fs = require('fs');
let content = fs.readFileSync('components/ProductManager.tsx', 'utf8');

content = content.replace(
  /key=\{img\.file\.name \+ idx\}/g,
  'key={(img.file?.name || img.publicId || idx.toString()) + idx}'
);

content = content.replace(
  /<h2>Add to the collection<\/h2>/,
  '<h2>{editLookId ? "Edit Experience" : "Add to the collection"}</h2>'
);

content = content.replace(
  /<span>NEW PIECE<\/span>\n\s*<h2>\{editLookId \? "Edit Experience" : "Add to the collection"\}<\/h2>/,
  '<span>{editLookId ? "EDIT EXPERIENCE" : "NEW PIECE"}</span>\n                <h2>{editLookId ? "Edit Experience" : "Add to the collection"}</h2>'
);


fs.writeFileSync('components/ProductManager.tsx', content);
