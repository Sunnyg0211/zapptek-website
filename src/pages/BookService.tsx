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

/* ------------------ SLIDER ------------------ */

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
    text: "Handled securely",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200",
    icon: ShieldCheck,
  },
];

const BookService = () => {
  const [step, setStep] = useState(1);
  const [index, setIndex] = useState(0);

  const [selectedDevice, setSelectedDevice] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [description, setDescription] = useState("");

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
  });

  /* Slider */
  useEffect(() => {
    const i = setInterval(() => setIndex((p) => (p + 1) % slides.length), 4000);
    return () => clearInterval(i);
  }, []);

  /* Image handler */
  const handleImage = (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  /* Submit booking */
  const submitBooking = async () => {
    try {
      let imageUrl = null;

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
        full_name: form.fullName,
        phone: form.phone,
        email: form.email,
        address: form.address,
        city: form.city,
        device: selectedDevice,
        service_type: selectedService,
        description,
        image_url: imageUrl,
      });

      if (error) throw error;

      toast.success("Service booked successfully!");
      setStep(1);
    } catch (err: any) {
      toast.error(err.message || "Booking failed");
    }
  };

  return (
    <div className="min-h-screen bg-black">

      {/* SLIDER */}
      <section className="relative h-[380px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={index}
            src={slides[index].image}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        </AnimatePresence>
      </section>

      {/* FORM */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto p-6 bg-gradient-to-br from-black to-gray-900 rounded-3xl border border-white/10">

          {/* STEP 1 */}
          {step === 1 && (
            <>
              <h2 className="text-white text-2xl mb-6">Select Device & Service</h2>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {deviceTypes.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setSelectedDevice(d.id)}
                    className={`p-4 rounded-xl border ${
                      selectedDevice === d.id
                        ? "border-blue-600"
                        : "border-white/10"
                    }`}
                  >
                    <d.icon className="text-blue-400 mx-auto mb-2" />
                    <p className="text-white text-sm text-center">{d.label}</p>
                  </button>
                ))}
              </div>

              <RadioGroup
                className="mt-6"
                value={selectedService}
                onValueChange={setSelectedService}
              >
                {serviceTypes.map((s) => (
                  <label key={s.id} className="flex items-center gap-3 text-white">
                    <RadioGroupItem value={s.id} />
                    {s.label}
                  </label>
                ))}
              </RadioGroup>

              <Button
                className="w-full mt-6 bg-blue-600"
                onClick={() => setStep(2)}
                disabled={!selectedDevice || !selectedService}
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
                className="bg-black/50 text-white mt-2"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              {/* WHITE UPLOAD BUTTON */}
              <label className="mt-6 flex items-center justify-center gap-3 cursor-pointer bg-white text-black py-3 rounded-xl">
                <Upload />
                Upload Image
                <input type="file" hidden onChange={handleImage} />
              </label>

              {preview && (
                <img src={preview} className="w-32 h-32 mt-4 rounded-xl" />
              )}

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
              <Input
                placeholder="Full Name"
                className="mb-3"
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              />
              <Input
                placeholder="Phone Number"
                className="mb-3"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
              <Input
                placeholder="Email"
                className="mb-3"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <Input
                placeholder="Address"
                className="mb-3"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
              />
              <Input
                placeholder="City"
                className="mb-6"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
              />

              <Button className="w-full bg-blue-600" onClick={submitBooking}>
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
