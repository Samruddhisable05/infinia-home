import {
  BadgeCheck,
  Beaker,
  Boxes,
  Factory,
  Layers,
  Package,
  Scissors,
} from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import factoryInterior from "@/assets/about/factory-interior.jpg";

const steps = [
  { icon: Boxes, title: "Raw Materials", text: "Fly ash, lime, cement, gypsum and aluminium powder are batched by weight." },
  { icon: Beaker, title: "Mixing", text: "High-shear mixing forms a uniform slurry with controlled consistency." },
  { icon: Layers, title: "Casting", text: "Slurry is poured into moulds where it aerates and rises into a green cake." },
  { icon: Scissors, title: "Cutting", text: "Precision wire cutting delivers exact dimensions with minimal waste." },
  { icon: Factory, title: "Autoclaving", text: "High-pressure steam curing at 190°C develops final strength." },
  { icon: BadgeCheck, title: "Quality Testing", text: "Density, dimension and compressive strength tests on every batch." },
  { icon: Package, title: "Packaging", text: "Shrink-wrapped, palletised and dispatched damage-free to site." },
];

export function ManufacturingSection() {
  return (
    <section
      id="manufacturing"
      className="relative scroll-mt-20 overflow-hidden bg-brand-slate py-20 text-brand-offwhite lg:py-28"
    >
      <div className="pointer-events-none absolute inset-0 opacity-15">
        <img
          src={factoryInterior}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-sand">
            Manufacturing Excellence
          </span>
          <h2 className="mt-3 font-heading text-3xl font-extrabold sm:text-4xl">
            From raw material to palletised perfection
          </h2>
        </Reveal>

        <div className="relative mt-14">
          <div className="absolute left-0 right-0 top-7 hidden h-px bg-white/20 lg:block" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-7 lg:gap-4">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.07}>
                <div className="group relative h-full rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-brand-sand/50 hover:bg-white/10">
                  <span className="relative z-10 inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-brand-slate text-brand-sand transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <s.icon className="h-6 w-6" />
                  </span>
                  <p className="mt-4 text-[11px] font-semibold uppercase tracking-widest text-brand-sand/70">
                    Step {i + 1}
                  </p>
                  <h3 className="mt-1 font-heading text-base font-bold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-offwhite/70">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
