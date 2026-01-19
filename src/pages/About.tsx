import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Award, ArrowRight, Zap, Target, Heart, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const banners = [
  {
    title: "Who We Are",
    text: "Your trusted IT partner for reliable technology solutions",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200",
  },
  {
    title: "Our Mission",
    text: "To make technology simple, secure and stress-free",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200",
  },
  {
    title: "Expert Support",
    text: "Professional IT services for homes and businesses",
    image:
      "https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=1200",
  },
];

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
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black">

      {/* TOP SLIDER */}
      <section className="relative h-[650px] overflow-hidden">

        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <img
              src={banners[index].image}
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-black/75 flex items-center justify-center">
              <div className="text-center max-w-4xl px-4">

                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  {banners[index].title}
                </h1>

                <p className="text-gray-300 mb-6 text-lg">
                  {banners[index].text}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    className="bg-gradient-to-r from-blue-600 to-blue-800 text-white"
                    asChild
                  >
                    <Link to="/services">
                      Our Services
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>

                  <Button
                    variant="outline"
                    className="border-white text-white"
                    asChild
                  >
                    <Link to="/contact">Contact Us</Link>
                  </Button>
                </div>

                {/* DOT INDICATORS */}
                <div className="flex justify-center gap-2 mt-8">
                  {banners.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setIndex(i)}
                      className={`w-3 h-3 rounded-full ${
                        index === i ? "bg-blue-600" : "bg-white/30"
                      }`}
                    />
                  ))}
                </div>

              </div>
            </div>
          </motion.div>
        </AnimatePresence>
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

          <div className="max-w-3xl mx-auto text-gray-300 space-y-5 text-center">
            <p>
              ZappTek was built with a simple goal – to provide dependable and honest IT services to individuals and businesses.
            </p>

            <p>
              We believe technology should work for you, not against you. That’s why our focus is on delivering practical, affordable, and long-term solutions.
            </p>

            <p>
              From personal laptops to enterprise networks, we help our clients stay productive, secure, and stress-free with professional support.
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
                className="p-6 bg-gradient-to-br from-black via-black/80 to-gray-900 border border-white/10 rounded-2xl"
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

      {/* TEAM STYLE CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">

          <div className="max-w-3xl mx-auto p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-black via-black/80 to-gray-900">

            <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-blue-600/20 flex items-center justify-center">
              <Users className="w-8 h-8 text-blue-400" />
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Let’s Simplify Your IT
            </h2>

            <p className="text-gray-400 mb-8">
              Whether you need support for a single device or complete business IT management, we’re here to help.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                className="bg-gradient-to-r from-blue-600 to-blue-800 text-white"
                asChild
              >
                <Link to="/book-service">
                  Book a Service
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>

              <Button
                variant="outline"
                className="border-white text-white"
                asChild
              >
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};

export default About;
