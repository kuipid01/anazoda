const fs = require('fs');
let code = fs.readFileSync('app/globals.css', 'utf8');

code = code.replace(
  /\.footer-grid section\+section \{ border-left:0; border-top:1px solid var\(--line\); \}/,
  '.footer-grid section+section { border-left:0; border-top:1px solid rgba(11, 10, 13, 0.15) !important; }'
);

fs.writeFileSync('app/globals.css', code);
