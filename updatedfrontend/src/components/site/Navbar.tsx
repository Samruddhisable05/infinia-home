import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { SECTIONS, scrollToSection, useActiveSection } from "./nav";

const IDS = SECTIONS.map((s) => s.id);

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(IDS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-brand-offwhite/85 backdrop-blur-md border-b border-black/5 shadow-[0_4px_24px_-16px_rgba(0,0,0,0.25)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4 lg:px-10">
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("home");
          }}
          className={`flex shrink-0 items-center gap-2 font-heading text-xl font-extrabold tracking-tight transition-colors ${
            scrolled ? "text-brand-slate" : "text-brand-offwhite"
          }`}
        >
          <span className="inline-block h-8 w-8 rounded-md bg-brand-copper shadow-md" />
          Infinia<span className="text-brand-copper">.</span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {SECTIONS.filter((s) => s.id !== "home" || true).map((s) => {
            const isActive = active === s.id;
            return (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(s.id);
                }}
                className={`relative rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                  scrolled
                    ? isActive
                      ? "text-brand-copper"
                      : "text-brand-slate/75 hover:text-brand-copper"
                    : isActive
                      ? "text-brand-sand"
                      : "text-brand-offwhite/80 hover:text-brand-sand"
                }`}
              >
                {s.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    className="absolute inset-x-2.5 -bottom-0.5 h-0.5 rounded-full bg-brand-copper"
                  />
                )}
              </a>
            );
          })}
        </nav>

        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("contact");
          }}
          className="hidden rounded-xl bg-brand-copper px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-brand-copper/90 hover:shadow-lg lg:inline-block"
        >
          Get a Quote
        </a>
      </div>
    </motion.header>
  );
}
