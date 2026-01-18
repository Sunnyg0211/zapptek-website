import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
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

const bannerSlides = [
  {
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1200&h=400&fit=crop",
    title: "Latest Gaming Laptops",
    subtitle: "Powerful performance for work & play",
    price: "Starting at ₹45,999",
    buttonText: "Buy Now",
    productId: 1
  },
  {
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=1200&h=400&fit=crop",
    title: "Office Printers Sale",
    subtitle: "High speed & quality printing",
    price: "Up to 30% OFF",
    buttonText: "Buy Now",
    productId: 3
  }
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

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">

      {/* ====== BANNER SLIDER SECTION ====== */}
      <section className="w-full overflow-hidden">
        <div className="relative h-[350px] md:h-[400px]">

          {bannerSlides.map((slide, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: index === currentSlide ? 1 : 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0"
            >
              <div className="relative h-full w-full">
                <img
                  src={slide.image}
                  className="w-full h-full object-cover"
                  alt={slide.title}
                />

                <div className="absolute inset-0 bg-black/50 flex items-center">
                  <div className="container mx-auto px-6">
                    <div className="max-w-xl text-white">
                      <h2 className="text-3xl md:text-4xl font-bold mb-3">
                        {slide.title}
                      </h2>

                      <p className="mb-2 text-lg text-white/80">
                        {slide.subtitle}
                      </p>

                      <p className="text-xl font-semibold mb-4">
                        {slide.price}
                      </p>

                      <Button asChild variant="gradient">
                        <Link to={slide.link}>{slide.buttonText}</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {bannerSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-2 rounded-full transition-all ${
                  currentSlide === i
                    ? "bg-white w-6"
                    : "bg-white/50 w-2"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* HERO SEARCH SECTION */}
      <section className="py-10 gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            IT Products Store
          </h1>

          <p className="text-primary-foreground/70 mb-6">
            Quality laptops, printers, networking equipment, and accessories at competitive prices.
          </p>

          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 rounded-xl"
            />
          </div>
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">

            {/* Sidebar */}
            <aside className="lg:w-64">
              <div className="bg-card rounded-2xl p-6 shadow-md border border-border sticky top-24">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Categories
                </h3>

                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all ${
                      selectedCategory === category.id
                        ? "bg-primary text-white"
                        : "hover:bg-muted"
                    }`}
                  >
                    <category.icon className="w-4 h-4" />
                    {category.name}
                  </button>
                ))}
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">

              <div className="flex justify-between mb-6">
                <p>
                  Showing {filteredProducts.length} products
                </p>

                <div className="flex gap-2">
                  <Button
                    size="icon"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="w-4 h-4" />
                  </Button>

                  <Button
                    size="icon"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-card rounded-2xl overflow-hidden shadow border"
                  >
                    <img
                      src={product.image}
                      className="w-full h-48 object-cover"
                    />

                    <div className="p-5">
                      <h3 className="font-semibold mb-2">
                        {product.name}
                      </h3>

                      <div className="mb-2">
                        ₹{product.price.toLocaleString()}
                      </div>

                      <Button className="w-full">
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;
