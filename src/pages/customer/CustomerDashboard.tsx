import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, ShoppingBag, MessageSquare, FileText, ArrowRight, Clock } from "lucide-react";
import { format } from "date-fns";
import { motion } from "framer-motion";

interface DashboardStats {
  totalBookings: number;
  pendingBookings: number;
  totalOrders: number;
  pendingOrders: number;
  openTickets: number;
  unpaidInvoices: number;
}

interface RecentItem {
  id: string;
  type: "booking" | "order" | "ticket";
  title: string;
  status: string;
  date: string;
}

export default function CustomerDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalBookings: 0,
    pendingBookings: 0,
    totalOrders: 0,
    pendingOrders: 0,
    openTickets: 0,
    unpaidInvoices: 0,
  });
  const [recentActivity, setRecentActivity] = useState<RecentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      const [bookingsRes, ordersRes, ticketsRes, invoicesRes] = await Promise.all([
        supabase.from("bookings").select("id, status, scheduled_date, service_id").eq("user_id", user!.id),
        supabase.from("orders").select("id, status, total_amount, created_at").eq("user_id", user!.id),
        supabase.from("tickets").select("id, status, subject, created_at").eq("user_id", user!.id),
        supabase.from("invoices").select("id, status, total_amount").eq("user_id", user!.id),
      ]);

      const bookings = bookingsRes.data || [];
      const orders = ordersRes.data || [];
      const tickets = ticketsRes.data || [];
      const invoices = invoicesRes.data || [];

      setStats({
        totalBookings: bookings.length,
        pendingBookings: bookings.filter((b) => b.status === "pending" || b.status === "confirmed").length,
        totalOrders: orders.length,
        pendingOrders: orders.filter((o) => o.status === "pending" || o.status === "processing").length,
        openTickets: tickets.filter((t) => t.status === "open" || t.status === "in_progress").length,
        unpaidInvoices: invoices.filter((i) => i.status === "unpaid").length,
      });

      // Build recent activity
      const activity: RecentItem[] = [
        ...bookings.slice(0, 3).map((b) => ({
          id: b.id,
          type: "booking" as const,
          title: "Service Booking",
          status: b.status || "pending",
          date: b.scheduled_date,
        })),
        ...orders.slice(0, 3).map((o) => ({
          id: o.id,
          type: "order" as const,
          title: `Order - ₹${o.total_amount}`,
          status: o.status || "pending",
          date: o.created_at,
        })),
        ...tickets.slice(0, 3).map((t) => ({
          id: t.id,
          type: "ticket" as const,
          title: t.subject,
          status: t.status || "open",
          date: t.created_at,
        })),
      ]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 5);

      setRecentActivity(activity);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Bookings",
      value: stats.totalBookings,
      subtitle: `${stats.pendingBookings} pending`,
      icon: Calendar,
      href: "/dashboard/bookings",
      color: "text-blue-500",
    },
    {
      title: "Orders",
      value: stats.totalOrders,
      subtitle: `${stats.pendingOrders} in progress`,
      icon: ShoppingBag,
      href: "/dashboard/orders",
      color: "text-green-500",
    },
    {
      title: "Support Tickets",
      value: stats.openTickets,
      subtitle: "open tickets",
      icon: MessageSquare,
      href: "/dashboard/tickets",
      color: "text-orange-500",
    },
    {
      title: "Invoices",
      value: stats.unpaidInvoices,
      subtitle: "unpaid",
      icon: FileText,
      href: "/dashboard/invoices",
      color: "text-purple-500",
    },
  ];

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: "bg-yellow-500",
      confirmed: "bg-blue-500",
      completed: "bg-green-500",
      cancelled: "bg-red-500",
      processing: "bg-blue-500",
      shipped: "bg-purple-500",
      delivered: "bg-green-500",
      open: "bg-blue-500",
      in_progress: "bg-yellow-500",
      resolved: "bg-green-500",
      closed: "bg-gray-500",
    };
    return colors[status] || "bg-gray-500";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Welcome Back!</h1>
        <p className="text-muted-foreground">Here's what's happening with your account.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link to={card.href}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {card.title}
                  </CardTitle>
                  <card.icon className={`h-5 w-5 ${card.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{card.value}</div>
                  <p className="text-xs text-muted-foreground">{card.subtitle}</p>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Link to="/book-service">
            <Button>
              <Calendar className="mr-2 h-4 w-4" />
              Book a Service
            </Button>
          </Link>
          <Link to="/products">
            <Button variant="outline">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Browse Products
            </Button>
          </Link>
          <Link to="/dashboard/tickets">
            <Button variant="outline">
              <MessageSquare className="mr-2 h-4 w-4" />
              Create Support Ticket
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Activity</CardTitle>
          <Clock className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {recentActivity.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No recent activity</p>
          ) : (
            <div className="space-y-4">
              {recentActivity.map((item) => (
                <div
                  key={`${item.type}-${item.id}`}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                >
                  <div className="flex items-center gap-3">
                    {item.type === "booking" && <Calendar className="h-4 w-4 text-blue-500" />}
                    {item.type === "order" && <ShoppingBag className="h-4 w-4 text-green-500" />}
                    {item.type === "ticket" && <MessageSquare className="h-4 w-4 text-orange-500" />}
                    <div>
                      <p className="font-medium text-sm">{item.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(item.date), "MMM dd, yyyy")}
                      </p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
