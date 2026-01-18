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
  Monitor,
  X
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";

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
    productId: 1,
  },
  {
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=1200&h=400&fit=crop",
    title: "Office Printers Sale",
    subtitle: "High speed & quality printing",
    price: "Up to 30% OFF",
    productId: 3,
  },
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
  const { toast } = useToast();

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
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (product: any) => {
    toast({
      title: "Added to Cart",
      description: `${product.name} added successfully`,
    });
  };

  const FilterContent = ({ onSelect }: { onSelect?: () => void }) => (
    <div>
      <h3 className="font-semibold mb-4 flex items-center gap-2">
        <Filter className="w-5 h-5" />
        Categories
      </h3>

      <nav className="space-y-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => {
              setSelectedCategory(category.id);
              onSelect && onSelect();
            }}
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
      </nav>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">

      {/* Banner Slider */}
      <section className="w-full overflow-hidden">
        <div className="relative h-[300px] md:h-[380px]">
          {bannerSlides.map((slide, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: index === currentSlide ? 1 : 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0"
            >
              <img
                src={slide.image}
                className="w-full h-full object-cover"
                alt="banner"
              />

              <div className="absolute inset-0 bg-black/50 flex items-center px-6">
                <div className="text-white max-w-lg">
                  <h2 className="text-2xl md:text-3xl font-bold mb-2">
                    {slide.title}
                  </h2>

                  <p className="mb-2 text-white/80">{slide.subtitle}</p>

                  <p className="text-lg font-semibold mb-3">{slide.price}</p>

                  <Button asChild>
                    <Link to={`/buy-now/${slide.productId}`}>Buy Now</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Search & Mobile Filter Bar */}
      <section className="py-6 bg-muted/20">
        <div className="container mx-auto px-4 flex gap-4 items-center">

          {/* Mobile Filter Drawer */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Filter className="w-5 h-5" />
                </Button>
              </SheetTrigger>

              <SheetContent side="left">
                <FilterContent />
              </SheetContent>
            </Sheet>
          </div>

          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12"
            />
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="flex gap-6">

            {/* Desktop Filter */}
            <aside className="hidden lg:block w-64 bg-card border rounded-xl p-4 h-fit sticky top-24">
              <FilterContent />
            </aside>

            {/* Products Grid */}
            <div className="flex-1">

              <div className="flex justify-between mb-4">
                <p>Showing {filteredProducts.length} products</p>

                <div className="flex gap-2">
                  <Button size="icon" onClick={() => setViewMode("grid")}>
                    <Grid className="w-4 h-4" />
                  </Button>

                  <Button size="icon" onClick={() => setViewMode("list")}>
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-card border rounded-xl overflow-hidden hover:shadow-lg transition"
                  >
                    <Link to={`/buy-now/${product.id}`}>
                      <img
                        src={product.image}
                        className="w-full h-44 object-cover"
                      />
                    </Link>

                    <div className="p-4">
                      <Link to={`/buy-now/${product.id}`}>
                        <h3 className="font-semibold hover:text-primary">
                          {product.name}
                        </h3>
                      </Link>

                      <div className="flex items-center gap-2 my-2">
                        <Star className="w-4 h-4 fill-accent text-accent" />
                        {product.rating}
                        <span className="text-muted-foreground">
                          ({product.reviews})
                        </span>
                      </div>

                      <p className="font-bold mb-3">
                        ₹{product.price.toLocaleString()}
                      </p>

                      <Button
                        className="w-full"
                        onClick={() => handleAddToCart(product)}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-10">
                  No products found
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
