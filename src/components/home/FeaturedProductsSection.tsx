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
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">

        <div className="flex justify-between items-center mb-8">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2">
              Shop Online
            </span>

            <h2 className="text-2xl md:text-3xl font-display font-bold">
              Featured Products
            </h2>
          </div>

          <Button asChild variant="outline">
            <Link to="/products">View All</Link>
          </Button>
        </div>

        {loading && (
          <p className="text-center text-muted-foreground">
            Loading products...
          </p>
        )}

        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl overflow-hidden shadow border hover:shadow-lg transition-all"
              >
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.image || "https://via.placeholder.com/400"}
                    className="w-full h-44 object-cover"
                  />
                </Link>

                <div className="p-4">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-semibold hover:text-primary transition">
                      {product.name}
                    </h3>
                  </Link>

                  <div className="flex items-center gap-2 my-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm">
                      {product.rating || 4.5}
                    </span>
                  </div>

                  <p className="text-xl font-bold">
                    ₹{product.price}
                  </p>

                  <div className="flex gap-2 mt-3">
                    <Button
                      className="flex-1"
                      onClick={() => addToCart(product)}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>

                    <Button asChild variant="outline">
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
