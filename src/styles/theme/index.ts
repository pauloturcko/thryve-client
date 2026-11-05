import { darkColors, lightColors } from "./colors";

export type ThemeMode = "dark" | "light";

const fonts = {
  body: "var(--font-body), system-ui, -apple-system, 'Segoe UI', sans-serif",
  display: "var(--font-display), var(--font-body), system-ui, sans-serif",
};

const radii = {
  sm: "0.5rem",
  md: "0.875rem",
  lg: "1.25rem",
  pill: "999px",
};

export const buildTheme = (mode: ThemeMode) => ({
  mode,
  colors: mode === "dark" ? darkColors : lightColors,
  fonts,
  radii,
});

export type ThemeType = ReturnType<typeof buildTheme>;
