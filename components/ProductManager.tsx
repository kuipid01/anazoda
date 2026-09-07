"use client";

import Image from "next/image";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { CheckCircle2, ImagePlus, LoaderCircle, Plus, Trash2, XCircle, X, Info, ChevronLeft, ChevronRight, Pencil } from "lucide-react";
import type { Category, Product, Look } from "@/lib/db/schema";
import { compressImage } from "@/lib/imageCompression";

// Design tokens (was CSS variables in globals.css):
// ink: #000000 · rose: #9c27b0 · purple: #5B21A8 · purple-bright: #8B5CF6
// silver: #d8d5dc · cream: #f7f5f8 · line: #e7e2e9

export default function ProductManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [socials, setSocials] = useState<any[]>([]);
  const [looks, setLooks] = useState<Look[]>([]);

  const [lookSaving, setLookSaving] = useState(false);
  const [deletingLook, setDeletingLook] = useState<string | null>(null);
  const [editLookId, setEditLookId] = useState<string | null>(null);
  const [lookToDelete, setLookToDelete] = useState<Look | null>(null);
  const [lookImages, setLookImages] = useState<Array<{ file?: File; preview: string; url?: string; publicId?: string }>>([]);
  const [lookCategory, setLookCategory] = useState("");
  const [lookPosition, setLookPosition] = useState<number | "">("");

  const [newProductCategory, setNewProductCategory] = useState("");

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeTab = (searchParams.get("tab") as "products" | "categories" | "social" | "looks") || "products";

  const setActiveTab = (tab: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tab);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };
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

  function addLookImages(files: FileList | null) {
    if (!files) return;
    const incoming = Array.from(files);

    const oversized = incoming.filter(f => f.size > 20 * 1024 * 1024);
    if (oversized.length > 0) {
      setToast({
        type: "error",
        message: `${oversized.map(f => f.name).join(", ")} ${oversized.length === 1 ? "is" : "are"} too large. Please use images under 20MB each.`
      });
      return;
    }

    const totalSize = incoming.reduce((sum, f) => sum + f.size, 0);
    const available = Math.max(0, 10 - lookImages.length);
    const accepted = incoming.slice(0, available);

    if (incoming.length > available) {
      setToast({ type: "error", message: `You can upload a maximum of 10 images per look. ${incoming.length - available} image(s) were not added.` });
    }
    if (totalSize > 50 * 1024 * 1024) {
      setToast({ type: "error", message: `Total upload size is large (${(totalSize / 1024 / 1024).toFixed(1)}MB). On slow connections this may fail. Consider using smaller images.` });
    }

    let processed = 0;
    const newImages: Array<{ file: File; preview: string }> = [];

    accepted.forEach((file) => {
      compressImage(file, 1920, 0.8)
        .then((compressedFile) => {
          const preview = URL.createObjectURL(compressedFile);
          newImages.push({ file: compressedFile, preview });
          processed++;
          if (processed === accepted.length) {
            setLookImages((current) => [...current, ...newImages]);
            if (compressedFile.size < file.size) {
              setToast({ type: "success", message: `Images optimized for upload (${((1 - compressedFile.size / file.size) * 100).toFixed(0)}% smaller).` });
            }
          }
        })
        .catch(() => {
          const preview = URL.createObjectURL(file);
          newImages.push({ file, preview });
          processed++;
          if (processed === accepted.length) {
            setLookImages((current) => [...current, ...newImages]);
          }
        });
    });

    if (accepted.length === 0) {
      setLookImages((current) => [...current, ...newImages]);
    }
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
    lookImages.forEach((img) => { if (img.file) payload.append("images", img.file); });

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
      setLookToDelete(null);
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

  // Reusable Tailwind class fragments
  const navBtn = (active: boolean) =>
    `w-full text-left px-3.5 py-3 text-[13px] font-medium rounded-sm transition-colors ${
      active ? "text-white bg-white/10 border-l-2 border-violet-500" : "text-neutral-400 hover:text-white"
    } sm:flex-none sm:w-auto sm:px-4 sm:py-2 sm:text-xs sm:border sm:border-white/10 sm:rounded max-sm:flex-1 max-sm:whitespace-nowrap`;

  const inputBase = "w-full border border-neutral-300 bg-white px-3.5 py-3 text-sm placeholder:text-neutral-400 focus:outline-none focus:border-violet-500";
  const labelBase = "flex flex-col gap-2 text-[9px] font-semibold uppercase tracking-wider";

  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col md:grid md:grid-cols-[245px_1fr]">
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className={`fixed z-[200] top-6 right-6 w-[min(390px,calc(100vw-32px))] grid grid-cols-[22px_1fr_22px] items-center gap-3 px-4.5 py-4 text-white shadow-2xl animate-[toast-in_0.25s_ease-out] ${
            toast.type === "success" ? "bg-emerald-800" : "bg-rose-800"
          }`}
        >
          {toast.type === "success" ? <CheckCircle2 className="w-[19px]" /> : <XCircle className="w-[19px]" />}
          <span className="text-xs leading-relaxed">{toast.message}</span>
          <button onClick={() => setToast(null)} aria-label="Dismiss notification" className="text-white text-xl leading-none">×</button>
        </div>
      )}

      {/* Sidebar */}
      <aside className="bg-[#0b090c] text-white flex flex-col p-5 gap-4 md:p-9 md:sticky md:top-0 md:h-screen">
        <div className="flex flex-row justify-between items-center w-full md:flex-col md:items-start">
          <div className="flex flex-row items-center gap-2.5 md:flex-col md:items-start">
            <div className="font-serif text-[28px] md:text-[44px] text-violet-300 leading-none">PA</div>
            <strong className="font-serif text-[16px] md:text-[19px] md:mt-2">House of Anazodo</strong>
          </div>
          <form action="/api/admin/logout" method="post" className="mt-0 md:mt-auto">
            <button type="submit" className="border border-white/20 bg-transparent text-white px-3.5 py-2 text-[11px] md:w-full md:p-3 cursor-pointer">
              Sign out
            </button>
          </form>
        </div>
        <nav className="flex flex-row gap-2 overflow-x-auto pb-2 mt-2.5 [scrollbar-width:none] [-webkit-overflow-scrolling:touch] md:flex-col md:overflow-visible md:pb-0 md:mt-14 [&::-webkit-scrollbar]:hidden">
          <button onClick={() => setActiveTab("products")} className={navBtn(activeTab === "products")}>Products</button>
          <button onClick={() => setActiveTab("categories")} className={navBtn(activeTab === "categories")}>Categories</button>
          <button onClick={() => setActiveTab("social")} className={navBtn(activeTab === "social")}>Social Media</button>
          <button onClick={() => setActiveTab("looks")} className={navBtn(activeTab === "looks")}>Looks &amp; Experiences</button>
          <a href="/" target="_blank" className="hidden md:inline-block mt-2.5 px-4 py-2 border border-white/20 rounded text-neutral-400 text-xs text-center hover:text-white hover:border-white/50">
            View website ↗
          </a>
        </nav>
      </aside>

      <main className="p-4 md:p-5 md:px-[1%] min-w-0">
        {activeTab === "products" && (
          <>
            <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center mb-6 md:mb-10">
              <div>
                <span className="text-[10px] font-semibold tracking-[0.18em] text-violet-500">ATELIER CMS</span>
                <h1 className="font-serif text-[28px] md:text-[48px] my-1">Product collection</h1>
              </div>
              <div className="flex flex-wrap gap-2">
                <button onClick={handleSeedProducts} disabled={loading || saving} className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-[#5B21A8] text-white border-0 px-4 py-3 md:py-3.5 text-[10px] md:text-[11px] uppercase tracking-wide cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed">
                  Seed Test Products
                </button>
                <button onClick={handleClearProducts} disabled={loading || saving} className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-rose-800 text-white border-0 px-4 py-3 md:py-3.5 text-[10px] md:text-[11px] uppercase tracking-wide cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed">
                  Clear Collection
                </button>
                <button onClick={() => setShowAddModal(true)} className="w-full md:w-auto flex items-center justify-center gap-2 bg-neutral-950 text-white border-0 px-4 py-3 md:py-3.5 text-[10px] md:text-[11px] uppercase tracking-wide cursor-pointer">
                  <Plus size={17} /> Add product
                </button>
              </div>
            </div>

            {error && <div className="bg-rose-50 text-rose-800 p-3.5 my-2.5 text-xs">{error}</div>}

            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mb-16">
              {loading ? (
                <div className="col-span-full bg-white p-14 flex items-center justify-center gap-3 text-neutral-500">
                  <LoaderCircle className="animate-spin" /> Loading products…
                </div>
              ) : products.length ? (
                products.map((product) => (
                  <article className="bg-white relative" key={product.id}>
                    <Image src={product.imageUrl} alt="" width={260} height={320} unoptimized className="w-full h-auto aspect-[4/5] object-cover md:h-[280px]" />
                    <div className="p-4.5">
                      <small className="text-violet-700 uppercase text-[8px] tracking-wider">{product.category}</small>
                      <h3 className="font-serif text-[18px] md:text-[23px] my-1">{product.name}</h3>
                      <p className="m-0 text-neutral-500 text-xs">{money(product)}</p>
                    </div>
                    <button onClick={() => remove(product.id)} aria-label={`Delete ${product.name}`} className="absolute right-2.5 top-2.5 w-[35px] h-[35px] border-0 bg-white text-rose-800 flex items-center justify-center cursor-pointer">
                      <Trash2 size={16} />
                    </button>
                  </article>
                ))
              ) : (
                <div className="col-span-full bg-white p-14 flex items-center justify-center gap-3 text-neutral-500">
                  <ImagePlus /> No products yet. Add the first couture piece.
                </div>
              )}
            </section>
          </>
        )}

        {activeTab === "categories" && (
          <section className="bg-white p-5 md:p-10 mb-6">
            <div>
              <span className="text-[9px] tracking-[0.16em] text-violet-700">CATALOGUE ORGANISATION</span>
              <h2 className="font-serif text-[28px] md:text-[38px] my-2">Categories</h2>
              <p className="text-neutral-500 leading-relaxed">Create reusable categories, then assign them when adding products or looks.</p>
            </div>
            <div className="mt-6">
              <form onSubmit={addCategory} className="flex flex-col sm:flex-row gap-2.5">
                <input name="name" required disabled={categorySaving} placeholder="e.g. Bridal Couture" className={`${inputBase} flex-1 disabled:opacity-65 disabled:cursor-not-allowed`} />
                <button type="submit" disabled={categorySaving} className="min-w-[135px] flex items-center justify-center gap-1.5 border-0 bg-neutral-950 text-white px-4.5 py-3 uppercase text-[9px] tracking-wide disabled:opacity-65 disabled:cursor-not-allowed">
                  {categorySaving ? <LoaderCircle className="animate-spin" size={15} /> : <Plus size={15} />}
                  {categorySaving ? "Adding…" : "Add category"}
                </button>
              </form>
              <div className="flex flex-wrap gap-2.5 mt-5.5">
                {categories.length ? categories.map((category) => (
                  <span key={category.id} className="flex items-center gap-2.5 px-3 py-2.5 bg-[#f7f5f8] text-[11px]">
                    {category.name}
                    <button disabled={deletingCategory === category.id} onClick={() => removeCategory(category.id)} aria-label={`Delete ${category.name}`} className="flex items-center justify-center p-0 border-0 bg-transparent text-rose-800 cursor-pointer disabled:opacity-60 disabled:cursor-wait">
                      {deletingCategory === category.id ? <LoaderCircle className="animate-spin" size={13} /> : <Trash2 size={13} />}
                    </button>
                  </span>
                )) : <p className="text-neutral-500">No categories yet. Add your first one above.</p>}
              </div>
            </div>
          </section>
        )}

        {activeTab === "social" && (
          <section className="bg-white p-5 md:p-10 mb-6">
            <div>
              <span className="text-[9px] tracking-[0.16em] text-violet-700">SOCIAL PRESENCE</span>
              <h2 className="font-serif text-[28px] md:text-[38px] my-2">Social Media</h2>
              <p className="text-neutral-500 leading-relaxed">Manage your dynamic social links. Active platforms will automatically show in the footer.</p>
            </div>
            <div className="mt-6">
              <form onSubmit={saveSocialLink} className="flex flex-col sm:flex-row flex-wrap gap-2.5">
                <select name="platform" required className="flex-1 min-w-[120px] p-3.5 border border-neutral-300 bg-white">
                  <option value="">Select Platform</option>
                  <option value="Instagram">Instagram</option>
                  <option value="Facebook">Facebook</option>
                  <option value="Pinterest">Pinterest</option>
                  <option value="TikTok">TikTok</option>
                  <option value="Twitter">Twitter/X</option>
                  <option value="WhatsApp">WhatsApp</option>
                  <option value="YouTube">YouTube</option>
                </select>
                <input name="url" type="url" required placeholder="https://instagram.com/houseofanazodo" className="flex-[2] min-w-[240px] p-3.5 border border-neutral-300" />
                <button type="submit" disabled={socialSaving} className="min-w-[135px] flex items-center justify-center gap-1.5 border-0 bg-neutral-950 text-white text-[9px] uppercase tracking-wide cursor-pointer disabled:opacity-65 disabled:cursor-not-allowed">
                  {socialSaving ? <LoaderCircle className="animate-spin" size={15} /> : <Plus size={15} />}
                  {socialSaving ? "Saving…" : "Save Link"}
                </button>
              </form>
              <div className="flex flex-wrap gap-2.5 mt-5.5">
                {socials.length ? socials.map((item) => (
                  <span key={item.id} className="flex items-center gap-3 px-3 py-2.5 bg-[#f7f5f8] text-[11px]">
                    <strong>{item.platform}:</strong>
                    <a href={item.url} target="_blank" rel="noreferrer" className="underline text-violet-700 break-all">{item.url}</a>
                    <button disabled={deletingSocial === item.id} onClick={() => removeSocialLink(item.id)} aria-label={`Delete ${item.platform}`} className="flex items-center justify-center p-0 border-0 bg-transparent text-rose-800 cursor-pointer disabled:opacity-60 disabled:cursor-wait">
                      {deletingSocial === item.id ? <LoaderCircle className="animate-spin" size={13} /> : <Trash2 size={13} />}
                    </button>
                  </span>
                )) : <p className="text-neutral-500">No dynamic social media links set yet.</p>}
              </div>
            </div>
          </section>
        )}

        {activeTab === "looks" && (
          <section className="bg-white p-5 md:p-10 mb-6">
            <div>
              <span className="text-[9px] tracking-[0.16em] text-violet-700">EXPERIENCES</span>
              <h2 className="font-serif text-[28px] md:text-[38px] my-2">Looks to Experiences</h2>
              <p className="text-neutral-500 leading-relaxed">Create visual looks with an optional price range. These will be displayed in a horizontally scrolling section.</p>
            </div>
            <div className="mt-6">
              <form id="look-form" onSubmit={saveLook} className="flex flex-col gap-4.5 bg-[#fbfbfb] p-5 md:p-6 border border-neutral-200">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-neutral-400 mb-1.5">Category</label>
                  <div className="flex gap-2.5 items-center">
                    <select
                      name="category"
                      value={lookCategory}
                      onChange={(e) => setLookCategory(e.target.value)}
                      required
                      className="flex-1 min-w-0 p-3.5 border border-neutral-300 bg-white"
                    >
                      <option value="">{categories.length ? "Select Category" : "Add a category first"}</option>
                      {categories.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
                    </select>
                    <button
                      type="button"
                      onClick={() => setShowCategoryModal(true)}
                      aria-label="Add new category"
                      className="w-12 h-12 flex items-center justify-center bg-[#0B0A0D] text-white border-0 cursor-pointer flex-shrink-0"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                </div>

                <div className="flex gap-2.5 flex-wrap">
                  <input name="title" required placeholder="Look Title (e.g. Traditional Bridal)" className="flex-1 min-w-[220px] p-3.5 border border-neutral-300" />
                  <input name="priceRange" placeholder="Price Range (e.g. $1000 - $3000)" className="flex-1 min-w-[200px] p-3.5 border border-neutral-300" />
                </div>

                <label className="w-full p-8 md:p-10 border-2 border-dashed border-neutral-200 bg-neutral-50 rounded-lg flex flex-col items-center justify-center cursor-pointer text-center transition-colors">
                  <ImagePlus size={32} className="text-neutral-400 mb-2.5" />
                  <span className="text-sm font-medium text-neutral-800">{lookImages.length ? "Add More Images" : "Choose Featured Images"}</span>
                  <span className="text-xs text-neutral-500 mt-1.5">Select multiple images at once (up to 10).</span>
                  <input type="file" accept="image/*" multiple disabled={lookSaving || lookImages.length >= 10} onChange={(e) => addLookImages(e.target.files)} className="hidden" />
                </label>

                {lookImages.length > 0 && (
                  <div className="mt-5 p-5 bg-white border border-neutral-200 rounded-lg">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-[11px] uppercase tracking-wider text-violet-700 font-semibold">Arrange Image Order</span>
                      <span className="text-[11px] text-neutral-500">{lookImages.length}/10 images</span>
                    </div>

                    <div className="flex gap-4 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                      {lookImages.map((img, idx) => (
                        <div
                          key={(img.file?.name || img.publicId || idx.toString()) + idx}
                          className="relative w-[100px] md:w-[120px] flex-shrink-0 rounded-md overflow-hidden border border-neutral-300 bg-neutral-50"
                        >
                          <div className="relative h-[130px] md:h-[160px] w-full overflow-hidden">
                            <img src={img.preview} alt="Look preview" className="h-full w-full object-cover block" />

                            <div className="absolute top-1.5 left-1.5 bg-black/60 text-white text-[10px] leading-none px-1.5 py-1 rounded-full">
                              {idx + 1}
                            </div>

                            <button
                              type="button"
                              onClick={() => removeLookImage(idx)}
                              aria-label="Remove image"
                              className="absolute top-1.5 right-1.5 w-[18px] h-[18px] md:w-5 md:h-5 box-border p-0 m-0 leading-none rounded-full bg-red-500 text-white border-0 outline-none appearance-none cursor-pointer flex items-center justify-center flex-shrink-0"
                            >
                              <X size={11} className="block flex-shrink-0" />
                            </button>
                          </div>

                          <div className="flex w-full border-t border-neutral-200">
                            <button
                              type="button"
                              disabled={idx === 0}
                              onClick={() => moveLookImage(idx, 'left')}
                              className={`flex-1 py-1.5 box-border flex justify-center border-r border-neutral-200 ${idx === 0 ? "bg-neutral-100 text-neutral-300 cursor-not-allowed" : "bg-white text-neutral-800 cursor-pointer"}`}
                            >
                              <ChevronLeft size={16} className="block" />
                            </button>
                            <button
                              type="button"
                              disabled={idx === lookImages.length - 1}
                              onClick={() => moveLookImage(idx, 'right')}
                              className={`flex-1 py-1.5 box-border flex justify-center ${idx === lookImages.length - 1 ? "bg-neutral-100 text-neutral-300 cursor-not-allowed" : "bg-white text-neutral-800 cursor-pointer"}`}
                            >
                              <ChevronRight size={16} className="block" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 pt-4 border-t border-dashed border-neutral-300 flex flex-col gap-2">
                      <label className="text-[11px] uppercase tracking-wider text-violet-700 font-semibold flex items-center gap-1.5">
                        Look Display Order <Info size={12} />
                      </label>
                      <div className="flex items-center gap-3 flex-wrap">
                        <input
                          name="position"
                          type="number"
                          min="1"
                          required
                          value={lookPosition}
                          onChange={(e) => setLookPosition(e.target.value ? Number(e.target.value) : "")}
                          placeholder="e.g. 1"
                          className="w-20 p-2.5 border border-neutral-300 text-center rounded"
                        />
                        <span className="text-xs text-neutral-500 leading-relaxed">
                          Determines where this entire Experience appears on the homepage carousel.
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-2.5">
                  {editLookId && (
                    <button
                      type="button"
                      onClick={cancelEditLook}
                      disabled={lookSaving}
                      className="p-4 flex-1 flex items-center justify-center border border-neutral-300 bg-white text-neutral-600 text-[11px] uppercase tracking-wide rounded disabled:cursor-not-allowed"
                    >
                      Cancel Edit
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={lookSaving || !lookImages.length || !lookCategory || lookPosition === ""}
                    className={`sm:flex-[2] p-4 flex items-center justify-center gap-1.5 border-0 text-white text-[11px] uppercase tracking-wide rounded transition-colors ${
                      (lookSaving || !lookImages.length || !lookCategory || lookPosition === "") ? "bg-neutral-300 cursor-not-allowed" : "bg-neutral-950 cursor-pointer"
                    }`}
                  >
                    {lookSaving ? <LoaderCircle className="animate-spin" size={15} /> : <Plus size={15} />}
                    {lookSaving ? (editLookId ? "Updating..." : "Uploading to Cloudinary...") : (editLookId ? "Update Experience" : "Add Experience")}
                  </button>
                </div>
              </form>

              <div className="mt-10">
                <h3 className="text-sm font-semibold text-[#0B0A0D] mb-5 uppercase tracking-wide">Published Experiences</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {looks.length ? looks.map((look) => (
                    <article key={look.id} className="bg-white rounded-xl overflow-hidden border border-neutral-200 shadow-sm relative flex flex-col">
                      <div className="relative w-full pt-[120%]">
                        <img src={look.images?.[0]?.url} alt={look.title} loading="lazy" className="absolute top-0 left-0 w-full h-full object-cover" />
                        {look.images?.length > 1 && (
                          <div className="absolute bottom-2.5 right-2.5 bg-black/70 text-white text-[10px] px-2 py-1 rounded-full font-semibold tracking-wide">
                            {look.images.length} IMAGES
                          </div>
                        )}
                        <div className="absolute top-2.5 left-2.5 bg-white text-[#0B0A0D] text-[10px] px-2 py-1 rounded font-bold tracking-wider shadow-md">
                          POS {look.position}
                        </div>
                      </div>
                      <div className="p-5 flex flex-col flex-1">
                        <span className="text-[10px] uppercase tracking-wider text-violet-700 font-semibold mb-1.5">{look.category}</span>
                        <h3 className="text-lg font-serif text-[#0B0A0D] mb-2 leading-tight">{look.title}</h3>
                        {look.priceRange && <p className="text-[13px] text-neutral-500 m-0 mt-auto">{look.priceRange}</p>}
                      </div>
                      <button
                        onClick={() => openEditLook(look)}
                        aria-label="Edit look"
                        className="absolute top-2.5 right-[50px] w-8 h-8 rounded-full bg-white text-violet-700 border-0 cursor-pointer flex items-center justify-center shadow-md"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        disabled={deletingLook === look.id}
                        onClick={() => setLookToDelete(look)}
                        aria-label="Delete look"
                        className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white text-red-500 border-0 cursor-pointer flex items-center justify-center shadow-md disabled:opacity-60 disabled:cursor-wait"
                      >
                        {deletingLook === look.id ? <LoaderCircle className="animate-spin" size={16} /> : <Trash2 size={16} />}
                      </button>
                    </article>
                  )) : (
                    <div className="col-span-full py-16 px-5 text-center bg-[#fbfbfb] border border-dashed border-neutral-300 rounded-xl text-neutral-500">
                      <ImagePlus size={32} className="mx-auto mb-4 opacity-50" /> No experiences published yet. Add your first one above.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-[999] grid place-items-start sm:place-items-center p-2 sm:p-10 overflow-y-auto" onClick={() => setShowAddModal(false)}>
          <div className="w-full sm:w-[min(800px,100%)] bg-white relative shadow-2xl rounded-xl sm:rounded-none max-h-[calc(100vh-30px)] sm:max-h-none overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <button className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-transparent border-0 cursor-pointer z-10 min-w-11 min-h-11 flex items-center justify-center" onClick={() => setShowAddModal(false)} aria-label="Close form">
              <X size={24} />
            </button>
            <section className="p-5 sm:p-10 md:p-[50px]">
              <div>
                <span className="text-[10px] font-semibold tracking-wider text-violet-500">{editLookId ? "EDIT EXPERIENCE" : "NEW PIECE"}</span>
                <h2 className="font-serif text-[28px] md:text-[38px] my-2">{editLookId ? "Edit Experience" : "Add to the collection"}</h2>
                <p className="text-neutral-500 leading-relaxed mb-6">The image is optimized and stored in Cloudinary. Product details are saved in Neon.</p>
              </div>
              <form onSubmit={create} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <label className={labelBase}>Product name<input name="name" required placeholder="The Amara Gown" className={inputBase} /></label>
                <label className={labelBase}>Price<input name="price" type="number" min="0" step="0.01" required placeholder="1500000" className={inputBase} /></label>
                <label className={labelBase}>Currency
                  <select name="currency" className={inputBase}>
                    <option value="NGN">NGN — ₦</option>
                    <option value="USD">USD — $</option>
                    <option value="GBP">GBP — £</option>
                  </select>
                </label>
                <label className={labelBase}>
                  Category
                  <div className="flex gap-2.5 items-center mt-1.5">
                    <select
                      name="category"
                      value={newProductCategory}
                      onChange={(e) => setNewProductCategory(e.target.value)}
                      required
                      className="flex-1 p-3.5 border border-neutral-300 bg-white normal-case tracking-normal"
                    >
                      <option value="">{categories.length ? "Select category" : "Add a category first"}</option>
                      {categories.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
                    </select>
                    <button
                      type="button"
                      onClick={() => setShowCategoryModal(true)}
                      aria-label="Add new category"
                      className="w-12 h-12 flex items-center justify-center bg-[#0B0A0D] text-white border-0 cursor-pointer flex-shrink-0"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                </label>
                <label className={`${labelBase} sm:col-span-2`}>Description<textarea name="description" rows={5} placeholder="Silhouette, materials, handwork and inspiration…" className={`${inputBase} normal-case tracking-normal`} /></label>
                <label className="sm:col-span-2 border border-dashed border-violet-300 p-6 md:p-7.5 flex flex-col items-center gap-2 cursor-pointer text-violet-700">
                  <ImagePlus />
                  <span>{selectedImages.length ? "Add more product images" : "Choose product images"}</span>
                  <small className="text-neutral-400 normal-case tracking-normal text-center">Select up to 8 JPG, PNG or WebP images · maximum 10MB each. The first image becomes the shop cover.</small>
                  <input key={imageInputKey} type="file" accept="image/*" multiple disabled={saving || selectedImages.length >= 8} onChange={(event) => addImages(event.target.files)} className="border-0 p-2" />
                </label>
                {selectedImages.length > 0 && (
                  <div className="sm:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {selectedImages.map((image, index) => (
                      <div key={`${image.file.name}-${image.file.lastModified}-${index}`} className="relative aspect-[4/5] overflow-hidden bg-neutral-100">
                        <img src={image.preview} alt={`Selected product image ${index + 1}`} className="w-full h-full object-cover block" />
                        {index === 0 && <span className="absolute left-2 top-2 bg-violet-700 text-white px-2 py-1.5 uppercase text-[8px] tracking-wide">Cover</span>}
                        <button type="button" disabled={saving} onClick={() => removeSelectedImage(index)} aria-label={`Remove image ${index + 1}`} className="absolute right-2 top-2 w-8 h-8 grid place-items-center border-0 bg-white text-rose-800 cursor-pointer disabled:opacity-55 disabled:cursor-wait">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <label className="flex-row! items-center gap-2 flex text-xs font-normal normal-case tracking-normal"><input name="featured" type="checkbox" value="true" /> Feature on homepage</label>
                <label className="flex-row! items-center gap-2 flex text-xs font-normal normal-case tracking-normal"><input name="published" type="checkbox" value="true" defaultChecked /> Published</label>
                <button className="sm:col-span-2 justify-self-start flex items-center justify-center gap-2 min-w-[170px] bg-neutral-950 text-white border-0 px-6.5 py-4 uppercase text-[10px] tracking-wide disabled:opacity-60 disabled:cursor-not-allowed" disabled={saving || !newProductCategory || !selectedImages.length}>
                  {saving && <LoaderCircle className="animate-spin" size={15} />}
                  {saving ? `Uploading ${selectedImages.length} image${selectedImages.length === 1 ? "" : "s"}…` : "Publish product"}
                </button>
              </form>
            </section>
          </div>
        </div>
      )}

      {/* Add Category Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 bg-black/50 z-[60] grid place-items-start sm:place-items-center p-2 sm:p-10 overflow-y-auto" onClick={() => setShowCategoryModal(false)}>
          <div className="w-full sm:w-[min(400px,100%)] bg-white relative shadow-2xl rounded-xl sm:rounded-none" onClick={(e) => e.stopPropagation()}>
            <button className="absolute top-5 right-5 bg-transparent border-0 cursor-pointer min-w-11 min-h-11 flex items-center justify-center" onClick={() => setShowCategoryModal(false)} aria-label="Close form">
              <X size={20} />
            </button>
            <section className="p-6 sm:p-8 md:p-10">
              <div>
                <span className="text-[10px] tracking-[0.2em] text-violet-700 uppercase">NEW CATEGORY</span>
                <h2 className="font-serif text-2xl my-2.5 mb-5">Add Category</h2>
              </div>
              <form onSubmit={addCategory} className="flex flex-col gap-3">
                <label className={labelBase}>Category Name<input name="name" required placeholder="e.g. Bridal Couture" autoFocus className={inputBase} /></label>
                <button className="mt-3.5 flex items-center justify-center gap-2 bg-neutral-950 text-white border-0 px-6.5 py-4 uppercase text-[10px] tracking-wide disabled:opacity-60 disabled:cursor-not-allowed" disabled={categorySaving}>
                  {categorySaving ? <LoaderCircle className="animate-spin" size={15} /> : "Save Category"}
                </button>
              </form>
            </section>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {lookToDelete && (
        <div className="fixed inset-0 bg-black/50 z-[70] grid place-items-center p-5" onClick={() => setLookToDelete(null)}>
          <div className="w-full sm:w-[min(420px,100%)] bg-white relative p-0 overflow-hidden rounded-lg shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-7.5 text-center">
              <div className="w-15 h-15 rounded-full bg-red-50 text-red-500 flex items-center justify-center mx-auto mb-5">
                <Trash2 size={28} />
              </div>
              <h2 className="text-[22px] font-serif mb-2.5 text-[#0B0A0D]">Delete Experience?</h2>
              <p className="text-sm text-neutral-500 leading-relaxed">
                Are you sure you want to permanently delete <strong>"{lookToDelete.title}"</strong> and its {lookToDelete.images?.length || 1} image{lookToDelete.images?.length !== 1 ? 's' : ''} from Cloudinary? This action cannot be undone.
              </p>
            </div>
            <div className="flex border-t border-neutral-200">
              <button
                onClick={() => setLookToDelete(null)}
                disabled={deletingLook === lookToDelete.id}
                className="flex-1 p-4 bg-white border-0 border-r border-neutral-200 text-sm font-semibold text-neutral-600 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => removeLook(lookToDelete.id)}
                disabled={deletingLook === lookToDelete.id}
                className="flex-1 p-4 bg-red-50 border-0 text-sm font-semibold text-red-500 cursor-pointer flex items-center justify-center gap-2"
              >
                {deletingLook === lookToDelete.id ? <><LoaderCircle className="animate-spin" size={16} /> Deleting...</> : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}