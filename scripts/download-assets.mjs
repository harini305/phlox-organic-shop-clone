// Downloads the reference-site images into public/images/ with meaningful names.
// These are the Phlox theme's demo assets, used as reference placeholders for local
// development only — replace them with owned/licensed images before any public deployment.
// Usage: npm run assets            (skips files that already exist)
//        npm run assets -- --force (re-downloads everything)

import { mkdir, writeFile, access } from "node:fs/promises";
import path from "node:path";

const UPLOADS = "https://demo.phlox.pro/shop-organic-2/wp-content/uploads/sites/257";
const THEME = "https://demo.phlox.pro/shop-organic-2/wp-content/themes/phlox-pro/auxin/images";
const OUT_DIR = path.resolve("public/images");
const force = process.argv.includes("--force");

// [destination (relative to public/images), source URL]
const MANIFEST = [
  // Brand
  ["brand/logo.png", `${UPLOADS}/2020/12/cropped-Group-176.png`],
  ["brand/logo-footer.png", `${UPLOADS}/2021/01/Group-213.png`],

  // Header
  ["header/topbar-bg.jpg", `${UPLOADS}/2020/12/Group-288.jpg`],

  // Hero banner backgrounds
  ["hero/hero-mega-sale-bg.jpg", `${UPLOADS}/2020/12/Tropicalfruits_63-48605-original-protected.jpg`],
  ["hero/hero-fresh-fruit-bg.jpg", `${UPLOADS}/2021/03/Tropicalfruits_64-18593-original-protected.jpg`],

  // Promotional banner backgrounds
  ["banners/promo-no-plastic-bg.jpg", `${UPLOADS}/2021/01/DSC_9421copy-38751-original-protecte2d.jpg`],
  ["banners/promo-fresh-fruit-bg.jpg", `${UPLOADS}/2021/01/IMG_1910-57370-original-protected.jpg`],
  ["banners/promo-super-deal-bg.jpg", `${UPLOADS}/2021/01/May_2020_593-22235-original-protected.jpg`],
  ["banners/promo-fruit-vegetable-sale-bg.jpg", `${UPLOADS}/2021/01/citruss-21771-original-protected.jpg`],
  ["banners/promo-organic-juice-bg.jpg", `${UPLOADS}/2021/01/DSCF1511-46679-original-protected.jpg`],

  // Badges / stickers — used on hero & promo banners and in the badge row above the newsletter
  ["badges/badge-100-eco.png", `${UPLOADS}/2020/12/Group-240.png`], // hero
  ["badges/badge-no-plastic.png", `${UPLOADS}/2021/01/5af3f6c66df8d6d8066651c3b2d18dae.png`], // #No_plastic promo
  ["badges/badge-organic-lettering.png", `${UPLOADS}/2021/01/Group-242.png`], // Super Deal promo
  ["badges/badge-home-made.png", `${UPLOADS}/2021/01/Group-294.png`], // Organic Juice promo + badge row #1
  ["badges/badge-100-bio.png", `${UPLOADS}/2021/01/Group-293.png`], // badge row #2
  ["badges/badge-certified-natural.png", `${UPLOADS}/2021/01/Group-292.png`], // badge row #3
  ["badges/badge-home-grown.png", `${UPLOADS}/2021/01/Group-290.png`], // badge row #4
  ["badges/badge-natural-certified-leaf.png", `${UPLOADS}/2021/01/Group-289.png`], // badge row #5
  ["badges/badge-100-organic.png", `${UPLOADS}/2021/01/Group-291.png`], // badge row #6

  // Products (full-size originals; next/image handles cropping/resizing)
  ["products/savoy-cabbage.jpg", `${UPLOADS}/2021/03/Group_297.jpg`],
  ["products/organic-cauliflower.jpg", `${UPLOADS}/2021/01/Group-296.jpg`],
  ["products/organic-lentil-sprouts.jpg", `${UPLOADS}/2021/03/Group_295.jpg`],
  ["products/green-beans-1.jpg", `${UPLOADS}/2021/01/Group-294.jpg`],
  ["products/green-beans-2.jpg", `${UPLOADS}/2021/01/Group-292.jpg`],
  ["products/green-beans-3.jpg", `${UPLOADS}/2021/01/Group-293.jpg`],
  ["products/strawberry.jpg", `${UPLOADS}/2021/01/Group-291.jpg`],
  ["products/green-beans-4.jpg", `${UPLOADS}/2021/01/00.jpg`],
  ["products/tomato.jpg", `${UPLOADS}/2021/01/Group-2829.jpg`],
  ["products/organic-lentil-sprouts-2.jpg", `${UPLOADS}/2021/01/Group-290.jpg`],
  ["products/avocado-hass.jpg", `${UPLOADS}/2021/01/Group222-287.jpg`],
  ["products/organic-cauliflower-2.jpg", `${UPLOADS}/2021/01/Group-286.jpg`],

  // Testimonial avatars
  ["testimonials/alex-janson.png", `${UPLOADS}/2021/01/young-hispanic-man-looking-at-clothes-on-a-rail-PYSF2PN.png`],
  ["testimonials/sarah-mendes.png", `${UPLOADS}/2021/01/Mask-Group-85.png`],
  ["testimonials/james-fread.png", `${UPLOADS}/2021/01/caucasian-man-wearing-blue-jacket-white-shirt-and-PEF4WCU.png`],
  ["testimonials/amanda-janson.png", `${UPLOADS}/2021/01/attractive-woman-with-wavy-hair-in-beige-coat-GP5QCVP.png`],
  ["testimonials/andrew-flock.png", `${UPLOADS}/2021/01/8518280-36418.png`],

  // UI icons
  ["icons/empty-cart.svg", `${THEME}/other/empty-cart.svg`],
];

const exists = (p) => access(p).then(() => true, () => false);

async function download([dest, url]) {
  const target = path.join(OUT_DIR, dest);
  if (!force && (await exists(target))) return { dest, status: "skipped" };

  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
  if (!res.ok) throw new Error(`${res.status} ${url}`);

  await mkdir(path.dirname(target), { recursive: true });
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(target, buf);
  return { dest, status: `${(buf.length / 1024).toFixed(0)} KB` };
}

const results = await Promise.allSettled(MANIFEST.map(download));
let failed = 0;
results.forEach((r, i) => {
  if (r.status === "fulfilled") console.log(`✓ ${r.value.dest} (${r.value.status})`);
  else {
    failed++;
    console.error(`✗ ${MANIFEST[i][0]} — ${r.reason.message}`);
  }
});
console.log(`\n${MANIFEST.length - failed}/${MANIFEST.length} assets ready in public/images/`);
if (failed) process.exit(1);
