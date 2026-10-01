import { Reveal } from "@/components/site/Reveal";
import s1 from "@/assets/hero/slide-1.jpg";
import s2 from "@/assets/hero/slide-2.jpg";
import s3 from "@/assets/hero/slide-3.jpg";
import s4 from "@/assets/hero/slide-4.jpg";
import s5 from "@/assets/hero/slide-5.jpg";
import s6 from "@/assets/hero/slide-6.jpg";
import factoryInterior from "@/assets/about/factory-interior.jpg";
import aboutHero from "@/assets/about/about-hero.jpg";

const images = [
  { src: s1, alt: "AAC block production line in operation", span: "lg:col-span-2 lg:row-span-2" },
  { src: s2, alt: "Autoclave curing chamber at the Infinia plant", span: "" },
  { src: s3, alt: "Modern construction project built with AAC blocks", span: "" },
  { src: factoryInterior, alt: "Interior view of the manufacturing facility", span: "" },
  { src: s4, alt: "Quality laboratory testing AAC block samples", span: "" },
  { src: s5, alt: "Palletised AAC blocks ready for dispatch", span: "lg:col-span-2" },
  { src: s6, alt: "Close-up texture of a precision-cut AAC block", span: "" },
  { src: aboutHero, alt: "Infinia Solution manufacturing plant exterior", span: "" },
];

export function GallerySection() {
  return (
    <section id="gallery" className="scroll-mt-20 bg-muted/40 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
            Gallery
          </span>
          <h2 className="mt-3 font-heading text-3xl font-extrabold sm:text-4xl">
            Inside our plant and on site
          </h2>
        </Reveal>

        <div className="mt-12 grid auto-rows-[200px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {images.map((img, i) => (
            <Reveal key={img.alt} delay={(i % 4) * 0.08} className={`${img.span} h-full`}>
              <figure className="group h-full overflow-hidden rounded-2xl shadow-sm">
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
