import Image from "next/image";
import StarRating from "./StarRating";
import styles from "./TestimonialCard.module.css";

/** Customer quote card with an overlapping round avatar and quote bubble. */
export default function TestimonialCard({ testimonial }) {
  const { name, role, avatar, rating, quote } = testimonial;

  return (
    <figure className={styles.card}>
      <div className={styles.avatarWrap}>
        <Image src={avatar} alt={`Portrait of ${name}`} width={113} height={113} className={styles.avatar} />
        <span className={styles.quoteMark} aria-hidden="true">
          <Image src="/images/icons/quote.svg" alt="" width={16} height={12} unoptimized />
        </span>
      </div>

      <blockquote className={styles.quote}>
        <p>{quote}</p>
      </blockquote>

      <figcaption className={styles.caption}>
        <span className={styles.name}>{name}</span>
        <span className={styles.role}>{role}</span>
        <StarRating value={rating} color="primary" className={styles.rating} />
      </figcaption>
    </figure>
  );
}
