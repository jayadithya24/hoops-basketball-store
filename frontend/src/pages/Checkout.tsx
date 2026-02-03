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

  // Load cart with token
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
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value,
    });
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

    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <h1 className="text-6xl font-extrabold text-center text-white mb-16 drop-shadow-lg">
          Checkout
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* LEFT FORM */}
          <div className="p-10 rounded-3xl bg-white/5 border border-white/20 shadow-2xl backdrop-blur-2xl">

            <h2 className="text-3xl font-semibold text-white mb-8">
              Customer Details
            </h2>

            <div className="space-y-5">
              <div className="flex gap-4">
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  onChange={handleChange}
                  className="flex-1 p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 outline-none"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  onChange={handleChange}
                  className="flex-1 p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>

              <textarea
                name="address"
                placeholder="Full Address"
                onChange={handleChange}
                className="w-full p-4 h-28 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 outline-none"
              />

              <div className="flex gap-4">
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  onChange={handleChange}
                  className="flex-1 p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>

              <div className="flex gap-4">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  onChange={handleChange}
                  className="flex-1 p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 outline-none"
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  onChange={handleChange}
                  className="flex-1 p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>

              <input
                type="text"
                name="postalCode"
                placeholder="Postal Code"
                onChange={handleChange}
                className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 outline-none"
              />

              {/* PAYMENT */}
              <div>
                <label className="text-white block mb-2 text-lg">Payment Method</label>
                <select
                  name="payment"
                  onChange={handleChange}
                  className="w-full p-4 rounded-xl bg-white/20 border border-white/20 text-white focus:ring-2 focus:ring-purple-400 outline-none"
                >
                  <option value="card" className="text-black">Credit / Debit Card</option>
                  <option value="cod" className="text-black">Cash on Delivery</option>
                  <option value="upi" className="text-black">UPI</option>
                </select>
              </div>

              <button
                onClick={placeOrder}
                className="w-full py-5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white text-xl font-bold shadow-xl hover:scale-105 transition"
              >
                Place Order
              </button>
            </div>
          </div>

          {/* RIGHT SUMMARY */}
          <div className="p-10 rounded-3xl bg-white/5 border border-white/20 shadow-2xl backdrop-blur-2xl">

            <h2 className="text-3xl font-semibold text-white mb-8">
              Order Summary
            </h2>

            {loading ? (
              <p className="text-gray-400">Loading…</p>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-white text-lg">
                    <span>{item.product.name} × {item.quantity}</span>
                    <span>${item.product.price * item.quantity}</span>
                  </div>
                ))}

                <hr className="border-white/20 my-6" />

                <div className="flex justify-between text-3xl font-bold text-white">
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
