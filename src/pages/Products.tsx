import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  Filter,
  Grid,
  List,
  Star,
  X,
  ArrowRight
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";

/* ======== BANNER SLIDES ======== */
const bannerSlides = [
  {
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1200",
    title: "Premium IT Products",
    subtitle: "Top quality laptops & accessories",
    text: "Genuine products with warranty support",
  },
  {
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=1200",
    title: "CCTV & Security Solutions",
    subtitle: "Protect what matters most",
    text: "Professional installation available",
  },
  {
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200",
    title: "Networking Devices",
    subtitle: "Routers, switches & more",
    text: "Enterprise and home solutions",
  },
];

const categories = [
  "all",
  "laptops",
  "desktops",
  "printers",
  "cctv",
  "networking",
  "storage",
];

export default function Products() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const [view, setView] = useState<"grid" | "list">("grid");

  const [currentSlide, setCurrentSlide] = useState(0);
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const loadProducts = async () => {
    setLoading(true);

    const { data } = await supabase.from("products").select("*");

    setProducts(data || []);
    setLoading(false);
  };

  const filtered = products.filter((p) => {
    const matchSearch = p.name
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory =
      category === "all" || p.category === category;

    return matchSearch && matchCategory;
  });

  const addToCart = (product: any) => {
    alert(product.name + " added to cart (demo)");
  };

  return (
    <div className="min-h-screen bg-black text-white">

      {/* ======= MODERN SLIDER ======= */}
      <section className="relative h-[350px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <img
              src={bannerSlides[currentSlide].image}
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-black/70 flex items-center">
              <div className="container mx-auto px-6">
                <motion.div
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                >
                  <h2 className="text-3xl md:text-4xl font-bold mb-2">
                    {bannerSlides[currentSlide].title}
                  </h2>

                  <p className="text-gray-300 mb-2">
                    {bannerSlides[currentSlide].subtitle}
                  </p>

                  <p className="text-gray-400 mb-4">
                    {bannerSlides[currentSlide].text}
                  </p>

                  <Button
                    className="bg-gradient-to-r from-blue-600 to-blue-800"
                    asChild
                  >
                    <Link to="/contact">
                      Enquire Now
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ===== SEARCH BAR ===== */}
      <section className="py-6 bg-black/50 border-b border-white/10">
        <div className="container mx-auto px-4 flex gap-3 items-center">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />

            <Input
              placeholder="Search products..."
              className="pl-10 bg-black border-white/10 text-white"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <Button
            variant="outline"
            className="lg:hidden"
            onClick={() => setShowFilter(true)}
          >
            <Filter className="w-4 h-4" />
          </Button>
        </div>
      </section>

      {/* ===== MAIN AREA ===== */}
      <section className="py-10">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-6">

          {/* ===== FILTER SIDEBAR ===== */}
          <aside
            className={`
              fixed lg:static inset-y-0 left-0 z-50 bg-black w-64 p-4 border-r border-white/10
              transform transition-all
              ${showFilter ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
            `}
          >
            <div className="flex justify-between lg:hidden mb-4">
              <h3 className="font-bold text-white">Filters</h3>
              <X
                className="text-white"
                onClick={() => setShowFilter(false)}
              />
            </div>

            <h3 className="font-semibold mb-3 text-white">
              Categories
            </h3>

            {categories.map((c) => (
              <button
                key={c}
                onClick={() => {
                  setCategory(c);
                  setShowFilter(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded mb-1 ${
                  category === c
                    ? "bg-blue-700 text-white"
                    : "hover:bg-white/10 text-gray-300"
                }`}
              >
                {c.toUpperCase()}
              </button>
            ))}
          </aside>

          {/* ===== PRODUCTS AREA ===== */}
          <div className="flex-1">

            {/* TOOLBAR */}
            <div className="flex justify-between mb-4 items-center">
              <div className="flex gap-2">
                <Button
                  size="icon"
                  onClick={() => setView("grid")}
                  variant={view === "grid" ? "default" : "outline"}
                >
                  <Grid className="w-4 h-4" />
                </Button>

                <Button
                  size="icon"
                  onClick={() => setView("list")}
                  variant={view === "list" ? "default" : "outline"}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {loading && (
              <p className="text-gray-400">Loading products...</p>
            )}

            {!loading && (
              <div
                className={
                  view === "grid"
                    ? "grid md:grid-cols-2 xl:grid-cols-3 gap-5"
                    : "space-y-4"
                }
              >
                {filtered.map((p) => (
                  <motion.div
                    key={p.id}
                    whileHover={{ scale: 1.02 }}
                    className="bg-black/60 border border-white/10 rounded-xl overflow-hidden"
                  >
                    <Link to={`/product/${p.id}`}>
                      <img
                        src={
                          p.image ||
                          "https://via.placeholder.com/400x300"
                        }
                        className="w-full h-48 object-cover"
                      />
                    </Link>

                    <div className="p-4">
                      <Link to={`/product/${p.id}`}>
                        <h3 className="font-semibold text-white hover:text-blue-400">
                          {p.name}
                        </h3>
                      </Link>

                      <div className="flex items-center gap-2 my-2">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span className="text-gray-300">
                          {p.rating || 4.5}
                        </span>
                      </div>

                      <p className="text-xl font-bold text-white">
                        ₹{p.price}
                      </p>

                      <div className="flex gap-2 mt-3">
                        <Button
                          className="flex-1 bg-gradient-to-r from-blue-600 to-blue-800"
                          onClick={() => addToCart(p)}
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Add to Cart
                        </Button>

                        <Button asChild variant="outline">
                          <Link to={`/buy-now/${p.id}`}>
                            Buy Now
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

          </div>
        </div>
      </section>

      {/* ===== TRUST SECTION ===== */}
      <section className="py-16 bg-black/40 border-t border-white/10">
        <div className="container mx-auto px-4 text-center">

          <h2 className="text-3xl font-bold mb-4">
            Why Buy From ZappTek?
          </h2>

          <p className="text-gray-400 max-w-3xl mx-auto">
            100% genuine products, professional support, warranty assistance, 
            and trusted service since years. We don’t just sell – we support you
            after purchase too.
          </p>

          <Button
            className="mt-6 bg-gradient-to-r from-blue-600 to-blue-800"
            asChild
          >
            <Link to="/contact">
              Contact For Bulk Orders
            </Link>
          </Button>

        </div>
      </section>

    </div>
  );
}
