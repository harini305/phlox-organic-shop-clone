"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Keyboard, Navigation } from "swiper/modules";
import "swiper/css";
import CarouselNav from "./CarouselNav";
import CartProductCard from "./CartProductCard";
import SectionHeading from "./SectionHeading";
import styles from "./ProductCarousel.module.css";

// Slides per view / gap per breakpoint (mirrored in CSS for the pre-hydration layout).
const LAYOUTS = {
  default: {
    0: { slidesPerView: 1.25, spaceBetween: 16 },
    560: { slidesPerView: 2, spaceBetween: 20 },
    768: { slidesPerView: 3, spaceBetween: 24 },
    1025: { slidesPerView: 4, spaceBetween: 30 },
    1280: { slidesPerView: 5, spaceBetween: 33 },
  },
  compact: {
    0: { slidesPerView: 1.25, spaceBetween: 12 },
    560: { slidesPerView: 2, spaceBetween: 12 },
    768: { slidesPerView: 3, spaceBetween: 10 },
    1025: { slidesPerView: 4, spaceBetween: 10 },
    1280: { slidesPerView: 5.15, spaceBetween: 10 },
  },
};

/**
 * Section heading row (eyebrow + title, gradient rule, arrows) above a
 * Swiper product carousel.
 * layout: "default" (New Products) | "compact" (Featured — tighter gap, next card peeking)
 */
export default function ProductCarousel({ eyebrow, title, products, layout = "default", headingId }) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className={`${styles.carousel} ${styles[layout]}`}>
      <div className={styles.header} data-reveal>
        <SectionHeading eyebrow={eyebrow} title={title} align="left" className={styles.heading} id={headingId} />
        <span className={styles.rule} aria-hidden="true" />
        <CarouselNav label="products" prevRef={prevRef} nextRef={nextRef} className={styles.nav} />
      </div>

      <div data-reveal>
        <Swiper
          modules={[Navigation, A11y, Keyboard]}
          breakpoints={LAYOUTS[layout]}
          rewind
          keyboard={{ enabled: true, onlyInViewport: true }}
          watchSlidesProgress
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          navigation={{ prevEl: null, nextEl: null }}
          a11y={{
            containerMessage: `${title} carousel`,
            prevSlideMessage: "Previous products",
            nextSlideMessage: "Next products",
            slideRole: "group",
          }}
          className={styles.swiper}
        >
          {products.map((product) => (
            <SwiperSlide key={product.id} className={styles.slide}>
              <CartProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
