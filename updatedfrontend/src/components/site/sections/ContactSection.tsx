import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Mail, MapPin, Phone, CheckCircle, Loader2 } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { apiClient } from "@/services/apiClient";
import bg from "@/assets/hero/slide-2.jpg";

const details = [
  { icon: Phone, label: "Phone", value: "+91 12345 67890", href: "tel:+911234567890" },
  { icon: Mail, label: "Email", value: "sales@infiniasolution.com", href: "mailto:sales@infiniasolution.com" },
  { icon: MapPin, label: "Plant & Office", value: "Industrial Estate, Ahmedabad, Gujarat, India" },
];

export function ContactSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await apiClient.post("/contact", {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        subject: "Website Contact Form Submission",
      });
      setSubmitted(true);
      setFormData({ name: "", phone: "", email: "", message: "" });
    } catch (err: any) {
      setError(err.message || "Failed to submit enquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      ref={ref}
      id="contact"
      className="relative isolate scroll-mt-20 overflow-hidden py-24 text-brand-offwhite lg:py-32"
    >
      <motion.img
        src={bg}
        alt=""
        aria-hidden="true"
        loading="lazy"
        style={{ y }}
        className="absolute inset-0 -z-20 h-[122%] w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(120deg,color-mix(in_oklab,var(--brand-slate)_90%,transparent),color-mix(in_oklab,black_80%,transparent))]" />

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-3xl font-extrabold sm:text-5xl">
            Build Better with Infinia Solution
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base text-brand-offwhite/80 sm:text-lg">
            Tell us about your project and our team will recommend the right block grade,
            sizes and delivery schedule.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <div className="flex h-full flex-col gap-4">
              {details.map((d) => (
                <div
                  key={d.label}
                  className="flex items-start gap-4 rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-md transition-colors hover:border-brand-sand/50 hover:bg-white/10"
                >
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/20 text-brand-sand">
                    <d.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-brand-sand/70">
                      {d.label}
                    </p>
                    {d.href ? (
                      <a
                        href={d.href}
                        className="font-heading text-base font-bold transition-colors hover:text-brand-sand"
                      >
                        {d.value}
                      </a>
                    ) : (
                      <p className="font-heading text-base font-bold">{d.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="rounded-3xl border border-white/15 bg-white/10 p-8 backdrop-blur-xl">
              {submitted ? (
                <div className="py-12 text-center">
                  <CheckCircle className="mx-auto h-16 w-16 text-emerald-400" />
                  <h3 className="mt-4 font-heading text-2xl font-bold">Enquiry Submitted!</h3>
                  <p className="mt-2 text-sm text-brand-offwhite/80">
                    Thank you for reaching out. Our engineering team will review your requirement and get back to you shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 rounded-xl bg-brand-sand/20 px-6 py-2.5 text-sm font-semibold hover:bg-brand-sand/30"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {error && (
                    <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/20 p-3 text-xs text-red-200">
                      {error}
                    </div>
                  )}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <input
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name"
                      aria-label="Your name"
                      className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-brand-offwhite placeholder:text-brand-offwhite/50 outline-none transition focus:border-brand-sand/70"
                    />
                    <input
                      required
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="Phone number"
                      aria-label="Phone number"
                      className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-brand-offwhite placeholder:text-brand-offwhite/50 outline-none transition focus:border-brand-sand/70"
                    />
                  </div>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Email address"
                    aria-label="Email address"
                    className="mt-4 w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-brand-offwhite placeholder:text-brand-offwhite/50 outline-none transition focus:border-brand-sand/70"
                  />
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your requirement (sizes, quantity, location)"
                    aria-label="Your requirement"
                    className="mt-4 w-full resize-none rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-brand-offwhite placeholder:text-brand-offwhite/50 outline-none transition focus:border-brand-sand/70"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-xl disabled:opacity-50"
                  >
                    {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                    {loading ? "Submitting..." : "Get a Quote"}
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
