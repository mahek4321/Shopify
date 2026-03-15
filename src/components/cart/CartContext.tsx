"use client";

import { createContext, useContext } from "react";
import { useCartStore } from "@/store/useCartStore";

type CartContextValue = {
  totalQuantity: number;
  totalPrice: number;
  wishlistCount: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const items = useCartStore((s) => s.items);
  const isDrawerOpen = useCartStore((s) => s.isDrawerOpen);
  const setDrawerOpen = useCartStore((s) => s.setDrawerOpen);
  const wishlistCount = useCartStore((s) => s.wishlistCount());

  const totalQuantity = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const openCart = () => setDrawerOpen(true);
  const closeCart = () => setDrawerOpen(false);
  const toggleCart = () => setDrawerOpen(!isDrawerOpen);

  return (
    <CartContext.Provider value={{ totalQuantity, totalPrice, wishlistCount, isCartOpen: isDrawerOpen, openCart, closeCart, toggleCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
