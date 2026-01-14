import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-hero" />
      
      {/* Animated Elements */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary/20 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-accent/20 blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-primary-foreground mb-6"
          >
            Need Immediate IT Support?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-primary-foreground/70 mb-10 max-w-2xl mx-auto"
          >
            Our expert technicians are ready to help you 24/7. Book a service online or contact us directly for urgent support.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button variant="hero" size="xl" asChild>
              <Link to="/book-service">
                Book a Service
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant="whatsapp" size="xl" asChild>
              <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5" />
                WhatsApp Us
              </a>
            </Button>
            <Button variant="outline-light" size="xl" asChild>
              <a href="tel:+919876543210">
                <Phone className="w-5 h-5" />
                Call Now
              </a>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-primary-foreground/10"
          >
            {[
              { value: "5000+", label: "Happy Customers" },
              { value: "15+", label: "Years Experience" },
              { value: "24/7", label: "Support Available" },
              { value: "98%", label: "Satisfaction Rate" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-display font-bold text-accent mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-primary-foreground/60">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
