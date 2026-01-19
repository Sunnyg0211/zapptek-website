import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  CheckCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    details: ["+91 97935 41467"],
    action: "tel:+919793541467",
  },
  {
    icon: Mail,
    title: "Email",
    details: ["support@zapptek.online", "sales@zapptek.online"],
    action: "mailto:support@zapptek.online",
  },
  {
    icon: MapPin,
    title: "Address",
    details: ["Mumbai • Gorakhpur • Lucknow – India"],
    action: "#",
  },
  {
    icon: Clock,
    title: "Working Hours",
    details: ["Mon - Sat: 9:00 AM - 8:00 PM", "Sunday: 10:00 AM - 5:00 PM"],
    action: "#",
  },
];

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const validate = () => {
    let err: any = {};

    if (!form.name) err.name = "Name is required";
    if (!form.phone) err.phone = "Phone is required";
    if (!form.email) err.email = "Email is required";
    if (!form.subject) err.subject = "Subject is required";
    if (!form.message) err.message = "Message is required";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!validate()) return;

    // Future API integration point
    console.log("Contact Form Data:", form);

    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-black">

      {/* HERO SECTION */}
      <section className="relative py-20 overflow-hidden">
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

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white text-sm mb-4">
            Contact Us
          </motion.span>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Get in Touch
          </h1>

          <p className="text-gray-300 max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">

            {/* FORM SECTION */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl border border-white/10 backdrop-blur-md bg-gradient-to-br from-black via-black/80 to-gray-900"
            >
              {!submitted ? (
                <>
                  <h2 className="text-2xl font-bold text-white mb-6">
                    Send us a Message
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-white">Full Name</Label>
                        <Input
                          id="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Your Name"
                          className="mt-2 bg-black/50 border-white/10 text-white"
                        />
                        {errors.name && (
                          <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                        )}
                      </div>

                      <div>
                        <Label className="text-white">Phone Number</Label>
                        <Input
                          id="phone"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="+91 XXXXX XXXXX"
                          className="mt-2 bg-black/50 border-white/10 text-white"
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label className="text-white">Email Address</Label>
                      <Input
                        id="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="user@domain.com"
                        className="mt-2 bg-black/50 border-white/10 text-white"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <Label className="text-white">Subject</Label>
                      <Input
                        id="subject"
                        value={form.subject}
                        onChange={handleChange}
                        placeholder="How can we help?"
                        className="mt-2 bg-black/50 border-white/10 text-white"
                      />
                      {errors.subject && (
                        <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
                      )}
                    </div>

                    <div>
                      <Label className="text-white">Message</Label>
                      <Textarea
                        id="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell us more about your inquiry..."
                        className="mt-2 min-h-[150px] bg-black/50 border-white/10 text-white"
                      />
                      {errors.message && (
                        <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white"
                    >
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-10"
                >
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-3">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-gray-400">
                    Thank you for contacting ZappTek. Our team will respond shortly.
                  </p>
                </motion.div>
              )}
            </motion.div>

            {/* CONTACT INFO */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.action}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4 p-6 bg-black/70 border border-white/10 rounded-2xl hover:border-blue-600/50 transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-600/20 flex items-center justify-center">
                    <info.icon className="w-6 h-6 text-blue-400" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-white mb-1">
                      {info.title}
                    </h3>

                    {info.details.map((d, i) => (
                      <p key={i} className="text-gray-400 text-sm">
                        {d}
                      </p>
                    ))}
                  </div>
                </motion.a>
              ))}

              {/* QUICK SUPPORT */}
              <div className="p-6 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl text-white">
                <h3 className="text-xl font-bold mb-3">
                  Need Instant Help?
                </h3>

                <p className="mb-6 text-white/80">
                  Contact us directly on WhatsApp for quick assistance.
                </p>

                <Button
                  className="w-full bg-white text-black"
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
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
