import { useEffect, useLayoutEffect, useRef, useState } from "react";

export type DockSpring = {
  mass: number;
  stiffness: number;
  damping: number;
};

type Motion = {
  size: number;
  velocity: number;
  lift: number;
  rise: number;
  launch: number;
  gravity: number;
  hopping: boolean;
  drawn: string;
  node: HTMLElement | null;
};

type DockMotionOptions = {
  spans: ("item" | "separator")[];
  baseItemSize: number;
  magnification: number;
  distance: number;
  panelHeight: number;
  gap: number;
  spring: DockSpring;
  bounce: boolean;
};

const EDGE = 12;
const HOP = 0.4;
const HOP_TIME = 0.38;

const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * Ported from React Bits <Dock />: a spring-driven magnification loop that
 * writes size + hop offset straight to the DOM so React never re-renders
 * while the pointer moves.
 */
export const useDockMotion = ({
  spans,
  baseItemSize,
  magnification,
  distance,
  panelHeight,
  gap,
  spring,
  bounce,
}: DockMotionOptions) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const hopRef = useRef<((index: number) => void) | null>(null);
  const focusRef = useRef<((index: number) => void) | null>(null);
  const wakeRef = useRef<(() => void) | null>(null);
  const [fit, setFit] = useState(1);

  const rawBase = Math.max(16, baseItemSize);
  const rawPeak = Math.max(rawBase, magnification);
  const rawThickness = Math.max(rawBase, panelHeight);
  const length =
    spans.reduce((sum, span) => sum + (span === "separator" ? 1 : rawBase), 0) +
    gap * Math.max(0, spans.length - 1) +
    rawThickness -
    rawBase;

  const settings = {
    spans,
    base: rawBase * fit,
    peak: rawPeak * fit,
    gap: gap * fit,
    distance: Math.max(1, distance) * fit,
    length: length + rawPeak - rawBase,
    spring,
    bounce,
  };
  const settingsRef = useRef(settings);
  useIsomorphicLayoutEffect(() => {
    settingsRef.current = settings;
  });

  useEffect(() => {
    wakeRef.current?.();
  });

  useIsomorphicLayoutEffect(() => {
    const measure = () => {
      const room = window.innerWidth - EDGE * 2;
      const s = settingsRef.current;
      const next = s.length > 0 ? Math.min(1, Math.max(0.4, room / s.length)) : 1;
      setFit(Math.round(next * 1000) / 1000);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [length, rawPeak, rawBase]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const reduce =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    const motion = new Map<number, Motion>();
    const pointer = { x: 0, inside: false };
    let focused = -1;
    let lastBase = settingsRef.current.base;
    let raf = 0;
    let last = 0;
    let alive = true;

    const entry = (index: number): Motion => {
      let state = motion.get(index);
      if (!state) {
        state = {
          size: settingsRef.current.base,
          velocity: 0,
          lift: 0,
          rise: 0,
          launch: 0,
          gravity: 0,
          hopping: false,
          drawn: "",
          node: null,
        };
        motion.set(index, state);
      }
      return state;
    };

    const tick = (now: number) => {
      raf = 0;
      if (!alive) return;
      const s = settingsRef.current;
      const dt = Math.min(1 / 30, Math.max(0.001, (now - last) / 1000));
      last = now;

      if (s.base !== lastBase) {
        const ratio = s.base / lastBase;
        motion.forEach((state) => {
          state.size *= ratio;
          state.velocity *= ratio;
        });
        lastBase = s.base;
      }

      const rect = root.getBoundingClientRect();
      const center = rect.left + rect.width / 2;
      const widths = s.spans.map((span) => (span === "separator" ? 1 : s.base));
      let cursor =
        -(widths.reduce((sum, w) => sum + w, 0) + s.gap * Math.max(0, widths.length - 1)) / 2;
      const rest = widths.map((w) => {
        const middle = cursor + w / 2;
        cursor += w + s.gap;
        return middle;
      });

      let focus: number | null = null;
      if (pointer.inside) focus = pointer.x - center;
      else if (rest[focused] !== undefined) focus = rest[focused];

      const steps = Math.max(1, Math.ceil(dt * 240));
      const h = dt / steps;
      const k = s.spring.stiffness / s.spring.mass;
      const c = s.spring.damping / s.spring.mass;
      let moving = false;

      s.spans.forEach((span, index) => {
        const node = itemRefs.current[index];
        if (!node || span === "separator") return;
        const state = entry(index);
        const reach = focus === null ? 1 : Math.abs(focus - rest[index]) / s.distance;
        const target =
          s.base + (s.peak - s.base) * (reach < 1 ? Math.cos((reach * Math.PI) / 2) ** 2 : 0);

        if (reduce) {
          state.size = target;
          state.velocity = 0;
        } else {
          for (let i = 0; i < steps; i++) {
            state.velocity =
              (state.velocity + h * k * (target - state.size)) / (1 + h * c + h * h * k);
            state.size += state.velocity * h;
            if (!state.hopping) continue;
            state.rise -= state.gravity * h;
            state.lift += state.rise * h;
            if (state.lift > 0) continue;
            state.lift = 0;
            state.rise *= -0.36;
            if (state.rise < state.launch * 0.2) {
              state.rise = 0;
              state.hopping = false;
            }
          }
        }

        if (Math.abs(state.velocity) < 0.01 && Math.abs(target - state.size) < 0.01) {
          state.size = target;
          state.velocity = 0;
        } else {
          moving = true;
        }
        if (state.hopping) moving = true;

        const size = Math.max(1, state.size);
        const drawn = `${size.toFixed(2)} ${state.lift.toFixed(2)}`;
        if (drawn === state.drawn && node === state.node) return;
        state.drawn = drawn;
        state.node = node;
        const tile = node.firstElementChild as HTMLElement | null;
        node.style.width = `${size}px`;
        node.style.height = `${size}px`;
        if (tile) tile.style.transform = `translate(0, ${-state.lift}px) scale(${size / s.base})`;
      });

      if (moving) raf = requestAnimationFrame(tick);
    };

    const wake = () => {
      if (raf || !alive) return;
      last = performance.now();
      raf = requestAnimationFrame(tick);
    };

    wakeRef.current = wake;

    hopRef.current = (index: number) => {
      const node = itemRefs.current[index];
      if (reduce || !settingsRef.current.bounce || !node) return;
      const state = entry(index);
      if (state.hopping) return;
      const height = state.size * HOP;
      state.gravity = (8 * height) / (HOP_TIME * HOP_TIME);
      state.launch = (state.gravity * HOP_TIME) / 2;
      state.rise = state.launch;
      state.hopping = true;
      wake();
    };

    focusRef.current = (index: number) => {
      focused = index;
      wake();
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      pointer.x = event.clientX;
      pointer.inside = true;
      wake();
    };
    const onLeave = () => {
      pointer.inside = false;
      wake();
    };

    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerleave", onLeave);
    root.addEventListener("pointercancel", onLeave);
    wake();

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
      root.removeEventListener("pointercancel", onLeave);
      hopRef.current = null;
      focusRef.current = null;
      wakeRef.current = null;
    };
  }, []);

  return {
    rootRef,
    itemRefs,
    hop: (index: number) => hopRef.current?.(index),
    focus: (index: number) => focusRef.current?.(index),
    metrics: {
      base: settings.base,
      thickness: rawThickness * fit,
      gap: settings.gap,
      reach: settings.peak - settings.base,
    },
  };
};
