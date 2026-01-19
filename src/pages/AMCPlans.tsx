import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Check, Zap, Crown, ArrowRight, Shield, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const categories = [
  {
    name: "AMC Plans",
    heading: "Annual Maintenance Contracts",
    text: "Complete IT care plans for homes and businesses",
    button: "View AMC Plans",
    link: "/amc-plans",
    images: [
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200",
      "https://images.unsplash.com/photo-1531498860502-7c67cf02f657?w=1200",
      "https://images.unsplash.com/photo-1542744094-24638eff58bb?w=1200",
      "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=1200",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200"
    ],
  },

  {
    name: "Repairs",
    heading: "Professional Repair Services",
    text: "Fast, reliable and expert device repair solutions",
    button: "Book Repair",
    link: "/book-service",
    images: [
      "https://images.unsplash.com/photo-1581091870622-28a6c6f36e8f?w=1200",
      "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=1200",
      "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?w=1200",
      "https://images.unsplash.com/photo-1600267204091-5c1ab8b10c02?w=1200",
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200"
    ],
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
      "Remote Support",
      "Software Updates",
      "System Maintenance",
      "Email Support",
    ],
  },
  {
    name: "Professional",
    icon: Crown,
    price: "₹5,999",
    period: "/year",
    description: "Ideal for small businesses and offices",
    features: [
      "6 On-site Service Visits",
      "Priority Support",
      "Security Updates",
      "Hardware Maintenance",
      "Discount on Parts",
    ],
  },
  {
    name: "Enterprise",
    icon: Shield,
    price: "₹12,999",
    period: "/year",
    description: "Complete coverage for organizations",
    features: [
      "Unlimited Visits",
      "24/7 Support",
      "Network Management",
      "Dedicated Manager",
      "Fast Response SLA",
    ],
  },
];

const benefits = [
  {
    icon: Shield,
    title: "Peace of Mind",
    description: "Never worry about IT issues again.",
  },
  {
    icon: Clock,
    title: "Priority Response",
    description: "Faster support with AMC priority.",
  },
  {
    icon: Users,
    title: "Expert Technicians",
    description: "Certified professionals at your service.",
  },
];

const AMCPlans = () => {
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prev) => {
        const max = categories[categoryIndex].images.length;
        return (prev + 1) % max;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [categoryIndex]);

  return (
    <div className="min-h-screen bg-black">

      {/* BIGGER ANIMATED SLIDER */}
      <section className="relative h-[650px] overflow-hidden">

        <AnimatePresence mode="wait">
          <motion.div
            key={`${categoryIndex}-${imageIndex}`}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <img
              src={categories[categoryIndex].images[imageIndex]}
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-black/75 flex items-center justify-center">
              <div className="text-center max-w-4xl px-4">

                <motion.h1
                  key={categories[categoryIndex].heading}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-4xl md:text-5xl font-bold text-white mb-4"
                >
                  {categories[categoryIndex].heading}
                </motion.h1>

                <p className="text-gray-300 mb-6 text-lg">
                  {categories[categoryIndex].text}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-8 py-3"
                    asChild
                  >
                    <Link to={categories[categoryIndex].link}>
                      {categories[categoryIndex].button}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>

                  <Button
                    variant="outline"
                    className="border-white text-white"
                    asChild
                  >
                    <Link to="/contact">Contact Us</Link>
                  </Button>
                </div>

                {/* CATEGORY SWITCH */}
                <div className="flex justify-center gap-3 mt-8">
                  {categories.map((cat, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setCategoryIndex(i);
                        setImageIndex(0);
                      }}
                      className={`px-5 py-2 rounded-full text-sm transition ${
                        categoryIndex === i
                          ? "bg-blue-600 text-white"
                          : "bg-white/10 text-white"
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>

              </div>
            </div>
          </motion.div>
        </AnimatePresence>

      </section>

      {/* AMC PLANS SECTION */}
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
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="p-6 bg-black/70 rounded-2xl border border-white/10"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-blue-600/20 flex items-center justify-center">
                  <benefit.icon className="w-7 h-7 text-blue-400" />
                </div>

                <h3 className="text-lg font-bold text-white mb-2">
                  {benefit.title}
                </h3>

                <p className="text-gray-400 text-sm">
                  {benefit.description}
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
