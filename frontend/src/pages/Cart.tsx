import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

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

const API_URL = "http://localhost:4000";

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
  // INCREASE QUANTITY
  // ===============================
  const increaseQty = async (cartItemId: number) => {
    if (!token) return;

    await fetch(`${API_URL}/cart/increase/${cartItemId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    loadCart(); // 🔥 refresh cart
  };

  // ===============================
  // DECREASE QUANTITY
  // ===============================
  const decreaseQty = async (cartItemId: number) => {
    if (!token) return;

    await fetch(`${API_URL}/cart/decrease/${cartItemId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    loadCart(); // 🔥 refresh cart
  };

  // ===============================
  // REMOVE ITEM
  // ===============================
  const removeItem = async (cartItemId: number) => {
    if (!token) return;

    await fetch(`${API_URL}/cart/${cartItemId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    loadCart(); // 🔥 refresh cart
  };

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <Layout>
      <div className="pt-40 px-6 max-w-5xl mx-auto">
        <h1 className="text-5xl font-bold mb-10 text-center bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
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
              className="mb-5 p-6 rounded-2xl bg-white/5 border border-white/10
              backdrop-blur-xl flex items-center justify-between"
            >
              {/* Product Info */}
              <div className="flex items-center gap-5">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-24 h-24 rounded-xl object-cover"
                />
                <div>
                  <h2 className="text-2xl font-semibold text-white">
                    {item.product.name}
                  </h2>
                  <p className="text-purple-300">
                    ${item.product.price} × {item.quantity}
                  </p>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-5">
                <button
                  onClick={() => decreaseQty(item.id)}
                  className="w-10 h-10 rounded-xl bg-white/10 text-2xl
                  text-purple-300 hover:bg-white/20 transition"
                >
                  −
                </button>

                <span className="text-2xl font-semibold text-white">
                  {item.quantity}
                </span>

                <button
                  onClick={() => increaseQty(item.id)}
                  className="w-10 h-10 rounded-xl bg-white/10 text-2xl
                  text-purple-300 hover:bg-white/20 transition"
                >
                  +
                </button>

                <button
                  onClick={() => removeItem(item.id)}
                  className="px-6 py-2 rounded-xl bg-gradient-to-r
                  from-pink-500 to-purple-600 text-white"
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}

        {/* Total */}
        {items.length > 0 && (
          <div className="mt-10 p-8 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex justify-between text-3xl text-white mb-6">
              <span>Total:</span>
              <span className="text-purple-300">
                ${total.toFixed(2)}
              </span>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="w-full py-4 rounded-xl text-xl
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
