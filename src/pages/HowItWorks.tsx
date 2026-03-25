import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Search, UserCheck, Calendar, Briefcase, TrendingUp, Users } from "lucide-react";

const StepCard = ({ num, icon: Icon, title, desc, delay }: { num: string; icon: React.ElementType; title: string; desc: string; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="bg-card rounded-2xl p-8 card-shadow flex flex-col items-start"
  >
    <span className="font-heading font-bold text-5xl text-primary mb-5 leading-none">{num}</span>
    <div className="w-14 h-14 rounded-full bg-blue-tint flex items-center justify-center mb-5">
      <Icon size={26} className="text-primary" />
    </div>
    <h3 className="font-heading font-semibold text-xl text-foreground mb-3">{title}</h3>
    <p className="font-body text-muted-foreground leading-relaxed">{desc}</p>
  </motion.div>
);

const HowItWorks = () => (
  <div className="min-h-screen pt-16">
    {/* Hero strip */}
    <section className="gradient-hero py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <h1 className="font-heading font-bold text-white mb-4" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>How it Works</h1>
          <p className="font-body text-white/80 text-lg max-w-xl mx-auto">A simple, transparent process to connect athletes with the right coaches.</p>
        </motion.div>
      </div>
    </section>

    {/* For Athletes */}
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
          <span className="bg-blue-tint text-primary font-body text-sm font-medium px-4 py-1.5 rounded-full mb-3 inline-block">For Athletes</span>
          <h2 className="font-heading font-bold text-foreground" style={{ fontSize: "clamp(1.625rem, 3vw, 2.25rem)" }}>Start Your Training Journey</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <StepCard num="01" icon={Search} title="Search & Filter" desc="Browse hundreds of certified coaches by sport, city, session type, and skill level. Find the right fit for your goals." delay={0} />
          <StepCard num="02" icon={UserCheck} title="View Profile & Connect" desc="Explore detailed profiles, read authentic reviews, and understand the coach's training philosophy before reaching out." delay={0.1} />
          <StepCard num="03" icon={Calendar} title="Book & Train" desc="Request your first session, confirm the schedule, and begin your transformation with your chosen coach." delay={0.2} />
        </div>
      </div>
    </section>

    {/* For Coaches */}
    <section className="py-20 bg-off-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
          <span className="bg-primary/10 text-primary font-body text-sm font-medium px-4 py-1.5 rounded-full mb-3 inline-block">For Coaches</span>
          <h2 className="font-heading font-bold text-foreground" style={{ fontSize: "clamp(1.625rem, 3vw, 2.25rem)" }}>Grow Your Coaching Business</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <StepCard num="01" icon={Briefcase} title="Create Your Profile" desc="Set up your public coach profile with your sports, bio, experience, certifications, and hourly rate in minutes." delay={0} />
          <StepCard num="02" icon={Calendar} title="Set Your Schedule" desc="Define your availability, session types (online/in-person), and the age groups you specialize in training." delay={0.1} />
          <StepCard num="03" icon={TrendingUp} title="Grow Your Clientele" desc="Receive booking requests, build your reputation through reviews, and grow a loyal base of athletes." delay={0.2} />
        </div>
      </div>
    </section>

    {/* CTA Banner */}
    <section className="py-20 gradient-hero">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <Users size={48} className="text-white/70 mx-auto mb-6" />
          <h2 className="font-heading font-bold text-white mb-4" style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}>Ready to Find Your Coach?</h2>
          <p className="font-body text-white/80 text-lg mb-8">Join thousands of athletes training smarter with verified coaches across India.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/coaches">
              <motion.button whileHover={{ scale: 1.04 }} className="bg-white text-primary font-heading font-semibold px-8 py-4 rounded-[10px] hover:bg-white/90 transition-colors">
                Browse Coaches
              </motion.button>
            </Link>
            <Link to="/signup">
              <motion.button whileHover={{ scale: 1.04 }} className="border-2 border-white text-white font-heading font-semibold px-8 py-4 rounded-[10px] hover:bg-white/10 transition-colors">
                Sign Up Free
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  </div>
);

export default HowItWorks;
