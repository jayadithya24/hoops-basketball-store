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

const Cart = () => {
  const navigate = useNavigate();
  const { token } = useAuth();  // ✅ GET TOKEN

  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  // -------------------------------
  // LOAD CART (NOW WITH TOKEN)
  // -------------------------------
  const loadCart = async () => {
    if (!token) return;

    try {
      const res = await fetch("http://localhost:4000/cart", {
        headers: { Authorization: "Bearer " + token },
      });

      if (!res.ok) {
        console.log("CART ERROR:", res.status);
        setItems([]);
        return;
      }

      const data = await res.json();
      setItems(data);
    } catch (err) {
      console.error("Failed to load cart:", err);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadCart();
  }, [token]);

  // -------------------------------
  // INCREASE QUANTITY
  // -------------------------------
  const increaseQty = async (id: number) => {
    await fetch(`http://localhost:4000/cart/increase/${id}`, {
      method: "POST",
      headers: { Authorization: "Bearer " + token },
    });
    loadCart();
  };

  // -------------------------------
  // DECREASE QUANTITY
  // -------------------------------
  const decreaseQty = async (id: number) => {
    await fetch(`http://localhost:4000/cart/decrease/${id}`, {
      method: "POST",
      headers: { Authorization: "Bearer " + token },
    });
    loadCart();
  };

  // -------------------------------
  // REMOVE ITEM
  // -------------------------------
  const removeItem = async (id: number) => {
    await fetch(`http://localhost:4000/cart/${id}`, {
      method: "DELETE",
      headers: { Authorization: "Bearer " + token },
    });
    loadCart();
  };

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <Layout>
      <div className="pt-40 px-6 max-w-5xl mx-auto">
        <h1 className="text-5xl font-bold mb-10 text-center bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent drop-shadow-lg">
          Your Cart
        </h1>

        {loading ? (
          <p className="text-muted-foreground text-center">Loading...</p>
        ) : items.length === 0 ? (
          <p className="text-muted-foreground text-center text-xl">
            Your cart is empty.
          </p>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="relative mb-5 p-6 rounded-2xl
              backdrop-blur-xl bg-white/5 border border-white/10
              shadow-lg shadow-purple-500/10 hover:shadow-purple-500/20
              transition-all duration-300 flex items-center justify-between"
            >
              {/* Product Info */}
              <div className="flex items-center gap-5">
                <img
                  src={item.product.image}
                  className="w-24 h-24 rounded-xl object-cover shadow-md"
                />
                <div>
                  <h2 className="text-2xl font-semibold text-white drop-shadow-sm">
                    {item.product.name}
                  </h2>
                  <p className="text-purple-300 mt-1 text-lg">
                    ${item.product.price} × {item.quantity}
                  </p>
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-5">
                <button
                  onClick={() => decreaseQty(item.id)}
                  className="w-10 h-10 flex items-center justify-center
                  rounded-xl bg-white/10 backdrop-blur-md
                  text-2xl text-purple-300 hover:bg-white/20
                  active:scale-90 transition"
                >
                  –
                </button>

                <span className="text-2xl font-semibold text-white">
                  {item.quantity}
                </span>

                <button
                  onClick={() => increaseQty(item.id)}
                  className="w-10 h-10 flex items-center justify-center
                  rounded-xl bg-white/10 backdrop-blur-md
                  text-2xl text-purple-300 hover:bg-white/20
                  active:scale-90 transition"
                >
                  +
                </button>

                {/* Remove Button */}
                <button
                  onClick={() => removeItem(item.id)}
                  className="px-6 py-2 rounded-xl bg-gradient-to-r
                  from-pink-500 to-purple-600 text-white shadow-lg
                  hover:scale-105 active:scale-95 transition"
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}

        {/* Total Section */}
        {items.length > 0 && (
          <div
            className="mt-10 p-8 rounded-2xl backdrop-blur-xl bg-white/5
            border border-white/10 shadow-lg shadow-purple-500/20"
          >
            <div className="flex justify-between text-3xl font-semibold text-white mb-6">
              <span>Total:</span>
              <span className="text-purple-300">${total.toFixed(2)}</span>
            </div>

            <button
              className="w-full py-4 rounded-xl text-xl font-semibold
              bg-gradient-to-r from-purple-500 to-pink-500
              text-white shadow-xl hover:scale-[1.02] active:scale-95
              transition"
              onClick={() => navigate("/checkout")}
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
