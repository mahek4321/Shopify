"use client";

import Link from "next/link";
import { Minus, Plus, X, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";

export function StepCart({ onNext }: { onNext: () => void }) {
  const { items, removeItem, updateQuantity } = useCartStore();

  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const shipping = subtotal >= 60 ? 0 : 5.99;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-6 py-24 text-center">
        <ShoppingBag className="h-14 w-14 text-plum/20" />
        <p className="font-heading text-2xl text-[#1A0A2E]">Your bag is empty</p>
        <Link href="/collections/all" className="inline-flex h-11 items-center rounded-sm bg-gold px-8 text-xs font-semibold uppercase tracking-[0.2em] text-white hover:bg-[#b36b30] transition-colors">
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-heading text-3xl text-[#1A0A2E]">Review Your Bag</h2>
      <div className="mt-6 space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex gap-4 rounded-md border border-plum/10 bg-white p-4">
            <div className={`h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-gradient-to-br ${item.gradient} flex items-center justify-center`}>
              <span className="font-heading text-sm text-white/30 select-none">
                {item.name.split(" ").map((w) => w[0]).join("").slice(0, 3)}
              </span>
            </div>
            <div className="flex flex-1 flex-col justify-between min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-medium text-[#1A0A2E]">{item.name}</p>
                  {item.variant && <p className="text-xs text-[#9B8A7A]">{item.variant}</p>}
                </div>
                <button onClick={() => removeItem(item.id)} className="text-[#9B8A7A] hover:text-[#1A0A2E] transition-colors" aria-label="Remove">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center overflow-hidden rounded-sm border border-plum/20 bg-white">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="flex h-8 w-8 items-center justify-center text-plum hover:bg-soft-ivory transition-colors">
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="w-8 text-center text-xs font-medium text-[#1A0A2E]">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="flex h-8 w-8 items-center justify-center text-plum hover:bg-soft-ivory transition-colors">
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
                <p className="font-semibold text-[#C97B3A]">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-md border border-plum/10 bg-white p-5 text-sm">
        <div className="flex justify-between text-[#6B5A4A]"><span>Subtotal</span><span className="text-[#1A0A2E]">${subtotal.toFixed(2)}</span></div>
        <div className="flex justify-between mt-2 text-[#6B5A4A]">
          <span>Shipping</span>
          <span className={shipping === 0 ? "text-[#4A1F7A] font-medium" : "text-[#1A0A2E]"}>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
        </div>
        <div className="flex justify-between mt-3 border-t border-plum/10 pt-3 font-semibold text-[#1A0A2E]">
          <span>Total</span><span>${total.toFixed(2)}</span>
        </div>
      </div>

      <button
        onClick={onNext}
        className="mt-6 w-full rounded-sm bg-gold py-4 text-xs font-semibold uppercase tracking-[0.2em] text-white hover:bg-[#b36b30] transition-colors"
      >
        Proceed to Shipping
      </button>
    </div>
  );
}
