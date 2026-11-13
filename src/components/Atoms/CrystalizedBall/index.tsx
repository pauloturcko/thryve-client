"use client";

import { CSSProperties, useMemo, useRef } from "react";
import { styled } from "styled-components";
import {
  BALL_PRESETS,
  Preset,
  PresetValues,
  Settings,
  Theme,
  buildPalette,
  parseColor,
} from "./config";
import { useCrystalizedBall } from "./useCrystalizedBall";

export type CrystalizedBallProps = Partial<PresetValues> & {
  preset?: Preset;
  theme?: Theme;
  size?: number;
  speed?: number;
  interactive?: boolean;
  hoverStrength?: number;
  intro?: boolean;
  paused?: boolean;
  className?: string;
  style?: CSSProperties;
};

// Adaptado do <CrystalizedBall /> do React Bits (variante TS), trocando o CSS
// do componente por styled-components.
export const CrystalizedBall = ({
  preset = "plasma",
  color,
  theme = "dark",
  size = 0.7,
  speed = 1,
  interactive = true,
  hoverStrength = 0.7,
  intro = true,
  paused = false,
  className,
  style,
  ...overrides
}: CrystalizedBallProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const base = BALL_PRESETS[preset] ?? BALL_PRESETS.plasma;
  const tint = color ?? base.color;

  const colors = useMemo(() => {
    const light = theme === "light";
    return {
      light,
      palette: buildPalette(parseColor(tint, [0.95, 0.36, 0.82]), light),
    };
  }, [tint, theme]);

  const settings: Settings = {
    ...colors,
    strands: overrides.strands ?? base.strands,
    crackle: overrides.crackle ?? base.crackle,
    flares: overrides.flares ?? base.flares,
    glow: overrides.glow ?? base.glow,
    sparks: overrides.sparks ?? base.sparks,
    particleCount: overrides.particleCount ?? base.particleCount,
    fill: overrides.fill ?? base.fill,
    motion: overrides.motion ?? base.motion,
    particleShape: overrides.particleShape ?? base.particleShape,
    depth: overrides.depth ?? base.depth,
    sway: overrides.sway ?? base.sway,
    twinkle: overrides.twinkle ?? base.twinkle,
    haze: overrides.haze ?? base.haze,
    dustSpeed: overrides.dustSpeed ?? base.dustSpeed,
    size,
    speed,
    interactive,
    hoverStrength,
    intro,
    paused,
  };

  useCrystalizedBall(containerRef, settings);

  return (
    <Stage
      ref={containerRef}
      className={className}
      style={style}
    />
  );
};

const Stage = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;
