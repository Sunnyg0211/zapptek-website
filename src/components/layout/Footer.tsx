import { useState } from "react";
import { ContactPopup } from "@/components/ContactPopup";
import {
  Phone,
  MessageCircle,
  MapPin,
  Linkedin,
  Facebook
} from "lucide-react";
import { motion } from "framer-motion";

const socialLinks = [
  {
    icon: Linkedin,
    href: "https://linkedin.com",
    label: "LinkedIn",
  },
  {
    icon: Facebook,
    href: "https://facebook.com",
    label: "Facebook",
  },
];

export function Footer() {
  const [openForm, setOpenForm] = useState(false);

  return (
    <footer className="relative mt-14">

      {/* Animated Dark Gradient Background */}
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
            "linear-gradient(270deg, #000000, #0d1117, #0a0f1c, #000000)",
          backgroundSize: "400% 400%",
        }}
      />

      <div className="max-w-6xl mx-auto px-4 py-8 relative z-10">

        <div className="rounded-2xl border border-white/10 bg-black/60 backdrop-blur-lg shadow-xl">

          <div className="px-6 py-8">

            {/* ACTION BUTTONS */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">

              <a
                href="tel:+919793541467"
                className="
                  flex items-center gap-2 px-6 py-2.5 rounded-full
                  bg-gradient-to-r from-blue-600 to-blue-800
                  text-white text-sm font-medium
                  hover:from-blue-500 hover:to-blue-700
                  transition
                "
              >
                <Phone className="w-4 h-4" />
                Call Support
              </a>

              <a
                href="https://wa.me/919793541467"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  flex items-center gap-2 px-6 py-2.5 rounded-full
                  bg-gradient-to-r from-blue-600 to-blue-800
                  text-white text-sm font-medium
                  hover:from-blue-500 hover:to-blue-700
                  transition
                "
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Support
              </a>

              <button
                onClick={() => setOpenForm(true)}
                className="
                  flex items-center gap-2 px-6 py-2.5 rounded-full
                  border border-white/20 text-white text-sm font-medium
                  hover:bg-white/10 transition
                "
              >
                Contact Form
              </button>
            </div>

            {/* LOCATION */}
            <div className="flex justify-center text-center mb-5 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-400" />
                Mumbai • Gorakhpur • Lucknow — India
              </div>
            </div>

            {/* SOCIAL LINKS */}
            <div className="flex justify-center gap-3 mb-5">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    w-9 h-9 rounded-full
                    bg-white/5 border border-white/10
                    flex items-center justify-center
                    text-gray-300
                    hover:text-white hover:border-blue-500
                    hover:shadow-[0_0_12px_rgba(37,99,235,0.6)]
                    transition
                  "
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>

            {/* COPYRIGHT */}
            <div className="text-center text-xs text-gray-500 border-t border-white/10 pt-4">
              © {new Date().getFullYear()} ZappTek Technologies. All rights reserved.
            </div>

          </div>
        </div>
      </div>

      {/* CONTACT FORM POPUP */}
      <ContactPopup open={openForm} onClose={() => setOpenForm(false)} />

    </footer>
  );
}
