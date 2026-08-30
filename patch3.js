const fs = require('fs');
let content = fs.readFileSync('components/ProductManager.tsx', 'utf8');

// 1. Add select input for category in the form
const formCategorySelect = `
                <div style={{ display: 'flex', gap: '10px' }}>
                  <select name="category" required disabled={!categories.length} style={{ flex: '1', padding: '13px', border: '1px solid #ddd', background: '#fff' }}>
                    <option value="">{categories.length ? "Select Category" : "Add a category first"}</option>
                    {categories.map((category) => <option key={category.id} value={category.name}>{category.name}</option>)}
                  </select>
                </div>`;

content = content.replace(
  /<div style=\{\{ display: 'flex', gap: '10px' \}\}>\s*<input name="title"/,
  formCategorySelect + '\n                <div style={{ display: \'flex\', gap: \'10px\' }}>\n                  <input name="title"'
);

// 2. Add category to payload in saveLook
content = content.replace(
  /const title = String\(new FormData\(form\)\.get\("title"\) \|\| ""\);/,
  'const title = String(new FormData(form).get("title") || "");\n    const category = String(new FormData(form).get("category") || "");'
);

content = content.replace(
  /payload\.append\("title", title\);/,
  'payload.append("title", title);\n    payload.append("category", category);'
);

// 3. Display category in the look card
content = content.replace(
  /<small>Position: \{look\.position\}<\/small>\s*<h3>\{look\.title\}<\/h3>/,
  '<small>{look.category} (Position: {look.position})</small>\n                      <h3>{look.title}</h3>'
);

fs.writeFileSync('components/ProductManager.tsx', content);
