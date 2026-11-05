"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { THEME_STORAGE_KEY } from "@/constants/storage-keys";
import { ThemeMode } from "@/styles/theme";

type ThemeModeContextValue = {
  mode: ThemeMode;
  toggleMode: () => void;
};

const ThemeModeContext = createContext<ThemeModeContextValue | null>(null);

const readStoredMode = (): ThemeMode | null => {
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    return stored === "light" || stored === "dark" ? stored : null;
  } catch {
    return null;
  }
};

const storeMode = (mode: ThemeMode) => {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, mode);
  } catch {
  }
};

export const ThemeModeProvider = ({
  children,
}: {
  children: (mode: ThemeMode) => ReactNode;
}) => {
  const [mode, setMode] = useState<ThemeMode>("light");

  useEffect(() => {
    const stored = readStoredMode();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (stored) setMode(stored);
  }, []);

  const value = useMemo(
    () => ({
      mode,
      toggleMode: () =>
        setMode((current) => {
          const next = current === "dark" ? "light" : "dark";
          storeMode(next);
          return next;
        }),
    }),
    [mode]
  );

  return (
    <ThemeModeContext.Provider value={value}>
      {children(mode)}
    </ThemeModeContext.Provider>
  );
};

export const useThemeMode = () => {
  const context = useContext(ThemeModeContext);
  if (!context)
    throw new Error("useThemeMode must be used inside ThemeModeProvider");
  return context;
};
