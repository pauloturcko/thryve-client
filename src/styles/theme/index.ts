import { palettes, PaletteName } from "./palettes";

const isPaletteName = (value: string | undefined): value is PaletteName =>
  !!value && value in palettes;

const envPalette = process.env.NEXT_PUBLIC_PALETTE;

export const ACTIVE_PALETTE: PaletteName = isPaletteName(envPalette) ? envPalette : "ultraviolet";

const fonts = {
  body: "var(--font-body), system-ui, -apple-system, 'Segoe UI', sans-serif",
  display: "var(--font-display), var(--font-body), system-ui, sans-serif",
};

const radii = {
  sm: "0.5rem",
  md: "0.875rem",
  lg: "1.25rem",
  xl: "1.75rem",
  pill: "999px",
};

export const isPalette = isPaletteName;

export const buildTheme = (palette: PaletteName, mode: "dark" | "light") => ({
  mode,
  palette,
  colors: palettes[palette][mode],
  fonts,
  radii,
});

export const theme = {
  dark: buildTheme(ACTIVE_PALETTE, "dark"),
  light: buildTheme(ACTIVE_PALETTE, "light"),
  weight: {
    bold: 700,
    semiBold: 600,
  },
};

export type { PaletteName };

export type ThemeType = ReturnType<typeof buildTheme>;
