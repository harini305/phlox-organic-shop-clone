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
