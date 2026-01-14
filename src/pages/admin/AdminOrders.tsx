import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Search, Eye } from "lucide-react";
import { format } from "date-fns";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-500",
  processing: "bg-blue-500",
  shipped: "bg-purple-500",
  delivered: "bg-green-500",
  cancelled: "bg-red-500",
};

const paymentStatusColors: Record<string, string> = {
  pending: "bg-yellow-500",
  paid: "bg-green-500",
  failed: "bg-red-500",
  refunded: "bg-gray-500",
};

export default function AdminOrders() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: orders, isLoading } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: async () => {
      const { data: ordersData, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      const userIds = [...new Set(ordersData.map((o) => o.user_id))];
      const { data: profiles } = await supabase
        .from("profiles")
        .select("user_id, full_name, email")
        .in("user_id", userIds);

      return ordersData.map((order) => ({
        ...order,
        user: profiles?.find((p) => p.user_id === order.user_id),
      }));
    },
  });

  const { data: orderItems } = useQuery({
    queryKey: ["order-items", selectedOrder?.id],
    queryFn: async () => {
      if (!selectedOrder) return [];
      const { data, error } = await supabase
        .from("order_items")
        .select("*, products(name)")
        .eq("order_id", selectedOrder.id);
      if (error) throw error;
      return data;
    },
    enabled: !!selectedOrder,
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase.from("orders").update({ status }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
      toast.success("Order status updated");
    },
    onError: () => {
      toast.error("Failed to update status");
    },
  });

  const updatePaymentStatusMutation = useMutation({
    mutationFn: async ({ id, payment_status }: { id: string; payment_status: string }) => {
      const { error } = await supabase.from("orders").update({ payment_status }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
      toast.success("Payment status updated");
    },
    onError: () => {
      toast.error("Failed to update payment status");
    },
  });

  const filteredOrders = orders?.filter((order) => {
    const matchesSearch =
      order.user?.full_name?.toLowerCase().includes(search.toLowerCase()) ||
      order.user?.email?.toLowerCase().includes(search.toLowerCase()) ||
      order.id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const viewOrderDetails = (order: any) => {
    setSelectedOrder(order);
    setIsDetailOpen(true);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Orders</h1>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search orders..."
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
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="shipped">Shipped</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">Loading...</TableCell>
              </TableRow>
            ) : filteredOrders?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">No orders found</TableCell>
              </TableRow>
            ) : (
              filteredOrders?.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-mono text-sm">{order.id.slice(0, 8)}...</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{order.user?.full_name || "N/A"}</div>
                      <div className="text-sm text-muted-foreground">{order.user?.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>₹{order.total_amount}</TableCell>
                  <TableCell>
                    <Badge className={paymentStatusColors[order.payment_status || "pending"]}>
                      {order.payment_status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColors[order.status || "pending"]}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{format(new Date(order.created_at), "MMM dd, yyyy")}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" onClick={() => viewOrderDetails(order)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Select
                        value={order.status || "pending"}
                        onValueChange={(status) =>
                          updateStatusMutation.mutate({ id: order.id, status })
                        }
                      >
                        <SelectTrigger className="w-[120px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="processing">Processing</SelectItem>
                          <SelectItem value="shipped">Shipped</SelectItem>
                          <SelectItem value="delivered">Delivered</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
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
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Order ID</p>
                  <p className="font-mono">{selectedOrder.id}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Customer</p>
                  <p>{selectedOrder.user?.full_name || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Amount</p>
                  <p className="font-bold">₹{selectedOrder.total_amount}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Payment Method</p>
                  <p>{selectedOrder.payment_method || "N/A"}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-muted-foreground">Shipping Address</p>
                  <p>{selectedOrder.shipping_address || "N/A"}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">Order Items</p>
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Qty</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orderItems?.map((item: any) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.products?.name || "Unknown"}</TableCell>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell>₹{item.unit_price}</TableCell>
                          <TableCell>₹{item.quantity * item.unit_price}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground mb-1">Update Payment Status</p>
                  <Select
                    value={selectedOrder.payment_status || "pending"}
                    onValueChange={(payment_status) =>
                      updatePaymentStatusMutation.mutate({ id: selectedOrder.id, payment_status })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                      <SelectItem value="refunded">Refunded</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
