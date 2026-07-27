"use client";

import Image from "next/image";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { CheckCircle2, ImagePlus, LoaderCircle, Plus, Trash2, XCircle } from "lucide-react";
import type { Category, Product } from "@/lib/db/schema";

export default function ProductManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [categorySaving, setCategorySaving] = useState(false);
  const [deletingCategory, setDeletingCategory] = useState<string | null>(null);
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
    const [productResponse, categoryResponse] = await Promise.all([fetch("/api/admin/products"), fetch("/api/admin/categories")]);
    const [productData, categoryData] = await Promise.all([productResponse.json(), categoryResponse.json()]);
    if (productResponse.ok) setProducts(productData); else setError(productData.error);
    if (categoryResponse.ok) setCategories(categoryData); else setError(categoryData.error);
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
  const money = (p: Product) => new Intl.NumberFormat("en-NG", { style: "currency", currency: p.currency }).format(p.price / 100);

  return (
    <div className="admin-shell">
      {toast && <div className={`admin-toast ${toast.type}`} role="status" aria-live="polite">
        {toast.type === "success" ? <CheckCircle2 /> : <XCircle />}
        <span>{toast.message}</span>
        <button onClick={() => setToast(null)} aria-label="Dismiss notification">×</button>
      </div>}
      <aside className="admin-sidebar">
        <div className="monogram">PA</div><strong>House of Anazodo</strong>
        <nav><span className="active">Products</span><a href="/" target="_blank">View website ↗</a></nav>
        <form action="/api/admin/logout" method="post"><button>Sign out</button></form>
      </aside>
      <main className="admin-main">
        <div className="admin-title"><div><span>ATELIER CMS</span><h1>Product collection</h1></div><a href="#new-product"><Plus size={17} /> Add product</a></div>
        {error && <div className="admin-error">{error}</div>}
        <section className="product-admin-grid">
          {loading ? <div className="admin-empty"><LoaderCircle className="spin" /> Loading products…</div> :
            products.length ? products.map((product) => (
              <article className="admin-product" key={product.id}>
                <Image src={product.imageUrl} alt="" width={260} height={320} unoptimized />
                <div><small>{product.category}</small><h3>{product.name}</h3><p>{money(product)}</p></div>
                <button onClick={() => remove(product.id)} aria-label={`Delete ${product.name}`}><Trash2 size={16} /></button>
              </article>
            )) : <div className="admin-empty"><ImagePlus /> No products yet. Add the first couture piece below.</div>}
        </section>
        <section className="category-manager">
          <div><span>CATALOGUE ORGANISATION</span><h2>Categories</h2><p>Create reusable categories, then assign them when adding products.</p></div>
          <div>
            <form onSubmit={addCategory}><input name="name" required disabled={categorySaving} placeholder="e.g. Bridal Couture" /><button type="submit" disabled={categorySaving}>{categorySaving ? <LoaderCircle className="spin" size={15} /> : <Plus size={15} />}{categorySaving ? "Adding…" : "Add category"}</button></form>
            <div className="category-tags">{categories.length ? categories.map((category) => <span key={category.id}>{category.name}<button disabled={deletingCategory === category.id} onClick={() => removeCategory(category.id)} aria-label={`Delete ${category.name}`}>{deletingCategory === category.id ? <LoaderCircle className="spin" size={13} /> : <Trash2 size={13} />}</button></span>) : <p>No categories yet. Add your first one above.</p>}</div>
          </div>
        </section>
        <section className="new-product-card" id="new-product">
          <div><span>NEW PIECE</span><h2>Add to the collection</h2><p>The image is optimized and stored in Cloudinary. Product details are saved in Neon.</p></div>
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
      </main>
    </div>
  );
}
