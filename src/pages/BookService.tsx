import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, MapPin, Upload, Check, ArrowRight, Monitor, Laptop, Printer, Camera, Wifi, HardDrive } from "lucide-react";
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

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-16 md:py-20 gradient-hero relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-primary-foreground mb-4"
            >
              Book a Service
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-primary-foreground/70"
            >
              Fill out the form below and our team will get back to you shortly.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Booking Form */}
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
                        ? "gradient-bg text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {step > s ? <Check className="w-5 h-5" /> : s}
                  </div>
                  {s < 3 && (
                    <div
                      className={`w-16 md:w-24 h-1 ${
                        step > s ? "bg-primary" : "bg-muted"
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
              className="bg-card rounded-3xl p-8 shadow-lg border border-border"
            >
              {/* Step 1: Select Device & Service Type */}
              {step === 1 && (
                <div>
                  <h2 className="text-2xl font-display font-bold mb-6">
                    What do you need help with?
                  </h2>

                  <div className="mb-8">
                    <Label className="text-base font-semibold mb-4 block">Select Device Type</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {deviceTypes.map((device) => (
                        <button
                          key={device.id}
                          onClick={() => setSelectedDevice(device.id)}
                          className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                            selectedDevice === device.id
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          <device.icon className={`w-8 h-8 mx-auto mb-2 ${
                            selectedDevice === device.id ? "text-primary" : "text-muted-foreground"
                          }`} />
                          <span className={`text-sm font-medium ${
                            selectedDevice === device.id ? "text-primary" : "text-foreground"
                          }`}>
                            {device.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-8">
                    <Label className="text-base font-semibold mb-4 block">Service Type</Label>
                    <RadioGroup value={selectedService} onValueChange={setSelectedService}>
                      <div className="space-y-3">
                        {serviceTypes.map((service) => (
                          <label
                            key={service.id}
                            className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                              selectedService === service.id
                                ? "border-primary bg-primary/5"
                                : "border-border hover:border-primary/50"
                            }`}
                          >
                            <RadioGroupItem value={service.id} />
                            <div>
                              <div className="font-medium">{service.label}</div>
                              <div className="text-sm text-muted-foreground">{service.description}</div>
                            </div>
                          </label>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>

                  <Button
                    variant="gradient"
                    size="lg"
                    className="w-full"
                    onClick={() => setStep(2)}
                    disabled={!selectedDevice || !selectedService}
                  >
                    Continue
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </div>
              )}

              {/* Step 2: Issue Details */}
              {step === 2 && (
                <div>
                  <h2 className="text-2xl font-display font-bold mb-6">
                    Describe the Issue
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="issue">What's the problem?</Label>
                      <Textarea
                        id="issue"
                        placeholder="Describe the issue you're facing..."
                        className="mt-2 min-h-[120px]"
                      />
                    </div>

                    <div>
                      <Label>Upload Photos (Optional)</Label>
                      <div className="mt-2 border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                        <Upload className="w-10 h-10 mx-auto text-muted-foreground mb-3" />
                        <p className="text-sm text-muted-foreground">
                          Drag & drop images or click to browse
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="date">Preferred Date</Label>
                        <div className="relative mt-2">
                          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                          <Input id="date" type="date" className="pl-10" />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="time">Preferred Time</Label>
                        <Input id="time" type="time" className="mt-2" />
                      </div>
                    </div>

                    {selectedService === "onsite" && (
                      <div>
                        <Label htmlFor="address">Service Address</Label>
                        <div className="relative mt-2">
                          <MapPin className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                          <Textarea
                            id="address"
                            placeholder="Enter your complete address..."
                            className="pl-10"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-4 mt-8">
                    <Button variant="outline" size="lg" onClick={() => setStep(1)}>
                      Back
                    </Button>
                    <Button
                      variant="gradient"
                      size="lg"
                      className="flex-1"
                      onClick={() => setStep(3)}
                    >
                      Continue
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Contact Details */}
              {step === 3 && (
                <div>
                  <h2 className="text-2xl font-display font-bold mb-6">
                    Your Contact Details
                  </h2>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" placeholder="John Doe" className="mt-2" />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" placeholder="+91 98765 43210" className="mt-2" />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" placeholder="john@example.com" className="mt-2" />
                    </div>

                    <div className="p-4 bg-muted/50 rounded-xl">
                      <h4 className="font-semibold mb-2">Booking Summary</h4>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p>Device: {deviceTypes.find(d => d.id === selectedDevice)?.label}</p>
                        <p>Service: {serviceTypes.find(s => s.id === selectedService)?.label}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-8">
                    <Button variant="outline" size="lg" onClick={() => setStep(2)}>
                      Back
                    </Button>
                    <Button
                      variant="gradient"
                      size="lg"
                      className="flex-1"
                      asChild
                    >
                      <Link to="/login">
                        Submit Booking
                        <ArrowRight className="w-5 h-5" />
                      </Link>
                    </Button>
                  </div>

                  <p className="text-sm text-muted-foreground text-center mt-4">
                    Already have an account?{" "}
                    <Link to="/login" className="text-primary hover:underline">
                      Login
                    </Link>{" "}
                    to track your bookings.
                  </p>
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
