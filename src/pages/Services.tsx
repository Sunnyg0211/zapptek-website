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
  Cpu,
  Database,
  Cloud,
  Wrench,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Monitor,
    title: "Desktop Repair",
    description: "Complete desktop computer repair including hardware diagnostics, OS installation, and performance optimization.",
    features: ["Hardware Diagnostics", "Component Replacement", "OS Installation", "Performance Tuning"],
  },
  {
    icon: Laptop,
    title: "Laptop Service",
    description: "Expert laptop repair services including screen replacement, battery replacement, and motherboard repair.",
    features: ["Screen Replacement", "Keyboard Repair", "Battery Replacement", "Motherboard Repair"],
  },
  {
    icon: Wifi,
    title: "Network Solutions",
    description: "Professional networking services from WiFi setup to enterprise network infrastructure.",
    features: ["WiFi Setup", "Router Configuration", "Network Security", "Enterprise Solutions"],
  },
  {
    icon: Camera,
    title: "CCTV Installation",
    description: "Complete CCTV security solutions including installation, remote monitoring and maintenance.",
    features: ["Camera Setup", "DVR/NVR Setup", "Remote Viewing", "24/7 Monitoring"],
  },
  {
    icon: HardDrive,
    title: "Data Recovery",
    description: "Professional data recovery from damaged or corrupted storage devices.",
    features: ["HDD Recovery", "SSD Recovery", "Memory Card Recovery", "RAID Recovery"],
  },
  {
    icon: Printer,
    title: "Printer Service",
    description: "Complete printer maintenance including cartridge refilling and driver setup.",
    features: ["Cartridge Refill", "Head Cleaning", "Paper Jam Fix", "Driver Setup"],
  },
  {
    icon: Server,
    title: "Server Management",
    description: "Enterprise server solutions including setup, maintenance and cloud migration.",
    features: ["Server Setup", "Backup Solutions", "Security Hardening", "Cloud Migration"],
  },
  {
    icon: Shield,
    title: "Virus Removal",
    description: "Complete malware removal and security services.",
    features: ["Malware Removal", "Antivirus Setup", "Security Audit", "System Cleanup"],
  },
  {
    icon: Cpu,
    title: "Hardware Upgrades",
    description: "Upgrade your system with latest components for better performance.",
    features: ["RAM Upgrade", "SSD Installation", "GPU Upgrade", "CPU Upgrade"],
  },
  {
    icon: Database,
    title: "Software Solutions",
    description: "Custom software installation and troubleshooting services.",
    features: ["Installation", "Licensing", "Configuration", "Troubleshooting"],
  },
  {
    icon: Cloud,
    title: "Cloud Services",
    description: "Cloud infrastructure setup and configuration services.",
    features: ["Office 365 Setup", "Google Workspace", "AWS/Azure", "Cloud Backup"],
  },
  {
    icon: Wrench,
    title: "Preventive Maintenance",
    description: "Regular maintenance services to prevent system failures.",
    features: ["System Cleaning", "Health Checks", "Updates", "Optimization"],
  },
];

const Services = () => {
  return (
    <div className="min-h-screen bg-black">

      {/* HERO SECTION */}
      <section className="relative py-24 md:py-32 overflow-hidden">

        <motion.div
          className="absolute inset-0 -z-10"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            background:
              "linear-gradient(270deg, #000000, #0f0f0f, #1a1a1a, #050505)",
            backgroundSize: "400% 400%",
          }}
        />

        <div className="container mx-auto px-4 text-center relative z-10">

          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white text-sm mb-6"
          >
            Our Services
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Comprehensive IT Solutions
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-300 max-w-2xl mx-auto mb-8"
          >
            From quick repairs to complete IT infrastructure, we've got you covered with expert solutions for all your technology needs.
          </motion.p>

          <Button
            className="bg-gradient-to-r from-blue-600 to-blue-800 text-white"
            asChild
          >
            <Link to="/book-service">
              Book a Service
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>

        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="py-20">
        <div className="container mx-auto px-4">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03 }}
                className="bg-black/70 backdrop-blur-md border border-white/10 rounded-2xl p-6 transition-all"
              >

                <div className="w-14 h-14 bg-blue-600/20 rounded-xl flex items-center justify-center mb-4">
                  <service.icon className="w-7 h-7 text-blue-400" />
                </div>

                <h3 className="text-xl font-bold text-white mb-2">
                  {service.title}
                </h3>

                <p className="text-gray-400 mb-4 text-sm">
                  {service.description}
                </p>

                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-300 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white"
                  asChild
                >
                  <Link to="/book-service">
                    Book This Service
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>

              </motion.div>
            ))}

          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-16 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Need Custom IT Solutions?
        </h2>

        <p className="text-gray-400 mb-6 max-w-xl mx-auto">
          Contact us for business-specific IT services and AMC plans tailored to your needs.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">

          <Button
            className="bg-gradient-to-r from-blue-600 to-blue-800 text-white"
            asChild
          >
            <Link to="/contact">Contact Us</Link>
          </Button>

          <Button
            className="border border-white/20 text-white"
            asChild
          >
            <a href="tel:+919793541467">
              Call: +91 97935 41467
            </a>
          </Button>

        </div>
      </section>

    </div>
  );
};

export default Services;
