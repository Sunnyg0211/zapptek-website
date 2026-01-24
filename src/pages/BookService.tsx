import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
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

/* ------------------ STATIC DATA ------------------ */

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

export default function BookService() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [index, setIndex] = useState(0);

  const [device, setDevice] = useState("");
  const [service, setService] = useState("");
  const [description, setDescription] = useState("");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");

  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  /* Slider */
  useEffect(() => {
    const i = setInterval(() => {
      setIndex((p) => (p + 1) % slides.length);
    }, 4000);
    return () => clearInterval(i);
  }, []);

  /* Submit Booking */
  const submitBooking = async () => {
    try {
      setLoading(true);

      // 1️⃣ Auth user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Please login first");
        navigate("/login");
        return;
      }

      // 2️⃣ Get username from profiles
      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", user.id)
        .single();

      // 3️⃣ Upload image
      let imageUrl = null;
      if (image) {
        const filePath = `bookings/${user.id}-${Date.now()}`;
        const { error } = await supabase.storage
          .from("booking-images")
          .upload(filePath, image);

        if (error) throw error;

        imageUrl = filePath;
      }

      // 4️⃣ Insert booking
      const { error } = await supabase.from("bookings").insert({
        user_id: user.id,
        username: profile?.full_name || "Customer",
        contact_email: contactEmail,
        phone,
        city,
        address,
        device,
        service_type: service,
        description,
        image_url: imageUrl,
      });

      if (error) throw error;

      toast.success("Booking submitted successfully!");
      navigate("/");

    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to submit booking");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Slider */}
      <section className="relative h-[350px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div key={index} className="absolute inset-0">
            <img src={slides[index].image} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
              <div className="text-center px-4">
                {(() => {
                  const Icon = slides[index].icon;
                  return <Icon className="mx-auto mb-4 text-blue-400 w-10 h-10" />;
                })()}
                <h2 className="text-3xl font-bold">{slides[index].title}</h2>
                <p className="text-gray-300">{slides[index].text}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* FORM */}
      <section className="py-14">
        <div className="max-w-3xl mx-auto p-8 border border-white/10 rounded-2xl bg-black/70">
          {step === 1 && (
            <>
              <h2 className="text-xl mb-4">Select Device & Service</h2>
              <div className="grid grid-cols-3 gap-3">
                {deviceTypes.map(d => (
                  <button key={d.id} onClick={() => setDevice(d.id)}
                    className={`p-4 rounded ${device === d.id ? "bg-blue-600" : "bg-white/10"}`}>
                    <d.icon className="mx-auto" />
                    {d.label}
                  </button>
                ))}
              </div>

              <RadioGroup className="mt-6" value={service} onValueChange={setService}>
                {serviceTypes.map(s => (
                  <label key={s.id} className="flex gap-2 items-center">
                    <RadioGroupItem value={s.id} /> {s.label}
                  </label>
                ))}
              </RadioGroup>

              <Button className="mt-6 w-full" onClick={() => setStep(2)} disabled={!device || !service}>
                Continue
              </Button>
            </>
          )}

          {step === 2 && (
            <>
              <Textarea
                placeholder="Describe the issue"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <Input type="file" className="mt-4" onChange={(e) => setImage(e.target.files?.[0] || null)} />

              <Button className="mt-6 w-full" onClick={() => setStep(3)}>
                Continue
              </Button>
            </>
          )}

          {step === 3 && (
            <>
              <Input placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} />
              <Input placeholder="Contact Email" value={contactEmail} onChange={e => setContactEmail(e.target.value)} />
              <Input placeholder="City" value={city} onChange={e => setCity(e.target.value)} />
              <Textarea placeholder="Address" value={address} onChange={e => setAddress(e.target.value)} />

              <Button className="mt-6 w-full" onClick={submitBooking} disabled={loading}>
                {loading ? "Submitting..." : "Submit Booking"}
              </Button>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
