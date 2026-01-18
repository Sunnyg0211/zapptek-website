import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Check, Star, Zap, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Basic",
    icon: Zap,
    price: "₹2,499",
    period: "/year",
    description: "Perfect for home users",
    features: [
      "7 Service Visits",
      "Remote Support",
      "Software Updates",
      "Basic Maintenance",
      "Email Support",
    ],
    popular: false,
  },
  {
    name: "Professional",
    icon: Star,
    price: "₹4,499",
    period: "/year",
    description: "Ideal for small businesses",
    features: [
      " Service Visits" 12,
      "Priority Remote Support",
      "Software & Security Updates",
      "Hardware Cleaning",
      "Phone & Email Support",
      "10% Discount on Parts",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    icon: Crown,
    price: "₹12,999",
    period: "/year",
    description: "For growing businesses",
    features: [
      "Unlimited Service Visits",
      "24/7 Priority Support",
      "Complete Maintenance",
      "Network Management",
      "Dedicated Account Manager",
      "20% Discount on Parts",
      "Free Data Backup",
    ],
    popular: false,
  },
];
export function AMCSection() {
  return (
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4"
          >
            AMC Plans
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-heading mb-4"
          >
            Annual Maintenance Contracts
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="section-subheading mx-auto"
          >
            Choose a plan that fits your needs and enjoy hassle-free IT maintenance all year round.
          </motion.p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
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
                  Most Popular
                </div>
              )}

              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
                plan.popular ? "bg-primary-foreground/20" : "bg-primary/10"
              }`}>
                <plan.icon className={`w-7 h-7 ${plan.popular ? "text-primary-foreground" : "text-primary"}`} />
              </div>

              <h3 className="text-xl font-display font-bold mb-2">{plan.name}</h3>
              <p className={`text-sm mb-6 ${plan.popular ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                {plan.description}
              </p>

              <div className="mb-6">
                <span className="text-4xl font-display font-bold">{plan.price}</span>
                <span className={plan.popular ? "text-primary-foreground/70" : "text-muted-foreground"}>
                  {plan.period}
                </span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      plan.popular ? "bg-primary-foreground/20" : "bg-primary/10"
                    }`}>
                      <Check className={`w-3 h-3 ${plan.popular ? "text-primary-foreground" : "text-primary"}`} />
                    </div>
                    <span className={`text-sm ${plan.popular ? "text-primary-foreground/90" : "text-foreground"}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.popular ? "outline-light" : "gradient"}
                className="w-full"
                size="lg"
                asChild
              >
                <Link to="/amc-plans">Choose {plan.name}</Link>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
