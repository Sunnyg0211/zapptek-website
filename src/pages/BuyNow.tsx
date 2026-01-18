import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, ShoppingCart, ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

// TEMP DATA – later you will connect this with your database
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
    description:
      "Powerful HP Pavilion laptop with latest processor, 8GB RAM, SSD storage and long battery life. Ideal for work and home use.",
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
    description:
      "Reliable Dell desktop for office and business use with powerful performance and upgrade options.",
  },
];

const BuyNow = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const product = products.find(
    (p) => p.id.toString() === productId
  );

  if (!product) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-2xl font-bold">Product Not Found</h2>
        <Link to="/products">
          <Button className="mt-4">Back to Products</Button>
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart`,
    });
  };

  const handleBuyNow = () => {
    toast({
      title: "Redirecting to Checkout",
      description: "Proceeding to checkout page",
    });

    // You can replace this with your real checkout route
    navigate("/dashboard/orders");
  };

  const relatedProducts = products.filter(
    (p) => p.id !== product.id
  );

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-muted-foreground mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-card p-6 rounded-2xl shadow-lg border border-border"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full rounded-xl"
            />
          </motion.div>

          {/* Details Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <h1 className="text-3xl font-bold">{product.name}</h1>

            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 fill-accent text-accent" />
              <span>{product.rating}</span>
              <span className="text-muted-foreground">
                ({product.reviews} reviews)
              </span>
            </div>

            <p className="text-muted-foreground">
              {product.description}
            </p>

            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold">
                ₹{product.price.toLocaleString()}
              </span>

              {product.originalPrice > product.price && (
                <span className="line-through text-muted-foreground">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              )}

              {product.originalPrice > product.price && (
                <Badge variant="destructive">
                  {Math.round(
                    (1 - product.price / product.originalPrice) * 100
                  )}
                  % OFF
                </Badge>
              )}
            </div>

            <div className="flex items-center gap-2 text-sm">
              {product.inStock ? (
                <>
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-green-600 font-semibold">
                    In Stock
                  </span>
                </>
              ) : (
                <Badge variant="secondary">Out of Stock</Badge>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                className="flex-1"
                variant="gradient"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </Button>

              <Button
                size="lg"
                className="flex-1"
                onClick={handleBuyNow}
                disabled={!product.inStock}
              >
                Buy Now
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">
            Related Products
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProducts.map((item) => (
              <Link
                key={item.id}
                to={`/buy-now/${item.id}`}
                className="bg-card border border-border rounded-xl p-4 hover:shadow-lg transition"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-40 object-cover rounded-lg mb-3"
                />
                <h3 className="font-semibold">{item.name}</h3>
                <p className="font-bold mt-1">
                  ₹{item.price.toLocaleString()}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyNow;
