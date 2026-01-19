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
  },
  {
    icon: Laptop,
    title: "Laptop Service",
    description: "Screen replacement, keyboard repair, battery replacement, and more.",
  },
  {
    icon: Wifi,
    title: "Network Solutions",
    description: "WiFi setup, router configuration, and network troubleshooting.",
  },
  {
    icon: Camera,
    title: "CCTV Installation",
    description: "Professional CCTV camera installation and setup for security.",
  },
  {
    icon: HardDrive,
    title: "Data Recovery",
    description: "Recover lost data from hard drives, SSDs, and memory cards.",
  },
  {
    icon: Printer,
    title: "Printer Service",
    description: "Printer repair, cartridge refilling, and maintenance services.",
  },
  {
    icon: Server,
    title: "Server Management",
    description: "Server setup, maintenance, and cloud infrastructure solutions.",
  },
  {
    icon: Shield,
    title: "Virus Removal",
    description: "Malware removal, antivirus installation, and security hardening.",
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
    <section className="relative py-20 md:py-28 overflow-hidden">

      {/* Animated Black Gradient Background */}
      <motion.div
        className="absolute inset-0 -z-10"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          background:
            "linear-gradient(270deg, #000000, #0f0f0f, #1a1a1a, #050505)",
          backgroundSize: "400% 400%",
        }}
      />

      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white text-sm font-medium mb-4"
          >
            Our Services
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            Complete IT Solutions
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-300 mx-auto max-w-2xl"
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
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md hover:bg-black/60 transition-all duration-300 cursor-pointer group"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gray-700 to-black flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <service.icon className="w-7 h-7 text-white" />
              </div>

              <h3 className="text-lg font-semibold mb-2 text-white group-hover:text-gray-300 transition-colors">
                {service.title}
              </h3>

              <p className="text-gray-400 text-sm leading-relaxed">
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
          <motion.div whileHover={{ scale: 1.05 }}>
            <Button
              size="lg"
              asChild
              className="bg-gradient-to-r from-gray-700 to-black text-white border border-white/20"
            >
              <Link to="/services">
                View All Services
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
