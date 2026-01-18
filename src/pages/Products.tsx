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
  ChevronLeft,
  ChevronRight
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

const products = Array.from({ length: 60 }).map((_, i) => ({
  id: i + 1,
  name: `Demo Product ${i + 1}`,
  category: i % 2 === 0 ? "laptops" : "printers",
  price: 10000 + i * 200,
  originalPrice: 12000 + i * 200,
  image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop",
  rating: 4.3,
  reviews: 50 + i,
  inStock: true,
}));

const Products = () => {
  const { toast } = useToast();

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentSlide, setCurrentSlide] = useState(0);

  // PAGINATION STATES
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 25;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // FILTER LOGIC
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // RESET PAGE WHEN FILTER CHANGES
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  // PAGINATION CALCULATIONS
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;

  const currentProducts = filteredProducts.slice(
    indexOfFirst,
    indexOfLast
  );

  const handleAddToCart = (product: any) => {
    toast({
      title: "Added to Cart",
      description: `${product.name} added successfully`,
    });
  };

  const changePage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">

      {/* Search Bar */}
      <section className="py-6 bg-muted/20">
        <div className="container mx-auto px-4 flex gap-4 items-center">

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden">
                <Filter className="w-5 h-5" />
              </Button>
            </SheetTrigger>

            <SheetContent side="left">
              <h3 className="font-semibold mb-4">Categories</h3>

              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className="block w-full text-left p-2 hover:bg-muted rounded"
                >
                  {category.name}
                </button>
              ))}
            </SheetContent>
          </Sheet>

          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" />
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

          <div className="flex justify-between mb-4">
            <p>
              Showing {currentProducts.length} of {filteredProducts.length} products
            </p>

            <div className="flex gap-2">
              <Button size="icon" onClick={() => setViewMode("grid")}>
                <Grid className="w-4 h-4" />
              </Button>

              <Button size="icon" onClick={() => setViewMode("list")}>
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {currentProducts.map((product) => (
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

          {/* PAGINATION CONTROLS */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-10">

              <Button
                variant="outline"
                disabled={currentPage === 1}
                onClick={() => changePage(currentPage - 1)}
              >
                <ChevronLeft className="w-4 h-4" />
                Prev
              </Button>

              {Array.from({ length: totalPages }).map((_, index) => (
                <Button
                  key={index}
                  variant={currentPage === index + 1 ? "default" : "outline"}
                  onClick={() => changePage(index + 1)}
                  className="hidden sm:inline-flex"
                >
                  {index + 1}
                </Button>
              ))}

              <Button
                variant="outline"
                disabled={currentPage === totalPages}
                onClick={() => changePage(currentPage + 1)}
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}

        </div>
      </section>
    </div>
  );
};

export default Products;
