import { buildTheme, ThemeMode } from "@/styles/theme";

export type Tone = ThemeMode;

// A landing alterna seções claras e escuras independentemente do tema escolhido
// pelo usuário. Os indicadores semânticos ficam mais discretos que no produto
// para não competirem com a paleta Carbon.
const semanticColors = {
  dark: { success: "#6CC79A", danger: "#E07A82", warning: "#D9A15B" },
  light: { success: "#1F7A4E", danger: "#B3313C", warning: "#93591A" },
};

const buildLandingTheme = (tone: Tone) => {
  const theme = buildTheme(tone);
  return {
    ...theme,
    colors: { ...theme.colors, ...semanticColors[tone] },
  };
};

export const landingThemes = {
  dark: buildLandingTheme("dark"),
  light: buildLandingTheme("light"),
};
