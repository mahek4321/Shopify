"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCartStore } from "@/store/useCartStore";
import type { ShippingData } from "../CheckoutFlow";

const schema = z.object({
  cardName: z.string().min(2, "Required"),
  cardNumber: z.string().min(19, "Enter a valid card number"),
  expiry: z.string().regex(/^\d{2}\/\d{2}$/, "Format: MM/YY"),
  cvv: z.string().min(3, "Required").max(4, "Max 4 digits"),
});
type FormData = z.infer<typeof schema>;

const PROMO_CODES: Record<string, { type: "percent" | "shipping"; value: number }> = {
  LUMINA15: { type: "percent", value: 0.15 },
  FREESHIP: { type: "shipping", value: 0 },
};

const inputCls = "h-11 w-full rounded-sm border px-3 text-sm text-[#1A0A2E] placeholder:text-[#9B8A7A] focus:outline-none transition-colors";
const labelCls = "mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.15em] text-[#2D1854]";
const errorCls = "mt-1 text-xs text-[#8B1A1A]";

function formatCard(v: string) {
  return v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
}
function formatExpiry(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 4);
  return d.length >= 3 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
}

type Props = {
  shippingData: ShippingData | null;
  total: number;
  discount: number;
  discountAmt: number;
  onDiscount: (pct: number) => void;
  onShippingOverride: (v: number | null) => void;
  onNext: () => void;
  onBack: () => void;
  orderNumber: string;
};

export function StepPayment({ shippingData, total, discount, discountAmt, onDiscount, onShippingOverride, onNext, onBack, orderNumber }: Props) {
  const clearCart = useCartStore((s) => s.clearCart);
  const [promoCode, setPromoCode] = useState("");
  const [promoError, setPromoError] = useState("");
  const [promoApplied, setPromoApplied] = useState("");
  const [loading, setLoading] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const applyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    const promo = PROMO_CODES[code];
    if (!promo) {
      setPromoError("Invalid promo code");
      setPromoApplied("");
      return;
    }
    setPromoError("");
    setPromoApplied(code);
    if (promo.type === "percent") {
      onDiscount(promo.value);
      onShippingOverride(null);
    } else {
      onDiscount(0);
      onShippingOverride(0);
    }
  };

  const onSubmit = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 2000));
    clearCart();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="font-heading text-3xl text-[#1A0A2E]">Payment</h2>

      {/* Payment icons */}
      <div className="mt-4 flex flex-wrap gap-2">
        {["Visa", "Mastercard", "Amex", "Apple Pay", "PayPal"].map((p) => (
          <span key={p} className="rounded border border-plum/15 px-2.5 py-1 text-[11px] font-medium text-[#6B5A4A]">{p}</span>
        ))}
      </div>

      <div className="mt-6 space-y-4">
        <div>
          <label className={labelCls}>Cardholder Name</label>
          <input {...register("cardName")} placeholder="Name on card" className={`${inputCls} ${errors.cardName ? "border-[#8B1A1A]" : "border-[rgba(45,24,84,0.2)] focus:border-[#C97B3A]"}`} />
          {errors.cardName && <p className={errorCls}>{errors.cardName.message}</p>}
        </div>
        <div>
          <label className={labelCls}>Card Number</label>
          <input
            {...register("cardNumber")}
            value={cardNumber}
            onChange={(e) => setCardNumber(formatCard(e.target.value))}
            placeholder="1234 5678 9012 3456"
            maxLength={19}
            className={`${inputCls} font-mono tracking-wider ${errors.cardNumber ? "border-[#8B1A1A]" : "border-[rgba(45,24,84,0.2)] focus:border-[#C97B3A]"}`}
          />
          {errors.cardNumber && <p className={errorCls}>{errors.cardNumber.message}</p>}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Expiry</label>
            <input
              {...register("expiry")}
              value={expiry}
              onChange={(e) => setExpiry(formatExpiry(e.target.value))}
              placeholder="MM/YY"
              maxLength={5}
              className={`${inputCls} ${errors.expiry ? "border-[#8B1A1A]" : "border-[rgba(45,24,84,0.2)] focus:border-[#C97B3A]"}`}
            />
            {errors.expiry && <p className={errorCls}>{errors.expiry.message}</p>}
          </div>
          <div>
            <label className={labelCls}>CVV</label>
            <input
              {...register("cvv")}
              type="password"
              placeholder="•••"
              maxLength={4}
              className={`${inputCls} ${errors.cvv ? "border-[#8B1A1A]" : "border-[rgba(45,24,84,0.2)] focus:border-[#C97B3A]"}`}
            />
            {errors.cvv && <p className={errorCls}>{errors.cvv.message}</p>}
          </div>
        </div>
      </div>

      {/* Promo code */}
      <div className="mt-6">
        <label className={labelCls}>Promo Code</label>
        <div className="flex gap-2">
          <input
            value={promoCode}
            onChange={(e) => { setPromoCode(e.target.value); setPromoError(""); }}
            placeholder="Enter code"
            className={`${inputCls} flex-1 border-[rgba(45,24,84,0.2)] focus:border-[#C97B3A] uppercase`}
          />
          <button
            type="button"
            onClick={applyPromo}
            className="rounded-sm border border-plum/20 px-5 text-xs font-semibold uppercase tracking-[0.15em] text-[#2D1854] hover:bg-soft-ivory transition-colors"
          >
            Apply
          </button>
        </div>
        {promoError && <p className={errorCls}>{promoError}</p>}
        {promoApplied && (
          <p className="mt-1 text-xs text-[#4A1F7A] font-medium">
            {promoApplied === "LUMINA15" ? "15% discount applied ✓" : "Free shipping applied ✓"}
          </p>
        )}
      </div>

      <div className="mt-8 flex gap-3">
        <button type="button" onClick={onBack} className="flex-1 rounded-sm border border-plum/20 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#2D1854] hover:bg-soft-ivory transition-colors">
          Back
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-[2] flex items-center justify-center gap-2 rounded-sm bg-gold py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-white hover:bg-[#b36b30] transition-colors disabled:opacity-80"
        >
          {loading ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              Processing...
            </>
          ) : (
            `Place Order · $${total.toFixed(2)}`
          )}
        </button>
      </div>
    </form>
  );
}
