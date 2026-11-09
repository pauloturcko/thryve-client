export type ColorTokens = {
  background: string;
  surface: string;
  surfaceElevated: string;

  primary: string;
  primarySoft: string;
  hover: string;
  primaryText: string;
  onPrimary: string;

  accent: string;
  accentSoft: string;
  accentText: string;

  gradientPrimary: string;
  glowRgb: string;

  glass: string;
  tile: string;
  card: string;
  heroCard: string;
  accentCard: string;
  ringAccent: string;
  shadowRgb: string;

  textPrimary: string;
  textSecondary: string;
  textMuted: string;

  border: string;

  success: string;
  danger: string;
  onDanger: string;
  warning: string;
  info: string;
};

export const darkColors: ColorTokens = {
  background: "#0B0D10",
  surface: "#15181D",
  surfaceElevated: "#252A31",

  primary: "#F8FAFC",
  primarySoft: "#1D2127",
  hover: "#DDE2E9",
  primaryText: "#F8FAFC",
  onPrimary: "#0B0D10",

  accent: "#B4BBC5",
  accentSoft: "#1A1E24",
  accentText: "#B4BBC5",

  gradientPrimary:
    "linear-gradient(120deg, #F8FAFC 0%, #B4BBC5 60%, #717B89 130%)",
  glowRgb: "248, 250, 252",

  glass: "rgba(21, 24, 29, 0.66)",
  tile: "linear-gradient(180deg, #252A31 0%, #1A1E24 100%)",
  card: "linear-gradient(180deg, #181C21 0%, #101317 100%)",
  heroCard:
    "radial-gradient(120% 90% at 0% 0%, #2B3139 0%, #15181D 55%, #101317 100%)",
  accentCard: "linear-gradient(160deg, #1F242A 0%, #12151A 100%)",
  ringAccent: "#B4BBC5",
  shadowRgb: "0, 0, 0",

  textPrimary: "#F8FAFC",
  textSecondary: "#B4BBC5",
  textMuted: "#717B89",

  border: "#3D444D",

  success: "#1EE37A",
  danger: "#FF3B4E",
  onDanger: "#FFFFFF",
  warning: "#FF8A00",
  info: "#2E9BFF",
};

export const lightColors: ColorTokens = {
  background: "#F8FAFC",
  surface: "#FFFFFF",
  surfaceElevated: "#EEF1F5",

  primary: "#0B0D10",
  primarySoft: "#E6E9EE",
  hover: "#252A31",
  primaryText: "#0B0D10",
  onPrimary: "#F8FAFC",

  accent: "#717B89",
  accentSoft: "#F0F2F6",
  accentText: "#3D444D",

  gradientPrimary:
    "linear-gradient(120deg, #0B0D10 0%, #3D444D 60%, #717B89 130%)",
  glowRgb: "11, 13, 16",

  glass: "rgba(255, 255, 255, 0.72)",
  tile: "linear-gradient(180deg, #FFFFFF 0%, #EEF1F5 100%)",
  card: "linear-gradient(180deg, #FFFFFF 0%, #F6F8FA 100%)",
  heroCard: "radial-gradient(120% 90% at 0% 0%, #E6E9EE 0%, #FFFFFF 60%)",
  accentCard: "linear-gradient(160deg, #EEF1F5 0%, #FFFFFF 100%)",
  ringAccent: "#3D444D",
  shadowRgb: "11, 13, 16",

  textPrimary: "#0B0D10",
  textSecondary: "#3D444D",
  textMuted: "#5F6978",

  border: "#D5DAE1",

  success: "#00A63E",
  danger: "#F0101E",
  onDanger: "#FFFFFF",
  warning: "#F25C05",
  info: "#0A6CFF",
};
