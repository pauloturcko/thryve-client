import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";

export const sansFont = Geist({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  display: "swap",
});

export const serifFont = Instrument_Serif({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

export const monoFont = Geist_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-mono",
  display: "swap",
  preload: false,
});

export const fontVariables = [
  sansFont.variable,
  serifFont.variable,
  monoFont.variable,
].join(" ");
