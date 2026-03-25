import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Users, Eye, DollarSign, Save, Loader2, TrendingUp, Calendar, LayoutDashboard } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { mockBookings } from "@/data/mockData";

const SPORTS = ["Cricket", "Football", "Badminton", "Yoga", "Pilates", "Stretching", "Fitness"];

const StatCard = ({ icon: Icon, label, value, color }: { icon: React.ElementType; label: string; value: string; color: string }) => (
  <div className="bg-card rounded-2xl p-6 card-shadow">
    <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${color}`}>
      <Icon size={22} className="text-white" />
    </div>
    <p className="font-heading font-bold text-2xl text-foreground">{value}</p>
    <p className="font-body text-sm text-muted-foreground mt-1">{label}</p>
  </div>
);

const StatusPill = ({ status }: { status: string }) => {
  const map: Record<string, string> = {
    Upcoming: "bg-primary/10 text-primary",
    Completed: "bg-verified/10 text-verified",
    Cancelled: "bg-destructive/10 text-destructive",
  };
  return <span className={`px-3 py-1 rounded-full text-xs font-body font-medium ${map[status] || ""}`}>{status}</span>;
};

const CoachDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [bio, setBio] = useState("Former Tamil Nadu Ranji Trophy player with 12 years of professional experience. I specialize in batting technique and mental conditioning.");
  const [rate, setRate] = useState("1200");
  const [selectedSports, setSelectedSports] = useState<string[]>(["Cricket", "Fitness"]);
  const [sessionType, setSessionType] = useState("Both");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "profile" | "bookings">("overview");

  useEffect(() => {
    if (!user) { navigate("/login"); return; }
    if (user.role !== "coach") { navigate("/"); }
  }, [user, navigate]);

  const toggleSport = (s: string) => {
    setSelectedSports((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);
  };

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen pt-16 bg-background flex">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-60 bg-card border-r border-border flex-col p-6 fixed top-16 bottom-0 left-0 z-10">
        <div className="flex flex-col items-center text-center mb-8 pt-4">
          <img src={`https://i.pravatar.cc/80?u=${user.email}`} alt={user.name} className="w-20 h-20 rounded-full border-3 border-primary mb-3" style={{ border: "3px solid hsl(var(--primary))" }} />
          <p className="font-heading font-semibold text-foreground text-sm">{user.name}</p>
          <span className="mt-1 bg-primary/10 text-primary text-xs font-body px-3 py-1 rounded-full">Coach</span>
        </div>
        <nav className="flex flex-col gap-1">
          {[
            { id: "overview", label: "Overview", icon: LayoutDashboard },
            { id: "profile", label: "Edit Profile", icon: Users },
            { id: "bookings", label: "Bookings", icon: Calendar },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as typeof activeTab)}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-body transition-all ${activeTab === id ? "bg-primary text-white font-medium" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
            >
              <Icon size={18} />
              {label}
            </button>
          ))}
        </nav>
        <div className="mt-auto">
          <button onClick={() => { logout(); navigate("/"); }} className="w-full text-left px-3 py-2 text-sm font-body text-destructive hover:bg-destructive/10 rounded-xl transition-colors">
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile tabs */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-20 flex">
        {[
          { id: "overview", label: "Overview", icon: LayoutDashboard },
          { id: "profile", label: "Profile", icon: Users },
          { id: "bookings", label: "Bookings", icon: Calendar },
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id as typeof activeTab)}
            className={`flex-1 flex flex-col items-center gap-1 py-3 text-xs font-body transition-colors ${activeTab === id ? "text-primary" : "text-muted-foreground"}`}
          >
            <Icon size={20} />
            {label}
          </button>
        ))}
      </div>

      {/* Main content */}
      <main className="flex-1 lg:ml-60 pb-24 lg:pb-0">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-heading font-bold text-foreground text-2xl sm:text-3xl">Welcome back, {user.name.split(" ")[0]}! 👋</h1>
            <p className="font-body text-muted-foreground mt-1">Here's how your coaching profile is performing</p>
          </div>

          {/* Overview tab */}
          {activeTab === "overview" && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <StatCard icon={Star} label="Avg Rating" value="4.9" color="bg-star" />
                <StatCard icon={Users} label="Sessions Completed" value="342" color="bg-primary" />
                <StatCard icon={Eye} label="Profile Views" value="1.2k" color="bg-primary-dark" />
                <StatCard icon={TrendingUp} label="This Month" value="₹ ---" color="bg-verified" />
              </div>
              <div className="bg-card rounded-2xl p-6 card-shadow">
                <h2 className="font-heading font-semibold text-foreground text-lg mb-4">Quick Stats</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-background rounded-xl">
                    <p className="font-heading font-bold text-2xl text-primary">3</p>
                    <p className="font-body text-xs text-muted-foreground mt-1">Upcoming Sessions</p>
                  </div>
                  <div className="text-center p-4 bg-background rounded-xl">
                    <p className="font-heading font-bold text-2xl text-verified">18</p>
                    <p className="font-body text-xs text-muted-foreground mt-1">This Month</p>
                  </div>
                  <div className="text-center p-4 bg-background rounded-xl">
                    <p className="font-heading font-bold text-2xl text-star">4.9 ★</p>
                    <p className="font-body text-xs text-muted-foreground mt-1">Overall Rating</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Profile tab */}
          {activeTab === "profile" && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
              <div className="bg-card rounded-2xl p-6 card-shadow">
                <h2 className="font-heading font-semibold text-foreground text-lg mb-6">Edit Your Profile</h2>
                <div className="space-y-6">
                  <div>
                    <label className="font-body text-sm font-medium text-foreground block mb-2">Bio</label>
                    <textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none"
                    />
                  </div>
                  <div>
                    <label className="font-body text-sm font-medium text-foreground block mb-2">Hourly Rate (₹)</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-heading">₹</span>
                      <input
                        type="number"
                        value={rate}
                        onChange={(e) => setRate(e.target.value)}
                        className="w-full h-12 pl-8 pr-4 rounded-lg border border-border bg-background font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="font-body text-sm font-medium text-foreground block mb-3">Sports (select all that apply)</label>
                    <div className="flex flex-wrap gap-2">
                      {SPORTS.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => toggleSport(s)}
                          className={`px-4 py-2 rounded-full text-sm font-body transition-all ${selectedSports.includes(s) ? "bg-primary text-white" : "bg-blue-tint text-primary border border-primary/20 hover:bg-primary/10"}`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="font-body text-sm font-medium text-foreground block mb-3">Session Type</label>
                    <div className="flex gap-3">
                      {["In-Person", "Online", "Both"].map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setSessionType(t)}
                          className={`flex-1 py-2.5 rounded-lg border text-sm font-body transition-all ${sessionType === t ? "border-primary bg-primary/10 text-primary font-medium" : "border-border text-muted-foreground hover:border-primary/40"}`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                  <motion.button
                    onClick={handleSave}
                    disabled={saving}
                    whileHover={{ scale: saving ? 1 : 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center gap-2 px-8 py-3 rounded-[10px] font-heading font-semibold text-sm transition-all ${saved ? "bg-verified text-white" : "gradient-button text-white"}`}
                  >
                    {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                    {saving ? "Saving..." : saved ? "Saved!" : "Save Profile"}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Bookings tab */}
          {activeTab === "bookings" && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
              <div className="bg-card rounded-2xl card-shadow overflow-hidden">
                <div className="p-6 border-b border-border">
                  <h2 className="font-heading font-semibold text-foreground text-lg">Recent Bookings</h2>
                </div>
                <div className="divide-y divide-border">
                  {mockBookings.map((booking) => (
                    <div key={booking.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-5 gap-3">
                      <div className="flex items-center gap-3">
                        <img src={`https://i.pravatar.cc/40?u=${booking.athlete}`} alt={booking.athlete} className="w-10 h-10 rounded-full" />
                        <div>
                          <p className="font-body font-medium text-foreground text-sm">{booking.athlete}</p>
                          <p className="font-body text-xs text-muted-foreground">{booking.date} · {booking.sessionType}</p>
                        </div>
                      </div>
                      <StatusPill status={booking.status} />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CoachDashboard;
