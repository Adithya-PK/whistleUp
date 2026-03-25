import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Star, CheckCircle2, Clock, Users, MessageSquare, Award, ArrowLeft } from "lucide-react";
import { mockCoaches } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";

const CoachProfile = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const coach = mockCoaches.find((c) => c.id === id) || mockCoaches[0];

  return (
    <div className="min-h-screen pt-16 bg-background">
      {/* Back */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        <Link to="/coaches" className="inline-flex items-center gap-2 text-primary font-body text-sm hover:gap-3 transition-all">
          <ArrowLeft size={16} /> Back to coaches
        </Link>
      </div>

      {/* Hero strip */}
      <div className="gradient-hero py-12 mt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6">
            <div className="relative">
              <img src={coach.avatar} alt={coach.name} className="w-28 h-28 rounded-full border-4 border-white/30 object-cover" />
              {coach.isVerified && (
                <span className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-verified border-2 border-white flex items-center justify-center">
                  <CheckCircle2 size={16} className="text-white" />
                </span>
              )}
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-1">
                <h1 className="font-heading font-bold text-white text-3xl">{coach.name}</h1>
                {coach.isVerified && (
                  <span className="bg-verified/20 text-white text-xs font-body px-3 py-1 rounded-full border border-verified/40">✓ Verified Coach</span>
                )}
              </div>
              <div className="flex items-center gap-2 mb-3">
                <MapPin size={14} className="text-white/70" />
                <span className="text-white/80 font-body text-sm">{coach.city}</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                {coach.sports.map((s) => (
                  <span key={s} className="bg-white/20 text-white text-xs font-body px-3 py-1 rounded-full border border-white/20">{s}</span>
                ))}
              </div>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} size={16} className={i < Math.floor(coach.avgRating) ? "fill-star text-star" : "text-white/30"} />
                  ))}
                  <span className="text-white font-heading font-semibold ml-1">{coach.avgRating}</span>
                </div>
                <span className="text-white/70 font-body text-sm">{coach.totalSessions} sessions</span>
                <span className="text-white font-heading font-bold text-xl">₹{coach.hourlyRate.toLocaleString()}/hr</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left / main */}
          <div className="flex-1 min-w-0">
            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
              {[
                { icon: Clock, label: "Experience", value: `${coach.experience} yrs` },
                { icon: Star, label: "Avg Rating", value: coach.avgRating.toString() },
                { icon: Users, label: "Sessions", value: coach.totalSessions.toString() },
                { icon: MapPin, label: "City", value: coach.city },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="bg-card rounded-2xl p-5 card-shadow text-center">
                  <Icon size={22} className="text-primary mx-auto mb-2" />
                  <p className="font-heading font-bold text-foreground text-xl">{value}</p>
                  <p className="font-body text-xs text-muted-foreground mt-1">{label}</p>
                </div>
              ))}
            </div>

            {/* About */}
            <section className="mb-10">
              <h2 className="font-heading font-bold text-foreground text-2xl mb-4">About</h2>
              <p className="font-body text-muted-foreground leading-relaxed">{coach.bio}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="text-sm font-body text-muted-foreground">Age groups:</span>
                {coach.ageGroups.map((a) => (
                  <span key={a} className="bg-blue-tint text-primary text-xs font-body px-3 py-1 rounded-full">{a}</span>
                ))}
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="text-sm font-body text-muted-foreground">Session types:</span>
                {coach.sessionTypes.map((t) => (
                  <span key={t} className="bg-blue-tint text-primary text-xs font-body px-3 py-1 rounded-full">{t}</span>
                ))}
              </div>
            </section>

            {/* Certifications */}
            <section className="mb-10">
              <h2 className="font-heading font-bold text-foreground text-2xl mb-4">Certifications</h2>
              <ul className="space-y-3">
                {coach.certifications.map((cert) => (
                  <li key={cert} className="flex items-center gap-3">
                    <Award size={18} className="text-verified flex-shrink-0" />
                    <span className="font-body text-foreground text-sm">{cert}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Reviews */}
            <section>
              <h2 className="font-heading font-bold text-foreground text-2xl mb-6">
                <MessageSquare size={22} className="inline mr-2 text-primary" />
                Reviews
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {coach.reviews.map((review, i) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-card rounded-2xl p-5 card-shadow"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <img src={review.avatar} alt={review.author} className="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <p className="font-heading font-semibold text-sm text-foreground">{review.author}</p>
                        <p className="font-body text-xs text-muted-foreground">{review.date}</p>
                      </div>
                    </div>
                    <div className="flex mb-3">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star key={i} size={14} className={i < review.rating ? "fill-star text-star" : "text-muted"} />
                      ))}
                    </div>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">"{review.text}"</p>
                  </motion.div>
                ))}
              </div>
            </section>
          </div>

          {/* Right sidebar — desktop sticky */}
          <div className="lg:w-72 flex-shrink-0">
            <div className="lg:sticky lg:top-20 bg-card rounded-2xl p-6 card-shadow">
              <div className="text-center mb-6">
                <p className="font-body text-sm text-muted-foreground mb-1">Starting from</p>
                <p className="font-heading font-bold text-3xl text-foreground">₹{coach.hourlyRate.toLocaleString()}<span className="text-base text-muted-foreground font-normal">/hr</span></p>
              </div>
              <div className="flex gap-2 mb-5">
                {coach.sessionTypes.map((t) => (
                  <span key={t} className="flex-1 text-center text-xs font-body bg-blue-tint text-primary py-2 px-2 rounded-lg">{t}</span>
                ))}
              </div>
              {user ? (
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full gradient-button text-white font-heading font-semibold py-3.5 rounded-[10px] hover:opacity-90 transition-opacity">
                  Request Booking
                </motion.button>
              ) : (
                <Link to="/login">
                  <motion.button whileHover={{ scale: 1.02 }} className="w-full gradient-button text-white font-heading font-semibold py-3.5 rounded-[10px] hover:opacity-90 transition-opacity">
                    Sign in to Book
                  </motion.button>
                </Link>
              )}
              <p className="text-center font-body text-xs text-muted-foreground mt-3">No booking fees · Cancel anytime</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile FAB */}
      <div className="lg:hidden fixed bottom-6 left-0 right-0 px-6 z-20">
        {user ? (
          <motion.button whileHover={{ scale: 1.02 }} className="w-full gradient-button text-white font-heading font-semibold py-4 rounded-2xl shadow-2xl">
            Book Session — ₹{coach.hourlyRate.toLocaleString()}/hr
          </motion.button>
        ) : (
          <Link to="/login">
            <button className="w-full gradient-button text-white font-heading font-semibold py-4 rounded-2xl shadow-2xl">
              Sign in to Book
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default CoachProfile;
