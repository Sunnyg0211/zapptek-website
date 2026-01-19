import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Phone,
  MessageCircle,
  ShieldCheck,
  Clock,
  Headphones,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const trustPoints = [
  {
    icon: ShieldCheck,
    title: "Verified Technicians",
    text: "Trained & background-checked professionals",
  },
  {
    icon: Clock,
    title: "Fast Response",
    text: "Quick on-site & remote support",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    text: "Clear communication & follow-ups",
  },
  {
    icon: Award,
    title: "Quality Guaranteed",
    text: "Reliable service you can trust",
  },
];

const stats = [
  { value: "10+ Years", label: "Industry Experience" },
  { value: "5000+", label: "Devices Serviced" },
  { value: "24/7", label: "Support Availability" },
  { value: "98%", label: "Customer Satisfaction" },
];

export function CTASection() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-hero" />

      {/* Subtle Animated Blobs */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary/20 blur-3xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-accent/20 blur-3xl"
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* HEADING */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-primary-foreground mb-6"
          >
            Reliable IT Support When You Need It Most
          </motion.h2>

          {/* SUBHEADING */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-primary-foreground/70 mb-12 max-w-3xl mx-auto"
          >
            From home users to businesses, we provide fast, professional, and transparent IT services—
            on-site and remote—delivered by experienced technicians you can depend on.
          </motion.p>

          {/* TRUST POINTS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            {trustPoints.map((item, index) => (
              <div
                key={index}
                className="bg-primary-foreground/5 border border-primary-foreground/10 rounded-2xl p-5 text-left"
              >
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-3">
                  <item.icon className="w-5 h-5 text-accent" />
                </div>
                <h4 className="text-primary-foreground font-semibold mb-1">
                  {item.title}
                </h4>
                <p className="text-sm text-primary-foreground/70">
                  {item.text}
                </p>
              </div>
            ))}
          </motion.div>

          {/* CTA BUTTONS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Button variant="hero" size="xl" asChild>
              <Link to="/book-service">
                Book a Service
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>

            <Button variant="whatsapp" size="xl" asChild>
              <a
                href="https://wa.me/919793541467"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-5 h-5" />
                Chat on WhatsApp
              </a>
            </Button>

            <Button variant="outline-light" size="xl" asChild>
              <a href="tel:+919793541467">
                <Phone className="w-5 h-5" />
                Call Now
              </a>
            </Button>
          </motion.div>

          {/* STATS SECTION */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-primary-foreground/10"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-display font-bold text-accent mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-primary-foreground/60">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* FINAL TRUST LINE */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-10 text-sm text-primary-foreground/60"
          >
            Transparent pricing • Genuine spare parts • Professional service guarantee
          </motion.p>
        </div>
      </div>
    </section>
  );
}
