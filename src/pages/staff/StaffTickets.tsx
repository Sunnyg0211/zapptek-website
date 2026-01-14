import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import {
  Search,
  MessageSquare,
  Send,
  User,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
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
  open: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  in_progress: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
  resolved: 'bg-green-500/10 text-green-600 border-green-500/20',
  closed: 'bg-gray-500/10 text-gray-600 border-gray-500/20',
};

const priorityColors: Record<string, string> = {
  low: 'bg-gray-500/10 text-gray-600 border-gray-500/20',
  medium: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
  high: 'bg-orange-500/10 text-orange-600 border-orange-500/20',
  urgent: 'bg-red-500/10 text-red-600 border-red-500/20',
};

export default function StaffTickets() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const queryClient = useQueryClient();

  const { data: tickets, isLoading } = useQuery({
    queryKey: ['staff-tickets', user?.id],
    queryFn: async () => {
      const { data: ticketsData, error } = await supabase
        .from('tickets')
        .select('*')
        .eq('assigned_staff_id', user?.id)
        .order('updated_at', { ascending: false });

      if (error) throw error;

      // Fetch user profiles
      const userIds = [...new Set(ticketsData?.map(t => t.user_id) || [])];
      const { data: profiles } = userIds.length > 0
        ? await supabase.from('profiles').select('user_id, full_name, email').in('user_id', userIds)
        : { data: [] };

      const profilesMap = new Map((profiles || []).map(p => [p.user_id, p]));

      return (ticketsData || []).map(t => ({
        ...t,
        profile: profilesMap.get(t.user_id) || null,
      }));
    },
    enabled: !!user?.id,
  });

  const { data: messages, refetch: refetchMessages } = useQuery({
    queryKey: ['ticket-messages', selectedTicket?.id],
    queryFn: async () => {
      if (!selectedTicket) return [];
      const { data, error } = await supabase
        .from('ticket_messages')
        .select('*')
        .eq('ticket_id', selectedTicket.id)
        .order('created_at', { ascending: true });

      if (error) throw error;

      const senderIds = [...new Set(data.map(m => m.sender_id))];
      const { data: profiles } = await supabase
        .from('profiles')
        .select('user_id, full_name')
        .in('user_id', senderIds);

      return data.map(message => ({
        ...message,
        sender: profiles?.find(p => p.user_id === message.sender_id),
      }));
    },
    enabled: !!selectedTicket,
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase
        .from('tickets')
        .update({ status })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['staff-tickets'] });
      toast.success('Ticket status updated');
    },
    onError: () => {
      toast.error('Failed to update ticket status');
    },
  });

  const sendMessageMutation = useMutation({
    mutationFn: async ({ ticket_id, message }: { ticket_id: string; message: string }) => {
      const { error } = await supabase.from('ticket_messages').insert({
        ticket_id,
        message,
        sender_id: user?.id,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      refetchMessages();
      setNewMessage('');
      toast.success('Message sent');
    },
    onError: () => {
      toast.error('Failed to send message');
    },
  });

  const filteredTickets = tickets?.filter(ticket => {
    const matchesSearch =
      ticket.profile?.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.description?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const openDetail = (ticket: any) => {
    setSelectedTicket(ticket);
    setIsDetailOpen(true);
  };

  const handleSendMessage = () => {
    const trimmedMessage = newMessage.trim();
    if (!trimmedMessage || !selectedTicket) return;
    if (trimmedMessage.length > 5000) {
      toast.error('Message must be less than 5000 characters');
      return;
    }
    sendMessageMutation.mutate({ ticket_id: selectedTicket.id, message: trimmedMessage });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-display font-bold">My Tickets</h1>
        <p className="text-muted-foreground">Manage your assigned support tickets</p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search tickets..."
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
      {isLoading ? (
        <div className="text-center py-8 text-muted-foreground">Loading tickets...</div>
      ) : filteredTickets?.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">No tickets assigned to you</div>
      ) : (
        <div className="space-y-4">
          {filteredTickets?.map((ticket, index) => (
            <motion.div
              key={ticket.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="hover:border-emerald-500/50 transition-colors cursor-pointer" onClick={() => openDetail(ticket)}>
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    {/* Ticket Info */}
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                          <MessageSquare className="w-5 h-5 text-purple-500" />
                        </div>
                        <div>
                          <p className="font-semibold line-clamp-1">{ticket.subject}</p>
                          <p className="text-sm text-muted-foreground">{ticket.profile?.full_name || 'Unknown'}</p>
                        </div>
                      </div>

                      {ticket.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2 pl-13">
                          {ticket.description}
                        </p>
                      )}
                    </div>

                    {/* Priority & Date */}
                    <div className="flex flex-col gap-2 lg:w-40">
                      <Badge className={priorityColors[ticket.priority || 'medium']}>
                        {ticket.priority || 'medium'} priority
                      </Badge>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(ticket.created_at), 'MMM dd, yyyy')}
                      </p>
                    </div>

                    {/* Status & Actions */}
                    <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
                      <Badge className={statusColors[ticket.status || 'open']}>
                        {ticket.status?.replace('_', ' ') || 'open'}
                      </Badge>
                      <Select
                        value={ticket.status || 'open'}
                        onValueChange={(status) =>
                          updateStatusMutation.mutate({ id: ticket.id, status })
                        }
                      >
                        <SelectTrigger className="w-[130px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="in_progress">In Progress</SelectItem>
                          <SelectItem value="resolved">Resolved</SelectItem>
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

      {/* Ticket Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="line-clamp-1">Ticket: {selectedTicket?.subject}</DialogTitle>
          </DialogHeader>
          {selectedTicket && (
            <div className="space-y-4">
              {/* Ticket Info */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
                <div>
                  <p className="text-sm text-muted-foreground">Customer</p>
                  <div className="flex items-center gap-2 mt-1">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span>{selectedTicket.profile?.full_name || 'Unknown'}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{selectedTicket.profile?.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Priority</p>
                  <Badge className={priorityColors[selectedTicket.priority || 'medium']}>
                    {selectedTicket.priority || 'medium'}
                  </Badge>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-muted-foreground">Description</p>
                  <p className="mt-1">{selectedTicket.description || 'No description'}</p>
                </div>
              </div>

              {/* Update Status */}
              <div className="flex items-center justify-between">
                <Label>Status</Label>
                <Select
                  value={selectedTicket.status || 'open'}
                  onValueChange={(status) => {
                    updateStatusMutation.mutate({ id: selectedTicket.id, status });
                    setSelectedTicket({ ...selectedTicket, status });
                  }}
                >
                  <SelectTrigger className="w-[150px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Messages */}
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
                              ? 'bg-emerald-500 text-white ml-8'
                              : 'bg-muted mr-8'
                          }`}
                        >
                          <div className="flex justify-between items-start mb-1">
                            <span className="font-medium text-sm">
                              {message.sender?.full_name || 'Unknown'}
                            </span>
                            <span className="text-xs opacity-70">
                              {format(new Date(message.created_at), 'MMM dd, HH:mm')}
                            </span>
                          </div>
                          <p className="text-sm">{message.message}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </div>

              {/* Send Message */}
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Textarea
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1"
                    maxLength={5000}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                  <Button onClick={handleSendMessage} disabled={sendMessageMutation.isPending} className="bg-emerald-500 hover:bg-emerald-600">
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
