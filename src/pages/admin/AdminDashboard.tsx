import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  ShoppingCart,
  CreditCard,
  TicketIcon,
  TrendingUp,
  TrendingDown,
  Calendar,
  Package,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useRequireAuth } from '@/hooks/useAuth';

interface DashboardStats {
  totalUsers: number;
  totalBookings: number;
  pendingBookings: number;
  totalOrders: number;
  totalRevenue: number;
  openTickets: number;
  activeAMC: number;
}

const AdminDashboard = () => {
  useRequireAuth('admin');
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalBookings: 0,
    pendingBookings: 0,
    totalOrders: 0,
    totalRevenue: 0,
    openTickets: 0,
    activeAMC: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch counts in parallel
        const [
          usersResult,
          bookingsResult,
          pendingBookingsResult,
          ordersResult,
          revenueResult,
          ticketsResult,
          amcResult,
        ] = await Promise.all([
          supabase.from('profiles').select('id', { count: 'exact', head: true }),
          supabase.from('bookings').select('id', { count: 'exact', head: true }),
          supabase.from('bookings').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
          supabase.from('orders').select('id', { count: 'exact', head: true }),
          supabase.from('invoices').select('total_amount').eq('status', 'paid'),
          supabase.from('tickets').select('id', { count: 'exact', head: true }).eq('status', 'open'),
          supabase.from('customer_amc').select('id', { count: 'exact', head: true }).eq('status', 'active'),
        ]);

        const revenue = revenueResult.data?.reduce((sum, inv) => sum + Number(inv.total_amount), 0) || 0;

        setStats({
          totalUsers: usersResult.count || 0,
          totalBookings: bookingsResult.count || 0,
          pendingBookings: pendingBookingsResult.count || 0,
          totalOrders: ordersResult.count || 0,
          totalRevenue: revenue,
          openTickets: ticketsResult.count || 0,
          activeAMC: amcResult.count || 0,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      color: 'bg-primary/10 text-primary',
      trend: '+12%',
      trendUp: true,
    },
    {
      title: 'Pending Bookings',
      value: stats.pendingBookings,
      icon: Calendar,
      color: 'bg-accent/10 text-accent',
      trend: `${stats.totalBookings} total`,
      trendUp: null,
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      icon: ShoppingCart,
      color: 'bg-green-500/10 text-green-600',
      trend: '+8%',
      trendUp: true,
    },
    {
      title: 'Revenue',
      value: `₹${stats.totalRevenue.toLocaleString()}`,
      icon: CreditCard,
      color: 'bg-purple-500/10 text-purple-600',
      trend: '+15%',
      trendUp: true,
    },
    {
      title: 'Open Tickets',
      value: stats.openTickets,
      icon: TicketIcon,
      color: 'bg-orange-500/10 text-orange-600',
      trend: stats.openTickets > 5 ? 'Needs attention' : 'Low',
      trendUp: stats.openTickets <= 5,
    },
    {
      title: 'Active AMC',
      value: stats.activeAMC,
      icon: Package,
      color: 'bg-cyan-500/10 text-cyan-600',
      trend: '+5%',
      trendUp: true,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-display font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's your business overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                    <p className="text-3xl font-display font-bold">
                      {loading ? '...' : stat.value}
                    </p>
                    <div className="flex items-center gap-1 mt-2">
                      {stat.trendUp !== null && (
                        stat.trendUp ? (
                          <TrendingUp className="w-4 h-4 text-green-600" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-red-600" />
                        )
                      )}
                      <span className={`text-sm ${stat.trendUp ? 'text-green-600' : stat.trendUp === false ? 'text-red-600' : 'text-muted-foreground'}`}>
                        {stat.trend}
                      </span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-xl ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-center py-8">
              No recent bookings to display
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-center py-8">
              No recent tickets to display
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
