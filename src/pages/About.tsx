import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Award, ArrowRight, Zap, Target, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const values = [
  {
    icon: Target,
    title: "Customer First Approach",
    description:
      "Every service we provide is designed around the needs and priorities of our customers.",
  },
  {
    icon: Award,
    title: "Professional Excellence",
    description:
      "We deliver high-quality IT solutions with skilled technicians and proven processes.",
  },
  {
    icon: Heart,
    title: "Trust & Transparency",
    description:
      "Honesty and integrity are the foundation of all our customer relationships.",
  },
];

const About = () => {
  return (
    <div className="min-h-screen">

      {/* HERO SECTION */}
      <section className="relative py-20 md:py-28 overflow-hidden">

        {/* Animated Black Gradient */}
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

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">

            <motion.div className="flex items-center justify-center gap-2 mb-6">
              <div className="w-12 h-12 rounded-xl bg-blue-600/20 flex items-center justify-center">
                <Zap className="w-7 h-7 text-blue-400" />
              </div>

              <span className="text-2xl font-bold text-white">
                ZappTek
              </span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              About Us
            </h1>

            <p className="text-lg text-gray-300">
              Your trusted technology partner delivering reliable, secure, and professional IT services for homes and businesses.
            </p>
          </div>
        </div>
      </section>

      {/* STORY SECTION */}
      <section className="py-20">
        <div className="container mx-auto px-4">

          <div className="max-w-4xl mx-auto text-center mb-10">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white text-sm mb-4">
              Our Journey
            </span>

            <h2 className="text-3xl font-bold text-white mb-6">
              Technology with Integrity
            </h2>
          </div>

          <div className="max-w-3xl mx-auto text-gray-300 space-y-5">
            <p>
              ZappTek was built with a simple goal – to provide dependable and honest IT services to individuals and businesses.
            </p>

            <p>
              We believe technology should work for you, not against you. That’s why our focus is on delivering practical, affordable, and long-term solutions rather than quick temporary fixes.
            </p>

            <p>
              From personal laptops to enterprise networks, we help our clients stay productive, secure, and stress-free with professional support they can rely on.
            </p>
          </div>
        </div>
      </section>

      {/* VALUES SECTION */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">

          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white text-sm mb-4">
            Our Core Values
          </span>

          <h2 className="text-3xl font-bold text-white mb-12">
            What Defines Us
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {values.map((value, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="p-6 bg-black/70 border border-white/10 rounded-2xl"
              >
                <div className="w-16 h-16 rounded-xl bg-blue-600/20 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-blue-400" />
                </div>

                <h3 className="text-xl font-bold text-white mb-2">
                  {value.title}
                </h3>

                <p className="text-gray-400">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-16 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Let’s Simplify Your IT
        </h2>

        <p className="text-gray-400 mb-8 max-w-xl mx-auto">
          Whether you need support for a single device or complete business IT management, we’re here to help.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">

          <Button
            className="bg-gradient-to-r from-blue-600 to-blue-800 text-white hover:from-blue-500 hover:to-blue-700"
            asChild
          >
            <Link to="/book-service">
              Book a Service
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>

          <Button
            className="border border-white/20 text-white hover:bg-white/10"
            asChild
          >
            <Link to="/contact">Contact Us</Link>
          </Button>

        </div>
      </section>

    </div>
  );
};

export default About;
