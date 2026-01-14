import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  Wrench,
  Package,
  ShoppingCart,
  FileText,
  CreditCard,
  TicketIcon,
  Image,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  Zap,
  ChevronDown,
  Shield,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
  { icon: Users, label: 'Users', path: '/admin/users' },
  { icon: Wrench, label: 'Services', path: '/admin/services' },
  { icon: Package, label: 'Products', path: '/admin/products' },
  { icon: Shield, label: 'AMC Plans', path: '/admin/amc-plans' },
  { icon: ShoppingCart, label: 'Bookings', path: '/admin/bookings' },
  { icon: FileText, label: 'Orders', path: '/admin/orders' },
  { icon: CreditCard, label: 'Invoices', path: '/admin/invoices' },
  { icon: TicketIcon, label: 'Tickets', path: '/admin/tickets' },
  { icon: Image, label: 'Banners', path: '/admin/banners' },
  { icon: BarChart3, label: 'Reports', path: '/admin/reports' },
  { icon: Settings, label: 'Settings', path: '/admin/settings' },
];

export const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          'hidden lg:flex flex-col fixed left-0 top-0 h-full bg-sidebar text-sidebar-foreground z-40 transition-all duration-300',
          sidebarOpen ? 'w-64' : 'w-20'
        )}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 p-4 border-b border-sidebar-border">
          <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center flex-shrink-0">
            <Zap className="w-6 h-6 text-primary-foreground" />
          </div>
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col"
            >
              <span className="font-display font-bold text-lg">ZappTek</span>
              <span className="text-xs text-sidebar-foreground/60">Admin Panel</span>
            </motion.div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {sidebarItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200',
                  isActive
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                    : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground'
                )}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span className="font-medium">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-sidebar-border">
          <div className={cn('flex items-center gap-3', sidebarOpen ? '' : 'justify-center')}>
            <div className="w-10 h-10 rounded-full bg-sidebar-accent flex items-center justify-center">
              <span className="text-sm font-semibold">
                {user?.email?.charAt(0).toUpperCase()}
              </span>
            </div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user?.email}</p>
                <p className="text-xs text-sidebar-foreground/60">Administrator</p>
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            className={cn(
              'w-full mt-3 text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent',
              !sidebarOpen && 'px-2'
            )}
            onClick={handleSignOut}
          >
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span className="ml-2">Sign Out</span>}
          </Button>
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md hover:scale-110 transition-transform"
        >
          <ChevronDown className={cn('w-4 h-4 transition-transform', sidebarOpen ? 'rotate-90' : '-rotate-90')} />
        </button>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-sidebar text-sidebar-foreground z-40 flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
            <Zap className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-display font-bold">ZappTek Admin</span>
        </div>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            className="lg:hidden fixed inset-0 z-50 bg-sidebar text-sidebar-foreground pt-16"
          >
            <nav className="p-4 space-y-1">
              {sidebarItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      'flex items-center gap-3 px-3 py-3 rounded-lg transition-all',
                      isActive
                        ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                        : 'text-sidebar-foreground/70 hover:bg-sidebar-accent'
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-sidebar-border">
              <Button
                variant="ghost"
                className="w-full text-sidebar-foreground/70 hover:text-sidebar-foreground"
                onClick={handleSignOut}
              >
                <LogOut className="w-5 h-5 mr-2" />
                Sign Out
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main
        className={cn(
          'flex-1 transition-all duration-300',
          sidebarOpen ? 'lg:ml-64' : 'lg:ml-20',
          'pt-16 lg:pt-0'
        )}
      >
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
