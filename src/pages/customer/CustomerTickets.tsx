import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { MessageSquare, Plus, Search, Send, Clock } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { motion } from "framer-motion";

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

export default function CustomerTickets() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [newTicket, setNewTicket] = useState({
    subject: "",
    description: "",
    priority: "medium",
  });

  const { data: tickets, isLoading } = useQuery({
    queryKey: ["customer-tickets", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("tickets")
        .select("*")
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!user,
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

  const createTicketMutation = useMutation({
    mutationFn: async (ticketData: typeof newTicket) => {
      const { error } = await supabase.from("tickets").insert({
        ...ticketData,
        user_id: user!.id,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customer-tickets"] });
      setIsCreateOpen(false);
      setNewTicket({ subject: "", description: "", priority: "medium" });
      toast.success("Ticket created successfully");
    },
    onError: () => {
      toast.error("Failed to create ticket");
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
    const matchesSearch = ticket.subject?.toLowerCase().includes(search.toLowerCase());
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
      toast.error("Message must be less than 5000 characters");
      return;
    }
    sendMessageMutation.mutate({ ticket_id: selectedTicket.id, message: trimmedMessage });
  };

  const handleCreateTicket = () => {
    if (!newTicket.subject.trim()) {
      toast.error("Please enter a subject");
      return;
    }
    if (newTicket.subject.length > 200) {
      toast.error("Subject must be less than 200 characters");
      return;
    }
    if (newTicket.description && newTicket.description.length > 2000) {
      toast.error("Description must be less than 2000 characters");
      return;
    }
    createTicketMutation.mutate(newTicket);
  };

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
          <h1 className="text-3xl font-bold">Support Tickets</h1>
          <p className="text-muted-foreground">Get help from our support team</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Ticket
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Support Ticket</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  placeholder="Brief description of your issue"
                  value={newTicket.subject}
                  onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
                  maxLength={200}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select
                  value={newTicket.priority}
                  onValueChange={(value) => setNewTicket({ ...newTicket, priority: value })}
                >
                  <SelectTrigger>
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
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Provide more details about your issue..."
                  rows={4}
                  value={newTicket.description}
                  onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                  maxLength={2000}
                />
                <p className="text-xs text-muted-foreground text-right">
                  {newTicket.description.length}/2000
                </p>
              </div>
              <Button
                className="w-full"
                onClick={handleCreateTicket}
                disabled={createTicketMutation.isPending}
              >
                {createTicketMutation.isPending ? "Creating..." : "Create Ticket"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
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
        </CardContent>
      </Card>

      {/* Tickets List */}
      {filteredTickets?.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold">No tickets found</h3>
            <p className="text-muted-foreground mb-4">
              {tickets?.length === 0
                ? "You haven't created any tickets yet"
                : "No tickets match your search"}
            </p>
            <Button onClick={() => setIsCreateOpen(true)}>Create Your First Ticket</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredTickets?.map((ticket, index) => (
            <motion.div
              key={ticket.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => openTicketDetail(ticket)}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <MessageSquare className="h-5 w-5 text-primary" />
                        <h3 className="font-semibold">{ticket.subject}</h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Badge className={statusColors[ticket.status || "open"]}>
                          {ticket.status}
                        </Badge>
                        <Badge variant="outline" className={priorityColors[ticket.priority || "medium"]}>
                          {ticket.priority} priority
                        </Badge>
                      </div>
                      {ticket.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {ticket.description}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {format(new Date(ticket.created_at), "MMM dd, yyyy")}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Ticket Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>{selectedTicket?.subject}</DialogTitle>
          </DialogHeader>
          {selectedTicket && (
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge className={statusColors[selectedTicket.status || "open"]}>
                  {selectedTicket.status}
                </Badge>
                <Badge variant="outline" className={priorityColors[selectedTicket.priority || "medium"]}>
                  {selectedTicket.priority} priority
                </Badge>
                <span className="text-sm text-muted-foreground">
                  Created {format(new Date(selectedTicket.created_at), "MMM dd, yyyy")}
                </span>
              </div>

              {selectedTicket.description && (
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm">{selectedTicket.description}</p>
                </div>
              )}

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
                              {message.sender_id === user?.id
                                ? "You"
                                : message.sender?.full_name || "Support"}
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

              {selectedTicket.status !== "closed" && (
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
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
