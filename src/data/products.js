// Product catalog. `price` is the current price; `regularPrice` is set only
// for items on sale (rendered struck through next to the sale price).
// `rating` is out of 5.
export const products = [
  {
    id: "savoy-cabbage",
    name: "Savoy Cabbage",
    image: "/images/products/savoy-cabbage.jpg",
    price: 11.0,
    categories: ["fruits", "vegetables"],
    rating: 4,
  },
  {
    id: "organic-cauliflower",
    name: "Organic Cauliflower",
    image: "/images/products/organic-cauliflower.jpg",
    price: 27.05,
    categories: ["fruits", "meat"],
    rating: 4,
  },
  {
    id: "organic-lentil-sprouts",
    name: "Organic Lentil Sprouts",
    image: "/images/products/organic-lentil-sprouts.jpg",
    price: 9.05,
    categories: ["fruits", "vegetables"],
    rating: 4,
  },
  {
    id: "green-beans-1",
    name: "Green Beans – 1 Kg",
    image: "/images/products/green-beans-1.jpg",
    price: 5.0,
    categories: ["fruits", "organic-juice"],
    rating: 4,
  },
  {
    id: "green-beans-2",
    name: "Green Beans – 1 Kg",
    image: "/images/products/green-beans-2.jpg",
    price: 17.05,
    categories: ["vegetables"],
    rating: 4,
  },
  {
    id: "green-beans-3",
    name: "Green Beans – 1 Kg",
    image: "/images/products/green-beans-3.jpg",
    price: 21.05,
    categories: ["fruits", "meat", "vegetables"],
    rating: 4,
  },
  {
    id: "strawberry",
    name: "Strawberry",
    image: "/images/products/strawberry.jpg",
    price: 22.0,
    regularPrice: 28.0,
    categories: ["fruits", "vegetables"],
    rating: 4,
  },
  {
    id: "green-beans-4",
    name: "Green Beans – 1 Kg",
    image: "/images/products/green-beans-4.jpg",
    price: 21.05,
    categories: ["organic", "organic-juice"],
    rating: 4,
  },
  {
    id: "tomato",
    name: "Tomato",
    image: "/images/products/tomato.jpg",
    price: 14.0,
    regularPrice: 15.0,
    categories: ["fresh-onion", "oatmeal"],
    rating: 4,
  },
  {
    id: "organic-lentil-sprouts-2",
    name: "Organic Lentil Sprouts",
    image: "/images/products/organic-lentil-sprouts-2.jpg",
    price: 26.0,
    categories: ["mushrooms", "vegetables"],
    rating: 4,
  },
  {
    id: "avocado-hass",
    name: "Avocado Hass",
    image: "/images/products/avocado-hass.jpg",
    price: 19.0,
    regularPrice: 27.05,
    categories: ["canned-organic", "vegetables"],
    rating: 4,
  },
  {
    id: "organic-cauliflower-2",
    name: "Organic Cauliflower",
    image: "/images/products/organic-cauliflower-2.jpg",
    price: 19.0,
    categories: ["canned-organic", "organic-food", "vegetables"],
    rating: 4,
  },
];

// Copy for the product detail page, keyed by id. `weight` is in kg.
const productDetails = {
  "savoy-cabbage": {
    summary: "Crinkly, tender-leaved savoy with a mild, sweet flavour — great shredded raw or braised slowly with butter.",
    weight: 1.2,
    origin: "Kent, UK",
  },
  "organic-cauliflower": {
    summary: "Dense white florets wrapped in fresh green leaves. Roast whole, rice it, or blitz into a silky soup.",
    weight: 0.9,
    origin: "Lincolnshire, UK",
  },
  "organic-lentil-sprouts": {
    summary: "Crunchy sprouted lentils packed with plant protein. Toss into salads, wraps and grain bowls.",
    weight: 0.25,
    origin: "Somerset, UK",
  },
  "green-beans-1": {
    summary: "Slim, snappy green beans picked young. Blanch for two minutes and finish with olive oil and lemon.",
    weight: 1,
    origin: "Kenya",
  },
  "green-beans-2": {
    summary: "A full kilo of fine green beans, trimmed and ready to steam, stir-fry or add to curries.",
    weight: 1,
    origin: "Kenya",
  },
  "green-beans-3": {
    summary: "Bright, crisp runner beans grown without synthetic pesticides — sweet enough to eat raw.",
    weight: 1,
    origin: "Spain",
  },
  strawberry: {
    summary: "Juicy, sun-ripened strawberries with a deep red colour all the way through. Best eaten the day they arrive.",
    weight: 0.4,
    origin: "Herefordshire, UK",
  },
  "green-beans-4": {
    summary: "Tender green beans with a fresh, grassy crunch, packed in compostable paper.",
    weight: 1,
    origin: "Portugal",
  },
  tomato: {
    summary: "Vine-ripened tomatoes with real flavour — slice for salads, roast for sauces or eat with a pinch of salt.",
    weight: 0.5,
    origin: "Isle of Wight, UK",
  },
  "organic-lentil-sprouts-2": {
    summary: "Freshly sprouted green lentils, rinsed and ready. A nutty, crunchy topping for soups and salads.",
    weight: 0.25,
    origin: "Somerset, UK",
  },
  "avocado-hass": {
    summary: "Creamy Hass avocados, picked mature and ripened slowly. Ready to eat within two to three days.",
    weight: 0.6,
    origin: "Peru",
  },
  "organic-cauliflower-2": {
    summary: "A compact organic cauliflower with tight curds and sweet, nutty flavour when roasted.",
    weight: 0.8,
    origin: "Cornwall, UK",
  },
};

export function getProductDetails(product) {
  const details = productDetails[product.id] ?? {};
  return {
    summary: details.summary ?? "",
    weight: details.weight,
    origin: details.origin,
    description: [
      `Our ${product.name.toLowerCase()} comes straight from certified organic growers we work with every season. Nothing is waxed, irradiated or sprayed with synthetic pesticides, and everything is packed in plastic-free, compostable materials.`,
      "We harvest to order and deliver within 48 hours, so produce reaches your kitchen at its freshest. Store in a cool, dry place or the bottom of the fridge, and wash just before use.",
    ],
    highlights: [
      "Certified organic and grown without synthetic pesticides",
      "Harvested to order and delivered within 48 hours",
      "Packed in plastic-free, compostable packaging",
    ],
  };
}

// Which products appear in each home-page section (by id, in display order).
export const productCollections = {
  newProducts: products.map((p) => p.id),
  bestDeals: ["savoy-cabbage", "organic-cauliflower"],
  featured: [
    "savoy-cabbage",
    "organic-cauliflower",
    "organic-lentil-sprouts",
    "green-beans-1",
    "green-beans-3",
    "strawberry",
  ],
};

const byId = new Map(products.map((p) => [p.id, p]));

export function getProduct(id) {
  return byId.get(id);
}

export function getCollection(name) {
  return (productCollections[name] ?? []).map(getProduct).filter(Boolean);
}

export function isOnSale(product) {
  return product.regularPrice != null && product.regularPrice > product.price;
}

export function getProductHref(product) {
  return `/product/${product.id}`;
}

export function getProductsInCategory(slug) {
  return products.filter((p) => p.categories.includes(slug));
}

/** Products sharing a category with `product`, most overlap first. */
export function getRelatedProducts(product, limit = 4) {
  return products
    .filter((p) => p.id !== product.id)
    .map((p) => ({ p, shared: p.categories.filter((c) => product.categories.includes(c)).length }))
    .filter(({ shared }) => shared > 0)
    .sort((a, b) => b.shared - a.shared)
    .slice(0, limit)
    .map(({ p }) => p);
}
