import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Search, 
  ShoppingCart, 
  Filter,
  Grid,
  List,
  Star,
  Plus,
  Laptop,
  Printer,
  Camera,
  Wifi,
  HardDrive,
  Monitor
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const categories = [
  { id: "all", name: "All Products", icon: Grid },
  { id: "laptops", name: "Laptops", icon: Laptop },
  { id: "desktops", name: "Desktops", icon: Monitor },
  { id: "printers", name: "Printers", icon: Printer },
  { id: "cctv", name: "CCTV", icon: Camera },
  { id: "networking", name: "Networking", icon: Wifi },
  { id: "storage", name: "Storage", icon: HardDrive },
];

const products = [
  {
    id: 1,
    name: "HP Pavilion Laptop 15",
    category: "laptops",
    price: 45999,
    originalPrice: 52999,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop",
    rating: 4.5,
    reviews: 128,
    inStock: true,
  },
  {
    id: 2,
    name: "Dell OptiPlex Desktop",
    category: "desktops",
    price: 38999,
    originalPrice: 44999,
    image: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=400&h=300&fit=crop",
    rating: 4.3,
    reviews: 86,
    inStock: true,
  },
  {
    id: 3,
    name: "HP LaserJet Pro Printer",
    category: "printers",
    price: 18999,
    originalPrice: 22999,
    image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=400&h=300&fit=crop",
    rating: 4.7,
    reviews: 204,
    inStock: true,
  },
  {
    id: 4,
    name: "Hikvision 4-Channel DVR Kit",
    category: "cctv",
    price: 12999,
    originalPrice: 15999,
    image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=400&h=300&fit=crop",
    rating: 4.4,
    reviews: 156,
    inStock: true,
  },
  {
    id: 5,
    name: "TP-Link WiFi 6 Router",
    category: "networking",
    price: 4999,
    originalPrice: 5999,
    image: "https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=400&h=300&fit=crop",
    rating: 4.6,
    reviews: 312,
    inStock: true,
  },
  {
    id: 6,
    name: "WD 2TB External HDD",
    category: "storage",
    price: 5499,
    originalPrice: 6499,
    image: "https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=400&h=300&fit=crop",
    rating: 4.5,
    reviews: 445,
    inStock: false,
  },
  {
    id: 7,
    name: "Lenovo IdeaPad Slim 3",
    category: "laptops",
    price: 39999,
    originalPrice: 46999,
    image: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=400&h=300&fit=crop",
    rating: 4.2,
    reviews: 98,
    inStock: true,
  },
  {
    id: 8,
    name: "Canon PIXMA Inkjet",
    category: "printers",
    price: 8999,
    originalPrice: 10999,
    image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=400&h=300&fit=crop",
    rating: 4.1,
    reviews: 167,
    inStock: true,
  },
];

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-12 gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-4"
            >
              IT Products Store
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-primary-foreground/70 mb-6"
            >
              Quality laptops, printers, networking equipment, and accessories at competitive prices.
            </motion.p>
            
            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative max-w-md mx-auto"
            >
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 rounded-xl bg-background/90 border-0"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar - Categories */}
            <aside className="lg:w-64 flex-shrink-0">
              <div className="bg-card rounded-2xl p-6 shadow-md border border-border sticky top-24">
                <h3 className="font-display font-semibold mb-4 flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Categories
                </h3>
                <nav className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                        selectedCategory === category.id
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      <category.icon className="w-4 h-4" />
                      {category.name}
                    </button>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-muted-foreground">
                  Showing <span className="font-semibold text-foreground">{filteredProducts.length}</span> products
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Products */}
              <div className={`grid gap-6 ${
                viewMode === "grid" 
                  ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" 
                  : "grid-cols-1"
              }`}>
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className={`bg-card rounded-2xl overflow-hidden shadow-md border border-border hover:shadow-xl transition-all group ${
                      viewMode === "list" ? "flex" : ""
                    }`}
                  >
                    {/* Image */}
                    <div className={`relative overflow-hidden ${viewMode === "list" ? "w-48 flex-shrink-0" : ""}`}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className={`w-full object-cover group-hover:scale-105 transition-transform duration-300 ${
                          viewMode === "list" ? "h-full" : "h-48"
                        }`}
                      />
                      {!product.inStock && (
                        <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                          <Badge variant="secondary">Out of Stock</Badge>
                        </div>
                      )}
                      {product.originalPrice > product.price && (
                        <Badge className="absolute top-3 left-3 bg-destructive">
                          {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                        </Badge>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5 flex-1">
                      <h3 className="font-display font-semibold mb-2 group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                      
                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-accent text-accent" />
                          <span className="text-sm font-medium">{product.rating}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          ({product.reviews} reviews)
                        </span>
                      </div>

                      {/* Price */}
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-xl font-display font-bold">
                          ₹{product.price.toLocaleString()}
                        </span>
                        {product.originalPrice > product.price && (
                          <span className="text-sm text-muted-foreground line-through">
                            ₹{product.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>

                      {/* Action */}
                      <Button
                        variant="gradient"
                        className="w-full"
                        disabled={!product.inStock}
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Add to Cart
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-muted-foreground mb-4">No products found</p>
                  <Button variant="outline" onClick={() => {
                    setSelectedCategory("all");
                    setSearchQuery("");
                  }}>
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;
