import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Check, Star, Zap, Crown, Users, Home, Building2, Clock } from "lucide-react";
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
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        
        {/* HEADER */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4"
          >
            <Users className="w-4 h-4" />
            Smart AMC Plans
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-heading mb-4"
          >
            IT Maintenance for Every Need
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="section-subheading mx-auto"
          >
            Reliable, proactive and cost-effective IT support plans designed for
            individuals, small businesses and large enterprises.
          </motion.p>
        </div>

        {/* PLANS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative rounded-3xl p-8 ${
                plan.popular
                  ? "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-glow"
                  : "bg-card border border-border shadow-lg"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-accent text-accent-foreground text-sm font-semibold">
                  Recommended
                </div>
              )}

              {/* ICON */}
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${
                  plan.popular ? "bg-primary-foreground/20" : "bg-primary/10"
                }`}
              >
                <plan.icon
                  className={`w-7 h-7 ${
                    plan.popular ? "text-primary-foreground" : "text-primary"
                  }`}
                />
              </div>

              {/* NAME */}
              <h3 className="text-xl font-display font-bold mb-1">
                {plan.name}
              </h3>

              {/* TARGET AUDIENCE */}
              <div
                className={`inline-block px-3 py-1 rounded-full text-xs mb-3 ${
                  plan.popular
                    ? "bg-primary-foreground/20 text-primary-foreground"
                    : "bg-accent/10 text-accent"
                }`}
              >
                Best for: {plan.audience}
              </div>

              <p
                className={`text-sm mb-4 ${
                  plan.popular
                    ? "text-primary-foreground/70"
                    : "text-muted-foreground"
                }`}
              >
                {plan.description}
              </p>

              {/* RESPONSE TIME */}
              <div className="flex items-center gap-2 mb-4 text-sm">
                <Clock className="w-4 h-4" />
                <span>{plan.response}</span>
              </div>

              {/* PRICE BLOCK */}
              <div className="mb-6">
                {plan.price ? (
                  <>
                    <span className="text-4xl font-display font-bold">
                      {plan.price}
                    </span>
                    <span
                      className={
                        plan.popular
                          ? "text-primary-foreground/70"
                          : "text-muted-foreground"
                      }
                    >
                      {plan.period}
                    </span>
                  </>
                ) : (
                  <>
                    <div className="text-2xl font-display font-bold text-primary mb-1">
                      Custom Pricing
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {plan.note}
                    </div>
                  </>
                )}
              </div>

              {/* FEATURES */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center ${
                        plan.popular
                          ? "bg-primary-foreground/20"
                          : "bg-primary/10"
                      }`}
                    >
                      <Check
                        className={`w-3 h-3 ${
                          plan.popular
                            ? "text-primary-foreground"
                            : "text-primary"
                        }`}
                      />
                    </div>
                    <span
                      className={`text-sm ${
                        plan.popular
                          ? "text-primary-foreground/90"
                          : "text-foreground"
                      }`}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              {plan.price ? (
                <Button
                  variant={plan.popular ? "outline-light" : "gradient"}
                  className="w-full"
                  size="lg"
                  asChild
                >
                  <Link to="/amc-plans">Select {plan.name}</Link>
                </Button>
              ) : (
                <Button variant="gradient" className="w-full" size="lg" asChild>
                  <Link to={plan.ctaLink}>{plan.ctaText}</Link>
                </Button>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
