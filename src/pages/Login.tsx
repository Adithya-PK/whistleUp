import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const result = await login(email, password);
    setLoading(false);
    if (result.success) {
      const user = JSON.parse(localStorage.getItem("wu_user") || "{}");
      if (user.role === "coach") navigate("/coach/dashboard");
      else navigate("/");
    } else {
      setError(result.error || "Login failed");
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
        {/* Top gradient strip */}
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
            <span className="font-heading font-bold text-white">Whistle-Up</span>
          </div>
        </div>

        <div className="p-8">
          <h2 className="font-heading font-bold text-foreground text-2xl mb-1">Welcome back</h2>
          <p className="font-body text-muted-foreground text-sm mb-7">Sign in to your account to continue</p>

          {/* Demo hint */}
          <div className="bg-blue-tint border border-primary/20 rounded-xl p-3 mb-6 text-xs font-body text-primary">
            <strong>Demo:</strong> coach@demo.com / demo123 &nbsp;|&nbsp; athlete@demo.com / demo123
          </div>

          {error && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-3 mb-5 text-xs font-body text-destructive">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="font-body text-sm font-medium text-foreground block mb-1.5">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full h-12 px-4 rounded-lg border border-border bg-background font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="font-body text-sm font-medium text-foreground block mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full h-12 px-4 pr-12 rounded-lg border border-border bg-background font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                  placeholder="••••••••"
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="text-right">
              <button type="button" className="font-body text-xs text-primary hover:underline">Forgot password?</button>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className="w-full h-[50px] gradient-button text-white font-heading font-semibold rounded-[10px] flex items-center justify-center gap-2 disabled:opacity-70 hover:opacity-90 transition-opacity"
            >
              {loading ? <Loader2 size={20} className="animate-spin" /> : "Log In"}
            </motion.button>
          </form>

          <p className="text-center font-body text-sm text-muted-foreground mt-6">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary font-semibold hover:underline">Sign Up</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
