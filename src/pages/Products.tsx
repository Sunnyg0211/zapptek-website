import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import {
  Search,
  ShoppingCart,
  Filter,
  Grid,
  List,
  Star,
  ArrowDownUp,
  ChevronLeft,
  ChevronRight,
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

const banners = [
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=350&fit=crop",
  "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?w=1200&h=350&fit=crop",
  "https://images.unsplash.com/photo-1555617117-08c9b8ec3c38?w=1200&h=350&fit=crop"
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
    id: 6,
    name: "WD 2TB External HDD",
    category: "storage",
    price: 5499,
    originalPrice: 6499,
    image: "https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=400&h=300&fit=crop",
    rating: 4.5,
    reviews: 445,
    inStock: false,
  }
];

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("default");
  const [bannerIndex, setBannerIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % banners.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  let filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;

    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  if (sortBy === "low-high") {
    filteredProducts.sort((a, b) => a.price - b.price);
  }

  if (sortBy === "high-low") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  if (sortBy === "rating") {
    filteredProducts.sort((a, b) => b.rating - a.rating);
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Banner Slider */}
      <section className="relative mb-6">
        <img
          src={banners[bannerIndex]}
          className="w-full h-[280px] object-cover"
        />

        <button
          onClick={() =>
            setBannerIndex(
              bannerIndex === 0 ? banners.length - 1 : bannerIndex - 1
            )
          }
          className="absolute left-2 top-1/2 bg-white p-2 rounded-full"
        >
          <ChevronLeft />
        </button>

        <button
          onClick={() =>
            setBannerIndex((bannerIndex + 1) % banners.length)
          }
          className="absolute right-2 top-1/2 bg-white p-2 rounded-full"
        >
          <ChevronRight />
        </button>
      </section>

      <div className="container mx-auto px-4">

        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between bg-white p-4 rounded-xl shadow mb-4 gap-3">

          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-xs"
          />

          <select
            className="border rounded p-2"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="default">Sort By</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>

          <div className="flex gap-2">
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

        <div className="flex flex-col lg:flex-row gap-6">

          {/* Sidebar */}
          <aside className="lg:w-64 bg-white rounded-xl shadow p-4">
            <h3 className="font-semibold mb-4 flex gap-2">
              <Filter className="w-5 h-5" /> Categories
            </h3>

            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`flex items-center gap-2 w-full p-2 rounded mb-2 ${
                  selectedCategory === c.id
                    ? "bg-primary text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                <c.icon className="w-4 h-4" />
                {c.name}
              </button>
            ))}
          </aside>

          {/* Products */}
          <div className="flex-1">
            <div
              className={`grid gap-4 ${
                viewMode === "grid"
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1"
              }`}
            >
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl shadow overflow-hidden"
                >
                  <img
                    src={product.image}
                    className="w-full h-48 object-cover"
                  />

                  <div className="p-4">
                    <h3 className="font-semibold">{product.name}</h3>

                    <div className="flex items-center gap-2 mt-2">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      {product.rating}
                    </div>

                    <div className="mt-2">
                      <span className="font-bold text-lg">
                        ₹{product.price}
                      </span>

                      {product.originalPrice > product.price && (
                        <span className="ml-2 text-sm line-through text-gray-500">
                          ₹{product.originalPrice}
                        </span>
                      )}
                    </div>

                    {!product.inStock && (
                      <Badge className="mt-2">Out of Stock</Badge>
                    )}

                    <Button
                      className="w-full mt-3"
                      disabled={!product.inStock}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center p-10 bg-white rounded-xl mt-4">
                No products found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
