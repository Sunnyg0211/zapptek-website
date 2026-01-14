import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import { format, subDays, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Calendar, Users } from "lucide-react";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

export default function AdminReports() {
  const [dateRange, setDateRange] = useState("30");

  const { data: ordersData } = useQuery({
    queryKey: ["reports-orders", dateRange],
    queryFn: async () => {
      const daysAgo = parseInt(dateRange);
      const startDate = subDays(new Date(), daysAgo).toISOString();
      
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .gte("created_at", startDate)
        .order("created_at", { ascending: true });
      
      if (error) throw error;
      return data;
    },
  });

  const { data: bookingsData } = useQuery({
    queryKey: ["reports-bookings", dateRange],
    queryFn: async () => {
      const daysAgo = parseInt(dateRange);
      const startDate = subDays(new Date(), daysAgo).toISOString();
      
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .gte("created_at", startDate);
      
      if (error) throw error;
      return data;
    },
  });

  const { data: productsData } = useQuery({
    queryKey: ["reports-products"],
    queryFn: async () => {
      const { data: orderItems, error } = await supabase
        .from("order_items")
        .select("product_id, quantity, unit_price, products(name)");
      
      if (error) throw error;
      
      const productSales: Record<string, { name: string; quantity: number; revenue: number }> = {};
      orderItems.forEach((item: any) => {
        const productId = item.product_id;
        if (!productSales[productId]) {
          productSales[productId] = {
            name: item.products?.name || "Unknown",
            quantity: 0,
            revenue: 0,
          };
        }
        productSales[productId].quantity += item.quantity;
        productSales[productId].revenue += item.quantity * item.unit_price;
      });
      
      return Object.values(productSales).sort((a, b) => b.revenue - a.revenue).slice(0, 10);
    },
  });

  const { data: servicesData } = useQuery({
    queryKey: ["reports-services"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("bookings")
        .select("service_id, services(name)");
      
      if (error) throw error;
      
      const serviceCounts: Record<string, { name: string; count: number }> = {};
      data.forEach((booking: any) => {
        const serviceId = booking.service_id;
        if (serviceId) {
          if (!serviceCounts[serviceId]) {
            serviceCounts[serviceId] = {
              name: booking.services?.name || "Unknown",
              count: 0,
            };
          }
          serviceCounts[serviceId].count++;
        }
      });
      
      return Object.values(serviceCounts).sort((a, b) => b.count - a.count).slice(0, 5);
    },
  });

  // Calculate metrics
  const totalRevenue = ordersData?.reduce((sum, order) => sum + Number(order.total_amount), 0) || 0;
  const totalOrders = ordersData?.length || 0;
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  const totalBookings = bookingsData?.length || 0;

  // Revenue by day chart data
  const revenueByDay = (() => {
    if (!ordersData) return [];
    const days = parseInt(dateRange);
    const interval = eachDayOfInterval({
      start: subDays(new Date(), days - 1),
      end: new Date(),
    });
    
    return interval.map((date) => {
      const dayOrders = ordersData.filter(
        (order) => format(new Date(order.created_at), "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
      );
      return {
        date: format(date, "MMM dd"),
        revenue: dayOrders.reduce((sum, order) => sum + Number(order.total_amount), 0),
        orders: dayOrders.length,
      };
    });
  })();

  // Booking status distribution
  const bookingStatusData = (() => {
    if (!bookingsData) return [];
    const statusCounts: Record<string, number> = {};
    bookingsData.forEach((booking) => {
      const status = booking.status || "pending";
      statusCounts[status] = (statusCounts[status] || 0) + 1;
    });
    return Object.entries(statusCounts).map(([name, value]) => ({ name, value }));
  })();

  // Order status distribution
  const orderStatusData = (() => {
    if (!ordersData) return [];
    const statusCounts: Record<string, number> = {};
    ordersData.forEach((order) => {
      const status = order.status || "pending";
      statusCounts[status] = (statusCounts[status] || 0) + 1;
    });
    return Object.entries(statusCounts).map(([name, value]) => ({ name, value }));
  })();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Reports & Analytics</h1>
        <Select value={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">Last 7 days</SelectItem>
            <SelectItem value="30">Last 30 days</SelectItem>
            <SelectItem value="90">Last 90 days</SelectItem>
            <SelectItem value="365">Last year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
            <DollarSign className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Last {dateRange} days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Orders</CardTitle>
            <ShoppingCart className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
            <p className="text-xs text-muted-foreground">Last {dateRange} days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg Order Value</CardTitle>
            <TrendingUp className="h-5 w-5 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{avgOrderValue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Per order</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Bookings</CardTitle>
            <Calendar className="h-5 w-5 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBookings}</div>
            <p className="text-xs text-muted-foreground">Last {dateRange} days</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueByDay}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip formatter={(value: number) => `₹${value.toLocaleString()}`} />
                  <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Orders Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueByDay}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip />
                  <Bar dataKey="orders" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Order Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={orderStatusData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {orderStatusData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Booking Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={bookingStatusData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {bookingStatusData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Products by Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead className="text-right">Qty Sold</TableHead>
                  <TableHead className="text-right">Revenue</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {productsData?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center text-muted-foreground">
                      No data available
                    </TableCell>
                  </TableRow>
                ) : (
                  productsData?.map((product, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell className="text-right">{product.quantity}</TableCell>
                      <TableCell className="text-right">₹{product.revenue.toLocaleString()}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Services by Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Service</TableHead>
                  <TableHead className="text-right">Bookings</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {servicesData?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={2} className="text-center text-muted-foreground">
                      No data available
                    </TableCell>
                  </TableRow>
                ) : (
                  servicesData?.map((service, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{service.name}</TableCell>
                      <TableCell className="text-right">
                        <Badge variant="secondary">{service.count}</Badge>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
