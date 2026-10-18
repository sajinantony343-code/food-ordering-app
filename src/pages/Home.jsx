import { useMemo } from "react";
import Hero from "../components/Hero";
import CategorySection from "../components/CategorySection";
import PopularItems from "../components/PopularItems";
import PromoBanner from "../components/PromoBanner";
import Testimonials from "../components/Testimonials";
import foodData from "../data/foodData";

export default function Home() {
  const popularFoods = useMemo(
    () => [...foodData].sort((a, b) => b.rating - a.rating),
    []
  );

  return (
    <>
      <Hero />
      <CategorySection selected="All" onSelect={() => {}} />
      <PopularItems foods={popularFoods} />
      <PromoBanner />
      <Testimonials />
    </>
  );
}
