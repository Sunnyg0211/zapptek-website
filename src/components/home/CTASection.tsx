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
    text: "Trained, experienced & background-checked professionals",
    link: "/services",
  },
  {
    icon: Clock,
    title: "Fast Response",
    text: "Quick on-site & remote support across locations",
    link: "/book-service",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    text: "Clear communication & regular follow-ups",
    link: "/contact",
  },
  {
    icon: Award,
    title: "Quality Guaranteed",
    text: "Reliable service with genuine parts assurance",
    link: "/amc-plans",
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

      {/* Soft Background Effects */}
      <motion.div
        className="absolute top-10 left-10 w-80 h-80 rounded-full bg-blue-200/20 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <motion.div
        className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-indigo-200/20 blur-3xl"
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6"
          >
            Reliable IT Support You Can Trust
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto"
          >
            Professional IT services for home users, offices, and businesses — delivered on-site and remotely with transparency and expertise.
          </motion.p>

          {/* CLICKABLE DARK CARDS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            {trustPoints.map((item, index) => (
              <Link key={index} to={item.link}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gray-900 text-white rounded-2xl p-6 text-left shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-800"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-600/20 flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-blue-400" />
                  </div>

                  <h4 className="font-semibold text-lg mb-2">
                    {item.title}
                  </h4>

                  <p className="text-sm text-gray-400">
                    {item.text}
                  </p>

                  <div className="mt-4 flex items-center text-blue-400 text-sm font-medium">
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </motion.div>
              </Link>
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
            <Button variant="gradient" size="xl" asChild>
              <Link to="/book-service">
                Book a Service
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>

            <Button variant="whatsapp" size="xl" asChild>
              <a
                href="https://wa.me/919793541467"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Chat on WhatsApp
              </a>
            </Button>

            <Button variant="outline" size="xl" asChild>
              <a href="tel:+919793541467">
                <Phone className="w-5 h-5 mr-2" />
                Call Now
              </a>
            </Button>
          </motion.div>

          {/* STATS */}
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
                className="text-center"
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
