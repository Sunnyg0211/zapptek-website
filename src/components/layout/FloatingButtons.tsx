import { motion } from "framer-motion";
import { Phone, MessageCircle } from "lucide-react";
import { createPortal } from "react-dom";

export function FloatingButtons() {
  // Render outside layout tree
  if (typeof window === "undefined") return null;

  return createPortal(
    <div
      className="
        fixed
        bottom-[max(1.5rem,env(safe-area-inset-bottom))]
        right-[max(1.5rem,env(safe-area-inset-right))]
        z-[9999]
        flex flex-col gap-3
        pointer-events-auto
      "
    >
      {/* WhatsApp */}
      <motion.a
        href="https://wa.me/919793541467?text=Hi%20ZappTek!%20I%20need%20help%20with%20IT%20services."
        target="_blank"
        rel="noopener noreferrer"
        className="
          w-14 h-14 rounded-full
          flex items-center justify-center
          shadow-xl
          bg-gradient-to-r from-blue-600 to-blue-800
          hover:from-blue-500 hover:to-blue-700
          text-white
        "
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.94 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <MessageCircle className="w-6 h-6" />
      </motion.a>

      {/* Call */}
      <motion.a
        href="tel:+919793541467"
        className="
          w-14 h-14 rounded-full
          flex items-center justify-center
          shadow-xl
          bg-gradient-to-r from-blue-600 to-blue-800
          hover:from-blue-500 hover:to-blue-700
          text-white
        "
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.94 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
      >
        <Phone className="w-6 h-6" />
      </motion.a>
    </div>,
    document.body
  );
}
