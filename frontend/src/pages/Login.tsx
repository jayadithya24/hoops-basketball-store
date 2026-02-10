import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { API_URL } from "../config/api";

const ADMIN_EMAIL = "admin@hoops.com";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // ===============================
  // LOGIN FUNCTION
  // ===============================
  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });

      const token = res.data?.token;

      if (!token) {
        toast.error("Login failed — no token received");
        return;
      }

      // ✅ Save token in AuthContext + localStorage
      login(token);

      // ✅ Save email for admin check
      localStorage.setItem("email", email);

      toast.success("Login successful!");

      // ✅ OPTIONAL: role-based redirect
      setTimeout(() => {
        if (email === ADMIN_EMAIL) {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }, 300);

    } catch (error: any) {
      console.error("LOGIN ERROR:", error?.response?.data);
      toast.error(error?.response?.data?.error || "Invalid login details");
    } finally {
      setLoading(false);
    }
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

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="
            w-full px-4 py-3 rounded-xl mb-4
            bg-muted/40 border border-border/40 
            focus:outline-none focus:border-primary 
            focus:ring-2 focus:ring-primary/40
            text-white placeholder-muted-foreground
          "
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="
            w-full px-4 py-3 rounded-xl mb-6
            bg-muted/40 border border-border/40 
            focus:outline-none focus:border-primary 
            focus:ring-2 focus:ring-primary/40
            text-white placeholder-muted-foreground
          "
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Login Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="
            btn-primary w-full py-3 rounded-xl font-semibold 
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
