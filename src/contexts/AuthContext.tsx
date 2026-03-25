import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "athlete" | "coach";
  city: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, password: string, role: "athlete" | "coach", city: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

// Demo users for prototype
const DEMO_USERS: (User & { password: string })[] = [
  { id: "demo-coach", name: "Arjun Krishnamurthy", email: "coach@demo.com", role: "coach", city: "Chennai", password: "demo123" },
  { id: "demo-athlete", name: "Rohan Mehta", email: "athlete@demo.com", role: "athlete", city: "Mumbai", password: "demo123" },
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem("wu_token");
    const savedUser = localStorage.getItem("wu_user");
    if (savedToken && savedUser) {
      try {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem("wu_token");
        localStorage.removeItem("wu_user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    // Simulate API call delay
    await new Promise((r) => setTimeout(r, 800));
    const found = DEMO_USERS.find((u) => u.email === email && u.password === password);
    if (found) {
      const { password: _, ...userData } = found;
      const fakeToken = btoa(JSON.stringify(userData));
      setUser(userData);
      setToken(fakeToken);
      localStorage.setItem("wu_token", fakeToken);
      localStorage.setItem("wu_user", JSON.stringify(userData));
      setIsLoading(false);
      return { success: true };
    }
    setIsLoading(false);
    return { success: false, error: "Invalid email or password. Try coach@demo.com / demo123" };
  };

  const signup = async (name: string, email: string, _password: string, role: "athlete" | "coach", city: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    const newUser: User = { id: `user-${Date.now()}`, name, email, role, city };
    const fakeToken = btoa(JSON.stringify(newUser));
    setUser(newUser);
    setToken(fakeToken);
    localStorage.setItem("wu_token", fakeToken);
    localStorage.setItem("wu_user", JSON.stringify(newUser));
    setIsLoading(false);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("wu_token");
    localStorage.removeItem("wu_user");
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
