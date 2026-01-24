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
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";

/* ------------------ CONSTANTS ------------------ */

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
  const [issue, setIssue] = useState("");

  const [image, setImage] = useState<File | null>(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");

  /* Slider */
  useEffect(() => {
    const i = setInterval(() => setIndex((p) => (p + 1) % slides.length), 4000);
    return () => clearInterval(i);
  }, []);

  /* Submit */
  const submitBooking = async () => {
    const { error } = await supabase.from("bookings").insert({
      customer_name: name,
      phone,
      email,
      address,
      city,
      device_type: device,
      service_type: service,
      issue_text: issue,
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
      <section className="relative min-h-[280px] md:h-[380px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div key={index} className="absolute inset-0">
            <img src={slides[index].image} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/70 flex items-center px-6">
              <div className="text-white max-w-xl">
                <slides[index].icon className="w-12 h-12 text-blue-400 mb-3" />
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

          {/* STEP 1 */}
          {step === 1 && (
            <>
              <h2 className="text-white text-2xl mb-6">Select Device & Service</h2>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {deviceTypes.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setDevice(d.id)}
                    className={`p-4 rounded-xl border ${
                      device === d.id ? "border-blue-600" : "border-white/10"
                    }`}
                  >
                    <d.icon className="mx-auto text-blue-400" />
                    <p className="text-white mt-2">{d.label}</p>
                  </button>
                ))}
              </div>

              <RadioGroup value={service} onValueChange={setService} className="mt-6">
                {serviceTypes.map((s) => (
                  <label key={s.id} className="flex gap-3 text-white">
                    <RadioGroupItem value={s.id} /> {s.label}
                  </label>
                ))}
              </RadioGroup>

              <Button
                className="w-full mt-6"
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
              <Label className="text-white">Problem Details</Label>
              <Textarea
                className="mt-2"
                value={issue}
                onChange={(e) => setIssue(e.target.value)}
              />

              <Label className="text-white mt-4">Upload Image</Label>
              <Input type="file" onChange={(e) => setImage(e.target.files?.[0] || null)} />

              <Button className="w-full mt-6" onClick={() => setStep(3)}>
                Continue
              </Button>
            </>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <>
              <Input placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
              <Input placeholder="Phone" className="mt-3" value={phone} onChange={(e) => setPhone(e.target.value)} />
              <Input placeholder="Email" className="mt-3" value={email} onChange={(e) => setEmail(e.target.value)} />
              <Textarea placeholder="Address" className="mt-3" value={address} onChange={(e) => setAddress(e.target.value)} />
              <Input placeholder="City" className="mt-3" value={city} onChange={(e) => setCity(e.target.value)} />

              <Button className="w-full mt-6" onClick={submitBooking}>
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
