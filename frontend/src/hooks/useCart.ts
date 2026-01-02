import axios from "axios";
import { useAuth } from "@/contexts/AuthContext";

export const useCart = () => {
  const { token } = useAuth();

  const addToCart = async (productId: number, quantity = 1) => {
    try {
      await axios.post(
        "http://localhost:4000/cart/add",
        { productId, quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Added to cart!");
    } catch (err: any) {
      alert(err.response?.data?.error || "Failed to add to cart");
    }
  };

  return { addToCart };
};
