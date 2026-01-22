import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { User, Phone, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGoogleSignup = async () => {
    if (!fullName.trim() || !phone.trim()) {
      toast.error("Full name and phone number are required");
      return;
    }

    setLoading(true);

    // Save temp data so AuthCallback can use it
    localStorage.setItem(
      "pending_profile",
      JSON.stringify({
        full_name: fullName.trim(),
        phone: phone.trim(),
      })
    );

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      toast.error(error.message || "Google signup failed");
      setLoading(false);
    }
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

          <h2 className="text-3xl font-bold mb-4">Join ZappTek</h2>

          <ul className="space-y-3 text-gray-300">
            <li>✔ Book services online</li>
            <li>✔ Track repair status</li>
            <li>✔ View invoices</li>
            <li>✔ Priority support</li>
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
            <span className="text-2xl font-bold">ZappTek</span>
          </Link>

          <h1 className="text-3xl font-bold mb-2">Sign up with Google</h1>
          <p className="text-gray-400 mb-6">
            Enter your details to continue
          </p>

          {/* FULL NAME */}
          <div className="mb-4">
            <Label className="text-white">Full Name *</Label>
            <div className="relative mt-2">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="John Doe"
                className="pl-10 bg-black border-white/20 text-white"
              />
            </div>
          </div>

          {/* PHONE */}
          <div className="mb-6">
            <Label className="text-white">Phone Number *</Label>
            <div className="relative mt-2">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="pl-10 bg-black border-white/20 text-white"
              />
            </div>
          </div>

          {/* GOOGLE SIGNUP */}
          <Button
            onClick={handleGoogleSignup}
            disabled={loading}
            className="w-full bg-white text-black hover:bg-gray-100 flex items-center justify-center gap-3 py-6 text-lg"
          >
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="Google"
              className="w-5 h-5"
            />
            {loading ? "Redirecting..." : "Sign up with Google"}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>

          <p className="text-center text-gray-400 text-sm mt-6">
            By continuing, you agree to our Terms & Privacy Policy.
          </p>

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
