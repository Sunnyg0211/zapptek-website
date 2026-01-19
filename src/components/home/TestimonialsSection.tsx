import { motion } from "framer-motion";
import { Star, Quote, Cpu, Wifi, ShieldCheck, Laptop } from "lucide-react";

const caseStudies = [
  {
    title: "Office Network Revival",
    category: "Corporate IT Support",
    content:
      "A growing startup faced constant network downtime and slow systems. We restructured their office network, optimized devices, and implemented security measures. Productivity increased and downtime reduced by over 90%.",
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
      "Through our annual maintenance plan, a small company avoided multiple system failures, received regular health checks, and enjoyed uninterrupted IT operations all year long.",
    icon: ShieldCheck,
  },
  {
    title: "Laptop Repair Turnaround",
    category: "Home User Support",
    content:
      "A professional needed urgent laptop repair before an important presentation. We diagnosed, repaired, and delivered the device the same day—saving valuable time and stress.",
    icon: Laptop,
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">

        {/* HEADER */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
          >
            Success Stories
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-heading mb-4"
          >
            Real Results, Real Impact
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="section-subheading mx-auto"
          >
            Practical examples of how we solve IT problems for businesses and individuals every day.
          </motion.p>
        </div>

        {/* CASE STUDIES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {caseStudies.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative bg-card rounded-3xl p-8 shadow-lg border border-border/50"
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 right-8 w-10 h-10 rounded-full gradient-bg flex items-center justify-center">
                <Quote className="w-5 h-5 text-primary-foreground" />
              </div>

              {/* Rating (Static Trust Indicator) */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold mb-2 text-foreground">
                {item.title}
              </h3>

              <p className="text-sm text-primary mb-3">
                {item.category}
              </p>

              <p className="text-foreground/80 mb-6 leading-relaxed">
                “{item.content}”
              </p>

              {/* Icon Footer */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center ring-2 ring-primary/20">
                  <item.icon className="w-6 h-6" />
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    Delivered by ZappTek Experts
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Trusted IT Solutions
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
