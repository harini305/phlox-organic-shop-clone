// Site-wide content: navigation, contact details, feature strip and badges.
// Icons are chosen in the presentation components (keyed by `id`), so this
// file stays plain data.

export const siteName = "Organic Shop";

export const shippingNotice = "Free Shipping From $50 Purchase Now";

export const mainNav = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const socialLinks = [
  { id: "facebook", label: "Facebook", href: "https://www.facebook.com/" },
  { id: "twitter", label: "Twitter", href: "https://twitter.com/" },
  { id: "pinterest", label: "Pinterest", href: "https://www.pinterest.com/" },
  { id: "youtube", label: "YouTube", href: "https://www.youtube.com/" },
];

export const features = [
  { id: "shipping", title: "Free Shipping", description: "Free Ship Over $150" },
  { id: "deal", title: "Best Deal Online", description: "We provide a free in-home." },
  { id: "return", title: "15 Days Return", description: "We provide a free in-home measure." },
  { id: "payment", title: "Secure Payment", description: "We provide a free in-home." },
];

// Certification row above the newsletter, in reference order.
export const certificationBadges = [
  { src: "/images/badges/badge-home-made.png", alt: "Home made product", width: 128, height: 120 },
  { src: "/images/badges/badge-100-bio.png", alt: "100% bio product", width: 78, height: 105 },
  { src: "/images/badges/badge-certified-natural.png", alt: "100% certified natural", width: 153, height: 123 },
  { src: "/images/badges/badge-home-grown.png", alt: "Home grown, 100% natural", width: 133, height: 106 },
  { src: "/images/badges/badge-natural-certified-leaf.png", alt: "100% natural certified", width: 107, height: 107 },
  { src: "/images/badges/badge-100-organic.png", alt: "100% organic", width: 102, height: 74 },
];

export const footerAbout =
  "Seasonal fruit, crisp vegetables and pantry staples sourced from local organic growers and delivered fresh to your door — no plastic, no shortcuts.";

// The footer splits the category list into two columns, as in the reference.
export const footerCategoryColumns = [
  ["vegetables", "fruits", "meat", "canned-organic", "organic", "mushrooms", "organic-juice"],
  ["fresh-onion", "oatmeal"],
];

export const contactInfo = {
  phone: "+123 4567 890",
  phoneHref: "tel:+1234567890",
  address: "Patricia C. Amedee 41 Waldeck Grapevine Nashville, TX 76",
  email: "info@yourdomain.com",
};
