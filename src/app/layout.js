import { Nunito } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollEffects from "@/components/layout/ScrollEffects";
import CertificationBadges from "@/components/sections/CertificationBadges";
import Newsletter from "@/components/sections/Newsletter";
import { CartProvider } from "@/context/CartContext";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata = {
  // Resolves relative Open Graph image URLs; set NEXT_PUBLIC_SITE_URL when deploying.
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Organic Shop — Fresh Organic Fruit, Vegetables & Groceries",
    template: "%s | Organic Shop",
  },
  description:
    "Shop fresh organic fruit, vegetables, juices and pantry staples. Weekly deals, free shipping on orders over $50 and plastic-free delivery.",
  applicationName: "Organic Shop",
  keywords: ["organic shop", "organic food", "fresh fruit", "vegetables", "organic juice", "grocery delivery"],
  openGraph: {
    type: "website",
    siteName: "Organic Shop",
    title: "Organic Shop — Fresh Organic Fruit, Vegetables & Groceries",
    description: "Fresh organic produce and pantry staples with weekly deals and free shipping over $50.",
  },
  robots: { index: false, follow: false }, // demo build
};

export const viewport = {
  themeColor: "#007d56",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={nunito.variable}>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <CartProvider>
          <Header />
          <main id="main">{children}</main>
          {/* Every reference page ends with the badge card and newsletter band */}
          <CertificationBadges />
          <Newsletter />
          <Footer />
          <ScrollEffects />
        </CartProvider>
      </body>
    </html>
  );
}
