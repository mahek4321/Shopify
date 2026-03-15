"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useCartStore } from "@/store/useCartStore";
import { products } from "@/lib/data";
import { ProductCard } from "@/components/product/ProductCard";

export default function WishlistPage() {
  const wishlist = useCartStore((s) => s.wishlist);
  const savedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <main className="min-h-screen bg-[#F8F3EE] pt-32 pb-24 px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-12">
        <p className="text-xs font-light tracking-[3px] uppercase text-[#C97B3A] mb-3">Your Collection</p>
        <h1 className="font-serif text-5xl text-[#1A0A2E] mb-2">Saved Items</h1>
        <p className="text-[#6B5A4A] text-base">
          {savedProducts.length} {savedProducts.length === 1 ? "item" : "items"} saved
        </p>
      </div>

      {/* Empty state */}
      {savedProducts.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-24 text-center"
        >
          <Heart size={64} className="mb-6" style={{ color: "#C97B3A", opacity: 0.4 }} />
          <h2 className="font-serif text-3xl text-[#1A0A2E] mb-3">Your wishlist is empty</h2>
          <p className="text-[#6B5A4A] mb-8 max-w-md">
            Save your favourite products by tapping the ♡ on any product card
          </p>
          <Link href="/collections/all">
            <button className="bg-[#C97B3A] text-white px-10 py-4 text-xs tracking-[2px] uppercase font-medium hover:bg-[#B06A2A] transition-colors">
              Explore Products
            </button>
          </Link>
        </motion.div>
      )}

      {/* Products grid */}
      {savedProducts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {savedProducts.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <ProductCard product={product} showQuickAdd={true} />
            </motion.div>
          ))}
        </div>
      )}

      {/* Continue shopping */}
      {savedProducts.length > 0 && (
        <div className="text-center mt-16">
          <Link href="/collections/all" className="text-[#4A1F7A] underline underline-offset-4 text-sm">
            Continue exploring →
          </Link>
        </div>
      )}
    </main>
  );
}
