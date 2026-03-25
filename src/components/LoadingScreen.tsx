import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const RippleRing = ({ delay }: { delay: number }) => (
  <motion.div
    className="absolute rounded-full border-2 border-white/40"
    style={{ width: 90, height: 90 }}
    initial={{ scale: 0.8, opacity: 0.6 }}
    animate={{ scale: 3.5, opacity: 0 }}
    transition={{
      duration: 2,
      delay,
      repeat: Infinity,
      repeatDelay: 0.3,
      ease: "easeOut"
    }}
  />
);

export const LoadingScreen = ({ onDone }: { onDone: () => void }) => {
  const [exit, setExit] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setExit(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (exit) {
      const t = setTimeout(onDone, 600);
      return () => clearTimeout(t);
    }
  }, [exit, onDone]);

  return (
    <AnimatePresence>
      {!exit && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: "linear-gradient(135deg, #1E3A8A, #2563EB, #60A5FA)" }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Ripple rings */}
          <div className="relative flex items-center justify-center mb-10">
            <RippleRing delay={0} />
            <RippleRing delay={0.4} />
            <RippleRing delay={0.8} />

            {/* Logo */}
            <motion.div
              className="relative z-10"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.15, 1], opacity: 1 }}
              transition={{
                duration: 0.8,
                ease: [0.175, 0.885, 0.32, 1.275]
              }}
            >
              <img
                src="/logo2.png"
                alt="Whistle-Up Logo"
                className="w-24 h-24 rounded-full object-cover shadow-2xl"
              />
            </motion.div>
          </div>

          {/* Title */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
          >
            <motion.h1
              className="font-heading font-bold text-white tracking-widest"
              style={{ fontSize: "clamp(2rem, 5vw, 3rem)", letterSpacing: "0.15em" }}
              initial={{ opacity: 0, letterSpacing: "0.4em" }}
              animate={{ opacity: 1, letterSpacing: "0.15em" }}
              transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
            >
              WHISTLE-UP
            </motion.h1>
            <motion.p
              className="text-white/60 font-body text-sm mt-2 tracking-widest uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              Find Your Coach
            </motion.p>
          </motion.div>

          {/* Bottom progress bar */}
          <motion.div
            className="absolute bottom-10 w-32 h-0.5 bg-white/20 rounded-full overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <motion.div
              className="h-full bg-white rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.8, duration: 1.6, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};