const fs = require('fs');
let code = fs.readFileSync('app/globals.css', 'utf8');

// Remove duplicate or conflicting rules
code = code.replace(/\.footer-grid section\+section \{ border-left:1px solid var\(--line\); \}/, '');
code = code.replace(/\.copyright \{ border-top:1px solid var\(--line\); padding:30px; color:\#777; font-size:12px; \}/, '.copyright { padding:30px; font-size:12px; }');

// We also need to fix the backslash in our injected rule: section\\+section was injected as section\+section
code = code.replace(/\.footer-grid section\\\+section/, '.footer-grid section+section');

fs.writeFileSync('app/globals.css', code);
