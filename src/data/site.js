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

const shopSections = ["/shop", "/product-category", "/product"];

/** Whether a main-nav link should be marked current for `pathname`. */
export function isCurrent(pathname, href) {
  if (href === "/") return pathname === "/";
  if (href === "/shop") return shopSections.some((p) => pathname === p || pathname.startsWith(`${p}/`));
  return pathname === href || pathname.startsWith(`${href}/`);
}

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

// ---------- About page ----------
export const aboutStory = {
  eyebrow: "Our Story",
  title: "About Our Online Shop",
  text: "We started as a single market stall selling vegetables from three family farms. Today we deliver seasonal, certified organic produce across the country — still sourced from small growers we know by name, still packed without plastic.",
  points: [
    { title: "Trusted By Thousands", text: "Over 12,000 households order from us every month." },
    { title: "Best Services", text: "Next-day delivery and friendly support, seven days a week." },
  ],
  images: [
    { src: "/images/about/story-produce-aisle.jpg", alt: "Crates of green and red apples in a produce aisle", width: 423, height: 372 },
    { src: "/images/banners/promo-no-plastic-bg.jpg", alt: "Shopper carrying fresh fruit in a reusable net bag", width: 1191, height: 425 },
  ],
};

// Fictional team for the demo; portraits are the reference's Unsplash photos.
export const team = [
  { name: "Simon Green", role: "Founder", image: "/images/about/team-1.jpg" },
  { name: "Hannah Reid", role: "Head of Sourcing", image: "/images/about/team-2.jpg" },
  { name: "Robert Campbell", role: "Operations Lead", image: "/images/about/team-3.jpg" },
  { name: "Ella Morgan", role: "Customer Care", image: "/images/about/team-4.jpg" },
];

export const whoWeAre = {
  eyebrow: "We Act Precisely",
  title: "Who We Are",
  text: "A small team of growers, packers and food lovers who believe good food should be simple. We plan harvests with our farmers, pick to order and keep the journey from field to doorstep as short as possible.",
  images: [
    { src: "/images/about/market-stall.jpg", alt: "Wooden crates of vegetables at a market stall", width: 784, height: 446 },
    { src: "/images/about/market-pumpkins.jpg", alt: "A pile of orange pumpkins", width: 784, height: 446 },
  ],
};

// ---------- Contact page ----------
export const storeLocation = {
  city: "New York",
  lines: ["94 Academy Street", "Barrington, London"],
  phone: "+44 (0)20 7405 7686",
  phoneHref: "tel:+442074057686",
  // OpenStreetMap embed (no API key needed) standing in for the reference's Google Map.
  mapSrc:
    "https://www.openstreetmap.org/export/embed.html?bbox=-74.0200%2C40.7000%2C-73.9700%2C40.7300&layer=mapnik",
};
