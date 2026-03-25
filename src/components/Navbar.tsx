import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Bell, Sun, Moon, MapPin, LogOut, LayoutDashboard, Search, Info } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
  onToggleDark: () => void;
  city: string;
  onCityChange: (c: string) => void;
}

const CITIES = ["Chennai", "Bengaluru", "Mumbai"];

const SidebarPanel = ({ isOpen, onClose, darkMode, onToggleDark, city, onCityChange }: SidebarProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    onClose();
    navigate("/");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed right-0 top-0 h-full w-[280px] bg-navy z-50 flex flex-col shadow-2xl"
            initial={{ x: 280 }}
            animate={{ x: 0 }}
            exit={{ x: 280 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            <div className="flex items-center justify-between p-5 border-b border-white/10">
              <div className="flex items-center gap-3">
                {user ? (
                  <>
                    <img src={`https://i.pravatar.cc/40?u=${user.email}`} alt={user.name} className="w-10 h-10 rounded-full border-2 border-primary" />
                    <div>
                      <p className="text-white font-heading font-semibold text-sm">{user.name}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${user.role === "coach" ? "bg-primary/20 text-primary-light" : user.role === "admin" ? "bg-red-500/20 text-red-300" : "bg-verified/20 text-verified"}`}>
                        {user.role === "coach" ? "Coach" : user.role === "admin" ? "Admin" : "Athlete"}
                      </span>
                    </div>
                  </>
                ) : (
                  <span className="text-white font-heading font-bold text-lg">Menu</span>
                )}
              </div>
              <button onClick={onClose} className="text-white/60 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            <nav className="p-5 flex flex-col gap-1 border-b border-white/10">
              <Link to="/coaches" onClick={onClose} className="flex items-center gap-3 px-3 py-3 rounded-xl text-white/80 hover:bg-white/10 hover:text-white transition-all font-body text-sm">
                <Search size={18} className="text-primary-light" />
                Find a Coach
              </Link>
              <Link to="/how-it-works" onClick={onClose} className="flex items-center gap-3 px-3 py-3 rounded-xl text-white/80 hover:bg-white/10 hover:text-white transition-all font-body text-sm">
                <Info size={18} className="text-primary-light" />
                How it Works
              </Link>
              {user?.role === "coach" && (
                <Link to="/coach/dashboard" onClick={onClose} className="flex items-center gap-3 px-3 py-3 rounded-xl text-white/80 hover:bg-white/10 hover:text-white transition-all font-body text-sm">
                  <LayoutDashboard size={18} className="text-primary-light" />
                  My Dashboard
                </Link>
              )}
              {user?.role === "admin" && (
                <Link to="/admin" onClick={onClose} className="flex items-center gap-3 px-3 py-3 rounded-xl text-white/80 hover:bg-white/10 hover:text-white transition-all font-body text-sm">
                  <LayoutDashboard size={18} className="text-primary-light" />
                  Admin Panel
                </Link>
              )}
            </nav>

            <div className="p-5 border-b border-white/10">
              <p className="text-white/50 text-xs uppercase tracking-widest mb-3 font-body">Select City</p>
              <div className="flex flex-col gap-2">
                {CITIES.map((c) => (
                  <button
                    key={c}
                    onClick={() => onCityChange(c)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-body transition-all ${city === c ? "bg-primary text-white" : "text-white/70 hover:bg-white/10"}`}
                  >
                    <MapPin size={14} />
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-end gap-3">
              <button
                onClick={onToggleDark}
                className="flex items-center gap-3 px-3 py-3 rounded-xl text-white/80 hover:bg-white/10 hover:text-white transition-all font-body text-sm"
              >
                {darkMode ? <Sun size={18} className="text-star" /> : <Moon size={18} className="text-primary-light" />}
                {darkMode ? "Light Mode" : "Dark Mode"}
              </button>
              {user && (
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-3 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all font-body text-sm mt-2"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export const Navbar = ({ darkMode, onToggleDark }: { darkMode: boolean; onToggleDark: () => void }) => {
  const [scrolled, setScrolled] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [city, setCity] = useState("Chennai");
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-30 h-16 gradient-hero transition-all duration-300 ${scrolled ? "backdrop-blur-md shadow-lg nav-shadow" : ""}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <img
              src="/logo2.png"
              alt="Whistle-Up"
              className="w-9 h-9 rounded-full object-cover"
            />
            <span className="font-heading font-bold text-white text-lg tracking-wide">Whistle-Up</span>
          </Link>

          {/* Center links */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/coaches" className="text-white/85 hover:text-white font-body text-sm font-medium transition-colors">Find a Coach</Link>
            <Link to="/how-it-works" className="text-white/85 hover:text-white font-body text-sm font-medium transition-colors">How it Works</Link>
            {user?.role === "admin" && (
              <Link to="/admin" className="text-white/85 hover:text-white font-body text-sm font-medium transition-colors">Admin Panel</Link>
            )}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 border border-white/25 text-white text-xs font-body hover:bg-white/25 transition-colors"
            >
              <MapPin size={12} />
              {city}
            </button>

            {user ? (
              <button
                onClick={() => setSidebarOpen(true)}
                className="w-9 h-9 rounded-full border-2 border-white/50 overflow-hidden"
              >
                <img src={`https://i.pravatar.cc/36?u=${user.email}`} alt={user.name} className="w-full h-full object-cover" />
              </button>
            ) : (
              <>
                <Link to="/login" className="hidden sm:block text-white/85 hover:text-white font-body text-sm font-medium transition-colors px-3 py-1.5 rounded-lg border border-white/30 hover:border-white">
                  Login
                </Link>
                <Link to="/signup" className="bg-white text-primary font-heading font-semibold text-sm px-4 py-2 rounded-[10px] hover:bg-white/90 transition-colors">
                  Sign Up
                </Link>
              </>
            )}

            <button
              onClick={() => setSidebarOpen(true)}
              className="text-white p-1.5 rounded-lg hover:bg-white/15 transition-colors"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </nav>

      <SidebarPanel
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        darkMode={darkMode}
        onToggleDark={onToggleDark}
        city={city}
        onCityChange={(c) => { setCity(c); setSidebarOpen(false); }}
      />
    </>
  );
};