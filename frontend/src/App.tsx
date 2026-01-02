import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { BlogProvider } from "@/contexts/BlogContext";
import { AuthProvider } from "@/contexts/AuthContext";

import LoadingScreen from "@/components/LoadingScreen";

// Pages
import Index from "./pages/Index";
import Products from "./pages/Products";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

// Auth Pages
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// Protected Pages
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import ProtectedRoute from "@/components/ProtectedRoute";

// Legal Pages
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";

// NEW — Thank You Page
import ThankYou from "./pages/ThankYou";

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <BlogProvider>
        <TooltipProvider>
          <AuthProvider>
            <Toaster />
            <Sonner />

            {isLoading && (
              <LoadingScreen onComplete={() => setIsLoading(false)} />
            )}

            <BrowserRouter>
              <Routes>

                {/* MAIN ROUTES */}
                <Route path="/" element={<Index />} />
                <Route path="/products" element={<Products />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/admin" element={<Admin />} />

                {/* AUTH ROUTES */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                {/* PROTECTED ROUTES */}
                <Route
                  path="/cart"
                  element={
                    <ProtectedRoute>
                      <Cart />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/checkout"
                  element={
                    <ProtectedRoute>
                      <Checkout />
                    </ProtectedRoute>
                  }
                />

                {/* THANK YOU PAGE */}
                <Route path="/thankyou" element={<ThankYou />} />

                {/* LEGAL PAGES */}
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />

                {/* FALLBACK */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </AuthProvider>
        </TooltipProvider>
      </BlogProvider>
    </QueryClientProvider>
  );
};

export default App;
