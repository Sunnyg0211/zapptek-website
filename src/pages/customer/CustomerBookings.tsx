import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Clock, MapPin, Plus, Search, Wrench } from "lucide-react";
import { format } from "date-fns";
import { motion } from "framer-motion";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-500",
  confirmed: "bg-blue-500",
  in_progress: "bg-purple-500",
  completed: "bg-green-500",
  cancelled: "bg-red-500",
};

export default function CustomerBookings() {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const { data: bookings, isLoading } = useQuery({
    queryKey: ["customer-bookings", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("bookings")
        .select("*, services(name, price)")
        .eq("user_id", user!.id)
        .order("scheduled_date", { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const filteredBookings = bookings?.filter((booking) => {
    const matchesSearch =
      booking.services?.name?.toLowerCase().includes(search.toLowerCase()) ||
      booking.issue_description?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">My Bookings</h1>
          <p className="text-muted-foreground">View and manage your service bookings</p>
        </div>
        <Link to="/book-service">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Book New Service
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search bookings..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
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
      {filteredBookings?.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold">No bookings found</h3>
            <p className="text-muted-foreground mb-4">
              {bookings?.length === 0
                ? "You haven't made any bookings yet"
                : "No bookings match your search"}
            </p>
            <Link to="/book-service">
              <Button>Book Your First Service</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredBookings?.map((booking, index) => (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Wrench className="h-5 w-5 text-primary" />
                        <h3 className="font-semibold text-lg">
                          {booking.services?.name || "Service Booking"}
                        </h3>
                        <Badge className={statusColors[booking.status || "pending"]}>
                          {booking.status}
                        </Badge>
                      </div>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {format(new Date(booking.scheduled_date), "MMM dd, yyyy")}
                        </div>
                        {booking.scheduled_time && (
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {booking.scheduled_time}
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {booking.booking_type === "onsite" ? "On-site" : "Remote"}
                        </div>
                      </div>

                      {booking.issue_description && (
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {booking.issue_description}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      {booking.services?.price && (
                        <p className="text-lg font-bold">₹{booking.services.price}</p>
                      )}
                      <p className="text-xs text-muted-foreground">
                        Booked on {format(new Date(booking.created_at), "MMM dd, yyyy")}
                      </p>
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
}
