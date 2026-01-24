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
  { id: "onsite", label: "On-site Visit" },
  { id: "remote", label: "Remote Support" },
  { id: "pickup", label: "Pickup & Delivery" },
];

/* ------------------ SLIDES ------------------ */

const slides = [
  {
    title: "Book Service Anytime",
    text: "Schedule IT support 24/7.",
    image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=1200",
    icon: Calendar,
  },
  {
    title: "Faster Response",
    text: "Quick technician assignment.",
    image: "https://images.unsplash.com/photo-1517430816045-df4b7de4a7d5?w=1200",
    icon: Clock,
  },
  {
    title: "Secure & Reliable",
    text: "Handled securely.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200",
    icon: ShieldCheck,
  },
];

export default function BookService() {
  const [step, setStep] = useState(1);
  const [index, setIndex] = useState(0);

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

  useEffect(() => {
    const i = setInterval(() => setIndex((p) => (p + 1) % slides.length), 4000);
    return () => clearInterval(i);
  }, []);

  const submitBooking = async () => {
    if (!name || !phone || !email || !address || !city) {
      toast.error("Please fill all details");
      return;
    }

    const { error } = await supabase.from("bookings").insert({
      customer_name: name,
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
    } else {
      toast.success("Booking submitted successfully");
      setStep(1);
    }
  };

  const Icon = slides[index].icon;

  return (
    <div className="min-h-screen bg-black">
      {/* SLIDER */}
      <section className="relative h-[380px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div key={index} className="absolute inset-0">
            <img src={slides[index].image} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/70 flex items-center">
              <div className="container mx-auto px-6 text-white">
                <Icon className="w-12 h-12 text-blue-400 mb-4" />
                <h2 className="text-3xl font-bold">{slides[index].title}</h2>
                <p className="text-gray-300">{slides[index].text}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* FORM */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4">
          <div className="p-8 rounded-3xl bg-black/80 border border-white/10">

            {step === 1 && (
              <>
                <h2 className="text-white text-xl mb-4">Select Device</h2>
                <div className="grid grid-cols-3 gap-4">
                  {deviceTypes.map((d) => (
                    <button
                      key={d.id}
                      onClick={() => setDevice(d.id)}
                      className={`p-4 border rounded-xl ${
                        device === d.id ? "border-blue-600" : "border-white/10"
                      }`}
                    >
                      <d.icon className="mx-auto text-blue-400" />
                      <p className="text-white text-sm mt-2">{d.label}</p>
                    </button>
                  ))}
                </div>

                <RadioGroup value={service} onValueChange={setService} className="mt-6">
                  {serviceTypes.map((s) => (
                    <label key={s.id} className="flex gap-2 text-white">
                      <RadioGroupItem value={s.id} />
                      {s.label}
                    </label>
                  ))}
                </RadioGroup>

                <Button className="w-full mt-6" onClick={() => setStep(2)}>
                  Continue
                </Button>
              </>
            )}

            {step === 2 && (
              <>
                <Label className="text-white">Problem Description</Label>
                <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />

                <Button className="mt-6 w-full" onClick={() => setStep(3)}>
                  Continue
                </Button>
              </>
            )}

            {step === 3 && (
              <>
                <Input placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
                <Input placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
                <Input placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />

                <Button className="mt-6 w-full" onClick={submitBooking}>
                  Submit Booking
                </Button>
              </>
            )}

          </div>
        </div>
      </section>
    </div>
  );
}
