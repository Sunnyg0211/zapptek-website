import { useParams, Link } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Product Details Page</h1>

      <p>Product ID: {id}</p>

      <Link to="/products" className="text-primary underline mt-4 block">
        Back to Products
      </Link>
    </div>
  );
};

export default ProductDetails;
