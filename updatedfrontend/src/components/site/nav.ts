import { useEffect, useState } from "react";

export const SECTIONS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About Us" },
  { id: "products", label: "Products" },
  { id: "applications", label: "Applications" },
  { id: "manufacturing", label: "Manufacturing" },
  { id: "quality", label: "Quality" },
  { id: "gallery", label: "Gallery" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Contact" },
] as const;

export type SectionId = (typeof SECTIONS)[number]["id"];

/** Smoothly scrolls to a section, accounting for the fixed header. */
export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 72;
  window.scrollTo({ top: id === "home" ? 0 : top, behavior: "smooth" });
  if (window.history?.replaceState) {
    window.history.replaceState(null, "", `#${id}`);
  }
}

/** Scroll-spy: returns the id of the section currently in view. */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string>(ids[0]);

  useEffect(() => {
    let frame = 0;
    const compute = () => {
      frame = 0;
      const marker = window.scrollY + window.innerHeight * 0.32;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= marker) current = id;
      }
      // Snap to the last section when at the bottom of the page.
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 8) {
        current = ids[ids.length - 1];
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [ids]);

  return active;
}
