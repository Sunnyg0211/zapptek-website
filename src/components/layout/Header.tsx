import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogOut, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

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
  const location = useLocation();
  const navigate = useNavigate();

  const { user, role, signOut, loading } = useAuth();

  // 🔐 Role-based dashboard routing
  const dashboardPath =
    role === "admin"
      ? "/admin"
      : role === "staff"
      ? "/staff"
      : "/dashboard";

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 overflow-hidden">
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 -z-10"
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        style={{
          background:
            "linear-gradient(270deg, #000000, #0f0f0f, #1a1a1a, #050505)",
          backgroundSize: "400% 400%",
        }}
      />

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3">
            <motion.img
              whileHover={{ scale: 1.05 }}
              src="/logo_main.png"
              alt="ZappTek Logo"
              className="w-10 h-10"
            />
            <span className="text-xl md:text-2xl font-bold text-white">
              Zapp<span className="text-gray-300">Tek</span>
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition text-white ${
                  location.pathname === item.path
                    ? "bg-white/20"
                    : "hover:bg-white/10"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* AUTH / DASHBOARD BUTTONS */}
          {!loading && (
            <div className="hidden md:flex items-center gap-3">
              {!user ? (
                <>
                  <Button variant="ghost" asChild className="text-white">
                    <Link to="/login">Login</Link>
                  </Button>

                  <Button
                    asChild
                    className="bg-gradient-to-r from-blue-600 to-blue-800 text-white"
                  >
                    <Link to="/register">Get Started</Link>
                  </Button>
                </>
              ) : (
                <>
                  {/* 🔵 DASHBOARD BUTTON */}
                  <Button
                    asChild
                    className="bg-gradient-to-r from-blue-600 to-blue-800 text-white flex gap-2"
                  >
                    <Link to={dashboardPath}>
                      <LayoutDashboard className="w-4 h-4" />
                      Dashboard
                    </Link>
                  </Button>

                  {/* ⚪ LOGOUT BUTTON */}
                  <Button
                    variant="outline"
                    onClick={handleLogout}
                    className="text-white border-white/30 hover:bg-white/10 flex gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </Button>
                </>
              )}
            </div>
          )}

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-white"
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-black/95 border-t border-white/10"
          >
            <nav className="px-4 py-4 flex flex-col gap-2">
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

              {!loading && user && (
                <>
                  <Link
                    to={dashboardPath}
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-3 rounded-lg bg-blue-700 text-white"
                  >
                    Dashboard
                  </Link>

                  <Button
                    variant="outline"
                    onClick={handleLogout}
                    className="mt-2 text-white border-white/30"
                  >
                    Logout
                  </Button>
                </>
              )}

              {!loading && !user && (
                <>
                  <Link to="/login" className="px-4 py-3 text-white">
                    Login
                  </Link>
                  <Link to="/register" className="px-4 py-3 text-white">
                    Get Started
                  </Link>
                </>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
