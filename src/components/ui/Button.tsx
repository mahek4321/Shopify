import { ButtonHTMLAttributes, ReactNode } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";

type Variant = "primary" | "secondary" | "ghost" | "link";

type ButtonProps = Omit<HTMLMotionProps<"button">, "children"> & {
  variant?: Variant;
  children: ReactNode;
  fullWidth?: boolean;
};

const base =
  "inline-flex items-center justify-center rounded-sm px-8 py-3 text-xs font-semibold uppercase tracking-[0.2em] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 focus-visible:ring-offset-2";

const variants: Record<Variant, string> = {
  primary: "bg-gold text-white hover:bg-[#b36b30]",
  secondary: "border border-plum text-plum hover:bg-plum hover:text-champagne",
  ghost: "border border-white/40 text-white hover:bg-white/10",
  link: "px-0 py-0 text-plum hover:text-gold",
};

export function Button({ variant = "primary", fullWidth, children, className = "", ...props }: ButtonProps) {
  const cls = [base, variants[variant], fullWidth ? "w-full" : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <motion.button whileTap={{ scale: 0.97 }} {...props} className={cls}>
      {children}
    </motion.button>
  );
}
