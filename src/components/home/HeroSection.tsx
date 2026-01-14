import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Clock, Headphones, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  { icon: Shield, text: "Certified Experts" },
  { icon: Clock, text: "24/7 Support" },
  { icon: Headphones, text: "Remote Help" },
];

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-hero" />
      
      {/* Animated Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary/20 blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 -left-40 w-80 h-80 rounded-full bg-accent/20 blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--primary-foreground)) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--primary-foreground)) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 mb-8"
          >
            <Zap className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-primary-foreground">
              Trusted by 5000+ Customers
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-7xl font-display font-bold text-primary-foreground mb-6 leading-tight"
          >
            Expert IT Services
            <br />
            <span className="text-accent">At Your Doorstep</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-primary-foreground/70 mb-8 max-w-2xl"
          >
            From computer repairs to network solutions, we provide comprehensive IT services for homes and businesses. Fast, reliable, and affordable.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mb-12"
          >
            <Button variant="hero" size="lg" asChild>
              <Link to="/book-service">
                Book a Service
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant="outline-light" size="lg" asChild>
              <Link to="/services">Explore Services</Link>
            </Button>
          </motion.div>

          {/* Feature Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap gap-4"
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/5 border border-primary-foreground/10"
              >
                <feature.icon className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium text-primary-foreground/80">
                  {feature.text}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Floating Tech Elements */}
      <div className="hidden lg:block absolute right-10 top-1/2 -translate-y-1/2">
        <motion.div
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative"
        >
          <div className="w-64 h-64 rounded-3xl glass-card p-6 shadow-2xl">
            <div className="w-full h-full rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <Zap className="w-20 h-20 text-accent" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
