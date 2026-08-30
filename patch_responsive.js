const fs = require('fs');
let content = fs.readFileSync('components/ProductManager.tsx', 'utf8');

// Fix Add Product modal hardcoded padding
content = content.replace(
  /<section className="new-product-card" id="new-product" style=\{\{ gridTemplateColumns: '1fr', padding: '50px 60px' \}\}>/g,
  '<section className="new-product-card" id="new-product" style={{ gridTemplateColumns: "1fr", padding: "clamp(25px, 5vw, 50px)" }}>'
);

// Fix Add Category modal hardcoded padding
content = content.replace(
  /<section className="new-product-card" style=\{\{ padding: '30px 40px', gridTemplateColumns: '1fr' \}\}>/g,
  '<section className="new-product-card" style={{ padding: "clamp(25px, 5vw, 40px)", gridTemplateColumns: "1fr" }}>'
);

// Fix Looks Grid minmax to be more mobile friendly
content = content.replace(
  /gridTemplateColumns: 'repeat\(auto-fill, minmax\(280px, 1fr\)\)'/g,
  'gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))"'
);

// Check if there are other hardcoded layout constraints in the main Looks tab
content = content.replace(
  /<section className="new-product-card" style=\{\{ gridTemplateColumns: '1fr', padding: '50px 60px' \}\}>/g,
  '<section className="new-product-card" style={{ gridTemplateColumns: "1fr", padding: "clamp(25px, 5vw, 50px)" }}>'
);

// Ensure modal close buttons don't get cut off on mobile by placing them nicely
content = content.replace(
  /<button className="modal-close" onClick=\{\(\) => setShowAddModal\(false\)\} aria-label="Close form" style=\{\{ position: 'absolute', top: '25px', right: '25px', background: 'none', border: 0, cursor: 'pointer', zIndex: 10 \}\}>/g,
  '<button className="modal-close" onClick={() => setShowAddModal(false)} aria-label="Close form" style={{ position: "absolute", top: "15px", right: "15px", background: "none", border: 0, cursor: "pointer", zIndex: 10 }}>'
);

fs.writeFileSync('components/ProductManager.tsx', content);
