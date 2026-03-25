import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Star, CheckCircle2, Clock } from "lucide-react";
import type { Coach } from "@/data/mockData";

interface CoachCardProps {
  coach: Coach;
  index?: number;
}

export const CoachCard = ({ coach, index = 0 }: CoachCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 32 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay: index * 0.07 }}
    whileHover={{ y: -4, transition: { duration: 0.2 } }}
    className="bg-card rounded-2xl card-shadow hover:card-shadow-hover transition-shadow duration-200 overflow-hidden flex flex-col group"
  >
    {/* Card top */}
    <div className="relative p-5 pb-3">
      {/* Price pill */}
      <div className="absolute top-4 right-4 bg-primary text-white text-xs font-heading font-semibold px-3 py-1.5 rounded-full">
        ₹{coach.hourlyRate.toLocaleString()}/hr
      </div>

      {/* Avatar + verified */}
      <div className="relative w-fit mb-4">
        <img
          src={coach.avatar}
          alt={coach.name}
          className="w-20 h-20 rounded-full object-cover border-3 border-blue-tint"
          style={{ border: "3px solid hsl(var(--blue-tint))" }}
        />
        {coach.isVerified && (
          <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-verified flex items-center justify-center border-2 border-card">
            <CheckCircle2 size={12} className="text-white fill-white" />
          </span>
        )}
      </div>

      {/* Name */}
      <h3 className="font-heading font-semibold text-lg text-foreground leading-tight pr-16">{coach.name}</h3>

      {/* City */}
      <div className="flex items-center gap-1 mt-1 mb-3">
        <MapPin size={12} className="text-muted-foreground" />
        <span className="font-body text-xs text-muted-foreground">{coach.city}</span>
      </div>

      {/* Stars */}
      <div className="flex items-center gap-1.5 mb-3">
        <div className="flex">
          {Array.from({ length: 5 }, (_, i) => (
            <Star key={i} size={14} className={i < Math.floor(coach.avgRating) ? "fill-star text-star" : "text-muted"} />
          ))}
        </div>
        <span className="font-heading font-semibold text-sm text-foreground">{coach.avgRating}</span>
        <span className="text-muted-foreground text-xs font-body">({coach.totalSessions} sessions)</span>
      </div>

      {/* Sport pills */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {coach.sports.map((s) => (
          <span key={s} className="bg-blue-tint text-primary text-xs font-body font-medium px-2.5 py-1 rounded-full">
            {s}
          </span>
        ))}
      </div>

      {/* Experience */}
      <div className="flex items-center gap-1.5">
        <Clock size={13} className="text-muted-foreground" />
        <span className="text-muted-foreground text-xs font-body">{coach.experience} yrs experience</span>
      </div>
    </div>

    {/* View Profile */}
    <div className="px-5 pb-5 mt-auto pt-3">
      <Link to={`/coaches/${coach.id}`}>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-2.5 rounded-[10px] border-2 border-primary text-primary font-heading font-semibold text-sm hover:bg-primary hover:text-white transition-colors duration-200"
        >
          View Profile
        </motion.button>
      </Link>
    </div>
  </motion.div>
);
