import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, X, SlidersHorizontal } from "lucide-react";
import { CoachCard } from "@/components/CoachCard";
import { mockCoaches } from "@/data/mockData";

const SPORTS = ["Cricket", "Football", "Badminton", "Yoga", "Pilates", "Stretching"];
const CITIES = ["Chennai", "Bengaluru", "Mumbai"];
const SESSION_TYPES = ["In-Person", "Online", "Both"];
const SKILL_LEVELS = ["Beginner", "Intermediate", "Advanced"];

const FilterPill = ({ label, active, onToggle }: { label: string; active: boolean; onToggle: () => void }) => (
  <button
    onClick={onToggle}
    className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-body font-medium transition-all whitespace-nowrap ${
      active ? "bg-primary text-white shadow-md" : "bg-card text-foreground border border-border hover:border-primary/50"
    }`}
  >
    {label}
    {active && <X size={14} />}
  </button>
);

const CoachListing = () => {
  const [search, setSearch] = useState("");
  const [selectedSport, setSelectedSport] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedSession, setSelectedSession] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("");

  const filtered = useMemo(() => {
    return mockCoaches.filter((c) => {
      const matchSearch = !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.sports.some((s) => s.toLowerCase().includes(search.toLowerCase()));
      const matchSport = !selectedSport || c.sports.includes(selectedSport);
      const matchCity = !selectedCity || c.city === selectedCity;
      const matchSession = !selectedSession || c.sessionTypes.some((t) => t === selectedSession || t === "Both");
      return matchSearch && matchSport && matchCity && matchSession;
    });
  }, [search, selectedSport, selectedCity, selectedSession]);

  const hasFilters = selectedSport || selectedCity || selectedSession || selectedSkill;

  const clearAll = () => {
    setSelectedSport("");
    setSelectedCity("");
    setSelectedSession("");
    setSelectedSkill("");
    setSearch("");
  };

  return (
    <div className="min-h-screen pt-16 bg-background">
      {/* Page header */}
      <div className="bg-off-white border-b border-border py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="font-heading font-bold text-foreground text-[clamp(1.75rem,3vw,2.5rem)] mb-2">Find a Coach</h1>
            <p className="font-body text-muted-foreground">Browse verified coaches across Chennai, Bengaluru & Mumbai</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Sticky filter bar */}
        <div className="sticky top-16 z-20 bg-card rounded-2xl card-shadow p-5 mb-8">
          {/* Search */}
          <div className="relative mb-4">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or sport..."
              className="w-full h-12 pl-12 pr-4 rounded-xl border border-border bg-background font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
          </div>

          {/* Filter pills */}
          <div className="flex flex-wrap gap-2 items-center">
            <div className="flex items-center gap-1.5 text-muted-foreground mr-2">
              <SlidersHorizontal size={16} />
              <span className="text-xs font-body font-medium uppercase tracking-wider">Filters:</span>
            </div>

            {/* Sport filter */}
            <div className="flex flex-wrap gap-2">
              {SPORTS.map((s) => (
                <FilterPill key={s} label={s} active={selectedSport === s} onToggle={() => setSelectedSport(selectedSport === s ? "" : s)} />
              ))}
            </div>

            <div className="w-px h-6 bg-border mx-1 hidden sm:block" />

            {/* City filter */}
            {CITIES.map((c) => (
              <FilterPill key={c} label={c} active={selectedCity === c} onToggle={() => setSelectedCity(selectedCity === c ? "" : c)} />
            ))}

            <div className="w-px h-6 bg-border mx-1 hidden sm:block" />

            {SESSION_TYPES.map((t) => (
              <FilterPill key={t} label={t} active={selectedSession === t} onToggle={() => setSelectedSession(selectedSession === t ? "" : t)} />
            ))}

            {hasFilters && (
              <button onClick={clearAll} className="text-xs text-primary font-body font-medium hover:underline ml-2">
                Clear all
              </button>
            )}
          </div>

          {/* Results count */}
          <p className="font-body text-sm text-muted-foreground mt-3">
            <span className="font-semibold text-foreground">{filtered.length}</span> coach{filtered.length !== 1 ? "es" : ""} found
          </p>
        </div>

        {/* Coach grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((coach, i) => (
              <CoachCard key={coach.id} coach={coach} index={i} />
            ))}
          </div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24">
            <div className="text-6xl mb-6">🔍</div>
            <h3 className="font-heading font-semibold text-xl text-foreground mb-2">No coaches found</h3>
            <p className="font-body text-muted-foreground mb-6">Try adjusting your filters or search terms</p>
            <button onClick={clearAll} className="gradient-button text-white font-heading font-semibold px-6 py-3 rounded-[10px]">
              Clear Filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CoachListing;
