import { Reveal } from "@/components/site/Reveal";
import { Award, Feather, Flame, Leaf, Ruler, ShieldCheck, Thermometer, Volume2 } from "lucide-react";
import product from "@/assets/hero/slide-6.jpg";

const products = [
  { size: "600 × 200 × 100 mm", use: "Internal partition walls" },
  { size: "600 × 200 × 150 mm", use: "Partition & infill walls" },
  { size: "600 × 200 × 200 mm", use: "External load-bearing walls" },
  { size: "600 × 200 × 225 mm", use: "Thermal envelope walls" },
  { size: "600 × 200 × 230 mm", use: "High-insulation façades" },
  { size: "Custom sizes", use: "Project-specific requirements" },
];

const features = [
  { icon: Award, title: "Premium Quality", text: "Consistently graded blocks produced under ISO-aligned quality systems." },
  { icon: Feather, title: "Lightweight", text: "Up to 70% lighter than red clay bricks, cutting dead load and cost." },
  { icon: ShieldCheck, title: "High Strength", text: "Excellent compressive strength for load-bearing and infill walls." },
  { icon: Flame, title: "Fire Resistant", text: "Non-combustible composition with up to 4 hours fire rating." },
  { icon: Thermometer, title: "Thermal Insulation", text: "Low thermal conductivity keeps interiors cooler and bills lower." },
  { icon: Volume2, title: "Sound Insulation", text: "Porous cellular structure absorbs noise for quieter interiors." },
  { icon: Leaf, title: "Eco-Friendly", text: "Fly-ash based, low-waste manufacturing with reduced carbon footprint." },
  { icon: Ruler, title: "Precision Dimensions", text: "Wire-cut accuracy within ±1.5 mm for faster thin-bed masonry." },
];

export function ProductsSection() {
  return (
    <section id="products" className="scroll-mt-20 bg-muted/40 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
            Products
          </span>
          <h2 className="mt-3 font-heading text-3xl font-extrabold sm:text-4xl">
            AAC blocks engineered for every wall
          </h2>
          <p className="mt-4 text-muted-foreground">
            A complete size range in autoclaved aerated concrete, plus jointing mortar and
            accessories for a complete wall system.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div className="grid gap-4 sm:grid-cols-2">
            {products.map((p, i) => (
              <Reveal key={p.size} delay={i * 0.06}>
                <div className="group h-full rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-[var(--shadow-elevated)]">
                  <p className="font-heading text-lg font-bold text-brand-slate">{p.size}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{p.use}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.12}>
            <img
              src={product}
              alt="Stacked precision-cut Infinia AAC blocks"
              width={1400}
              height={1000}
              loading="lazy"
              className="aspect-[4/3] w-full rounded-3xl object-cover shadow-[var(--shadow-elevated)]"
            />
          </Reveal>
        </div>

        <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.06}>
              <div className="group h-full rounded-3xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-primary/40 hover:shadow-[var(--shadow-elevated)]">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <f.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-heading text-base font-bold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
