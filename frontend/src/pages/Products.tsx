import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { API_URL } from "../config/api";

interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  image: string;
}

/* =========================
   Skeleton Card Component
========================= */
const ProductSkeleton = () => {
  return (
    <div className="card-tech animate-pulse">
      <div className="aspect-square rounded-xl mb-4 bg-white/10" />

      <div className="h-3 w-20 bg-white/10 rounded mb-2" />
      <div className="h-6 w-3/4 bg-white/10 rounded mb-2" />

      <div className="h-4 w-full bg-white/10 rounded mb-1" />
      <div className="h-4 w-5/6 bg-white/10 rounded mb-4" />

      <div className="flex justify-between items-center">
        <div className="h-6 w-16 bg-white/10 rounded" />
        <div className="h-10 w-28 bg-white/10 rounded-xl" />
      </div>
    </div>
  );
};

const Products = () => {
  const { token } = useAuth();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [addingId, setAddingId] = useState<number | null>(null);

  /* =========================
     Fetch products
  ========================= */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_URL}/products`);

        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await res.json();
        setProducts(data);
      } catch (error) {
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  /* =========================
     Add to cart
  ========================= */
  const addToCart = async (productId: number) => {
    if (!token) {
      toast.error("Please login to add items to cart");
      return;
    }

    setAddingId(productId);

    try {
      const res = await fetch(`${API_URL}/cart/add/${productId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to add to cart");
      }

      toast.success("Added to cart!");
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setAddingId(null);
    }
  };

  /* =========================
     Show last 12 products
  ========================= */
  const visibleProducts = products.slice(-12);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
            Our Products
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover the perfect basketball for your game. Every ball in our
            lineup is crafted with the same commitment to excellence.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="relative pb-24 px-4 overflow-hidden">
        <div className="absolute inset-0 tech-grid opacity-50" />
        <div className="absolute inset-0 purple-blur opacity-30" />

        <div className="relative z-10 container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* Skeleton Loader */}
            {loading &&
              [...Array(6)].map((_, i) => <ProductSkeleton key={i} />)}

            {/* Real Products */}
            {!loading &&
              visibleProducts.map((product) => (
                <div
                  key={product.id}
                  className="card-tech group hover:border-primary/50 transition-all duration-300 overflow-hidden"
                >
                  <div className="aspect-square rounded-xl mb-4 overflow-hidden bg-black/20">
                    <img
                      src={product.image}
                      alt={product.name}
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://cdn.jsdelivr.net/gh/ismail9k/placeholders/basketball-placeholder.png";
                      }}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <span className="text-xs font-medium text-primary uppercase tracking-wider">
                    {product.category}
                  </span>

                  <h3 className="text-xl font-semibold text-foreground mt-1 mb-2">
                    {product.name}
                  </h3>

                  <p className="text-muted-foreground text-sm mb-4">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">
                      ${product.price}
                    </span>

                    <button
                      className="btn-primary text-sm py-2 px-4 disabled:opacity-50"
                      onClick={() => addToCart(product.id)}
                      disabled={addingId === product.id}
                    >
                      {addingId === product.id ? "Adding..." : "Add to Cart"}
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Products;
