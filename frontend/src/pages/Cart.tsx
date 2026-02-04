import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { API_URL } from "../config/api";

interface CartItem {
  id: number;
  quantity: number;
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
  };
}

const Cart = () => {
  const navigate = useNavigate();
  const { token } = useAuth();

  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  // ===============================
  // LOAD CART
  // ===============================
  const loadCart = async () => {
    if (!token) return;

    try {
      const res = await fetch(`${API_URL}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        setItems([]);
        return;
      }

      const data = await res.json();
      setItems(data);
    } catch (err) {
      console.error("Failed to load cart:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, [token]);

  // ===============================
  // CART ACTIONS
  // ===============================
  const increaseQty = async (id: number) => {
    if (!token) return;
    await fetch(`${API_URL}/cart/increase/${id}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
    loadCart();
  };

  const decreaseQty = async (id: number) => {
    if (!token) return;
    await fetch(`${API_URL}/cart/decrease/${id}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
    loadCart();
  };

  const removeItem = async (id: number) => {
    if (!token) return;
    await fetch(`${API_URL}/cart/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    loadCart();
  };

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <Layout>
      <div className="pt-40 px-4 sm:px-6 max-w-5xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold mb-10 text-center bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          Your Cart
        </h1>

        {loading ? (
          <p className="text-center text-muted-foreground">Loading...</p>
        ) : items.length === 0 ? (
          <p className="text-center text-xl text-muted-foreground">
            Your cart is empty.
          </p>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="
                mb-6 p-5 rounded-2xl bg-white/5 border border-white/10
                backdrop-blur-xl
                flex flex-col md:flex-row
                gap-5 md:gap-0
                md:items-center md:justify-between
              "
            >
              {/* Product Info */}
              <div className="flex items-center gap-4">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover"
                />

                <div>
                  <h2 className="text-xl sm:text-2xl font-semibold text-white">
                    {item.product.name}
                  </h2>
                  <p className="text-purple-300">
                    ${item.product.price} × {item.quantity}
                  </p>
                </div>
              </div>

              {/* Controls */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
                {/* Quantity */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="w-10 h-10 rounded-xl bg-white/10 text-2xl
                    text-purple-300 hover:bg-white/20 transition"
                  >
                    −
                  </button>

                  <span className="text-xl font-semibold text-white">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => increaseQty(item.id)}
                    className="w-10 h-10 rounded-xl bg-white/10 text-2xl
                    text-purple-300 hover:bg-white/20 transition"
                  >
                    +
                  </button>
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeItem(item.id)}
                  className="
                    w-full sm:w-auto
                    px-6 py-2 rounded-xl
                    bg-gradient-to-r from-pink-500 to-purple-600
                    text-white text-center
                  "
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}

        {/* Total */}
        {items.length > 0 && (
          <div className="mt-10 p-6 sm:p-8 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex justify-between text-2xl sm:text-3xl text-white mb-6">
              <span>Total:</span>
              <span className="text-purple-300">
                ${total.toFixed(2)}
              </span>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="w-full py-4 rounded-xl text-lg sm:text-xl
              bg-gradient-to-r from-purple-500 to-pink-500 text-white"
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
