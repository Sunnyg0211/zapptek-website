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
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
    text: "Handled securely",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200",
    icon: ShieldCheck,
  },
];

const BookService = () => {
  const [step, setStep] = useState(1);
  const [slideIndex, setSlideIndex] = useState(0);

  const [device, setDevice] = useState("");
  const [service, setService] = useState("");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [issue, setIssue] = useState("");

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  /* Auto slider */
  useEffect(() => {
    const i = setInterval(() => {
      setSlideIndex((p) => (p + 1) % slides.length);
    }, 4000);
    return () => clearInterval(i);
  }, []);

  const handleImage = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const submitBooking = async () => {
    if (!name || !phone || !email || !address || !city) {
      toast.error("Please fill all details");
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
    });

    if (error) {
      console.error(error);
      toast.error("Failed to submit booking");
    } else {
      toast.success("Booking submitted successfully");
      setStep(1);
      setName("");
      setPhone("");
      setEmail("");
      setAddress("");
      setCity("");
      setIssue("");
      setImage(null);
      setPreview("");
    }
  };

  const Icon = slides[slideIndex].icon;

  return (
    <div className="min-h-screen bg-black pt-24">

      {/* SLIDER */}
      <section className="relative h-[320px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={slideIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
          >
            <img src={slides[slideIndex].image} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/70 flex items-center">
              <div className="container mx-auto px-6 text-white">
                <Icon className="w-12 h-12 text-blue-400 mb-4" />
                <h2 className="text-3xl font-bold">{slides[slideIndex].title}</h2>
                <p className="text-gray-300">{slides[slideIndex].text}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* FORM */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto p-8 rounded-3xl border border-white/10 bg-black/80">

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

              <RadioGroup className="mt-6" value={service} onValueChange={setService}>
                {serviceTypes.map((s) => (
                  <label key={s.id} className="flex items-center gap-3 text-white mt-2">
                    <RadioGroupItem value={s.id} />
                    {s.label}
                  </label>
                ))}
              </RadioGroup>

              <Button className="w-full mt-6" onClick={() => setStep(2)} disabled={!device || !service}>
                Continue <ArrowRight className="ml-2" />
              </Button>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="text-white text-2xl mb-6">Issue Details</h2>
              <Textarea
                value={issue}
                onChange={(e) => setIssue(e.target.value)}
                className="mb-4"
                placeholder="Describe the issue"
              />

              <input type="file" hidden id="file" onChange={handleImage} />
              <label htmlFor="file" className="block border-dashed border p-6 text-center cursor-pointer">
                <Upload className="mx-auto mb-2" />
                Upload Image
              </label>

              {preview && <img src={preview} className="mt-4 w-32 rounded-xl" />}

              <Button className="w-full mt-6" onClick={() => setStep(3)}>
                Continue
              </Button>
            </>
          )}

          {step === 3 && (
            <>
              <h2 className="text-white text-2xl mb-6">Contact Details</h2>
              <Input placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
              <Input placeholder="Phone" className="mt-3" value={phone} onChange={(e) => setPhone(e.target.value)} />
              <Input placeholder="Email" className="mt-3" value={email} onChange={(e) => setEmail(e.target.value)} />
              <Input placeholder="Address" className="mt-3" value={address} onChange={(e) => setAddress(e.target.value)} />
              <Input placeholder="City" className="mt-3" value={city} onChange={(e) => setCity(e.target.value)} />

              <Button className="w-full mt-6 bg-blue-600" onClick={submitBooking}>
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
