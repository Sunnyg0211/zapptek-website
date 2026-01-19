import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Star, Quote, Cpu, Wifi, ShieldCheck, Laptop, Play, X } from "lucide-react";

const caseStudies = [
  {
    title: "Office Network Revival",
    category: "Corporate IT Support",
    content:
      "A growing startup faced constant network downtime and slow systems. We restructured their office network and optimized devices.",
    icon: Wifi,
    video: "https://www.youtube.com/embed/tgbNymZ7vqY"
  },
  {
    title: "Critical Data Recovery",
    category: "Emergency IT Services",
    content:
      "Recovered 100% critical files from crashed hard disk and restored business operations within hours.",
    icon: Cpu,
    video: "https://www.youtube.com/embed/tgbNymZ7vqY"
  },
  {
    title: "Complete IT Maintenance",
    category: "AMC Success Story",
    content:
      "Through our AMC plan, company avoided failures and received regular system health checks.",
    icon: ShieldCheck,
    video: "https://www.youtube.com/embed/tgbNymZ7vqY"
  },
  {
    title: "Laptop Repair Turnaround",
    category: "Home User Support",
    content:
      "Urgent laptop repair delivered same day before client’s important meeting.",
    icon: Laptop,
    video: "https://www.youtube.com/embed/tgbNymZ7vqY"
  },
  {
    title: "Security Upgrade Project",
    category: "Business Protection",
    content:
      "Installed security solutions and backup systems protecting from cyber threats.",
    icon: ShieldCheck,
    video: "https://www.youtube.com/embed/tgbNymZ7vqY"
  },
  {
    title: "Printer & Device Setup",
    category: "Office Solutions",
    content:
      "Configured multiple devices across departments with full network setup.",
    icon: Wifi,
    video: "https://www.youtube.com/embed/tgbNymZ7vqY"
  }
];

export function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const [videoOpen, setVideoOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 2) % caseStudies.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const visibleTestimonials = [
    caseStudies[index],
    caseStudies[(index + 1) % caseStudies.length],
  ];

  const openVideo = (url: string) => {
    setCurrentVideo(url);
    setVideoOpen(true);
  };

  return (
    <section className="relative py-16 md:py-20 overflow-hidden">

      {/* ANIMATED BLACK GRADIENT BACKGROUND */}
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

        {/* HEADER */}
        <div className="text-center mb-10">
          <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-white text-sm font-medium mb-3">
            Success Stories
          </span>

          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-white">
            Client Video Testimonials
          </h2>

          <p className="text-gray-300 max-w-2xl mx-auto">
            Watch how we solved real IT problems for real customers.
          </p>
        </div>

        {/* SLIDER */}
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {visibleTestimonials.map((item, i) => (
                <div
                  key={i}
                  className="bg-black/70 backdrop-blur-lg rounded-2xl p-6 border border-white/10 relative shadow-xl"
                >
                  <div className="absolute -top-3 right-5 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    <Quote className="w-4 h-4 text-white" />
                  </div>

                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>

                  <h3 className="font-semibold mb-1 text-white">
                    {item.title}
                  </h3>

                  <p className="text-xs text-gray-400 mb-2">
                    {item.category}
                  </p>

                  <p className="text-sm text-gray-300 mb-4 leading-relaxed">
                    “{item.content}”
                  </p>

                  <button
                    onClick={() => openVideo(item.video)}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 transition rounded-lg text-white text-sm"
                  >
                    <Play className="w-4 h-4" />
                    Watch Video
                  </button>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* VIDEO POPUP MODAL */}
      <AnimatePresence>
        {videoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative bg-black rounded-xl max-w-3xl w-full p-4"
            >
              <button
                onClick={() => setVideoOpen(false)}
                className="absolute -top-4 -right-4 bg-white text-black rounded-full p-2"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative pb-[56.25%] h-0">
                <iframe
                  src={currentVideo}
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                  allowFullScreen
                ></iframe>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
