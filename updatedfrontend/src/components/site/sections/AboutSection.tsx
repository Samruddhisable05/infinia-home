import { motion } from "motion/react";
import { Compass, Target } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { Counter } from "@/components/site/Counter";
import factoryInterior from "@/assets/about/factory-interior.jpg";

const stats = [
  { value: 350, suffix: "K m³", label: "Annual Production Capacity" },
  { value: 1200, suffix: "+", label: "Projects Delivered" },
  { value: 100, suffix: "%", label: "Quality Assurance" },
  { value: 98.5, suffix: "%", label: "Customer Satisfaction", decimals: 1 },
];

export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-20 bg-background">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
              About Us
            </span>
            <h2 className="mt-3 font-heading text-3xl font-extrabold sm:text-4xl">
              Building strong foundations with innovation
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              At Infinia Solution, we manufacture world-class AAC Blocks using advanced
              production technology and stringent quality standards. Our products provide
              superior strength, thermal insulation, fire resistance, and long-lasting
              durability while promoting sustainable construction.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              With a commitment to innovation, precision manufacturing, and customer
              satisfaction, we help builders, architects, contractors, and developers create
              stronger, safer, and more energy-efficient structures. Every block undergoes
              rigorous quality checks to ensure consistent dimensions, high compressive
              strength, and excellent performance on every project.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="relative">
              <div className="absolute -inset-3 -z-10 rounded-3xl bg-secondary/50 blur-sm" />
              <img
                src={factoryInterior}
                alt="Interior of the Infinia Solution AAC block production line"
                width={1600}
                height={1100}
                loading="lazy"
                className="aspect-[4/3] w-full rounded-3xl object-cover shadow-[var(--shadow-elevated)]"
              />
              <div className="absolute -bottom-6 left-6 rounded-2xl border border-white/40 bg-card/80 px-6 py-4 shadow-lg backdrop-blur-xl">
                <p className="font-heading text-2xl font-extrabold text-primary">15+</p>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Years of expertise
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Mission & Vision */}
        <div className="mt-24 grid gap-8 md:grid-cols-2">
          {[
            {
              icon: Target,
              title: "Our Mission",
              text: "To deliver precision-manufactured AAC Blocks that raise the standard of construction — combining strength, sustainability and speed on every site we serve.",
            },
            {
              icon: Compass,
              title: "Our Vision",
              text: "To be the most trusted AAC brand for architects and developers, driving a nationwide shift towards lightweight, energy-efficient and eco-conscious building materials.",
            },
          ].map((c, i) => (
            <Reveal key={c.title} delay={i * 0.12}>
              <motion.article
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className="h-full rounded-3xl border border-white/50 bg-card/70 p-8 shadow-[0_18px_50px_-30px_rgba(0,0,0,0.45)] backdrop-blur-xl"
              >
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <c.icon className="h-7 w-7" />
                </span>
                <h3 className="mt-5 font-heading text-2xl font-bold">{c.title}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{c.text}</p>
              </motion.article>
            </Reveal>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1}>
              <div className="rounded-3xl border border-border bg-card p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-elevated)]">
                <p className="font-heading text-4xl font-extrabold text-primary sm:text-5xl">
                  <Counter value={s.value} suffix={s.suffix} decimals={s.decimals ?? 0} />
                </p>
                <p className="mt-3 text-sm font-medium uppercase tracking-wider text-muted-foreground">
                  {s.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
