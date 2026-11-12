import { ThemeMode } from "@/styles/theme";

export enum SystemTheme {
  Escuro = 0,
  Claro = 1,
}

export const SystemThemeLabels: Record<SystemTheme, string> = {
  [SystemTheme.Escuro]: "Escuro",
  [SystemTheme.Claro]: "Claro",
};

export const ThemeModeBySystemTheme: Record<SystemTheme, ThemeMode> = {
  [SystemTheme.Escuro]: "dark",
  [SystemTheme.Claro]: "light",
};

export const SystemThemeByThemeMode: Record<ThemeMode, SystemTheme> = {
  dark: SystemTheme.Escuro,
  light: SystemTheme.Claro,
};
