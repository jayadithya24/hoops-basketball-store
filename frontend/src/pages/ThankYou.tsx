import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";

const ThankYou = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="pt-40 pb-20 flex flex-col items-center text-center px-6">

        <h1 className="text-6xl font-bold bg-gradient-to-r 
                       from-purple-400 to-pink-500 bg-clip-text 
                       text-transparent drop-shadow-lg mb-6">
          Thank You!
        </h1>

        <p className="text-xl text-gray-300 max-w-xl mb-10">
          Your order has been placed successfully.  
          You will receive updates soon!
        </p>

        {/* BUTTON — USER CLICKS TO GO HOME */}
        <button
          onClick={() => navigate("/")}
          className="px-8 py-4 rounded-xl bg-gradient-to-r 
                     from-purple-500 to-pink-500 text-white
                     text-lg font-semibold shadow-lg 
                     hover:scale-105 active:scale-95 transition"
        >
          Return to Home
        </button>
      </div>
    </Layout>
  );
};

export default ThankYou;
