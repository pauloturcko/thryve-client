import { useCallback, useEffect, useRef, useState } from "react";

export type VoicePhase =
  | "idle"
  | "listening"
  | "transcribing"
  | "parsing"
  | "review";

// Momento (ms) em que cada etapa começa depois do toque.
const TIMELINE: [VoicePhase, number][] = [
  ["listening", 0],
  ["transcribing", 1800],
  ["parsing", 3500],
  ["review", 4900],
];

// Simulação roteirizada: não acessa o microfone nem chama nenhuma API.
export const useVoiceDemo = () => {
  const [phase, setPhase] = useState<VoicePhase>("idle");
  const [run, setRun] = useState(0);
  const timers = useRef<number[]>([]);

  const clearTimers = () => {
    timers.current.forEach((timer) => window.clearTimeout(timer));
    timers.current = [];
  };

  useEffect(() => clearTimers, []);

  const running = phase !== "idle" && phase !== "review";

  const play = useCallback(() => {
    if (running) return;
    clearTimers();
    setRun((count) => count + 1);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase("review");
      return;
    }

    TIMELINE.forEach(([next, at]) => {
      timers.current.push(window.setTimeout(() => setPhase(next), at));
    });
  }, [running]);

  return { phase, run, running, play };
};
