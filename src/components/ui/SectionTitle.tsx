import { ReactNode } from "react";
import { motion } from "framer-motion";

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  childrenBelow?: ReactNode;
};

export function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = "center",
  childrenBelow,
}: Props) {
  const alignment = align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20% 0px" }}
      transition={{ duration: 0.6 }}
      className={`flex flex-col gap-3 ${alignment}`}
    >
      {eyebrow && <p className="eyebrow text-gold">{eyebrow}</p>}
      <h2 className="font-heading text-3xl text-plum md:text-4xl lg:text-5xl">{title}</h2>
      {subtitle && (
        <p className="max-w-xl text-sm text-midnight/70 md:text-base">{subtitle}</p>
      )}
      {childrenBelow}
    </motion.div>
  );
}

