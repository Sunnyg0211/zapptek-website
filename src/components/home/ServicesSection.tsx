import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Monitor, 
  Laptop, 
  Wifi, 
  Camera, 
  HardDrive, 
  Printer,
  Server,
  Shield,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Monitor,
    title: "Desktop Repair",
    description: "Complete desktop computer repair, upgrade, and maintenance services.",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Laptop,
    title: "Laptop Service",
    description: "Screen replacement, keyboard repair, battery replacement, and more.",
    color: "from-cyan-500 to-cyan-600",
  },
  {
    icon: Wifi,
    title: "Network Solutions",
    description: "WiFi setup, router configuration, and network troubleshooting.",
    color: "from-indigo-500 to-indigo-600",
  },
  {
    icon: Camera,
    title: "CCTV Installation",
    description: "Professional CCTV camera installation and setup for security.",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: HardDrive,
    title: "Data Recovery",
    description: "Recover lost data from hard drives, SSDs, and memory cards.",
    color: "from-pink-500 to-pink-600",
  },
  {
    icon: Printer,
    title: "Printer Service",
    description: "Printer repair, cartridge refilling, and maintenance services.",
    color: "from-orange-500 to-orange-600",
  },
  {
    icon: Server,
    title: "Server Management",
    description: "Server setup, maintenance, and cloud infrastructure solutions.",
    color: "from-teal-500 to-teal-600",
  },
  {
    icon: Shield,
    title: "Virus Removal",
    description: "Malware removal, antivirus installation, and security hardening.",
    color: "from-red-500 to-red-600",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export function ServicesSection() {
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
            Our Services
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-heading mb-4"
          >
            Complete IT Solutions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="section-subheading mx-auto"
          >
            From repairs to installations, we provide comprehensive IT services tailored to your needs.
          </motion.p>
        </div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="service-card group cursor-pointer"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-display font-semibold mb-2 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button variant="gradient" size="lg" asChild>
            <Link to="/services">
              View All Services
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
