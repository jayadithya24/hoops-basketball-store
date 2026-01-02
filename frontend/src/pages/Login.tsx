import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // -------------------------
  // LOGIN FUNCTION (FINAL)
  // -------------------------
  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post("http://localhost:4000/auth/login", {
        email,
        password,
      });

      console.log("LOGIN RESPONSE:", res.data); // Debug token output

      const token = res.data?.token;

      if (!token) {
        toast.error("Login failed — no token received");
        setLoading(false);
        return;
      }

      // Store token in localStorage + Context
      login(token);

      toast.success("Login successful!");

      // Navigate AFTER token is saved
      setTimeout(() => navigate("/"), 300);

    } catch (error: any) {
      console.log("LOGIN ERROR:", error?.response?.data);
      toast.error(error?.response?.data?.error || "Invalid login details");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div
        className="
          w-full max-w-md bg-secondary/40 backdrop-blur-xl 
          border border-border/40 rounded-2xl 
          p-8 shadow-xl animate-fade-in
        "
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-white">
          Login
        </h1>

        {/* Inputs */}
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="
              w-full px-4 py-3 rounded-xl 
              bg-muted/40 border border-border/40 
              focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/40
              text-white placeholder-muted-foreground
            "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="
              w-full px-4 py-3 rounded-xl 
              bg-muted/40 border border-border/40 
              focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/40
              text-white placeholder-muted-foreground
            "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="
            btn-primary w-full mt-6 py-3 rounded-xl font-semibold 
            disabled:opacity-60 disabled:cursor-not-allowed
          "
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Signup Link */}
        <p className="text-center text-muted-foreground mt-4 text-sm">
          Don’t have an account?{" "}
          <span
            className="text-primary cursor-pointer hover:underline"
            onClick={() => navigate("/signup")}
          >
            Signup
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
