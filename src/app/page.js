import BestDeals from "@/components/sections/BestDeals";
import CertificationBadges from "@/components/sections/CertificationBadges";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import Features from "@/components/sections/Features";
import Hero from "@/components/sections/Hero";
import NewProducts from "@/components/sections/NewProducts";
import Newsletter from "@/components/sections/Newsletter";
import PromoPair from "@/components/sections/PromoPair";
import Testimonials from "@/components/sections/Testimonials";
import { promoPairOne, promoPairTwo } from "@/data/promotions";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <NewProducts />
      <PromoPair banners={promoPairOne} layout="wide" label="Current campaigns" />
      <BestDeals />
      <FeaturedProducts />
      <PromoPair banners={promoPairTwo} layout="equal" label="Seasonal offers" />
      <Testimonials />
      <CertificationBadges />
      <Newsletter />
    </>
  );
}
