import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

const AuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [status, setStatus] = useState<
    "loading" | "success" | "error"
  >("loading");

  useEffect(() => {
    const handleAuth = async () => {
      try {
        // Get access token from URL (magic link flow)
        const accessToken = searchParams.get("access_token");
        const refreshToken = searchParams.get("refresh_token");

        if (accessToken && refreshToken) {
          const { error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });

          if (error) throw error;

          setStatus("success");
          toast.success("Email verified successfully!");
          setTimeout(() => navigate("/login"), 2000);
          return;
        }

        // Fallback - check session directly
        const { data, error } = await supabase.auth.getSession();

        if (error) throw error;

        if (data.session) {
          setStatus("success");
          toast.success("Authentication successful!");
          setTimeout(() => navigate("/login"), 2000);
        } else {
          throw new Error("Invalid or expired link");
        }
      } catch (err: any) {
        console.error("Auth callback error:", err);
        setStatus("error");
        toast.error(err.message || "Authentication failed");
      }
    };

    handleAuth();
  }, [navigate, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-zinc-900 p-10 rounded-2xl shadow-xl text-center max-w-md w-full"
      >
        {status === "loading" && (
          <>
            <Loader2 className="w-12 h-12 mx-auto animate-spin text-blue-500 mb-4" />
            <h2 className="text-xl font-semibold mb-2">
              Verifying your account...
            </h2>
            <p className="text-gray-400">
              Please wait while we authenticate your request
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <CheckCircle className="w-12 h-12 mx-auto text-green-500 mb-4" />
            <h2 className="text-xl font-semibold mb-2">
              Verification Successful!
            </h2>
            <p className="text-gray-400">
              Your account has been verified. Redirecting to login...
            </p>
          </>
        )}

        {status === "error" && (
          <>
            <XCircle className="w-12 h-12 mx-auto text-red-500 mb-4" />
            <h2 className="text-xl font-semibold mb-2">
              Verification Failed
            </h2>
            <p className="text-gray-400 mb-4">
              The verification link is invalid or expired.
            </p>

            <button
              onClick={() => navigate("/register")}
              className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Back to Register
            </button>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default AuthCallback;
