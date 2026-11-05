"use client";

import {
  forwardRef,
  KeyboardEvent,
  ReactNode,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  animate,
  HTMLMotionProps,
  motionValue,
  MotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import * as S from "./styles";

/* Ported from React Bits <JellyRadio />: the chosen chip swells and pushes its
   neighbours aside with a staggered, jelly-like spring. */

export type JellyRadioItem =
  | string
  | { value: string; label: ReactNode; icon?: ReactNode; disabled?: boolean };

type JellyRadioProps = {
  items: JellyRadioItem[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string, index: number) => void;
  size?: "sm" | "md" | "lg";
  gap?: number;
  radius?: number;
  swell?: number;
  barge?: number;
  shrink?: number;
  jelly?: number;
  bounce?: number;
  stagger?: number;
  stiffness?: number;
  disabled?: boolean;
  ariaLabel?: string;
};

type ChipValues = {
  x: MotionValue<number>;
  sx: MotionValue<number>;
  sy: MotionValue<number>;
};

type Config = {
  swell: number;
  barge: number;
  shrink: number;
  jelly: number;
  bounce: number;
  stagger: number;
  stiffness: number;
  reduce: boolean | null;
  count: number;
};

const SIZES: Record<string, [number, number, number]> = {
  sm: [30, 12, 12],
  md: [38, 13, 16],
  lg: [44, 14, 20],
};

const spring = (k: number, m: number, bounce: number) => ({
  type: "spring" as const,
  stiffness: k,
  damping: 2 * Math.sqrt(k * m) * (1 - bounce),
  mass: m,
});

type ChipProps = HTMLMotionProps<"button"> & { mv: ChipValues };

const Chip = forwardRef<HTMLButtonElement, ChipProps>(function Chip({ mv, children, ...rest }, ref) {
  const transform = useTransform(
    () => `translateX(${mv.x.get()}px) scale(${mv.sx.get()}, ${mv.sy.get()})`
  );
  return (
    <S.Chip
      ref={ref}
      style={{ transform }}
      {...rest}
    >
      {children}
    </S.Chip>
  );
});

export const JellyRadio = ({
  items,
  value,
  defaultValue,
  onChange,
  size = "md",
  gap = 8,
  radius = 19,
  swell = 0.12,
  barge = 5,
  shrink = 0.04,
  jelly = 1,
  bounce = 0.25,
  stagger = 22,
  stiffness = 580,
  disabled = false,
  ariaLabel = "Opções",
}: JellyRadioProps) => {
  const list = items.map((it) => (typeof it === "string" ? { value: it, label: it } : it));
  const [inner, setInner] = useState(() => defaultValue ?? list[0]?.value);
  const current = value ?? inner;
  const at = Math.max(
    0,
    list.findIndex((it) => it.value === current)
  );
  const reduce = useReducedMotion();
  const groupRef = useRef<HTMLDivElement>(null);
  const chipRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const widths = useRef<number[]>([]);
  const mvs = useRef<ChipValues[]>([]);
  const applied = useRef(at);
  const config: Config = { swell, barge, shrink, jelly, bounce, stagger, stiffness, reduce, count: list.length };
  const cfg = useRef<Config>(config);
  useLayoutEffect(() => {
    cfg.current = config;
  });
  const [h, font, px] = SIZES[size] ?? SIZES.md;
  const itemsKey = list.map((it) => it.value).join("|");

  const mvFor = (i: number) => {
    let mv = mvs.current[i];
    if (!mv) {
      mv = { x: motionValue(0), sx: motionValue(1), sy: motionValue(1) };
      mvs.current[i] = mv;
    }
    return mv;
  };

  const apply = (sel: number, instant: boolean) => {
    const C = cfg.current;
    const push = ((widths.current[sel] ?? 0) * C.swell) / 2 + C.barge;
    for (let i = 0; i < C.count; i++) {
      const mv = mvFor(i);
      const on = i === sel;
      const far = Math.abs(i - sel);
      const x = Math.sign(i - sel) * push;
      const s = on ? 1 + C.swell : 1 - C.shrink;
      if (instant || C.reduce) {
        mv.x.jump(x);
        mv.sx.jump(s);
        mv.sy.jump(s);
        continue;
      }
      const k = C.stiffness * (1 - 0.12 * Math.min(far, 3));
      const inFlight = mv.x.isAnimating() || mv.sx.isAnimating() || mv.sy.isAnimating();
      const delay = inFlight ? 0 : (far * C.stagger) / 1000;
      animate(mv.x, x, { ...spring(k, 0.9, C.bounce), delay });
      const j = C.jelly;
      animate(mv.sx, s, {
        ...spring(k * (1 + 0.24 * j), 0.9 - 0.1 * j, Math.min(0.85, C.bounce + 0.3 * j)),
        delay,
      });
      animate(mv.sy, s, {
        ...spring(k * (1 - 0.14 * j), 0.9 + 0.05 * j, C.bounce),
        delay: delay + 0.05 * j,
      });
    }
  };

  const measure = () => {
    const group = groupRef.current;
    if (!group) return;
    widths.current = chipRefs.current.map((el) => el?.offsetWidth ?? 0);
    const chipH = chipRefs.current[0]?.offsetHeight ?? 0;
    const maxW = Math.max(0, ...widths.current);
    group.style.setProperty("--jr-pad-x", `${Math.ceil((maxW * swell * 1.3) / 2 + barge) + 2}px`);
    group.style.setProperty("--jr-pad-y", `${Math.ceil((chipH * swell) / 2) + 2}px`);
  };

  useLayoutEffect(() => {
    const settle = () => {
      measure();
      apply(applied.current, true);
    };
    settle();
    const observer = new ResizeObserver(settle);
    if (groupRef.current) observer.observe(groupRef.current);
    document.fonts?.ready.then(settle);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsKey, size, gap, swell, barge, shrink]);

  useEffect(() => {
    if (applied.current === at) return;
    applied.current = at;
    apply(at, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [at]);

  useEffect(
    () => () =>
      mvs.current.forEach((mv) => {
        mv.x.destroy();
        mv.sx.destroy();
        mv.sy.destroy();
      }),
    []
  );

  const commit = (i: number, instant: boolean) => {
    if (disabled || i === at || !list[i] || list[i].disabled) return;
    applied.current = i;
    apply(i, instant);
    if (value === undefined) setInner(list[i].value);
    onChange?.(list[i].value, i);
  };

  const stepFrom = (i: number, dir: number) => {
    const n = list.length;
    let j = i;
    for (let tries = 0; tries < n; tries++) {
      j = (j + dir + n) % n;
      if (!list[j].disabled) return j;
    }
    return i;
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    let next: number | null = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = stepFrom(i, 1);
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = stepFrom(i, -1);
    else if (e.key === "Home") next = stepFrom(-1, 1);
    else if (e.key === "End") next = stepFrom(list.length, -1);
    else if (e.key === " " || e.key === "Enter") next = i;
    if (next === null) return;
    e.preventDefault();
    commit(next, true);
    chipRefs.current[next]?.focus();
  };

  return (
    <S.Group
      ref={groupRef}
      role="radiogroup"
      aria-label={ariaLabel}
      data-disabled={disabled ? "" : undefined}
      $gap={gap}
      $radius={radius}
      $height={h}
      $font={font}
      $px={px}
    >
      {list.map((it, i) => (
        <Chip
          key={it.value}
          mv={mvFor(i)}
          ref={(el) => {
            chipRefs.current[i] = el;
          }}
          type="button"
          role="radio"
          aria-checked={i === at}
          tabIndex={i === at ? 0 : -1}
          disabled={disabled || !!it.disabled}
          data-on={i === at ? "true" : "false"}
          onClick={(e) => commit(i, e.detail === 0)}
          onKeyDown={(e) => onKeyDown(e, i)}
        >
          <S.Skin>
            {it.icon ? <S.Icon>{it.icon}</S.Icon> : null}
            <span>{it.label}</span>
          </S.Skin>
        </Chip>
      ))}
    </S.Group>
  );
};
