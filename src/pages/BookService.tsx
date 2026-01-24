import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
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

/* ------------------ CONSTANT DATA (MOCK UI DATA) ------------------ */

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
  const [index, setIndex] = useState(0);

  const [device, setDevice] = useState("");
  const [service, setService] = useState("");
  const [issueDetails, setIssueDetails] = useState("");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((p) => (p + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleImage = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const submitBooking = async () => {
    if (!name || !phone || !email) {
      toast.error("Please fill all contact details");
      return;
    }

    const { error } = await supabase.from("bookings").insert({
      customer_name: name,
      phone,
      email,
      device_type: device,
      service_type: service,
      issue_details: issueDetails, // ✅ CORRECT COLUMN
      status: "pending",
    });

    if (error) {
      console.error(error);
      toast.error("Failed to submit booking");
      return;
    }

    toast.success("Booking submitted successfully!");
    setStep(1);
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
        <div className="max-w-3xl mx-auto px-4">
          <motion.div className="p-8 rounded-3xl bg-black border border-white/10">

            {step === 1 && (
              <>
                <h2 className="text-white text-2xl mb-6">Select Device</h2>
                <div className="grid grid-cols-3 gap-4">
                  {deviceTypes.map((d) => (
                    <button
                      key={d.id}
                      onClick={() => setDevice(d.id)}
                      className={`p-4 rounded-xl ${
                        device === d.id ? "border-blue-600 border" : "border border-white/10"
                      }`}
                    >
                      <d.icon className="mx-auto text-blue-400" />
                      <p className="text-white mt-2">{d.label}</p>
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

                <Button
                  className="w-full mt-6"
                  disabled={!device || !service}
                  onClick={() => setStep(2)}
                >
                  Continue
                </Button>
              </>
            )}

            {step === 2 && (
              <>
                <Label className="text-white">Issue Details</Label>
                <Textarea
                  value={issueDetails}
                  onChange={(e) => setIssueDetails(e.target.value)}
                  className="mb-6"
                />

                <input type="file" hidden id="file" onChange={handleImage} />
                <label htmlFor="file" className="block text-white cursor-pointer">
                  <Upload /> Upload Image
                </label>

                {preview && <img src={preview} className="w-32 mt-4 rounded" />}

                <Button className="mt-6" onClick={() => setStep(3)}>
                  Continue
                </Button>
              </>
            )}

            {step === 3 && (
              <>
                <Input placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
                <Input placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-3" />
                <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-3" />

                <Button className="w-full mt-6 bg-blue-600" onClick={submitBooking}>
                  Submit Booking
                </Button>
              </>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default BookService;
