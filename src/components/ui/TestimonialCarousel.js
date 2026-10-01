"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Keyboard, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar";
import TestimonialCard from "./TestimonialCard";
import styles from "./TestimonialCarousel.module.css";

const BREAKPOINTS = {
  0: { slidesPerView: 1.1, spaceBetween: 16 },
  600: { slidesPerView: 2, spaceBetween: 24 },
  1025: { slidesPerView: 3, spaceBetween: 32 },
  1280: { slidesPerView: 4, spaceBetween: 32 },
};

/** Testimonial slider with the reference's draggable scrollbar indicator. */
export default function TestimonialCarousel({ testimonials }) {
  return (
    <Swiper
      modules={[Scrollbar, A11y, Keyboard]}
      breakpoints={BREAKPOINTS}
      scrollbar={{ draggable: true, hide: false }}
      keyboard={{ enabled: true, onlyInViewport: true }}
      a11y={{ containerMessage: "Customer testimonials", slideRole: "group" }}
      className={styles.swiper}
    >
      {testimonials.map((t) => (
        <SwiperSlide key={t.id} className={styles.slide}>
          <TestimonialCard testimonial={t} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
