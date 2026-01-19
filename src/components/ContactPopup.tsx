import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function ContactPopup({ open, onClose }: Props) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    await supabase.from("contacts").insert([form]);

    alert("Message Sent Successfully!");
    setLoading(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
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
            className="bg-black border border-white/10 rounded-2xl p-6 max-w-md w-full text-white relative"
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold mb-4">
              Send a Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                name="name"
                placeholder="Your Name"
                className="w-full p-2 rounded bg-white/10 border border-white/10"
                onChange={handleChange}
                required
              />

              <input
                name="email"
                placeholder="Email"
                className="w-full p-2 rounded bg-white/10 border border-white/10"
                onChange={handleChange}
                required
              />

              <input
                name="phone"
                placeholder="Phone"
                className="w-full p-2 rounded bg-white/10 border border-white/10"
                onChange={handleChange}
                required
              />

              <textarea
                name="message"
                placeholder="Your Message"
                className="w-full p-2 rounded bg-white/10 border border-white/10"
                rows={3}
                onChange={handleChange}
                required
              />

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
