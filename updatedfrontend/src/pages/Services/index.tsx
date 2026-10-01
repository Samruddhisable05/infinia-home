import React from "react";
import { Navbar } from "@/components/site/Navbar";
import { ProductsSection } from "@/components/site/sections/ProductsSection";
import { ApplicationsSection } from "@/components/site/sections/ApplicationsSection";
import { Footer } from "@/components/Footer";

export function ServicesPage() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground pt-20">
      <Navbar />
      <main>
        <ProductsSection />
        <ApplicationsSection />
      </main>
      <Footer />
    </div>
  );
}

export default ServicesPage;
