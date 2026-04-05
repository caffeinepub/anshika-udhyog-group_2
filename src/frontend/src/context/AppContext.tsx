import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import type { User } from "../backend";
import { useActor } from "../hooks/useActor";
import {
  type SessionUser,
  clearSession,
  getSession,
  setSession,
} from "../utils/auth";
import { hashPassword, verifyPassword } from "../utils/auth";

export interface SiteSettings {
  orgName: string;
  tagline: string;
  subtitle: string;
  logoUrl: string;
  whatsappNumber: string;
  footerText: string;
  address: string;
  phone: string;
  email: string;
  website: string;
}

const DEFAULT_SETTINGS: SiteSettings = {
  orgName: "Anshika Udhyog Group",
  tagline: "Self Employment Revolution Scheme",
  subtitle: "Empowering Women Through Self-Employment",
  logoUrl: "/assets/generated/anshika-logo.dim_200x200.png",
  whatsappNumber: "918349600835",
  footerText: "Empowering Women — Building a Stronger India",
  address: "Anshika Udhyog Group, India",
  phone: "+91 83496 00835",
  email: "info@anshikaudhyog.org",
  website: "www.anshikaudhyog.org",
};

interface AppContextType {
  contentMap: Record<string, unknown>;
  settings: SiteSettings;
  currentUser: SessionUser | null;
  isAdmin: boolean;
  isLoading: boolean;
  saveContent: (key: string, value: unknown) => Promise<void>;
  login: (
    email: string,
    password: string,
  ) => Promise<{ success: boolean; role?: string; error?: string }>;
  logout: () => void;
  refreshContent: () => Promise<void>;
}

const AppContext = createContext<AppContextType | null>(null);

export function useAppContext(): AppContextType {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be inside AppProvider");
  return ctx;
}

const ADMIN_EMAIL = "admin@anshika.org";
const ADMIN_PASS = "Admin@123";
const ADMIN_HASH = hashPassword(ADMIN_PASS);

export function AppProvider({ children }: { children: ReactNode }) {
  const { actor, isFetching } = useActor();
  const [contentMap, setContentMap] = useState<Record<string, unknown>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<SessionUser | null>(
    getSession(),
  );

  const settings: SiteSettings = {
    ...DEFAULT_SETTINGS,
    ...((contentMap.settings as Partial<SiteSettings>) || {}),
  };

  const loadContent = useCallback(async () => {
    if (!actor) return;
    try {
      const entries = await actor.getAllContent();
      const map: Record<string, unknown> = {};
      for (const [key, value] of entries) {
        try {
          map[key] = JSON.parse(value);
        } catch {
          map[key] = value;
        }
      }
      setContentMap(map);
    } catch {
      // ignore
    } finally {
      setIsLoading(false);
    }
  }, [actor]);

  useEffect(() => {
    if (actor && !isFetching) {
      loadContent();
    } else if (!isFetching) {
      setIsLoading(false);
    }
  }, [actor, isFetching, loadContent]);

  const saveContent = useCallback(
    async (key: string, value: unknown) => {
      if (!actor) return;
      const str = JSON.stringify(value);
      await actor.saveContent(key, str);
      setContentMap((prev) => ({ ...prev, [key]: value }));
    },
    [actor],
  );

  const refreshContent = useCallback(async () => {
    await loadContent();
  }, [loadContent]);

  const login = useCallback(
    async (email: string, password: string) => {
      // Admin hardcoded
      if (email === ADMIN_EMAIL) {
        const passHash = hashPassword(password);
        if (passHash !== ADMIN_HASH) {
          return { success: false, error: "Invalid credentials" };
        }
        const session: SessionUser = {
          userId: "admin",
          role: "admin",
          name: "Administrator",
          email,
        };
        setSession(session);
        setCurrentUser(session);
        return { success: true, role: "admin" };
      }

      if (!actor) return { success: false, error: "System not ready" };

      try {
        const user = await actor.getUserByEmail(email);
        if (!user) return { success: false, error: "User not found" };
        if (!verifyPassword(password, user.passwordHash))
          return { success: false, error: "Invalid credentials" };
        if (user.status === "pending")
          return {
            success: false,
            error: "Your account is pending admin approval",
          };
        if (user.status === "rejected")
          return { success: false, error: "Your account has been rejected" };

        const session: SessionUser = {
          userId: user.id,
          role: user.role,
          name: user.name,
          email: user.email,
        };
        setSession(session);
        setCurrentUser(session);
        return { success: true, role: user.role };
      } catch {
        return { success: false, error: "Login failed. Please try again." };
      }
    },
    [actor],
  );

  const logout = useCallback(() => {
    clearSession();
    setCurrentUser(null);
  }, []);

  const isAdmin = currentUser?.role === "admin";

  return (
    <AppContext.Provider
      value={{
        contentMap,
        settings,
        currentUser,
        isAdmin,
        isLoading,
        saveContent,
        login,
        logout,
        refreshContent,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
