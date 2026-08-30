const fs = require('fs');
let code = fs.readFileSync('components/Header.tsx', 'utf8');

// 1. Add import
if (!code.includes('framer-motion')) {
  code = code.replace(
    /import Link from "next\/link";/,
    'import Link from "next/link";\nimport { motion, AnimatePresence } from "framer-motion";'
  );
}

// 2. Replace the mobile drawer
const oldDrawerRegex = /\{\/\* MOBILE FULL SCREEN MENU \*\/\}\n\s*\{open && \(\n\s*<div className="fixed inset-0 z-50 bg-\[\#FDFBF7\] flex flex-col items-center pt-8 px-6 lg:hidden">[\s\S]*?<\/div>\n\s*\)\}/;

const newDrawer = `{/* MOBILE FULL SCREEN MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-[#d7af78] flex flex-col items-center pt-8 px-6 lg:hidden"
          >
            <button aria-label="Close menu" onClick={() => setOpen(false)} className="self-end text-[#0B0A0D]">
              <X size={24} />
            </button>
            <div className="font-serif italic text-3xl text-[#0B0A0D] mt-6 mb-10">PA</div>
            <nav className="w-full max-w-xs flex flex-col items-center gap-6">
              {links.map((link, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                  className="flex flex-col items-center gap-3" 
                  key={link.label}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="text-sm uppercase tracking-[0.2em] text-[#0B0A0D]"
                  >
                    {link.label}
                  </Link>
                  {link.children?.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href}
                      onClick={() => setOpen(false)}
                      className="text-xs uppercase tracking-[0.15em] text-[#0B0A0D]/70 hover:text-[#0B0A0D]"
                    >
                      {child.label}
                    </Link>
                  ))}
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>`;

code = code.replace(oldDrawerRegex, newDrawer);

fs.writeFileSync('components/Header.tsx', code);
