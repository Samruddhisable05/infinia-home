import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Building2, Factory, Home, Hotel, School, Warehouse } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import bg from "@/assets/hero/slide-3.jpg";

const items = [
  { icon: Home, title: "Residential", text: "Apartments, villas and townships with cooler, quieter interiors." },
  { icon: Building2, title: "Commercial", text: "Offices and retail towers where speed of build matters most." },
  { icon: Factory, title: "Industrial", text: "Plants and factories needing fire-rated, durable partitions." },
  { icon: Hotel, title: "Hospitality", text: "Hotels and resorts demanding superior acoustic comfort." },
  { icon: School, title: "Institutional", text: "Schools, hospitals and campuses built to safety codes." },
  { icon: Warehouse, title: "Infrastructure", text: "Warehouses and logistics parks with large-span walling." },
];

export function ApplicationsSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section
      ref={ref}
      id="applications"
      className="relative isolate scroll-mt-20 overflow-hidden py-24 text-brand-offwhite lg:py-32"
    >
      <motion.img
        src={bg}
        alt=""
        aria-hidden="true"
        loading="lazy"
        style={{ y }}
        className="absolute inset-0 -z-20 h-[124%] w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(160deg,color-mix(in_oklab,var(--brand-slate)_90%,transparent),color-mix(in_oklab,black_80%,transparent))]" />

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-sand">
            Applications
          </span>
          <h2 className="mt-3 font-heading text-3xl font-extrabold sm:text-4xl">
            Trusted across every construction segment
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.08}>
              <div className="group h-full rounded-3xl border border-white/15 bg-white/5 p-7 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-brand-sand/50 hover:bg-white/10">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-brand-slate text-brand-sand transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <a.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-heading text-lg font-bold">{a.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-offwhite/70">{a.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
