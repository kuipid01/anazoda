export type CartItem = {
  id: string;
  name: string;
  slug: string;
  price: number;
  currency: string;
  imageUrl: string;
  category: string;
  quantity: number;
};

export type WishlistItem = {
  id: string;
  name: string;
  slug: string;
  price: number;
  currency: string;
  imageUrl: string;
  category: string;
};

// Cart Actions
export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem("house_of_anazodo_cart") || "[]");
  } catch {
    return [];
  }
}

export function saveCart(cart: CartItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem("house_of_anazodo_cart", JSON.stringify(cart));
  window.dispatchEvent(new Event("cart-updated"));
}

export function addToCart(product: Omit<CartItem, "quantity">, quantity = 1) {
  const cart = getCart();
  const existing = cart.find((item) => item.id === product.id);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ ...product, quantity });
  }
  saveCart(cart);
}

export function updateCartQuantity(productId: string, quantity: number) {
  const cart = getCart();
  const existing = cart.find((item) => item.id === productId);
  if (existing) {
    existing.quantity = Math.max(1, quantity);
  }
  saveCart(cart);
}

export function removeFromCart(productId: string) {
  const cart = getCart().filter((item) => item.id !== productId);
  saveCart(cart);
}

export function clearCart() {
  saveCart([]);
}

// Wishlist Actions
export function getWishlist(): WishlistItem[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem("house_of_anazodo_wishlist") || "[]");
  } catch {
    return [];
  }
}

export function saveWishlist(wishlist: WishlistItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem("house_of_anazodo_wishlist", JSON.stringify(wishlist));
  window.dispatchEvent(new Event("wishlist-updated"));
}

export function addToWishlist(product: WishlistItem) {
  const wishlist = getWishlist();
  const existing = wishlist.find((item) => item.id === product.id);
  if (!existing) {
    wishlist.push(product);
  }
  saveWishlist(wishlist);
}

export function removeFromWishlist(productId: string) {
  const wishlist = getWishlist().filter((item) => item.id !== productId);
  saveWishlist(wishlist);
}

export function toggleWishlist(product: WishlistItem) {
  const wishlist = getWishlist();
  const existing = wishlist.find((item) => item.id === product.id);
  if (existing) {
    removeFromWishlist(product.id);
  } else {
    addToWishlist(product);
  }
}

export function isInWishlist(productId: string): boolean {
  if (typeof window === "undefined") return false;
  return getWishlist().some((item) => item.id === productId);
}
