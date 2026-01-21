import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

const ProductDetails = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-black text-white">

      {/* HERO SECTION */}
      <section className="relative py-16 overflow-hidden">

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

        <div className="container mx-auto px-4 text-center">

          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Product Details
          </h1>

          <p className="text-gray-400">
            Detailed information about selected product
          </p>
        </div>
      </section>

      {/* PRODUCT DETAIL CARD */}
      <section className="py-10">
        <div className="container mx-auto px-4">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto bg-black/70 border border-white/10 rounded-2xl p-6 md:p-10 backdrop-blur-md"
          >

            <div className="flex flex-col md:flex-row gap-8">

              {/* IMAGE SECTION (DEMO PLACEHOLDER) */}
              <div className="flex-1">
                <img
                  src="https://via.placeholder.com/400x300"
                  alt="Product"
                  className="rounded-xl w-full object-cover border border-white/10"
                />
              </div>

              {/* DETAILS SECTION */}
              <div className="flex-1 space-y-4">

                <h2 className="text-2xl font-bold">
                  Product ID: {id}
                </h2>

                <p className="text-gray-400">
                  This is a demo product details page.  
                  Actual product data will be dynamically loaded based on ID.
                </p>

                <p className="text-xl font-semibold">
                  Price: ₹XXXX
                </p>

                <div className="flex gap-4 pt-4">

                  <Button className="flex-1 bg-gradient-to-r from-blue-600 to-blue-800">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>

                  <Button variant="outline" asChild>
                    <Link to="/products">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back to Products
                    </Link>
                  </Button>

                </div>

              </div>

            </div>

          </motion.div>

        </div>
      </section>

    </div>
  );
};

export default ProductDetails;
