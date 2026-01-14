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
    <div className={cn("flex h-full flex-col", mobile && "pt-4")}>
      <div className="px-6 py-4">
        <Link to="/" className="flex items-center gap-2">
          <Shield className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold">MyAccount</span>
        </Link>
      </div>
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
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </ScrollArea>
      <div className="border-t p-4">
        <div className="mb-3 px-3">
          <p className="text-sm font-medium truncate">{user?.email}</p>
          <p className="text-xs text-muted-foreground capitalize">{role || "customer"}</p>
        </div>
        {role === "admin" && (
          <Link to="/admin">
            <Button variant="outline" className="w-full mb-2" size="sm">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Admin Panel
            </Button>
          </Link>
        )}
        <Button
          variant="ghost"
          className="w-full justify-start text-muted-foreground"
          onClick={signOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden w-64 border-r bg-card lg:block">
        <Sidebar />
      </aside>

      {/* Mobile Header & Sidebar */}
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-card px-4 lg:hidden">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <Sidebar mobile />
            </SheetContent>
          </Sheet>
          <Link to="/" className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="font-bold">MyAccount</span>
          </Link>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
