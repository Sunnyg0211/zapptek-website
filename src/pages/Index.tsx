import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedProductsSection } from "@/components/home/FeaturedProductsSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { AMCSection } from "@/components/home/AMCSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <>
      <HeroSection />

      {/* NEW – Products will appear right after hero banner */}
      <FeaturedProductsSection />

      <ServicesSection />
      <AMCSection />
      <CTASection />
      <CTASection />
    </>
  );
};

export default Index;
