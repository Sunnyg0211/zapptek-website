import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Star, Quote, Cpu, Wifi, ShieldCheck, Laptop } from "lucide-react";

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

  // Auto slide logic (6 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 2) % caseStudies.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  // Get two testimonials at a time
  const visibleTestimonials = [
    caseStudies[index],
    caseStudies[(index + 1) % caseStudies.length],
  ];

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4">

        {/* HEADER */}
        <div className="text-center mb-10">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-3"
          >
            Success Stories
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold mb-2"
          >
            Real Results from Real Work
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Practical examples of how we solve IT challenges for businesses and individuals every day.
          </motion.p>
        </div>

        {/* SLIDER AREA */}
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
                  className="bg-card rounded-2xl p-6 shadow border border-border/50 relative"
                >
                  <div className="absolute -top-3 right-5 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <Quote className="w-4 h-4 text-white" />
                  </div>

                  {/* Stars */}
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-accent text-accent"
                      />
                    ))}
                  </div>

                  <h3 className="font-semibold mb-1 text-foreground">
                    {item.title}
                  </h3>

                  <p className="text-xs text-primary mb-2">
                    {item.category}
                  </p>

                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    “{item.content}”
                  </p>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground">
                        Delivered by ZappTek Experts
                      </p>
                      <p className="text-[11px] text-muted-foreground">
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
                onClick={() => setIndex(i * 2)}
                className={`h-2 rounded-full transition-all ${
                  index === i * 2
                    ? "bg-primary w-6"
                    : "bg-muted w-2"
                }`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
