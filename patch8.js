const fs = require('fs');
let code = fs.readFileSync('app/globals.css', 'utf8');

const regex = /\.footer \{ border-top:1px solid var\(--line\); \}/;
const replacement = `.footer { 
  background-color: #d7af78; 
  color: #0B0A0D;
  border-top: none;
}
.footer p, .footer .copyright, .footer .newsletter-check, .footer small { 
  color: #0B0A0D !important; 
  opacity: 0.85;
}
.footer-grid section\\+section { 
  border-left: 1px solid rgba(11, 10, 13, 0.15); 
}
.copyright { 
  border-top: 1px solid rgba(11, 10, 13, 0.15); 
}
.footer-social-icon { 
  border: 1px solid rgba(11, 10, 13, 0.3) !important; 
}`;

code = code.replace(regex, replacement);
fs.writeFileSync('app/globals.css', code);
