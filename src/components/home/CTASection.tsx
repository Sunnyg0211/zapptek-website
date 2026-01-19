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
    <section className="py-20 md:py-28 relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">

      {/* Animated Light Effects */}
      <motion.div
        className="absolute top-10 left-10 w-96 h-96 rounded-full bg-blue-200/30 blur-3xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <motion.div
        className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-indigo-200/30 blur-3xl"
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      {/* Grid Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#000 1px, transparent 1px),
                           linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6"
          >
            Reliable IT Support When You Need It Most
          </motion.h2>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto"
          >
            From home users to enterprises – we deliver fast, professional, and transparent IT services
            with on-site and remote support from certified experts.
          </motion.p>

          {/* TRUST POINTS – Animated Hover Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            {trustPoints.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{
                  y: -8,
                  scale: 1.03,
                }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-white/80 backdrop-blur-lg border border-border rounded-2xl p-5 text-left shadow-md hover:shadow-xl transition-all group cursor-pointer"
              >
                <motion.div
                  whileHover={{ rotate: 6, scale: 1.1 }}
                  className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3"
                >
                  <item.icon className="w-5 h-5 text-primary" />
                </motion.div>

                <h4 className="text-foreground font-semibold mb-1 group-hover:tracking-wide transition-all">
                  {item.title}
                </h4>

                <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  {item.text}
                </p>
              </motion.div>
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
            <Button
              variant="gradient"
              size="xl"
              className="hover:shadow-[0_10px_40px_rgba(59,130,246,0.4)] transition-all"
              asChild
            >
              <Link to="/book-service">
                Book a Service
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>

            <Button
              variant="whatsapp"
              size="xl"
              className="hover:shadow-[0_10px_40px_rgba(37,211,102,0.4)] transition-all"
              asChild
            >
              <a
                href="https://wa.me/919793541467"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-5 h-5" />
                Chat on WhatsApp
              </a>
            </Button>

            <Button
              variant="outline"
              size="xl"
              className="hover:bg-primary hover:text-white transition-all"
              asChild
            >
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
            className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-border"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="text-center cursor-default"
              >
                <div className="text-3xl md:text-4xl font-display font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* FINAL TRUST LINE */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-10 text-sm text-muted-foreground"
          >
            Transparent pricing • Genuine spare parts • Professional service guarantee
          </motion.p>

        </div>
      </div>
    </section>
  );
}
