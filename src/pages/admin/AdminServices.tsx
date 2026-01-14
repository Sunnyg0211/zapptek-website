import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Wrench,
  Search,
  Plus,
  Edit2,
  Trash2,
  ToggleLeft,
  ToggleRight,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useRequireAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { parsePrice, parseDuration } from '@/lib/validation';

interface Service {
  id: string;
  name: string;
  description: string | null;
  category: string;
  price: number;
  duration_minutes: number | null;
  is_active: boolean;
  icon: string | null;
  created_at: string;
}

const categories = [
  'Computer Repair',
  'Laptop Repair',
  'Printer Service',
  'Networking',
  'CCTV',
  'Software',
  'Data Recovery',
  'Other',
];

const AdminServices = () => {
  useRequireAuth('admin');
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    duration_minutes: '',
    icon: '',
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setServices(data || []);
    } catch (error) {
      console.error('Error fetching services:', error);
      toast.error('Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Validate numeric inputs
      let price: number;
      let duration: number;
      
      try {
        price = parsePrice(formData.price, 'Price');
      } catch (err) {
        toast.error(err instanceof Error ? err.message : 'Invalid price');
        return;
      }
      
      try {
        duration = formData.duration_minutes ? parseDuration(formData.duration_minutes, 'Duration') : 60;
      } catch (err) {
        toast.error(err instanceof Error ? err.message : 'Invalid duration');
        return;
      }

      const serviceData = {
        name: formData.name.trim(),
        description: formData.description?.trim() || null,
        category: formData.category,
        price,
        duration_minutes: duration,
        icon: formData.icon?.trim() || null,
      };

      if (editingService) {
        const { error } = await supabase
          .from('services')
          .update(serviceData)
          .eq('id', editingService.id);

        if (error) throw error;
        toast.success('Service updated successfully');
      } else {
        const { error } = await supabase
          .from('services')
          .insert(serviceData);

        if (error) throw error;
        toast.success('Service created successfully');
      }

      setDialogOpen(false);
      setEditingService(null);
      resetForm();
      fetchServices();
    } catch (error) {
      console.error('Error saving service:', error);
      toast.error('Failed to save service');
    }
  };

  const toggleActive = async (service: Service) => {
    try {
      const { error } = await supabase
        .from('services')
        .update({ is_active: !service.is_active })
        .eq('id', service.id);

      if (error) throw error;
      
      setServices(services.map(s => 
        s.id === service.id ? { ...s, is_active: !s.is_active } : s
      ));
      
      toast.success(`Service ${service.is_active ? 'deactivated' : 'activated'}`);
    } catch (error) {
      console.error('Error toggling service:', error);
      toast.error('Failed to update service');
    }
  };

  const deleteService = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    
    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setServices(services.filter(s => s.id !== id));
      toast.success('Service deleted');
    } catch (error) {
      console.error('Error deleting service:', error);
      toast.error('Failed to delete service');
    }
  };

  const openEditDialog = (service: Service) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      description: service.description || '',
      category: service.category,
      price: service.price.toString(),
      duration_minutes: service.duration_minutes?.toString() || '',
      icon: service.icon || '',
    });
    setDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      category: '',
      price: '',
      duration_minutes: '',
      icon: '',
    });
  };

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold">Services</h1>
          <p className="text-muted-foreground">Manage service offerings and pricing</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) {
            setEditingService(null);
            resetForm();
          }
        }}>
          <DialogTrigger asChild>
            <Button variant="gradient">
              <Plus className="w-4 h-4 mr-2" />
              Add Service
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{editingService ? 'Edit Service' : 'Add New Service'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Service Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Price (₹)</Label>
                  <Input
                    id="price"
                    type="number"
                    min="0"
                    max="10000000"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="duration">Duration (min)</Label>
                  <Input
                    id="duration"
                    type="number"
                    min="0"
                    max="1440"
                    value={formData.duration_minutes}
                    onChange={(e) => setFormData({ ...formData, duration_minutes: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex gap-2 pt-4">
                <Button type="button" variant="outline" className="flex-1" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="gradient" className="flex-1">
                  {editingService ? 'Update' : 'Create'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardContent>
      </Card>

      {/* Services Grid */}
      {loading ? (
        <div className="text-center py-8 text-muted-foreground">Loading services...</div>
      ) : filteredServices.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">No services found</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className={`h-full ${!service.is_active ? 'opacity-60' : ''}`}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Wrench className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={service.is_active ? 'default' : 'secondary'}>
                        {service.is_active ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg mb-1">{service.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{service.category}</p>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {service.description || 'No description'}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-primary">₹{service.price}</span>
                    <span className="text-sm text-muted-foreground">
                      {service.duration_minutes} min
                    </span>
                  </div>
                  <div className="flex gap-2 mt-4 pt-4 border-t">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEditDialog(service)}
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleActive(service)}
                    >
                      {service.is_active ? (
                        <ToggleRight className="w-4 h-4 text-green-600" />
                      ) : (
                        <ToggleLeft className="w-4 h-4 text-muted-foreground" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteService(service.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminServices;
