import { Reveal } from "@/components/site/Reveal";
import { ClipboardCheck, FlaskConical, Gauge, ScanLine } from "lucide-react";
import qcImage from "@/assets/hero/slide-4.jpg";

const checks = [
  { icon: Gauge, title: "Compressive Strength", text: "Every batch tested to 3–4.5 N/mm² as per IS 2185 (Part 3)." },
  { icon: ScanLine, title: "Dimensional Accuracy", text: "Wire-cut tolerance held within ±1.5 mm across all faces." },
  { icon: FlaskConical, title: "Density Control", text: "Oven-dry density monitored between 550–650 kg/m³." },
  { icon: ClipboardCheck, title: "Batch Traceability", text: "Documented QC records issued with every dispatch." },
];

export function QualitySection() {
  return (
    <section id="quality" className="scroll-mt-20 bg-background py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:px-10">
        <Reveal>
          <img
            src={qcImage}
            alt="Quality control testing of AAC blocks in the Infinia laboratory"
            width={1400}
            height={1000}
            loading="lazy"
            className="aspect-[4/3] w-full rounded-3xl object-cover shadow-[var(--shadow-elevated)]"
          />
        </Reveal>

        <div>
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
              Quality
            </span>
            <h2 className="mt-3 font-heading text-3xl font-extrabold sm:text-4xl">
              Tested, documented, dependable
            </h2>
            <p className="mt-4 text-muted-foreground">
              Our in-house laboratory validates every production batch before it leaves the
              plant, so what arrives on site performs exactly as specified.
            </p>
          </Reveal>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {checks.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.08}>
                <div className="h-full rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-[var(--shadow-elevated)]">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <c.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-heading text-base font-bold">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
