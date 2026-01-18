import { useParams, Link } from "react-router-dom";
import { Star, ShoppingCart, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

// Normally this will come from database
import products from "../data/products";   // or wherever your product array exists

const ProductDetails = () => {
  const { id } = useParams();

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return <div className="p-10 text-center">Product Not Found</div>;
  }

  // Related products
  const relatedProducts = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  return (
    <div className="min-h-screen bg-background py-10">
      <div className="container mx-auto px-4">

        <Link to="/products">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Products
          </Button>
        </Link>

        <div className="grid md:grid-cols-2 gap-10 bg-card p-6 rounded-2xl shadow">

          <img
            src={product.image}
            className="w-full rounded-xl"
          />

          <div>
            <h1 className="text-2xl font-bold mb-2">{product.name}</h1>

            <div className="flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              {product.rating} ({product.reviews} reviews)
            </div>

            <div className="text-2xl font-bold mb-4">
              ₹{product.price.toLocaleString()}
            </div>

            <div className="flex gap-4">
              <Button className="flex-1">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>

              <Link to={`/buy-now/${product.id}`} className="flex-1">
                <Button variant="gradient" className="w-full">
                  Buy Now
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* RELATED PRODUCTS SECTION */}

        <div className="mt-12">
          <h2 className="text-xl font-bold mb-6">Related Products</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {relatedProducts.map((item) => (
              <div
                key={item.id}
                className="bg-card p-4 rounded-xl shadow"
              >
                <Link to={`/product/${item.id}`}>
                  <img
                    src={item.image}
                    className="rounded-lg mb-2"
                  />

                  <h3 className="font-semibold hover:text-primary">
                    {item.name}
                  </h3>
                </Link>

                <div className="mt-2">
                  ₹{item.price.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetails;
