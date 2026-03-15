"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import type { ShippingData } from "../CheckoutFlow";

const schema = z.object({
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(7, "Required"),
  address1: z.string().min(3, "Required"),
  address2: z.string().optional(),
  city: z.string().min(1, "Required"),
  state: z.string().min(1, "Required"),
  zip: z.string().min(3, "Required"),
  country: z.string().min(1, "Required"),
  shippingMethod: z.enum(["standard", "express", "overnight"]),
});

type FormData = z.infer<typeof schema>;

const COUNTRIES = ["United States","United Kingdom","Canada","Australia","Germany","France","Italy","Spain","Netherlands","Sweden","Norway","Denmark","Switzerland","Japan","South Korea","Singapore","UAE","Saudi Arabia","India","Brazil"];

const SHIPPING_METHODS = [
  { id: "standard" as const, label: "Standard Shipping", time: "3–5 business days", price: (subtotal: number) => subtotal >= 60 ? 0 : 5.99 },
  { id: "express" as const, label: "Express Shipping", time: "1–2 business days", price: () => 12.99 },
  { id: "overnight" as const, label: "Overnight Delivery", time: "Next business day", price: () => 24.99 },
];

const inputCls = "h-11 w-full rounded-sm border px-3 text-sm text-[#1A0A2E] placeholder:text-[#9B8A7A] focus:outline-none transition-colors";
const labelCls = "mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.15em] text-[#2D1854]";
const errorCls = "mt-1 text-xs text-[#8B1A1A]";

export function StepShipping({ onNext, onBack }: { onNext: (data: ShippingData) => void; onBack: () => void }) {
  const items = useCartStore((s) => s.items);
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const [selectedMethod, setSelectedMethod] = useState<"standard" | "express" | "overnight">("standard");

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { shippingMethod: "standard", country: "United States" },
  });

  const onSubmit = (data: FormData) => {
    onNext({ ...data, shippingMethod: selectedMethod });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="font-heading text-3xl text-[#1A0A2E]">Shipping Information</h2>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelCls}>First Name</label>
          <input {...register("firstName")} className={`${inputCls} ${errors.firstName ? "border-[#8B1A1A]" : "border-[rgba(45,24,84,0.2)] focus:border-[#C97B3A]"}`} />
          {errors.firstName && <p className={errorCls}>{errors.firstName.message}</p>}
        </div>
        <div>
          <label className={labelCls}>Last Name</label>
          <input {...register("lastName")} className={`${inputCls} ${errors.lastName ? "border-[#8B1A1A]" : "border-[rgba(45,24,84,0.2)] focus:border-[#C97B3A]"}`} />
          {errors.lastName && <p className={errorCls}>{errors.lastName.message}</p>}
        </div>
        <div>
          <label className={labelCls}>Email</label>
          <input {...register("email")} type="email" className={`${inputCls} ${errors.email ? "border-[#8B1A1A]" : "border-[rgba(45,24,84,0.2)] focus:border-[#C97B3A]"}`} />
          {errors.email && <p className={errorCls}>{errors.email.message}</p>}
        </div>
        <div>
          <label className={labelCls}>Phone</label>
          <input {...register("phone")} type="tel" className={`${inputCls} ${errors.phone ? "border-[#8B1A1A]" : "border-[rgba(45,24,84,0.2)] focus:border-[#C97B3A]"}`} />
          {errors.phone && <p className={errorCls}>{errors.phone.message}</p>}
        </div>
        <div className="sm:col-span-2">
          <label className={labelCls}>Address Line 1</label>
          <input {...register("address1")} className={`${inputCls} ${errors.address1 ? "border-[#8B1A1A]" : "border-[rgba(45,24,84,0.2)] focus:border-[#C97B3A]"}`} />
          {errors.address1 && <p className={errorCls}>{errors.address1.message}</p>}
        </div>
        <div className="sm:col-span-2">
          <label className={labelCls}>Address Line 2 <span className="normal-case font-normal text-[#9B8A7A]">(Optional)</span></label>
          <input {...register("address2")} className={`${inputCls} border-[rgba(45,24,84,0.2)] focus:border-[#C97B3A]`} />
        </div>
        <div>
          <label className={labelCls}>City</label>
          <input {...register("city")} className={`${inputCls} ${errors.city ? "border-[#8B1A1A]" : "border-[rgba(45,24,84,0.2)] focus:border-[#C97B3A]"}`} />
          {errors.city && <p className={errorCls}>{errors.city.message}</p>}
        </div>
        <div>
          <label className={labelCls}>State / Province</label>
          <input {...register("state")} className={`${inputCls} ${errors.state ? "border-[#8B1A1A]" : "border-[rgba(45,24,84,0.2)] focus:border-[#C97B3A]"}`} />
          {errors.state && <p className={errorCls}>{errors.state.message}</p>}
        </div>
        <div>
          <label className={labelCls}>ZIP / Postal Code</label>
          <input {...register("zip")} className={`${inputCls} ${errors.zip ? "border-[#8B1A1A]" : "border-[rgba(45,24,84,0.2)] focus:border-[#C97B3A]"}`} />
          {errors.zip && <p className={errorCls}>{errors.zip.message}</p>}
        </div>
        <div>
          <label className={labelCls}>Country</label>
          <select {...register("country")} className={`${inputCls} ${errors.country ? "border-[#8B1A1A]" : "border-[rgba(45,24,84,0.2)] focus:border-[#C97B3A]"} bg-white`}>
            {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
          </select>
          {errors.country && <p className={errorCls}>{errors.country.message}</p>}
        </div>
      </div>

      {/* Shipping method */}
      <div className="mt-8">
        <h3 className="font-heading text-xl text-[#1A0A2E]">Shipping Method</h3>
        <div className="mt-4 space-y-3">
          {SHIPPING_METHODS.map((m) => {
            const cost = m.price(subtotal);
            const isSelected = selectedMethod === m.id;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => setSelectedMethod(m.id)}
                className={`w-full rounded-sm border p-4 text-left transition-colors ${isSelected ? "border-[#C97B3A] bg-[#C97B3A]/5" : "border-[rgba(45,24,84,0.15)] bg-white hover:border-[#C97B3A]/50"}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`h-4 w-4 rounded-full border-2 flex items-center justify-center ${isSelected ? "border-[#C97B3A]" : "border-[#9B8A7A]"}`}>
                      {isSelected && <div className="h-2 w-2 rounded-full bg-[#C97B3A]" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#1A0A2E]">{m.label}</p>
                      <p className="text-xs text-[#6B5A4A]">{m.time}</p>
                    </div>
                  </div>
                  <p className={`text-sm font-semibold ${cost === 0 ? "text-[#4A1F7A]" : "text-[#1A0A2E]"}`}>
                    {cost === 0 ? "FREE" : `$${cost.toFixed(2)}`}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-8 flex gap-3">
        <button type="button" onClick={onBack} className="flex-1 rounded-sm border border-plum/20 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#2D1854] hover:bg-soft-ivory transition-colors">
          Back
        </button>
        <button type="submit" className="flex-[2] rounded-sm bg-gold py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-white hover:bg-[#b36b30] transition-colors">
          Continue to Payment
        </button>
      </div>
    </form>
  );
}
