import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Upload,
  Check,
  ArrowRight,
  Monitor,
  Laptop,
  Printer,
  Camera,
  Wifi,
  HardDrive,
  Clock,
  ShieldCheck
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

/* ------------------ DEVICE & SERVICE TYPES ------------------ */

const deviceTypes = [
  { id: "desktop", icon: Monitor, label: "Desktop" },
  { id: "laptop", icon: Laptop, label: "Laptop" },
  { id: "printer", icon: Printer, label: "Printer" },
  { id: "cctv", icon: Camera, label: "CCTV" },
  { id: "network", icon: Wifi, label: "Network" },
  { id: "storage", icon: HardDrive, label: "Storage" },
];

const serviceTypes = [
  { id: "onsite", label: "On-site Visit", description: "Technician visits your location" },
  { id: "remote", label: "Remote Support", description: "Quick fix via remote access" },
  { id: "pickup", label: "Pickup & Delivery", description: "We pick up and deliver" },
];

/* ------------------ SLIDER CONTENT ------------------ */

const slides = [
  {
    title: "Book Service Anytime",
    text: "Schedule IT support 24/7 from your phone or computer.",
    image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=1200",
    icon: Calendar,
  },
  {
    title: "Faster Response",
    text: "Online booking ensures quicker technician assignment.",
    image: "https://images.unsplash.com/photo-1517430816045-df4b7de4a7d5?w=1200",
    icon: Clock,
  },
  {
    title: "Secure & Reliable",
    text: "Your service requests are handled securely.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200",
    icon: ShieldCheck,
  },
];

const BookService = () => {
  const [step, setStep] = useState(1);
  const [selectedDevice, setSelectedDevice] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [description, setDescription] = useState("");

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [index, setIndex] = useState(0);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});

  /* Auto Slide */
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  /* Image Handler */
  const handleImage = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  /* Submit Booking */
  const submitBooking = async () => {
    if (!name || !phone || !email) {
      toast.error("Please fill all contact details");
      return;
    }

    setLoading(true);

    try {
      let imageUrl: string | null = null;

      if (image) {
        const fileName = `${Date.now()}-${image.name}`;
        const { error: uploadError } = await supabase.storage
          .from("booking-images")
          .upload(fileName, image);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage
          .from("booking-images")
          .getPublicUrl(fileName);

        imageUrl = data.publicUrl;
      }

      const { error } = await supabase.from("bookings").insert({
        customer_name: name,
        phone,
        email,
        device_type: selectedDevice,
        service_type: selectedService,
        description,
        image_url: imageUrl,
        status: "new",
      });

      if (error) throw error;

      toast.success("Booking submitted successfully!");
      setStep(1);
      setSelectedDevice("");
      setSelectedService("");
      setDescription("");
      setImage(null);
      setPreview("");
      setName("");
      setPhone("");
      setEmail("");
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to submit booking");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* SLIDER */}
      <section className="relative h-[380px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
          >
            <img src={slides[index].image} className="w-full h-full object-cover" />
          </motion.div>
        </AnimatePresence>
      </section>

      {/* FORM */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">

          {/* STEP 3 ONLY UPDATED LOGIC */}
          {step === 3 && (
            <>
              <Input
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mb-4 bg-black/50 text-white"
              />
              <Input
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mb-4 bg-black/50 text-white"
              />
              <Input
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mb-6 bg-black/50 text-white"
              />

              <Button
                className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white"
                onClick={submitBooking}
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit Booking"}
              </Button>
            </>
          )}

        </div>
      </section>
    </div>
  );
};

export default BookService;
