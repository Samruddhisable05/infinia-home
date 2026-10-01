import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";

const faqs = [
  {
    q: "What are AAC blocks made of?",
    a: "AAC blocks are made from fly ash, cement, lime, gypsum, water and a small amount of aluminium powder, which aerates the mix before it is steam-cured under high pressure in an autoclave.",
  },
  {
    q: "How much lighter are AAC blocks than red bricks?",
    a: "AAC blocks are roughly 70% lighter by volume, which reduces structural dead load, steel and cement consumption, and speeds up construction.",
  },
  {
    q: "Are AAC blocks fire resistant?",
    a: "Yes. The mineral, non-combustible composition provides a fire rating of up to 4 hours depending on wall thickness.",
  },
  {
    q: "Do AAC blocks help reduce energy bills?",
    a: "Their low thermal conductivity keeps interiors cooler in summer and warmer in winter, typically reducing air-conditioning loads by up to 30%.",
  },
  {
    q: "What is the minimum order quantity and delivery time?",
    a: "We supply from a single truckload upwards. Standard dispatch is within 3–5 working days depending on size mix and destination.",
  },
  {
    q: "Do you provide jointing mortar and technical support?",
    a: "Yes. We supply thin-bed jointing mortar and our technical team assists with block layout, wastage estimation and site training.",
  },
];

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-20 bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-4xl px-6 lg:px-10">
        <Reveal className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
            FAQ
          </span>
          <h2 className="mt-3 font-heading text-3xl font-extrabold sm:text-4xl">
            Frequently asked questions
          </h2>
        </Reveal>

        <div className="mt-12 space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 0.05}>
                <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-heading text-base font-bold transition-colors hover:text-primary"
                  >
                    {f.q}
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-primary transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: "easeInOut" }}
                      >
                        <p className="px-6 pb-6 text-sm leading-relaxed text-muted-foreground">
                          {f.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
