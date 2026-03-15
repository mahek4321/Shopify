"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CheckoutFlow } from "./CheckoutFlow";

function CheckoutInner() {
  const params = useSearchParams();
  const step = (params.get("step") ?? "cart") as "cart" | "shipping" | "payment" | "confirmation";
  return <CheckoutFlow step={step} />;
}

export default function CheckoutPage() {
  return (
    <Suspense>
      <CheckoutInner />
    </Suspense>
  );
}
