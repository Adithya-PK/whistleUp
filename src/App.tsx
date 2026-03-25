import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence, motion } from "framer-motion";
import { AuthProvider } from "@/contexts/AuthContext";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

import Homepage from "./pages/Homepage";
import HowItWorks from "./pages/HowItWorks";
import CoachListing from "./pages/CoachListing";
import CoachProfile from "./pages/CoachProfile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CoachDashboard from "./pages/CoachDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const NO_FOOTER_PATHS = ["/login", "/signup", "/coach/dashboard"];

const AppRoutes = ({ darkMode, onToggleDark }: { darkMode: boolean; onToggleDark: () => void }) => {
  const location = useLocation();
  const showFooter = !NO_FOOTER_PATHS.some((p) => location.pathname.startsWith(p));

  return (
    <>
      <Navbar darkMode={darkMode} onToggleDark={onToggleDark} />
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -18 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <Routes location={location}>
            <Route path="/" element={<Homepage />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/coaches" element={<CoachListing />} />
            <Route path="/coaches/:id" element={<CoachProfile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/coach/dashboard" element={<CoachDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          {showFooter && <Footer />}
        </motion.div>
      </AnimatePresence>
    </>
  );
};

const App = () => {
  const [loading, setLoading] = useState(() => !sessionStorage.getItem("wu_loaded"));
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("wu_dark") === "true");

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  const handleToggleDark = () => {
    setDarkMode((d) => {
      localStorage.setItem("wu_dark", String(!d));
      return !d;
    });
  };

  const handleLoadDone = () => {
    sessionStorage.setItem("wu_loaded", "1");
    setLoading(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          {loading && <LoadingScreen onDone={handleLoadDone} />}
          {!loading && (
            <BrowserRouter>
              <AppRoutes darkMode={darkMode} onToggleDark={handleToggleDark} />
            </BrowserRouter>
          )}
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
