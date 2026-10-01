// Product categories, in the order shown in the "Shop By Category" menu.
export const categories = [
  { slug: "vegetables", name: "Vegetables" },
  { slug: "fruits", name: "Fruits" },
  { slug: "meat", name: "Meat" },
  { slug: "canned-organic", name: "Canned Organic" },
  { slug: "organic", name: "Organic" },
  { slug: "mushrooms", name: "Mushrooms" },
  { slug: "organic-food", name: "Organic Food" },
  { slug: "fresh-onion", name: "Fresh Onion" },
  { slug: "oatmeal", name: "Oatmeal" },
  { slug: "organic-juice", name: "Organic Juice" },
];

const bySlug = new Map(categories.map((c) => [c.slug, c]));

export function getCategory(slug) {
  return bySlug.get(slug);
}

export function getCategoryHref(slug) {
  return `/product-category/${slug}`;
}
