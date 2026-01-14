import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Package,
  Search,
  Plus,
  Edit2,
  Trash2,
  ToggleLeft,
  ToggleRight,
  Image as ImageIcon,
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
import { parsePrice, parseQuantity } from '@/lib/validation';

interface Product {
  id: string;
  name: string;
  description: string | null;
  category: string;
  price: number;
  stock_quantity: number | null;
  image_url: string | null;
  is_active: boolean;
  created_at: string;
}

const categories = [
  'Laptops',
  'Desktops',
  'Printers',
  'Networking',
  'CCTV',
  'Accessories',
  'Software',
  'Other',
];

const AdminProducts = () => {
  useRequireAuth('admin');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    stock_quantity: '',
    image_url: '',
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Validate numeric inputs
      let price: number;
      let stockQty: number;
      
      try {
        price = parsePrice(formData.price, 'Price');
      } catch (err) {
        toast.error(err instanceof Error ? err.message : 'Invalid price');
        return;
      }
      
      try {
        stockQty = formData.stock_quantity ? parseQuantity(formData.stock_quantity, 'Stock quantity') : 0;
      } catch (err) {
        toast.error(err instanceof Error ? err.message : 'Invalid stock quantity');
        return;
      }

      const productData = {
        name: formData.name.trim(),
        description: formData.description?.trim() || null,
        category: formData.category,
        price,
        stock_quantity: stockQty,
        image_url: formData.image_url?.trim() || null,
      };

      if (editingProduct) {
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', editingProduct.id);

        if (error) throw error;
        toast.success('Product updated successfully');
      } else {
        const { error } = await supabase
          .from('products')
          .insert(productData);

        if (error) throw error;
        toast.success('Product created successfully');
      }

      setDialogOpen(false);
      setEditingProduct(null);
      resetForm();
      fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error('Failed to save product');
    }
  };

  const toggleActive = async (product: Product) => {
    try {
      const { error } = await supabase
        .from('products')
        .update({ is_active: !product.is_active })
        .eq('id', product.id);

      if (error) throw error;
      
      setProducts(products.map(p => 
        p.id === product.id ? { ...p, is_active: !p.is_active } : p
      ));
      
      toast.success(`Product ${product.is_active ? 'hidden' : 'visible'}`);
    } catch (error) {
      console.error('Error toggling product:', error);
      toast.error('Failed to update product');
    }
  };

  const deleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setProducts(products.filter(p => p.id !== id));
      toast.success('Product deleted');
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
    }
  };

  const openEditDialog = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description || '',
      category: product.category,
      price: product.price.toString(),
      stock_quantity: product.stock_quantity?.toString() || '',
      image_url: product.image_url || '',
    });
    setDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      category: '',
      price: '',
      stock_quantity: '',
      image_url: '',
    });
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold">Products</h1>
          <p className="text-muted-foreground">Manage product inventory and pricing</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) {
            setEditingProduct(null);
            resetForm();
          }
        }}>
          <DialogTrigger asChild>
            <Button variant="gradient">
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Product Name</Label>
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
                  <Label htmlFor="stock">Stock Quantity</Label>
                  <Input
                    id="stock"
                    type="number"
                    min="0"
                    max="999999"
                    value={formData.stock_quantity}
                    onChange={(e) => setFormData({ ...formData, stock_quantity: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  placeholder="https://..."
                />
              </div>
              <div className="flex gap-2 pt-4">
                <Button type="button" variant="outline" className="flex-1" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="gradient" className="flex-1">
                  {editingProduct ? 'Update' : 'Create'}
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
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardContent>
      </Card>

      {/* Products Grid */}
      {loading ? (
        <div className="text-center py-8 text-muted-foreground">Loading products...</div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">No products found</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className={`h-full ${!product.is_active ? 'opacity-60' : ''}`}>
                <CardContent className="p-0">
                  {/* Image */}
                  <div className="aspect-square bg-muted/50 rounded-t-lg flex items-center justify-center overflow-hidden">
                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <ImageIcon className="w-12 h-12 text-muted-foreground/50" />
                    )}
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="outline" className="text-xs">{product.category}</Badge>
                      <Badge variant={product.is_active ? 'default' : 'secondary'} className="text-xs">
                        {product.is_active ? 'Active' : 'Hidden'}
                      </Badge>
                    </div>
                    <h3 className="font-semibold mb-1 line-clamp-1">{product.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {product.description || 'No description'}
                    </p>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-lg font-bold text-primary">₹{product.price.toLocaleString()}</span>
                      <span className="text-sm text-muted-foreground">
                        Stock: {product.stock_quantity ?? 0}
                      </span>
                    </div>
                    <div className="flex gap-2 pt-3 border-t">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex-1"
                        onClick={() => openEditDialog(product)}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex-1"
                        onClick={() => toggleActive(product)}
                      >
                        {product.is_active ? (
                          <ToggleRight className="w-4 h-4 text-green-600" />
                        ) : (
                          <ToggleLeft className="w-4 h-4 text-muted-foreground" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex-1 text-destructive hover:text-destructive"
                        onClick={() => deleteProduct(product.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
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
};

export default AdminProducts;
