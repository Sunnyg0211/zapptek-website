import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import {
  Calendar,
  Search,
  Clock,
  MapPin,
  User,
  Phone,
  Mail,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { format } from 'date-fns';

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
  confirmed: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  in_progress: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
  completed: 'bg-green-500/10 text-green-600 border-green-500/20',
  cancelled: 'bg-red-500/10 text-red-600 border-red-500/20',
};

export default function StaffBookings() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: bookings, isLoading } = useQuery({
    queryKey: ['staff-bookings', user?.id],
    queryFn: async () => {
      const { data: bookingsData, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('assigned_staff_id', user?.id)
        .order('scheduled_date', { ascending: true });

      if (error) throw error;

      // Fetch related data
      const userIds = [...new Set(bookingsData?.map(b => b.user_id) || [])];
      const serviceIds = [...new Set(bookingsData?.map(b => b.service_id).filter(Boolean) || [])];
      const deviceIds = [...new Set(bookingsData?.map(b => b.device_id).filter(Boolean) || [])];

      const [profilesRes, servicesRes, devicesRes] = await Promise.all([
        userIds.length > 0 ? supabase.from('profiles').select('user_id, full_name, email, phone').in('user_id', userIds) : { data: [] },
        serviceIds.length > 0 ? supabase.from('services').select('id, name, price, duration_minutes').in('id', serviceIds) : { data: [] },
        deviceIds.length > 0 ? supabase.from('customer_devices').select('id, device_type, brand, model').in('id', deviceIds) : { data: [] },
      ]);

      const profilesMap = new Map((profilesRes.data || []).map(p => [p.user_id, p]));
      const servicesMap = new Map((servicesRes.data || []).map(s => [s.id, s]));
      const devicesMap = new Map((devicesRes.data || []).map(d => [d.id, d]));

      return (bookingsData || []).map(b => ({
        ...b,
        profile: profilesMap.get(b.user_id) || null,
        service: servicesMap.get(b.service_id) || null,
        device: devicesMap.get(b.device_id) || null,
      }));
    },
    enabled: !!user?.id,
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase
        .from('bookings')
        .update({ status })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['staff-bookings'] });
      toast.success('Booking status updated');
    },
    onError: () => {
      toast.error('Failed to update booking status');
    },
  });

  const filteredBookings = bookings?.filter(booking => {
    const matchesSearch =
      booking.profile?.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.profile?.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.service?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.issue_description?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const openDetail = (booking: any) => {
    setSelectedBooking(booking);
    setIsDetailOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-display font-bold">My Bookings</h1>
        <p className="text-muted-foreground">Manage your assigned service bookings</p>
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
      {isLoading ? (
        <div className="text-center py-8 text-muted-foreground">Loading bookings...</div>
      ) : filteredBookings?.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">No bookings assigned to you</div>
      ) : (
        <div className="space-y-4">
          {filteredBookings?.map((booking, index) => (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="hover:border-emerald-500/50 transition-colors cursor-pointer" onClick={() => openDetail(booking)}>
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    {/* Customer Info */}
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
                          <User className="w-5 h-5 text-emerald-500" />
                        </div>
                        <div>
                          <p className="font-semibold">{booking.profile?.full_name || 'Unknown'}</p>
                          <p className="text-sm text-muted-foreground">{booking.profile?.email}</p>
                        </div>
                      </div>

                      <div className="pl-13 space-y-1">
                        <p className="text-sm">
                          <span className="font-medium">Service:</span> {booking.service?.name || 'N/A'}
                        </p>
                        {booking.device && (
                          <p className="text-sm">
                            <span className="font-medium">Device:</span> {booking.device.brand} {booking.device.model}
                          </p>
                        )}
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
                        <span>{format(new Date(booking.scheduled_date), 'MMM dd, yyyy')}</span>
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
                    <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
                      <Badge className={statusColors[booking.status] || 'bg-muted'}>
                        {booking.status?.replace('_', ' ')}
                      </Badge>
                      <Select
                        value={booking.status || 'pending'}
                        onValueChange={(status) =>
                          updateStatusMutation.mutate({ id: booking.id, status })
                        }
                      >
                        <SelectTrigger className="w-[130px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="confirmed">Confirmed</SelectItem>
                          <SelectItem value="in_progress">In Progress</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Booking Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Booking Details</DialogTitle>
          </DialogHeader>
          {selectedBooking && (
            <div className="space-y-4">
              {/* Customer Info */}
              <div className="p-4 bg-muted rounded-lg space-y-3">
                <h4 className="font-semibold">Customer Information</h4>
                <div className="grid grid-cols-1 gap-2">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span>{selectedBooking.profile?.full_name || 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span>{selectedBooking.profile?.email || 'N/A'}</span>
                  </div>
                  {selectedBooking.profile?.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span>{selectedBooking.profile.phone}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Service Info */}
              <div className="p-4 bg-muted rounded-lg space-y-3">
                <h4 className="font-semibold">Service Details</h4>
                <div className="space-y-2">
                  <p><span className="text-muted-foreground">Service:</span> {selectedBooking.service?.name || 'N/A'}</p>
                  {selectedBooking.service?.duration_minutes && (
                    <p><span className="text-muted-foreground">Duration:</span> {selectedBooking.service.duration_minutes} minutes</p>
                  )}
                  {selectedBooking.device && (
                    <p><span className="text-muted-foreground">Device:</span> {selectedBooking.device.device_type} - {selectedBooking.device.brand} {selectedBooking.device.model}</p>
                  )}
                </div>
              </div>

              {/* Schedule Info */}
              <div className="p-4 bg-muted rounded-lg space-y-3">
                <h4 className="font-semibold">Schedule</h4>
                <div className="space-y-2">
                  <p><span className="text-muted-foreground">Date:</span> {format(new Date(selectedBooking.scheduled_date), 'MMMM dd, yyyy')}</p>
                  {selectedBooking.scheduled_time && (
                    <p><span className="text-muted-foreground">Time:</span> {selectedBooking.scheduled_time}</p>
                  )}
                  <p><span className="text-muted-foreground">Type:</span> <span className="capitalize">{selectedBooking.booking_type}</span></p>
                  {selectedBooking.address && (
                    <p><span className="text-muted-foreground">Address:</span> {selectedBooking.address}</p>
                  )}
                </div>
              </div>

              {/* Issue Description */}
              {selectedBooking.issue_description && (
                <div className="p-4 bg-muted rounded-lg space-y-3">
                  <h4 className="font-semibold">Issue Description</h4>
                  <p className="text-sm">{selectedBooking.issue_description}</p>
                </div>
              )}

              {/* Notes */}
              {selectedBooking.notes && (
                <div className="p-4 bg-muted rounded-lg space-y-3">
                  <h4 className="font-semibold">Notes</h4>
                  <p className="text-sm">{selectedBooking.notes}</p>
                </div>
              )}

              {/* Update Status */}
              <div className="flex items-center justify-between pt-4">
                <Badge className={statusColors[selectedBooking.status] || 'bg-muted'}>
                  Current: {selectedBooking.status?.replace('_', ' ')}
                </Badge>
                <Select
                  value={selectedBooking.status || 'pending'}
                  onValueChange={(status) => {
                    updateStatusMutation.mutate({ id: selectedBooking.id, status });
                    setSelectedBooking({ ...selectedBooking, status });
                  }}
                >
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Update Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
