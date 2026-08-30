const fs = require('fs');
let content = fs.readFileSync('components/ProductManager.tsx', 'utf8');

// Add useRouter, usePathname, useSearchParams to imports
content = content.replace(
  /import \{ FormEvent, useCallback, useEffect, useState \} from "react";/,
  'import { FormEvent, useCallback, useEffect, useState } from "react";\nimport { useRouter, usePathname, useSearchParams } from "next/navigation";'
);

// Replace activeTab state with URL synced state
const activeTabOld = /const \[activeTab, setActiveTab\] = useState<"products" \| "categories" \| "social" \| "looks">\(.*?\);/;
const activeTabNew = `const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const activeTab = (searchParams.get("tab") as "products" | "categories" | "social" | "looks") || "products";
  
  const setActiveTab = (tab: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tab);
    router.replace(\`\${pathname}?\${params.toString()}\`, { scroll: false });
  };`;

content = content.replace(activeTabOld, activeTabNew);

fs.writeFileSync('components/ProductManager.tsx', content);
