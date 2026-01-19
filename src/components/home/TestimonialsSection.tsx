import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Star, Quote, Cpu, Wifi, ShieldCheck, Laptop } from "lucide-react";

const backgrounds = [
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=800&fit=crop",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=800&fit=crop",
  "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1200&h=800&fit=crop",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&h=800&fit=crop"
];

const caseStudies = [
  {
    title: "Office Network Revival",
    category: "Corporate IT Support",
    content:
      "A growing startup faced constant network downtime and slow systems. We restructured their office network and optimized devices. Productivity increased and downtime reduced by over 90%.",
    icon: Wifi,
  },
  {
    title: "Critical Data Recovery",
    category: "Emergency IT Services",
    content:
      "A local business lost access to important accounting data due to hardware failure. Our technicians recovered 100% of their critical files and restored operations within hours.",
    icon: Cpu,
  },
  {
    title: "Complete IT Maintenance",
    category: "AMC Success Story",
    content:
      "Through our annual maintenance plan, a small company avoided system failures and received regular health checks, ensuring smooth operations all year.",
    icon: ShieldCheck,
  },
  {
    title: "Laptop Repair Turnaround",
    category: "Home User Support",
    content:
      "A professional needed urgent laptop repair before an important meeting. We diagnosed and repaired the device same day, saving valuable time.",
    icon: Laptop,
  },
  {
    title: "Security Upgrade Project",
    category: "Business Protection",
    content:
      "Implemented antivirus, firewall and backup solutions for a small office, protecting them from cyber threats and data loss.",
    icon: ShieldCheck,
  },
  {
    title: "Printer & Device Setup",
    category: "Office Solutions",
    content:
      "Installed and configured multiple printers and devices across departments with full network integration and support.",
    icon: Wifi,
  },
];

export function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 2) % caseStudies.length);
      setBgIndex((prev) => (prev + 1) % backgrounds.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const visibleTestimonials = [
    caseStudies[index],
    caseStudies[(index + 1) % caseStudies.length],
  ];

  return (
    <section className="relative py-16 md:py-20 overflow-hidden">

      {/* ===== BLURRED BACKGROUND IMAGE ===== */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.img
            key={bgIndex}
            src={backgrounds[bgIndex]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="w-full h-full object-cover blur-xl scale-110"
            alt="IT Background"
          />
        </AnimatePresence>

        {/* Color Overlay - keeps consistent theme */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-indigo-900/70 to-purple-900/70" />
      </div>

      <div className="container mx-auto px-4 relative z-10">

        {/* HEADER */}
        <div className="text-center mb-10">
          <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-white text-sm font-medium mb-3">
            Success Stories
          </span>

          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-white">
            Real Results from Real Work
          </h2>

          <p className="text-white/80 max-w-2xl mx-auto">
            Practical examples of how we solve IT challenges for businesses and individuals every day.
          </p>
        </div>

        {/* TESTIMONIAL SLIDER */}
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
                  className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 relative shadow-lg"
                >
                  <div className="absolute -top-3 right-5 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <Quote className="w-4 h-4 text-white" />
                  </div>

                  {/* Stars */}
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

                  <p className="text-xs text-white/70 mb-2">
                    {item.category}
                  </p>

                  <p className="text-sm text-white/80 mb-4 leading-relaxed">
                    “{item.content}”
                  </p>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-white" />
                    </div>

                    <div>
                      <p className="text-xs text-white/70">
                        Delivered by ZappTek Experts
                      </p>
                      <p className="text-[11px] text-white/60">
                        Professional IT Solutions
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* DOT INDICATORS */}
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: caseStudies.length / 2 }).map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setIndex(i * 2);
                  setBgIndex(i % backgrounds.length);
                }}
                className={`h-2 rounded-full transition-all ${
                  index === i * 2
                    ? "bg-white w-6"
                    : "bg-white/50 w-2"
                }`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
