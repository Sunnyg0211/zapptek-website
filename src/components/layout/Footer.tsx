import { Link } from "react-router-dom";
import { Zap, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

const footerLinks = {
  services: [
    { name: "Computer Repair", path: "/services#computer" },
    { name: "Laptop Service", path: "/services#laptop" },
    { name: "Network Solutions", path: "/services#network" },
    { name: "CCTV Installation", path: "/services#cctv" },
    { name: "Data Recovery", path: "/services#recovery" },
  ],
  company: [
    { name: "About Us", path: "/about#top" },
    { name: "Careers", path: "/careers#top" },
    { name: "Blog", path: "/blog#top" },
    { name: "Contact", path: "/contact#top" },
  ],
  support: [
    { name: "Help Center", path: "/support#top" },
    { name: "Terms of Service", path: "/terms#top" },
    { name: "Privacy Policy", path: "/privacy#top" },
    { name: "Refund Policy", path: "/refund#top" },
  ],
};

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
];

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground relative z-10">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">

          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-display font-bold text-primary-foreground">
                ZappTek
              </span>
            </Link>

            <p className="text-secondary-foreground/70 mb-4 max-w-sm text-sm leading-relaxed">
              Trusted IT partner for computer, laptop, networking & business IT services across India.
            </p>

            <div className="space-y-2 text-sm">
              <a
                href="tel:+919793541467"
                className="flex items-center gap-2 text-secondary-foreground/70 hover:text-primary transition"
              >
                <Phone className="w-4 h-4" /> +91 97935 41467
              </a>

              <a
                href="mailto:support@zapptek.online"
                className="flex items-center gap-2 text-secondary-foreground/70 hover:text-primary transition"
              >
                <Mail className="w-4 h-4" /> support@zapptek.online
              </a>

              <div className="flex items-start gap-2 text-secondary-foreground/70">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>Mumbai • Gorakhpur • Lucknow</span>
              </div>
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="font-semibold text-primary-foreground mb-3 text-sm">
              Services
            </h4>
            <ul className="space-y-2 text-sm">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-secondary-foreground/70 hover:text-primary transition"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-primary-foreground mb-3 text-sm">
              Company
            </h4>
            <ul className="space-y-2 text-sm">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-secondary-foreground/70 hover:text-primary transition"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-semibold text-primary-foreground mb-3 text-sm">
              Support
            </h4>
            <ul className="space-y-2 text-sm">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-secondary-foreground/70 hover:text-primary transition"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-secondary-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">

          <p className="text-secondary-foreground/50">
            © {new Date().getFullYear()} ZappTek. All rights reserved.
          </p>

          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-secondary-foreground/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition"
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
