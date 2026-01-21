import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Mail, ArrowLeft, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // If user is already logged in, redirect them
  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        navigate("/dashboard");
      }
    };

    checkUser();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        throw error;
      }

      toast.success(
        "Password reset link has been sent to your email!"
      );

      setEmail("");
    } catch (error: any) {
      toast.error(
        error.message || "Failed to send reset email. Please try again."
      );
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex bg-white">

      {/* LEFT SIDE - FULL BLACK THEME */}
      <div className="hidden lg:flex flex-1 bg-black items-center justify-center p-12">

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <img
            src="/logo_main.png"
            alt="ZappTek Logo"
            className="w-32 mx-auto mb-6"
          />

          <h2 className="text-3xl font-bold text-white mb-4">
            Forgot Your Password?
          </h2>

          <p className="text-gray-400">
            No worries! Enter your email and we’ll help you reset it quickly.
          </p>
        </motion.div>
      </div>

      {/* RIGHT SIDE - LIGHT BACKGROUND WITH BLACK CARD */}
      <div className="flex-1 flex items-center justify-center p-8 bg-[#f1f5f9]">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-black text-white border border-gray-700 p-8 rounded-3xl shadow-xl"
        >

          {/* Logo & Title */}
          <Link to="/" className="flex items-center gap-3 mb-6">
            <img
              src="/logo_main.png"
              alt="ZappTek"
              className="w-10 h-10 object-contain"
            />

            <span className="text-2xl font-bold text-white">
              ZappTek
            </span>
          </Link>

          <h1 className="text-2xl font-bold mb-2">
            Reset Password
          </h1>

          <p className="text-gray-400 mb-6">
            Enter your registered email to receive a password reset link.
          </p>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-4">

            <div>
              <Label className="text-white">Email Address</Label>

              <div className="relative mt-2">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

                <Input
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-black/60 border-white/10 text-white"
                />
              </div>
            </div>

            <Button
              className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white mt-4"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Reset Link"}
              <Send className="w-4 h-4 ml-2" />
            </Button>

          </form>

          {/* BACK TO LOGIN */}
          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="text-blue-400 hover:underline flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Login
            </Link>
          </div>

        </motion.div>

      </div>

    </div>
  );
};

export default ForgotPassword;
