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

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  const [slideIndex, setSlideIndex] = useState(0);

  /* Contact Details */
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");

  /* Auto Slide */
  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleImage = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen bg-black">

      {/* SLIDER */}
      <section className="relative h-[380px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={slideIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
          >
            <img
              src={slides[slideIndex].image}
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-black/70 flex items-center">
              <div className="container mx-auto px-6 text-white">
                <motion.div initial={{ y: 20 }} animate={{ y: 0 }}>
                  {(() => {
                    const Icon = slides[slideIndex].icon;
                    return <Icon className="w-12 h-12 text-blue-400 mb-4" />;
                  })()}

                  <h2 className="text-3xl font-bold mb-3">
                    {slides[slideIndex].title}
                  </h2>
                  <p className="max-w-xl text-gray-300">
                    {slides[slideIndex].text}
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* FORM */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">

          {/* STEPS */}
          <div className="flex justify-center gap-4 mb-10">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step >= s ? "bg-blue-600 text-white" : "bg-white/10 text-gray-400"
                }`}
              >
                {step > s ? <Check /> : s}
              </div>
            ))}
          </div>

          <div className="p-8 rounded-3xl bg-gradient-to-br from-black via-black/80 to-gray-900 border border-white/10">

            {/* STEP 1 */}
            {step === 1 && (
              <>
                <h2 className="text-white text-2xl font-bold mb-6">
                  What do you need help with?
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {deviceTypes.map((d) => (
                    <button
                      key={d.id}
                      onClick={() => setSelectedDevice(d.id)}
                      className={`p-5 rounded-xl border ${
                        selectedDevice === d.id
                          ? "border-blue-600"
                          : "border-white/10"
                      }`}
                    >
                      <d.icon className="mx-auto text-blue-400 mb-2" />
                      <p className="text-white text-sm">{d.label}</p>
                    </button>
                  ))}
                </div>

                <RadioGroup
                  value={selectedService}
                  onValueChange={setSelectedService}
                  className="mt-6"
                >
                  {serviceTypes.map((s) => (
                    <label
                      key={s.id}
                      className="flex gap-3 p-4 border border-white/10 rounded-xl mt-2 text-white"
                    >
                      <RadioGroupItem value={s.id} />
                      <div>
                        <p>{s.label}</p>
                        <p className="text-gray-400 text-sm">{s.description}</p>
                      </div>
                    </label>
                  ))}
                </RadioGroup>

                <Button
                  className="w-full mt-6 bg-blue-600"
                  disabled={!selectedDevice || !selectedService}
                  onClick={() => setStep(2)}
                >
                  Continue <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <>
                <Label className="text-white">Describe the Issue</Label>
                <Textarea className="mt-2 mb-4 bg-black/50 text-white" />

                <Label className="text-white">Upload Image</Label>
                <input type="file" onChange={handleImage} className="mt-2" />
                {preview && (
                  <img src={preview} className="w-40 mt-4 rounded-lg" />
                )}

                <div className="flex gap-4 mt-6">
                  <Button variant="outline" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button className="bg-blue-600" onClick={() => setStep(3)}>
                    Continue
                  </Button>
                </div>
              </>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <>
                <h2 className="text-white text-xl font-bold mb-4">
                  Your Contact Details
                </h2>

                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" />
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone Number" className="mt-3" />
                <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="mt-3" />
                <Input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Full Address" className="mt-3" />
                <Input value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" className="mt-3" />

                <Button className="w-full mt-6 bg-blue-600">
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
