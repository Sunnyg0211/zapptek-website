import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }

    setLoading(true);

    const { error } = await signIn(email, password);

    setLoading(false);

    if (error) {
      toast.error(error.message || "Failed to sign in");
    } else {
      toast.success("Welcome back!");
      navigate("/admin");
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* LEFT SIDE - LOGIN SECTION (WHITE BACKGROUND) */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-black text-white p-8 rounded-3xl shadow-2xl"
        >

          {/* LOGO + NAME */}
          <Link to="/" className="flex items-center gap-3 mb-8">
            <img
              src="/logo_main.png"
              alt="ZappTek Logo"
              className="w-12 h-12 object-contain"
            />

            <span className="text-2xl font-bold text-white">
              ZappTek
            </span>
          </Link>

          <h1 className="text-3xl font-bold mb-2 text-white">
            Welcome back
          </h1>

          <p className="text-gray-400 mb-8">
            Sign in to access your dashboard
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* EMAIL */}
            <div>
              <Label className="text-white">Email Address</Label>

              <div className="relative mt-2">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="pl-10 bg-black border-white/20 text-white"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <Label className="text-white">Password</Label>

              <div className="relative mt-2">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

            {/* FORGOT PASSWORD */}
            <div className="text-right">
              <Link
                to="/forgot-password"
                className="text-sm text-blue-400 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            {/* SUBMIT BUTTON */}
            <Button
              className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white mt-6"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>

          </form>

          <p className="text-center text-gray-400 mt-6">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-400 hover:underline">
              Create account
            </Link>
          </p>

        </motion.div>
      </div>

      {/* RIGHT SIDE - BRAND SECTION (DARK THEME) */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden items-center justify-center p-12">

        {/* ANIMATED DARK BACKGROUND */}
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

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="relative z-10 text-center max-w-md"
        >
          <img
            src="/logo_main.png"
            alt="ZappTek"
            className="w-32 mx-auto mb-6"
          />

          <h2 className="text-3xl font-bold text-white mb-4">
            Welcome to ZappTek
          </h2>

          <p className="text-gray-300">
            Access your dashboard to manage bookings, track services,
            view invoices, and more.
          </p>
        </motion.div>
      </div>

    </div>
  );
};

export default Login;
