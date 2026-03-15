"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import confetti from "canvas-confetti";
import type { ShippingData } from "../CheckoutFlow";

type Props = {
  shippingData: ShippingData | null;
  orderNumber: string;
  total: number;
};

export function StepConfirmation({ shippingData, orderNumber, total }: Props) {
  useEffect(() => {
    confetti({
      particleCount: 120,
      spread: 80,
      colors: ["#C97B3A", "#2D1854", "#F0D5A0", "#4A1F7A"],
      origin: { y: 0.4 },
    });
  }, []);

  return (
    <div className="flex flex-col items-center py-12 text-center">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
        className="flex h-20 w-20 items-center justify-center rounded-full bg-[#4A1F7A]"
      >
        <Check className="h-10 w-10 text-white" strokeWidth={2.5} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-6"
      >
        <h1 className="font-heading text-[48px] text-[#1A0A2E] md:text-[56px]">Order Confirmed!</h1>
        <p className="mt-2 text-sm font-medium text-[#4A1F7A] tracking-[0.1em]">{orderNumber}</p>
        {shippingData && (
          <p className="mt-3 text-sm text-[#6B5A4A]">
            A confirmation email has been sent to{" "}
            <span className="font-medium text-[#1A0A2E]">{shippingData.email}</span>
          </p>
        )}
      </motion.div>

      {shippingData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-8 w-full max-w-md rounded-md border border-plum/10 bg-white p-6 text-left"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#2D1854]">Shipping to</p>
          <p className="mt-2 text-sm text-[#1A0A2E]">{shippingData.firstName} {shippingData.lastName}</p>
          <p className="text-sm text-[#6B5A4A]">{shippingData.address1}{shippingData.address2 ? `, ${shippingData.address2}` : ""}</p>
          <p className="text-sm text-[#6B5A4A]">{shippingData.city}, {shippingData.state} {shippingData.zip}</p>
          <p className="text-sm text-[#6B5A4A]">{shippingData.country}</p>
          <div className="mt-4 border-t border-plum/10 pt-4 flex justify-between text-sm font-semibold text-[#1A0A2E]">
            <span>Total Paid</span>
            <span className="text-[#C97B3A]">${total.toFixed(2)}</span>
          </div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="mt-8 flex flex-wrap justify-center gap-4"
      >
        <Link
          href="/collections/all"
          className="inline-flex h-11 items-center rounded-sm bg-gold px-8 text-xs font-semibold uppercase tracking-[0.2em] text-white hover:bg-[#b36b30] transition-colors"
        >
          Continue Shopping
        </Link>
      </motion.div>
    </div>
  );
}
