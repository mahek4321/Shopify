"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FlaskConical, Leaf, Gem, Recycle, ChevronDown } from "lucide-react";

const values = [
  { icon: FlaskConical, label: "Science", desc: "Every formula is clinically tested and dermatologist-approved before launch." },
  { icon: Leaf, label: "Clean", desc: "Free from parabens, sulfates, synthetic fragrances and 1,300+ restricted ingredients." },
  { icon: Gem, label: "Luxury", desc: "Sensorial textures and rare botanicals that make every step feel like a ritual." },
  { icon: Recycle, label: "Sustainable", desc: "Recyclable glass, responsible sourcing, and carbon-neutral shipping by 2026." },
];

const ingredients = [
  { name: "Bakuchiol", origin: "India", benefit: "Natural retinol alternative — firms and brightens without irritation." },
  { name: "Snow Mushroom", origin: "Japan", benefit: "Holds 500× its weight in water for deep, lasting hydration." },
  { name: "Vitamin C 15%", origin: "Stabilised", benefit: "Clinically proven to reduce dark spots and boost radiance." },
  { name: "Colloidal Gold", origin: "Switzerland", benefit: "Anti-inflammatory and antioxidant — visibly lifts and firms." },
  { name: "Centella Asiatica", origin: "Sri Lanka", benefit: "Soothes, heals and strengthens the skin barrier." },
];

const press = ["Vogue", "Harper's Bazaar", "Allure", "Byrdie", "Refinery29"];

export default function AboutPage() {
  return (
    <div className="bg-ivory">
      {/* Hero */}
      <section className="relative flex min-h-[100vh] flex-col items-center justify-center bg-gradient-to-br from-[#1A0A2E] via-[#2D1854] to-[#4A1F7A] text-ivory">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(240,213,160,0.15),_transparent_60%)]" />
        <motion.div
          className="relative mx-auto max-w-3xl px-6 text-center"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-[11px] uppercase tracking-[0.3em] text-champagne/70">Est. 2019 · London</p>
          <h1 className="mt-4 font-heading text-[56px] leading-[1.05] md:text-[72px]">Our Story</h1>
          <p className="mt-6 text-sm leading-relaxed text-white/75 md:text-[16px]">
            Lumina Skincare was founded on the belief that science and nature can work in true harmony — creating formulas that are as gentle as they are transformative.
          </p>
        </motion.div>
        <motion.div
          className="absolute bottom-10 flex flex-col items-center gap-2 text-white/40"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
        >
          <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
          <ChevronDown className="h-4 w-4 animate-bounce" />
        </motion.div>
      </section>

      {/* Brand Values */}
      <section className="bg-ivory py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center">
            <p className="text-[11px] uppercase tracking-[0.3em] text-gold">Our Values</p>
            <h2 className="mt-3 font-heading text-[40px] text-plum md:text-[48px]">What we stand for</h2>
          </div>
          <div className="mt-14 grid gap-10 md:grid-cols-4">
            {values.map((v, i) => (
              <motion.div
                key={v.label}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-violet/30">
                  <v.icon className="h-6 w-6 text-violet" />
                </div>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-plum">{v.label}</p>
                <p className="mt-2 text-sm text-midnight/65">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Story */}
      <section className="bg-soft-ivory py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col gap-12 md:flex-row md:items-center">
            <motion.div
              className="h-[420px] w-full overflow-hidden rounded-lg bg-gradient-to-br from-[#2D1854] via-[#4A1F7A] to-[#C97B3A] md:w-1/2 flex items-center justify-center"
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7 }}
            >
              <span className="font-heading text-6xl text-white/20 select-none">L</span>
            </motion.div>
            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7 }}
            >
              <p className="text-[11px] uppercase tracking-[0.3em] text-gold">The Founder</p>
              <h2 className="mt-3 font-heading text-[36px] text-midnight md:text-[42px]">
                Born from a personal journey
              </h2>
              <p className="mt-5 text-[15px] leading-[1.8] text-midnight/65">
                After years of struggling with sensitive, reactive skin and finding that luxury products were either ineffective or full of irritants, our founder set out to create something different — a brand where clinical efficacy and clean formulation were non-negotiable.
              </p>
              <p className="mt-4 text-[15px] leading-[1.8] text-midnight/65">
                Working alongside leading cosmetic chemists and dermatologists, Lumina was built from the ground up with one goal: formulas that genuinely work, for every skin type, without compromise.
              </p>
              <Link href="/collections/all" className="mt-8 inline-flex h-11 items-center rounded-sm bg-gold px-8 text-xs font-semibold uppercase tracking-[0.2em] text-white hover:bg-[#b36b30] transition">
                Shop the Collection
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Ingredients */}
      <section className="bg-plum py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <p className="text-[11px] uppercase tracking-[0.3em] text-champagne/60">The Science</p>
            <h2 className="mt-3 font-heading text-[40px] text-champagne md:text-[48px]">Hero Ingredients</h2>
          </div>
          <div className="mt-12 flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
            {ingredients.map((ing, i) => (
              <motion.div
                key={ing.name}
                initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="min-w-[240px] flex-shrink-0 rounded-lg border border-white/10 bg-white/5 p-6"
              >
                <p className="text-[10px] uppercase tracking-[0.2em] text-champagne/50">{ing.origin}</p>
                <p className="mt-2 font-heading text-xl text-champagne">{ing.name}</p>
                <p className="mt-3 text-sm leading-relaxed text-champagne/70">{ing.benefit}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Press */}
      <section className="bg-ivory py-20">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-midnight/40">As seen in</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-10">
            {press.map((name, i) => (
              <motion.p
                key={name}
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="font-heading text-2xl text-midnight/25 transition hover:text-plum cursor-default"
              >
                {name}
              </motion.p>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
