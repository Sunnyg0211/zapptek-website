import { useState } from "react";
import { motion } from "framer-motion";
import {
  Star,
  ShoppingCart,
  Truck,
  ShieldCheck,
  RotateCcw,
  Heart,
  Tag,
  CheckCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const sampleProduct = {
  id: 1,
  name: "HP Pavilion Laptop 15 - Intel i5, 16GB RAM, 512GB SSD",
  price: 45999,
  originalPrice: 52999,
  rating: 4.5,
  reviews: 128,
  inStock: true,
  images: [
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=600&h=400&fit=crop",
  ],
  highlights: [
    "Intel Core i5 12th Gen Processor",
    "16GB DDR4 RAM",
    "512GB SSD Storage",
    "15.6 inch Full HD Display",
    "Windows 11 Home",
    "1 Year Warranty",
  ],
  offers: [
    "10% instant discount on HDFC cards",
    "No Cost EMI available",
    "Exchange offer up to ₹8,000",
  ],
};

const ProductDetails = () => {
  const [selectedImage, setSelectedImage] = useState(sampleProduct.images[0]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white p-6 rounded-2xl shadow">
          
          {/* LEFT - IMAGE SECTION */}
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="border rounded-xl overflow-hidden mb-4"
            >
              <img
                src={selectedImage}
                className="w-full h-[420px] object-contain"
              />
            </motion.div>

            <div className="flex gap-3">
              {sampleProduct.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 border rounded-lg cursor-pointer object-cover ${
                    selectedImage === img
                      ? "border-primary"
                      : "border-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* RIGHT - DETAILS SECTION */}
          <div>
            <h1 className="text-2xl font-semibold mb-3">
              {sampleProduct.name}
            </h1>

            <div className="flex items-center gap-2 mb-3">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              <span className="font-medium">{sampleProduct.rating}</span>
              <span className="text-gray-500">
                ({sampleProduct.reviews} reviews)
              </span>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl font-bold text-green-600">
                ₹{sampleProduct.price.toLocaleString()}
              </span>

              <span className="line-through text-gray-500">
                ₹{sampleProduct.originalPrice.toLocaleString()}
              </span>

              <Badge className="bg-green-100 text-green-700">
                {Math.round(
                  (1 -
                    sampleProduct.price / sampleProduct.originalPrice) *
                    100
                )}
                % OFF
              </Badge>
            </div>

            {/* Offers Section */}
            <div className="mb-4">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Tag className="w-4 h-4" /> Available Offers
              </h3>

              {sampleProduct.offers.map((offer, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-sm mb-1"
                >
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  {offer}
                </div>
              ))}
            </div>

            {/* Highlights */}
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Highlights</h3>

              <ul className="list-disc ml-5 text-gray-700 space-y-1">
                {sampleProduct.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>

            {/* Extra Info */}
            <div className="grid grid-cols-3 gap-4 mb-6 text-sm">
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-primary" />
                Free Delivery
              </div>

              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-primary" />
                1 Year Warranty
              </div>

              <div className="flex items-center gap-2">
                <RotateCcw className="w-5 h-5 text-primary" />
                7 Days Replacement
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <Button size="lg" className="flex-1">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>

              <Button size="lg" variant="outline" className="flex-1">
                <Heart className="w-5 h-5 mr-2" />
                Wishlist
              </Button>
            </div>

            {!sampleProduct.inStock && (
              <div className="mt-4 text-red-600 font-semibold">
                Out of Stock
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
