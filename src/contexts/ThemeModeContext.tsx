"use client";

import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { ACTIVE_PALETTE, isPalette, PaletteName } from "@/styles/theme";

export type ThemeMode = "dark" | "light";

type ThemeModeContextValue = {
  mode: ThemeMode;
  toggleMode: () => void;
  palette: PaletteName;
  setPalette: (palette: PaletteName) => void;
};

const STORAGE_KEY = "whaidata.theme";
const PALETTE_KEY = "whaidata.palette";

const store = (key: string, value: string) => {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // storage unavailable: keep the choice for this visit only
  }
};

const readStoredPalette = (): PaletteName | null => {
  try {
    const stored = window.localStorage.getItem(PALETTE_KEY) ?? undefined;
    return isPalette(stored) ? stored : null;
  } catch {
    return null;
  }
};

const ThemeModeContext = createContext<ThemeModeContextValue | null>(null);

const readStoredMode = (): ThemeMode | null => {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === "light" || stored === "dark" ? stored : null;
  } catch {
    return null;
  }
};

export const ThemeModeProvider = ({
  children,
}: {
  children: (mode: ThemeMode, palette: PaletteName) => ReactNode;
}) => {
  const [mode, setMode] = useState<ThemeMode>("dark");
  const [palette, setPaletteState] = useState<PaletteName>(ACTIVE_PALETTE);

  useEffect(() => {
    const stored = readStoredMode();
    const storedPalette = readStoredPalette();
    /* eslint-disable react-hooks/set-state-in-effect */
    if (stored) setMode(stored);
    if (storedPalette) setPaletteState(storedPalette);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  const value = useMemo(
    () => ({
      mode,
      toggleMode: () =>
        setMode((current) => {
          const next = current === "dark" ? "light" : "dark";
          store(STORAGE_KEY, next);
          return next;
        }),
      palette,
      setPalette: (next: PaletteName) => {
        store(PALETTE_KEY, next);
        setPaletteState(next);
      },
    }),
    [mode, palette]
  );

  return (
    <ThemeModeContext.Provider value={value}>
      {children(mode, palette)}
    </ThemeModeContext.Provider>
  );
};

export const useThemeMode = () => {
  const context = useContext(ThemeModeContext);
  if (!context) throw new Error("useThemeMode must be used inside ThemeModeProvider");
  return context;
};
