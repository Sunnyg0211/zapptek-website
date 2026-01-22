import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ HANDLE SESSION AFTER GOOGLE REDIRECT
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        navigate("/admin", { replace: true });
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        navigate("/admin", { replace: true });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  // 🔐 GOOGLE LOGIN ONLY
  const handleGoogleLogin = async () => {
    setLoading(true);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        // ✅ redirect back to site root (NOT /admin)
        redirectTo: window.location.origin,
      },
    });

    if (error) {
      setLoading(false);
      toast.error(error.message || "Google login failed");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* LEFT SIDE */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-black text-white p-8 rounded-3xl shadow-2xl"
        >
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3 mb-10">
            <img
              src="/logo_main.png"
              alt="ZappTek Logo"
              className="w-12 h-12 object-contain"
            />
            <span className="text-2xl font-bold text-white">ZappTek</span>
          </Link>

          <h1 className="text-3xl font-bold mb-2 text-white">
            Sign in to ZappTek
          </h1>

          <p className="text-gray-400 mb-10">
            Secure login using your Google account
          </p>

          {/* GOOGLE LOGIN BUTTON */}
          <Button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full bg-white text-black hover:bg-gray-100 flex items-center justify-center gap-3 py-6 text-lg"
          >
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="Google"
              className="w-5 h-5"
            />
            {loading ? "Redirecting..." : "Continue with Google"}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>

          <p className="text-center text-gray-400 text-sm mt-6">
            Email & password login is currently disabled.
          </p>
        </motion.div>
      </div>

      {/* RIGHT SIDE */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden items-center justify-center p-12">
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
            Log in securely with Google to manage services, bookings, invoices,
            and more.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
