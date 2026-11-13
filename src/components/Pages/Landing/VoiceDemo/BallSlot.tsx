"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { VoicePhase } from "./useVoiceDemo";
import * as S from "./styles";

// O WebGL só é baixado e iniciado quando o celular se aproxima da tela.
const CrystalizedBall = dynamic(
  () =>
    import("@/components/Atoms/CrystalizedBall").then(
      (module) => module.CrystalizedBall
    ),
  { ssr: false }
);

type BallState = "waiting" | "live" | "fallback";

const supportsWebGL2 = () => {
  try {
    return Boolean(document.createElement("canvas").getContext("webgl2"));
  } catch {
    return false;
  }
};

// Aparelhos mais modestos recebem menos partículas.
const particleBudget = () => {
  const cores = navigator.hardwareConcurrency ?? 8;
  const compact = window.matchMedia("(max-width: 640px)").matches;
  return cores <= 4 || compact ? 4500 : 9000;
};

const ENERGY: Record<
  VoicePhase,
  { crackle: number; glow: number; sparks: number; speed: number }
> = {
  idle: { crackle: 0.35, glow: 0.6, sparks: 0.2, speed: 0.8 },
  listening: { crackle: 0.95, glow: 1.05, sparks: 0.85, speed: 1.7 },
  transcribing: { crackle: 0.6, glow: 0.85, sparks: 0.45, speed: 1.2 },
  parsing: { crackle: 0.5, glow: 0.75, sparks: 0.35, speed: 1 },
  review: { crackle: 0.3, glow: 0.6, sparks: 0.15, speed: 0.8 },
};

type BallSlotProps = {
  phase: VoicePhase;
};

export const BallSlot = ({ phase }: BallSlotProps) => {
  const slotRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<BallState>("waiting");
  const [particles, setParticles] = useState(9000);

  useEffect(() => {
    const slot = slotRef.current;
    if (!slot) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        if (!supportsWebGL2()) {
          setState("fallback");
          return;
        }
        setParticles(particleBudget());
        setState("live");
      },
      { rootMargin: "320px 0px" }
    );
    observer.observe(slot);
    return () => observer.disconnect();
  }, []);

  const energy = ENERGY[phase];

  return (
    <S.BallSlot
      ref={slotRef}
      data-state={state}
      data-phase={phase}
    >
      {state === "live" && (
        <CrystalizedBall
          preset="eclipse"
          color="#E6EAF0"
          theme="dark"
          size={0.86}
          strands={4}
          flares={0.35}
          fill={0.45}
          haze={0.55}
          depth={0.7}
          sway={0.45}
          twinkle={0.5}
          motion="drift"
          particleShape="round"
          dustSpeed={0.7}
          hoverStrength={0.8}
          particleCount={particles}
          crackle={energy.crackle}
          glow={energy.glow}
          sparks={energy.sparks}
          speed={energy.speed}
        />
      )}
    </S.BallSlot>
  );
};
