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
  ShieldCheck,
  MapPin,
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

/* ------------------ SLIDES ------------------ */

const slides = [
  {
    title: "Book Service Anytime",
    text: "Schedule IT support 24/7",
    image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=1200",
    icon: Calendar,
  },
  {
    title: "Faster Response",
    text: "Quick technician assignment",
    image: "https://images.unsplash.com/photo-1517430816045-df4b7de4a7d5?w=1200",
    icon: Clock,
  },
  {
    title: "Secure & Reliable",
    text: "Handled safely & professionally",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200",
    icon: ShieldCheck,
  },
];

const BookService = () => {
  const [step, setStep] = useState(1);
  const [slideIndex, setSlideIndex] = useState(0);

  const [device, setDevice] = useState("");
  const [service, setService] = useState("");
  const [description, setDescription] = useState("");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  /* Auto slider */
  useEffect(() => {
    const i = setInterval(
      () => setSlideIndex((p) => (p + 1) % slides.length),
      4000
    );
    return () => clearInterval(i);
  }, []);

  const SlideIcon = slides[slideIndex].icon;

  const handleImage = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const submitBooking = async () => {
    if (!name || !phone || !email || !address || !city) {
      toast.error("Please fill all required fields");
      return;
    }

    const { error } = await supabase.from("bookings").insert({
      name,
      phone,
      email,
      address,
      city,
      device_type: device,
      service_type: service,
      description,
    });

    if (error) {
      console.error(error);
      toast.error("Failed to submit booking");
      return;
    }

    toast.success("Booking submitted successfully");
    setStep(1);
  };

  return (
    <div className="min-h-screen bg-black">
      {/* SLIDER */}
      <section className="relative h-[360px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={slideIndex}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <img
              src={slides[slideIndex].image}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/70 flex items-center">
              <div className="container px-6 text-white">
                <SlideIcon className="w-12 h-12 text-blue-500 mb-4" />
                <h2 className="text-3xl font-bold">
                  {slides[slideIndex].title}
                </h2>
                <p className="text-gray-300">{slides[slideIndex].text}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* FORM */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-black/80 border border-white/10 rounded-3xl p-8">
            {/* STEP 1 */}
            {step === 1 && (
              <>
                <h2 className="text-white text-xl mb-6">
                  Select Device & Service
                </h2>

                <div className="grid grid-cols-3 gap-4">
                  {deviceTypes.map((d) => (
                    <button
                      key={d.id}
                      onClick={() => setDevice(d.id)}
                      className={`p-4 rounded-xl border ${
                        device === d.id
                          ? "border-blue-600"
                          : "border-white/10"
                      }`}
                    >
                      <d.icon className="mx-auto text-blue-400" />
                      <p className="text-white text-sm mt-2">{d.label}</p>
                    </button>
                  ))}
                </div>

                <RadioGroup
                  value={service}
                  onValueChange={setService}
                  className="mt-6"
                >
                  {serviceTypes.map((s) => (
                    <label
                      key={s.id}
                      className="flex items-center gap-3 p-3 border border-white/10 rounded-lg mt-2"
                    >
                      <RadioGroupItem value={s.id} />
                      <span className="text-white">{s.label}</span>
                    </label>
                  ))}
                </RadioGroup>

                <Button
                  className="w-full mt-6 bg-blue-600"
                  disabled={!device || !service}
                  onClick={() => setStep(2)}
                >
                  Continue <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <>
                <Label className="text-white">Problem Description</Label>
                <Textarea
                  className="mt-2 bg-black border-white/10 text-white"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />

                <div className="mt-4">
                  <input type="file" hidden id="img" onChange={handleImage} />
                  <label
                    htmlFor="img"
                    className="border-dashed border p-6 block text-center text-gray-300 cursor-pointer"
                  >
                    <Upload className="mx-auto mb-2" />
                    Upload Image
                  </label>
                  {preview && (
                    <img
                      src={preview}
                      className="w-32 h-32 mt-3 rounded-xl object-cover"
                    />
                  )}
                </div>

                <div className="flex gap-4 mt-6">
                  <Button variant="outline" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button className="flex-1 bg-blue-600" onClick={() => setStep(3)}>
                    Continue
                  </Button>
                </div>
              </>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <>
                <h2 className="text-white mb-4">Contact Details</h2>

                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" />
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" className="mt-3" />
                <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="mt-3" />
                <Input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Full Address" className="mt-3" />
                <Input value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" className="mt-3" />

                <Button className="w-full mt-6 bg-blue-600" onClick={submitBooking}>
                  Submit Booking
                </Button>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookService;
