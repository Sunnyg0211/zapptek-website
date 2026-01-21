import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Modal from "react-modal";
import { Phone, MessageCircle, Star, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import supabase from "@/lib/supabase";

/* GOOGLE REVIEWS FETCHER */
async function fetchGoogleReviews() {
  const API_KEY = import.meta.env.VITE_GOOGLE_PLACES_API_KEY;
  const PLACE_ID = import.meta.env.VITE_GOOGLE_PLACE_ID;

  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews,rating&key=${API_KEY}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    return {
      rating: data.result.rating || 0,
      reviews: data.result.reviews || [],
    };
  } catch (error) {
    console.error("Google Reviews Error:", error);
    return { rating: 0, reviews: [] };
  }
}

export default function EnhancedTrustSection() {
  const [googleReviews, setGoogleReviews] = useState<any[]>([]);
  const [rating, setRating] = useState(0);

  const [videos, setVideos] = useState<any[]>([]);
  const [logos, setLogos] = useState<any[]>([]);

  const [selectedVideo, setSelectedVideo] = useState<any>(null);

  /* LOAD GOOGLE REVIEWS */
  useEffect(() => {
    async function load() {
      const data = await fetchGoogleReviews();
      setGoogleReviews(data.reviews);
      setRating(data.rating);
    }
    load();
  }, []);

  /* LOAD VIDEO TESTIMONIALS */
  useEffect(() => {
    supabase
      .from("video_testimonials")
      .select("*")
      .then(({ data }) => setVideos(data || []));
  }, []);

  /* LOAD CLIENT LOGOS */
  useEffect(() => {
    supabase
      .from("client_logos")
      .select("*")
      .then(({ data }) => setLogos(data || []));
  }, []);

  return (
    <section className="py-20 md:py-28 relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto text-center">

          {/* HEADING */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Trusted by Thousands of Happy Customers
          </motion.h2>

          {/* GOOGLE RATING BADGE */}
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-xl shadow border border-blue-100">
              <Star className="text-blue-600 w-5 h-5" />
              <span className="font-semibold text-blue-700">
                Google Rating: {rating} / 5
              </span>
            </div>
          </div>

          {/* GOOGLE REVIEWS */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {googleReviews.slice(0, 3).map((r, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.04 }}
                className="bg-white rounded-2xl p-6 shadow border border-blue-100 text-left"
              >
                <div className="font-semibold mb-2">
                  {r.author_name}
                </div>

                <p className="text-sm mb-3 line-clamp-4">
                  {r.text}
                </p>

                <div className="text-xs text-muted-foreground">
                  {new Date(r.time * 1000).toLocaleDateString()}
                </div>
              </motion.div>
            ))}
          </div>

          {/* VIDEO TESTIMONIALS */}
          <h3 className="text-2xl font-bold mb-6">
            Customer Video Testimonials
          </h3>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {videos.map((v) => (
              <motion.div
                key={v.id}
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedVideo(v)}
                className="cursor-pointer bg-white rounded-2xl overflow-hidden shadow border border-blue-100"
              >
                <img
                  src={v.thumbnail}
                  className="w-full h-48 object-cover"
                />

                <div className="p-4 text-left">
                  <div className="font-semibold">
                    {v.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {v.designation}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CLIENT LOGOS */}
          <h3 className="text-2xl font-bold mb-6">
            Trusted By Leading Brands
          </h3>

          <div className="flex flex-wrap gap-10 justify-center mb-16">
            {logos.map((l) => (
              <motion.img
                key={l.id}
                src={l.image_url}
                className="h-10 object-contain opacity-80 hover:opacity-100 transition"
              />
            ))}
          </div>

          {/* CTA BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              asChild
              className="bg-gradient-to-r from-blue-600 to-blue-800 text-white hover:from-blue-500 hover:to-blue-700"
            >
              <a href="tel:+919793541467">
                <Phone className="w-5 h-5 mr-2 text-white" />
                Call Now
              </a>
            </Button>

            <Button
              size="lg"
              asChild
              className="bg-gradient-to-r from-blue-600 to-blue-800 text-white hover:from-blue-500 hover:to-blue-700"
            >
              <a
                href="https://wa.me/919793541467"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-5 h-5 mr-2 text-white" />
                WhatsApp Us
              </a>
            </Button>
          </div>

        </div>
      </div>

      {/* VIDEO POPUP MODAL */}
      {selectedVideo && (
        <Modal
          isOpen={true}
          onRequestClose={() => setSelectedVideo(null)}
          className="bg-white p-4 rounded-2xl max-w-3xl mx-auto mt-20 outline-none"
          overlayClassName="fixed inset-0 bg-black/60 flex items-center justify-center"
        >
          <div className="flex justify-end mb-2">
            <button onClick={() => setSelectedVideo(null)}>
              <X className="w-6 h-6 text-blue-600" />
            </button>
          </div>

          <iframe
            src={selectedVideo.video_url}
            className="w-full h-[450px] rounded-xl"
            allowFullScreen
          />
        </Modal>
      )}
    </section>
  );
}
