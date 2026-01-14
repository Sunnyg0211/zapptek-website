import { motion } from "framer-motion";
import { Phone, MessageCircle } from "lucide-react";

export function FloatingButtons() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* WhatsApp Button */}
      <motion.a
        href="https://wa.me/919876543210?text=Hi%20ZappTek!%20I%20need%20help%20with%20IT%20services."
        target="_blank"
        rel="noopener noreferrer"
        className="floating-button w-14 h-14 bg-[hsl(142_70%_49%)] hover:bg-[hsl(142_70%_45%)]"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <MessageCircle className="w-6 h-6 text-primary-foreground" />
      </motion.a>

      {/* Call Button */}
      <motion.a
        href="tel:+919876543210"
        className="floating-button w-14 h-14 gradient-bg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Phone className="w-6 h-6 text-primary-foreground" />
      </motion.a>
    </div>
  );
}
