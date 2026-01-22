import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
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

/* ---------------- ICON MAP ---------------- */

const iconMap: any = {
  monitor: Monitor,
  laptop: Laptop,
  printer: Printer,
  camera: Camera,
  wifi: Wifi,
  storage: HardDrive,
  calendar: Calendar,
  clock: Clock,
  shield: ShieldCheck,
};

const BookService = () => {
  const [step, setStep] = useState(1);
  const [selectedDevice, setSelectedDevice] = useState("");
  const [selectedService, setSelectedService] = useState("");

  const [devices, setDevices] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [slides, setSlides] = useState<any[]>([]);

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [slideIndex, setSlideIndex] = useState(0);
  const [errors, setErrors] = useState<any>({});

  /* ---------------- FETCH DATA ---------------- */

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    const [devicesRes, servicesRes, slidesRes] = await Promise.all([
      supabase.from("service_devices").select("*").eq("is_active", true),
      supabase.from("service_types").select("*").eq("is_active", true),
      supabase.from("service_slides").select("*").eq("is_active", true),
    ]);

    setDevices(devicesRes.data || []);
    setServices(servicesRes.data || []);
    setSlides(slidesRes.data || []);
  };

  /* ---------------- SLIDER AUTO PLAY ---------------- */

  useEffect(() => {
    if (!slides.length) return;
    const i = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(i);
  }, [slides]);

  /* ---------------- IMAGE HANDLER ---------------- */

  const handleImage = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const validateStep2 = () => {
    const err: any = {};
    if (!image) err.image = "Please upload at least one image";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  return (
    <div className="min-h-screen bg-black">

      {/* SLIDER */}
      {slides.length > 0 && (
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
                src={slides[slideIndex].image_url}
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-black/70 flex items-center">
                <div className="container mx-auto px-4 text-white">
                  <motion.div initial={{ y: 20 }} animate={{ y: 0 }}>
                    {(() => {
                      const Icon = iconMap[slides[slideIndex].icon];
                      return Icon ? <Icon className="w-12 h-12 text-blue-400 mb-4" /> : null;
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
      )}

      {/* FORM */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">

          {/* STEP 1 */}
          {step === 1 && (
            <>
              <h2 className="text-2xl font-bold text-white mb-6">
                What do you need help with?
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {devices.map((d) => {
                  const Icon = iconMap[d.icon];
                  return (
                    <motion.button
                      key={d.id}
                      onClick={() => setSelectedDevice(d.id)}
                      whileHover={{ scale: 1.03 }}
                      className={`p-5 rounded-2xl border ${
                        selectedDevice === d.id
                          ? "border-blue-600"
                          : "border-white/10"
                      }`}
                    >
                      {Icon && <Icon className="mx-auto mb-3 text-blue-400" />}
                      <span className="text-white">{d.label}</span>
                    </motion.button>
                  );
                })}
              </div>

              <RadioGroup
                className="mt-6"
                value={selectedService}
                onValueChange={setSelectedService}
              >
                {services.map((s) => (
                  <label
                    key={s.id}
                    className="flex gap-3 p-4 border border-white/10 rounded-xl mt-2 cursor-pointer"
                  >
                    <RadioGroupItem value={s.id} />
                    <div>
                      <div className="text-white">{s.label}</div>
                      <div className="text-gray-400 text-sm">
                        {s.description}
                      </div>
                    </div>
                  </label>
                ))}
              </RadioGroup>

              <Button
                className="w-full mt-6 bg-gradient-to-r from-blue-600 to-blue-800"
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
              <Label className="text-white">Problem Details</Label>
              <Textarea className="mt-2 bg-black/50 text-white border-white/10" />

              <Label className="text-white mt-6 block">Upload Image</Label>
              <input type="file" hidden id="file" onChange={handleImage} />
              <label htmlFor="file" className="block border-dashed border p-6 mt-3 text-center cursor-pointer">
                <Upload className="mx-auto mb-2" />
                Click to upload
              </label>

              {preview && <img src={preview} className="w-32 mt-4 rounded-xl" />}
              {errors.image && <p className="text-red-500">{errors.image}</p>}

              <Button
                className="w-full mt-6 bg-gradient-to-r from-blue-600 to-blue-800"
                onClick={() => validateStep2() && setStep(3)}
              >
                Continue
              </Button>
            </>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <>
              <Input placeholder="Full Name" className="mb-4" />
              <Input placeholder="Phone" className="mb-4" />
              <Input placeholder="Email" className="mb-4" />

              <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-800" asChild>
                <Link to="/login">Submit Booking</Link>
              </Button>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default BookService;
