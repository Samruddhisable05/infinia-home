import React from "react";
import { Navbar } from "@/components/site/Navbar";
import { AboutSection } from "@/components/site/sections/AboutSection";
import { QualitySection } from "@/components/site/sections/QualitySection";
import { Footer } from "@/components/Footer";

export function AboutPage() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground pt-20">
      <Navbar />
      <main>
        <AboutSection />
        <QualitySection />
      </main>
      <Footer />
    </div>
  );
}

export default AboutPage;
