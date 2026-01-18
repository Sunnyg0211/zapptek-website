import { useParams } from "react-router-dom";

const BuyNow = () => {
  const { productId } = useParams();

  return (
    <div className="p-10 text-center">
      <h1 className="text-2xl font-bold">Buy Now Page</h1>
      <p>Product ID: {productId}</p>
    </div>
  );
};

export default BuyNow;
