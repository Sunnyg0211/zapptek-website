import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Check,
  Home,
  Building2,
  Crown,
  Users,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Basic Care",
    icon: Home,
    audience: "Home Users",
    price: "₹2,499",
    period: "/year",
    description: "Essential maintenance for personal computers & laptops",
    response: "48 Hours Response",
    features: [
      "7 On-Site Service Visits",
      "Remote Technical Support",
      "OS & Software Updates",
      "Performance Optimization",
      "Virus & Malware Cleanup",
      "Email Support",
    ],
    popular: false,
  },
  {
    name: "Professional Plus",
    icon: Building2,
    audience: "Small Business",
    price: "₹4,499",
    period: "/year",
    description: "Complete IT support plan for startups & small offices",
    response: "24 Hours Response",
    features: [
      "12 On-Site Service Visits",
      "Priority Remote Support",
      "Hardware Cleaning & Checkups",
      "Network Troubleshooting",
      "Security & Backup Setup",
      "Phone & Email Support",
      "10% Discount on Spare Parts",
    ],
    popular: true,
  },
  {
    name: "Enterprise AMC",
    icon: Crown,
    audience: "Corporate & Bulk",
    price: null,
    period: null,
    description: "Fully customized IT maintenance for organizations",
    response: "Same Day Response",
    ctaText: "Request Enterprise Quote",
    ctaLink: "/contact",
    note: "Tailored plans based on devices, users & locations",
    features: [
      "Unlimited On-Site Support",
      "24/7 Priority Assistance",
      "Dedicated Account Manager",
      "Network & Server Management",
      "Custom SLA Agreements",
      "Multi-Location Support",
      "IT Asset Management",
      "Preventive Maintenance",
    ],
    popular: false,
  },
];

export function AMCSection() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">

      {/* ANIMATED DARK BACKGROUND */}
      <motion.div
        className="absolute inset-0 -z-10"
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        style={{
          background:
            "linear-gradient(270deg, #000000, #0f0f0f, #1a1a1a, #050505)",
          backgroundSize: "400% 400%",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">

        {/* HEADER */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600/20 text-blue-400 text-sm font-medium mb-4"
          >
            <Users className="w-4 h-4 text-blue-400" />
            Smart AMC Plans
          </motion.span>

          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Professional IT Maintenance Plans
          </h2>

          <p className="text-gray-300 max-w-2xl mx-auto">
            Affordable, reliable and proactive IT support packages designed for
            homes, offices and enterprises.
          </p>
        </div>

        {/* PLANS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="relative rounded-3xl p-8 bg-black/80 backdrop-blur-lg border border-white/10 shadow-xl"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-blue-600 text-white text-sm font-semibold shadow-lg">
                  Recommended
                </div>
              )}

              {/* ICON */}
              <div className="w-14 h-14 rounded-2xl bg-blue-600/20 flex items-center justify-center mb-4">
                <plan.icon className="w-7 h-7 text-blue-400" />
              </div>

              <h3 className="text-xl font-bold mb-1 text-white">
                {plan.name}
              </h3>

              <div className="inline-block px-3 py-1 rounded-full text-xs mb-3 bg-blue-600/20 text-blue-400">
                Best for: {plan.audience}
              </div>

              <p className="text-sm text-gray-300 mb-4">
                {plan.description}
              </p>

              {/* RESPONSE */}
              <div className="flex items-center gap-2 mb-4 text-sm text-gray-300">
                <Clock className="w-4 h-4 text-blue-400" />
                <span>{plan.response}</span>
              </div>

              {/* PRICE */}
              <div className="mb-6">
                {plan.price ? (
                  <>
                    <span className="text-4xl font-bold text-white">
                      {plan.price}
                    </span>
                    <span className="text-gray-400">{plan.period}</span>
                  </>
                ) : (
                  <>
                    <div className="text-2xl font-bold mb-1 text-white">
                      Custom Pricing
                    </div>
                    <div className="text-sm text-gray-400">
                      {plan.note}
                    </div>
                  </>
                )}
              </div>

              {/* FEATURES */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-blue-600/20 flex items-center justify-center">
                      <Check className="w-3 h-3 text-blue-400" />
                    </div>
                    <span className="text-sm text-gray-300">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white hover:from-blue-500 hover:to-blue-700 transition-all"
                size="lg"
                asChild
              >
                <Link to={plan.ctaLink || "/amc-plans"}>
                  {plan.ctaText || `Select ${plan.name}`}
                </Link>
              </Button>

            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
