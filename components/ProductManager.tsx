"use client";

import Image from "next/image";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { CheckCircle2, ImagePlus, LoaderCircle, Plus, Trash2, XCircle, X, Info, ChevronLeft, ChevronRight } from "lucide-react";
import type { Category, Product, Look } from "@/lib/db/schema";

export default function ProductManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [socials, setSocials] = useState<any[]>([]);
  const [looks, setLooks] = useState<Look[]>([]);

  const [lookSaving, setLookSaving] = useState(false);
  const [deletingLook, setDeletingLook] = useState<string | null>(null);
  const [lookImages, setLookImages] = useState<Array<{ file: File; preview: string }>>([]);
  const [lookCategory, setLookCategory] = useState("");
  const [lookPosition, setLookPosition] = useState<number | "">("");

  const [newProductCategory, setNewProductCategory] = useState("");

  const [activeTab, setActiveTab] = useState<"products" | "categories" | "social" | "looks">("products");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);

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

  const load = useCallback(async () => {
    setLoading(true);
    const [productResponse, categoryResponse, socialResponse, looksResponse] = await Promise.all([
      fetch("/api/admin/products"),
      fetch("/api/admin/categories"),
      fetch("/api/admin/social"),
      fetch("/api/admin/looks")
    ]);
    const [productData, categoryData, socialData, looksData] = await Promise.all([
      productResponse.json(),
      categoryResponse.json(),
      socialResponse.json(),
      looksResponse.json()
    ]);
    if (productResponse.ok) setProducts(productData); else setError(productData.error);
    if (categoryResponse.ok) setCategories(categoryData); else setError(categoryData.error);
    if (socialResponse.ok) setSocials(socialData); else setError(socialData.error);
    if (looksResponse.ok) setLooks(looksData); else setError(looksData.error);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  async function create(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError("");
    if (!selectedImages.length) {
      setToast({ type: "error", message: "Add at least one product image before publishing." });
      return;
    }
    if (!newProductCategory) {
      setToast({ type: "error", message: "Select or create a category for this product." });
      return;
    }
    setSaving(true);
    const form = event.currentTarget;
    const payload = new FormData(form);
    payload.delete("images");
    payload.set("category", newProductCategory);
    selectedImages.forEach(({ file }) => payload.append("images", file));
    try {
      const response = await fetch("/api/admin/products", { method: "POST", body: payload });
      const data = await response.json();
      if (response.ok) {
        selectedImages.forEach(({ preview }) => URL.revokeObjectURL(preview));
        setSelectedImages([]);
        setImageInputKey((value) => value + 1);
        form.reset();
        setNewProductCategory("");
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
        if (showCategoryModal) {
          setShowCategoryModal(false);
          if (activeTab === "looks") setLookCategory(data.name);
          else setNewProductCategory(data.name);
        }
      } else {
        setToast({ type: "error", message: data.error || "The category could not be added." });
      }
    } catch {
      setToast({ type: "error", message: "Could not reach the server. Please try again." });
    } finally {
      setCategorySaving(false);
    }
  }

  async function saveLook(event: FormEvent<HTMLFormElement>) {
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
      const response = await fetch("/api/admin/looks", { method: "POST", body: payload });
      const data = await response.json();
      if (response.ok) {
        setLooks((items) => [...items, data].sort((a, b) => a.position - b.position));
        URL.revokeObjectURL(lookImages[0].preview);
        setLookImages([]);
        setLookCategory("");
        setLookPosition("");
        form.reset();
        setToast({ type: "success", message: `"${title}" look was saved.` });
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
      const response = await fetch(`/api/admin/looks/${id}`, { method: "DELETE" });
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
          <button onClick={() => setActiveTab("products")} className={activeTab === "products" ? "active" : ""}>Products</button>
          <button onClick={() => setActiveTab("categories")} className={activeTab === "categories" ? "active" : ""}>Categories</button>
          <button onClick={() => setActiveTab("social")} className={activeTab === "social" ? "active" : ""}>Social Media</button>
          <button onClick={() => setActiveTab("looks")} className={activeTab === "looks" ? "active" : ""}>Looks & Experiences</button>
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
                <button onClick={handleSeedProducts} disabled={loading || saving} className="btn-seed">Seed Test Products</button>
                <button onClick={handleClearProducts} disabled={loading || saving} className="btn-clear">Clear Collection</button>
                <button onClick={() => setShowAddModal(true)} className="btn-add"><Plus size={17} /> Add product</button>
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
              <p>Create reusable categories, then assign them when adding products or looks.</p>
            </div>
            <div>
              <form onSubmit={addCategory} style={{ display: "flex", gap: 10 }}>
                <input name="name" required disabled={categorySaving} placeholder="e.g. Bridal Couture" style={{ flex: 1 }} />
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

        {activeTab === "looks" && (
          <section className="category-manager" style={{ gridTemplateColumns: '1fr', gap: '30px' }}>
            <div>
              <span>EXPERIENCES</span>
              <h2>Looks to Experiences</h2>
              <p>Create visual looks with an optional price range. These will be displayed in a horizontally scrolling section.</p>
            </div>
            <div>
              <form
                onSubmit={saveLook}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '18px',
                  background: '#fbfbfb',
                  padding: '24px',
                  border: '1px solid #e6e6e6'
                }}
              >
                <div>
                  <label style={{ display: 'block', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#8a8a8a', marginBottom: 6 }}>
                    Category
                  </label>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <select
                      name="category"
                      value={lookCategory}
                      onChange={(e) => setLookCategory(e.target.value)}
                      required
                      style={{ flex: 1, padding: '13px', border: '1px solid #ddd', background: '#fff' }}
                    >
                      <option value="">{categories.length ? "Select Category" : "Add a category first"}</option>
                      {categories.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
                    </select>
                    <button
                      type="button"
                      onClick={() => setShowCategoryModal(true)}
                      style={{ width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0B0A0D', color: '#fff', border: 0, cursor: 'pointer' }}
                      aria-label="Add new category"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <input name="title" required placeholder="Look Title (e.g. Traditional Bridal)" style={{ flex: '1 1 220px', padding: '13px', border: '1px solid #ddd' }} />
                  <input name="priceRange" placeholder="Price Range (e.g. $1000 - $3000)" style={{ flex: '1 1 200px', padding: '13px', border: '1px solid #ddd' }} />
                </div>

                <label className="admin-upload" style={{ width: '100%', padding: '40px 20px', border: '2px dashed #e0e0e0', background: '#fafafa', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s ease' }}>
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
                        <div
                          key={img.file.name + idx}
                          style={{ position: 'relative', width: '120px', flexShrink: 0, borderRadius: '6px', overflow: 'hidden', border: '1px solid #ddd', background: '#f9f9f9' }}
                        >
                          <div style={{ position: 'relative', height: '160px', width: '100%', overflow: 'hidden' }}>
                            <img src={img.preview} alt="Look preview" style={{ height: '100%', width: '100%', objectFit: 'cover', display: 'block' }} />

                            <div style={{ position: 'absolute', top: 5, left: 5, background: 'rgba(0,0,0,0.6)', color: '#fff', fontSize: 10, lineHeight: 1, padding: '4px 6px', borderRadius: 10 }}>
                              {idx + 1}
                            </div>

                            <button
                              type="button"
                              onClick={() => removeLookImage(idx)}
                              aria-label="Remove image"
                              style={{
                                position: 'absolute',
                                top: 5,
                                right: 5,
                                width: 20,
                                height: 20,
                                minWidth: 20,
                                minHeight: 20,
                                maxWidth: 20,
                                maxHeight: 20,
                                boxSizing: 'border-box',
                                padding: 0,
                                margin: 0,
                                lineHeight: 0,
                                borderRadius: '50%',
                                background: '#ff3b30',
                                color: '#fff',
                                border: 0,
                                outline: 'none',
                                appearance: 'none',
                                WebkitAppearance: 'none',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0
                              }}
                            >
                              <X size={11} style={{ width: 11, height: 11, display: 'block', flexShrink: 0 }} />
                            </button>
                          </div>

                          <div style={{ display: 'flex', width: '100%', borderTop: '1px solid #eee' }}>
                            <button
                              type="button"
                              disabled={idx === 0}
                              onClick={() => moveLookImage(idx, 'left')}
                              style={{
                                flex: 1, padding: '6px 0', boxSizing: 'border-box', display: 'flex', justifyContent: 'center',
                                background: idx === 0 ? '#f0f0f0' : '#fff', color: idx === 0 ? '#ccc' : '#333',
                                border: 0, borderRight: '1px solid #eee', cursor: idx === 0 ? 'not-allowed' : 'pointer'
                              }}
                            >
                              <ChevronLeft size={16} style={{ display: 'block' }} />
                            </button>
                            <button
                              type="button"
                              disabled={idx === lookImages.length - 1}
                              onClick={() => moveLookImage(idx, 'right')}
                              style={{
                                flex: 1, padding: '6px 0', boxSizing: 'border-box', display: 'flex', justifyContent: 'center',
                                background: idx === lookImages.length - 1 ? '#f0f0f0' : '#fff', color: idx === lookImages.length - 1 ? '#ccc' : '#333',
                                border: 0, cursor: idx === lookImages.length - 1 ? 'not-allowed' : 'pointer'
                              }}
                            >
                              <ChevronRight size={16} style={{ display: 'block' }} />
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
              </form>

              <div className="product-grid" style={{ marginTop: '30px' }}>
                {looks.length ? looks.map((look) => (
                  <article key={look.id} className="product-card">
                    <img src={look.images?.[0]?.url} alt={look.title} loading="lazy" style={{ width: "100%", height: "200px", objectFit: "cover" }} />
                    <div>
                      <small>{look.category} · Position {look.position}</small>
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
                <label>
                  Category
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: 6 }}>
                    <select
                      name="category"
                      value={newProductCategory}
                      onChange={(e) => setNewProductCategory(e.target.value)}
                      required
                      style={{ flex: 1, padding: '13px', border: '1px solid #ddd', background: '#fff' }}
                    >
                      <option value="">{categories.length ? "Select category" : "Add a category first"}</option>
                      {categories.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
                    </select>
                    <button
                      type="button"
                      onClick={() => setShowCategoryModal(true)}
                      style={{ width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0B0A0D', color: '#fff', border: 0, cursor: 'pointer' }}
                      aria-label="Add new category"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                </label>
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
                <button className="admin-submit" disabled={saving || !newProductCategory || !selectedImages.length}>{saving && <LoaderCircle className="spin" size={15} />}{saving ? `Uploading ${selectedImages.length} image${selectedImages.length === 1 ? "" : "s"}…` : "Publish product"}</button>
              </form>
            </section>
          </div>
        </div>
      )}

      {/* Add Category Modal */}
      {showCategoryModal && (
        <div className="modal-overlay" onClick={() => setShowCategoryModal(false)} style={{ zIndex: 60 }}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 400 }}>
            <button className="modal-close" onClick={() => setShowCategoryModal(false)} aria-label="Close form" style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 0, cursor: 'pointer' }}>
              <X size={20} />
            </button>
            <section className="new-product-card" style={{ padding: '30px 40px', gridTemplateColumns: '1fr' }}>
              <div>
                <span style={{ fontSize: 10, letterSpacing: '0.2em', color: '#5B21A8', textTransform: 'uppercase' }}>NEW CATEGORY</span>
                <h2 style={{ fontSize: 24, margin: '10px 0 20px', fontFamily: 'serif' }}>Add Category</h2>
              </div>
              <form onSubmit={addCategory}>
                <label>Category Name<input name="name" required placeholder="e.g. Bridal Couture" autoFocus /></label>
                <button className="admin-submit" disabled={categorySaving} style={{ marginTop: 15 }}>
                  {categorySaving ? <LoaderCircle className="spin" size={15} /> : "Save Category"}
                </button>
              </form>
            </section>
          </div>
        </div>
      )}
    </div>
  );
}
