import React from "react";

export function Footer() {
  return (
    <footer className="bg-brand-slate py-8 text-center text-sm text-brand-offwhite/70">
      © {new Date().getFullYear()} Infinia. All rights reserved. Smart Solar & Sustainable Engineering Solutions.
    </footer>
  );
}
