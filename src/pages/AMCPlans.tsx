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
      {/* Hero Section */}
      <section className="py-20 md:py-28 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--primary-foreground)) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block px-4 py-1.5 rounded-full bg-primary-foreground/10 text-primary-foreground text-sm font-medium mb-6"
            >
              AMC Plans
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground mb-6"
            >
              Annual Maintenance Contracts
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-primary-foreground/70"
            >
              Protect your IT infrastructure with our comprehensive maintenance plans. Choose a plan that fits your needs.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
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
                    ? "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-glow scale-105"
                    : "bg-card border border-border shadow-lg"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-accent text-accent-foreground text-sm font-semibold">
                    Most Popular
                  </div>
                )}

                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                  plan.popular ? "bg-primary-foreground/20" : "bg-primary/10"
                }`}>
                  <plan.icon className={`w-8 h-8 ${plan.popular ? "text-primary-foreground" : "text-primary"}`} />
                </div>

                <h3 className="text-2xl font-display font-bold mb-2">{plan.name}</h3>
                <p className={`text-sm mb-6 ${plan.popular ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                  {plan.description}
                </p>

                <div className="mb-8">
                  <span className="text-5xl font-display font-bold">{plan.price}</span>
                  <span className={plan.popular ? "text-primary-foreground/70" : "text-muted-foreground"}>
                    {plan.period}
                  </span>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
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
                  <Link to="/register">
                    Subscribe Now
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-heading mb-4">Why Choose Our AMC Plans?</h2>
            <p className="section-subheading mx-auto">
              Our AMC plans are designed to give you complete peace of mind.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-6">
                  <benefit.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-display font-bold mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ CTA */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
            Have Questions?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Contact our team to learn more about our AMC plans and find the perfect fit for your needs.
          </p>
          <Button variant="gradient" size="lg" asChild>
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default AMCPlans;
