import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [selectedDevice, setSelectedDevice] = useState("");
  const [selectedService, setSelectedService] = useState("");

  const [problemDetails, setProblemDetails] = useState("");

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");

  const [index, setIndex] = useState(0);
  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);

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

  /* Validation */
  const validateStep2 = () => {
    let err: any = {};
    if (!problemDetails) err.problem = "Please describe the issue";
    if (!image) err.image = "Please upload at least one image";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  /* SUBMIT BOOKING */
  const submitBooking = async () => {
    if (!customerName || !customerPhone || !customerEmail) {
      toast.error("Please fill all contact details");
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("bookings").insert({
      device_type: selectedDevice,
      service_type: selectedService,
      problem_description: problemDetails,
      customer_name: customerName,
      customer_phone: customerPhone,
      customer_email: customerEmail,
      image_name: image?.name || null,
      status: "new",
    });

    setLoading(false);

    if (error) {
      console.error(error);
      toast.error("Failed to submit booking");
      return;
    }

    toast.success("Service booked successfully!");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-black">

      {/* SLIDER */}
      <section className="relative h-[380px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div key={index} className="absolute inset-0">
            <img src={slides[index].image} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/70 flex items-center">
              <div className="container mx-auto px-4 text-white">
                <h2 className="text-3xl font-bold mb-3">{slides[index].title}</h2>
                <p className="text-gray-300">{slides[index].text}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* FORM */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">

          {/* STEP 3 ONLY SHOWN BELOW (UI UNCHANGED ABOVE) */}
          {step === 3 && (
            <div className="p-8 rounded-3xl border border-white/10 bg-black">
              <h2 className="text-2xl font-bold text-white mb-6">
                Your Contact Details
              </h2>

              <Input
                placeholder="Full Name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="mb-4 bg-black text-white border-white/10"
              />

              <Input
                placeholder="Phone Number"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="mb-4 bg-black text-white border-white/10"
              />

              <Input
                placeholder="Email Address"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                className="mb-4 bg-black text-white border-white/10"
              />

              <Button
                className="w-full bg-gradient-to-r from-blue-600 to-blue-800"
                onClick={submitBooking}
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit Booking"}
              </Button>
            </div>
          )}

        </div>
      </section>
    </div>
  );
};

export default BookService;
