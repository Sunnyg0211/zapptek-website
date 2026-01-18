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
  Heart,
  SlidersHorizontal,
  ArrowUpDown,
  Laptop,
  Printer,
  Camera,
  Wifi,
  HardDrive,
  Monitor,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";

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
];

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("popular");
  const [priceRange, setPriceRange] = useState([0, 60000]);
  const [showFilters, setShowFilters] = useState(false);

  let filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;

    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1];

    return matchesCategory && matchesSearch && matchesPrice;
  });

  if (sortBy === "low") {
    filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
  }

  if (sortBy === "high") {
    filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
  }

  if (sortBy === "rating") {
    filteredProducts = filteredProducts.sort((a, b) => b.rating - a.rating);
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="py-8 gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">
            ZappTek Product Store
          </h1>

          <div className="max-w-lg mx-auto relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />

            <Input
              className="pl-10 h-12"
              placeholder="Search laptops, printers, CCTV..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="flex gap-6">
            {/* Sidebar */}
            <aside className="hidden lg:block w-72">
              <div className="bg-card p-6 rounded-2xl shadow">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Filters
                </h3>

                <div className="mb-6">
                  <h4 className="text-sm font-medium mb-3">Categories</h4>

                  {categories.map((cat) => (
                    <div
                      key={cat.id}
                      className={`p-2 cursor-pointer rounded-lg mb-2 flex items-center gap-2 ${
                        selectedCategory === cat.id
                          ? "bg-primary text-white"
                          : "hover:bg-muted"
                      }`}
                      onClick={() => setSelectedCategory(cat.id)}
                    >
                      <cat.icon className="w-4 h-4" />
                      {cat.name}
                    </div>
                  ))}
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-3">Price Range</h4>

                  <Slider
                    value={priceRange}
                    max={60000}
                    step={1000}
                    onValueChange={setPriceRange}
                  />

                  <div className="flex justify-between text-sm mt-2">
                    <span>₹{priceRange[0]}</span>
                    <span>₹{priceRange[1]}</span>
                  </div>
                </div>
              </div>
            </aside>

            {/* Main */}
            <div className="flex-1">
              <div className="flex flex-wrap gap-4 justify-between mb-6">
                <div className="flex gap-2 flex-wrap">
                  {categories.map((c) => (
                    <Badge
                      key={c.id}
                      className="cursor-pointer"
                      variant={
                        selectedCategory === c.id ? "default" : "secondary"
                      }
                      onClick={() => setSelectedCategory(c.id)}
                    >
                      {c.name}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-3">
                  <select
                    className="border p-2 rounded"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="popular">Popular</option>
                    <option value="low">Price: Low to High</option>
                    <option value="high">Price: High to Low</option>
                    <option value="rating">Rating</option>
                  </select>

                  <Button
                    size="icon"
                    onClick={() => setViewMode("grid")}
                    variant={viewMode === "grid" ? "default" : "outline"}
                  >
                    <Grid className="w-4 h-4" />
                  </Button>

                  <Button
                    size="icon"
                    onClick={() => setViewMode("list")}
                    variant={viewMode === "list" ? "default" : "outline"}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div
                className={`grid gap-6 ${
                  viewMode === "grid"
                    ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                    : "grid-cols-1"
                }`}
              >
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    whileHover={{ scale: 1.02 }}
                    className="bg-card rounded-xl shadow border overflow-hidden group"
                  >
                    <div className="relative">
                      <img
                        src={product.image}
                        className="w-full h-48 object-cover"
                      />

                      {product.originalPrice > product.price && (
                        <Badge className="absolute top-2 left-2 bg-green-600">
                          {Math.round(
                            (1 - product.price / product.originalPrice) * 100
                          )}
                          % OFF
                        </Badge>
                      )}

                      <div className="absolute top-2 right-2">
                        <Heart className="w-5 h-5 text-white" />
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="font-semibold mb-2">{product.name}</h3>

                      <div className="flex items-center gap-1 mb-2">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        {product.rating}
                        <span className="text-xs text-muted-foreground">
                          ({product.reviews})
                        </span>
                      </div>

                      <div className="flex gap-2 items-center mb-3">
                        <span className="text-xl font-bold">
                          ₹{product.price}
                        </span>

                        {product.originalPrice > product.price && (
                          <span className="line-through text-sm text-muted-foreground">
                            ₹{product.originalPrice}
                          </span>
                        )}
                      </div>

                      <Button className="w-full">
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-20">
                  <p className="mb-4">No products found</p>
                  <Button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("all");
                    }}
                  >
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
