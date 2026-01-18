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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const categories = [
  { id: "all", name: "All Products", icon: Grid },
  { id: "laptops", name: "Laptops", icon: Laptop },
  { id: "desktops", name: "Desktops", icon: Monitor },
  { id: "printers", name: "Printers", icon: Printer },
  { id: "cctv", name: "CCTV", icon: Camera },
  { id: "networking", name: "Networking", icon: Wifi },
  { id: "storage", name: "Storage", icon: HardDrive },
];

const products = Array.from({ length: 120 }).map((_, i) => ({
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

  // PAGINATION + SELECTOR STATES
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(25);

  // FILTER LOGIC
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;

    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, productsPerPage]);

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

      {/* SEARCH BAR */}
      <section className="py-6 bg-muted/20">
        <div className="container mx-auto px-4 flex flex-col md:flex-row gap-4 items-center">

          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12"
            />
          </div>

          {/* PRODUCTS PER PAGE SELECTOR */}
          <div className="flex items-center gap-2">
            <span className="text-sm">Show:</span>

            <Select
              value={String(productsPerPage)}
              onValueChange={(value) => setProductsPerPage(Number(value))}
            >
              <SelectTrigger className="w-[100px]">
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
          </div>

        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section className="py-10">
        <div className="container mx-auto px-4">

          <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-3">
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

          {/* PRODUCT GRID */}
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
            <div className="flex justify-center items-center gap-2 mt-10 flex-wrap">

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
