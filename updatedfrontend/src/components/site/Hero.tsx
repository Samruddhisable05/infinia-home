import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "motion/react";
import { scrollToSection } from "@/components/site/nav";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Download } from "lucide-react";
import slide1 from "@/assets/hero/slide-1.jpg";
import slide2 from "@/assets/hero/slide-2.jpg";
import slide3 from "@/assets/hero/slide-3.jpg";
import slide4 from "@/assets/hero/slide-4.jpg";
import slide5 from "@/assets/hero/slide-5.jpg";
import slide6 from "@/assets/hero/slide-6.jpg";

const SLIDES = [slide1, slide2, slide3, slide4, slide5, slide6];
const SLIDE_INTERVAL = 5000;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    SLIDES.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, SLIDE_INTERVAL);
    return () => clearInterval(id);
  }, []);

  // Scroll parallax
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yScroll = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const scaleScroll = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.55, 0.85]);

  // Mouse parallax (smoothed)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 60, damping: 20, mass: 0.6 });
  const smy = useSpring(my, { stiffness: 60, damping: 20, mass: 0.6 });
  const imgX = useTransform(smx, (v) => v * -20);
  const imgY = useTransform(smy, (v) => v * -20);
  const midX = useTransform(smx, (v) => v * -40);
  const midY = useTransform(smy, (v) => v * -40);
  const glowX = useTransform(smx, (v) => v * 60);
  const glowY = useTransform(smy, (v) => v * 60);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      mx.set((e.clientX / w) * 2 - 1);
      my.set((e.clientY / h) * 2 - 1);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  // Floating dust particles — deterministic seed for SSR stability
  const particles = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => {
        const seed = (i + 1) * 9301;
        const rnd = (n: number) => ((Math.sin(seed * n) + 1) / 2);
        return {
          left: rnd(1.3) * 100,
          top: rnd(2.7) * 100,
          size: 2 + rnd(3.1) * 5,
          delay: rnd(4.4) * 8,
          duration: 14 + rnd(5.8) * 18,
          drift: -30 + rnd(7.9) * 60,
          opacity: 0.18 + rnd(11.2) * 0.35,
        };
      }),
    [],
  );

  return (
    <section
      ref={ref}
      id="home"
      className="relative isolate min-h-[100svh] w-full overflow-hidden"
    >
      {/* Background image slider — auto-transition with smooth fade */}
      <motion.div
        style={{ y: yScroll, scale: scaleScroll, x: imgX, translateY: imgY }}
        className="absolute inset-0 -z-30 h-[118%] w-[108%] -left-[4%] -top-[3%] will-change-transform"
      >
        <AnimatePresence mode="sync">
          <motion.img
            key={index}
            src={SLIDES[index]}
            alt="Infinia smart solar and building engineering imagery"
            width={1920}
            height={1200}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ opacity: { duration: 1.6, ease: "easeInOut" }, scale: { duration: 6, ease: "easeOut" } }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>
      </motion.div>

      {/* Warm copper light-beam that drifts with the cursor */}
      <motion.div
        aria-hidden
        style={{ x: glowX, y: glowY }}
        className="absolute -z-20 top-[-20%] left-[10%] h-[80%] w-[60%] rounded-full blur-3xl opacity-60"
      >
        <div
          className="h-full w-full"
          style={{
            background:
              "radial-gradient(closest-side, color-mix(in oklab, var(--brand-copper) 55%, transparent), transparent 70%)",
          }}
        />
      </motion.div>
      <motion.div
        aria-hidden
        style={{ x: midX, y: midY }}
        className="absolute -z-20 bottom-[-20%] right-[-10%] h-[70%] w-[55%] rounded-full blur-3xl opacity-40"
      >
        <div
          className="h-full w-full"
          style={{
            background:
              "radial-gradient(closest-side, color-mix(in oklab, var(--brand-sand) 60%, transparent), transparent 70%)",
          }}
        />
      </motion.div>

      {/* Floating dust particles */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {particles.map((p, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-brand-sand/70 blur-[1px]"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: p.size,
              height: p.size,
              opacity: p.opacity,
            }}
            animate={{
              y: [0, -80, -160],
              x: [0, p.drift, 0],
              opacity: [0, p.opacity, 0],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Dark gradient overlay (opacity intensifies as you scroll) */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={{ background: "var(--gradient-hero)", opacity: overlayOpacity }}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/55 via-transparent to-black/30" />

      {/* Subtle film grain for realism */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.08] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.9'/></svg>\")",
        }}
      />



      <div className="mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-6 pt-32 pb-24 lg:px-10">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex w-fit items-center gap-2 rounded-full border border-brand-sand/30 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-brand-sand backdrop-blur"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-brand-copper" />
          Smart Solar & Sustainable Engineering Solutions
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mt-6 max-w-4xl font-heading text-5xl font-extrabold leading-[1.05] text-brand-offwhite sm:text-6xl lg:text-7xl"
        >
          Building the Future with{" "}
          <span className="text-brand-copper">Smart Solar Efficiency</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-brand-offwhite/85 sm:text-lg"
        >
          Infinia delivers smart solar energy efficiency, high-performance sustainable engineering, and eco-friendly solutions for residential, commercial, and industrial infrastructure.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("contact");
            }}
            className="group inline-flex items-center gap-2 rounded-md bg-brand-copper px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-black/30 transition-all hover:-translate-y-0.5 hover:bg-brand-copper/90 hover:shadow-xl"
          >
            Get a Quote
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#products"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("products");
            }}
            className="group inline-flex items-center gap-2 rounded-md border border-brand-offwhite/40 bg-white/5 px-7 py-3.5 text-sm font-semibold text-brand-offwhite backdrop-blur transition-all hover:-translate-y-0.5 hover:border-brand-sand hover:bg-white/10"
          >
            <Download className="h-4 w-4" />
            Download Brochure
          </a>

        </motion.div>

        {/* Stats strip */}
        <motion.dl
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.75 }}
          className="mt-20 grid max-w-3xl grid-cols-2 gap-8 border-t border-white/15 pt-8 sm:grid-cols-4"
        >
          {[
            ["500K+", "m³ Delivered"],
            ["1200+", "Projects"],
            ["25%", "Lighter Walls"],
            ["ISO", "Certified"],
          ].map(([v, l]) => (
            <div key={l}>
              <dt className="font-heading text-3xl font-bold text-brand-sand">{v}</dt>
              <dd className="mt-1 text-xs uppercase tracking-widest text-brand-offwhite/70">
                {l}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
