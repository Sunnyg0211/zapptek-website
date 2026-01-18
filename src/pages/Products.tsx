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
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";

const bannerSlides = [
  {
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1200&h=400&fit=crop",
    title: "Latest IT Products",
    subtitle: "Best deals on laptops & accessories",
    price: "Starting at ₹9,999",
    link: "/products"
  },
  {
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=1200&h=400&fit=crop",
    title: "Printers & CCTV",
    subtitle: "Home and office solutions",
    price: "Up to 30% OFF",
    link: "/products"
  }
];

const categories = [
  "all",
  "laptops",
  "desktops",
  "printers",
  "cctv",
  "networking",
  "storage"
];

export default function Products() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const [view, setView] = useState<"grid" | "list">("grid");

  const [currentSlide, setCurrentSlide] = useState(0);

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(25);

  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const loadProducts = async () => {
    setLoading(true);

    const { data } = await supabase
      .from("products")
      .select("*");

    setProducts(data || []);
    setLoading(false);
  };

  const filtered = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === "all" || p.category === category;
    return matchSearch && matchCategory;
  });

  const totalPages = Math.ceil(filtered.length / perPage);

  const start = (page - 1) * perPage;
  const end = start + perPage;

  const paginated = filtered.slice(start, end);

  const addToCart = (product: any) => {
    alert(product.name + " added to cart (demo)");
  };

  return (
    <div className="min-h-screen bg-background">

      {/* ======= BANNER SLIDER ======= */}
      <section className="w-full overflow-hidden">
        <div className="relative h-[300px] md:h-[380px]">
          {bannerSlides.map((slide, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: i === currentSlide ? 1 : 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0"
            >
              <img
                src={slide.image}
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-black/50 flex items-center">
                <div className="container mx-auto px-6 text-white">
                  <h2 className="text-3xl font-bold">{slide.title}</h2>
                  <p className="mt-2 text-white/80">{slide.subtitle}</p>
                  <p className="mt-2 text-xl font-semibold">{slide.price}</p>

                  <Button asChild className="mt-4">
                    <Link to={slide.link}>Shop Now</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ====== SEARCH ====== */}
      <section className="py-6 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="flex gap-3 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-4 h-4" />
              <Input
                placeholder="Search products..."
                className="pl-10"
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
        </div>
      </section>

      <section className="py-6">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-6">

          {/* ===== FILTER SIDEBAR ===== */}
          <aside
            className={`
            fixed lg:static inset-y-0 left-0 z-50 bg-white w-64 p-4 border-r
            transform transition-all
            ${showFilter ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          `}
          >
            <div className="flex justify-between lg:hidden mb-4">
              <h3 className="font-bold">Filters</h3>
              <X onClick={() => setShowFilter(false)} />
            </div>

            <h3 className="font-semibold mb-2">Category</h3>

            {categories.map((c) => (
              <button
                key={c}
                onClick={() => {
                  setCategory(c);
                  setShowFilter(false);
                  setPage(1);
                }}
                className={`block w-full text-left px-3 py-2 rounded mb-1 ${
                  category === c ? "bg-primary text-white" : "hover:bg-muted"
                }`}
              >
                {c.toUpperCase()}
              </button>
            ))}
          </aside>

          {/* ===== PRODUCTS ===== */}
          <div className="flex-1">

            {/* Toolbar */}
            <div className="flex justify-between mb-4 items-center flex-wrap gap-2">

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

              <select
                className="border rounded p-2"
                value={perPage}
                onChange={(e) => {
                  setPerPage(Number(e.target.value));
                  setPage(1);
                }}
              >
                <option value={25}>Show 25</option>
                <option value={50}>Show 50</option>
                <option value={100}>Show 100</option>
              </select>

            </div>

            {loading && <p>Loading products...</p>}

            {!loading && (
              <div
                className={
                  view === "grid"
                    ? "grid md:grid-cols-2 xl:grid-cols-3 gap-5"
                    : "space-y-4"
                }
              >
                {paginated.map((p) => (
                  <div
                    key={p.id}
                    className={`border rounded-lg overflow-hidden bg-white shadow ${
                      view === "list" ? "flex" : ""
                    }`}
                  >
                    <Link to={`/product/${p.id}`}>
                      <img
                        src={p.image || "https://via.placeholder.com/300"}
                        className={
                          view === "list"
                            ? "w-40 h-full object-cover"
                            : "w-full h-48 object-cover"
                        }
                      />
                    </Link>

                    <div className="p-4 flex-1">
                      <Link to={`/product/${p.id}`}>
                        <h3 className="font-semibold hover:text-primary">
                          {p.name}
                        </h3>
                      </Link>

                      <div className="flex items-center gap-2 my-2">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span>{p.rating || 4.5}</span>
                      </div>

                      <p className="text-xl font-bold">₹{p.price}</p>

                      <div className="flex gap-2 mt-3">
                        <Button
                          className="flex-1"
                          onClick={() => addToCart(p)}
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Add to Cart
                        </Button>

                        <Button asChild variant="outline">
                          <Link to={`/buy-now/${p.id}`}>Buy Now</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ===== PAGINATION ===== */}
            <div className="flex justify-center gap-2 mt-6 flex-wrap">

              <Button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                Previous
              </Button>

              {Array.from({ length: totalPages }).map((_, i) => (
                <Button
                  key={i}
                  variant={page === i + 1 ? "default" : "outline"}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </Button>
              ))}

              <Button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
              >
                Next
              </Button>

            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
