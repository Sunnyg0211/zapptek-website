import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Star,
  Quote,
  Cpu,
  Wifi,
  ShieldCheck,
  Laptop,
  ArrowRight,
} from "lucide-react";

const caseStudies = [
  {
    title: "Office Network Revival",
    category: "Corporate IT Support",
    content:
      "A growing startup faced constant network downtime and slow systems. We restructured their office network and optimized devices.",
    icon: Wifi,
  },
  {
    title: "Critical Data Recovery",
    category: "Emergency IT Services",
    content:
      "Recovered 100% critical files from crashed hard disk and restored business operations within hours.",
    icon: Cpu,
  },
  {
    title: "Complete IT Maintenance",
    category: "AMC Success Story",
    content:
      "Through our AMC plan, company avoided failures and received regular system health checks.",
    icon: ShieldCheck,
  },
  {
    title: "Laptop Repair Turnaround",
    category: "Home User Support",
    content:
      "Urgent laptop repair delivered same day before client’s important meeting.",
    icon: Laptop,
  },
  {
    title: "Security Upgrade Project",
    category: "Business Protection",
    content:
      "Installed security solutions and backup systems protecting from cyber threats.",
    icon: ShieldCheck,
  },
  {
    title: "Printer & Device Setup",
    category: "Office Solutions",
    content:
      "Configured multiple devices across departments with full network setup.",
    icon: Wifi,
  },
];

export function TestimonialsSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 2) % caseStudies.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const visibleTestimonials = [
    caseStudies[index],
    caseStudies[(index + 1) % caseStudies.length],
  ];

  return (
    <section className="relative py-16 md:py-20 overflow-hidden">
      {/* Animated Background */}
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
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-block px-3 py-1 rounded-full bg-blue-600/20 text-blue-400 text-sm font-medium mb-3">
            Success Stories
          </span>

          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-white">
            Client Testimonials
          </h2>

          <p className="text-gray-300 max-w-2xl mx-auto">
            Real IT problems. Real solutions. Real results.
          </p>
        </div>

        {/* Slider */}
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {visibleTestimonials.map((item, i) => (
                <div
                  key={i}
                  className="bg-black/70 backdrop-blur-lg rounded-2xl p-6 border border-white/10 relative shadow-xl"
                >
                  <div className="absolute -top-3 right-5 w-8 h-8 rounded-full bg-blue-600/20 flex items-center justify-center">
                    <Quote className="w-4 h-4 text-blue-400" />
                  </div>

                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>

                  <h3 className="font-semibold mb-1 text-white">
                    {item.title}
                  </h3>

                  <p className="text-xs text-gray-400 mb-2">
                    {item.category}
                  </p>

                  <p className="text-sm text-gray-300 mb-4 leading-relaxed">
                    “{item.content}”
                  </p>

                  {/* CTA (NO VIDEO) */}
                  <button
                    className="group flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm font-medium"
                  >
                    View Case Study
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
