import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

export function FeaturedProductsSection() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const { data } = await supabase
      .from("products")
      .select("*")
      .limit(8);

    setProducts(data || []);
    setLoading(false);
  };

  const addToCart = (product: any) => {
    alert(product.name + " added to cart (demo)");
  };

  return (
    <section className="relative py-16 overflow-hidden">

      {/* Animated Black Gradient Background */}
      <motion.div
        className="absolute inset-0 -z-10"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          background:
            "linear-gradient(270deg, #000000, #0f0f0f, #1a1a1a, #050505)",
          backgroundSize: "400% 400%",
        }}
      />

      <div className="container mx-auto px-4">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white text-sm font-medium mb-2">
              Shop Online
            </span>

            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Featured Products
            </h2>
          </div>

          <Button
            asChild
            className="bg-gradient-to-r from-blue-600 to-blue-800 text-white hover:from-blue-500 hover:to-blue-700 transition-all"
          >
            <Link to="/products">View All</Link>
          </Button>
        </div>

        {/* LOADING STATE */}
        {loading && (
          <p className="text-center text-gray-400">
            Loading products...
          </p>
        )}

        {/* PRODUCTS GRID */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
                className="bg-black/60 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg border border-white/10 hover:shadow-2xl transition-all"
              >
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.image || "https://via.placeholder.com/400"}
                    className="w-full h-44 object-cover"
                    alt={product.name}
                  />
                </Link>

                <div className="p-4">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-semibold text-white hover:text-blue-400 transition">
                      {product.name}
                    </h3>
                  </Link>

                  <div className="flex items-center gap-2 my-2 text-white">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm">
                      {product.rating || 4.5}
                    </span>
                  </div>

                  <p className="text-xl font-bold text-white">
                    ₹{product.price}
                  </p>

                  <div className="flex gap-2 mt-3">
                    <Button
                      className="flex-1 bg-gradient-to-r from-blue-600 to-blue-800 text-white hover:from-blue-500 hover:to-blue-700 transition-all"
                      onClick={() => addToCart(product)}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2 text-white" />
                      Add to Cart
                    </Button>

                    <Button
                      asChild
                      className="bg-white/10 text-white hover:bg-white/20 border border-white/20"
                    >
                      <Link to={`/buy-now/${product.id}`}>
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
    </section>
  );
}
