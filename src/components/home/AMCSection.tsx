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

      {/* LIGHT GRADIENT BLUR BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100" />

      <motion.div
        className="absolute top-10 left-10 w-96 h-96 rounded-full bg-blue-200/30 blur-3xl"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <motion.div
        className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-purple-200/30 blur-3xl"
        animate={{ scale: [1.1, 1, 1.1] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 relative z-10">

        {/* HEADER */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/10 text-black text-sm font-medium mb-4"
          >
            <Users className="w-4 h-4" />
            Smart AMC Plans
          </motion.span>

          <motion.h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">
            Professional IT Maintenance Plans
          </motion.h2>

          <p className="text-black/70 max-w-2xl mx-auto">
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
              className={`relative rounded-3xl p-8 backdrop-blur-lg border border-white/10 shadow-xl cursor-pointer ${
                plan.popular
                  ? "bg-black text-white"
                  : "bg-black/80 text-white"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-purple-500 text-white text-sm font-semibold">
                  Recommended
                </div>
              )}

              {/* ICON */}
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-4">
                <plan.icon className="w-7 h-7 text-white" />
              </div>

              <h3 className="text-xl font-bold mb-1">{plan.name}</h3>

              <div className="inline-block px-3 py-1 rounded-full text-xs mb-3 bg-white/10">
                Best for: {plan.audience}
              </div>

              <p className="text-sm text-white/70 mb-4">
                {plan.description}
              </p>

              {/* RESPONSE */}
              <div className="flex items-center gap-2 mb-4 text-sm text-white/80">
                <Clock className="w-4 h-4" />
                <span>{plan.response}</span>
              </div>

              {/* PRICE */}
              <div className="mb-6">
                {plan.price ? (
                  <>
                    <span className="text-4xl font-bold">
                      {plan.price}
                    </span>
                    <span className="text-white/60">
                      {plan.period}
                    </span>
                  </>
                ) : (
                  <>
                    <div className="text-2xl font-bold mb-1">
                      Custom Pricing
                    </div>
                    <div className="text-sm text-white/60">
                      {plan.note}
                    </div>
                  </>
                )}
              </div>

              {/* FEATURES */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm text-white/90">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA BUTTON */}
              {plan.price ? (
                <Button
                  className="w-full bg-white text-black hover:bg-gray-200"
                  size="lg"
                  asChild
                >
                  <Link to="/amc-plans">
                    Select {plan.name}
                  </Link>
                </Button>
              ) : (
                <Button
                  className="w-full bg-purple-500 text-white hover:bg-purple-600"
                  size="lg"
                  asChild
                >
                  <Link to={plan.ctaLink}>
                    {plan.ctaText}
                  </Link>
                </Button>
              )}

            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
