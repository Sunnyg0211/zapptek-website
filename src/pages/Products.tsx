import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BannerItem {
  id: number;
  type: "image" | "video";
  src: string;
  link?: string;
}

const banners: BannerItem[] = [
  {
    id: 1,
    type: "image",
    src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1600&h=600&fit=crop",
    link: "/products",
  },
  {
    id: 2,
    type: "video",
    src: "https://assets.mixkit.co/videos/preview/mixkit-modern-office-with-computer-equipment-492-large.mp4",
    link: "/services",
  },
  {
    id: 3,
    type: "image",
    src: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=1600&h=600&fit=crop",
    link: "/amc-plans",
  },
];

export default function BannerSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);

    return () => clearInterval(timer);
  }, [current]);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + banners.length) % banners.length);
  };

  return (
    <div className="relative w-full h-[350px] md:h-[450px] overflow-hidden rounded-2xl shadow-lg bg-black">
      <AnimatePresence>
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 w-full h-full"
        >
          {banners[current].type === "image" ? (
            <a href={banners[current].link}>
              <img
                src={banners[current].src}
                className="w-full h-full object-cover"
                alt="banner"
              />
            </a>
          ) : (
            <a href={banners[current].link}>
              <video
                src={banners[current].src}
                autoPlay
                muted
                loop
                className="w-full h-full object-cover"
              />
            </a>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 text-white p-2 rounded-full"
      >
        <ChevronLeft />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 text-white p-2 rounded-full"
      >
        <ChevronRight />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              current === index ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
