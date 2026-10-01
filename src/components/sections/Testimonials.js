import SectionHeading from "@/components/ui/SectionHeading";
import TestimonialCarousel from "@/components/ui/TestimonialCarousel";
import { testimonials } from "@/data/testimonials";
import styles from "./Testimonials.module.css";

export default function Testimonials() {
  return (
    <section className={styles.section} aria-labelledby="testimonials-heading">
      <div className="container">
        <SectionHeading
          eyebrow="Testimonial"
          title="Our Client Say"
          tone="green"
          id="testimonials-heading"
          className={styles.heading}
          data-reveal
        />
        <div data-reveal>
          <TestimonialCarousel testimonials={testimonials} />
        </div>
      </div>
    </section>
  );
}
