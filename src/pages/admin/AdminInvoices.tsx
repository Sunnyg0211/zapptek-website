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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Search, Plus, Eye, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { parsePrice } from "@/lib/validation";

const statusColors: Record<string, string> = {
  unpaid: "bg-yellow-500",
  paid: "bg-green-500",
  overdue: "bg-red-500",
  cancelled: "bg-gray-500",
};

export default function AdminInvoices() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: invoices, isLoading } = useQuery({
    queryKey: ["admin-invoices"],
    queryFn: async () => {
      const { data: invoicesData, error } = await supabase
        .from("invoices")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      const userIds = [...new Set(invoicesData.map((i) => i.user_id))];
      const { data: profiles } = await supabase
        .from("profiles")
        .select("user_id, full_name, email")
        .in("user_id", userIds);

      return invoicesData.map((invoice) => ({
        ...invoice,
        user: profiles?.find((p) => p.user_id === invoice.user_id),
      }));
    },
  });

  const { data: users } = useQuery({
    queryKey: ["users-for-invoice"],
    queryFn: async () => {
      const { data, error } = await supabase.from("profiles").select("user_id, full_name, email");
      if (error) throw error;
      return data;
    },
  });

  const createInvoiceMutation = useMutation({
    mutationFn: async (invoice: any) => {
      const { error } = await supabase.from("invoices").insert(invoice);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-invoices"] });
      toast.success("Invoice created");
      setIsOpen(false);
    },
    onError: () => {
      toast.error("Failed to create invoice");
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status, paid_date }: { id: string; status: string; paid_date?: string }) => {
      const updateData: any = { status };
      if (paid_date) updateData.paid_date = paid_date;
      const { error } = await supabase.from("invoices").update(updateData).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-invoices"] });
      toast.success("Invoice status updated");
    },
    onError: () => {
      toast.error("Failed to update status");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("invoices").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-invoices"] });
      toast.success("Invoice deleted");
    },
    onError: () => {
      toast.error("Failed to delete invoice");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formDataObj = new FormData(e.currentTarget);
    
    // Validate numeric inputs
    let amount: number;
    let taxAmount: number;
    
    try {
      amount = parsePrice(formDataObj.get("amount") as string, 'Amount');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Invalid amount');
      return;
    }
    
    try {
      const taxValue = formDataObj.get("tax_amount") as string;
      taxAmount = taxValue ? parsePrice(taxValue, 'Tax amount') : 0;
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Invalid tax amount');
      return;
    }
    
    createInvoiceMutation.mutate({
      user_id: formDataObj.get("user_id"),
      invoice_number: (formDataObj.get("invoice_number") as string)?.trim(),
      amount,
      tax_amount: taxAmount,
      total_amount: amount + taxAmount,
      due_date: formDataObj.get("due_date") || null,
      status: "unpaid",
    });
  };

  const filteredInvoices = invoices?.filter((invoice) => {
    const matchesSearch =
      invoice.user?.full_name?.toLowerCase().includes(search.toLowerCase()) ||
      invoice.invoice_number?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || invoice.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const generateInvoiceNumber = () => {
    const date = new Date();
    return `INV-${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Invoices</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" /> Create Invoice
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Invoice</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="user_id">Customer</Label>
                <Select name="user_id" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select customer" />
                  </SelectTrigger>
                  <SelectContent>
                    {users?.map((user) => (
                      <SelectItem key={user.user_id} value={user.user_id}>
                        {user.full_name || user.email}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="invoice_number">Invoice Number</Label>
                <Input
                  id="invoice_number"
                  name="invoice_number"
                  defaultValue={generateInvoiceNumber()}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="amount">Amount (₹)</Label>
                  <Input id="amount" name="amount" type="number" min="0" max="10000000" step="0.01" required />
                </div>
                <div>
                  <Label htmlFor="tax_amount">Tax Amount (₹)</Label>
                  <Input id="tax_amount" name="tax_amount" type="number" min="0" max="10000000" step="0.01" defaultValue="0" />
                </div>
              </div>
              <div>
                <Label htmlFor="due_date">Due Date</Label>
                <Input id="due_date" name="due_date" type="date" />
              </div>
              <Button type="submit" className="w-full" disabled={createInvoiceMutation.isPending}>
                {createInvoiceMutation.isPending ? "Creating..." : "Create Invoice"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search invoices..."
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

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice #</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">Loading...</TableCell>
              </TableRow>
            ) : filteredInvoices?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">No invoices found</TableCell>
              </TableRow>
            ) : (
              filteredInvoices?.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-mono">{invoice.invoice_number}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{invoice.user?.full_name || "N/A"}</div>
                      <div className="text-sm text-muted-foreground">{invoice.user?.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>₹{invoice.total_amount}</TableCell>
                  <TableCell>
                    {invoice.due_date ? format(new Date(invoice.due_date), "MMM dd, yyyy") : "N/A"}
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColors[invoice.status || "unpaid"]}>
                      {invoice.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedInvoice(invoice);
                          setIsDetailOpen(true);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Select
                        value={invoice.status || "unpaid"}
                        onValueChange={(status) =>
                          updateStatusMutation.mutate({
                            id: invoice.id,
                            status,
                            paid_date: status === "paid" ? new Date().toISOString().split("T")[0] : undefined,
                          })
                        }
                      >
                        <SelectTrigger className="w-[110px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="unpaid">Unpaid</SelectItem>
                          <SelectItem value="paid">Paid</SelectItem>
                          <SelectItem value="overdue">Overdue</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteMutation.mutate(invoice.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invoice Details</DialogTitle>
          </DialogHeader>
          {selectedInvoice && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Invoice Number</p>
                  <p className="font-mono font-bold">{selectedInvoice.invoice_number}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge className={statusColors[selectedInvoice.status || "unpaid"]}>
                    {selectedInvoice.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Customer</p>
                  <p>{selectedInvoice.user?.full_name || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p>{selectedInvoice.user?.email || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Amount</p>
                  <p>₹{selectedInvoice.amount}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Tax</p>
                  <p>₹{selectedInvoice.tax_amount || 0}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total</p>
                  <p className="font-bold text-lg">₹{selectedInvoice.total_amount}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Due Date</p>
                  <p>
                    {selectedInvoice.due_date
                      ? format(new Date(selectedInvoice.due_date), "MMM dd, yyyy")
                      : "N/A"}
                  </p>
                </div>
                {selectedInvoice.paid_date && (
                  <div>
                    <p className="text-sm text-muted-foreground">Paid Date</p>
                    <p>{format(new Date(selectedInvoice.paid_date), "MMM dd, yyyy")}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-muted-foreground">Created</p>
                  <p>{format(new Date(selectedInvoice.created_at), "MMM dd, yyyy HH:mm")}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
