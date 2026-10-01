import { Roboto, Roboto_Slab, Nunito } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-roboto",
  display: "swap",
});

const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-roboto-slab",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata = {
  title: "Organic Shop",
  description: "Fresh organic fruits, vegetables and groceries delivered to your door.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${roboto.variable} ${robotoSlab.variable} ${nunito.variable}`}>
      <body>{children}</body>
    </html>
  );
}
