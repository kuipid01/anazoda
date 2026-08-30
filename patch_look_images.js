const fs = require('fs');
let content = fs.readFileSync('components/ProductManager.tsx', 'utf8');

// replace ImagePlus with other icons in import
content = content.replace(
  /ImagePlus, LoaderCircle, Plus, Trash2, XCircle, X, Info \}/,
  'ImagePlus, LoaderCircle, Plus, Trash2, XCircle, X, Info, ChevronLeft, ChevronRight }'
);

// update lookImages state to use the new multi-image UI and handle multiple images in saveLook
const saveLookOld = `  async function saveLook(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError("");
    if (!lookImages.length) return setToast({ type: "error", message: "A featured image is required." });
    if (!lookCategory) return setToast({ type: "error", message: "Select or create a category for this look." });
    if (lookPosition === "") return setToast({ type: "error", message: "Display order is required." });
    
    setLookSaving(true);
    const form = event.currentTarget;
    const title = String(new FormData(form).get("title") || "");
    const priceRange = String(new FormData(form).get("priceRange") || "");
    const file = lookImages[0].file;

    const payload = new FormData();
    payload.append("title", title);
    payload.append("category", lookCategory);
    payload.append("priceRange", priceRange);
    payload.append("position", String(lookPosition));
    payload.append("image", file);`;

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
    
    // Append images in their arranged order
    lookImages.forEach((img) => payload.append("images", img.file));`;

content = content.replace(saveLookOld, saveLookNew);

// Add multi-image selection and moving logic for looks
const addLookImagesLogic = `
  function addLookImages(files: FileList | null) {
    if (!files) return;
    const incoming = Array.from(files);
    setLookImages((current) => {
      const available = Math.max(0, 10 - current.length);
      const accepted = incoming.slice(0, available).map((file) => ({ file, preview: URL.createObjectURL(file) }));
      if (incoming.length > available) setToast({ type: "error", message: "You can upload a maximum of 10 images per look." });
      return [...current, ...accepted];
    });
  }

  function moveLookImage(index: number, direction: 'left' | 'right') {
    setLookImages((current) => {
      const newImages = [...current];
      if (direction === 'left' && index > 0) {
        [newImages[index - 1], newImages[index]] = [newImages[index], newImages[index - 1]];
      } else if (direction === 'right' && index < newImages.length - 1) {
        [newImages[index + 1], newImages[index]] = [newImages[index], newImages[index + 1]];
      }
      return newImages;
    });
  }

  function removeLookImage(index: number) {
    setLookImages((current) => {
      URL.revokeObjectURL(current[index].preview);
      return current.filter((_, i) => i !== index);
    });
  }
`;

content = content.replace(/  const load = useCallback/, addLookImagesLogic + '\n  const load = useCallback');

const looksUploadOld = /<label className="admin-upload".*?<\/form>/s;

const looksUploadNew = `<label className="admin-upload" style={{ width: '100%', padding: '40px 20px', border: '2px dashed #e0e0e0', background: '#fafafa', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s ease' }}>
                  <ImagePlus size={32} color="#a0a0a0" style={{ marginBottom: '10px' }} />
                  <span style={{ fontSize: '14px', fontWeight: 500, color: '#333' }}>{lookImages.length ? "Add More Images" : "Choose Featured Images"}</span>
                  <span style={{ fontSize: '12px', color: '#888', marginTop: '6px' }}>Select multiple images at once (up to 10).</span>
                  <input type="file" accept="image/*" multiple disabled={lookSaving || lookImages.length >= 10} onChange={(e) => addLookImages(e.target.files)} style={{ display: 'none' }} />
                </label>
                
                {lookImages.length > 0 && (
                  <div style={{ marginTop: '20px', padding: '20px', background: '#fff', border: '1px solid #eaeaea', borderRadius: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                      <span style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#5B21A8', fontWeight: 600 }}>Arrange Image Order</span>
                      <span style={{ fontSize: 11, color: '#888' }}>{lookImages.length}/10 images</span>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '15px', overflowX: 'auto', paddingBottom: '15px' }} className="hide-scrollbar">
                      {lookImages.map((img, idx) => (
                        <div key={img.file.name + idx} style={{ position: 'relative', width: '120px', flexShrink: 0, borderRadius: '6px', overflow: 'hidden', border: '1px solid #ddd', background: '#f9f9f9' }}>
                          <div style={{ position: 'relative', height: '160px', width: '100%' }}>
                            <img src={img.preview} alt="Look preview" style={{ height: '100%', width: '100%', objectFit: 'cover', display: 'block' }} />
                            <div style={{ position: 'absolute', top: 5, left: 5, background: 'rgba(0,0,0,0.6)', color: '#fff', fontSize: 10, padding: '2px 6px', borderRadius: 10 }}>{idx + 1}</div>
                            <button
                              type="button"
                              onClick={() => removeLookImage(idx)}
                              style={{ position: 'absolute', top: 5, right: 5, width: 22, height: 22, borderRadius: '50%', background: '#ff3b30', color: '#fff', border: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            >
                              <X size={12} />
                            </button>
                          </div>
                          <div style={{ display: 'flex', width: '100%', borderTop: '1px solid #eee' }}>
                            <button type="button" disabled={idx === 0} onClick={() => moveLookImage(idx, 'left')} style={{ flex: 1, padding: '6px', display: 'flex', justifyContent: 'center', background: idx === 0 ? '#f0f0f0' : '#fff', color: idx === 0 ? '#ccc' : '#333', border: 0, borderRight: '1px solid #eee', cursor: idx === 0 ? 'not-allowed' : 'pointer' }}>
                              <ChevronLeft size={16} />
                            </button>
                            <button type="button" disabled={idx === lookImages.length - 1} onClick={() => moveLookImage(idx, 'right')} style={{ flex: 1, padding: '6px', display: 'flex', justifyContent: 'center', background: idx === lookImages.length - 1 ? '#f0f0f0' : '#fff', color: idx === lookImages.length - 1 ? '#ccc' : '#333', border: 0, cursor: idx === lookImages.length - 1 ? 'not-allowed' : 'pointer' }}>
                              <ChevronRight size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div style={{ marginTop: '15px', paddingTop: '15px', borderTop: '1px dashed #ddd', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#5B21A8', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                        Look Display Order <Info size={12} />
                      </label>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <input 
                          name="position" 
                          type="number" 
                          min="1" 
                          required 
                          value={lookPosition}
                          onChange={(e) => setLookPosition(e.target.value ? Number(e.target.value) : "")}
                          placeholder="e.g. 1" 
                          style={{ width: '80px', padding: '10px', border: '1px solid #ddd', textAlign: 'center', borderRadius: 4 }} 
                        />
                        <span style={{ fontSize: 12, color: '#777', lineHeight: 1.4 }}>
                          Determines where this entire Experience appears on the homepage carousel.
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={lookSaving || !lookImages.length || !lookCategory || lookPosition === ""}
                  style={{
                    padding: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px',
                    border: 0, background: (lookSaving || !lookImages.length || !lookCategory || lookPosition === "") ? '#c9c9c9' : '#090909',
                    color: '#fff', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em',
                    cursor: (lookSaving || !lookImages.length || !lookCategory || lookPosition === "") ? 'not-allowed' : 'pointer',
                    transition: 'background 0.15s ease',
                    borderRadius: 4
                  }}
                >
                  {lookSaving ? <LoaderCircle className="spin" size={15} /> : <Plus size={15} />}
                  {lookSaving ? "Uploading to Cloudinary..." : "Add Experience"}
                </button>
              </form>`;

content = content.replace(looksUploadOld, looksUploadNew);

// update Look grid mapping to show first image
content = content.replace(/<img src=\{look\.imageUrl\} alt=\{look\.title\} loading="lazy" \/>/,
  '<img src={look.images?.[0]?.url} alt={look.title} loading="lazy" style={{ width: "100%", height: "200px", objectFit: "cover" }} />'
);

fs.writeFileSync('components/ProductManager.tsx', content);
