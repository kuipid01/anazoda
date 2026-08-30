const fs = require('fs');
let content = fs.readFileSync('app/api/admin/looks/[id]/route.ts', 'utf8');

content = content.replace(
  /export async function DELETE\(req: Request, \{ params \}: \{ params: \{ id: string \} \}\) \{/,
  'export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {'
);

content = content.replace(
  /const deleted = await deleteLook\(params\.id\);/,
  'const resolvedParams = await params;\n    const deleted = await deleteLook(resolvedParams.id);'
);

content = content.replace(
  /import \{ deleteProductImage \} from "@\/lib\/cloudinary";/,
  'import { deleteImage } from "@/lib/cloudinary";'
);

content = content.replace(
  /await deleteProductImage\(img\.publicId\);/g,
  'await deleteImage(img.publicId);'
);

fs.writeFileSync('app/api/admin/looks/[id]/route.ts', content);
