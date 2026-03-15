"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Heart, Menu, Search, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/components/cart/CartContext";
import { useCartStore } from "@/store/useCartStore";

const navLinks = [
  { href: "/collections/all", label: "Shop All" },
  { href: "/collections/serums", label: "Serums" },
  { href: "/collections/moisturisers", label: "Moisturisers" },
  { href: "/collections/treatments", label: "Treatments" },
  { href: "/collections/gift-sets", label: "Gift Sets" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalQuantity, toggleCart } = useCart();
  const wishlistCount = useCartStore((s) => s.wishlistCount());

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 border-b border-plum/10 bg-ivory/95 backdrop-blur-md transition-all duration-300 ${
          isScrolled ? "py-3 shadow-soft" : "py-4"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
          {/* Mobile hamburger */}
          <button
            className="flex items-center md:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation"
          >
            <Menu className="h-5 w-5 text-plum" />
          </button>

          {/* Logo */}
          <Link href="/" className="flex-1 text-center md:flex-none md:text-left">
            <span className="font-heading text-lg tracking-[0.6em] text-plum">LUMINA</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden flex-1 items-center justify-center gap-8 text-[12px] font-medium tracking-[0.18em] text-midnight md:flex">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="group relative pb-1 uppercase hover:text-plum transition-colors">
                {link.label}
                <span className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-gold transition-transform duration-200 group-hover:scale-x-100" />
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex flex-1 items-center justify-end gap-4 text-plum">
            <button aria-label="Search" className="hover:text-midnight transition-colors">
              <Search className="h-5 w-5" />
            </button>
            <Link href="/wishlist" aria-label="Wishlist" className="relative hover:text-midnight transition-colors">
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-gold px-1 text-[10px] font-semibold text-white">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <button onClick={toggleCart} className="relative hover:text-midnight transition-colors" aria-label="Open cart">
              <ShoppingBag className="h-5 w-5" />
              {totalQuantity > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-gold px-1 text-[10px] font-semibold text-white">
                  {totalQuantity}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-midnight/50 backdrop-blur-sm" onClick={() => setMobileOpen(false)}>
          <div
            className="absolute left-0 top-0 h-full w-72 bg-ivory shadow-soft"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-plum/10 px-5 py-4">
              <span className="font-heading text-lg tracking-[0.6em] text-plum">LUMINA</span>
              <button onClick={() => setMobileOpen(false)} aria-label="Close navigation">
                <X className="h-5 w-5 text-plum" />
              </button>
            </div>
            <nav className="px-5 py-4">
              {navLinks.map((link, i) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block border-b border-plum/8 py-3.5 text-[13px] font-medium uppercase tracking-[0.18em] text-midnight hover:text-plum transition-colors"
                  onClick={() => setMobileOpen(false)}
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
