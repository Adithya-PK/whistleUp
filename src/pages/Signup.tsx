import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, Loader2, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const CITIES = ["Chennai", "Bengaluru", "Mumbai"];

const RoleCard = ({ role, selected, onSelect }: { role: "athlete" | "coach"; selected: boolean; onSelect: () => void }) => (
  <motion.button
    type="button"
    onClick={onSelect}
    animate={{ scale: selected ? 1.02 : 1 }}
    transition={{ duration: 0.15 }}
    className={`flex-1 flex flex-col items-center gap-2 py-5 px-3 rounded-xl border-2 transition-all cursor-pointer ${
      selected
        ? role === "athlete"
          ? "border-verified bg-verified/5 text-verified"
          : "border-primary bg-blue-tint text-primary"
        : "border-border bg-background text-muted-foreground hover:border-muted-foreground/40"
    }`}
  >
    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${selected ? (role === "athlete" ? "bg-verified/10" : "bg-primary/10") : "bg-muted"}`}>
      {role === "athlete" ? <User size={24} className={selected ? "text-verified" : "text-muted-foreground"} /> : <span className="text-2xl">🏅</span>}
    </div>
    <span className="font-heading font-semibold text-sm">{role === "athlete" ? "I'm an Athlete" : "I'm a Coach"}</span>
    <span className={`text-xs font-body ${selected ? "opacity-80" : "text-muted-foreground/60"}`}>
      {role === "athlete" ? "Find & book coaches" : "Create & share profile"}
    </span>
  </motion.button>
);

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState<"athlete" | "coach">("athlete");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("Chennai");
  const [password, setPassword] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPw) { setError("Passwords do not match"); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters"); return; }
    setLoading(true);
    setError("");
    const result = await signup(name, email, password, role, city);
    setLoading(false);
    if (result.success) {
      if (role === "coach") navigate("/coach/dashboard");
      else navigate("/");
    } else {
      setError(result.error || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen pt-16 bg-off-white flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[440px] bg-card rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Top strip */}
        <div className="gradient-hero h-[72px] flex items-center justify-center">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center border border-white/30">
              <svg width="18" height="18" viewBox="0 0 44 44" fill="none">
                <circle cx="22" cy="22" r="20" stroke="white" strokeWidth="2.5" fill="none" />
                <path d="M14 22 C14 17 17 14 22 14 C27 14 30 17 30 22" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                <path d="M18 22 C18 19.5 19.8 18 22 18 C24.2 18 26 19.5 26 22" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
                <circle cx="22" cy="25" r="2.5" fill="white" />
                <path d="M22 27.5 L22 31" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <path d="M22 31 L26 31" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <span className="font-heading font-bold text-white">Create Account</span>
          </div>
        </div>

        <div className="p-8">
          {/* Role selector */}
          <div className="mb-6">
            <label className="font-body text-sm font-medium text-foreground block mb-3">I want to...</label>
            <div className="flex gap-3">
              <RoleCard role="athlete" selected={role === "athlete"} onSelect={() => setRole("athlete")} />
              <RoleCard role="coach" selected={role === "coach"} onSelect={() => setRole("coach")} />
            </div>
          </div>

          {error && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-3 mb-5 text-xs font-body text-destructive">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="font-body text-sm font-medium text-foreground block mb-1.5">Full Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full h-12 px-4 rounded-lg border border-border bg-background font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" placeholder="Your full name" />
            </div>
            <div>
              <label className="font-body text-sm font-medium text-foreground block mb-1.5">Email address</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full h-12 px-4 rounded-lg border border-border bg-background font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" placeholder="you@example.com" />
            </div>
            <div>
              <label className="font-body text-sm font-medium text-foreground block mb-1.5">City</label>
              <select value={city} onChange={(e) => setCity(e.target.value)} className="w-full h-12 px-4 rounded-lg border border-border bg-background font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary">
                {CITIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="font-body text-sm font-medium text-foreground block mb-1.5">Password</label>
              <div className="relative">
                <input type={showPw ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full h-12 px-4 pr-12 rounded-lg border border-border bg-background font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" placeholder="Min. 6 characters" />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <div>
              <label className="font-body text-sm font-medium text-foreground block mb-1.5">Confirm Password</label>
              <input type="password" value={confirmPw} onChange={(e) => setConfirmPw(e.target.value)} required className="w-full h-12 px-4 rounded-lg border border-border bg-background font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" placeholder="Repeat password" />
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className="w-full h-[50px] gradient-button text-white font-heading font-semibold rounded-[10px] flex items-center justify-center gap-2 disabled:opacity-70 hover:opacity-90 transition-opacity mt-2"
            >
              {loading ? <Loader2 size={20} className="animate-spin" /> : `Create Account as ${role === "coach" ? "Coach" : "Athlete"}`}
            </motion.button>
          </form>

          <p className="text-center font-body text-sm text-muted-foreground mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-semibold hover:underline">Log In</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
