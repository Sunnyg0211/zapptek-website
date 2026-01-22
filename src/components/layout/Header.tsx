import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "AMC Plans", path: "/amc-plans" },
  { name: "Products", path: "/products" },
  { name: "Book Service", path: "/book-service" },
  { name: "About Us", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  const location = useLocation();
  const navigate = useNavigate();

  // ✅ AUTH STATE LISTENER (CRITICAL FIX)
  useEffect(() => {
    // Get session on load
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
    });

    // Listen for login/logout changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 overflow-hidden border-b border-white/10">
      {/* Animated Gradient Background */}
      <motion.div
        className="absolute inset-0 -z-10"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          background:
            "linear-gradient(270deg, #000000, #0f0f0f, #1a1a1a, #050505)",
          backgroundSize: "400% 400%",
        }}
      />

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.img
              whileHover={{ scale: 1.05 }}
              src="/logo_main.png"
              alt="ZappTek Logo"
              className="w-10 h-10 object-contain"
            />
            <span className="text-xl md:text-2xl font-bold text-white">
              <span>Zapp</span>
              <span className="text-gray-300">Tek</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all text-white ${
                  location.pathname === item.path
                    ? "bg-white/20"
                    : "hover:bg-white/10"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* AUTH BUTTONS (FIXED) */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <Button
                  onClick={() => navigate("/dashboard")}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Dashboard
                </Button>

                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="text-white border-white/20"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  asChild
                  className="text-white hover:bg-white/10"
                >
                  <Link to="/login">Login</Link>
                </Button>

                <Button
                  asChild
                  className="bg-gradient-to-r from-blue-600 to-blue-800 text-white"
                >
                  <Link to="/register">Get Started</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg text-white hover:bg-white/10"
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-black/95 border-b border-white/10"
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-3 rounded-lg text-white hover:bg-white/10"
                >
                  {item.name}
                </Link>
              ))}

              <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-white/10">
                {user ? (
                  <>
                    <Button onClick={() => navigate("/dashboard")}>
                      Dashboard
                    </Button>
                    <Button variant="outline" onClick={handleLogout}>
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" asChild>
                      <Link to="/login">Login</Link>
                    </Button>
                    <Button asChild>
                      <Link to="/register">Get Started</Link>
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
