import Layout from "@/components/Layout";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <Layout>
      <div className="pt-32 px-6 max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-10">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            to="/admin/products"
            className="p-8 rounded-2xl bg-white/5 border border-white/10
            hover:bg-white/10 transition text-white text-xl"
          >
            📦 Manage Products
          </Link>

          <div className="p-8 rounded-2xl bg-white/5 border border-white/10
          text-white text-xl opacity-60">
            🧾 Orders (Future Scope)
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
