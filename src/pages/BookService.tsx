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
  Headphones,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { supabase } from "@/lib/supabase";

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

/* ------------------ IT SERVICE BANNERS ------------------ */

const slides = [
  {
    title: "Professional IT Support",
    text: "Expert laptop, desktop, printer & network repair services.",
    image: "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=1600",
    icon: Headphones,
  },
  {
    title: "Fast On-Site & Remote Service",
    text: "Quick technician assignment for home & office IT issues.",
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1600",
    icon: Clock,
  },
  {
    title: "Secure Systems & Networks",
    text: "Protection against malware, data loss & network failures.",
    image: "https://images.unsplash.com/photo-1600267165477-6d4cc741b379?w=1600",
    icon: ShieldCheck,
  },
];

const BookService = () => {
  const [step, setStep] = useState(1);
  const [index, setIndex] = useState(0);

  const [selectedDevice, setSelectedDevice] = useState("");
  const [selectedService, setSelectedService] = useState("");

  const [problem, setProblem] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");

  /* ------------------ AUTO SLIDER ------------------ */
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  /* ------------------ LOAD USER PROFILE ------------------ */
  useEffect(() => {
    const loadProfile = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data?.user) return;

      setUser(data.user);

      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", data.user.id)
        .single();

      if (profileData) {
        setProfile(profileData);
        setAddress(profileData.address || "");
        setCity(profileData.city || "");
        setPincode(profileData.pincode || "");
      }
    };

    loadProfile();
  }, []);

  /* ------------------ IMAGE HANDLER ------------------ */
  const handleImage = (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  /* ------------------ IMAGE UPLOAD (OPTIONAL) ------------------ */
  const uploadImage = async () => {
    if (!image || !user) return null;

    const filePath = `${user.id}/${Date.now()}-${image.name}`;

    const { error } = await supabase.storage
      .from("booking-images")
      .upload(filePath, image);

    if (error) throw error;

    return filePath;
  };

  /* ------------------ SUBMIT BOOKING ------------------ */
  const submitBooking = async () => {
    if (!user) {
      alert("Please login to submit booking");
      return;
    }

    const imagePath = await uploadImage();

    const { error } = await supabase.from("bookings").insert({
      user_id: user.id,
      device_type: selectedDevice,
      service_type: selectedService,
      problem_description: problem,
      image_url: imagePath,
      address,
      city,
      pincode,
      status: "pending",
    });

    if (error) {
      alert("Failed to submit booking");
      return;
    }

    if (!profile?.address) {
      await supabase
        .from("profiles")
        .update({ address, city, pincode })
        .eq("id", user.id);
    }

    alert("Booking submitted successfully!");
    setStep(1);
  };

  return (
    <div className="min-h-screen bg-black">

      {/* ------------------ SLIDER ------------------ */}
      <section className="relative h-[380px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
          >
            <img src={slides[index].image} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/70 flex items-center">
              <div className="container mx-auto px-4 text-white">
                <slides[index].icon className="w-12 h-12 text-blue-400 mb-4" />
                <h2 className="text-3xl font-bold mb-3">{slides[index].title}</h2>
                <p className="max-w-xl text-gray-300">{slides[index].text}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ------------------ FORM ------------------ */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">

          {/* ------------------ STEP 1 ------------------ */}
          {step === 1 && (
            <>
              <h2 className="text-2xl font-bold text-white mb-6">Select Device & Service</h2>

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
                    <d.icon className="mx-auto text-blue-400 mb-2" />
                    <span className="text-white text-sm">{d.label}</span>
                  </button>
                ))}
              </div>

              <RadioGroup
                value={selectedService}
                onValueChange={setSelectedService}
                className="mt-6"
              >
                {serviceTypes.map((s) => (
                  <label key={s.id} className="flex gap-3 p-4 border border-white/10 rounded-xl mt-2">
                    <RadioGroupItem value={s.id} />
                    <div>
                      <div className="text-white">{s.label}</div>
                      <div className="text-gray-400 text-sm">{s.description}</div>
                    </div>
                  </label>
                ))}
              </RadioGroup>

              <Button
                className="w-full mt-6"
                disabled={!selectedDevice || !selectedService}
                onClick={() => setStep(2)}
              >
                Continue <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </>
          )}

          {/* ------------------ STEP 2 ------------------ */}
          {step === 2 && (
            <>
              <Label className="text-white">Problem Details</Label>
              <Textarea
                className="mt-2 bg-black/50 text-white"
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
              />

              <Label className="text-white mt-6 block">Upload Image (Optional)</Label>
              <input type="file" onChange={handleImage} />

              {preview && <img src={preview} className="w-40 mt-4 rounded-xl" />}

              <div className="flex gap-4 mt-6">
                <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
                <Button onClick={() => setStep(3)}>Continue</Button>
              </div>
            </>
          )}

          {/* ------------------ STEP 3 ------------------ */}
          {step === 3 && (
            <>
              <Input value={profile?.full_name || ""} disabled className="mb-3" />
              <Input value={profile?.phone || ""} disabled className="mb-3" />
              <Input value={profile?.email || ""} disabled className="mb-3" />

              {!profile?.address && (
                <>
                  <Input placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
                  <Input placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
                  <Input placeholder="Pincode" value={pincode} onChange={(e) => setPincode(e.target.value)} />
                </>
              )}

              <div className="flex gap-4 mt-6">
                <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
                <Button onClick={submitBooking}>Submit Booking</Button>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default BookService;
