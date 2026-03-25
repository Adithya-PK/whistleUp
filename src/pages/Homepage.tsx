import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Star, Users, MapPin, Zap, Shield, Calendar } from "lucide-react";
import { CoachCard } from "@/components/CoachCard";
import { mockCoaches } from "@/data/mockData";

const TYPING_WORDS = ["fitness guide", "sports coach", "personal trainer", "yoga instructor"];

const TypewriterText = () => {
  const [wordIdx, setWordIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const target = TYPING_WORDS[wordIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < target.length) {
      timeout = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === target.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setWordIdx((i) => (i + 1) % TYPING_WORDS.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, wordIdx]);

  return (
    <span className="text-white border-b-4 border-white/70 pb-1">
      {displayed}
      <span className="animate-blink">|</span>
    </span>
  );
};

const FloatingCoachCard = () => (
  <motion.div
    animate={{ y: [0, -14, 0] }}
    transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
    className="glass-card rounded-2xl p-6 w-72 hidden lg:block"
  >
    <div className="flex items-center gap-3 mb-4">
      <img src="https://i.pravatar.cc/150?img=1" alt="Coach" className="w-14 h-14 rounded-full border-2 border-white/50" />
      <div>
        <p className="font-heading font-semibold text-white text-sm">Arjun Krishnamurthy</p>
        <p className="text-white/70 text-xs font-body">Cricket Coach · Chennai</p>
      </div>
    </div>
    <div className="flex items-center gap-1 mb-3">
      {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={14} className="fill-star text-star" />)}
      <span className="text-white/80 text-xs ml-1 font-body">4.9 (342 sessions)</span>
    </div>
    <div className="flex gap-2 mb-4">
      <span className="bg-white/20 text-white text-xs px-2.5 py-1 rounded-full font-body">Cricket</span>
      <span className="bg-white/20 text-white text-xs px-2.5 py-1 rounded-full font-body">Fitness</span>
    </div>
    <div className="flex items-center justify-between">
      <span className="text-white font-heading font-bold text-lg">₹1,200/hr</span>
      <span className="bg-white/20 text-white text-xs px-3 py-1.5 rounded-full font-body">✓ Verified</span>
    </div>
  </motion.div>
);

const FeatureCard = ({ icon: Icon, title, desc, delay }: { icon: React.ElementType; title: string; desc: string; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 32 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="bg-card rounded-2xl p-7 card-shadow hover:card-shadow-hover transition-shadow flex flex-col items-start"
  >
    <div className="w-12 h-12 rounded-full bg-blue-tint flex items-center justify-center mb-4">
      <Icon size={22} className="text-primary" />
    </div>
    <h3 className="font-heading font-semibold text-lg text-foreground mb-2">{title}</h3>
    <p className="font-body text-sm text-muted-foreground leading-relaxed">{desc}</p>
  </motion.div>
);

const StepCard = ({ num, icon: Icon, title, desc, delay }: { num: string; icon: React.ElementType; title: string; desc: string; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="flex flex-col items-center text-center px-6"
  >
    <span className="font-heading font-bold text-5xl text-primary mb-4 leading-none">{num}</span>
    <div className="w-14 h-14 rounded-full bg-blue-tint flex items-center justify-center mb-4">
      <Icon size={26} className="text-primary" />
    </div>
    <h3 className="font-heading font-semibold text-xl text-foreground mb-2">{title}</h3>
    <p className="font-body text-sm text-muted-foreground leading-relaxed max-w-xs">{desc}</p>
  </motion.div>
);

const Homepage = () => {
  const seniorCoaches = mockCoaches.filter((c) => c.sports.some((s) => ["Yoga", "Stretching", "Pilates"].includes(s))).slice(0, 2);

  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section className="gradient-hero min-h-screen flex items-center pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 w-full flex flex-col lg:flex-row items-center gap-12">
          {/* Left */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <h1 className="font-heading font-bold text-white leading-tight mb-6" style={{ fontSize: "clamp(2.125rem, 5vw, 3.5rem)" }}>
                Find the perfect<br />
                <TypewriterText />
              </h1>
              <p className="font-body text-white/80 text-lg mb-8 max-w-lg mx-auto lg:mx-0">
                Connect with certified coaches for cricket, football, yoga, and more. Learn from the best, train at your own pace, right in your city.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
                <Link to="/coaches">
                  <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="bg-white text-primary font-heading font-semibold text-sm px-8 py-4 rounded-[10px] hover:bg-white/90 transition-colors min-w-[180px]">
                    Discover Coaches
                  </motion.button>
                </Link>
                <Link to="/signup">
                  <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="border-2 border-white text-white font-heading font-semibold text-sm px-8 py-4 rounded-[10px] hover:bg-white/10 transition-colors min-w-[180px]">
                    Join as a Coach
                  </motion.button>
                </Link>
              </div>
              {/* Trust strip */}
              <div className="flex items-center justify-center lg:justify-start gap-6 flex-wrap">
                {["500+ Coaches", "3 Cities", "Verified Experts"].map((t, i) => (
                  <div key={t} className="flex items-center gap-2">
                    {i > 0 && <span className="text-white/40 hidden sm:block">·</span>}
                    <CheckCircle2 size={16} className="text-white/70" />
                    <span className="text-white/80 font-body text-sm">{t}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right floating card */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.3 }}>
            <FloatingCoachCard />
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <h2 className="font-heading font-bold text-foreground mb-4" style={{ fontSize: "clamp(1.625rem, 3vw, 2.25rem)" }}>Why Choose Whistle-Up?</h2>
            <p className="font-body text-muted-foreground max-w-xl mx-auto">The smartest way to find certified sports coaches in your city.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard icon={Shield} title="Verified Experts" desc="Every coach on Whistle-Up is background-checked and holds valid certifications. Train with confidence." delay={0} />
            <FeatureCard icon={Zap} title="Any Sport, Any Level" desc="Cricket, Football, Yoga, Pilates and more. Whether you're a beginner or competitive — we have you covered." delay={0.1} />
            <FeatureCard icon={Calendar} title="Easy Booking" desc="Browse profiles, check availability, and request sessions in just a few taps. Simple and transparent." delay={0.2} />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS PREVIEW */}
      <section className="py-20 bg-off-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <h2 className="font-heading font-bold text-foreground mb-3" style={{ fontSize: "clamp(1.625rem, 3vw, 2.25rem)" }}>How it Works</h2>
            <p className="font-body text-muted-foreground">Get started in 3 simple steps</p>
          </motion.div>
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
            <StepCard num="01" icon={Users} title="Search & Filter" desc="Browse coaches by sport, city, and session type. Use filters to narrow down to your perfect match." delay={0} />
            <div className="hidden md:flex items-center justify-center absolute left-1/3 right-1/3 top-20 pointer-events-none">
            </div>
            <StepCard num="02" icon={Star} title="View & Connect" desc="Explore coach profiles, read reviews, and understand their training approach before connecting." delay={0.1} />
            <StepCard num="03" icon={Zap} title="Book & Train" desc="Request a session, confirm timing, and start your training journey with your chosen coach." delay={0.2} />
          </div>
          <div className="text-center mt-10">
            <Link to="/how-it-works" className="inline-flex items-center gap-2 text-primary font-heading font-semibold hover:gap-3 transition-all">
              See full details <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* FOR SENIORS */}
      <section className="py-20" style={{ backgroundColor: "hsl(var(--blue-tint))" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mx-auto text-center mb-10">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <span className="bg-primary/10 text-primary font-body text-sm font-medium px-4 py-1.5 rounded-full mb-4 inline-block">For Seniors</span>
              <h2 className="font-heading font-bold text-foreground mb-4 text-[clamp(1.625rem,3vw,2.25rem)]">Stay Active at Any Age</h2>
              <p className="font-body text-muted-foreground" style={{ fontSize: "18px", lineHeight: "1.7" }}>
                It's never too late to start. Our senior-friendly coaches specialize in gentle, low-impact sessions designed around your comfort and pace. Feel stronger, more flexible, and more confident every day.
              </p>
              <div className="flex flex-wrap justify-center gap-3 mt-6">
                {["Home Sessions", "Gentle Pace", "Verified Coaches"].map((chip) => (
                  <span key={chip} className="bg-white text-primary font-body text-sm px-4 py-2 rounded-full border border-primary/20 font-medium">
                    ✓ {chip}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {seniorCoaches.map((coach, i) => (
              <CoachCard key={coach.id} coach={coach} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED COACHES */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 gap-4">
            <div>
              <h2 className="font-heading font-bold text-foreground mb-2 text-[clamp(1.625rem,3vw,2.25rem)]">Featured Coaches</h2>
              <p className="font-body text-muted-foreground">Top-rated coaches across all sports and cities</p>
            </div>
            <Link to="/coaches">
              <button className="gradient-button text-white font-heading font-semibold text-sm px-6 py-3 rounded-[10px] hover:opacity-90 transition-opacity flex items-center gap-2">
                View All <ArrowRight size={16} />
              </button>
            </Link>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockCoaches.slice(0, 6).map((coach, i) => (
              <CoachCard key={coach.id} coach={coach} index={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
