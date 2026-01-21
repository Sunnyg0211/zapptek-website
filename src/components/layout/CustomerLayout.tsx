import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  LayoutDashboard,
  Calendar,
  ShoppingBag,
  MessageSquare,
  User,
  LogOut,
  Menu,
  FileText,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "My Bookings", href: "/dashboard/bookings", icon: Calendar },
  { name: "My Orders", href: "/dashboard/orders", icon: ShoppingBag },
  { name: "My Invoices", href: "/dashboard/invoices", icon: FileText },
  { name: "Support Tickets", href: "/dashboard/tickets", icon: MessageSquare },
  { name: "My Profile", href: "/dashboard/profile", icon: User },
];

export default function CustomerLayout() {
  const { user, role, signOut } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const Sidebar = ({ mobile = false }: { mobile?: boolean }) => (
    <div className={cn("flex h-full flex-col bg-black text-white", mobile && "pt-4")}>
      {/* LOGO */}
      <div className="px-6 py-4 border-b border-white/10">
        <Link to="/" className="flex items-center gap-2">
          <Shield className="h-8 w-8 text-blue-500" />
          <span className="text-xl font-bold">MyAccount</span>
        </Link>
      </div>

      {/* NAVIGATION */}
      <ScrollArea className="flex-1 px-3">
        <nav className="space-y-1 py-4">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => mobile && setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                  isActive
                    ? "bg-blue-600 text-white shadow"
                    : "text-gray-400 hover:bg-white/10 hover:text-white"
                )}
              >
                <item.icon className="h-5 w-5 text-blue-400" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </ScrollArea>

      {/* FOOTER */}
      <div className="border-t border-white/10 p-4">
        <div className="mb-3 px-3">
          <p className="text-sm font-medium truncate text-white">
            {user?.email}
          </p>
          <p className="text-xs text-gray-400 capitalize">
            {role || "customer"}
          </p>
        </div>

        {role === "admin" && (
          <Link to="/admin">
            <Button
              size="sm"
              className="w-full mb-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white"
            >
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Admin Panel
            </Button>
          </Link>
        )}

        <Button
          variant="ghost"
          className="w-full justify-start text-gray-400 hover:text-white hover:bg-white/10"
          onClick={signOut}
        >
          <LogOut className="mr-2 h-4 w-4 text-blue-400" />
          Sign Out
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* DESKTOP SIDEBAR */}
      <aside className="hidden w-64 lg:block">
        <Sidebar />
      </aside>

      {/* MAIN AREA */}
      <div className="flex flex-1 flex-col">
        {/* MOBILE HEADER */}
        <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-black px-4 lg:hidden">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6 text-blue-400" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0 bg-black">
              <Sidebar mobile />
            </SheetContent>
          </Sheet>

          <Link to="/" className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-blue-500" />
            <span className="font-bold text-white">MyAccount</span>
          </Link>
        </header>

        {/* CONTENT */}
        <main className="flex-1 p-4 lg:p-6 bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
