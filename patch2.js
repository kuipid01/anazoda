const fs = require('fs');

let content = fs.readFileSync('components/ProductManager.tsx', 'utf8');

// Insert saveLook and removeLook after removeCategory
const insertionPoint = content.indexOf('async function removeCategory(id: string) {');

const insertFunctions = `
  async function saveLook(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(""); 
    if (!lookImages.length) return setToast({ type: "error", message: "Image is required" });
    setLookSaving(true);
    const form = event.currentTarget;
    const title = String(new FormData(form).get("title") || "");
    const priceRange = String(new FormData(form).get("priceRange") || "");
    const position = Number(new FormData(form).get("position") || 1);
    const file = lookImages[0].file;

    const payload = new FormData();
    payload.append("title", title);
    payload.append("priceRange", priceRange);
    payload.append("position", String(position));
    payload.append("image", file);

    try {
      const response = await fetch("/api/admin/looks", { method: "POST", body: payload });
      const data = await response.json();
      if (response.ok) {
        setLooks((items) => [...items, data].sort((a, b) => a.position - b.position));
        URL.revokeObjectURL(lookImages[0].preview);
        setLookImages([]);
        form.reset();
        setToast({ type: "success", message: \`"\${title}" look was saved.\` });
      } else {
        setToast({ type: "error", message: data.error });
      }
    } catch (error) {
      setToast({ type: "error", message: "Failed to save look" });
    } finally {
      setLookSaving(false);
    }
  }

  async function removeLook(id: string) {
    if (!window.confirm("Delete this look and its image?")) return;
    setDeletingLook(id);
    try {
      const response = await fetch(\`/api/admin/looks/\${id}\`, { method: "DELETE" });
      if (response.ok) {
        setLooks((items) => items.filter((item) => item.id !== id));
        setToast({ type: "success", message: "Look deleted" });
      } else {
        setToast({ type: "error", message: (await response.json()).error });
      }
    } catch (e) {
      setToast({ type: "error", message: "Failed to delete look" });
    } finally {
      setDeletingLook(null);
    }
  }

`;

content = content.slice(0, insertionPoint) + insertFunctions + content.slice(insertionPoint);

fs.writeFileSync('components/ProductManager.tsx', content);
