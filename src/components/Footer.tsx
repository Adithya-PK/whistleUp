import { Link } from "react-router-dom";

export const Footer = () => (
  <footer className="bg-navy text-white pt-16 pb-6">
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-12 border-b border-white/10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-10 h-10 rounded-full gradient-hero flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 44 44" fill="none">
                <circle cx="22" cy="22" r="20" stroke="white" strokeWidth="2.5" fill="none" />
                <path d="M14 22 C14 17 17 14 22 14 C27 14 30 17 30 22" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                <path d="M18 22 C18 19.5 19.8 18 22 18 C24.2 18 26 19.5 26 22" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
                <circle cx="22" cy="25" r="2.5" fill="white" />
                <path d="M22 27.5 L22 31" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <path d="M22 31 L26 31" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <span className="font-heading font-bold text-xl">Whistle-Up</span>
          </div>
          <p className="text-white/60 font-body text-sm leading-relaxed max-w-xs">
            Connecting athletes and seniors with certified sports and fitness coaches across India.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-heading font-semibold text-sm uppercase tracking-widest text-white/50 mb-4">Quick Links</h4>
          <ul className="space-y-3">
            {[
              { label: "Find a Coach", to: "/coaches" },
              { label: "How it Works", to: "/how-it-works" },
              { label: "Login", to: "/login" },
              { label: "Sign Up", to: "/signup" },
            ].map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="text-white/65 hover:text-white font-body text-sm transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Cities */}
        <div>
          <h4 className="font-heading font-semibold text-sm uppercase tracking-widest text-white/50 mb-4">Cities Served</h4>
          <ul className="space-y-3">
            {["Chennai", "Bengaluru", "Mumbai"].map((city) => (
              <li key={city} className="text-white/65 font-body text-sm">📍 {city}</li>
            ))}
          </ul>
          <div className="mt-6">
            <p className="text-white/40 font-body text-xs">500+ Coaches · 3 Cities · Verified Experts</p>
          </div>
        </div>
      </div>

      <div className="pt-6 text-center">
        <p className="text-white/40 font-body text-sm">© Whistle-Up 2025 · Made with ❤️ in India</p>
      </div>
    </div>
  </footer>
);
