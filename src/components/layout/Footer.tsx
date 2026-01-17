import { Link } from "react-router-dom";
import { Phone, MessageCircle, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
];

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground relative z-10">
      <div className="container mx-auto px-4 py-8 max-w-4xl">

        {/* Contact Buttons */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">

          <a
            href="tel:+919793541467"
            className="flex items-center gap-2 px-5 py-2 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition"
          >
            <Phone className="w-4 h-4" />
            Call Us
          </a>

          <a
            href="https://wa.me/919793541467"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2 rounded-full bg-green-600 text-white hover:opacity-90 transition"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </a>

          <Link
            to="/contact"
            className="flex items-center gap-2 px-5 py-2 rounded-full border border-primary text-primary hover:bg-primary hover:text-white transition"
          >
            Fill a Form
          </Link>
        </div>

        {/* Address */}
        <div className="flex justify-center text-center mb-6 text-sm text-secondary-foreground/70">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Mumbai • Gorakhpur • Lucknow – India
          </div>
        </div>

        {/* Social Media */}
        <div className="flex justify-center gap-3 mb-6">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              aria-label={social.label}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-secondary-foreground/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition"
            >
              <social.icon className="w-4 h-4" />
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-secondary-foreground/50 border-t border-secondary-foreground/10 pt-4">
          © {new Date().getFullYear()} ZappTek. All rights reserved.
        </div>

      </div>
    </footer>
  );
}
