const fs = require('fs');
let content = fs.readFileSync('app/globals.css', 'utf8');

const additionalMobileCSS = `
/* Additional Mobile Optimizations for Admin */
@media (max-width: 640px) {
  .admin-main { padding: 20px 12px; }
  .admin-title h1 { font-size: 28px; line-height: 1.1; }
  .admin-actions-row { flex-direction: column; }
  .admin-actions-row > * { flex: 1 1 100%; width: 100%; }
  
  .new-product-card { padding: 20px 15px; }
  .new-product-card form { gap: 15px; }
  .admin-upload { padding: 20px; }
  
  .category-manager { padding: 20px 15px !important; }
  .category-manager input { padding: 10px; }
  
  .modal-overlay { padding: 15px 10px; }
  .modal-container { border-radius: 12px; }
  
  .product-admin-grid { gap: 15px; }
  
  .admin-sidebar { padding: 15px 12px; }
  .sidebar-header-row { align-items: center; }
  .brand-group strong { font-size: 14px; }
  .logout-form button { padding: 6px 10px; font-size: 10px; }
}
`;

if (!content.includes('/* Additional Mobile Optimizations for Admin */')) {
  content += '\n' + additionalMobileCSS;
  fs.writeFileSync('app/globals.css', content);
}
