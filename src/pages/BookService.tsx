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
  { id: "onsite", label: "On-site Visit" },
  { id: "remote", label: "Remote Support" },
  { id: "pickup", label: "Pickup & Delivery" },
];

/* ------------------ SLIDER CONTENT ------------------ */

const slides = [
  {
    title: "Book Service Anytime",
    text: "Schedule IT support 24/7 from your phone or computer.",
    image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=1200",
    icon: Calendar
  },
  {
    title: "Faster Response",
    text: "Online booking ensures quicker technician assignment.",
    image: "https://images.unsplash.com/photo-1517430816045-df4b7de4a7d5?w=1200",
    icon: Clock
  },
  {
    title: "Secure & Reliable",
    text: "Your service requests are handled securely.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200",
    icon: ShieldCheck
  }
];

const BookService = () => {
  const [step, setStep] = useState(1);
  const [selectedDevice, setSelectedDevice] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [index, setIndex] = useState(0);

  // Contact details
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");

  /* Auto Slide */
  useEffect(() => {
    const i = setInterval(() => {
      setIndex((p) => (p + 1) % slides.length);
    }, 4000);
    return () => clearInterval(i);
  }, []);

  /* Image Handler */
  const handleImage = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  /* SUBMIT BOOKING */
  const submitBooking = async () => {
    if (!fullName || !phone || !email || !address || !city) {
      toast.error("Please fill all details");
      return;
    }

    try {
      let imageUrl = null;

      if (image) {
        const filePath = `bookings/${Date.now()}-${image.name}`;

        const { error: uploadError } = await supabase.storage
          .from("booking-images")
          .upload(filePath, image);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage
          .from("booking-images")
          .getPublicUrl(filePath);

        imageUrl = data.publicUrl;
      }

      const { error } = await supabase.from("bookings").insert({
        full_name: fullName,
        phone,
        email,
        address,
        city,
        device_type: selectedDevice,
        service_type: selectedService,
        image_url: imageUrl,
      });

      if (error) throw error;

      toast.success("Booking submitted successfully!");
      setStep(1);
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to submit booking");
    }
  };

  return (
    <div className="min-h-screen bg-black">

      {/* SLIDER */}
      <section className="relative h-[380px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div key={index} className="absolute inset-0">
            <img src={slides[index].image} className="w-full h-full object-cover" />
          </motion.div>
        </AnimatePresence>
      </section>

      {/* FORM */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">

          {/* STEP 3 ONLY SHOWN HERE (unchanged UI) */}
          {step === 3 && (
            <>
              <Input
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
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
                className="mb-4 bg-black/50 text-white"
              />
              <Input
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="mb-4 bg-black/50 text-white"
              />
              <Input
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="mb-6 bg-black/50 text-white"
              />

              <Button
                className="w-full bg-gradient-to-r from-blue-600 to-blue-800"
                onClick={submitBooking}
              >
                Submit Booking
              </Button>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default BookService;
