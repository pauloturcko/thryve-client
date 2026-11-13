import { darkColors, lightColors } from "./colors";

export type ThemeMode = "dark" | "light";

const fonts = {
  sans: "var(--font-sans), system-ui, -apple-system, 'Segoe UI', sans-serif",
  serif: "var(--font-serif), 'Times New Roman', Georgia, serif",
  mono: "var(--font-mono), ui-monospace, 'SFMono-Regular', Menlo, monospace",
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
