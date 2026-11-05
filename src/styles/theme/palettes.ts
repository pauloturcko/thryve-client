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
  onAccent: string;

  gradientPrimary: string;
  glowRgb: string;

  glass: string;
  tile: string;
  card: string;
  heroCard: string;
  accentCard: string;
  ringAccent: string;
  shadowRgb: string;

  logoStart: string;
  logoMid: string;
  logoEnd: string;

  textPrimary: string;
  textSecondary: string;
  textMuted: string;

  border: string;
  divider: string;

  success: string;
  danger: string;
  warning: string;
  info: string;

  transparent: string;
};

type Palette = { dark: ColorTokens; light: ColorTokens };

const ultraviolet: Palette = {
  dark: {
    background: "#0B0912",
    surface: "#13101F",
    surfaceElevated: "#1C1730",

    primary: "#6A00F4",
    primarySoft: "#241446",
    hover: "#7D1FFF",
    primaryText: "#A57BFF",
    onPrimary: "#FFFFFF",

    accent: "#FFD6A5",
    accentSoft: "#2B2120",
    accentText: "#FFD6A5",
    onAccent: "#1B1029",

    gradientPrimary: "linear-gradient(120deg, #6A00F4 0%, #9B4DFF 55%, #FFB98A 130%)",
    glowRgb: "122, 41, 255",

    textPrimary: "#F4F1FA",
    textSecondary: "#A39CB8",
    textMuted: "#8A83A6",

    border: "#262040",
    divider: "#1A162B",

    success: "#3DDC97",
    danger: "#FF5C7A",
    warning: "#FFB547",
    info: "#5CC8FF",

    glass: "rgba(28, 23, 48, 0.62)",
    tile: "linear-gradient(180deg, #2E2748 0%, #1D1832 100%)",
    card: "linear-gradient(180deg, #1B1630 0%, #110E1C 100%)",
    heroCard: "radial-gradient(120% 90% at 0% 0%, #2A1259 0%, #150F28 55%, #100C1C 100%)",
    accentCard: "linear-gradient(160deg, #2B2120 0%, #15111C 100%)",
    ringAccent: "#FFD6A5",
    shadowRgb: "0, 0, 0",
    logoStart: "#6A00F4",
    logoMid: "#A57BFF",
    logoEnd: "#FFD6A5",

    transparent: "transparent",
  },
  light: {
    background: "#F6F4FB",
    surface: "#FFFFFF",
    surfaceElevated: "#EFEAFB",

    primary: "#6A00F4",
    primarySoft: "#EDE3FF",
    hover: "#5B00D6",
    primaryText: "#5B00D6",
    onPrimary: "#FFFFFF",

    accent: "#FFD6A5",
    accentSoft: "#FFF1E0",
    accentText: "#9A5410",
    onAccent: "#1A1330",

    gradientPrimary: "linear-gradient(120deg, #6A00F4 0%, #9B4DFF 55%, #FFB98A 130%)",
    glowRgb: "106, 0, 244",

    textPrimary: "#17122A",
    textSecondary: "#5C5675",
    textMuted: "#757090",

    border: "#E2DCF0",
    divider: "#EEEAF6",

    success: "#0B7F50",
    danger: "#E11D48",
    warning: "#B45309",
    info: "#0277BD",

    glass: "rgba(255, 255, 255, 0.7)",
    tile: "linear-gradient(180deg, #FFFFFF 0%, #F3F0FA 100%)",
    card: "linear-gradient(180deg, #FFFFFF 0%, #FAF8FE 100%)",
    heroCard: "radial-gradient(120% 90% at 0% 0%, #EDE3FF 0%, #FFFFFF 60%)",
    accentCard: "linear-gradient(160deg, #FFF1E0 0%, #FFFFFF 100%)",
    ringAccent: "#EE9A4D",
    shadowRgb: "23, 18, 42",
    logoStart: "#6A00F4",
    logoMid: "#5B00D6",
    logoEnd: "#EE9A4D",

    transparent: "transparent",
  },
};

const emerald: Palette = {
  dark: {
    background: "#06100D",
    surface: "#0C1915",
    surfaceElevated: "#12241E",

    primary: "#19C48C",
    primarySoft: "#0F2E24",
    hover: "#2EE6A6",
    primaryText: "#2EE6A6",
    onPrimary: "#04261C",

    accent: "#F8E7C9",
    accentSoft: "#2A2619",
    accentText: "#F8E7C9",
    onAccent: "#1F1A0E",

    gradientPrimary: "linear-gradient(120deg, #0E7A5A 0%, #2EE6A6 60%, #F8E7C9 130%)",
    glowRgb: "46, 230, 166",

    glass: "rgba(14, 32, 26, 0.62)",
    tile: "linear-gradient(180deg, #1E3A31 0%, #11241E 100%)",
    card: "linear-gradient(180deg, #10201B 0%, #0A1512 100%)",
    heroCard: "radial-gradient(120% 90% at 0% 0%, #0E4A39 0%, #0B1F19 55%, #08130F 100%)",
    accentCard: "linear-gradient(160deg, #2A2619 0%, #0C1512 100%)",
    ringAccent: "#F8E7C9",
    shadowRgb: "0, 0, 0",
    logoStart: "#19C48C",
    logoMid: "#2EE6A6",
    logoEnd: "#F8E7C9",

    textPrimary: "#F3F1EA",
    textSecondary: "#A3B5AC",
    textMuted: "#7E938A",

    border: "#1C3029",
    divider: "#12211C",

    success: "#4ADE80",
    danger: "#FF6B6B",
    warning: "#F7B548",
    info: "#6CC4F5",

    transparent: "transparent",
  },
  light: {
    background: "#FAF6EE",
    surface: "#FFFFFF",
    surfaceElevated: "#F4ECDD",

    primary: "#064E3B",
    primarySoft: "#DDEFE7",
    hover: "#0A6B51",
    primaryText: "#064E3B",
    onPrimary: "#F8E7C9",

    accent: "#F8E7C9",
    accentSoft: "#FBF3E4",
    accentText: "#7A5A1E",
    onAccent: "#3A2A0C",

    gradientPrimary: "linear-gradient(120deg, #064E3B 0%, #0F8A66 60%, #E9CF9F 130%)",
    glowRgb: "6, 78, 59",

    glass: "rgba(255, 252, 246, 0.78)",
    tile: "linear-gradient(180deg, #FFFFFF 0%, #F7F1E6 100%)",
    card: "linear-gradient(180deg, #FFFFFF 0%, #FDFAF4 100%)",
    heroCard: "radial-gradient(120% 90% at 0% 0%, #DDEFE7 0%, #FFFFFF 60%)",
    accentCard: "linear-gradient(160deg, #FBF1DF 0%, #FFFFFF 100%)",
    ringAccent: "#B8893F",
    shadowRgb: "16, 32, 27",
    logoStart: "#064E3B",
    logoMid: "#064E3B",
    logoEnd: "#B8893F",

    textPrimary: "#10201B",
    textSecondary: "#4F625B",
    textMuted: "#63746D",

    border: "#E8DFCC",
    divider: "#F1EADB",

    success: "#0B7F50",
    danger: "#DC2626",
    warning: "#B45309",
    info: "#0277BD",

    transparent: "transparent",
  },
};

const whaiGreen: Palette = {
  dark: {
    background: "#0A0C0B",
    surface: "#121614",
    surfaceElevated: "#1A201D",

    primary: "#2EB87E",
    primarySoft: "#12291F",
    hover: "#3CDD7F",
    primaryText: "#3CDD7F",
    onPrimary: "#052417",

    accent: "#B8A4FF",
    accentSoft: "#221E36",
    accentText: "#B8A4FF",
    onAccent: "#1A1433",

    gradientPrimary: "linear-gradient(120deg, #235C42 0%, #2EB87E 50%, #3CDD7F 100%)",
    glowRgb: "60, 221, 127",

    glass: "rgba(22, 27, 25, 0.62)",
    tile: "linear-gradient(180deg, #262D29 0%, #181D1A 100%)",
    card: "linear-gradient(180deg, #151A17 0%, #0E1210 100%)",
    heroCard: "radial-gradient(120% 90% at 0% 0%, #1C3A2C 0%, #121915 55%, #0D110F 100%)",
    accentCard: "linear-gradient(160deg, #221E36 0%, #0F1211 100%)",
    ringAccent: "#B8A4FF",
    shadowRgb: "0, 0, 0",
    logoStart: "#235C42",
    logoMid: "#2EB87E",
    logoEnd: "#3CDD7F",

    textPrimary: "#F2F5F3",
    textSecondary: "#A2ADA7",
    textMuted: "#808B85",

    border: "#252D29",
    divider: "#171C19",

    success: "#5BE49B",
    danger: "#FF5D73",
    warning: "#FFB84D",
    info: "#5AB8FF",

    transparent: "transparent",
  },
  light: {
    background: "#F4F7F5",
    surface: "#FFFFFF",
    surfaceElevated: "#E9F1EC",

    primary: "#2EB87E",
    primarySoft: "#DDF5E8",
    hover: "#3CDD7F",
    primaryText: "#235C42",
    onPrimary: "#052417",

    accent: "#B8A4FF",
    accentSoft: "#F1ECFF",
    accentText: "#5B45C7",
    onAccent: "#1A1433",

    gradientPrimary: "linear-gradient(120deg, #235C42 0%, #2EB87E 50%, #3CDD7F 100%)",
    glowRgb: "46, 184, 126",

    glass: "rgba(255, 255, 255, 0.74)",
    tile: "linear-gradient(180deg, #FFFFFF 0%, #F1F6F3 100%)",
    card: "linear-gradient(180deg, #FFFFFF 0%, #F9FBFA 100%)",
    heroCard: "radial-gradient(120% 90% at 0% 0%, #DDF5E8 0%, #FFFFFF 60%)",
    accentCard: "linear-gradient(160deg, #F1ECFF 0%, #FFFFFF 100%)",
    ringAccent: "#8E74F0",
    shadowRgb: "18, 32, 25",
    logoStart: "#235C42",
    logoMid: "#2EB87E",
    logoEnd: "#3CDD7F",

    textPrimary: "#121A16",
    textSecondary: "#56635C",
    textMuted: "#626F68",

    border: "#DAE4DE",
    divider: "#EBF1ED",

    success: "#13804F",
    danger: "#E11D48",
    warning: "#B45309",
    info: "#0277BD",

    transparent: "transparent",
  },
};

export const palettes = { ultraviolet, emerald, whaiGreen } satisfies Record<string, Palette>;

export type PaletteName = keyof typeof palettes;
