import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, ShieldCheck, MapPin, Headphones, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const slides = [
  {
    title: "Book Service Anytime",
    text: "Schedule IT support 24/7 from your phone or computer without visiting any office.",
    image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=1200",
    icon: Calendar
  },
  {
    title: "Faster Response Time",
    text: "Online booking ensures quicker technician assignment and faster issue resolution.",
    image: "https://images.unsplash.com/photo-1517430816045-df4b7de4a7d5?w=1200",
    icon: Clock
  },
  {
    title: "Secure & Reliable",
    text: "Your data and service requests are handled securely with full transparency.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200",
    icon: ShieldCheck
  },
  {
    title: "Track Your Booking",
    text: "Know real-time status of your service request from start to finish.",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200",
    icon: MapPin
  }
];

const benefits = [
  {
    icon: Calendar,
    title: "Easy Scheduling",
    desc: "Book service in just 2 minutes without phone calls"
  },
  {
    icon: Clock,
    title: "Time Saving",
    desc: "No waiting in queues or offices"
  },
  {
    icon: Headphones,
    title: "Instant Support",
    desc: "Quick response from experts"
  },
  {
    icon: CreditCard,
    title: "Online Payments",
    desc: "Safe and cashless transactions"
  }
];

export default function OnlineBookingBenefits() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 relative overflow-hidden">

      {/* SLIDER AREA */}
      <div className="relative h-[450px] mb-16">

        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <img
              src={slides[index].image}
              className="w-full h-full object-cover"
              alt="Booking Slide"
            />

            <div className="absolute inset-0 bg-black/70 flex items-center">
              <div className="container mx-auto px-4 text-white">

                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                >

                  {/* FIXED ICON RENDERING */}
                  {(() => {
                    const SlideIcon = slides[index].icon;
                    return (
                      <SlideIcon className="w-12 h-12 text-blue-400 mb-4" />
                    );
                  })()}

                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    {slides[index].title}
                  </h2>

                  <p className="text-gray-300 max-w-xl mb-6">
                    {slides[index].text}
                  </p>

                  <Button
                    className="bg-gradient-to-r from-blue-600 to-blue-800"
                    asChild
                  >
                    <Link to="/book-service">
                      Book Now
                    </Link>
                  </Button>

                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>

      {/* BENEFITS GRID */}
      <div className="container mx-auto px-4">

        <h3 className="text-3xl font-bold text-center text-white mb-10">
          Benefits of Online Service Booking
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">

          {benefits.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-black/70 border border-white/10 rounded-2xl text-center"
            >
              <div className="w-14 h-14 bg-blue-600/20 rounded-xl flex items-center justify-center mx-auto mb-4">
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

        {/* CTA */}
        <div className="text-center mt-12">
          <Button
            className="bg-gradient-to-r from-blue-600 to-blue-800"
            asChild
          >
            <Link to="/book-service">
              Start Booking Now
            </Link>
          </Button>
        </div>

      </div>
    </section>
  );
}
