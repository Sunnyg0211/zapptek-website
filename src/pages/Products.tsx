import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Search,
  ShoppingCart,
  Filter,
  Grid,
  List,
  Star,
  Laptop,
  Printer,
  Camera,
  Wifi,
  HardDrive,
  Monitor,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";

import BannerSlider from "@/components/BannerSlider";
import { supabase } from "@/lib/supabase";

const categories = [
  { id: "all", name: "All Products", icon: Grid },
  { id: "laptops", name: "Laptops", icon: Laptop },
  { id: "desktops", name: "Desktops", icon: Monitor },
  { id: "printers", name: "Printers", icon: Printer },
  { id: "cctv", name: "CCTV", icon: Camera },
  { id: "networking", name: "Networking", icon: Wifi },
  { id: "storage", name: "Storage", icon: HardDrive },
];

interface Product {
  id: number;
  name: string;
  price: number;
  original_price: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  in_stock: boolean;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("popular");
  const [priceRange, setPriceRange] = useState([0, 100000]);

  // Fetch products from database
  useEffect(() => {
    async function loadProducts() {
      setLoading(true);

      const { data, error } = await supabase
        .from("products")
        .select("*");

      if (!error && data) {
        setProducts(data);
      }

      setLoading(false);
    }

    loadProducts();
  }, []);

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
    <div className="min-h-screen bg-gray-100">

      {/* TOP BANNER */}
      <section className="py-4 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <BannerSlider />
        </div>
      </section>

      <section className="py-6">
        <div className="container mx-auto px-4">

          <div className="flex gap-6">

            {/* FILTER PANEL */}
            <aside className="hidden lg:block w-72 bg-white rounded-xl shadow p-5 h-fit sticky top-20">

              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Filters
              </h3>

              <Input
                placeholder="Search product..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mb-4"
              />

              <div className="mb-6">
                <h4 className="text-sm font-semibold mb-3">Categories</h4>

                {categories.map((cat) => (
                  <div
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`cursor-pointer px-3 py-2 rounded-lg mb-2 flex items-center gap-2 ${
                      selectedCategory === cat.id
                        ? "bg-primary text-white"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <cat.icon className="w-4 h-4" />
                    {cat.name}
                  </div>
                ))}
              </div>

              <div>
                <h4 className="text-sm font-semibold mb-3">Price Range</h4>

                <Slider
                  value={priceRange}
                  max={100000}
                  step={1000}
                  onValueChange={setPriceRange}
                />

                <div className="flex justify-between text-sm mt-2">
                  <span>₹{priceRange[0]}</span>
                  <span>₹{priceRange[1]}</span>
                </div>
              </div>
            </aside>

            {/* PRODUCT AREA */}
            <div className="flex-1">

              <div className="bg-white rounded-xl shadow p-4 mb-5 flex justify-between items-center">

                <span className="text-sm text-muted-foreground">
                  Showing {filteredProducts.length} products
                </span>

                <div className="flex items-center gap-4">

                  <select
                    className="border rounded p-2 text-sm"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="popular">Sort by Popular</option>
                    <option value="low">Price: Low to High</option>
                    <option value="high">Price: High to Low</option>
                    <option value="rating">Customer Rating</option>
                  </select>

                  <Button
                    size="icon"
                    variant={viewMode === "grid" ? "default" : "outline"}
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="w-4 h-4" />
                  </Button>

                  <Button
                    size="icon"
                    variant={viewMode === "list" ? "default" : "outline"}
                    onClick={() => setViewMode("list")}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {loading ? (
                <div className="text-center py-20">Loading products...</div>
              ) : (
                <div
                  className={`grid gap-5 ${
                    viewMode === "grid"
                      ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                      : "grid-cols-1"
                  }`}
                >
                  {filteredProducts.map((product) => (
                    <motion.div
                      key={product.id}
                      whileHover={{ y: -5 }}
                      className="bg-white rounded-xl shadow border overflow-hidden group"
                    >
                      <div className="relative">
                        <img
                          src={product.image}
                          className="w-full h-48 object-cover"
                        />

                        {product.original_price > product.price && (
                          <Badge className="absolute top-2 left-2 bg-green-600">
                            {Math.round(
                              (1 -
                                product.price /
                                  product.original_price) *
                                100
                            )}
                            % OFF
                          </Badge>
                        )}

                        {!product.in_stock && (
                          <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                            <Badge variant="destructive">
                              Out of Stock
                            </Badge>
                          </div>
                        )}
                      </div>

                      <div className="p-4">
                        <h3 className="font-semibold mb-2 group-hover:text-primary">
                          {product.name}
                        </h3>

                        <div className="flex items-center gap-1 mb-2">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          {product.rating}

                          <span className="text-xs text-muted-foreground">
                            ({product.reviews})
                          </span>
                        </div>

                        <div className="flex gap-2 items-center mb-3">
                          <span className="text-lg font-bold">
                            ₹{product.price.toLocaleString()}
                          </span>

                          {product.original_price >
                            product.price && (
                            <span className="line-through text-sm text-gray-500">
                              ₹
                              {product.original_price.toLocaleString()}
                            </span>
                          )}
                        </div>

                        <Button
                          className="w-full"
                          disabled={!product.in_stock}
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Add to Cart
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {!loading && filteredProducts.length === 0 && (
                <div className="text-center py-20 bg-white rounded-xl shadow">
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
