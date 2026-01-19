import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedProductsSection } from "@/components/home/FeaturedProductsSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { AMCSection } from "@/components/home/AMCSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { EnhancedTrustSection } from "@/components/home/EnhancedTrustSection";

const Index = () => {
  return (
    <>
      <HeroSection />

      {/* Products will appear right after hero banner */}
      <FeaturedProductsSection />

      <ServicesSection />

      <AMCSection />

      <TestimonialsSection />

      <EnhancedTrustSection />
    </>
  );
};

export default Index;
