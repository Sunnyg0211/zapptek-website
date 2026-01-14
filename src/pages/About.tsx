import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Users, Award, Clock, MapPin, ArrowRight, Zap, Target, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { value: "15+", label: "Years Experience" },
  { value: "5000+", label: "Happy Customers" },
  { value: "50+", label: "Expert Technicians" },
  { value: "24/7", label: "Support Available" },
];

const values = [
  {
    icon: Target,
    title: "Customer First",
    description: "We prioritize our customers' needs and work tirelessly to exceed expectations.",
  },
  {
    icon: Award,
    title: "Quality Service",
    description: "We deliver top-notch service with attention to detail and professional expertise.",
  },
  {
    icon: Heart,
    title: "Trust & Integrity",
    description: "Honesty and transparency are at the core of everything we do.",
  },
];

const team = [
  {
    name: "Vikram Sharma",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=faces",
  },
  {
    name: "Priya Patel",
    role: "Technical Director",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=faces",
  },
  {
    name: "Rajesh Kumar",
    role: "Operations Manager",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=faces",
  },
  {
    name: "Anjali Verma",
    role: "Customer Success Lead",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=faces",
  },
];

const About = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 md:py-28 gradient-hero relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center gap-2 mb-6"
            >
              <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center">
                <Zap className="w-7 h-7 text-primary-foreground" />
              </div>
              <span className="text-2xl font-display font-bold text-primary-foreground">ZappTek</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground mb-6"
            >
              About Us
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-primary-foreground/70"
            >
              Your trusted partner for comprehensive IT solutions since 2009. We're dedicated to keeping your technology running smoothly.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-display font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Our Story
              </span>
              <h2 className="section-heading mb-6">Building Technology Trust</h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="prose prose-lg mx-auto text-muted-foreground"
            >
              <p>
                Founded in 2009, ZappTek started as a small computer repair shop in Bangalore with a simple mission: to provide honest, reliable, and affordable IT services to everyone.
              </p>
              <p>
                Over the years, we've grown from a two-person team to a company with over 50 expert technicians serving thousands of customers across the city. Our commitment to quality service and customer satisfaction has remained unchanged.
              </p>
              <p>
                Today, we offer comprehensive IT solutions for homes and businesses, from basic computer repairs to complete network infrastructure setup. We take pride in our quick response times, transparent pricing, and skilled technicians who treat every device as if it were their own.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
              Our Values
            </span>
            <h2 className="section-heading mb-4">What Drives Us</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-display font-bold mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Our Team
            </span>
            <h2 className="section-heading mb-4">Meet the Experts</h2>
            <p className="section-subheading mx-auto">
              Our leadership team brings decades of combined experience in IT services.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 md:w-32 md:h-32 rounded-2xl object-cover mx-auto mb-4 ring-4 ring-primary/10"
                />
                <h4 className="font-display font-semibold">{member.name}</h4>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
            Ready to Experience ZappTek?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Join thousands of satisfied customers who trust us with their IT needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="gradient" size="lg" asChild>
              <Link to="/book-service">
                Book a Service
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
