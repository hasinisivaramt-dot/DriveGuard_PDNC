import { createContext, useContext, useState, useCallback, useMemo } from "react";
import * as authStore from "../lib/mockAuth.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => authStore.getSession());

  const login = useCallback((credentials) => {
    const s = authStore.login(credentials);
    setSession(s);
    return s;
  }, []);

  const register = useCallback((details) => {
    const s = authStore.register(details);
    setSession(s);
    return s;
  }, []);

  const logout = useCallback(() => {
    authStore.logout();
    setSession(null);
  }, []);

  const completeOnboarding = useCallback((vehicleProfile) => {
    setSession((current) => {
      if (!current) return current;
      authStore.completeOnboarding(current.user.id, vehicleProfile);
      return { ...current, user: { ...current.user, onboardingComplete: true } };
    });
  }, []);

  const completeTechnicianRegistration = useCallback((profileData) => {
    setSession((current) => {
      if (!current) return current;
      authStore.completeTechnicianRegistration(current.user.id, profileData);
      return { ...current, user: { ...current.user, technicianProfileCompleted: true } };
    });
  }, []);

  const value = useMemo(
    () => ({
      user: session?.user ?? null,
      isAuthenticated: Boolean(session),
      login,
      register,
      logout,
      completeOnboarding,
      completeTechnicianRegistration,
    }),
    [session, login, register, logout, completeOnboarding, completeTechnicianRegistration]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
