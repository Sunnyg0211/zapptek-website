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
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

/* DEVICE TYPES */
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
    text: "Schedule IT support 24/7",
    image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=1200",
    icon: Calendar
  },
  {
    title: "Faster Response",
    text: "Quick technician assignment",
    image: "https://images.unsplash.com/photo-1517430816045-df4b7de4a7d5?w=1200",
    icon: Clock
  },
  {
    title: "Secure & Reliable",
    text: "Handled securely",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200",
    icon: ShieldCheck
  }
];

const BookService = () => {
  const { user } = useAuth();

  const [step, setStep] = useState(1);
  const [selectedDevice, setSelectedDevice] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [issueDetails, setIssueDetails] = useState("");

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const i = setInterval(() => setIndex(p => (p + 1) % slides.length), 4000);
    return () => clearInterval(i);
  }, []);

  const handleImage = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const submitBooking = async () => {
    try {
      if (!user) {
        toast.error("Please login to book service");
        return;
      }

      let imageUrl: string | null = null;

      if (image) {
        const filePath = `bookings/${user.id}/${Date.now()}-${image.name}`;
        const { error: uploadError } = await supabase.storage
          .from("booking-images")
          .upload(filePath, image);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage
          .from("booking-images")
          .getPublicUrl(filePath);

        imageUrl = data.publicUrl;
      }

      const { error } = await supabase.from("bookings").insert({
        user_id: user.id,
        full_name: fullName,
        phone,
        email,
        city,
        address,
        device_type: selectedDevice,
        service_type: selectedService,
        issue_details: issueDetails, // ✅ CORRECT COLUMN
        image_url: imageUrl,
        status: "pending",
      });

      if (error) throw error;

      toast.success("Booking submitted successfully!");
      setStep(1);
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to submit booking");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">

      {/* SLIDER */}
      <section className="relative h-[380px] overflow-hidden">
        <AnimatePresence>
          <motion.img
            key={index}
            src={slides[index].image}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        </AnimatePresence>
      </section>

      {/* FORM */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto p-8 bg-black/70 rounded-3xl">

          {step === 1 && (
            <>
              <h2 className="text-2xl mb-4">Select Device & Service</h2>

              <div className="grid grid-cols-3 gap-4">
                {deviceTypes.map(d => (
                  <button
                    key={d.id}
                    onClick={() => setSelectedDevice(d.id)}
                    className={`p-4 border rounded ${
                      selectedDevice === d.id ? "border-blue-500" : "border-white/20"
                    }`}
                  >
                    <d.icon className="mx-auto" />
                    {d.label}
                  </button>
                ))}
              </div>

              <RadioGroup
                className="mt-6"
                value={selectedService}
                onValueChange={setSelectedService}
              >
                {serviceTypes.map(s => (
                  <label key={s.id} className="flex gap-2 items-center">
                    <RadioGroupItem value={s.id} />
                    {s.label}
                  </label>
                ))}
              </RadioGroup>

              <Button
                className="mt-6"
                disabled={!selectedDevice || !selectedService}
                onClick={() => setStep(2)}
              >
                Continue
              </Button>
            </>
          )}

          {step === 2 && (
            <>
              <Label>Issue Details</Label>
              <Textarea
                value={issueDetails}
                onChange={e => setIssueDetails(e.target.value)}
                className="mb-4"
              />

              <Label>Upload Image</Label>
              <Input type="file" onChange={handleImage} />

              {preview && <img src={preview} className="mt-4 w-40 rounded" />}

              <Button className="mt-6" onClick={() => setStep(3)}>
                Continue
              </Button>
            </>
          )}

          {step === 3 && (
            <>
              <Input placeholder="Full Name" value={fullName} onChange={e => setFullName(e.target.value)} />
              <Input placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} />
              <Input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
              <Input placeholder="City" value={city} onChange={e => setCity(e.target.value)} />
              <Textarea placeholder="Address" value={address} onChange={e => setAddress(e.target.value)} />

              <Button className="mt-6 bg-blue-600" onClick={submitBooking}>
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
