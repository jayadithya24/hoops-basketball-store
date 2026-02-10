import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/api";
import { useAuth } from "@/contexts/AuthContext";

interface Product {
  id: number;
  name: string;
  price: number;
}

const AdminProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { token } = useAuth();

  useEffect(() => {
    fetch(`${API_URL}/products`)
      .then((res) => res.json())
      .then(setProducts);
  }, []);

  const deleteProduct = async (id: number) => {
    if (!token) return;

    await fetch(`${API_URL}/products/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <Layout>
      <div className="pt-32 px-6 max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">
          Manage Products
        </h1>

        <div className="space-y-4">
          {products.map((p) => (
            <div
              key={p.id}
              className="flex justify-between items-center p-4
              bg-white/5 rounded-xl text-white"
            >
              <span>{p.name}</span>
              <span>${p.price}</span>

              <button
                onClick={() => deleteProduct(p.id)}
                className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default AdminProducts;
