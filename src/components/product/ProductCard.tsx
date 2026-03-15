"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Heart, Check } from "lucide-react";
import { useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import type { Product } from "@/lib/data";

type Props = { product: Product; showQuickAdd?: boolean };

const badgeStyles: Record<string, string> = {
  violet: "bg-violet text-champagne",
  gold: "bg-gold text-white",
  sale: "bg-sale text-white",
  bundle: "bg-midnight text-champagne",
};

export function ProductCard({ product, showQuickAdd = false }: Props) {
  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useCartStore((s) => s.toggleWishlist);
  const wishlisted = useCartStore((s) => s.isWishlisted(product.id));
  const [added, setAdded] = useState(false);
  const [heartPop, setHeartPop] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    if (added) return;
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleWishlist(product.id);
    setHeartPop(true);
    setTimeout(() => setHeartPop(false), 300);
  };

  return (
    <motion.article
      className="group flex flex-col overflow-hidden rounded-md border border-plum/8 bg-white shadow-sm"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15% 0px" }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -4, boxShadow: "0 20px 60px rgba(26,10,46,0.14)" }}
    >
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative h-64 w-full overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-br ${product.gradient}`} />
          {product.badge && (
            <span className={`absolute left-3 top-3 rounded-full px-3 py-1 text-[11px] font-semibold ${badgeStyles[product.badgeColor ?? "violet"]}`}>
              {product.badge}
            </span>
          )}
          <motion.button
            onClick={handleWishlist}
            animate={heartPop ? { scale: [1, 1.35, 1] } : { scale: 1 }}
            transition={{ duration: 0.2, type: "spring", stiffness: 400 }}
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors"
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart
              className="h-4 w-4 transition-colors"
              style={{ color: wishlisted ? "#C97B3A" : "#6B5A4A", fill: wishlisted ? "#C97B3A" : "none" }}
            />
          </motion.button>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-heading text-3xl text-white/20 select-none">
              {product.name.split(" ").map((w) => w[0]).join("").slice(0, 3)}
            </span>
          </div>
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-2 px-4 pb-4 pt-3">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-heading text-lg text-[#1A0A2E] hover:text-plum transition-colors">{product.name}</h3>
        </Link>
        <p className="text-xs text-[#9B8A7A]">{product.subtitle}</p>
        <div className="flex items-center gap-1 text-xs">
          <Star className="h-3.5 w-3.5 fill-gold text-gold" />
          <span className="text-[#1A0A2E]">{product.rating.toFixed(1)}</span>
          <span className="text-[#9B8A7A]">({product.reviewCount})</span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-base font-semibold text-[#C97B3A]">${product.price}</span>
          {product.comparePrice && (
            <span className="text-xs text-[#9B8A7A] line-through">${product.comparePrice}</span>
          )}
        </div>
        {showQuickAdd && (
          <button
            onClick={handleAdd}
            className={`mt-1 flex h-9 w-full items-center justify-center gap-1.5 rounded-sm text-xs font-semibold uppercase tracking-[0.15em] transition-colors ${
              added ? "bg-plum text-champagne" : "bg-gold text-white hover:bg-[#b36b30]"
            }`}
          >
            {added ? <><Check className="h-3.5 w-3.5" /> Added</> : "Add to Bag"}
          </button>
        )}
      </div>
    </motion.article>
  );
}
