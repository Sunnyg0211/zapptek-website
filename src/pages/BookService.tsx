import { useState } from "react";
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
  Trash2,
  Mail,
  Paperclip
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

  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    issue: "",
    address: "",
  });

  // IMAGE UPLOAD + PREVIEW
  const handleFileChange = (e: any) => {
    const selected = Array.from(e.target.files) as File[];

    setFiles([...files, ...selected]);

    const newPreviews = selected.map((file) =>
      URL.createObjectURL(file)
    );

    setPreviews([...previews, ...newPreviews]);
  };

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    const updatedPreviews = previews.filter((_, i) => i !== index);

    setFiles(updatedFiles);
    setPreviews(updatedPreviews);
  };

  // SIMULATED EMAIL TRIGGER (READY FOR API)
  const sendConfirmationEmail = () => {
    console.log("Email Sent To:", formData.email);

    alert(
      `Booking confirmation email sent to ${formData.email}`
    );
  };

  const handleSubmit = () => {
    sendConfirmationEmail();
    alert("Booking submitted successfully!");
  };

  return (
    <div className="min-h-screen bg-black">

      {/* HERO SECTION */}
      <section className="relative h-[450px] flex items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-0 -z-10"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          style={{
            background: "linear-gradient(270deg, #000000, #0f0f0f, #1a1a1a, #050505)",
            backgroundSize: "400% 400%",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Book a Service
          </h1>

          <p className="text-gray-300">
            Schedule professional IT support in just a few steps
          </p>
        </motion.div>
      </section>

      {/* FORM SECTION */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">

          {/* STEPS */}
          <div className="flex justify-center mb-10">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <motion.div
                  animate={{ scale: step === s ? 1.2 : 1 }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step >= s
                      ? "bg-blue-600 text-white"
                      : "bg-white/10 text-gray-400"
                  }`}
                >
                  {step > s ? <Check /> : s}
                </motion.div>

                {s < 3 && (
                  <div className="w-16 h-1 bg-white/10" />
                )}
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              className="p-8 rounded-3xl border border-white/10 bg-black/70"
            >

              {/* STEP 1 */}
              {step === 1 && (
                <div>
                  <h2 className="text-2xl text-white mb-6">
                    Select Device & Service
                  </h2>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    {deviceTypes.map((d) => (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        key={d.id}
                        onClick={() => setSelectedDevice(d.id)}
                        className={`p-4 rounded-xl border ${
                          selectedDevice === d.id
                            ? "border-blue-600"
                            : "border-white/10"
                        }`}
                      >
                        <d.icon className="mx-auto text-blue-400 mb-2" />
                        <span className="text-white">{d.label}</span>
                      </motion.button>
                    ))}
                  </div>

                  <RadioGroup
                    value={selectedService}
                    onValueChange={setSelectedService}
                  >
                    {serviceTypes.map((s) => (
                      <label
                        key={s.id}
                        className="flex gap-3 p-4 border border-white/10 rounded-xl mb-3"
                      >
                        <RadioGroupItem value={s.id} />
                        <div>
                          <p className="text-white">{s.label}</p>
                          <p className="text-sm text-gray-400">{s.description}</p>
                        </div>
                      </label>
                    ))}
                  </RadioGroup>

                  <Button
                    className="w-full mt-4 bg-blue-600"
                    onClick={() => setStep(2)}
                    disabled={!selectedDevice || !selectedService}
                  >
                    Continue <ArrowRight className="ml-2" />
                  </Button>
                </div>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <div>
                  <h2 className="text-2xl text-white mb-6">
                    Describe Your Issue
                  </h2>

                  <Textarea
                    placeholder="Explain your problem..."
                    className="bg-black text-white mb-4"
                    onChange={(e) =>
                      setFormData({ ...formData, issue: e.target.value })
                    }
                  />

                  {/* FILE UPLOAD */}
                  <Label className="text-white">
                    Upload Images / Files
                  </Label>

                  <div className="border-2 border-dashed p-6 text-center rounded-xl mt-2">
                    <input
                      type="file"
                      multiple
                      onChange={handleFileChange}
                      className="hidden"
                      id="fileInput"
                    />

                    <label
                      htmlFor="fileInput"
                      className="cursor-pointer text-gray-400"
                    >
                      <Upload className="mx-auto mb-2" />
                      Click to browse files
                    </label>
                  </div>

                  {/* PREVIEWS */}
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    {previews.map((img, i) => (
                      <div key={i} className="relative">
                        <img
                          src={img}
                          className="rounded-lg h-24 w-full object-cover"
                        />

                        <button
                          onClick={() => removeFile(i)}
                          className="absolute top-1 right-1 bg-red-600 p-1 rounded"
                        >
                          <Trash2 className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {selectedService === "onsite" && (
                    <Textarea
                      placeholder="Your Address"
                      className="bg-black text-white mt-4"
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                    />
                  )}

                  <div className="flex gap-3 mt-6">
                    <Button onClick={() => setStep(1)}>Back</Button>

                    <Button
                      className="flex-1 bg-blue-600"
                      onClick={() => setStep(3)}
                    >
                      Continue
                    </Button>
                  </div>
                </div>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <div>
                  <h2 className="text-2xl text-white mb-6">
                    Contact Details
                  </h2>

                  <Input
                    placeholder="Name"
                    className="bg-black text-white mb-3"
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />

                  <Input
                    placeholder="Phone"
                    className="bg-black text-white mb-3"
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />

                  <Input
                    placeholder="Email"
                    className="bg-black text-white mb-3"
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />

                  {/* ATTACHMENT COUNT */}
                  <div className="text-gray-300 flex items-center gap-2 mb-4">
                    <Paperclip /> {files.length} attachments added
                  </div>

                  <Button
                    className="w-full bg-green-600"
                    onClick={handleSubmit}
                  >
                    Submit Booking <Mail className="ml-2" />
                  </Button>
                </div>
              )}

            </motion.div>
          </AnimatePresence>

        </div>
      </section>
    </div>
  );
};

export default BookService;
