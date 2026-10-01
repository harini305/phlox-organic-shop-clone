// Product reviews shown on the product page (placeholder copy). Keyed by
// product id; products without an entry start with no reviews.
export const reviews = {
  strawberry: [
    { author: "Priya N.", rating: 5, date: "2026-08-14", text: "Sweet, fragrant and not a single squashed berry in the punnet." },
    { author: "Tom H.", rating: 4, date: "2026-08-02", text: "Lovely flavour. A few were a little small but the taste made up for it." },
    { author: "Grace L.", rating: 4, date: "2026-07-21", text: "My kids ate the whole box before dinner — reordering this week." },
  ],
  "savoy-cabbage": [
    { author: "Daniel K.", rating: 4, date: "2026-08-10", text: "Crisp and fresh. Made a great slaw that kept well for days." },
  ],
  "avocado-hass": [
    { author: "Maya R.", rating: 5, date: "2026-08-18", text: "Ripened perfectly on the counter in two days, just as described." },
    { author: "Luis F.", rating: 4, date: "2026-07-30", text: "Creamy and rich. One was slightly bruised but still good inside." },
  ],
  tomato: [
    { author: "Hannah S.", rating: 4, date: "2026-08-06", text: "These actually taste like tomatoes. Wonderful in a simple pasta." },
  ],
};

export function getReviews(productId) {
  return reviews[productId] ?? [];
}
