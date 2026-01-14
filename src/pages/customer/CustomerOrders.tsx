import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ShoppingBag, Search, Package, CreditCard, Truck } from "lucide-react";
import { format } from "date-fns";
import { motion } from "framer-motion";

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

export default function CustomerOrders() {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const { data: orders, isLoading } = useQuery({
    queryKey: ["customer-orders", user?.id],
    queryFn: async () => {
      const { data: ordersData, error } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Fetch order items for each order
      const ordersWithItems = await Promise.all(
        ordersData.map(async (order) => {
          const { data: items } = await supabase
            .from("order_items")
            .select("*, products(name, image_url)")
            .eq("order_id", order.id);
          return { ...order, items: items || [] };
        })
      );

      return ordersWithItems;
    },
    enabled: !!user,
  });

  const filteredOrders = orders?.filter((order) => {
    const matchesSearch = order.id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
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
          <h1 className="text-3xl font-bold">My Orders</h1>
          <p className="text-muted-foreground">Track and manage your orders</p>
        </div>
        <Link to="/products">
          <Button>
            <ShoppingBag className="mr-2 h-4 w-4" />
            Shop Products
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
                placeholder="Search by order ID..."
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
        </CardContent>
      </Card>

      {/* Orders List */}
      {filteredOrders?.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <ShoppingBag className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold">No orders found</h3>
            <p className="text-muted-foreground mb-4">
              {orders?.length === 0
                ? "You haven't placed any orders yet"
                : "No orders match your search"}
            </p>
            <Link to="/products">
              <Button>Browse Products</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <Accordion type="single" collapsible className="space-y-4">
          {filteredOrders?.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <AccordionItem value={order.id} className="border rounded-lg">
                <AccordionTrigger className="px-6 hover:no-underline">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full text-left">
                    <div className="flex items-center gap-3">
                      <Package className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-semibold">Order #{order.id.slice(0, 8)}</p>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(order.created_at), "MMM dd, yyyy")}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 sm:ml-auto">
                      <Badge className={statusColors[order.status || "pending"]}>
                        {order.status}
                      </Badge>
                      <Badge className={paymentStatusColors[order.payment_status || "pending"]}>
                        {order.payment_status}
                      </Badge>
                    </div>
                    <p className="font-bold text-lg">₹{order.total_amount}</p>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="space-y-4 pt-4 border-t">
                    {/* Order Items */}
                    <div>
                      <h4 className="font-medium mb-3">Order Items</h4>
                      <div className="space-y-3">
                        {order.items?.map((item: any) => (
                          <div
                            key={item.id}
                            className="flex items-center gap-4 p-3 rounded-lg bg-muted/50"
                          >
                            {item.products?.image_url ? (
                              <img
                                src={item.products.image_url}
                                alt={item.products.name}
                                className="w-12 h-12 rounded object-cover"
                              />
                            ) : (
                              <div className="w-12 h-12 rounded bg-muted flex items-center justify-center">
                                <Package className="h-6 w-6 text-muted-foreground" />
                              </div>
                            )}
                            <div className="flex-1">
                              <p className="font-medium">{item.products?.name || "Product"}</p>
                              <p className="text-sm text-muted-foreground">
                                Qty: {item.quantity} × ₹{item.unit_price}
                              </p>
                            </div>
                            <p className="font-medium">₹{item.quantity * item.unit_price}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Order Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t">
                      <div className="flex items-start gap-3">
                        <Truck className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Shipping Address</p>
                          <p className="text-sm text-muted-foreground">
                            {order.shipping_address || "Not specified"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CreditCard className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Payment Method</p>
                          <p className="text-sm text-muted-foreground">
                            {order.payment_method || "Not specified"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      )}
    </div>
  );
}
