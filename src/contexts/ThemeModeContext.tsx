"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { THEME_STORAGE_KEY } from "@/constants/storage-keys";
import { ThemeMode } from "@/styles/theme";

type ThemeModeContextValue = {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
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
  } catch {}
};

export const ThemeModeProvider = ({
  children,
}: {
  children: (mode: ThemeMode) => ReactNode;
}) => {
  const [mode, setModeState] = useState<ThemeMode>("light");

  useEffect(() => {
    const stored = readStoredMode();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (stored) setModeState(stored);
  }, []);

  const setMode = useCallback((next: ThemeMode) => {
    storeMode(next);
    setModeState(next);
  }, []);

  const value = useMemo(() => ({ mode, setMode }), [mode, setMode]);

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
