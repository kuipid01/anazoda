const fs = require('fs');
let content = fs.readFileSync('components/ProductManager.tsx', 'utf8');

// 1. Add state for editLookId
content = content.replace(
  /const \[deletingLook, setDeletingLook\] = useState<string \| null>\(null\);/,
  'const [deletingLook, setDeletingLook] = useState<string | null>(null);\n  const [editLookId, setEditLookId] = useState<string | null>(null);'
);

// 2. Add Edit button to Look card
content = content.replace(
  /<button \n\s*disabled=\{deletingLook === look\.id\} \n\s*onClick=\{\(\) => setLookToDelete\(look\)\} \n\s*aria-label="Delete look"/,
  `<button 
                        onClick={() => openEditLook(look)} 
                        aria-label="Edit look"
                        style={{ position: 'absolute', top: 10, right: 50, width: 32, height: 32, borderRadius: '50%', background: '#fff', color: '#5B21A8', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                      </button>
                      <button 
                        disabled={deletingLook === look.id} 
                        onClick={() => setLookToDelete(look)} 
                        aria-label="Delete look"`
);

// 3. openEditLook function
const openEditLookFn = `
  function openEditLook(look: Look) {
    setEditLookId(look.id);
    setLookCategory(look.category);
    setLookPosition(look.position);
    setLookImages(look.images ? look.images.map(img => ({ preview: img.url, url: img.url, publicId: img.publicId, file: undefined as any })) : []);
    
    // Reset form values slightly hacky by wrapping in setTimeout for next tick
    setTimeout(() => {
      const form = document.getElementById("look-form") as HTMLFormElement;
      if (form) {
        (form.elements.namedItem("title") as HTMLInputElement).value = look.title;
        (form.elements.namedItem("priceRange") as HTMLInputElement).value = look.priceRange || "";
        window.scrollTo({ top: document.getElementById("look-form")?.offsetTop, behavior: 'smooth' });
      }
    }, 50);
  }

  function cancelEditLook() {
    setEditLookId(null);
    setLookCategory("");
    setLookPosition("");
    setLookImages([]);
    const form = document.getElementById("look-form") as HTMLFormElement;
    if (form) form.reset();
  }
`;

content = content.replace(
  /function addLookImages\(files: FileList \| null\) \{/,
  openEditLookFn + '\n  function addLookImages(files: FileList | null) {'
);

// 4. Update saveLook to handle edit mode
const saveLookOld = `  async function saveLook(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError("");
    if (!lookImages.length) return setToast({ type: "error", message: "At least one image is required." });
    if (!lookCategory) return setToast({ type: "error", message: "Select or create a category for this look." });
    if (lookPosition === "") return setToast({ type: "error", message: "Display order is required." });
    
    setLookSaving(true);
    const form = event.currentTarget;
    const title = String(new FormData(form).get("title") || "");
    const priceRange = String(new FormData(form).get("priceRange") || "");

    const payload = new FormData();
    payload.append("title", title);
    payload.append("category", lookCategory);
    payload.append("priceRange", priceRange);
    payload.append("position", String(lookPosition));
    
    // Append images in their arranged order
    lookImages.forEach((img) => payload.append("images", img.file));

    try {
      const res = await fetch("/api/admin/looks", { method: "POST", body: payload });
      if (!res.ok) throw new Error((await res.json()).error);
      const look = await res.json();
      setLooks((cur) => [...cur, look].sort((a, b) => a.position - b.position));
      setToast({ type: "success", message: "Experience added" });
      form.reset();
      setLookImages([]);
      setLookCategory("");
      setLookPosition("");
    } catch (e: any) {
      setToast({ type: "error", message: e.message || "Failed to save experience" });
    } finally {
      setLookSaving(false);
    }
  }`;

const saveLookNew = `  async function saveLook(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError("");
    if (!lookImages.length) return setToast({ type: "error", message: "At least one image is required." });
    if (!lookCategory) return setToast({ type: "error", message: "Select or create a category for this look." });
    if (lookPosition === "") return setToast({ type: "error", message: "Display order is required." });
    
    setLookSaving(true);
    const form = event.currentTarget;
    const title = String(new FormData(form).get("title") || "");
    const priceRange = String(new FormData(form).get("priceRange") || "");

    const payload = new FormData();
    payload.append("title", title);
    payload.append("category", lookCategory);
    payload.append("priceRange", priceRange);
    payload.append("position", String(lookPosition));
    
    if (editLookId) {
      const imageLayout = lookImages.map((img, i) => {
        if (img.publicId) return { type: "existing", url: img.url, publicId: img.publicId };
        return { type: "new", fileIndex: i };
      });
      payload.append("imageLayout", JSON.stringify(imageLayout));
      
      lookImages.forEach((img) => {
         if (!img.publicId && img.file) payload.append("newImages", img.file);
      });
      
      try {
        const res = await fetch(\`/api/admin/looks/\${editLookId}\`, { method: "PUT", body: payload });
        if (!res.ok) throw new Error((await res.json()).error);
        const updatedLook = await res.json();
        setLooks((cur) => cur.map(l => l.id === editLookId ? updatedLook : l).sort((a, b) => a.position - b.position));
        setToast({ type: "success", message: "Experience updated" });
        cancelEditLook();
      } catch (e: any) {
        setToast({ type: "error", message: e.message || "Failed to update experience" });
      } finally {
        setLookSaving(false);
      }
    } else {
      // Create logic
      lookImages.forEach((img) => payload.append("images", img.file));
  
      try {
        const res = await fetch("/api/admin/looks", { method: "POST", body: payload });
        if (!res.ok) throw new Error((await res.json()).error);
        const look = await res.json();
        setLooks((cur) => [...cur, look].sort((a, b) => a.position - b.position));
        setToast({ type: "success", message: "Experience added" });
        form.reset();
        setLookImages([]);
        setLookCategory("");
        setLookPosition("");
      } catch (e: any) {
        setToast({ type: "error", message: e.message || "Failed to save experience" });
      } finally {
        setLookSaving(false);
      }
    }
  }`;

content = content.replace(saveLookOld, saveLookNew);

// 5. Update Look form UI to show Edit/Cancel buttons
content = content.replace(
  /<form onSubmit=\{saveLook\}>/g,
  '<form id="look-form" onSubmit={saveLook}>'
);

content = content.replace(
  /\{lookSaving \? "Uploading to Cloudinary\.\.\." : "Add Experience"\}/,
  '{lookSaving ? (editLookId ? "Updating..." : "Uploading to Cloudinary...") : (editLookId ? "Update Experience" : "Add Experience")}'
);

content = content.replace(
  /<button\n\s*type="submit"\n\s*disabled=\{lookSaving \|\| !lookImages\.length \|\| !lookCategory \|\| lookPosition === ""\}/,
  `<div style={{ display: 'flex', gap: '10px' }}>
                  {editLookId && (
                    <button
                      type="button"
                      onClick={cancelEditLook}
                      disabled={lookSaving}
                      style={{
                        padding: '15px', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        border: '1px solid #ddd', background: '#fff', color: '#555', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em',
                        cursor: lookSaving ? 'not-allowed' : 'pointer', borderRadius: 4
                      }}
                    >
                      Cancel Edit
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={lookSaving || !lookImages.length || !lookCategory || lookPosition === ""}
                    style={{ flex: 2,`
);

content = content.replace(
  /\{lookSaving \? "Uploading to Cloudinary\.\.\." : \(editLookId \? "Update Experience" : "Add Experience"\)\}\n\s*<\/button>/,
  '{lookSaving ? (editLookId ? "Updating..." : "Uploading to Cloudinary...") : (editLookId ? "Update Experience" : "Add Experience")}\n                </button>\n              </div>'
);

fs.writeFileSync('components/ProductManager.tsx', content);
