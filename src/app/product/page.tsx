"use client";

import { useState } from "react";
import { Star, Heart } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/components/cart/CartContext";

const volumes = ["15ml", "30ml", "50ml"];

export default function ProductPage() {
  const [selectedVolume, setSelectedVolume] = useState("30ml");
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart({
      id: `glow-serum-${selectedVolume}`,
      name: `Glow Serum (${selectedVolume})`,
      price: 89,
    }, quantity);
  };

  return (
    <div className="bg-ivory pb-20 pt-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 md:flex-row">
        {/* Gallery */}
        <div className="md:sticky md:top-28 md:w-1/2">
          <div className="overflow-hidden rounded-xl border border-plum/10 bg-gradient-to-br from-midnight via-plum to-gold pb-[75%]" />
          <div className="mt-4 grid grid-cols-4 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-20 rounded-md border border-plum/10 bg-gradient-to-br from-ivory via-soft-ivory to-champagne"
              />
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="md:w-1/2">
          <p className="text-xs text-midnight/60">Home / Serums / Glow Serum</p>
          <h1 className="mt-3 font-heading text-[34px] text-midnight md:text-[40px]">
            Lumina Glow Serum
          </h1>
          <div className="mt-2 flex items-center gap-3 text-sm text-midnight/70">
            <div className="flex items-center gap-1 text-gold">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-gold" />
              ))}
            </div>
            <span>4.9 · 742 reviews</span>
          </div>
          <p className="mt-4 text-sm text-midnight/75 md:text-[15px]">
            A clinically proven brightening serum powered by stabilized vitamin C, niacinamide,
            and sea kelp to visibly improve radiance, texture, and tone without irritation.
          </p>

          <div className="mt-6 border-t border-plum/10 pt-6">
            <p className="text-xs font-medium tracking-[0.18em] text-midnight/70 uppercase">
              Volume
            </p>
            <div className="mt-3 flex gap-3">
              {volumes.map((vol) => {
                const active = vol === selectedVolume;
                return (
                  <button
                    key={vol}
                    className={`rounded-full px-4 py-2 text-xs ${
                      active
                        ? "bg-plum text-champagne"
                        : "border border-plum/40 text-midnight hover:border-plum"
                    }`}
                    onClick={() => setSelectedVolume(vol)}
                  >
                    {vol}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 flex items-center gap-4">
              <div>
                <p className="text-xs font-medium tracking-[0.18em] text-midnight/70 uppercase">
                  Quantity
                </p>
                <div className="mt-2 inline-flex items-center rounded-full border border-plum/20 bg-white px-3 py-1">
                  <button
                    className="px-2 text-lg text-midnight/70"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  >
                    −
                  </button>
                  <span className="px-4 text-sm">{quantity}</span>
                  <button
                    className="px-2 text-lg text-midnight/70"
                    onClick={() => setQuantity((q) => q + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="ml-auto text-right">
                <p className="text-xs text-midnight/60">Price</p>
                <p className="text-xl font-semibold text-gold">
                  ${(89 * quantity).toFixed(2)}
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 md:flex-row">
              <Button fullWidth onClick={handleAdd}>
                Add to Cart
              </Button>
              <button className="inline-flex h-12 w-12 items-center justify-center rounded-sm border border-plum/20 text-plum">
                <Heart className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 flex flex-wrap gap-4 text-xs text-midnight/75">
              <span className="rounded-full bg-soft-ivory px-3 py-1">
                Free shipping over $60
              </span>
              <span className="rounded-full bg-soft-ivory px-3 py-1">
                30-day returns
              </span>
              <span className="rounded-full bg-soft-ivory px-3 py-1">
                Cruelty free
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

