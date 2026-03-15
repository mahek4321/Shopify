"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";

const FREE_SHIPPING = 60;

export function CartDrawer() {
  const items = useCartStore((s) => s.items);
  const isDrawerOpen = useCartStore((s) => s.isDrawerOpen);
  const setDrawerOpen = useCartStore((s) => s.setDrawerOpen);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);

  const closeCart = () => setDrawerOpen(false);

  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const shipping = subtotal >= FREE_SHIPPING ? 0 : 5.99;
  const total = subtotal + shipping;
  const progress = Math.min((subtotal / FREE_SHIPPING) * 100, 100);
  const itemCount = items.reduce((s, i) => s + i.quantity, 0);

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-midnight/50 backdrop-blur-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={closeCart}
          />
          <motion.div
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-[420px] flex-col bg-ivory"
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-plum/10 px-6 py-4">
              <h2 className="font-heading text-xl text-midnight">
                Your Bag
                {itemCount > 0 && <span className="ml-2 text-base text-subtle">({itemCount})</span>}
              </h2>
              <button onClick={closeCart} aria-label="Close cart" className="text-plum/60 hover:text-midnight transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 text-center">
                <ShoppingBag className="h-14 w-14 text-plum/20" />
                <p className="font-heading text-2xl text-[#6B5A4A]">Your bag is empty</p>
                <p className="text-sm text-[#9B8A7A]">Discover our collection of luxury skincare.</p>
                <Link
                  href="/collections/all"
                  onClick={closeCart}
                  className="inline-flex h-11 items-center rounded-sm bg-gold px-8 text-xs font-semibold uppercase tracking-[0.2em] text-white hover:bg-[#b36b30] transition-colors"
                >
                  Explore Collection
                </Link>
              </div>
            ) : (
              <>
                {/* Shipping progress */}
                <div className="border-b border-plum/10 px-6 py-3">
                  {subtotal >= FREE_SHIPPING ? (
                    <p className="text-center text-xs text-plum font-medium">
                      🎉 You qualify for free shipping
                    </p>
                  ) : (
                    <p className="text-center text-xs text-[#6B5A4A]">
                      <span className="font-semibold text-gold">${(FREE_SHIPPING - subtotal).toFixed(2)}</span> away from free shipping
                    </p>
                  )}
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-plum/10">
                    <motion.div
                      className="h-full rounded-full bg-gold"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                {/* Items */}
                <div className="flex-1 overflow-y-auto px-6 py-4">
                  <div className="space-y-5">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-4">
                        <div className={`h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-gradient-to-br ${item.gradient} flex items-center justify-center`}>
                          <span className="font-heading text-sm text-white/30 select-none">
                            {item.name.split(" ").map((w) => w[0]).join("").slice(0, 3)}
                          </span>
                        </div>
                        <div className="flex flex-1 flex-col justify-between min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <p className="truncate text-sm font-medium text-midnight">{item.name}</p>
                              {item.variant && <p className="text-xs text-[#9B8A7A]">{item.variant}</p>}
                            </div>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="flex-shrink-0 text-[#9B8A7A] hover:text-midnight transition-colors"
                              aria-label="Remove"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center overflow-hidden rounded-sm border border-plum/20 bg-white">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="flex h-7 w-7 items-center justify-center text-plum hover:bg-soft-ivory transition-colors"
                                aria-label="Decrease"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="w-8 text-center text-xs font-medium text-midnight">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="flex h-7 w-7 items-center justify-center text-plum hover:bg-soft-ivory transition-colors"
                                aria-label="Increase"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                            <p className="text-sm font-semibold text-gold">${(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Summary */}
                <div className="border-t border-plum/10 px-6 py-5">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-[#6B5A4A]">
                      <span>Subtotal</span>
                      <span className="text-midnight">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-[#6B5A4A]">
                      <span>Shipping</span>
                      <span className={shipping === 0 ? "font-medium text-plum" : "text-midnight"}>
                        {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex justify-between border-t border-plum/10 pt-2 font-semibold text-midnight">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                  <Link
                    href="/checkout?step=cart"
                    onClick={closeCart}
                    className="mt-4 flex w-full items-center justify-center rounded-sm bg-gold py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-white hover:bg-[#b36b30] transition-colors"
                  >
                    Checkout
                  </Link>
                  <button
                    onClick={closeCart}
                    className="mt-3 w-full text-center text-xs text-[#9B8A7A] hover:text-midnight transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
