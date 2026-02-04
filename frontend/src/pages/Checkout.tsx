import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { toast } from "sonner";
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

const Checkout = () => {
  const { token } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [customer, setCustomer] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    payment: "card",
  });

  // ===============================
  // LOAD CART
  // ===============================
  useEffect(() => {
    if (!token) return;

    fetch(`${API_URL}/cart`, {
      headers: { Authorization: "Bearer " + token },
    })
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      });
  }, [token]);

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleChange = (e: any) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const placeOrder = async () => {
    if (!customer.fullName || !customer.email || !customer.phone || !customer.address) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          address: `${customer.address}, ${customer.city}, ${customer.state}, ${customer.postalCode}`,
          paymentMethod: customer.payment,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Order failed");
        return;
      }

      toast.success("🎉 Order placed successfully!");
      setTimeout(() => navigate("/thankyou"), 1000);
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <div className="pt-28 sm:pt-32 pb-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <h1 className="text-4xl sm:text-6xl font-extrabold text-center text-white mb-10 sm:mb-12">
          Checkout
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">

          {/* LEFT FORM */}
          <div className="p-5 sm:p-10 rounded-3xl bg-white/5 border border-white/20 backdrop-blur-2xl">
            <h2 className="text-xl sm:text-3xl font-semibold text-white mb-6">
              Customer Details
            </h2>

            <div className="space-y-4 sm:space-y-5">

              {/* Name + Email */}
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  name="fullName"
                  placeholder="Full Name"
                  onChange={handleChange}
                  className="flex-1 min-h-[44px] p-3 sm:p-4 rounded-xl bg-white/10 border border-white/20 text-white text-sm sm:text-base outline-none"
                />
                <input
                  name="email"
                  placeholder="Email Address"
                  onChange={handleChange}
                  className="flex-1 min-h-[44px] p-3 sm:p-4 rounded-xl bg-white/10 border border-white/20 text-white text-sm sm:text-base outline-none"
                />
              </div>

              {/* Address */}
              <textarea
                name="address"
                placeholder="Full Address"
                onChange={handleChange}
                className="w-full min-h-[96px] p-3 sm:p-4 rounded-xl bg-white/10 border border-white/20 text-white text-sm sm:text-base outline-none leading-relaxed"
              />

              {/* Phone */}
              <input
                name="phone"
                placeholder="Phone Number"
                onChange={handleChange}
                className="w-full min-h-[44px] p-3 sm:p-4 rounded-xl bg-white/10 border border-white/20 text-white text-sm sm:text-base outline-none"
              />

              {/* City + State */}
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  name="city"
                  placeholder="City"
                  onChange={handleChange}
                  className="flex-1 min-h-[44px] p-3 sm:p-4 rounded-xl bg-white/10 border border-white/20 text-white text-sm sm:text-base outline-none"
                />
                <input
                  name="state"
                  placeholder="State"
                  onChange={handleChange}
                  className="flex-1 min-h-[44px] p-3 sm:p-4 rounded-xl bg-white/10 border border-white/20 text-white text-sm sm:text-base outline-none"
                />
              </div>

              {/* Postal Code */}
              <input
                name="postalCode"
                placeholder="Postal Code"
                onChange={handleChange}
                className="w-full min-h-[44px] p-3 sm:p-4 rounded-xl bg-white/10 border border-white/20 text-white text-sm sm:text-base outline-none"
              />

              {/* Payment */}
              <select
                name="payment"
                onChange={handleChange}
                className="w-full min-h-[44px] p-3 sm:p-4 rounded-xl bg-white/20 border border-white/20 text-white text-sm sm:text-base outline-none"
              >
                <option value="card" className="text-black">Card</option>
                <option value="cod" className="text-black">Cash on Delivery</option>
                <option value="upi" className="text-black">UPI</option>
              </select>

              <button
                onClick={placeOrder}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white text-lg font-bold"
              >
                Place Order
              </button>
            </div>
          </div>

          {/* RIGHT SUMMARY */}
          <div className="p-5 sm:p-10 rounded-3xl bg-white/5 border border-white/20 backdrop-blur-2xl">
            <h2 className="text-xl sm:text-3xl font-semibold text-white mb-6">
              Order Summary
            </h2>

            {loading ? (
              <p className="text-gray-400">Loading…</p>
            ) : (
              <div className="space-y-4 text-sm sm:text-base">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-white">
                    <span>{item.product.name} × {item.quantity}</span>
                    <span>${item.product.price * item.quantity}</span>
                  </div>
                ))}

                <hr className="border-white/20 my-6" />

                <div className="flex justify-between text-xl sm:text-2xl font-bold text-white">
                  <span>Total:</span>
                  <span className="text-purple-400">${total}</span>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
