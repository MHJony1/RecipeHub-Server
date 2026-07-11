import { Hero } from '@/components/home/Hero';
import { FeaturedRecipes } from '@/components/home/FeaturedRecipes';
import { Categories } from '@/components/home/Categories';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { LatestRecipes } from '@/components/home/LatestRecipes';
import { Statistics } from '@/components/home/Statistics';
import { Testimonials } from '@/components/home/Testimonials';
import { FAQ } from '@/components/home/FAQ';
import { Newsletter } from '@/components/home/Newsletter';
import { CTA } from '@/components/home/CTA';

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedRecipes />
      <Categories />
      <WhyChooseUs />
      <LatestRecipes />
      <Statistics />
      <Testimonials />
      <FAQ />
      <Newsletter />
      <CTA />
    </>
  );
}
