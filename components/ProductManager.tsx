"use client";

import Image from "next/image";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { CheckCircle2, ImagePlus, LoaderCircle, Plus, Trash2, XCircle, X } from "lucide-react";
import type { Category, Product } from "@/lib/db/schema";

export default function ProductManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [socials, setSocials] = useState<any[]>([]);
  
  const [activeTab, setActiveTab] = useState<"products" | "categories" | "social">("products");
  const [showAddModal, setShowAddModal] = useState(false);
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [categorySaving, setCategorySaving] = useState(false);
  const [deletingCategory, setDeletingCategory] = useState<string | null>(null);
  const [socialSaving, setSocialSaving] = useState(false);
  const [deletingSocial, setDeletingSocial] = useState<string | null>(null);
  const [selectedImages, setSelectedImages] = useState<Array<{ file: File; preview: string }>>([]);
  const [imageInputKey, setImageInputKey] = useState(0);
  const [error, setError] = useState("");
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(null), 4000);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  const load = useCallback(async () => {
    setLoading(true);
    const [productResponse, categoryResponse, socialResponse] = await Promise.all([
      fetch("/api/admin/products"),
      fetch("/api/admin/categories"),
      fetch("/api/admin/social")
    ]);
    const [productData, categoryData, socialData] = await Promise.all([
      productResponse.json(),
      categoryResponse.json(),
      socialResponse.json()
    ]);
    if (productResponse.ok) setProducts(productData); else setError(productData.error);
    if (categoryResponse.ok) setCategories(categoryData); else setError(categoryData.error);
    if (socialResponse.ok) setSocials(socialData); else setError(socialData.error);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  async function create(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError("");
    if (!selectedImages.length) {
      setToast({ type: "error", message: "Add at least one product image before publishing." });
      return;
    }
    setSaving(true);
    const form = event.currentTarget;
    const payload = new FormData(form);
    payload.delete("images");
    selectedImages.forEach(({ file }) => payload.append("images", file));
    try {
      const response = await fetch("/api/admin/products", { method: "POST", body: payload });
      const data = await response.json();
      if (response.ok) {
        selectedImages.forEach(({ preview }) => URL.revokeObjectURL(preview));
        setSelectedImages([]);
        setImageInputKey((value) => value + 1);
        form.reset();
        await load();
        setShowAddModal(false);
        setToast({ type: "success", message: `“${data.name}” was uploaded to Cloudinary and published.` });
      } else {
        setToast({ type: "error", message: data.error || "The product could not be published." });
      }
    } catch {
      setToast({ type: "error", message: "Could not reach the server. Your selections are still here—please try again." });
    } finally {
      setSaving(false);
    }
  }

  function addImages(files: FileList | null) {
    if (!files) return;
    const incoming = Array.from(files);
    setSelectedImages((current) => {
      const available = Math.max(0, 8 - current.length);
      const accepted = incoming.slice(0, available).map((file) => ({ file, preview: URL.createObjectURL(file) }));
      if (incoming.length > available) setToast({ type: "error", message: "You can upload a maximum of 8 images per product." });
      return [...current, ...accepted];
    });
    setImageInputKey((value) => value + 1);
  }

  function removeSelectedImage(index: number) {
    setSelectedImages((current) => {
      URL.revokeObjectURL(current[index].preview);
      return current.filter((_, itemIndex) => itemIndex !== index);
    });
  }

  async function remove(id: string) {
    if (!window.confirm("Delete this product and its Cloudinary image?")) return;
    const response = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    if (response.ok) setProducts((items) => items.filter((p) => p.id !== id));
    else setError((await response.json()).error);
  }

  async function addCategory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(""); setCategorySaving(true);
    const form = event.currentTarget;
    const name = String(new FormData(form).get("name") || "");
    try {
      const response = await fetch("/api/admin/categories", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name }) });
      const data = await response.json();
      if (response.ok) {
        setCategories((items) => [...items, data].sort((a, b) => a.name.localeCompare(b.name)));
        form.reset();
        setToast({ type: "success", message: `“${data.name}” was added and is ready to use.` });
      } else {
        setToast({ type: "error", message: data.error || "The category could not be added." });
      }
    } catch {
      setToast({ type: "error", message: "Could not reach the server. Please try again." });
    } finally {
      setCategorySaving(false);
    }
  }

  async function removeCategory(id: string) {
    if (!window.confirm("Remove this category? Existing products will keep their current category label.")) return;
    const category = categories.find((item) => item.id === id);
    setDeletingCategory(id);
    try {
      const response = await fetch(`/api/admin/categories?id=${encodeURIComponent(id)}`, { method: "DELETE" });
      if (response.ok) {
        setCategories((items) => items.filter((item) => item.id !== id));
        setToast({ type: "success", message: `“${category?.name || "Category"}” was removed.` });
      } else {
        setToast({ type: "error", message: (await response.json()).error || "The category could not be removed." });
      }
    } catch {
      setToast({ type: "error", message: "Could not reach the server. Please try again." });
    } finally {
      setDeletingCategory(null);
    }
  }

  async function handleSeedProducts() {
    if (!window.confirm("Seed the database with the 10 default test products?")) return;
    setLoading(true);
    try {
      const response = await fetch("/api/admin/products/seed", { method: "POST" });
      const data = await response.json();
      if (response.ok) {
        setToast({ type: "success", message: "Database seeded successfully!" });
        await load();
      } else {
        setToast({ type: "error", message: data.error || "Seed failed" });
      }
    } catch {
      setToast({ type: "error", message: "Could not reach the server." });
    } finally {
      setLoading(false);
    }
  }

  async function handleClearProducts() {
    if (!window.confirm("Clear all products and categories from the database? This cannot be undone.")) return;
    setLoading(true);
    try {
      const response = await fetch("/api/admin/products/clear", { method: "POST" });
      const data = await response.json();
      if (response.ok) {
        setToast({ type: "success", message: "Database cleared successfully!" });
        setProducts([]);
        setCategories([]);
      } else {
        setToast({ type: "error", message: data.error || "Clear failed" });
      }
    } catch {
      setToast({ type: "error", message: "Could not reach the server." });
    } finally {
      setLoading(false);
    }
  }

  async function saveSocialLink(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(""); setSocialSaving(true);
    const form = event.currentTarget;
    const formData = new FormData(form);
    const platform = String(formData.get("platform") || "");
    const url = String(formData.get("url") || "");
    try {
      const response = await fetch("/api/admin/social", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ platform, url, active: true })
      });
      const data = await response.json();
      if (response.ok) {
        setSocials((items) => {
          const index = items.findIndex((i) => i.platform === data.platform);
          if (index > -1) {
            const copy = [...items];
            copy[index] = data;
            return copy;
          }
          return [...items, data].sort((a, b) => a.platform.localeCompare(b.platform));
        });
        form.reset();
        setToast({ type: "success", message: `“${data.platform}” link was saved.` });
      } else {
        setToast({ type: "error", message: data.error || "The link could not be saved." });
      }
    } catch {
      setToast({ type: "error", message: "Could not reach the server. Please try again." });
    } finally {
      setSocialSaving(false);
    }
  }

  async function removeSocialLink(id: string) {
    if (!window.confirm("Remove this social link?")) return;
    const social = socials.find((item) => item.id === id);
    setDeletingSocial(id);
    try {
      const response = await fetch(`/api/admin/social?id=${encodeURIComponent(id)}`, { method: "DELETE" });
      if (response.ok) {
        setSocials((items) => items.filter((item) => item.id !== id));
        setToast({ type: "success", message: `“${social?.platform || "Link"}” was removed.` });
      } else {
        setToast({ type: "error", message: (await response.json()).error || "The link could not be removed." });
      }
    } catch {
      setToast({ type: "error", message: "Could not reach the server. Please try again." });
    } finally {
      setDeletingSocial(null);
    }
  }

  const money = (p: Product) => new Intl.NumberFormat("en-NG", { style: "currency", currency: p.currency }).format(p.price / 100);

  return (
    <div className="admin-shell">
      {toast && <div className={`admin-toast ${toast.type}`} role="status" aria-live="polite">
        {toast.type === "success" ? <CheckCircle2 /> : <XCircle />}
        <span>{toast.message}</span>
        <button onClick={() => setToast(null)} aria-label="Dismiss notification">×</button>
      </div>}
      
      <aside className="admin-sidebar">
        <div className="sidebar-header-row">
          <div className="brand-group">
            <div className="monogram">PA</div>
            <strong>House of Anazodo</strong>
          </div>
          <form action="/api/admin/logout" method="post" className="logout-form">
            <button type="submit">Sign out</button>
          </form>
        </div>
        <nav className="admin-nav">
          <button 
            onClick={() => setActiveTab("products")} 
            className={activeTab === "products" ? "active" : ""}
          >
            Products
          </button>
          <button 
            onClick={() => setActiveTab("categories")} 
            className={activeTab === "categories" ? "active" : ""}
          >
            Categories
          </button>
          <button 
            onClick={() => setActiveTab("social")} 
            className={activeTab === "social" ? "active" : ""}
          >
            Social Media
          </button>
          <a href="/" target="_blank">View website ↗</a>
        </nav>
      </aside>

      <main className="admin-main">
        {activeTab === "products" && (
          <>
            <div className="admin-title">
              <div>
                <span>ATELIER CMS</span>
                <h1>Product collection</h1>
              </div>
              <div className="admin-actions-row">
                <button onClick={handleSeedProducts} disabled={loading || saving} className="btn-seed">
                  Seed Test Products
                </button>
                <button onClick={handleClearProducts} disabled={loading || saving} className="btn-clear">
                  Clear Collection
                </button>
                <button onClick={() => setShowAddModal(true)} className="btn-add">
                  <Plus size={17} /> Add product
                </button>
              </div>
            </div>
            
            {error && <div className="admin-error">{error}</div>}
            
            <section className="product-admin-grid">
              {loading ? <div className="admin-empty"><LoaderCircle className="spin" /> Loading products…</div> :
                products.length ? products.map((product) => (
                  <article className="admin-product" key={product.id}>
                    <Image src={product.imageUrl} alt="" width={260} height={320} unoptimized />
                    <div><small>{product.category}</small><h3>{product.name}</h3><p>{money(product)}</p></div>
                    <button onClick={() => remove(product.id)} aria-label={`Delete ${product.name}`}><Trash2 size={16} /></button>
                  </article>
                )) : <div className="admin-empty"><ImagePlus /> No products yet. Add the first couture piece.</div>}
            </section>
          </>
        )}

        {activeTab === "categories" && (
          <section className="category-manager" style={{ gridTemplateColumns: '1fr', gap: '30px' }}>
            <div>
              <span>CATALOGUE ORGANISATION</span>
              <h2>Categories</h2>
              <p>Create reusable categories, then assign them when adding products.</p>
            </div>
            <div>
              <form onSubmit={addCategory}>
                <input name="name" required disabled={categorySaving} placeholder="e.g. Bridal Couture" />
                <button type="submit" disabled={categorySaving}>
                  {categorySaving ? <LoaderCircle className="spin" size={15} /> : <Plus size={15} />}
                  {categorySaving ? "Adding…" : "Add category"}
                </button>
              </form>
              <div className="category-tags">
                {categories.length ? categories.map((category) => (
                  <span key={category.id}>
                    {category.name}
                    <button disabled={deletingCategory === category.id} onClick={() => removeCategory(category.id)} aria-label={`Delete ${category.name}`}>
                      {deletingCategory === category.id ? <LoaderCircle className="spin" size={13} /> : <Trash2 size={13} />}
                    </button>
                  </span>
                )) : <p>No categories yet. Add your first one above.</p>}
              </div>
            </div>
          </section>
        )}

        {activeTab === "social" && (
          <section className="category-manager" style={{ gridTemplateColumns: '1fr', gap: '30px' }}>
            <div>
              <span>SOCIAL PRESENCE</span>
              <h2>Social Media</h2>
              <p>Manage your dynamic social links. Active platforms will automatically show in the footer.</p>
            </div>
            <div>
              <form onSubmit={saveSocialLink} style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                <select name="platform" required style={{ flex: '1 1 120px', padding: '13px', border: '1px solid #ddd', background: '#fff' }}>
                  <option value="">Select Platform</option>
                  <option value="Instagram">Instagram</option>
                  <option value="Facebook">Facebook</option>
                  <option value="Pinterest">Pinterest</option>
                  <option value="TikTok">TikTok</option>
                  <option value="Twitter">Twitter/X</option>
                  <option value="WhatsApp">WhatsApp</option>
                  <option value="YouTube">YouTube</option>
                </select>
                <input name="url" type="url" required placeholder="https://instagram.com/houseofanazodo" style={{ flex: '2 1 240px', padding: '13px', border: '1px solid #ddd' }} />
                <button type="submit" disabled={socialSaving} style={{ minWidth: '135px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px', border: 0, background: '#090909', color: '#fff', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.15em', cursor: 'pointer' }}>
                  {socialSaving ? <LoaderCircle className="spin" size={15} /> : <Plus size={15} />}
                  {socialSaving ? "Saving…" : "Save Link"}
                </button>
              </form>
              <div className="category-tags" style={{ marginTop: '22px' }}>
                {socials.length ? socials.map((item) => (
                  <span key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <strong>{item.platform}:</strong>
                    <a href={item.url} target="_blank" rel="noreferrer" style={{ textDecoration: 'underline', color: 'var(--purple)' }}>{item.url}</a>
                    <button disabled={deletingSocial === item.id} onClick={() => removeSocialLink(item.id)} aria-label={`Delete ${item.platform}`}>
                      {deletingSocial === item.id ? <LoaderCircle className="spin" size={13} /> : <Trash2 size={13} />}
                    </button>
                  </span>
                )) : <p>No dynamic social media links set yet.</p>}
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowAddModal(false)} aria-label="Close form" style={{ position: 'absolute', top: '25px', right: '25px', background: 'none', border: 0, cursor: 'pointer', zIndex: 10 }}>
              <X size={24} />
            </button>
            <section className="new-product-card" id="new-product" style={{ gridTemplateColumns: '1fr', padding: '50px 60px' }}>
              <div>
                <span>NEW PIECE</span>
                <h2>Add to the collection</h2>
                <p>The image is optimized and stored in Cloudinary. Product details are saved in Neon.</p>
              </div>
              <form onSubmit={create}>
                <label>Product name<input name="name" required placeholder="The Amara Gown" /></label>
                <label>Price<input name="price" type="number" min="0" step="0.01" required placeholder="1500000" /></label>
                <label>Currency<select name="currency"><option value="NGN">NGN — ₦</option><option value="USD">USD — $</option><option value="GBP">GBP — £</option></select></label>
                <label>Category<select name="category" required disabled={!categories.length}><option value="">{categories.length ? "Select category" : "Add a category first"}</option>{categories.map((category) => <option key={category.id} value={category.name}>{category.name}</option>)}</select></label>
                <label className="admin-wide">Description<textarea name="description" rows={5} placeholder="Silhouette, materials, handwork and inspiration…" /></label>
                <label className="admin-upload admin-wide"><ImagePlus /><span>{selectedImages.length ? "Add more product images" : "Choose product images"}</span><small>Select up to 8 JPG, PNG or WebP images · maximum 10MB each. The first image becomes the shop cover.</small><input key={imageInputKey} type="file" accept="image/*" multiple disabled={saving || selectedImages.length >= 8} onChange={(event) => addImages(event.target.files)} /></label>
                {selectedImages.length > 0 && <div className="admin-image-previews admin-wide">
                  {selectedImages.map((image, index) => <div key={`${image.file.name}-${image.file.lastModified}-${index}`}>
                    <img src={image.preview} alt={`Selected product image ${index + 1}`} />
                    {index === 0 && <span>Cover</span>}
                    <button type="button" disabled={saving} onClick={() => removeSelectedImage(index)} aria-label={`Remove image ${index + 1}`}><Trash2 size={15} /></button>
                  </div>)}
                </div>}
                <label className="admin-check"><input name="featured" type="checkbox" value="true" /> Feature on homepage</label>
                <label className="admin-check"><input name="published" type="checkbox" value="true" defaultChecked /> Published</label>
                <button className="admin-submit" disabled={saving || !categories.length || !selectedImages.length}>{saving && <LoaderCircle className="spin" size={15} />}{saving ? `Uploading ${selectedImages.length} image${selectedImages.length === 1 ? "" : "s"}…` : "Publish product"}</button>
              </form>
            </section>
          </div>
        </div>
      )}
    </div>
  );
}
