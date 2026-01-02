import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      await axios.post("http://localhost:4000/auth/signup", {
        email,
        password,
      });

      alert("Account created successfully! You can now log in.");
      navigate("/login");
    } catch (error: any) {
      alert(error.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div
        className="
          w-full max-w-lg bg-secondary/50 backdrop-blur-xl
          border border-border/40 rounded-2xl 
          p-10 shadow-2xl animate-fade-in
        "
      >
        <h1 className="text-4xl font-bold mb-8 text-center text-white">
          Create Account
        </h1>

        {/* Inputs */}
        <div className="space-y-5">
          <input
            type="email"
            placeholder="Email"
            className="
              w-full px-4 py-3 rounded-xl 
              bg-muted/40 border border-border/40 
              focus:outline-none focus:border-primary focus:ring-2 
              focus:ring-primary/40
              text-white placeholder-muted-foreground
              transition-all
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
              focus:outline-none focus:border-primary focus:ring-2 
              focus:ring-primary/40
              text-white placeholder-muted-foreground
              transition-all
            "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Signup Button */}
        <button
          onClick={handleSignup}
          className="
            w-full mt-8 py-3 rounded-xl 
            bg-primary hover:bg-primary/90 
            text-white font-semibold text-lg 
            transition-all duration-200 glow-purple hover:scale-105
          "
        >
          Create Account
        </button>

        {/* Login Link */}
        <p className="text-center text-muted-foreground mt-5 text-sm">
          Already have an account?{" "}
          <span
            className="text-primary cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
