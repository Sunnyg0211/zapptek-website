import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { StaffLayout } from "@/components/layout/StaffLayout";
import CustomerLayout from "@/components/layout/CustomerLayout";
import Index from "./pages/Index";
import Services from "./pages/Services";
import AMCPlans from "./pages/AMCPlans";
import Products from "./pages/Products";
import BookService from "./pages/BookService";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminServices from "./pages/admin/AdminServices";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminAMCPlans from "./pages/admin/AdminAMCPlans";
import AdminBookings from "./pages/admin/AdminBookings";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminInvoices from "./pages/admin/AdminInvoices";
import AdminTickets from "./pages/admin/AdminTickets";
import AdminReports from "./pages/admin/AdminReports";
import StaffDashboard from "./pages/staff/StaffDashboard";
import StaffBookings from "./pages/staff/StaffBookings";
import StaffTickets from "./pages/staff/StaffTickets";
import StaffProfile from "./pages/staff/StaffProfile";
import CustomerDashboard from "./pages/customer/CustomerDashboard";
import CustomerBookings from "./pages/customer/CustomerBookings";
import CustomerOrders from "./pages/customer/CustomerOrders";
import CustomerTickets from "./pages/customer/CustomerTickets";
import CustomerInvoices from "./pages/customer/CustomerInvoices";
import CustomerProfile from "./pages/customer/CustomerProfile";
import BuyNow from "./pages/BuyNow";

const queryClient = new QueryClient();

// Protected route wrapper for customer dashboard
const ProtectedCustomerRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public Routes with Layout */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Index />} />
              <Route path="/services" element={<Services />} />
              <Route path="/amc-plans" element={<AMCPlans />} />
              <Route path="/products" element={<Products />} />

              {/* ✅ NEW E-COMMERCE ROUTES */}
              <Route path="/buy-now/:productId" element={<BuyNow />} />

              <Route path="/book-service" element={<BookService />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Route>
            
            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Customer Dashboard Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedCustomerRoute>
                  <CustomerLayout />
                </ProtectedCustomerRoute>
              }
            >
              <Route index element={<CustomerDashboard />} />
              <Route path="bookings" element={<CustomerBookings />} />
              <Route path="orders" element={<CustomerOrders />} />
              <Route path="invoices" element={<CustomerInvoices />} />
              <Route path="tickets" element={<CustomerTickets />} />
              <Route path="profile" element={<CustomerProfile />} />
            </Route>
            
            {/* Staff Routes */}
            <Route path="/staff" element={<StaffLayout />}>
              <Route index element={<StaffDashboard />} />
              <Route path="bookings" element={<StaffBookings />} />
              <Route path="tickets" element={<StaffTickets />} />
              <Route path="profile" element={<StaffProfile />} />
            </Route>
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="services" element={<AdminServices />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="amc-plans" element={<AdminAMCPlans />} />
              <Route path="bookings" element={<AdminBookings />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="invoices" element={<AdminInvoices />} />
              <Route path="tickets" element={<AdminTickets />} />
              <Route path="reports" element={<AdminReports />} />
            </Route>
            
            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
