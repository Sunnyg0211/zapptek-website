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
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Animated Dark Background */}
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
        <div className="max-w-5xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6"
          >
            Reliable IT Support You Can Trust
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-gray-300 mb-12 max-w-3xl mx-auto"
          >
            Professional IT services for home users, offices, and businesses —
            delivered on-site and remotely with transparency and expertise.
          </motion.p>

          {/* TRUST CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {trustPoints.map((item, index) => (
              <Link key={index} to={item.link}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-black/60 border border-white/10 rounded-2xl p-6 text-left shadow-lg hover:shadow-2xl transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-600/20 flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-blue-500" />
                  </div>

                  <h4 className="font-semibold text-lg mb-2 text-white">
                    {item.title}
                  </h4>

                  <p className="text-sm text-gray-400">{item.text}</p>

                  <div className="mt-4 flex items-center text-blue-500 text-sm font-medium">
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2 text-blue-500" />
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>

          {/* CTA BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              size="xl"
              asChild
              className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 text-white"
            >
              <Link to="/book-service">
                Book a Service
                <ArrowRight className="w-5 h-5 ml-2 text-white" />
              </Link>
            </Button>

            <Button
              size="xl"
              asChild
              className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 text-white"
            >
              <a
                href="https://wa.me/919793541467"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-5 h-5 mr-2 text-white" />
                Chat on WhatsApp
              </a>
            </Button>

            <Button
              size="xl"
              asChild
              className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 text-white"
            >
              <a href="tel:+919793541467">
                <Phone className="w-5 h-5 mr-2 text-white" />
                Call Now
              </a>
            </Button>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-white/10">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-blue-500 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <p className="mt-10 text-sm text-gray-500">
            Transparent pricing • Genuine spare parts • Professional service guarantee
          </p>
        </div>
      </div>
    </section>
  );
}
