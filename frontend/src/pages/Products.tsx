import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  image: string;
}

const Products = () => {
  const { token } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [addingId, setAddingId] = useState<number | null>(null);

  // Fetch products from backend
  useEffect(() => {
    fetch("http://localhost:4000/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load products");
        setLoading(false);
      });
  }, []);

  // Add to Cart function (FINAL FIXED VERSION)
  const addToCart = async (productId: number) => {
    if (!token) {
      toast.error("Please login to add items to cart");
      return;
    }

    setAddingId(productId);

    try {
      const res = await fetch(`http://localhost:4000/cart/add/${productId}`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (res.ok) {
        toast.success("Added to cart!");
      } else {
        const error = await res.json();
        toast.error(error.error || "Failed to add to cart");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }

    setAddingId(null);
  };

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
          {loading ? (
            <p className="text-muted-foreground text-center">Loading...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="card-tech group hover:border-primary/50 transition-all duration-300 overflow-hidden"
                >
                  {/* Image */}
                  <div className="aspect-square rounded-xl mb-4 overflow-hidden bg-black/20 relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://cdn.jsdelivr.net/gh/ismail9k/placeholders/basketball-placeholder.png";
                      }}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 relative z-20"
                    />
                    <div className="absolute inset-0 z-0"></div>
                  </div>

                  {/* Category */}
                  <span className="text-xs font-medium text-primary uppercase tracking-wider">
                    {product.category}
                  </span>

                  {/* Name */}
                  <h3 className="text-xl font-semibold text-foreground mt-1 mb-2">
                    {product.name}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm mb-4">
                    {product.description}
                  </p>

                  {/* Price + Button */}
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">
                      ${product.price}
                    </span>

                    <button
                      className="btn-primary text-sm py-2 px-4"
                      onClick={() => addToCart(product.id)}
                      disabled={addingId === product.id}
                    >
                      {addingId === product.id ? "Adding..." : "Add to Cart"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Products;
