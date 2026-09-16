"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // localStorage is only available client-side; reading it during render
    // would mismatch the server-rendered HTML, so this must run post-mount.
    /* eslint-disable react-hooks/set-state-in-effect */
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  const persistSession = (newToken, newUser) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
  };

  const signUp = async ({ name, email, password }) => {
    const data = await apiFetch("/api/v1/auth/sign-up", {
      method: "POST",
      body: { name, email, password },
    });
    persistSession(data.data.token, data.data.user);
    return data;
  };

  const signIn = async ({ email, password }) => {
    const data = await apiFetch("/api/v1/auth/sign-in", {
      method: "POST",
      body: { email, password },
    });
    persistSession(data.data.token, data.data.user);
    return data;
  };

  const signOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    router.push("/sign-in");
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
