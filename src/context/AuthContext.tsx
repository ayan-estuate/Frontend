"use client";
import React, { createContext, useState, useEffect, useContext } from "react";
import { useRouter, usePathname } from "next/navigation";

interface AuthContextType {
  isAuthenticated: boolean;
  user: string | null;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname(); // Get the current route

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    // Prevent redirection if the user is on the signup page
    if (!accessToken && pathname !== "/signup") {
      setIsAuthenticated(false);
      router.push("/login");
    } else if (accessToken) {
      setIsAuthenticated(true);
    }
  }, [router, pathname]); // React to route changes

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setIsAuthenticated(false);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
