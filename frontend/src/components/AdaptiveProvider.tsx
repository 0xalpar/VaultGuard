
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

/* ==========================================
   ADAPTIVE ONE 2.0
   Central Preference Engine
========================================== */

export type AdaptiveMode =
  | "easy"
  | "standard"
  | "professional";

export type AdaptiveAppearance =
  | "light"
  | "dark"
  | "system";

export type AdaptiveAccent =
  | "emerald"
  | "ocean"
  | "lavender";

export type AdaptiveTextSize =
  | "normal"
  | "large"
  | "extra-large";

/* USER PREFERENCES */

export type AdaptivePreferences = {
  mode: AdaptiveMode;
  appearance: AdaptiveAppearance;
  accent: AdaptiveAccent;
  textSize: AdaptiveTextSize;
  motion: boolean;
  hideBalance: boolean;
  onboardingCompleted: boolean;
};

/* DEFAULT PREFERENCES */

export const DEFAULT_ADAPTIVE_PREFERENCES:
  AdaptivePreferences = {
    mode: "easy",
    appearance: "light",
    accent: "emerald",
    textSize: "normal",
    motion: false,
    hideBalance: false,
    onboardingCompleted: false,
  };

/* LOCAL STORAGE */

const STORAGE_KEY =
  "agentvault-adaptive-preferences";

/* AVAILABLE MODES */

export const ADAPTIVE_MODES = [
  {
    id: "easy",
    name: "Kolay kullanım",
    description:
      "Sade ekranlar ve anlaşılır yönlendirmeler.",
  },
  {
    id: "standard",
    name: "Standart kullanım",
    description:
      "Finansal özetler ve günlük istatistikler.",
  },
  {
    id: "professional",
    name: "Profesyonel kullanım",
    description:
      "Teknik ayrıntılar ve gelişmiş kontroller.",
  },
] as const;

/* AVAILABLE COLORS */

export const ADAPTIVE_ACCENTS = [
  {
    id: "emerald",
    name: "Zümrüt",
    light: "#21664d",
    dark: "#80eac0",
  },
  {
    id: "ocean",
    name: "Okyanus",
    light: "#315db7",
    dark: "#91c8ff",
  },
  {
    id: "lavender",
    name: "Lavanta",
    light: "#6745ad",
    dark: "#c4adff",
  },
] as const;

/* CONTEXT TYPE */

type AdaptiveContextType = {
  preferences: AdaptivePreferences;

  resolvedAppearance: "light" | "dark";

  motionEnabled: boolean;

  ready: boolean;

  storageAvailable: boolean;

  setMode: (mode: AdaptiveMode) => void;

  setAppearance: (
    appearance: AdaptiveAppearance
  ) => void;

  setAccent: (accent: AdaptiveAccent) => void;

  setTextSize: (
    textSize: AdaptiveTextSize
  ) => void;

  setMotion: (motion: boolean) => void;

  setHideBalance: (hideBalance: boolean) => void;

  completeOnboarding: () => void;

  resetPreferences: () => void;
};

const AdaptiveContext =
  createContext<AdaptiveContextType | null>(
    null
  );

/* VALIDATE STORED PREFERENCES */

function parsePreferences(
  value: string
): AdaptivePreferences {
  const parsed = JSON.parse(value);

  return {
    mode:
      parsed?.mode === "easy" ||
      parsed?.mode === "standard" ||
      parsed?.mode === "professional"
        ? parsed.mode
        : "easy",

    appearance:
      parsed?.appearance === "light" ||
      parsed?.appearance === "dark" ||
      parsed?.appearance === "system"
        ? parsed.appearance
        : "light",

    accent:
      parsed?.accent === "emerald" ||
      parsed?.accent === "ocean" ||
      parsed?.accent === "lavender"
        ? parsed.accent
        : "emerald",

    textSize:
      parsed?.textSize === "normal" ||
      parsed?.textSize === "large" ||
      parsed?.textSize === "extra-large"
        ? parsed.textSize
        : "normal",

    motion:
      typeof parsed?.motion === "boolean"
        ? parsed.motion
        : false,

    hideBalance:
      typeof parsed?.hideBalance === "boolean"
        ? parsed.hideBalance
        : false,

    onboardingCompleted:
      typeof parsed?.onboardingCompleted ===
      "boolean"
        ? parsed.onboardingCompleted
        : false,
  };
}

/* ADAPTIVE PROVIDER */

export default function AdaptiveProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [preferences, setPreferences] =
    useState<AdaptivePreferences>(
      DEFAULT_ADAPTIVE_PREFERENCES
    );

  const [ready, setReady] = useState(false);

  const [storageAvailable, setStorageAvailable] =
    useState(true);

  const [systemDark, setSystemDark] =
    useState(false);

  const [systemReducedMotion, setSystemReducedMotion] =
    useState(false);

  /* RESTORE SAVED PREFERENCES */

  useEffect(() => {
    try {
      const saved = localStorage.getItem(
        STORAGE_KEY
      );

      if (saved) {
        setPreferences(
          parsePreferences(saved)
        );
      }
    } catch {
      setStorageAvailable(false);
    } finally {
      setReady(true);
    }
  }, []);

  /* WATCH SYSTEM APPEARANCE AND MOTION */

  useEffect(() => {
    const colorQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );

    const motionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    function updateSystemPreferences() {
      setSystemDark(colorQuery.matches);

      setSystemReducedMotion(
        motionQuery.matches
      );
    }

    updateSystemPreferences();

    colorQuery.addEventListener(
      "change",
      updateSystemPreferences
    );

    motionQuery.addEventListener(
      "change",
      updateSystemPreferences
    );

    return () => {
      colorQuery.removeEventListener(
        "change",
        updateSystemPreferences
      );

      motionQuery.removeEventListener(
        "change",
        updateSystemPreferences
      );
    };
  }, []);

  /* SAVE PREFERENCES */

  useEffect(() => {
    if (!ready) return;

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

  /* RESOLVE THEME */

  const resolvedAppearance =
    preferences.appearance === "system"
      ? systemDark
        ? "dark"
        : "light"
      : preferences.appearance;

  const motionEnabled =
    preferences.motion &&
    !systemReducedMotion;

  /* UPDATE PREFERENCES */

  function setMode(mode: AdaptiveMode) {
    setPreferences((previous) => ({
      ...previous,
      mode,
    }));
  }

  function setAppearance(
    appearance: AdaptiveAppearance
  ) {
    setPreferences((previous) => ({
      ...previous,
      appearance,
    }));
  }

  function setAccent(accent: AdaptiveAccent) {
    setPreferences((previous) => ({
      ...previous,
      accent,
    }));
  }

  function setTextSize(
    textSize: AdaptiveTextSize
  ) {
    setPreferences((previous) => ({
      ...previous,
      textSize,
    }));
  }

  function setMotion(motion: boolean) {
    setPreferences((previous) => ({
      ...previous,
      motion,
    }));
  }

  function setHideBalance(
    hideBalance: boolean
  ) {
    setPreferences((previous) => ({
      ...previous,
      hideBalance,
    }));
  }

  /* ONBOARDING */

  function completeOnboarding() {
    setPreferences((previous) => ({
      ...previous,
      onboardingCompleted: true,
    }));
  }

  /* RESET APPEARANCE AND EXPERIENCE */

  function resetPreferences() {
    setPreferences((previous) => ({
      ...DEFAULT_ADAPTIVE_PREFERENCES,

      onboardingCompleted:
        previous.onboardingCompleted,
    }));
  }

  return (
    <AdaptiveContext.Provider
      value={{
        preferences,
        resolvedAppearance,
        motionEnabled,
        ready,
        storageAvailable,
        setMode,
        setAppearance,
        setAccent,
        setTextSize,
        setMotion,
        setHideBalance,
        completeOnboarding,
        resetPreferences,
      }}
    >
      {children}
    </AdaptiveContext.Provider>
  );
}

/* CUSTOM HOOK */

export function useAdaptive() {
  const context = useContext(
    AdaptiveContext
  );

  if (!context) {
    throw new Error(
      "useAdaptive must be used inside AdaptiveProvider."
    );
  }

  return context;
}

/* ADAPTIVE DESIGN WRAPPER */

export function AdaptiveRoot({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const {
    preferences,
    resolvedAppearance,
    motionEnabled,
  } = useAdaptive();

  const fontSize =
    preferences.textSize === "extra-large"
      ? "1.375rem"
      : preferences.textSize === "large"
        ? "1.25rem"
        : "1rem";

  return (
    <div
      className={`adaptive-root ${className}`}

      data-appearance={resolvedAppearance}

      data-accent={preferences.accent}

      data-mode={preferences.mode}

      data-large-text={
        preferences.textSize !== "normal"
      }

      data-motion={
        motionEnabled ? "on" : "off"
      }

      style={{
        fontSize,
      }}
    >
      {children}
    </div>
  );
}
