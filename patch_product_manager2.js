const fs = require('fs');
let content = fs.readFileSync('components/ProductManager.tsx', 'utf8');

// Add state for delete confirmation modal
content = content.replace(
  /const \[deletingLook, setDeletingLook\] = useState<string \| null>\(null\);/,
  'const [deletingLook, setDeletingLook] = useState<string | null>(null);\n  const [lookToDelete, setLookToDelete] = useState<Look | null>(null);'
);

// Update removeLook to take the id without window.confirm (confirm happens before calling removeLook)
const removeLookOld = `  async function removeLook(id: string) {
    if (!window.confirm("Delete this look and its image?")) return;
    setDeletingLook(id);`;

const removeLookNew = `  async function removeLook(id: string) {
    setDeletingLook(id);`;

content = content.replace(removeLookOld, removeLookNew);
content = content.replace(
  /setDeletingLook\(null\);\n    \}\n  \}/,
  'setDeletingLook(null);\n      setLookToDelete(null);\n    }\n  }'
);

// Redesign the Looks grid
const looksGridOld = /<div className="product-grid" style=\{\{ marginTop: '30px' \}\}>[\s\S]*?<\/div>\s*<\/div>\s*<\/section>\s*\)}/s;

const looksGridNew = `<div style={{ marginTop: '40px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#0B0A0D', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Published Experiences</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
                  {looks.length ? looks.map((look) => (
                    <article key={look.id} style={{ background: '#fff', borderRadius: '12px', overflow: 'hidden', border: '1px solid #eaeaea', boxShadow: '0 4px 14px rgba(0,0,0,0.03)', transition: 'transform 0.2s ease, box-shadow 0.2s ease', position: 'relative', display: 'flex', flexDirection: 'column' }}>
                      <div style={{ position: 'relative', width: '100%', paddingTop: '120%' }}>
                        <img src={look.images?.[0]?.url} alt={look.title} loading="lazy" style={{ position: 'absolute', top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                        {look.images?.length > 1 && (
                          <div style={{ position: 'absolute', bottom: 10, right: 10, background: 'rgba(0,0,0,0.7)', color: '#fff', fontSize: '10px', padding: '4px 8px', borderRadius: '20px', fontWeight: 600, letterSpacing: '0.05em' }}>
                            {look.images.length} IMAGES
                          </div>
                        )}
                        <div style={{ position: 'absolute', top: 10, left: 10, background: '#fff', color: '#0B0A0D', fontSize: '10px', padding: '4px 8px', borderRadius: '4px', fontWeight: 700, letterSpacing: '0.1em', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                          POS {look.position}
                        </div>
                      </div>
                      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                        <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#5B21A8', fontWeight: 600, marginBottom: '6px' }}>{look.category}</span>
                        <h3 style={{ fontSize: '18px', fontFamily: 'serif', color: '#0B0A0D', margin: '0 0 8px 0', lineHeight: 1.2 }}>{look.title}</h3>
                        {look.priceRange && <p style={{ fontSize: '13px', color: '#777', margin: 0, marginTop: 'auto' }}>{look.priceRange}</p>}
                      </div>
                      <button 
                        disabled={deletingLook === look.id} 
                        onClick={() => setLookToDelete(look)} 
                        aria-label="Delete look"
                        style={{ position: 'absolute', top: 10, right: 10, width: 32, height: 32, borderRadius: '50%', background: '#fff', color: '#ff3b30', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
                      >
                        {deletingLook === look.id ? <LoaderCircle className="spin" size={16} /> : <Trash2 size={16} />}
                      </button>
                    </article>
                  )) : <div style={{ gridColumn: '1 / -1', padding: '60px 20px', textAlign: 'center', background: '#fbfbfb', border: '1px dashed #ddd', borderRadius: '12px', color: '#888' }}><ImagePlus size={32} style={{ margin: '0 auto 15px', opacity: 0.5 }} /> No experiences published yet. Add your first one above.</div>}
                </div>
              </div>
            </div>
          </section>
        )}`;

content = content.replace(looksGridOld, looksGridNew);

// Add the custom confirmation modal for deletion right before the final closing div
const deleteModalHTML = `
      {/* Delete Confirmation Modal */}
      {lookToDelete && (
        <div className="modal-overlay" onClick={() => setLookToDelete(null)} style={{ zIndex: 70 }}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 420, padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '30px', textAlign: 'center' }}>
              <div style={{ width: 60, height: 60, borderRadius: '50%', background: '#fff0f0', color: '#ff3b30', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                <Trash2 size={28} />
              </div>
              <h2 style={{ fontSize: 22, fontFamily: 'serif', margin: '0 0 10px 0', color: '#0B0A0D' }}>Delete Experience?</h2>
              <p style={{ fontSize: 14, color: '#666', lineHeight: 1.5, margin: 0 }}>
                Are you sure you want to permanently delete <strong>"{lookToDelete.title}"</strong> and its {lookToDelete.images?.length || 1} image{lookToDelete.images?.length !== 1 ? 's' : ''} from Cloudinary? This action cannot be undone.
              </p>
            </div>
            <div style={{ display: 'flex', borderTop: '1px solid #eee' }}>
              <button 
                onClick={() => setLookToDelete(null)} 
                disabled={deletingLook === lookToDelete.id}
                style={{ flex: 1, padding: '16px', background: '#fff', border: 0, borderRight: '1px solid #eee', fontSize: 13, fontWeight: 600, color: '#555', cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button 
                onClick={() => removeLook(lookToDelete.id)} 
                disabled={deletingLook === lookToDelete.id}
                style={{ flex: 1, padding: '16px', background: '#fff0f0', border: 0, fontSize: 13, fontWeight: 600, color: '#ff3b30', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
              >
                {deletingLook === lookToDelete.id ? <><LoaderCircle className="spin" size={16} /> Deleting...</> : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
`;

content = content.replace(
  /(\s*)<\/div>\s*\);\s*\}\s*$/m,
  deleteModalHTML + '$1</div>\n  );\n}\n'
);

fs.writeFileSync('components/ProductManager.tsx', content);
