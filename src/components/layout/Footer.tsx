import Link from "next/link";
import { Instagram, Facebook, Youtube, Music2 } from "lucide-react";

const columns = [
  {
    title: "Shop",
    links: [
      { label: "Shop All", href: "/collections/all" },
      { label: "Serums", href: "/collections/serums" },
      { label: "Moisturisers", href: "/collections/moisturisers" },
      { label: "Treatments", href: "/collections/treatments" },
      { label: "Gift Sets", href: "/collections/gift-sets" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Shipping", href: "/contact-faq" },
      { label: "Returns", href: "/contact-faq" },
      { label: "FAQ", href: "/contact-faq" },
      { label: "Contact", href: "/contact-faq" },
    ],
  },
  {
    title: "Brand",
    links: [
      { label: "Our Story", href: "/about" },
      { label: "Ingredients", href: "/about" },
      { label: "Sustainability", href: "/about" },
      { label: "Press", href: "/about" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-16 bg-midnight text-ivory">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="text-center">
          <Link href="/" className="font-heading text-xl tracking-[0.7em] text-champagne hover:text-gold transition">
            LUMINA
          </Link>
        </div>

        <div className="mt-10 grid gap-10 text-sm text-ivory/80 md:grid-cols-4">
          {columns.map((col) => (
            <div key={col.title}>
              <p className="eyebrow mb-3 text-champagne/90">{col.title}</p>
              <ul className="space-y-2 text-[13px]">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="hover:text-champagne transition">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <p className="eyebrow mb-3 text-champagne/90">Follow</p>
            <div className="flex gap-3">
              {[Instagram, Music2, Facebook, Youtube].map((Icon, i) => (
                <button
                  key={i}
                  className="flex h-9 w-9 items-center justify-center rounded-sm border border-white/20 text-ivory hover:bg-white/10 transition"
                  aria-label="Social link"
                >
                  <Icon className="h-4 w-4" />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-[11px] text-ivory/60">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p>© {new Date().getFullYear()} Lumina Skincare. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="/contact-faq" className="hover:text-champagne">Shipping Policy</Link>
              <Link href="/contact-faq" className="hover:text-champagne">Privacy Policy</Link>
              <Link href="/contact-faq" className="hover:text-champagne">Terms</Link>
            </div>
            <div className="flex gap-2 text-[10px]">
              {["Visa", "Mastercard", "PayPal", "Apple Pay", "Shop Pay"].map((p) => (
                <span key={p} className="rounded border border-white/10 px-1.5 py-0.5">{p}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
