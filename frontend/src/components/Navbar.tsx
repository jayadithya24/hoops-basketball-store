import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const { token, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Blog", href: "/blog" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (path: string) =>
    location.pathname === path
      ? "text-purple-400 font-semibold"
      : "text-white/80 hover:text-white";

  return (
    <header className="fixed top-6 left-0 right-0 z-50 flex justify-center">
      <nav className="floating-nav flex items-center gap-6 px-6 py-3 shadow-lg">

        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-white tracking-wide">
          Hoops
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={`nav-link ${isActive(link.href)}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-4 ml-auto">
          {!token ? (
            <>
              <Link
                to="/login"
                className="nav-link bg-white/10 px-4 py-2 rounded-full hover:bg-white/20"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="btn-primary px-5 py-2"
              >
                Signup
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/cart"
                className="nav-link bg-white/10 px-4 py-2 rounded-full hover:bg-white/20"
              >
                Cart
              </Link>

              <button
                onClick={handleLogout}
                className="nav-link text-red-400 hover:text-red-300"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white ml-auto"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>

        {/* Mobile Dropdown */}
        {open && (
          <div className="absolute top-16 left-0 right-0 bg-black/70 backdrop-blur-xl rounded-xl p-5 flex flex-col gap-4 md:hidden">

            {/* Mobile Nav */}
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setOpen(false)}
                className={`nav-link py-2 ${isActive(link.href)}`}
              >
                {link.name}
              </Link>
            ))}

            {token && (
              <Link
                to="/cart"
                onClick={() => setOpen(false)}
                className="nav-link bg-white/10 px-4 py-2 rounded-full hover:bg-white/20"
              >
                Cart
              </Link>
            )}

            {/* Auth Buttons */}
            {!token ? (
              <>
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="nav-link bg-white/10 px-4 py-2 rounded-full hover:bg-white/20"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  onClick={() => setOpen(false)}
                  className="btn-primary px-5 py-2 text-center"
                >
                  Signup
                </Link>
              </>
            ) : (
              <button
                onClick={() => {
                  setOpen(false);
                  handleLogout();
                }}
                className="nav-link text-red-400 hover:text-red-200 text-left"
              >
                Logout
              </button>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
