import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Check, Star, Zap, Crown, ArrowRight, Shield, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  return (
    <div className="min-h-screen">

      {/* HERO SECTION */}
      <section className="relative py-20 md:py-28 overflow-hidden">

        {/* Animated Black Background */}
        <motion.div
          className="absolute inset-0 -z-10"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            background:
              "linear-gradient(270deg, #000000, #0f0f0f, #1a1a1a, #050505)",
            backgroundSize: "400% 400%",
          }}
        />

        <div className="container mx-auto px-4 text-center relative z-10">

          <motion.span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white text-sm mb-4">
            AMC Plans
          </motion.span>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Annual Maintenance Contracts
          </h1>

          <p className="text-gray-300 max-w-2xl mx-auto">
            Protect your IT infrastructure with our comprehensive maintenance plans.
          </p>
        </div>
      </section>

      {/* PLANS SECTION */}
      <section className="py-20">
        <div className="container mx-auto px-4">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.03 }}
                className={`p-8 rounded-3xl border border-white/10 backdrop-blur-md ${
                  plan.popular ? "bg-black/90" : "bg-black/70"
                }`}
              >
                {plan.popular && (
                  <div className="mb-3 text-center">
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
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-300 text-sm">
                      <Check className="w-4 h-4 text-blue-400" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white hover:from-blue-500 hover:to-blue-700"
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

      {/* BENEFITS SECTION */}
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

      {/* CTA */}
      <section className="py-16 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
          Have Questions?
        </h2>

        <p className="text-gray-400 mb-6 max-w-xl mx-auto">
          Contact our team to learn more about our AMC plans.
        </p>

        <Button
          className="bg-gradient-to-r from-blue-600 to-blue-800 text-white hover:from-blue-500 hover:to-blue-700"
          asChild
        >
          <Link to="/contact">Contact Us</Link>
        </Button>
      </section>

    </div>
  );
};

export default AMCPlans;
