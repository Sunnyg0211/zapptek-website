import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  Phone,
  User,
  ArrowRight,
  Check
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [verificationMethod, setVerificationMethod] = useState<"link" | "otp">(
    "link"
  );

  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password || !formData.firstName) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    const fullName = `${formData.firstName} ${formData.lastName}`.trim();

    try {
      // LINK BASED VERIFICATION
      if (verificationMethod === "link") {
        const { error } = await signUp(
          formData.email,
          formData.password,
          fullName,
          formData.phone
        );

        if (error) throw error;

        toast.success(
          "Verification link sent to your email. Please verify to continue."
        );

        navigate("/login");
      }

      // OTP BASED VERIFICATION
      else {
        const { error } = await supabase.auth.signInWithOtp({
          email: formData.email,
        });

        if (error) throw error;

        toast.success("OTP sent to your email address");
        setOtpSent(true);
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    }

    setLoading(false);
  };

  const verifyOtp = async () => {
    if (!otp) {
      toast.error("Please enter OTP");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.verifyOtp({
      email: formData.email,
      token: otp,
      type: "email",
    });

    setLoading(false);

    if (error) {
      toast.error("Invalid OTP. Please try again.");
      return;
    }

    toast.success("Account verified successfully!");

    navigate("/login");
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* LEFT SIDE */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-black p-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-white max-w-md"
        >
          <img src="/logo_main.png" alt="ZappTek" className="w-28 mb-6" />

          <h2 className="text-3xl font-bold mb-4">Join ZappTek Today</h2>

          <ul className="space-y-">
            {[
              "Book services online",
              "Track repair status",
              "Access invoices",
              "Priority support",
              "Exclusive offers",
            ].map((benefit, i) => (
              <li key={i} className="flex items-center gap-3 text-gray-300">
                <div className="w-6 h-6 rounded-full bg-blue-600/20 flex items-center justify-center">
                  <Check className="w-4 h-4 text-blue-400" />
                </div>
                {benefit}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-black text-white p-8 rounded-3xl shadow-2xl"
        >
          <Link to="/" className="flex items-center gap-3 mb-6">
            <img
              src="/logo_main.png"
              alt="ZappTek Logo"
              className="w-12 h-12 object-contain"
            />

            <span className="text-2xl font-bold text-white">ZappTek</span>
          </Link>

          <h1 className="text-3xl font-bold text-white mb-2">
            Create an account
          </h1>

          <p className="text-gray-400 mb-6">
            Get started with your free account
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-white">First Name</Label>

                <div className="relative mt-2">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

                  <Input
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    placeholder="John"
                    className="pl-10 bg-black border-white/20 text-white"
                  />
                </div>
              </div>

              <div>
                <Label className="text-white">Last Name</Label>

                <Input
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  placeholder="Doe"
                  className="mt-2 bg-black border-white/20 text-white"
                />
              </div>
            </div>

            <div>
              <Label className="text-white">Email Address</Label>

              <div className="relative mt-2">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="john@example.com"
                  className="pl-10 bg-black border-white/20 text-white"
                />
              </div>
            </div>

            <div>
              <Label className="text-white">Phone Number</Label>

              <div className="relative mt-2">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="+91 98765 43210"
                  className="pl-10 bg-black border-white/20 text-white"
                />
              </div>
            </div>

            <div>
              <Label className="text-white">Password</Label>

              <div className="relative mt-2">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

                <Input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder="••••••••"
                  className="pl-10 pr-10 bg-black border-white/20 text-white"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Verification Choice */}
            <div className="space-y-3">
              <Label className="text-white">Choose Verification Method</Label>

              <div className="flex gap-4">
                <Button
                  type="button"
                  variant={
                    verificationMethod === "link" ? "default" : "outline"
                  }
                  onClick={() => setVerificationMethod("link")}
                >
                  Email Link
                </Button>

                <Button
                  type="button"
                  variant={
                    verificationMethod === "otp" ? "default" : "outline"
                  }
                  onClick={() => setVerificationMethod("otp")}
                >
                  OTP
                </Button>
              </div>
            </div>

            {otpSent ? (
              <div className="space-y-4">
                <Label className="text-white">Enter OTP</Label>

                <Input
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                  className="bg-black border-white/20 text-white"
                />

                <Button
                  type="button"
                  onClick={verifyOtp}
                  className="w-full bg-green-600"
                  disabled={loading}
                >
                  Verify OTP
                </Button>
              </div>
            ) : (
              <Button
                className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white mt-6"
                disabled={loading}
              >
                {loading
                  ? "Processing..."
                  : verificationMethod === "link"
                  ? "Send Verification Link"
                  : "Send OTP"}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            )}
          </form>

          <p className="text-center text-gray-400 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-400 hover:underline">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
