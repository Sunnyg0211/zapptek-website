import { Link } from "react-router-dom";
import { Phone, MessageCircle, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { motion } from "framer-motion";

const socialLinks = [
  {
    icon: Facebook,
    href: "https://facebook.com",
    label: "Facebook",
    bg: "bg-[#1877F2]",
  },
  {
    icon: Twitter,
    href: "https://twitter.com",
    label: "Twitter",
    bg: "bg-[#1DA1F2]",
  },
  {
    icon: Linkedin,
    href: "https://linkedin.com",
    label: "LinkedIn",
    bg: "bg-[#0A66C2]",
  },
  {
    icon: Instagram,
    href: "https://instagram.com",
    label: "Instagram",
    bg: "bg-[#E4405F]",
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden">

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

      <div className="container mx-auto px-4 py-10 max-w-4xl relative z-10">

        {/* Contact Action Buttons */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">

          <a
            href="tel:+919793541467"
            className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-blue-800 text-white hover:from-blue-500 hover:to-blue-700 transition"
          >
            <Phone className="w-4 h-4 text-white" />
            Call Us
          </a>

          <a
            href="https://wa.me/919793541467"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-blue-800 text-white hover:from-blue-500 hover:to-blue-700 transition"
          >
            <MessageCircle className="w-4 h-4 text-white" />
            WhatsApp
          </a>

          <Link
            to="/contact"
            className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-white/20 text-white hover:bg-white/10 transition"
          >
            Fill a Form
          </Link>
        </div>

        {/* Address */}
        <div className="flex justify-center text-center mb-6 text-sm text-gray-300">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-white" />
            Mumbai • Gorakhpur • Lucknow – India
          </div>
        </div>

        {/* Social Media with Original Colors */}
        <div className="flex justify-center gap-3 mb-6">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              aria-label={social.label}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-10 h-10 rounded-full ${social.bg} text-white flex items-center justify-center hover:opacity-90 transition`}
            >
              <social.icon className="w-5 h-5" />
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-gray-400 border-t border-white/10 pt-4">
          © {new Date().getFullYear()} ZappTek. All rights reserved.
        </div>

      </div>
    </footer>
  );
}
