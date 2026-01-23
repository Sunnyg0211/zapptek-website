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

/* ------------------ SLIDER ------------------ */

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

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((p) => (p + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleImage = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  /* ------------------ SUBMIT BOOKING ------------------ */
  const submitBooking = async () => {
    if (!name || !phone || !email) {
      toast.error("Please fill all contact details");
      return;
    }

    setLoading(true);

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
        device_type: selectedDevice,
        service_type: selectedService,
        description,
        customer_name: name,
        customer_phone: phone,
        customer_email: email,
        image_url: imageUrl,
        status: "pending",
      });

      if (error) throw error;

      toast.success("Service booked successfully!");
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
      toast.error(err.message || "Failed to submit booking");
    } finally {
      setLoading(false);
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

          {/* STEP 1 */}
          {step === 1 && (
            <>
              <h2 className="text-white text-2xl mb-6">Select Device</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {deviceTypes.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setSelectedDevice(d.id)}
                    className={`p-5 border rounded-xl ${
                      selectedDevice === d.id ? "border-blue-600" : "border-white/10"
                    }`}
                  >
                    <d.icon className="text-blue-400 mx-auto mb-2" />
                    <span className="text-white">{d.label}</span>
                  </button>
                ))}
              </div>

              <RadioGroup
                className="mt-6"
                value={selectedService}
                onValueChange={setSelectedService}
              >
                {serviceTypes.map((s) => (
                  <label key={s.id} className="flex gap-3 p-4 border rounded-xl">
                    <RadioGroupItem value={s.id} />
                    <span className="text-white">{s.label}</span>
                  </label>
                ))}
              </RadioGroup>

              <Button
                className="w-full mt-6"
                disabled={!selectedDevice || !selectedService}
                onClick={() => setStep(2)}
              >
                Continue
              </Button>
            </>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <>
              <Textarea
                placeholder="Describe your issue"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <input type="file" onChange={handleImage} className="mt-4" />
              {preview && <img src={preview} className="w-32 mt-4 rounded" />}

              <div className="flex gap-4 mt-6">
                <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
                <Button onClick={() => setStep(3)}>Continue</Button>
              </div>
            </>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <>
              <Input placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
              <Input placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-3" />
              <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-3" />

              <div className="flex gap-4 mt-6">
                <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
                <Button onClick={submitBooking} disabled={loading}>
                  {loading ? "Submitting..." : "Submit Booking"}
                </Button>
              </div>
            </>
          )}

        </div>
      </section>
    </div>
  );
};

export default BookService;
