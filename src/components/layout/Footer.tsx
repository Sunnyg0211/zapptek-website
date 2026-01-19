import { useState } from "react";
import { ContactPopup } from "@/components/ContactPopup";
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
  const [openForm, setOpenForm] = useState(false);

  return (
    <footer className="relative overflow-hidden mt-10">

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

      {/* HORIZONTAL BOX CONTAINER */}
      <div className="max-w-5xl mx-auto px-4 py-6 relative z-10">

        <div className="border border-white/10 rounded-2xl bg-black/60 backdrop-blur-lg shadow-lg">

          <div className="px-4 py-6">

            {/* Contact Action Buttons */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">

              <a
                href="tel:+919793541467"
                className="flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-800 text-white hover:from-blue-500 hover:to-blue-700 transition"
              >
                <Phone className="w-4 h-4 text-white" />
                Call Us
              </a>

              <a
                href="https://wa.me/919793541467"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-800 text-white hover:from-blue-500 hover:to-blue-700 transition"
              >
                <MessageCircle className="w-4 h-4 text-white" />
                WhatsApp
              </a>

              {/* OPEN CONTACT POPUP INSTEAD OF NAVIGATION */}
              <button
                onClick={() => setOpenForm(true)}
                className="flex items-center gap-2 px-5 py-2 rounded-full border border-white/20 text-white hover:bg-white/10 transition"
              >
                Fill a Form
              </button>
            </div>

            {/* Address */}
            <div className="flex justify-center text-center mb-4 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-white" />
                Mumbai • Gorakhpur • Lucknow – India
              </div>
            </div>

            {/* Social Media */}
            <div className="flex justify-center gap-3 mb-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-9 h-9 rounded-full ${social.bg} text-white flex items-center justify-center hover:opacity-90 transition`}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>

            {/* Copyright */}
            <div className="text-center text-xs text-gray-400 border-t border-white/10 pt-3">
              © {new Date().getFullYear()} ZappTek. All rights reserved.
            </div>

          </div>
        </div>

      </div>

      {/* CONTACT FORM POPUP COMPONENT */}
      <ContactPopup open={openForm} onClose={() => setOpenForm(false)} />

    </footer>
  );
}
