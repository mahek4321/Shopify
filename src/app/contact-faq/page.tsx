"use client";

import { useState } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { faqs } from "@/lib/data";

const categories = ["Shipping", "Returns", "Products", "Subscriptions"] as const;
type Category = typeof categories[number];

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  orderNumber: z.string().optional(),
  message: z.string().min(20, "Message must be at least 20 characters"),
});
type ContactForm = z.infer<typeof contactSchema>;

export default function ContactFaqPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("Shipping");

  const filtered = faqs.filter((f) => f.category === activeCategory);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 700));
    toast.success("Message sent! We'll reply within 24 hours.");
    reset();
  };

  return (
    <div className="bg-ivory pb-20 pt-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="md:grid md:grid-cols-[1.4fr,1fr] md:gap-16">

          {/* FAQ */}
          <section>
            <h1 className="font-heading text-[36px] text-midnight md:text-[44px]">Frequently Asked</h1>
            <p className="mt-3 text-sm text-midnight/60">Quick answers to common questions.</p>

            {/* Category tabs */}
            <div className="mt-8 flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-[0.15em] transition ${
                    activeCategory === cat
                      ? "bg-plum text-champagne"
                      : "border border-plum/20 text-midnight hover:bg-soft-ivory"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Accordion */}
            <Accordion.Root type="single" collapsible className="mt-6 divide-y divide-plum/8 border-y border-plum/8">
              {filtered.map((faq, i) => (
                <Accordion.Item key={i} value={`item-${i}`}>
                  <Accordion.Trigger className="group flex w-full items-center justify-between py-4 text-left text-[14px] font-medium text-midnight transition hover:text-plum [&[data-state=open]>svg]:rotate-180">
                    {faq.question}
                    <ChevronDown className="h-4 w-4 flex-shrink-0 text-plum/50 transition-transform duration-200" />
                  </Accordion.Trigger>
                  <Accordion.Content className="overflow-hidden text-[13px] leading-[1.7] text-midnight/65 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down pb-4">
                    {faq.answer}
                  </Accordion.Content>
                </Accordion.Item>
              ))}
            </Accordion.Root>
          </section>

          {/* Contact Form */}
          <section className="mt-14 md:mt-0">
            <h2 className="font-heading text-[32px] text-midnight">Get in Touch</h2>
            <p className="mt-2 text-sm text-midnight/60">We respond within 24 hours.</p>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
              <div>
                <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.15em] text-plum">Name</label>
                <input
                  {...register("name")}
                  className="h-11 w-full rounded-sm border border-[#D0C4B8] bg-white px-3 text-sm text-midnight focus:border-gold focus:outline-none"
                  placeholder="Your name"
                />
                {errors.name && <p className="mt-1 text-xs text-[#8B1A1A]">{errors.name.message}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.15em] text-plum">Email</label>
                <input
                  {...register("email")}
                  type="email"
                  className="h-11 w-full rounded-sm border border-[#D0C4B8] bg-white px-3 text-sm text-midnight focus:border-gold focus:outline-none"
                  placeholder="you@example.com"
                />
                {errors.email && <p className="mt-1 text-xs text-[#8B1A1A]">{errors.email.message}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.15em] text-plum">Order Number <span className="normal-case font-normal text-midnight/40">(Optional)</span></label>
                <input
                  {...register("orderNumber")}
                  className="h-11 w-full rounded-sm border border-[#D0C4B8] bg-white px-3 text-sm text-midnight focus:border-gold focus:outline-none"
                  placeholder="Optional"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.15em] text-plum">Message</label>
                <textarea
                  {...register("message")}
                  className="min-h-[140px] w-full rounded-sm border border-[#D0C4B8] bg-white px-3 py-2.5 text-sm text-midnight focus:border-gold focus:outline-none resize-none"
                  placeholder="How can we help?"
                />
                {errors.message && <p className="mt-1 text-xs text-[#8B1A1A]">{errors.message.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-sm bg-gold py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-white hover:bg-[#b36b30] transition disabled:opacity-70"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}
