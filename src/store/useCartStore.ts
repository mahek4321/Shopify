import { create } from "zustand";
import { persist } from "zustand/middleware";
import { toast } from "sonner";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  variant: string;
  gradient: string;
}

interface CartStore {
  // Cart
  items: CartItem[];
  isDrawerOpen: boolean;
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
  setDrawerOpen: (open: boolean) => void;
  cartTotal: () => number;
  cartCount: () => number;
  shippingCost: () => number;
  // Wishlist
  wishlist: string[];
  toggleWishlist: (id: string) => void;
  isWishlisted: (id: string) => boolean;
  wishlistCount: () => number;
  addToWishlist: (id: string) => void;
  removeFromWishlist: (id: string) => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      // ── Cart ──────────────────────────────────────────────────────────
      items: [],
      isDrawerOpen: false,

      addItem: (newItem) => {
        set((state) => {
          const existing = state.items.find(
            (i) => i.id === newItem.id && i.variant === newItem.variant
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === newItem.id && i.variant === newItem.variant
                  ? { ...i, quantity: i.quantity + (newItem.quantity ?? 1) }
                  : i
              ),
            };
          }
          return {
            items: [...state.items, { ...newItem, quantity: newItem.quantity ?? 1 }],
          };
        });
        toast.success(`${newItem.name} added to bag ✓`, {
          duration: 2500,
          style: { background: "#2D1854", color: "#F0D5A0", border: "none" },
        });
      },

      removeItem: (id) => {
        set((state) => ({ items: state.items.filter((i) => i.id !== id) }));
        toast("Removed from bag", {
          duration: 2000,
          style: { background: "#1A0A2E", color: "#F0D5A0", border: "none" },
        });
      },

      updateQuantity: (id, qty) => {
        if (qty < 1) return;
        set((state) => ({
          items: state.items.map((i) => (i.id === id ? { ...i, quantity: qty } : i)),
        }));
      },

      clearCart: () => set({ items: [] }),
      setDrawerOpen: (open) => set({ isDrawerOpen: open }),

      cartTotal: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
      cartCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      shippingCost: () => (get().cartTotal() >= 60 ? 0 : 5.99),

      // ── Wishlist ──────────────────────────────────────────────────────
      wishlist: [],

      toggleWishlist: (id) => {
        const isIn = get().wishlist.includes(id);
        set((state) => ({
          wishlist: isIn
            ? state.wishlist.filter((w) => w !== id)
            : [...state.wishlist, id],
        }));
        toast(isIn ? "Removed from wishlist" : "Saved to wishlist ♡", {
          duration: 2000,
          style: {
            background: isIn ? "#1A0A2E" : "#2D1854",
            color: "#F0D5A0",
            border: "none",
          },
        });
      },

      addToWishlist: (id) => {
        if (!get().wishlist.includes(id)) {
          set((state) => ({ wishlist: [...state.wishlist, id] }));
        }
      },

      removeFromWishlist: (id) => {
        set((state) => ({ wishlist: state.wishlist.filter((w) => w !== id) }));
      },

      isWishlisted: (id) => get().wishlist.includes(id),
      wishlistCount: () => get().wishlist.length,
    }),
    {
      name: "lumina-store",
      partialize: (state) => ({
        items: state.items,
        wishlist: state.wishlist,
      }),
    }
  )
);
