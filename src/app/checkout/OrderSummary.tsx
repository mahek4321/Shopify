"use client";

import { useCartStore } from "@/store/useCartStore";

type Props = {
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
};

export function OrderSummary({ subtotal, shipping, discount, total }: Props) {
  const items = useCartStore((s) => s.items);

  return (
    <div className="sticky top-24 rounded-md border border-plum/10 bg-white p-6">
      <h3 className="font-heading text-xl text-[#1A0A2E]">Order Summary</h3>
      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            <div className={`h-12 w-12 flex-shrink-0 overflow-hidden rounded-md bg-gradient-to-br ${item.gradient} flex items-center justify-center`}>
              <span className="font-heading text-xs text-white/30 select-none">
                {item.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="truncate text-xs font-medium text-[#1A0A2E]">{item.name}</p>
              {item.variant && <p className="text-[11px] text-[#9B8A7A]">{item.variant}</p>}
              <p className="text-[11px] text-[#9B8A7A]">Qty {item.quantity}</p>
            </div>
            <p className="text-xs font-semibold text-[#C97B3A]">${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 space-y-2 border-t border-plum/10 pt-4 text-sm">
        <div className="flex justify-between text-[#6B5A4A]">
          <span>Subtotal</span>
          <span className="text-[#1A0A2E]">${subtotal.toFixed(2)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-[#C97B3A]">
            <span>Discount</span>
            <span>−${discount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between text-[#6B5A4A]">
          <span>Shipping</span>
          <span className={shipping === 0 ? "font-medium text-[#4A1F7A]" : "text-[#1A0A2E]"}>
            {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
          </span>
        </div>
        <div className="flex justify-between border-t border-plum/10 pt-2 font-semibold text-[#1A0A2E]">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
