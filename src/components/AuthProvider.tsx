import { createContext, useContext, useState, useEffect } from "react";

interface User {
  fullName: string;
  email: string;
  university: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  signup: (data: Omit<User, "email"> & { email: string; password: string }) => void;
  login: (email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("currentUser");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [user]);

  const signup = (data: Omit<User, "email"> & { email: string; password: string }) => {
    const users: Record<string, { fullName: string; email: string; university: string; password: string }> =
      JSON.parse(localStorage.getItem("users") || "{}");

    if (users[data.email]) {
      throw new Error("An account with this email already exists");
    }

    users[data.email] = {
      fullName: data.fullName,
      email: data.email,
      university: data.university,
      password: data.password,
    };

    localStorage.setItem("users", JSON.stringify(users));
    const { password: _, ...userData } = data;
    setUser(userData);
  };

  const login = (email: string, password: string) => {
    const users: Record<string, { fullName: string; email: string; university: string; password: string }> =
      JSON.parse(localStorage.getItem("users") || "{}");

    const found = users[email];

    if (!found) {
      return { success: false, error: "No account found with this email" };
    }

    if (found.password !== password) {
      return { success: false, error: "Incorrect password" };
    }

    const { password: _, ...userData } = found;
    setUser(userData);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
