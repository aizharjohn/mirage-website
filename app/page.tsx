import { Hero } from "@/components/home/Hero";
import { Features } from "@/components/home/Features";
import { BestSellers } from "@/components/home/BestSellers";
import { PromoBanners } from "@/components/home/PromoBanners";
import { Categories } from "@/components/home/Categories";
import { Newsletter } from "@/components/home/Newsletter";
import { getProducts } from "@/lib/catalog";

export default async function HomePage() {
  const featured = await getProducts({ featured: true });
  const bestSellers = featured.slice(0, 5);

  return (
    <>
      <Hero />
      <Features />
      <BestSellers products={bestSellers} />
      <PromoBanners />
      <Categories />
      <Newsletter />
    </>
  );
}
