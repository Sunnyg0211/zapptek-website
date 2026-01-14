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
    description: "Complete desktop computer repair including hardware diagnostics, component replacement, OS installation, and performance optimization.",
    features: ["Hardware Diagnostics", "Component Replacement", "OS Installation", "Performance Tuning"],
  },
  {
    icon: Laptop,
    title: "Laptop Service",
    description: "Expert laptop repair services including screen replacement, keyboard repair, battery replacement, motherboard repair, and more.",
    features: ["Screen Replacement", "Keyboard Repair", "Battery Replacement", "Motherboard Repair"],
  },
  {
    icon: Wifi,
    title: "Network Solutions",
    description: "Professional networking services from WiFi setup to enterprise network infrastructure design and implementation.",
    features: ["WiFi Setup", "Router Configuration", "Network Security", "Enterprise Solutions"],
  },
  {
    icon: Camera,
    title: "CCTV Installation",
    description: "Complete CCTV security solutions including camera installation, DVR/NVR setup, remote monitoring, and maintenance.",
    features: ["Camera Installation", "DVR/NVR Setup", "Remote Viewing", "24/7 Monitoring"],
  },
  {
    icon: HardDrive,
    title: "Data Recovery",
    description: "Professional data recovery from damaged, corrupted, or failed storage devices including HDDs, SSDs, and memory cards.",
    features: ["HDD Recovery", "SSD Recovery", "Memory Card Recovery", "RAID Recovery"],
  },
  {
    icon: Printer,
    title: "Printer Service",
    description: "Complete printer maintenance including cartridge refilling, head cleaning, paper jam fixes, and driver setup.",
    features: ["Cartridge Refill", "Head Cleaning", "Paper Jam Fix", "Driver Setup"],
  },
  {
    icon: Server,
    title: "Server Management",
    description: "Enterprise server solutions including setup, maintenance, backup, security, and cloud migration services.",
    features: ["Server Setup", "Backup Solutions", "Security Hardening", "Cloud Migration"],
  },
  {
    icon: Shield,
    title: "Virus Removal",
    description: "Complete malware removal and security services including antivirus installation, ransomware recovery, and security audits.",
    features: ["Malware Removal", "Antivirus Setup", "Ransomware Recovery", "Security Audit"],
  },
  {
    icon: Cpu,
    title: "Hardware Upgrades",
    description: "Upgrade your system with latest components including RAM, SSD, graphics cards, and processor upgrades.",
    features: ["RAM Upgrade", "SSD Installation", "GPU Upgrade", "CPU Upgrade"],
  },
  {
    icon: Database,
    title: "Software Solutions",
    description: "Custom software installation, licensing, configuration, and troubleshooting for all your business needs.",
    features: ["Software Installation", "Licensing", "Configuration", "Troubleshooting"],
  },
  {
    icon: Cloud,
    title: "Cloud Services",
    description: "Cloud infrastructure setup including Office 365, Google Workspace, AWS, and Azure configuration.",
    features: ["Office 365 Setup", "Google Workspace", "AWS/Azure", "Cloud Backup"],
  },
  {
    icon: Wrench,
    title: "Preventive Maintenance",
    description: "Regular maintenance services to keep your systems running smoothly and prevent unexpected failures.",
    features: ["System Cleaning", "Health Checks", "Updates & Patches", "Performance Tuning"],
  },
];

const Services = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 md:py-28 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--primary-foreground)) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block px-4 py-1.5 rounded-full bg-primary-foreground/10 text-primary-foreground text-sm font-medium mb-6"
            >
              Our Services
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground mb-6"
            >
              Comprehensive IT Solutions
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-primary-foreground/70 mb-8"
            >
              From quick repairs to complete IT infrastructure, we've got you covered with expert solutions for all your technology needs.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Button variant="hero" size="lg" asChild>
                <Link to="/book-service">
                  Book a Service
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-card rounded-3xl p-8 shadow-lg border border-border/50 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-display font-bold mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-foreground/80">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
            Can't find what you're looking for?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Contact us for custom IT solutions tailored to your specific needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="gradient" size="lg" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="tel:+919876543210">Call: +91 98765 43210</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
