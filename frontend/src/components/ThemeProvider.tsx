
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type NexusTheme =
  | "emerald"
  | "glacier"
  | "amethyst";

export const NEXUS_THEMES = [
  {
    id: "emerald",
    name: "Emerald",
    color: "#80eac0",
    edition: "Signature edition",
    description: "The original NEXUS experience.",
  },
  {
    id: "glacier",
    name: "Glacier",
    color: "#91c8ff",
    edition: "Precision edition",
    description: "Clarity, precision and intelligence.",
  },
  {
    id: "amethyst",
    name: "Amethyst",
    color: "#c4adff",
    edition: "Intelligence edition",
    description: "A new dimension of autonomy.",
  },
] as const;

const STORAGE_KEY = "agentvault-preferences";

type Preferences = {
  theme: NexusTheme;
  motion: boolean;
};

const DEFAULT_PREFERENCES: Preferences = {
  theme: "emerald",
  motion: true,
};

type ThemeContextType = {
  theme: NexusTheme;
  motion: boolean;
  ready: boolean;
  storageAvailable: boolean;
  setTheme: (theme: NexusTheme) => void;
  setMotion: (motion: boolean) => void;
  resetPreferences: () => void;
};

const ThemeContext =
  createContext<ThemeContextType | null>(null);

function isValidTheme(
  value: unknown
): value is NexusTheme {
  return (
    value === "emerald" ||
    value === "glacier" ||
    value === "amethyst"
  );
}

export default function ThemeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [preferences, setPreferences] =
    useState<Preferences>(DEFAULT_PREFERENCES);

  const [ready, setReady] = useState(false);

  const [storageAvailable, setStorageAvailable] =
    useState(true);

  // Restore saved preferences.

  useEffect(() => {
    try {
      const stored = localStorage.getItem(
        STORAGE_KEY
      );

      if (stored) {
        const parsed = JSON.parse(stored);

        setPreferences({
          theme: isValidTheme(parsed?.theme)
            ? parsed.theme
            : "emerald",

          motion:
            typeof parsed?.motion === "boolean"
              ? parsed.motion
              : true,
        });
      }
    } catch {
      setStorageAvailable(false);
    } finally {
      setReady(true);
    }
  }, []);

  // Apply preferences to the entire application.

  useEffect(() => {
    if (!ready) return;

    const root = document.documentElement;

    root.dataset.theme = preferences.theme;

    root.dataset.motion = preferences.motion
      ? "enabled"
      : "disabled";

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(preferences)
      );

      setStorageAvailable(true);
    } catch {
      setStorageAvailable(false);
    }
  }, [preferences, ready]);

  function setTheme(theme: NexusTheme) {
    setPreferences((previous) => ({
      ...previous,
      theme,
    }));
  }

  function setMotion(motion: boolean) {
    setPreferences((previous) => ({
      ...previous,
      motion,
    }));
  }

  function resetPreferences() {
    setPreferences({
      ...DEFAULT_PREFERENCES,
    });
  }

  return (
    <ThemeContext.Provider
      value={{
        theme: preferences.theme,
        motion: preferences.motion,
        ready,
        storageAvailable,
        setTheme,
        setMotion,
        resetPreferences,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useNexusTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useNexusTheme must be used inside ThemeProvider."
    );
  }

  return context;
}
