import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowRight, Wrench, ShoppingCart, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

type Slide = {
  image: string;
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
  link: string;
};

type CategorySlides = {
  category: string;
  icon: any;
  slides: Slide[];
};

const heroData: CategorySlides[] = [
  {
    category: "IT Sales",
    icon: ShoppingCart,
    slides: [
      {
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1600&h=900&fit=crop",
        title: "Premium Laptops Sale",
        subtitle: "Best Deals of the Season",
        description: "Top branded laptops at unbelievable prices with warranty support.",
        buttonText: "Shop Laptops",
        link: "/products",
      },
      {
        image: "https://images.ctfassets.net/ao073xfdpkqn/1G7Ea59vo1IEqlrbgQTcvN/f860db8d073b97ae800b1a3506db858e/xbs-print-banner-1200x440.jpg?fm=avif",
        title: "Printers & Scanners",
        subtitle: "Office Essentials",
        description: "High-performance printers for home and office use.",
        buttonText: "View Printers",
        link: "/products",
      },
      {
        image: "https://as2.ftcdn.net/v2/jpg/06/52/85/77/1000_F_652857744_hsKmrKct8jbTTYh9c1uWOL3PIibU2K6g.jpg",
        title: "Networking Equipment",
        subtitle: "Build Better Connectivity",
        description: "Routers, switches, and accessories for seamless internet.",
        buttonText: "Explore Networking",
        link: "/products",
      },
      {
        image: "https://www.techno-cure.com/wp-content/uploads/2019/05/service-banner.jpg",
        title: "CCTV Security Solutions",
        subtitle: "Protect What Matters",
        description: "Complete CCTV packages for homes and businesses.",
        buttonText: "View CCTV Range",
        link: "/products",
      },
    ],
  },

  {
    category: "IT Services",
    icon: Wrench,
    slides: [
      {
        image: "https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=1600&h=900&fit=crop",
        title: "Computer Repair Services",
        subtitle: "Fast & Reliable",
        description: "Expert on-site computer and laptop repair services.",
        buttonText: "Book Repair",
        link: "/book-service",
      },
      {
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1600&h=900&fit=crop",
        title: "Office IT Support",
        subtitle: "For Small Businesses",
        description: "Dedicated IT support for your growing business.",
        buttonText: "Get Support",
        link: "/services",
      },
      {
        image: "https://images.unsplash.com/photo-1581091870622-3b0c1f5f8b3d?w=1600&h=900&fit=crop",
        title: "Data Recovery Services",
        subtitle: "We Recover Your Data",
        description: "Professional recovery from hard disks and laptops.",
        buttonText: "Recover Now",
        link: "/services",
      },
      {
        image: "https://images.unsplash.com/photo-1560732488-6b0df240254a?w=1600&h=900&fit=crop",
        title: "Home Visit Service",
        subtitle: "At Your Doorstep",
        description: "Technicians visit your location for instant solutions.",
        buttonText: "Book Visit",
        link: "/book-service",
      },
    ],
  },

  {
    category: "AMC Plans",
    icon: Shield,
    slides: [
      {
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&h=900&fit=crop",
        title: "Annual Maintenance",
        subtitle: "For Businesses",
        description: "Hassle-free IT maintenance plans for companies.",
        buttonText: "View AMC Plans",
        link: "/amc-plans",
      },
      {
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1600&h=900&fit=crop",
        title: "Corporate AMC",
        subtitle: "Enterprise Support",
        description: "Dedicated support for corporate infrastructure.",
        buttonText: "Contact Sales",
        link: "/contact",
      },
      {
        image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=1600&h=900&fit=crop",
        title: "Priority Support",
        subtitle: "Zero Downtime",
        description: "24/7 priority support for AMC customers.",
        buttonText: "Learn More",
        link: "/amc-plans",
      },
      {
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1600&h=900&fit=crop",
        title: "Complete IT Care",
        subtitle: "One Plan Solution",
        description: "Hardware, software and network maintenance.",
        buttonText: "Get Started",
        link: "/amc-plans",
      },
    ],
  },
];

export function HeroSection() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = heroData[activeCategory].slides;

  useEffect(() => {
    setCurrentSlide(0);
  }, [activeCategory]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [slides]);

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">

      {/* CATEGORY NAV */}
      <div className="absolute top-4 left-0 right-0 z-20 flex justify-center gap-3">
        {heroData.map((cat, index) => (
          <button
            key={index}
            onClick={() => setActiveCategory(index)}
            className={`px-4 py-2 rounded-full flex items-center gap-2 text-sm transition-all ${
              activeCategory === index
                ? "bg-blue-600 text-white"
                : "bg-white/20 text-white hover:bg-blue-600/30"
            }`}
          >
            <cat.icon className="w-4 h-4 text-blue-400" />
            {cat.category}
          </button>
        ))}
      </div>

      {/* SLIDES */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentSlide ? 1 : 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <img
              src={slide.image}
              className="w-full h-full object-cover"
              alt={slide.title}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
          </motion.div>
        ))}
      </div>

      {/* CONTENT */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-3">
            {slides[currentSlide].title}
          </h1>

          <h3 className="text-xl text-blue-400 mb-3">
            {slides[currentSlide].subtitle}
          </h3>

          <p className="text-white/80 mb-6">
            {slides[currentSlide].description}
          </p>

          <Button
            size="lg"
            asChild
            className="bg-gradient-to-r from-blue-600 to-blue-800 text-white hover:from-blue-500 hover:to-blue-700 transition-all"
          >
            <Link to={slides[currentSlide].link}>
              {slides[currentSlide].buttonText}
              <ArrowRight className="w-5 h-5 ml-2 text-white" />
            </Link>
          </Button>
        </motion.div>
      </div>

      {/* DOTS */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`transition-all rounded-full ${
              currentSlide === i
                ? "w-8 h-2 bg-blue-600"
                : "w-2 h-2 bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
