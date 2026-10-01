import React from "react";
import { Navbar } from "@/components/site/Navbar";
import { ContactSection } from "@/components/site/sections/ContactSection";
import { Footer } from "@/components/Footer";

export function ContactPage() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground pt-20">
      <Navbar />
      <main>
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default ContactPage;
