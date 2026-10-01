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
 * badge:      { text, variant: "circle" | "tag" | "text", color?: "hot" | "accent" | "green" }
 * title / highlight: `highlight` is a substring of `title` drawn in the accent color
 * cta:        { label, href, variant?, size? }
 * sticker:    { src, alt, width, height, style?,
 *               position?: "top-right" | "top-left" | "bottom-right" | "bottom-left" | "overlap-top" }
 *             "overlap-top" sits half outside the banner's top edge.
 * theme:      "light" (white text over a dark photo) | "dark" (dark text) | "green" (green text)
 * size:       "md" | "lg" (hero)
 * contentPosition: "start" | "end" — horizontal placement of the text block
 * valign:     "center" | "start" | "end" — vertical placement of the text block
 * The background layer carries `data-parallax` and the sticker `data-sticker`
 * for the page-level GSAP effects.
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
  contentPosition = "start",
  valign = "center",
  priority = false,
  sizes,
  as: TitleTag = "h2",
  className = "",
  ...rest
}) {
  const classes = [
    styles.banner,
    styles[theme],
    styles[size],
    styles[align],
    styles[`content-${contentPosition}`],
    styles[`valign-${valign}`],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} {...rest}>
      {/* object-fit: cover scales these photos well past the slot width, so the
          default `sizes` requests the full file (next/image never upscales). */}
      {background && (
        <div className={styles.media}>
          <div className={styles.bg} data-parallax>
            <Image
              src={background}
              alt={backgroundAlt}
              fill
              priority={priority}
              sizes={sizes ?? "100vw"}
              className={styles.bgImage}
            />
          </div>
        </div>
      )}

      <div className={styles.content} data-banner-content>
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
          style={{ width: sticker.width, ...sticker.style }}
          data-sticker
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
