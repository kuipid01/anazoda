const fs = require('fs');
let content = fs.readFileSync('components/ProductManager.tsx', 'utf8');

content = content.replace(
  /\{lookSaving \? \(editLookId \? "Updating\.\.\." : "Uploading to Cloudinary\.\.\."\) : \(editLookId \? "Update Experience" : "Add Experience"\)\}\n\s*<\/button>\n\s*<\/form>/,
  '{lookSaving ? (editLookId ? "Updating..." : "Uploading to Cloudinary...") : (editLookId ? "Update Experience" : "Add Experience")}\n                </button>\n              </div>\n              </form>'
);

fs.writeFileSync('components/ProductManager.tsx', content);
