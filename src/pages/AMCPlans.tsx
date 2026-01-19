import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Check, Star, Zap, Crown, ArrowRight, Shield, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const banners = [
  {
    title: "Professional IT Services",
    text: "Complete computer and laptop repair services at your doorstep",
    button: "View Services",
    link: "/services",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200"
  },
  {
    title: "Instant Repair Support",
    text: "Fast, reliable and affordable device repair solutions",
    button: "Book Repair",
    link: "/book-service",
    image: "https://images.unsplash.com/photo-1581091870622-28a6c6f36e8f?w=1200"
  },
  {
    title: "AMC Plans for Everyone",
    text: "Annual maintenance contracts for homes and businesses",
    button: "Explore Plans",
    link: "/amc-plans",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200"
  },
];

const plans = [
  {
    name: "Basic",
    icon: Zap,
    price: "₹2,999",
    period: "/year",
    description: "Perfect for home users with basic IT needs",
    features: [
      "2 On-site Service Visits",
      "Remote Support (Business Hours)",
      "Software Updates & Patches",
      "Basic System Maintenance",
      "Email Support",
      "Response within 48 hours",
    ],
    popular: false,
  },
  {
    name: "Professional",
    icon: Star,
    price: "₹5,999",
    period: "/year",
    description: "Ideal for small businesses and power users",
    features: [
      "6 On-site Service Visits",
      "Priority Remote Support",
      "Software & Security Updates",
      "Hardware Cleaning & Maintenance",
      "Phone & Email Support",
      "Response within 24 hours",
      "10% Discount on Parts",
      "Free Annual Health Check",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    icon: Crown,
    price: "₹12,999",
    period: "/year",
    description: "Complete coverage for growing businesses",
    features: [
      "Unlimited Service Visits",
      "24/7 Priority Support",
      "Complete System Maintenance",
      "Network Management",
      "Dedicated Account Manager",
      "Response within 4 hours",
      "20% Discount on Parts",
      "Free Data Backup Setup",
      "Security Audit Included",
    ],
    popular: false,
  },
];

const benefits = [
  {
    icon: Shield,
    title: "Peace of Mind",
    description: "Never worry about IT issues again with our comprehensive coverage.",
  },
  {
    icon: Clock,
    title: "Priority Response",
    description: "Get faster response times with our AMC priority support system.",
  },
  {
    icon: Users,
    title: "Expert Technicians",
    description: "Access to certified professionals for all your IT needs.",
  },
];

const AMCPlans = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen">

      {/* BANNER SLIDER SECTION */}
      <section className="relative h-[420px] overflow-hidden">

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

            <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
              <div className="text-center max-w-3xl px-4">

                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  {banners[index].title}
                </h1>

                <p className="text-gray-300 mb-6">
                  {banners[index].text}
                </p>

                <Button
                  className="bg-gradient-to-r from-blue-600 to-blue-800 text-white"
                  asChild
                >
                  <Link to={banners[index].link}>
                    {banners[index].button}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* PLANS SECTION */}
      <section className="py-20">
        <div className="container mx-auto px-4">

          <h2 className="text-center text-3xl font-bold text-white mb-12">
            Choose Your AMC Plan
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03 }}
                className="p-8 rounded-3xl border border-white/10 backdrop-blur-md 
                bg-gradient-to-br from-black via-black/80 to-gray-900"
              >
                {plan.popular && (
                  <div className="text-center mb-3">
                    <span className="px-3 py-1 rounded-full bg-blue-600 text-white text-xs">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="w-14 h-14 rounded-xl bg-blue-600/20 flex items-center justify-center mb-4">
                  <plan.icon className="w-7 h-7 text-blue-400" />
                </div>

                <h3 className="text-xl font-bold text-white mb-1">
                  {plan.name}
                </h3>

                <p className="text-sm text-gray-400 mb-4">
                  {plan.description}
                </p>

                <div className="mb-6">
                  <span className="text-4xl font-bold text-white">
                    {plan.price}
                  </span>
                  <span className="text-gray-400">{plan.period}</span>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-300 text-sm">
                      <Check className="w-4 h-4 text-blue-400" />
                      {f}
                    </li>
                  ))}
                </ul>

                <Button
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white"
                  asChild
                >
                  <Link to="/contact">
                    Subscribe Now
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>

              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">

          <h2 className="text-3xl font-bold text-white mb-10">
            Why Choose Our AMC Plans?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {benefits.map((b, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="p-6 rounded-2xl border border-white/10 
                bg-gradient-to-br from-black via-black/80 to-gray-900"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-blue-600/20 flex items-center justify-center">
                  <b.icon className="w-7 h-7 text-blue-400" />
                </div>

                <h3 className="text-lg font-bold text-white mb-2">
                  {b.title}
                </h3>

                <p className="text-gray-400 text-sm">
                  {b.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default AMCPlans;
