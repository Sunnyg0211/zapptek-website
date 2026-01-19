import { motion } from "framer-motion";
import { Star, Quote, User } from "lucide-react";

const testimonials = [
  {
    name: "Rajesh Kumar",
    role: "Business Owner",
    content:
      "ZappTek saved my business when our server crashed. Their 24/7 support and quick response time is unmatched. Highly recommended!",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "Freelance Designer",
    content:
      "Professional, affordable, and reliable. They fixed my MacBook in just 2 hours. The AMC plan is a great value for money.",
    rating: 5,
  },
  {
    name: "Amit Patel",
    role: "IT Manager",
    content:
      "We've been using ZappTek for our office network and CCTV setup. Their enterprise plan is perfect for businesses like ours.",
    rating: 5,
  },
];

// Get initials
const getInitials = (name) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

export function TestimonialsSection() {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
          >
            Testimonials
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-heading mb-4"
          >
            What Our Customers Say
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="section-subheading mx-auto"
          >
            Don’t just take our word for it. Here’s what our customers say about ZappTek.
          </motion.p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
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

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>

              {/* Content */}
              <p className="text-foreground/80 mb-6 leading-relaxed">
                “{testimonial.content}”
              </p>

              {/* Author (No Photo) */}
              <div className="flex items-center gap-4">
                {/* Initials Avatar */}
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center ring-2 ring-primary/20">
                  {getInitials(testimonial.name)}
                </div>

                <div>
                  <h4 className="font-semibold text-foreground">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
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
