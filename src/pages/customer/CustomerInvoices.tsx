import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileText, Search, Download, Calendar, DollarSign } from "lucide-react";
import { format } from "date-fns";
import { motion } from "framer-motion";

const statusColors: Record<string, string> = {
  unpaid: "bg-yellow-500",
  paid: "bg-green-500",
  overdue: "bg-red-500",
  cancelled: "bg-gray-500",
};

export default function CustomerInvoices() {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const { data: invoices, isLoading } = useQuery({
    queryKey: ["customer-invoices", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("invoices")
        .select("*")
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const filteredInvoices = invoices?.filter((invoice) => {
    const matchesSearch = invoice.invoice_number
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || invoice.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalUnpaid = invoices
    ?.filter((i) => i.status === "unpaid")
    .reduce((sum, i) => sum + i.total_amount, 0) || 0;

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
          <h1 className="text-3xl font-bold">My Invoices</h1>
          <p className="text-muted-foreground">View and download your invoices</p>
        </div>
        {totalUnpaid > 0 && (
          <Card className="bg-yellow-500/10 border-yellow-500/20">
            <CardContent className="p-4 flex items-center gap-3">
              <DollarSign className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="text-sm font-medium">Total Unpaid</p>
                <p className="text-lg font-bold text-yellow-600">₹{totalUnpaid.toFixed(2)}</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by invoice number..."
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
                <SelectItem value="unpaid">Unpaid</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Invoices List */}
      {filteredInvoices?.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold">No invoices found</h3>
            <p className="text-muted-foreground">
              {invoices?.length === 0
                ? "You don't have any invoices yet"
                : "No invoices match your search"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredInvoices?.map((invoice, index) => (
            <motion.div
              key={invoice.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <FileText className="h-6 w-6 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-semibold">{invoice.invoice_number}</h3>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Issued: {format(new Date(invoice.created_at), "MMM dd, yyyy")}
                          </div>
                          {invoice.due_date && (
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              Due: {format(new Date(invoice.due_date), "MMM dd, yyyy")}
                            </div>
                          )}
                        </div>
                        <Badge className={statusColors[invoice.status || "unpaid"]}>
                          {invoice.status}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Amount</p>
                        <p className="text-xl font-bold">₹{invoice.total_amount}</p>
                        {invoice.tax_amount > 0 && (
                          <p className="text-xs text-muted-foreground">
                            Incl. tax: ₹{invoice.tax_amount}
                          </p>
                        )}
                      </div>
                      {invoice.pdf_url && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={invoice.pdf_url} target="_blank" rel="noopener noreferrer">
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </a>
                        </Button>
                      )}
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
