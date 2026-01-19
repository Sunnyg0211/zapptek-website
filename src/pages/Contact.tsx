import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Users,
  ThumbsUp,
  ShieldCheck,
  Headphones
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

/* ---------- BANNERS FOR AUTOSLIDE ---------- */

const banners = [
  {
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200",
    title: "We're Here to Help You",
    text: "Have any IT issue? Our experts are ready to assist you.",
    button: "Book a Service",
    link: "/book-service"
  },
  {
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200",
    title: "Multiple Support Channels",
    text: "Call, WhatsApp, Email or fill the form – choose your way.",
    button: "Start Chat",
    link: "https://wa.me/919793541467"
  },
  {
    image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=1200",
    title: "Fast & Reliable Support",
    text: "Quick response with professional solutions.",
    button: "Contact Now",
    link: "/contact"
  }
];

/* ---------- TRUST POINTS ---------- */

const trustPoints = [
  {
    icon: Users,
    title: "1000+ Happy Customers",
    desc: "Trusted IT partner for homes and businesses."
  },
  {
    icon: ShieldCheck,
    title: "Secure & Professional",
    desc: "Your devices and data are always safe."
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    desc: "Friendly and expert assistance."
  },
  {
    icon: ThumbsUp,
    title: "Affordable Pricing",
    desc: "Quality service at fair prices."
  }
];

/* ---------- CONTACT INFO ---------- */

const contactInfo = [
  {
    icon: Phone,
    title: "Call Us",
    details: "+91 97935 41467",
    link: "tel:+919793541467"
  },
  {
    icon: Mail,
    title: "Email Support",
    details: "support@zapptek.online",
    link: "mailto:support@zapptek.online"
  },
  {
    icon: MapPin,
    title: "Service Locations",
    details: "Mumbai • Gorakhpur • Lucknow",
    link: "#"
  },
  {
    icon: Clock,
    title: "Working Hours",
    details: "Mon - Sat: 9 AM - 8 PM",
    link: "#"
  }
];

const Contact = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black">

      {/* ===== AUTO SLIDING BANNER ===== */}
      <section className="relative h-[420px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
          >
            <img
              src={banners[index].image}
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-black/70 flex items-center">
              <div className="container mx-auto px-4 text-white">

                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                >
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    {banners[index].title}
                  </h2>

                  <p className="text-gray-300 max-w-xl mb-6">
                    {banners[index].text}
                  </p>

                  <Button
                    className="bg-gradient-to-r from-blue-600 to-blue-800"
                    asChild
                  >
                    <Link to={banners[index].link}>
                      {banners[index].button}
                    </Link>
                  </Button>

                </motion.div>

              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ===== CONTACT OPTIONS ===== */}
      <section className="py-20">
        <div className="container mx-auto px-4">

          <h2 className="text-3xl font-bold text-white text-center mb-10">
            Get in Touch with Us
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">

            {contactInfo.map((item, i) => (
              <motion.a
                key={i}
                href={item.link}
                whileHover={{ scale: 1.05 }}
                className="p-6 bg-black/70 border border-white/10 rounded-2xl text-center"
              >
                <div className="w-14 h-14 bg-blue-600/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <item.icon className="w-7 h-7 text-blue-400" />
                </div>

                <h4 className="text-lg font-semibold text-white mb-2">
                  {item.title}
                </h4>

                <p className="text-gray-400 text-sm">
                  {item.details}
                </p>
              </motion.a>
            ))}

          </div>
        </div>
      </section>

      {/* ===== CONTACT FORM ===== */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">

          <div className="p-8 bg-black/70 border border-white/10 rounded-2xl">

            <h3 className="text-2xl font-bold text-white mb-6">
              Send Us a Message
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label className="text-white">Name</Label>
                <Input placeholder="Your Name" className="mt-2" />
              </div>

              <div>
                <Label className="text-white">Phone</Label>
                <Input placeholder="Your Number" className="mt-2" />
              </div>
            </div>

            <div className="mb-4">
              <Label className="text-white">Email</Label>
              <Input placeholder="Your Email" className="mt-2" />
            </div>

            <div className="mb-4">
              <Label className="text-white">Message</Label>
              <Textarea
                placeholder="Write your message..."
                className="mt-2 min-h-[120px]"
              />
            </div>

            <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-800">
              <Send className="w-4 h-4 mr-2" />
              Send Message
            </Button>

          </div>
        </div>
      </section>

      {/* ===== TRUST SECTION ===== */}
      <section className="py-20 bg-black/50">
        <div className="container mx-auto px-4 text-center">

          <h2 className="text-3xl font-bold text-white mb-10">
            Why Contact ZappTek?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

            {trustPoints.map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="p-6 bg-black/70 border border-white/10 rounded-2xl"
              >
                <div className="w-14 h-14 bg-blue-600/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <item.icon className="w-7 h-7 text-blue-400" />
                </div>

                <h4 className="text-lg font-semibold text-white mb-2">
                  {item.title}
                </h4>

                <p className="text-gray-400 text-sm">
                  {item.desc}
                </p>
              </motion.div>
            ))}

          </div>
        </div>
      </section>

      {/* ===== QUICK HELP ===== */}
      <section className="py-16 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Need Instant Help?
        </h2>

        <p className="text-gray-400 mb-6">
          Chat with us directly on WhatsApp for quick support.
        </p>

        <Button
          className="bg-gradient-to-r from-green-600 to-green-800"
          asChild
        >
          <a
            href="https://wa.me/919793541467"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Chat on WhatsApp
          </a>
        </Button>
      </section>

    </div>
  );
};

export default Contact;
