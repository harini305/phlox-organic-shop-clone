import Image from "next/image";
import Badge from "./Badge";
import Button from "./Button";
import styles from "./PromoBanner.module.css";

/**
 * Rounded promotional banner: background photo, discount badge, small
 * subtitle, large title, optional description, CTA and an optional sticker
 * image (e.g. "100% ECO"). Used for the hero and every promo pair.
 *
 * background: image src (public path)
 * badge:      { text, variant: "circle" | "tag", color?: "hot" | "accent" }
 * title / highlight: `highlight` is a substring of `title` drawn in the accent color
 * cta:        { label, href, variant?, size? }
 * sticker:    { src, alt, width, height, position?: "top-right" | "bottom-right" | "bottom-left" }
 * theme:      "light" (white text over a dark photo) | "dark" (dark text over a light photo)
 * size:       "md" | "lg" (hero)
 * The background layer carries `data-parallax` for the GSAP Parallax wrapper added later.
 */
export default function PromoBanner({
  background,
  backgroundAlt = "",
  badge,
  subtitle,
  title,
  highlight,
  description,
  cta,
  sticker,
  theme = "light",
  size = "md",
  align = "left",
  priority = false,
  as: TitleTag = "h2",
  className = "",
}) {
  const classes = [styles.banner, styles[theme], styles[size], styles[align], className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes}>
      {background && (
        <div className={styles.bg} data-parallax>
          <Image
            src={background}
            alt={backgroundAlt}
            fill
            priority={priority}
            sizes={size === "lg" ? "(max-width: 1024px) 100vw, 66vw" : "(max-width: 1024px) 100vw, 50vw"}
            className={styles.bgImage}
          />
        </div>
      )}

      <div className={styles.content}>
        {badge && (
          <Badge variant={badge.variant ?? "circle"} color={badge.color} className={styles.badge}>
            {badge.text}
          </Badge>
        )}

        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}

        <TitleTag className={styles.title}>{renderTitle(title, highlight)}</TitleTag>

        {description && <p className={styles.description}>{description}</p>}

        {cta && (
          <Button
            href={cta.href}
            variant={cta.variant ?? "hot"}
            size={cta.size ?? "md"}
            className={styles.cta}
          >
            {cta.label}
          </Button>
        )}
      </div>

      {sticker && (
        <div
          className={`${styles.sticker} ${styles[sticker.position ?? "top-right"]}`}
          style={{ width: sticker.width }}
        >
          <Image
            src={sticker.src}
            alt={sticker.alt ?? ""}
            width={sticker.width}
            height={sticker.height}
            className={styles.stickerImage}
          />
        </div>
      )}
    </div>
  );
}

function renderTitle(title, highlight) {
  if (!highlight || typeof title !== "string" || !title.includes(highlight)) return title;
  const [before, after] = title.split(highlight);
  return (
    <>
      {before}
      <span className={styles.highlight}>{highlight}</span>
      {after}
    </>
  );
}
