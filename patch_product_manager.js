const fs = require('fs');

let content = fs.readFileSync('components/ProductManager.tsx', 'utf8');

// 1. Import Look type
content = content.replace(
  /import type \{ Category, Product \} from "@\/lib\/db\/schema";/,
  'import type { Category, Product, Look } from "@/lib/db/schema";'
);

// 2. Add looks state
content = content.replace(
  /const \[socials, setSocials\] = useState<any\[\]>\(\[\]\);/,
  'const [socials, setSocials] = useState<any[]>([]);\n  const [looks, setLooks] = useState<Look[]>([]);\n  const [lookSaving, setLookSaving] = useState(false);\n  const [deletingLook, setDeletingLook] = useState<string | null>(null);\n  const [lookImages, setLookImages] = useState<Array<{ file: File; preview: string }>>([]);'
);

// 3. Update activeTab type
content = content.replace(
  /const \[activeTab, setActiveTab\] = useState<"products" | "categories" | "social">/,
  'const [activeTab, setActiveTab] = useState<"products" | "categories" | "social" | "looks">'
);

// 4. Update load function to fetch looks
content = content.replace(
  /const \[productResponse, categoryResponse, socialResponse\] = await Promise\.all\(\[\n\s*fetch\("\/api\/admin\/products"\),\n\s*fetch\("\/api\/admin\/categories"\),\n\s*fetch\("\/api\/admin\/social"\)\n\s*\]\);/,
  'const [productResponse, categoryResponse, socialResponse, looksResponse] = await Promise.all([\n      fetch("/api/admin/products"),\n      fetch("/api/admin/categories"),\n      fetch("/api/admin/social"),\n      fetch("/api/admin/looks")\n    ]);'
);

content = content.replace(
  /const \[productData, categoryData, socialData\] = await Promise\.all\(\[\n\s*productResponse\.json\(\),\n\s*categoryResponse\.json\(\),\n\s*socialResponse\.json\(\)\n\s*\]\);/,
  'const [productData, categoryData, socialData, looksData] = await Promise.all([\n      productResponse.json(),\n      categoryResponse.json(),\n      socialResponse.json(),\n      looksResponse.json()\n    ]);'
);

content = content.replace(
  /if \(socialResponse\.ok\) setSocials\(socialData\); else setError\(socialData\.error\);/,
  'if (socialResponse.ok) setSocials(socialData); else setError(socialData.error);\n    if (looksResponse.ok) setLooks(looksData); else setError(looksData.error);'
);

// 5. Add sidebar button for looks
content = content.replace(
  /<button \n\s*onClick=\{\(\) => setActiveTab\("social"\)\} \n\s*className=\{activeTab === "social" \? "active" : ""\}\n\s*>\n\s*Social Links\n\s*<\/button>/,
  '<button \n            onClick={() => setActiveTab("social")} \n            className={activeTab === "social" ? "active" : ""}\n          >\n            Social Links\n          </button>\n          <button \n            onClick={() => setActiveTab("looks")} \n            className={activeTab === "looks" ? "active" : ""}\n          >\n            Looks & Experiences\n          </button>'
);

// 6. Add looks UI section
const looksSection = `
        {activeTab === "looks" && (
          <section className="category-manager" style={{ gridTemplateColumns: '1fr', gap: '30px' }}>
            <div>
              <span>EXPERIENCES</span>
              <h2>Looks to Experiences</h2>
              <p>Create visual looks with an optional price range. These will be displayed in a horizontally scrolling section.</p>
            </div>
            <div>
              <form onSubmit={saveLook} style={{ display: 'flex', flexDirection: 'column', gap: '15px', background: '#f9f9f9', padding: '20px', border: '1px solid #ddd' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <input name="title" required placeholder="Look Title (e.g. Traditional Bridal)" style={{ flex: '1', padding: '13px', border: '1px solid #ddd' }} />
                  <input name="priceRange" placeholder="Price Range (e.g. $1000 - $3000)" style={{ flex: '1', padding: '13px', border: '1px solid #ddd' }} />
                  <input name="position" type="number" min="0" required placeholder="Display Order (e.g. 1)" defaultValue="1" style={{ width: '150px', padding: '13px', border: '1px solid #ddd' }} />
                </div>
                
                <label className="admin-upload" style={{ width: '100%' }}>
                  <ImagePlus /><span>{lookImages.length ? "Change Image" : "Choose Featured Image"}</span>
                  <input type="file" accept="image/*" disabled={lookSaving} onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      const file = e.target.files[0];
                      if(lookImages.length) URL.revokeObjectURL(lookImages[0].preview);
                      setLookImages([{ file, preview: URL.createObjectURL(file) }]);
                    }
                  }} />
                </label>
                {lookImages.length > 0 && <div className="admin-image-previews" style={{ marginTop: 0 }}>
                  <img src={lookImages[0].preview} alt="Look preview" style={{ height: '100px', width: 'auto', objectFit: 'cover' }} />
                </div>}

                <button type="submit" disabled={lookSaving || !lookImages.length} style={{ padding: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px', border: 0, background: '#090909', color: '#fff', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', cursor: 'pointer' }}>
                  {lookSaving ? <LoaderCircle className="spin" size={15} /> : <Plus size={15} />}
                  {lookSaving ? "Uploading to Cloudinary…" : "Add Look"}
                </button>
              </form>

              <div className="product-grid" style={{ marginTop: '30px' }}>
                {looks.length ? looks.map((look) => (
                  <article key={look.id} className="product-card">
                    <img src={look.imageUrl} alt={look.title} loading="lazy" />
                    <div>
                      <small>Position: {look.position}</small>
                      <h3>{look.title}</h3>
                      {look.priceRange && <p>{look.priceRange}</p>}
                    </div>
                    <button disabled={deletingLook === look.id} onClick={() => removeLook(look.id)} aria-label={"Delete look"}>
                      {deletingLook === look.id ? <LoaderCircle className="spin" size={16} /> : <Trash2 size={16} />}
                    </button>
                  </article>
                )) : <div className="admin-empty"><ImagePlus /> No looks added yet.</div>}
              </div>
            </div>
          </section>
        )}
`;

content = content.replace(
  /<\/main>/,
  looksSection + '\n      </main>'
);

// 7. Add saveLook and removeLook functions
const functions = `
  async function saveLook(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(""); 
    if (!lookImages.length) return setToast({ type: "error", message: "Image is required" });
    setLookSaving(true);
    const form = event.currentTarget;
    const title = String(new FormData(form).get("title") || "");
    const priceRange = String(new FormData(form).get("priceRange") || "");
    const position = Number(new FormData(form).get("position") || 1);
    const file = lookImages[0].file;

    try {
      // 1. Upload to cloudinary via a direct upload endpoint or by using the existing product image upload pattern.
      // Wait, the products POST endpoint handles Cloudinary upload itself using formidable/formData!
      // I should create a generic upload via POST /api/admin/looks but wait, Next.js App Router API doesn't easily parse multipart form data unless we use a library or manual parsing.
      // Wait, how does /api/admin/products handle it? It probably parses FormData directly! Let's check how I can send it.
      const payload = new FormData();
      payload.append("title", title);
      payload.append("priceRange", priceRange);
      payload.append("position", String(position));
      payload.append("image", file);

      // Actually, my /api/admin/looks POST expects req.json()... wait!
      // If I wrote POST to expect req.json(), then I must upload to Cloudinary directly from client, OR modify the backend to parse FormData!
    } catch (e) {}
  }
`;

// Wait! My `app/api/admin/looks/route.ts` expects `req.json()` with `imageUrl` and `imagePublicId`.
// So the client must upload to Cloudinary? No, the client doesn't have the CLOUDINARY_API_SECRET.
// I should rewrite `app/api/admin/looks/route.ts` to parse FormData and upload to Cloudinary!
// I'll leave ProductManager.tsx patching for a sec and write a full replacement instead of regexes.

fs.writeFileSync('components/ProductManager.tsx', content);
