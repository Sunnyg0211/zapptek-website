import { useState, useRef } from "react";
import { motion } from "framer-motion";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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

const BookService = () => {
  const [step, setStep] = useState(1);
  const [selectedDevice, setSelectedDevice] = useState("");
  const [selectedService, setSelectedService] = useState("");

  // SIMPLE FILE SELECT ONLY
  const fileInputRef = useRef<HTMLInputElement>(null);

  const openFileBrowser = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen bg-black">

      {/* HERO SECTION */}
      <section className="relative h-[450px] overflow-hidden flex items-center justify-center">
        <motion.div
          className="absolute inset-0 -z-10"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            background:
              "linear-gradient(270deg, #000000, #0f0f0f, #1a1a1a, #050505)",
            backgroundSize: "400% 400%",
          }}
        />

        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Book a Service
          </h1>

          <p className="text-gray-300 max-w-xl mx-auto">
            Tell us your issue and schedule a professional service instantly
          </p>
        </div>
      </section>

      {/* FORM SECTION */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">

            {/* Progress Steps */}
            <div className="flex items-center justify-center mb-12">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                      step >= s
                        ? "bg-blue-600 text-white"
                        : "bg-white/10 text-gray-400"
                    }`}
                  >
                    {step > s ? <Check className="w-5 h-5" /> : s}
                  </div>
                  {s < 3 && (
                    <div
                      className={`w-16 md:w-24 h-1 ${
                        step > s ? "bg-blue-600" : "bg-white/10"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-8 rounded-3xl border border-white/10 backdrop-blur-md 
              bg-gradient-to-br from-black via-black/80 to-gray-900"
            >

              {/* STEP 2 - ISSUE DETAILS */}
              {step === 2 && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">
                    Describe the Issue
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <Label className="text-white">Problem Details</Label>
                      <Textarea
                        placeholder="Describe your problem..."
                        className="mt-2 bg-black/50 border-white/10 text-white"
                      />
                    </div>

                    {/* WORKING IMAGE SELECT SECTION */}
                    <div>
                      <Label className="text-white">Upload Photos</Label>

                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        ref={fileInputRef}
                        className="hidden"
                      />

                      <div
                        onClick={openFileBrowser}
                        className="mt-2 border-2 border-dashed border-white/10 rounded-xl p-8 text-center text-gray-400 cursor-pointer hover:border-blue-600 transition"
                      >
                        <Upload className="w-10 h-10 mx-auto mb-2" />
                        <p className="text-sm">
                          Click here to browse and select images
                        </p>
                      </div>
                    </div>

                    {selectedService === "onsite" && (
                      <div>
                        <Label className="text-white">Address</Label>
                        <Textarea
                          placeholder="Enter your address"
                          className="mt-2 bg-black/50 border-white/10 text-white"
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex gap-4 mt-8">
                    <Button
                      variant="outline"
                      className="border-white text-white"
                      onClick={() => setStep(1)}
                    >
                      Back
                    </Button>

                    <Button
                      className="flex-1 bg-gradient-to-r from-blue-600 to-blue-800 text-white"
                      onClick={() => setStep(3)}
                    >
                      Continue
                      <ArrowRight className="w-5 h-5 ml-2" />
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
