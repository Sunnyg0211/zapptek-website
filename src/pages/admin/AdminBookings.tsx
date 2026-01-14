import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  Search,
  Clock,
  MapPin,
  User,
  MoreVertical,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useRequireAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

interface Booking {
  id: string;
  user_id: string;
  service_id: string | null;
  booking_type: string;
  issue_description: string | null;
  scheduled_date: string;
  scheduled_time: string | null;
  address: string | null;
  status: string;
  created_at: string;
  profiles: { full_name: string | null; email: string | null } | null;
  services: { name: string } | null;
}

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
  confirmed: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  in_progress: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
  completed: 'bg-green-500/10 text-green-600 border-green-500/20',
  cancelled: 'bg-red-500/10 text-red-600 border-red-500/20',
};

const AdminBookings = () => {
  useRequireAuth('admin');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const { data: bookingsData, error } = await supabase
        .from('bookings')
        .select('*')
        .order('scheduled_date', { ascending: false });

      if (error) throw error;
      
      // Fetch related data separately
      const userIds = [...new Set(bookingsData?.map(b => b.user_id) || [])];
      const serviceIds = [...new Set(bookingsData?.map(b => b.service_id).filter(Boolean) || [])];
      
      const [profilesRes, servicesRes] = await Promise.all([
        userIds.length > 0 ? supabase.from('profiles').select('user_id, full_name, email').in('user_id', userIds) : { data: [] },
        serviceIds.length > 0 ? supabase.from('services').select('id, name').in('id', serviceIds) : { data: [] },
      ]);
      
      const profilesMap = new Map((profilesRes.data || []).map(p => [p.user_id, p]));
      const servicesMap = new Map((servicesRes.data || []).map(s => [s.id, s]));
      
      const enrichedBookings = (bookingsData || []).map(b => ({
        ...b,
        profiles: profilesMap.get(b.user_id) || null,
        services: servicesMap.get(b.service_id) || null,
      }));
      
      setBookings(enrichedBookings as Booking[]);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast.error('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (bookingId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: newStatus })
        .eq('id', bookingId);

      if (error) throw error;
      
      setBookings(bookings.map(b => 
        b.id === bookingId ? { ...b, status: newStatus } : b
      ));
      
      toast.success(`Booking status updated to ${newStatus}`);
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update booking status');
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.profiles?.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.profiles?.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.services?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.issue_description?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-display font-bold">Bookings</h1>
        <p className="text-muted-foreground">Manage all service bookings</p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search bookings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Bookings List */}
      {loading ? (
        <div className="text-center py-8 text-muted-foreground">Loading bookings...</div>
      ) : filteredBookings.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">No bookings found</div>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((booking, index) => (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    {/* Booking Info */}
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold">{booking.profiles?.full_name || 'Unknown'}</p>
                          <p className="text-sm text-muted-foreground">{booking.profiles?.email}</p>
                        </div>
                      </div>
                      
                      <div className="pl-13 space-y-1">
                        <p className="text-sm">
                          <span className="font-medium">Service:</span> {booking.services?.name || 'N/A'}
                        </p>
                        {booking.issue_description && (
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {booking.issue_description}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Schedule & Location */}
                    <div className="flex flex-col gap-2 lg:w-48">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span>{new Date(booking.scheduled_date).toLocaleDateString()}</span>
                      </div>
                      {booking.scheduled_time && (
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span>{booking.scheduled_time}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span className="capitalize">{booking.booking_type}</span>
                      </div>
                    </div>

                    {/* Status & Actions */}
                    <div className="flex items-center gap-3">
                      <Badge className={statusColors[booking.status] || 'bg-muted'}>
                        {booking.status.replace('_', ' ')}
                      </Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => updateStatus(booking.id, 'confirmed')}>
                            Mark Confirmed
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => updateStatus(booking.id, 'in_progress')}>
                            Mark In Progress
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => updateStatus(booking.id, 'completed')}>
                            Mark Completed
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => updateStatus(booking.id, 'cancelled')}
                            className="text-destructive"
                          >
                            Cancel Booking
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminBookings;
