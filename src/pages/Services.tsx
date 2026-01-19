import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Monitor,
  Laptop,
  Wifi,
  Camera,
  HardDrive,
  Printer,
  Shield,
  Wrench,
  Users,
  Clock,
  ThumbsUp,
  ArrowRight
} from "lucide-react";

import { Button } from "@/components/ui/button";

/* ---------- BANNERS FOR AUTOSLIDE ---------- */

const banners = [
  {
    image: "https://images.unsplash.com/photo-1517430816045-df4b7de4a7d5?w=1200",
    title: "Professional IT Repair Services",
    text: "Fast, reliable and affordable IT solutions for home and business users.",
    button: "Book Repair Now",
    link: "/book-service"
  },
  {
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200",
    title: "Expert Laptop & Desktop Support",
    text: "Certified technicians for all hardware and software problems.",
    button: "Schedule Service",
    link: "/book-service"
  },
  {
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200",
    title: "Network & CCTV Solutions",
    text: "Secure your home and office with smart networking and CCTV systems.",
    button: "Contact Us",
    link: "/contact"
  },
  {
    image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=1200",
    title: "Annual Maintenance Contracts",
    text: "Complete IT care with our AMC plans for businesses and offices.",
    button: "View AMC Plans",
    link: "/amc"
  }
];

/* ---------- SERVICES LIST ---------- */

const services = [
  {
    icon: Monitor,
    title: "Desktop Repair",
    description: "Hardware diagnostics, OS installation and performance optimization."
  },
  {
    icon: Laptop,
    title: "Laptop Service",
    description: "Screen replacement, battery repair and motherboard services."
  },
  {
    icon: Wifi,
    title: "Network Setup",
    description: "Router configuration, WiFi setup and network security."
  },
  {
    icon: Camera,
    title: "CCTV Installation",
    description: "Camera installation, DVR setup and remote monitoring."
  },
  {
    icon: HardDrive,
    title: "Data Recovery",
    description: "Recover lost data from HDD, SSD and memory cards."
  },
  {
    icon: Printer,
    title: "Printer Service",
    description: "Cartridge refilling, driver setup and maintenance."
  }
];

/* ---------- TRUST FACTORS ---------- */

const trustPoints = [
  {
    icon: Users,
    title: "Trusted by 1000+ Customers",
    desc: "Years of experience serving home and business clients."
  },
  {
    icon: Clock,
    title: "Quick Response Time",
    desc: "Fast service delivery with minimum downtime."
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    desc: "Your data and devices are always safe with us."
  },
  {
    icon: ThumbsUp,
    title: "Affordable Pricing",
    desc: "Best service at reasonable and transparent cost."
  }
];

const Services = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black">

      {/* ===== AUTO SLIDING BANNER ===== */}
      <section className="relative h-[450px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
          >
            <img
              src={banners[index].image}
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-black/70 flex items-center">
              <div className="container mx-auto px-4 text-white">

                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                >
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    {banners[index].title}
                  </h2>

                  <p className="text-gray-300 max-w-xl mb-6">
                    {banners[index].text}
                  </p>

                  <Button
                    className="bg-gradient-to-r from-blue-600 to-blue-800"
                    asChild
                  >
                    <Link to={banners[index].link}>
                      {banners[index].button}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </motion.div>

              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ===== SERVICES PROMOTION GRID ===== */}
      <section className="py-20">
        <div className="container mx-auto px-4">

          <h2 className="text-3xl font-bold text-white text-center mb-10">
            Our Core IT Services
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {services.map((service, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.04 }}
                className="bg-black/70 border border-white/10 rounded-2xl p-6 text-center"
              >
                <div className="w-16 h-16 bg-blue-600/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <service.icon className="w-8 h-8 text-blue-400" />
                </div>

                <h3 className="text-xl font-bold text-white mb-2">
                  {service.title}
                </h3>

                <p className="text-gray-400 mb-4">
                  {service.description}
                </p>

                <Button
                  className="bg-gradient-to-r from-blue-600 to-blue-800 w-full"
                  asChild
                >
                  <Link to="/book-service">
                    Book This Service
                  </Link>
                </Button>
              </motion.div>
            ))}

          </div>
        </div>
      </section>

      {/* ===== WHY TRUST ZAPPTEK ===== */}
      <section className="py-20 bg-black/50">
        <div className="container mx-auto px-4 text-center">

          <h2 className="text-3xl font-bold text-white mb-10">
            Why Choose ZappTek?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

            {trustPoints.map((point, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="p-6 border border-white/10 bg-black/70 rounded-2xl"
              >
                <div className="w-14 h-14 bg-blue-600/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <point.icon className="w-7 h-7 text-blue-400" />
                </div>

                <h4 className="text-lg font-semibold text-white mb-2">
                  {point.title}
                </h4>

                <p className="text-gray-400 text-sm">
                  {point.desc}
                </p>
              </motion.div>
            ))}

          </div>
        </div>
      </section>

      {/* ===== HOW WE WORK ===== */}
      <section className="py-16 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          How We Deliver Best IT Services
        </h2>

        <p className="text-gray-400 max-w-2xl mx-auto mb-8">
          At ZappTek we follow a professional process: Diagnose → Repair → Test → Deliver.  
          We make sure every customer gets reliable, transparent and affordable service.
        </p>

        <Button
          className="bg-gradient-to-r from-blue-600 to-blue-800"
          asChild
        >
          <Link to="/contact">
            Talk to Expert
          </Link>
        </Button>
      </section>

    </div>
  );
};

export default Services;
