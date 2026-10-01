// Promotional banner content for the home page. Each entry maps directly to
// <PromoBanner> props. Banner photos and stickers are the downloaded theme-demo
// assets (local development only — see scripts/download-assets.mjs).

export const heroBanners = {
  main: {
    background: "/images/hero/hero-mega-sale-bg.jpg",
    badge: { text: "%50", variant: "circle" },
    subtitle: "Save Up to Flat",
    title: "Mega Sale",
    cta: { label: "Shop now", href: "/shop", size: "lg" },
    sticker: {
      src: "/images/badges/badge-100-eco.png",
      alt: "100% eco",
      width: 152,
      height: 163,
      position: "overlap-top",
      style: { left: "38%", width: 130 },
    },
  },
  side: {
    background: "/images/hero/hero-fresh-fruit-bg.jpg",
    badge: { text: "Sale", variant: "tag" },
    subtitle: "Save Up to Flat",
    title: "Fresh Fruit",
    cta: { label: "Shop now", href: "/product-category/fruits" },
    theme: "green",
  },
};

export const promoPairOne = [
  {
    id: "no-plastic",
    background: "/images/banners/promo-no-plastic-bg.jpg",
    badge: { text: "%15", variant: "tag", color: "accent" },
    title: "Join To #No_plastic Campaign And Get a Discount",
    highlight: "#No_plastic",
    description: "Bring your own bag and we will knock 15% off your next organic order.",
    cta: { label: "Join now", href: "/shop" },
    theme: "dark",
    sticker: {
      src: "/images/badges/badge-no-plastic.png",
      alt: "No plastic bags",
      width: 231,
      height: 229,
      position: "overlap-top",
      style: { left: "35%", transform: "translateY(-62%)" },
    },
  },
  {
    id: "fresh-fruit",
    background: "/images/banners/promo-fresh-fruit-bg.jpg",
    badge: { text: "%30", variant: "tag", color: "green" },
    subtitle: "Save Up to Flat",
    title: "Fresh Fruit",
    cta: { label: "Shop now", href: "/product-category/fruits" },
  },
];

export const bestDealBanner = {
  background: "/images/banners/promo-super-deal-bg.jpg",
  badge: { text: "%30", variant: "circle", color: "accent" },
  subtitle: "Save Upto 30% Flat",
  title: "Super Deal",
  cta: { label: "Shop now", href: "/shop", variant: "accent" },
  sticker: {
    src: "/images/badges/badge-organic-lettering.png",
    alt: "Organic",
    width: 169,
    height: 137,
    position: "top-left",
  },
};

export const promoPairTwo = [
  {
    id: "fruit-vegetable-sale",
    background: "/images/banners/promo-fruit-vegetable-sale-bg.jpg",
    badge: { text: "%50", variant: "tag", color: "green" },
    subtitle: "All Fruit and vegetable",
    title: "Sale 50% Off",
    cta: { label: "Shop now", href: "/product-category/vegetables" },
    contentPosition: "end",
    sticker: {
      src: "/images/badges/badge-home-grown.png",
      alt: "Home grown, 100% natural",
      width: 133,
      height: 106,
      position: "top-right",
      style: { right: "7%" },
    },
  },
  {
    id: "organic-juice",
    background: "/images/banners/promo-organic-juice-bg.jpg",
    badge: { text: "%50", variant: "text" },
    subtitle: "Sale 50% Off",
    title: "Organic Juice",
    cta: { label: "Shop now", href: "/product-category/organic-juice" },
    theme: "dark",
    sticker: {
      src: "/images/badges/badge-home-made.png",
      alt: "Home made product",
      width: 112,
      height: 105,
      position: "overlap-top",
      style: { left: "20%", transform: "translateY(-80%)" },
    },
  },
];
