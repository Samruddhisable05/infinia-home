import React from "react";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { FloatingActions } from "@/components/site/FloatingActions";
import { AboutSection } from "@/components/site/sections/AboutSection";
import { ProductsSection } from "@/components/site/sections/ProductsSection";
import { ApplicationsSection } from "@/components/site/sections/ApplicationsSection";
import { ManufacturingSection } from "@/components/site/sections/ManufacturingSection";
import { QualitySection } from "@/components/site/sections/QualitySection";
import { GallerySection } from "@/components/site/sections/GallerySection";
import { FaqSection } from "@/components/site/sections/FaqSection";
import { ContactSection } from "@/components/site/sections/ContactSection";
import { Footer } from "@/components/Footer";

export function HomePage() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <Navbar />
      <main>
        <Hero />
        <AboutSection />
        <ProductsSection />
        <ApplicationsSection />
        <ManufacturingSection />
        <QualitySection />
        <GallerySection />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}

export default HomePage;
