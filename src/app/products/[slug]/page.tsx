"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Heart, Check, Truck, RotateCcw, Leaf, Minus, Plus } from "lucide-react";
import * as Tabs from "@radix-ui/react-tabs";
import { products } from "@/lib/data";
import { useCartStore } from "@/store/useCartStore";
import { ProductCard } from "@/components/product/ProductCard";

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = products.find((p) => p.id === params.slug);
  if (!product) notFound();

  const { addItem, toggleWishlist } = useCartStore();
  const wishlisted = useCartStore((s) => s.isWishlisted(product.id));

  const [selectedVolume, setSelectedVolume] = useState(product.volume[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeThumb, setActiveThumb] = useState(0);
  const [addState, setAddState] = useState<"idle" | "loading" | "success">("idle");
  const [reviewFilter, setReviewFilter] = useState<"all" | "5" | "4" | "verified">("all");

  const thumbGradients = [
    product.gradient,
    `${product.gradient} opacity-80`,
    "from-[#2D1854] via-[#4A1F7A] to-[#C97B3A]",
    "from-[#1A0A2E] via-[#C97B3A] to-[#4A1F7A]",
  ];

  const handleAddToCart = () => {
    if (addState !== "idle") return;
    setAddState("loading");
    setTimeout(() => {
      addItem(product, { quantity, variant: selectedVolume });
      setAddState("success");
      toast.success(`${product.name} added to bag ✓`);
      setTimeout(() => setAddState("idle"), 2000);
    }, 500);
  };

  const handleWishlist = () => {
    toggleWishlist(product.id);
  };

  const related = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 3);
  const fillRelated = related.length < 3
    ? [...related, ...products.filter((p) => p.id !== product.id && p.category !== product.category).slice(0, 3 - related.length)]
    : related;

  const filteredReviews = product.reviews.filter((r) => {
    if (reviewFilter === "5") return r.rating === 5;
    if (reviewFilter === "4") return r.rating === 4;
    if (reviewFilter === "verified") return r.verified;
    return true;
  });

  const ratingBreakdown = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: product.reviews.filter((r) => r.rating === star).length,
    pct: (product.reviews.filter((r) => r.rating === star).length / product.reviews.length) * 100,
  }));

  const collectionName = product.category.charAt(0).toUpperCase() + product.category.slice(1).replace("-", " ");

  return (
    <div className="bg-ivory pb-20">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-6xl px-6 pt-6">
        <nav className="flex items-center gap-2 text-xs text-[#9B8A7A]">
          <Link href="/" className="hover:text-[#1A0A2E] transition-colors">Home</Link>
          <span>/</span>
          <Link href={`/collections/${product.category}`} className="hover:text-[#1A0A2E] capitalize transition-colors">{collectionName}</Link>
          <span>/</span>
          <span className="text-[#1A0A2E]">{product.name}</span>
        </nav>
      </div>

      {/* Main product section */}
      <div className="mx-auto mt-8 max-w-6xl px-6">
        <div className="flex flex-col gap-12 md:flex-row">
          {/* Gallery */}
          <div className="md:sticky md:top-28 md:w-1/2 md:self-start">
            <motion.div
              key={activeThumb}
              initial={{ opacity: 0.7 }}
              animate={{ opacity: 1 }}
              className={`relative h-[480px] w-full overflow-hidden rounded-lg bg-gradient-to-br ${thumbGradients[activeThumb]} flex items-center justify-center`}
            >
              <span className="font-heading text-5xl text-white/20 select-none">
                {product.name.split(" ").map(w => w[0]).join("").slice(0, 3)}
              </span>
              {product.badge && (
                <span className="absolute left-4 top-4 rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                  {product.badge}
                </span>
              )}
            </motion.div>
            <div className="mt-3 grid grid-cols-4 gap-3">
              {thumbGradients.map((g, i) => (
                <button
                  key={i}
                  onClick={() => setActiveThumb(i)}
                  className={`relative h-20 overflow-hidden rounded-md bg-gradient-to-br ${g} flex items-center justify-center transition ${activeThumb === i ? "ring-2 ring-gold ring-offset-2" : "opacity-70 hover:opacity-100"}`}
                >
                  <span className="font-heading text-xs text-white/40 select-none">
                    {product.name.split(" ").map(w => w[0]).join("").slice(0, 2)}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="md:w-1/2">
            <h1 className="font-heading text-[36px] leading-tight text-midnight md:text-[42px]">{product.name}</h1>
            <p className="mt-1 text-sm text-[#9B8A7A]">{product.subtitle}</p>

            <div className="mt-3 flex items-center gap-3">
              <div className="flex items-center gap-0.5">
                {[1,2,3,4,5].map((s) => (
                  <Star key={s} className={`h-4 w-4 ${s <= Math.round(product.rating) ? "fill-gold text-gold" : "text-plum/20"}`} />
                ))}
              </div>
              <a href="#reviews" className="text-sm text-[#9B8A7A] hover:text-plum transition-colors">
                ({product.reviewCount} reviews)
              </a>
            </div>

            <p className="mt-4 text-[15px] leading-relaxed text-[#6B5A4A]">{product.shortDescription}</p>

            <div className="mt-5 flex items-baseline gap-3">
              <span className="font-heading text-3xl text-gold">${product.price}</span>
              {product.comparePrice && (
                <>
                  <span className="text-lg text-subtle line-through">${product.comparePrice}</span>
                  <span className="rounded-full bg-gold px-3 py-0.5 text-xs font-semibold text-white">
                    Save ${product.comparePrice - product.price}
                  </span>
                </>
              )}
            </div>

            {/* Volume selector */}
            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6B5A4A]">Volume</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.volume.map((v) => (
                  <button
                    key={v}
                    onClick={() => setSelectedVolume(v)}
                    className={`rounded-full px-5 py-2 text-xs font-medium transition ${
                      selectedVolume === v
                        ? "bg-plum text-champagne"
                        : "border border-plum/30 text-midnight hover:bg-soft-ivory"
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mt-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6B5A4A]">Quantity</p>
              <div className="mt-2 inline-flex items-center rounded-sm border border-plum/20 bg-white">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="flex h-10 w-10 items-center justify-center text-plum hover:bg-soft-ivory"
                  aria-label="Decrease"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="w-10 text-center text-sm font-medium text-midnight">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                  className="flex h-10 w-10 items-center justify-center text-plum hover:bg-soft-ivory"
                  aria-label="Increase"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Add to cart + wishlist */}
            <div className="mt-6 flex gap-3">
              <button
                onClick={handleAddToCart}
                disabled={addState === "loading"}
                className={`flex h-14 flex-1 items-center justify-center gap-2 rounded-sm text-xs font-semibold uppercase tracking-[0.2em] transition ${
                  addState === "success"
                    ? "bg-plum text-champagne"
                    : "bg-gold text-white hover:bg-[#b36b30]"
                }`}
              >
                {addState === "loading" && (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                )}
                {addState === "success" && <Check className="h-4 w-4" />}
                {addState === "idle" && "Add to Bag"}
                {addState === "loading" && "Adding..."}
                {addState === "success" && "Added!"}
              </button>
              <button
                onClick={handleWishlist}
                className="flex h-14 w-14 items-center justify-center rounded-sm border border-plum/20 hover:bg-soft-ivory transition-colors"
                aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart
                  className="h-5 w-5 transition-colors"
                  style={{ color: wishlisted ? "#C97B3A" : "#6B5A4A", fill: wishlisted ? "#C97B3A" : "none" }}
                />
              </button>
            </div>

            {/* Trust row */}
            <div className="mt-5 flex flex-wrap gap-4 text-xs text-midnight/60">
              <span className="flex items-center gap-1.5"><Truck className="h-3.5 w-3.5 text-plum" /> Free Shipping over $60</span>
              <span className="flex items-center gap-1.5"><RotateCcw className="h-3.5 w-3.5 text-plum" /> Easy Returns</span>
              <span className="flex items-center gap-1.5"><Leaf className="h-3.5 w-3.5 text-plum" /> Cruelty Free</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div id="reviews" className="mx-auto mt-16 max-w-6xl px-6">
        <Tabs.Root defaultValue="description">
          <Tabs.List className="flex border-b border-plum/10">
            {["description", "ingredients", "how-to-use", "reviews"].map((tab) => (
              <Tabs.Trigger
                key={tab}
                value={tab}
                className="px-5 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-midnight/50 transition data-[state=active]:border-b-2 data-[state=active]:border-gold data-[state=active]:text-midnight"
              >
                {tab === "how-to-use" ? "How to Use" : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Tabs.Trigger>
            ))}
          </Tabs.List>

          <Tabs.Content value="description" className="py-8">
            <p className="text-[15px] leading-[1.8] text-[#6B5A4A]">{product.description}</p>
            <ul className="mt-6 space-y-2">
              {product.benefits.map((b) => (
                <li key={b} className="flex items-center gap-3 text-sm text-[#1A0A2E]">
                  <Check className="h-4 w-4 flex-shrink-0 text-gold" />
                  {b}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-2">
              {product.skinType.map((s) => (
                <span key={s} className="rounded-full border border-plum/20 px-4 py-1 text-xs text-[#2D1854]">{s}</span>
              ))}
            </div>
          </Tabs.Content>

          <Tabs.Content value="ingredients" className="py-8">
            <p className="text-[15px] leading-[1.8] text-[#6B5A4A]">{product.ingredients}</p>
            <p className="mt-4 rounded-md bg-soft-ivory px-4 py-3 text-xs text-[#6B5A4A]">
              Full INCI list. Formulated without parabens, sulfates or synthetic fragrances.
            </p>
          </Tabs.Content>

          <Tabs.Content value="how-to-use" className="py-8">
            <p className="text-[15px] leading-[1.8] text-[#6B5A4A]">{product.howToUse}</p>
            <div className="mt-6 rounded-md bg-soft-ivory px-4 py-3 text-xs text-[#6B5A4A]">
              <span className="font-semibold text-plum">Routine tip:</span> Apply thinnest to thickest — Toner → Serum → Eye Elixir → Moisturiser → SPF (AM only)
            </div>
          </Tabs.Content>

          <Tabs.Content value="reviews" className="py-8">
            <div className="flex flex-col gap-10 md:flex-row">
              {/* Rating summary */}
              <div className="md:w-64 md:flex-shrink-0">
                <p className="font-heading text-7xl text-gold">{product.rating.toFixed(1)}</p>
                <div className="flex items-center gap-1 mt-1">
                  {[1,2,3,4,5].map((s) => (
                    <Star key={s} className={`h-4 w-4 ${s <= Math.round(product.rating) ? "fill-gold text-gold" : "text-plum/20"}`} />
                  ))}
                </div>
                <p className="mt-1 text-xs text-[#9B8A7A]">{product.reviewCount} reviews</p>
                <div className="mt-4 space-y-2">
                  {ratingBreakdown.map(({ star, count, pct }) => (
                    <div key={star} className="flex items-center gap-2 text-xs">
                      <span className="w-6 text-right text-midnight/60">{star}★</span>
                      <div className="flex-1 h-1.5 rounded-full bg-plum/10 overflow-hidden">
                        <div className="h-full rounded-full bg-gold" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="w-4 text-midnight/50">{count}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews list */}
              <div className="flex-1">
                <div className="mb-4 flex flex-wrap gap-2">
                  {(["all", "5", "4", "verified"] as const).map((f) => (
                    <button
                      key={f}
                      onClick={() => setReviewFilter(f)}
                      className={`rounded-full px-4 py-1.5 text-xs font-medium transition ${
                        reviewFilter === f ? "bg-plum text-champagne" : "border border-plum/20 text-midnight hover:bg-soft-ivory"
                      }`}
                    >
                      {f === "all" ? "All" : f === "verified" ? "Verified" : `${f} Stars`}
                    </button>
                  ))}
                </div>
                <div className="space-y-5">
                  {filteredReviews.map((r, i) => (
                    <div key={i} className="border-b border-plum/8 pb-5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-1">
                            {[1,2,3,4,5].map((s) => (
                              <Star key={s} className={`h-3.5 w-3.5 ${s <= r.rating ? "fill-gold text-gold" : "text-plum/20"}`} />
                            ))}
                          </div>
                          <p className="mt-2 text-[14px] leading-relaxed text-[#1A0A2E]">{r.text}</p>
                          <p className="mt-2 text-xs text-[#9B8A7A]">{r.name} · {r.location}</p>
                        </div>
                        <div className="flex-shrink-0 text-right">
                          <p className="text-xs text-[#9B8A7A]">{r.date}</p>
                          {r.verified && (
                            <span className="mt-1 inline-block rounded-full bg-soft-ivory px-2 py-0.5 text-[10px] text-[#2D1854]">Verified</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Tabs.Content>
        </Tabs.Root>
      </div>

      {/* Related products */}
      {fillRelated.length > 0 && (
        <div className="mx-auto mt-16 max-w-6xl px-6">
          <h2 className="font-heading text-3xl text-midnight">You May Also Like</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {fillRelated.map((p) => (
              <ProductCard key={p.id} product={p} showQuickAdd />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
