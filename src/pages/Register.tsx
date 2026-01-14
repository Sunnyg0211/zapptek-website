import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Zap, Mail, Lock, Phone, User, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
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
    const { error } = await signUp(formData.email, formData.password, fullName, formData.phone);
    setLoading(false);

    if (error) {
      toast.error(error.message || "Failed to create account");
    } else {
      toast.success("Account created! You can now sign in.");
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex flex-1 gradient-hero relative overflow-hidden items-center justify-center p-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 max-w-md"
        >
          <div className="w-20 h-20 rounded-3xl gradient-bg flex items-center justify-center mb-8 shadow-glow">
            <Zap className="w-10 h-10 text-primary-foreground" />
          </div>
          <h2 className="text-3xl font-display font-bold text-primary-foreground mb-4">
            Join ZappTek Today
          </h2>
          <ul className="space-y-4">
            {["Book services online", "Track repair status", "Access invoices", "Priority support", "Exclusive offers"].map((benefit, i) => (
              <li key={i} className="flex items-center gap-3 text-primary-foreground/80">
                <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center">
                  <Check className="w-4 h-4 text-accent" />
                </div>
                {benefit}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <Link to="/" className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
              <Zap className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-display font-bold">
              <span className="text-primary">Zapp</span><span className="text-foreground">Tek</span>
            </span>
          </Link>

          <h1 className="text-3xl font-display font-bold mb-2">Create an account</h1>
          <p className="text-muted-foreground mb-8">Get started with your free account</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <div className="relative mt-2">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input id="firstName" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} placeholder="John" className="pl-10" />
                </div>
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} placeholder="Doe" className="mt-2" />
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <div className="relative mt-2">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="john@example.com" className="pl-10" />
              </div>
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative mt-2">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input id="phone" type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="+91 98765 43210" className="pl-10" />
              </div>
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative mt-2">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input id="password" type={showPassword ? "text" : "password"} value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} placeholder="••••••••" className="pl-10 pr-10" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <Button variant="gradient" size="lg" className="w-full mt-6" disabled={loading}>
              {loading ? "Creating account..." : "Create Account"}
              <ArrowRight className="w-5 h-5" />
            </Button>
          </form>

          <p className="text-center text-muted-foreground mt-6">
            Already have an account? <Link to="/login" className="text-primary font-medium hover:underline">Sign in</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
