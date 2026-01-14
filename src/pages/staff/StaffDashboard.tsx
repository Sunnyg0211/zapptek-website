import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ShoppingCart,
  TicketIcon,
  Clock,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface DashboardStats {
  totalBookings: number;
  pendingBookings: number;
  completedBookings: number;
  totalTickets: number;
  openTickets: number;
  resolvedTickets: number;
}

interface RecentItem {
  id: string;
  title: string;
  status: string;
  date: string;
  type: 'booking' | 'ticket';
}

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
  confirmed: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  in_progress: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
  completed: 'bg-green-500/10 text-green-600 border-green-500/20',
  cancelled: 'bg-red-500/10 text-red-600 border-red-500/20',
  open: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  resolved: 'bg-green-500/10 text-green-600 border-green-500/20',
  closed: 'bg-gray-500/10 text-gray-600 border-gray-500/20',
};

export default function StaffDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    totalTickets: 0,
    openTickets: 0,
    resolvedTickets: 0,
  });
  const [recentItems, setRecentItems] = useState<RecentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      // Fetch assigned bookings
      const { data: bookings, error: bookingsError } = await supabase
        .from('bookings')
        .select('id, status, scheduled_date, service_id')
        .eq('assigned_staff_id', user?.id);

      if (bookingsError) throw bookingsError;

      // Fetch assigned tickets
      const { data: tickets, error: ticketsError } = await supabase
        .from('tickets')
        .select('id, status, subject, created_at')
        .eq('assigned_staff_id', user?.id);

      if (ticketsError) throw ticketsError;

      // Calculate stats
      const bookingsList = bookings || [];
      const ticketsList = tickets || [];

      setStats({
        totalBookings: bookingsList.length,
        pendingBookings: bookingsList.filter(b => b.status === 'pending' || b.status === 'confirmed').length,
        completedBookings: bookingsList.filter(b => b.status === 'completed').length,
        totalTickets: ticketsList.length,
        openTickets: ticketsList.filter(t => t.status === 'open' || t.status === 'in_progress').length,
        resolvedTickets: ticketsList.filter(t => t.status === 'resolved' || t.status === 'closed').length,
      });

      // Get service names for bookings
      const serviceIds = [...new Set(bookingsList.map(b => b.service_id).filter(Boolean))];
      const { data: services } = serviceIds.length > 0
        ? await supabase.from('services').select('id, name').in('id', serviceIds)
        : { data: [] };
      const servicesMap = new Map((services || []).map(s => [s.id, s.name]));

      // Combine and sort recent items
      const recentBookings: RecentItem[] = bookingsList.slice(0, 5).map(b => ({
        id: b.id,
        title: servicesMap.get(b.service_id) || 'Service Booking',
        status: b.status || 'pending',
        date: b.scheduled_date,
        type: 'booking' as const,
      }));

      const recentTickets: RecentItem[] = ticketsList.slice(0, 5).map(t => ({
        id: t.id,
        title: t.subject,
        status: t.status || 'open',
        date: t.created_at,
        type: 'ticket' as const,
      }));

      const combined = [...recentBookings, ...recentTickets]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 6);

      setRecentItems(combined);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Assigned Bookings',
      value: stats.totalBookings,
      icon: ShoppingCart,
      color: 'text-blue-500',
      bg: 'bg-blue-500/10',
    },
    {
      title: 'Pending Bookings',
      value: stats.pendingBookings,
      icon: Clock,
      color: 'text-yellow-500',
      bg: 'bg-yellow-500/10',
    },
    {
      title: 'Completed Bookings',
      value: stats.completedBookings,
      icon: CheckCircle,
      color: 'text-green-500',
      bg: 'bg-green-500/10',
    },
    {
      title: 'Assigned Tickets',
      value: stats.totalTickets,
      icon: TicketIcon,
      color: 'text-purple-500',
      bg: 'bg-purple-500/10',
    },
    {
      title: 'Open Tickets',
      value: stats.openTickets,
      icon: AlertCircle,
      color: 'text-orange-500',
      bg: 'bg-orange-500/10',
    },
    {
      title: 'Resolved Tickets',
      value: stats.resolvedTickets,
      icon: CheckCircle,
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-display font-bold">Staff Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's an overview of your assigned tasks.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-3xl font-bold mt-1">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Activity</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link to="/staff/bookings">View Bookings</Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link to="/staff/tickets">View Tickets</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {recentItems.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No assigned tasks yet</p>
          ) : (
            <div className="space-y-4">
              {recentItems.map((item, index) => (
                <motion.div
                  key={`${item.type}-${item.id}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/50"
                >
                  <div className="flex items-center gap-3">
                    {item.type === 'booking' ? (
                      <ShoppingCart className="w-5 h-5 text-blue-500" />
                    ) : (
                      <TicketIcon className="w-5 h-5 text-purple-500" />
                    )}
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(item.date), 'MMM dd, yyyy')}
                      </p>
                    </div>
                  </div>
                  <Badge className={statusColors[item.status] || 'bg-muted'}>
                    {item.status.replace('_', ' ')}
                  </Badge>
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
