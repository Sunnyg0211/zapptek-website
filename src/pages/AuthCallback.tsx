import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

type Status = "loading" | "success" | "error";

const AuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    const handleAuth = async () => {
      try {
        // 1️⃣ Handle magic link / OAuth session
        const accessToken = searchParams.get("access_token");
        const refreshToken = searchParams.get("refresh_token");

        if (accessToken && refreshToken) {
          const { error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });
          if (error) throw error;
        }

        // 2️⃣ Get active session
        const { data: sessionData, error: sessionError } =
          await supabase.auth.getSession();

        if (sessionError || !sessionData.session) {
          throw new Error("Invalid or expired authentication session");
        }

        const userId = sessionData.session.user.id;

        // 3️⃣ Fetch user role (default = customer)
        const { data: roleData, error: roleError } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", userId)
          .single();

        if (roleError) {
          console.warn("Role not found, defaulting to customer");
        }

        const role = roleData?.role || "customer";

        setStatus("success");
        toast.success("Login successful!");

        // 4️⃣ Role-based redirect
        setTimeout(() => {
          if (role === "admin") {
            navigate("/admin");
          } else if (role === "staff") {
            navigate("/staff");
          } else {
            navigate("/"); // customer
          }
        }, 1500);
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
              Signing you in...
            </h2>
            <p className="text-gray-400">
              Please wait while we complete authentication
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <CheckCircle className="w-12 h-12 mx-auto text-green-500 mb-4" />
            <h2 className="text-xl font-semibold mb-2">
              Login Successful
            </h2>
            <p className="text-gray-400">
              Redirecting you to your dashboard...
            </p>
          </>
        )}

        {status === "error" && (
          <>
            <XCircle className="w-12 h-12 mx-auto text-red-500 mb-4" />
            <h2 className="text-xl font-semibold mb-2">
              Authentication Failed
            </h2>
            <p className="text-gray-400 mb-4">
              The login link is invalid or expired.
            </p>

            <button
              onClick={() => navigate("/login")}
              className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Back to Login
            </button>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default AuthCallback;
