import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Calendar,
  MapPin,
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
  Headphones,
  CreditCard
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
  const [preview, setPreview] = useState<string>("");

  const [index, setIndex] = useState(0);

  const [errors, setErrors] = useState<any>({});

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
    if (!image) err.image = "Please upload at least one image";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  return (
    <div className="min-h-screen bg-black">

      {/* SLIDER */}
      <section className="relative h-[380px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
          >
            <img
              src={slides[index].image}
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-black/70 flex items-center">
              <div className="container mx-auto px-4 text-white">
                <motion.div initial={{ y: 20 }} animate={{ y: 0 }}>

                  {(() => {
                    const Icon = slides[index].icon;
                    return <Icon className="w-12 h-12 text-blue-400 mb-4" />;
                  })()}

                  <h2 className="text-3xl font-bold mb-3">
                    {slides[index].title}
                  </h2>

                  <p className="max-w-xl text-gray-300">
                    {slides[index].text}
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* FORM */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">

            {/* Progress */}
            <div className="flex items-center justify-center mb-12">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                      step >= s
                        ? "bg-gradient-to-r from-blue-600 to-blue-800 text-white"
                        : "bg-white/10 text-gray-400"
                    }`}
                  >
                    {step > s ? <Check className="w-5 h-5" /> : s}
                  </div>
                  {s < 3 && (
                    <div className="w-16 md:w-24 h-1 bg-white/10" />
                  )}
                </div>
              ))}
            </div>

            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-8 rounded-3xl border border-white/10 backdrop-blur-md bg-gradient-to-br from-black via-black/80 to-gray-900"
            >

              {/* STEP 1 */}
              {step === 1 && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">
                    What do you need help with?
                  </h2>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                    {deviceTypes.map((device) => (
                      <motion.button
                        key={device.id}
                        onClick={() => setSelectedDevice(device.id)}
                        whileHover={{ scale: 1.03 }}
                        className={`p-5 rounded-2xl border transition-all text-center ${
                          selectedDevice === device.id
                            ? "border-blue-600 bg-gradient-to-br from-black via-black/90 to-gray-900"
                            : "border-white/10 bg-black/70 hover:border-blue-600/50"
                        }`}
                      >
                        <div className="w-14 h-14 mx-auto mb-3 rounded-xl bg-blue-600/20 flex items-center justify-center">
                          <device.icon className="w-7 h-7 text-blue-400" />
                        </div>

                        <span className="text-sm text-white">
                          {device.label}
                        </span>
                      </motion.button>
                    ))}
                  </div>

                  <div className="mt-8">
                    <Label className="text-white">Service Type</Label>

                    <RadioGroup
                      value={selectedService}
                      onValueChange={setSelectedService}
                      className="mt-3"
                    >
                      {serviceTypes.map((service) => (
                        <label
                          key={service.id}
                          className="flex items-center gap-3 p-4 border border-white/10 rounded-xl mt-2 bg-black/60 cursor-pointer"
                        >
                          <RadioGroupItem value={service.id} />
                          <div>
                            <div className="text-white">{service.label}</div>
                            <div className="text-gray-400 text-sm">
                              {service.description}
                            </div>
                          </div>
                        </label>
                      ))}
                    </RadioGroup>
                  </div>

                  <Button
                    className="w-full mt-6 bg-gradient-to-r from-blue-600 to-blue-800 text-white"
                    onClick={() => setStep(2)}
                    disabled={!selectedDevice || !selectedService}
                  >
                    Continue
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">
                    Describe the Issue
                  </h2>

                  <Label className="text-white">Problem Details</Label>
                  <Textarea className="mt-2 mb-6 bg-black/50 border-white/10 text-white" />

                  <Label className="text-white">Upload Photos</Label>

                  <div className="mt-3">
                    <input
                      type="file"
                      onChange={handleImage}
                      className="hidden"
                      id="fileInput"
                    />

                    <label
                      htmlFor="fileInput"
                      className="block border-2 border-dashed border-white/10 p-6 text-center cursor-pointer text-gray-300"
                    >
                      <Upload className="mx-auto mb-2" />
                      Click to Browse Image
                    </label>

                    {preview && (
                      <img
                        src={preview}
                        className="w-40 h-40 object-cover mt-4 rounded-xl"
                      />
                    )}

                    {errors.image && (
                      <p className="text-red-500 mt-2">{errors.image}</p>
                    )}
                  </div>

                  <div className="flex gap-4 mt-8">
                    <Button variant="outline" onClick={() => setStep(1)}>
                      Back
                    </Button>

                    <Button
                      className="flex-1 bg-gradient-to-r from-blue-600 to-blue-800 text-white"
                      onClick={() => {
                        if (validateStep2()) setStep(3);
                      }}
                    >
                      Continue
                    </Button>
                  </div>
                </div>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">
                    Your Contact Details
                  </h2>

                  <Input placeholder="Full Name" className="mb-4 bg-black/50 text-white border-white/10" />
                  <Input placeholder="Phone Number" className="mb-4 bg-black/50 text-white border-white/10" />
                  <Input placeholder="Email Address" className="mb-4 bg-black/50 text-white border-white/10" />

                  <div className="p-4 bg-black/60 rounded-xl text-gray-300">
                    <p>
                      Device: {deviceTypes.find((d) => d.id === selectedDevice)?.label}
                    </p>
                    <p>
                      Service: {serviceTypes.find((s) => s.id === selectedService)?.label}
                    </p>
                  </div>

                  <div className="flex gap-4 mt-8">
                    <Button variant="outline" onClick={() => setStep(2)}>
                      Back
                    </Button>

                    <Button className="flex-1 bg-gradient-to-r from-blue-600 to-blue-800 text-white" asChild>
                      <Link to="/login">Submit Booking</Link>
                    </Button>
                  </div>
                </div>
              )}

            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookService;
