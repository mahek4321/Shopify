"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Star, FlaskConical, Leaf, Gem, Recycle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ProductCard } from "@/components/product/ProductCard";
import { products, collections } from "@/lib/data";
import { useCartStore } from "@/store/useCartStore";

const emailSchema = z.object({ email: z.string().email("Please enter a valid email") });
type EmailForm = z.infer<typeof emailSchema>;

const bestSellers = [...products].sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 5);

const fadeInUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };

export default function HomePage() {
  const { addItem } = useCartStore();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<EmailForm>({
    resolver: zodResolver(emailSchema),
  });

  const onSubscribe = async (data: EmailForm) => {
    await new Promise((r) => setTimeout(r, 600));
    toast.success("You're in! Check your inbox for your 15% discount code.");
    reset();
  };

  return (
    <div className="bg-ivory">
      {/* Hero */}
      <section className="relative min-h-[100vh] overflow-hidden">
        <div className="absolute inset-0 -z-10 md:hidden bg-gradient-to-br from-[#1A0A2E] via-[#2D1854] to-[#C97B3A]" />
        <div className="absolute inset-0 -z-10 hidden md:flex">
          <div className="w-[55%] bg-ivory" />
          <div className="flex-1 bg-gradient-to-br from-[#1A0A2E] via-[#2D1854] to-[#C97B3A]" />
        </div>

        <div className="mx-auto flex min-h-[100vh] max-w-6xl flex-col gap-16 px-6 pb-24 pt-32 md:flex-row md:items-center md:pt-40">
          <motion.div
            className="w-full md:w-[55%]"
            initial="hidden" animate="visible" variants={fadeInUp}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-gold">✦ New Collection 2025</p>
            <h1 className="mt-4 font-heading text-[44px] leading-[1.05] text-ivory md:text-[56px] md:text-midnight lg:text-[72px]">
              Reveal Your<br />Radiant Skin
            </h1>
            <p className="mt-6 max-w-md text-sm text-white/70 md:text-[#6B5A4A] md:text-base">
              Science-backed formulas crafted with rare botanical ingredients from 14 countries.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/collections/all">
                <Button>Shop Now</Button>
              </Link>
              <Link href="/about">
                <Button variant="secondary" className="md:border-plum md:text-plum">Our Story</Button>
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-6 text-xs text-champagne/90 md:text-[#6B5A4A]">
              <span className="flex items-center gap-1.5"><Star className="h-3.5 w-3.5 text-gold fill-gold" /> 4.9★ · 2,400+ Reviews</span>
              <span>100% Natural Ingredients</span>
              <span>30-Day Money Back</span>
            </div>
          </motion.div>

          <motion.div
            className="w-full md:w-[45%]"
            initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <div className="relative mx-auto h-[420px] w-full max-w-md overflow-hidden rounded-lg bg-gradient-to-br from-[#1A0A2E] via-[#2D1854] to-[#C97B3A]">
              <div className="flex h-full flex-col justify-between p-8 text-ivory">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-champagne/80">Signature Collection</p>
                  <h2 className="mt-3 font-heading text-3xl">Lumina Glow Serum</h2>
                  <p className="mt-3 text-sm text-white/70">Clinically proven to improve skin radiance by 67% in 4 weeks.</p>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-champagne/80">Dermatologist Tested</p>
                    <p className="mt-1 font-heading text-2xl text-gold">$89</p>
                  </div>
                  <button
                    onClick={() => { const p = products.find(x => x.id === "glow-serum"); if (p) addItem({ ...p, variant: "30ml" }); toast.success("Lumina Glow Serum added to bag ✓"); }}
                    className="flex items-center gap-2 rounded-sm bg-gold px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-white hover:bg-[#b36b30] transition"
                  >
                    Add to Bag <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="bg-soft-ivory py-10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-6">
          {[
            { icon: "🚚", label: "Free Shipping" },
            { icon: "🔬", label: "Dermatologist Tested" },
            { icon: "🐰", label: "Cruelty Free" },
            { icon: "↩", label: "30-Day Returns" },
            { icon: "🔒", label: "Secure Checkout" },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              className="flex min-w-[100px] flex-1 flex-col items-center gap-2 text-center"
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-plum">{item.label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Collections */}
      <section className="bg-ivory py-24">
        <div className="mx-auto max-w-5xl px-6">
          <SectionTitle eyebrow="Our Collections" title="Shop by Category" align="center" />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {collections.map((col, i) => (
              <motion.div
                key={col.id}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link href={`/collections/${col.id}`}>
                  <div className={`relative h-72 overflow-hidden rounded-md bg-gradient-to-br ${col.cardGradient} transition hover:scale-[1.02] hover:shadow-soft`}>
                    <div className="absolute inset-0" style={{ background: "rgba(10,4,20,0.55)" }} />
                    <div className="relative flex h-full flex-col items-center justify-center text-center">
                      <span className="text-3xl">{col.icon}</span>
                      <p className="mt-3 font-heading text-2xl font-medium text-white md:text-[28px]" style={{ textShadow: "0 2px 12px rgba(0,0,0,0.8), 0 0 40px rgba(0,0,0,0.6)" }}>{col.name}</p>
                      <p className="mt-1 text-xs" style={{ color: "rgba(240,213,160,0.9)" }}>{col.description}</p>
                      <p className="mt-1 text-xs" style={{ color: "rgba(240,213,160,0.7)" }}>{col.count} products</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionTitle eyebrow="Most Loved" title="Best Sellers" subtitle="Most-loved by our community" align="left" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {bestSellers.slice(0, 3).map((p) => (
              <ProductCard key={p.id} product={p} showQuickAdd />
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <Link href="/collections/all">
              <Button variant="secondary">View All Products</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* USP Benefits */}
      <section className="bg-ivory py-24">
        <div className="mx-auto max-w-5xl px-6">
          <SectionTitle title="Why Lumina?" align="center" />
          <div className="mt-10 grid gap-10 md:grid-cols-2">
            {[
              { icon: FlaskConical, label: "Science-Backed", desc: "Clinically evaluated formulas developed with dermatologists and chemists." },
              { icon: Leaf, label: "Clean Beauty", desc: "Free from silicones, parabens, sulfates, and over 1,300 restricted ingredients." },
              { icon: Gem, label: "Luxury Feel", desc: "Silky textures, subtle natural fragrance, and sensorial experiences in every step." },
              { icon: Recycle, label: "Sustainable", desc: "Thoughtful packaging, recyclable glass, and responsibly sourced botanicals." },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
                className="flex gap-4"
              >
                <div className="mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-violet/30">
                  <item.icon className="h-5 w-5 text-violet" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-plum">{item.label}</h3>
                  <p className="mt-2 text-sm text-midnight/70">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="relative bg-gradient-to-br from-plum to-violet py-24 text-ivory">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(240,213,160,0.2),_transparent_60%)]" />
        <div className="relative mx-auto flex max-w-6xl flex-col gap-12 px-6 md:flex-row md:items-center">
          <div className="md:w-1/2">
            <h2 className="font-heading text-[40px] leading-[1.1] md:text-[52px]">
              Formulated with intention.<br />Designed for results.
            </h2>
          </div>
          <div className="md:w-1/2">
            <p className="text-sm leading-relaxed text-champagne/85 md:text-[15px]">
              Lumina Skincare was born from a belief that clinically proven performance and nature&apos;s most powerful botanicals can coexist. Each formula is meticulously crafted to respect the skin barrier while delivering visible, long-lasting radiance.
            </p>
            <Link href="/about" className="mt-6 inline-block">
              <Button variant="ghost">Meet the Brand</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionTitle eyebrow="Real Results" title="Over 2,400 five-star reviews" align="left" />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              { name: "Sarah M.", product: "Glow Serum", quote: "My skin has never looked this luminous. Friends keep asking what I'm using." },
              { name: "Priya K.", product: "Velvet Cream", quote: "The texture is unreal — rich but never heavy. My dry patches disappeared." },
              { name: "Emma L.", product: "Eye Elixir", quote: "Dark circles are softer and my concealer creases so much less. Worth every dollar." },
            ].map((t, i) => (
              <motion.article
                key={t.name}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.15 }}
                className="rounded-lg border border-plum/8 bg-ivory px-6 py-7"
              >
                <div className="flex items-center gap-0.5">
                  {[1,2,3,4,5].map((s) => <Star key={s} className="h-3.5 w-3.5 fill-gold text-gold" />)}
                </div>
                <p className="mt-4 text-[15px] italic text-midnight">&ldquo;{t.quote}&rdquo;</p>
                <p className="mt-4 text-xs font-semibold text-plum">{t.name} · <span className="text-subtle font-normal">{t.product}</span></p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-violet">Verified Buyer</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-gradient-to-br from-gold to-[#E8A060] py-20">
        <div className="mx-auto max-w-3xl px-6 text-center text-white">
          <h2 className="font-heading text-[34px] md:text-[44px]">Skincare wisdom, delivered.</h2>
          <p className="mt-3 text-sm text-white/85">Join 18,000+ subscribers. Get 15% off your first order.</p>
          <form onSubmit={handleSubmit(onSubscribe)} className="mt-8 flex flex-col gap-3 md:flex-row">
            <div className="flex-1">
              <input
                type="email"
                {...register("email")}
                className="h-12 w-full rounded-sm border border-white/40 bg-ivory px-4 text-sm text-midnight placeholder:text-midnight/40 focus:outline-none focus:border-plum"
                placeholder="you@example.com"
              />
              {errors.email && <p className="mt-1 text-left text-xs text-white/90">{errors.email.message}</p>}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="h-12 rounded-sm bg-plum px-8 text-xs font-semibold uppercase tracking-[0.2em] text-champagne hover:bg-midnight transition disabled:opacity-70"
            >
              {isSubmitting ? "..." : "Subscribe"}
            </button>
          </form>
          <p className="mt-3 text-[11px] text-white/70">No spam. Unsubscribe at any time.</p>
        </div>
      </section>
    </div>
  );
}
