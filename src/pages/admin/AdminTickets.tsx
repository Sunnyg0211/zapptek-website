import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { Search, MessageSquare, Send } from "lucide-react";
import { format } from "date-fns";
import { useAuth } from "@/hooks/useAuth";

const statusColors: Record<string, string> = {
  open: "bg-blue-500",
  in_progress: "bg-yellow-500",
  resolved: "bg-green-500",
  closed: "bg-gray-500",
};

const priorityColors: Record<string, string> = {
  low: "bg-gray-500",
  medium: "bg-yellow-500",
  high: "bg-orange-500",
  urgent: "bg-red-500",
};

export default function AdminTickets() {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const queryClient = useQueryClient();

  const { data: tickets, isLoading } = useQuery({
    queryKey: ["admin-tickets"],
    queryFn: async () => {
      const { data: ticketsData, error } = await supabase
        .from("tickets")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      const userIds = [...new Set(ticketsData.map((t) => t.user_id))];
      const { data: profiles } = await supabase
        .from("profiles")
        .select("user_id, full_name, email")
        .in("user_id", userIds);

      return ticketsData.map((ticket) => ({
        ...ticket,
        user: profiles?.find((p) => p.user_id === ticket.user_id),
      }));
    },
  });

  const { data: messages, refetch: refetchMessages } = useQuery({
    queryKey: ["ticket-messages", selectedTicket?.id],
    queryFn: async () => {
      if (!selectedTicket) return [];
      const { data, error } = await supabase
        .from("ticket_messages")
        .select("*")
        .eq("ticket_id", selectedTicket.id)
        .order("created_at", { ascending: true });
      if (error) throw error;

      const senderIds = [...new Set(data.map((m) => m.sender_id))];
      const { data: profiles } = await supabase
        .from("profiles")
        .select("user_id, full_name")
        .in("user_id", senderIds);

      return data.map((message) => ({
        ...message,
        sender: profiles?.find((p) => p.user_id === message.sender_id),
      }));
    },
    enabled: !!selectedTicket,
  });

  const { data: staff } = useQuery({
    queryKey: ["staff-users"],
    queryFn: async () => {
      const { data: roles, error } = await supabase
        .from("user_roles")
        .select("user_id")
        .in("role", ["admin", "staff"]);
      if (error) throw error;

      const userIds = roles.map((r) => r.user_id);
      const { data: profiles } = await supabase
        .from("profiles")
        .select("user_id, full_name, email")
        .in("user_id", userIds);

      return profiles;
    },
  });

  const updateTicketMutation = useMutation({
    mutationFn: async (updates: { id: string; status?: string; priority?: string; assigned_staff_id?: string | null }) => {
      const { id, ...data } = updates;
      const { error } = await supabase.from("tickets").update(data).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-tickets"] });
      toast.success("Ticket updated");
    },
    onError: () => {
      toast.error("Failed to update ticket");
    },
  });

  const sendMessageMutation = useMutation({
    mutationFn: async ({ ticket_id, message }: { ticket_id: string; message: string }) => {
      const { error } = await supabase.from("ticket_messages").insert({
        ticket_id,
        message,
        sender_id: user?.id,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      refetchMessages();
      setNewMessage("");
      toast.success("Message sent");
    },
    onError: () => {
      toast.error("Failed to send message");
    },
  });

  const filteredTickets = tickets?.filter((ticket) => {
    const matchesSearch =
      ticket.user?.full_name?.toLowerCase().includes(search.toLowerCase()) ||
      ticket.subject?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const openTicketDetail = (ticket: any) => {
    setSelectedTicket(ticket);
    setIsDetailOpen(true);
  };

  const handleSendMessage = () => {
    const trimmedMessage = newMessage.trim();
    if (!trimmedMessage || !selectedTicket) {
      return;
    }
    if (trimmedMessage.length > 5000) {
      toast.error('Message must be less than 5000 characters');
      return;
    }
    sendMessageMutation.mutate({ ticket_id: selectedTicket.id, message: trimmedMessage });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Support Tickets</h1>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tickets..."
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
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Subject</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">Loading...</TableCell>
              </TableRow>
            ) : filteredTickets?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">No tickets found</TableCell>
              </TableRow>
            ) : (
              filteredTickets?.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell className="font-medium max-w-[200px] truncate">{ticket.subject}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{ticket.user?.full_name || "N/A"}</div>
                      <div className="text-sm text-muted-foreground">{ticket.user?.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={priorityColors[ticket.priority || "medium"]}>
                      {ticket.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColors[ticket.status || "open"]}>
                      {ticket.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={ticket.assigned_staff_id || "unassigned"}
                      onValueChange={(value) =>
                        updateTicketMutation.mutate({
                          id: ticket.id,
                          assigned_staff_id: value === "unassigned" ? null : value,
                        })
                      }
                    >
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Assign" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="unassigned">Unassigned</SelectItem>
                        {staff?.map((s) => (
                          <SelectItem key={s.user_id} value={s.user_id}>
                            {s.full_name || s.email}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>{format(new Date(ticket.created_at), "MMM dd, yyyy")}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" onClick={() => openTicketDetail(ticket)}>
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                      <Select
                        value={ticket.status || "open"}
                        onValueChange={(status) =>
                          updateTicketMutation.mutate({ id: ticket.id, status })
                        }
                      >
                        <SelectTrigger className="w-[120px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="open">Open</SelectItem>
                          <SelectItem value="in_progress">In Progress</SelectItem>
                          <SelectItem value="resolved">Resolved</SelectItem>
                          <SelectItem value="closed">Closed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Ticket: {selectedTicket?.subject}</DialogTitle>
          </DialogHeader>
          {selectedTicket && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
                <div>
                  <p className="text-sm text-muted-foreground">Customer</p>
                  <p>{selectedTicket.user?.full_name || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Priority</p>
                  <Select
                    value={selectedTicket.priority || "medium"}
                    onValueChange={(priority) => {
                      updateTicketMutation.mutate({ id: selectedTicket.id, priority });
                      setSelectedTicket({ ...selectedTicket, priority });
                    }}
                  >
                    <SelectTrigger className="w-[120px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-muted-foreground">Description</p>
                  <p>{selectedTicket.description || "No description"}</p>
                </div>
              </div>

              <div>
                <Label className="mb-2 block">Messages</Label>
                <ScrollArea className="h-[250px] border rounded-lg p-4">
                  {messages?.length === 0 ? (
                    <p className="text-center text-muted-foreground">No messages yet</p>
                  ) : (
                    <div className="space-y-4">
                      {messages?.map((message: any) => (
                        <div
                          key={message.id}
                          className={`p-3 rounded-lg ${
                            message.sender_id === user?.id
                              ? "bg-primary text-primary-foreground ml-8"
                              : "bg-muted mr-8"
                          }`}
                        >
                          <div className="flex justify-between items-start mb-1">
                            <span className="font-medium text-sm">
                              {message.sender?.full_name || "Unknown"}
                            </span>
                            <span className="text-xs opacity-70">
                              {format(new Date(message.created_at), "MMM dd, HH:mm")}
                            </span>
                          </div>
                          <p className="text-sm">{message.message}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </div>

              <div className="space-y-2">
                <div className="flex gap-2">
                  <Textarea
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1"
                    maxLength={5000}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                  <Button onClick={handleSendMessage} disabled={sendMessageMutation.isPending}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground text-right">
                  {newMessage.length}/5000 characters
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
