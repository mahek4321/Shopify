"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { StepCart } from "./steps/StepCart";
import { StepShipping } from "./steps/StepShipping";
import { StepPayment } from "./steps/StepPayment";
import { StepConfirmation } from "./steps/StepConfirmation";
import { OrderSummary } from "./OrderSummary";

export type ShippingData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  shippingMethod: "standard" | "express" | "overnight";
};

type Step = "cart" | "shipping" | "payment" | "confirmation";

const STEPS: { key: Step; label: string }[] = [
  { key: "cart", label: "Cart" },
  { key: "shipping", label: "Shipping" },
  { key: "payment", label: "Payment" },
  { key: "confirmation", label: "Confirmed" },
];

const stepIndex = (s: Step) => STEPS.findIndex((x) => x.key === s);

export function CheckoutFlow({ step }: { step: Step }) {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const [shippingData, setShippingData] = useState<ShippingData | null>(null);
  const [orderNumber] = useState(() => `LMN-${Math.floor(100000 + Math.random() * 900000)}`);
  const [discount, setDiscount] = useState(0);
  const [shippingOverride, setShippingOverride] = useState<number | null>(null);

  const go = (s: Step) => router.push(`/checkout?step=${s}`);

  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const baseShipping = shippingData?.shippingMethod === "express" ? 12.99
    : shippingData?.shippingMethod === "overnight" ? 24.99
    : subtotal >= 60 ? 0 : 5.99;
  const shipping = shippingOverride !== null ? shippingOverride : baseShipping;
  const discountAmt = subtotal * discount;
  const total = subtotal - discountAmt + shipping;

  const isConfirmation = step === "confirmation";

  return (
    <div className="min-h-screen bg-ivory">
      {/* Step indicator */}
      {!isConfirmation && (
        <div className="border-b border-plum/10 bg-white">
          <div className="mx-auto flex max-w-5xl items-center justify-center gap-0 px-6 py-4">
            {STEPS.map((s, i) => {
              const current = stepIndex(step);
              const isDone = i < current;
              const isActive = i === current;
              return (
                <div key={s.key} className="flex items-center">
                  <div className="flex flex-col items-center gap-1">
                    <div
                      className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold transition-colors ${
                        isDone ? "bg-violet text-white" : isActive ? "bg-gold text-white" : "bg-plum/10 text-[#9B8A7A]"
                      }`}
                    >
                      {isDone ? <Check className="h-3.5 w-3.5" /> : i + 1}
                    </div>
                    <span className={`text-[10px] uppercase tracking-[0.15em] ${isActive ? "text-[#C97B3A] font-semibold" : isDone ? "text-[#4A1F7A]" : "text-[#9B8A7A]"}`}>
                      {s.label}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className={`mx-3 mb-4 h-px w-12 md:w-20 ${i < current ? "bg-violet" : "bg-plum/15"}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className={`mx-auto max-w-5xl px-6 py-10 ${isConfirmation ? "" : "md:grid md:grid-cols-[1fr_380px] md:gap-10"}`}>
        {/* Main content */}
        <div>
          {step === "cart" && <StepCart onNext={() => go("shipping")} />}
          {step === "shipping" && (
            <StepShipping
              onNext={(data: ShippingData) => { setShippingData(data); go("payment"); }}
              onBack={() => go("cart")}
            />
          )}
          {step === "payment" && (
            <StepPayment
              shippingData={shippingData}
              total={total}
              discount={discount}
              discountAmt={discountAmt}
              onDiscount={(pct: number) => setDiscount(pct)}
              onShippingOverride={(v: number | null) => setShippingOverride(v)}
              onNext={() => go("confirmation")}
              onBack={() => go("shipping")}
              orderNumber={orderNumber}
            />
          )}
          {step === "confirmation" && (
            <StepConfirmation
              shippingData={shippingData}
              orderNumber={orderNumber}
              total={total}
            />
          )}
        </div>

        {/* Order summary sidebar */}
        {!isConfirmation && (
          <div className="mt-10 md:mt-0">
            <OrderSummary
              subtotal={subtotal}
              shipping={shipping}
              discount={discountAmt}
              total={total}
            />
          </div>
        )}
      </div>
    </div>
  );
}
