import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  Search,
  Plus,
  Edit2,
  Trash2,
  ToggleLeft,
  ToggleRight,
  Star,
  Clock,
  CheckCircle,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { useRequireAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { parsePrice, parseMonths, parseVisits } from '@/lib/validation';

interface AMCPlan {
  id: string;
  name: string;
  description: string | null;
  price: number;
  duration_months: number;
  visits_included: number;
  priority_support: boolean;
  is_active: boolean;
  created_at: string;
}

const AdminAMCPlans = () => {
  useRequireAuth('admin');
  const [plans, setPlans] = useState<AMCPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<AMCPlan | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    duration_months: '12',
    visits_included: '4',
    priority_support: false,
  });

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const { data, error } = await supabase
        .from('amc_plans')
        .select('*')
        .order('price', { ascending: true });

      if (error) throw error;
      setPlans(data || []);
    } catch (error) {
      console.error('Error fetching plans:', error);
      toast.error('Failed to load AMC plans');
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
      let visits: number;
      
      try {
        price = parsePrice(formData.price, 'Price');
      } catch (err) {
        toast.error(err instanceof Error ? err.message : 'Invalid price');
        return;
      }
      
      try {
        duration = parseMonths(formData.duration_months, 'Duration');
        if (duration < 1) {
          toast.error('Duration must be at least 1 month');
          return;
        }
      } catch (err) {
        toast.error(err instanceof Error ? err.message : 'Invalid duration');
        return;
      }
      
      try {
        visits = parseVisits(formData.visits_included, 'Visits included');
      } catch (err) {
        toast.error(err instanceof Error ? err.message : 'Invalid visits count');
        return;
      }

      const planData = {
        name: formData.name.trim(),
        description: formData.description?.trim() || null,
        price,
        duration_months: duration,
        visits_included: visits,
        priority_support: formData.priority_support,
      };

      if (editingPlan) {
        const { error } = await supabase
          .from('amc_plans')
          .update(planData)
          .eq('id', editingPlan.id);

        if (error) throw error;
        toast.success('AMC Plan updated successfully');
      } else {
        const { error } = await supabase
          .from('amc_plans')
          .insert(planData);

        if (error) throw error;
        toast.success('AMC Plan created successfully');
      }

      setDialogOpen(false);
      setEditingPlan(null);
      resetForm();
      fetchPlans();
    } catch (error) {
      console.error('Error saving plan:', error);
      toast.error('Failed to save AMC plan');
    }
  };

  const toggleActive = async (plan: AMCPlan) => {
    try {
      const { error } = await supabase
        .from('amc_plans')
        .update({ is_active: !plan.is_active })
        .eq('id', plan.id);

      if (error) throw error;
      
      setPlans(plans.map(p => 
        p.id === plan.id ? { ...p, is_active: !p.is_active } : p
      ));
      
      toast.success(`Plan ${plan.is_active ? 'deactivated' : 'activated'}`);
    } catch (error) {
      console.error('Error toggling plan:', error);
      toast.error('Failed to update plan');
    }
  };

  const deletePlan = async (id: string) => {
    if (!confirm('Are you sure you want to delete this AMC plan?')) return;
    
    try {
      const { error } = await supabase
        .from('amc_plans')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setPlans(plans.filter(p => p.id !== id));
      toast.success('AMC Plan deleted');
    } catch (error) {
      console.error('Error deleting plan:', error);
      toast.error('Failed to delete plan');
    }
  };

  const openEditDialog = (plan: AMCPlan) => {
    setEditingPlan(plan);
    setFormData({
      name: plan.name,
      description: plan.description || '',
      price: plan.price.toString(),
      duration_months: plan.duration_months.toString(),
      visits_included: plan.visits_included.toString(),
      priority_support: plan.priority_support,
    });
    setDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      duration_months: '12',
      visits_included: '4',
      priority_support: false,
    });
  };

  const filteredPlans = plans.filter(plan =>
    plan.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold">AMC Plans</h1>
          <p className="text-muted-foreground">Manage Annual Maintenance Contract plans</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) {
            setEditingPlan(null);
            resetForm();
          }
        }}>
          <DialogTrigger asChild>
            <Button variant="gradient">
              <Plus className="w-4 h-4 mr-2" />
              Add Plan
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{editingPlan ? 'Edit AMC Plan' : 'Add New AMC Plan'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Plan Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Basic, Pro, Enterprise"
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  placeholder="Describe the plan benefits..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Price (₹/year)</Label>
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
                  <Label htmlFor="duration">Duration (months)</Label>
                  <Input
                    id="duration"
                    type="number"
                    min="1"
                    max="120"
                    value={formData.duration_months}
                    onChange={(e) => setFormData({ ...formData, duration_months: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="visits">Visits Included</Label>
                <Input
                  id="visits"
                  type="number"
                  min="0"
                  max="365"
                  value={formData.visits_included}
                  onChange={(e) => setFormData({ ...formData, visits_included: e.target.value })}
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="priority">Priority Support</Label>
                <Switch
                  id="priority"
                  checked={formData.priority_support}
                  onCheckedChange={(checked) => setFormData({ ...formData, priority_support: checked })}
                />
              </div>
              <div className="flex gap-2 pt-4">
                <Button type="button" variant="outline" className="flex-1" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="gradient" className="flex-1">
                  {editingPlan ? 'Update' : 'Create'}
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
              placeholder="Search plans..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardContent>
      </Card>

      {/* Plans Grid */}
      {loading ? (
        <div className="text-center py-8 text-muted-foreground">Loading plans...</div>
      ) : filteredPlans.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">No AMC plans found</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className={`h-full relative overflow-hidden ${!plan.is_active ? 'opacity-60' : ''}`}>
                {plan.priority_support && (
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-accent text-accent-foreground">
                      <Star className="w-3 h-3 mr-1" />
                      Priority
                    </Badge>
                  </div>
                )}
                <CardContent className="p-6">
                  <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center mb-4">
                    <Shield className="w-7 h-7 text-primary-foreground" />
                  </div>
                  
                  <h3 className="font-display font-bold text-xl mb-2">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {plan.description || 'No description'}
                  </p>
                  
                  <div className="mb-4">
                    <span className="text-3xl font-display font-bold text-primary">
                      ₹{plan.price.toLocaleString()}
                    </span>
                    <span className="text-muted-foreground">/year</span>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-primary" />
                      <span>{plan.duration_months} months validity</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span>{plan.visits_included} service visits included</span>
                    </div>
                    {plan.priority_support && (
                      <div className="flex items-center gap-2 text-sm">
                        <Star className="w-4 h-4 text-accent" />
                        <span>Priority support included</span>
                      </div>
                    )}
                  </div>
                  
                  <Badge variant={plan.is_active ? 'default' : 'secondary'} className="mb-4">
                    {plan.is_active ? 'Active' : 'Inactive'}
                  </Badge>
                  
                  <div className="flex gap-2 pt-4 border-t">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex-1"
                      onClick={() => openEditDialog(plan)}
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex-1"
                      onClick={() => toggleActive(plan)}
                    >
                      {plan.is_active ? (
                        <ToggleRight className="w-4 h-4 text-green-600" />
                      ) : (
                        <ToggleLeft className="w-4 h-4 text-muted-foreground" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex-1 text-destructive hover:text-destructive"
                      onClick={() => deletePlan(plan.id)}
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

export default AdminAMCPlans;
