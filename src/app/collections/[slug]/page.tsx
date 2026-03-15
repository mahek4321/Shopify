"use client";

import { useMemo, useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { products, collections } from "@/lib/data";
import { ProductCard } from "@/components/product/ProductCard";

type SortKey = "featured" | "price-asc" | "price-desc" | "rating";

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low–High" },
  { value: "price-desc", label: "Price: High–Low" },
  { value: "rating", label: "Best Rated" },
];

export default function CollectionPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const [sort, setSort] = useState<SortKey>("featured");

  const isAll = slug === "all";
  const collection = isAll ? null : collections.find((c) => c.id === slug);

  if (!isAll && !collection) notFound();

  const filtered = useMemo(() => {
    const base = isAll ? products : products.filter((p) => p.category === slug);
    return [...base].sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "rating") return b.rating - a.rating;
      return b.reviewCount - a.reviewCount;
    });
  }, [slug, sort, isAll]);

  const title = isAll ? "Shop All" : collection!.name;
  const description = isAll
    ? "Discover our complete Lumina collection."
    : collection!.description;
  const gradient = isAll
    ? "from-[#1A0A2E] via-[#2D1854] to-[#4A1F7A]"
    : collection!.gradient;

  return (
    <div className="bg-ivory pb-20">
      {/* Hero */}
      <section className={`bg-gradient-to-br ${gradient} py-20 text-ivory`}>
        <div className="mx-auto max-w-4xl px-6">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-2 text-xs text-white/60">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <Link href="/collections/all" className="hover:text-white">Collections</Link>
            {!isAll && (
              <>
                <span>/</span>
                <span className="text-white">{title}</span>
              </>
            )}
          </nav>
          <h1 className="font-heading text-[40px] md:text-[56px]">{title}</h1>
          <p className="mt-3 text-sm text-white/80 md:text-[15px]">{description}</p>
          <span className="mt-4 inline-block rounded-full border border-white/30 px-4 py-1 text-xs text-white/80">
            {filtered.length} product{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>
      </section>

      {/* Filter bar */}
      <div className="sticky top-[57px] z-30 border-b border-plum/10 bg-ivory/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <p className="text-xs text-[#6B5A4A]">Showing {filtered.length} products</p>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="rounded-sm border border-plum/20 bg-white px-3 py-1.5 text-xs text-[#1A0A2E] focus:border-gold focus:outline-none"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-6 py-24 text-center">
            <p className="font-heading text-2xl text-subtle">No products in this collection yet</p>
            <Link
              href="/collections/all"
              className="inline-flex h-11 items-center rounded-sm bg-gold px-8 text-xs font-semibold uppercase tracking-[0.2em] text-white hover:bg-[#b36b30]"
            >
              Shop All
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} showQuickAdd />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
