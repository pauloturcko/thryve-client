"use client";

import { PointerEvent, useId, useRef, useState } from "react";
import { styled, useTheme } from "styled-components";
import { formatCurrencyBRL } from "@/utils/format";
import { BalancePoint } from "./useDashboardData";

const WIDTH = 600;
const HEIGHT = 200;
const PAD_TOP = 14;
const PAD_BOTTOM = 6;

type BalanceChartProps = {
  points: BalancePoint[];
  monthLabel: string;
};

const smoothPath = (coords: [number, number][]) => {
  if (coords.length < 2) return "";
  let d = `M${coords[0][0]},${coords[0][1]}`;
  for (let i = 1; i < coords.length; i++) {
    const [x0, y0] = coords[i - 1];
    const [x1, y1] = coords[i];
    const mx = (x0 + x1) / 2;
    d += ` C${mx},${y0} ${mx},${y1} ${x1},${y1}`;
  }
  return d;
};

export const BalanceChart = ({ points, monthLabel }: BalanceChartProps) => {
  const theme = useTheme();
  const gradientId = useId();
  const plotRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<number | null>(null);

  if (points.length < 2) {
    return <Empty>O gráfico aparece a partir do segundo dia com lançamentos.</Empty>;
  }

  const values = points.map((point) => point.balance);
  const min = Math.min(0, ...values);
  const max = Math.max(0, ...values);
  const range = max - min || 1;
  const x = (index: number) => (index / (points.length - 1)) * WIDTH;
  const y = (value: number) =>
    PAD_TOP + (1 - (value - min) / range) * (HEIGHT - PAD_TOP - PAD_BOTTOM);
  const coords = points.map((point, index): [number, number] => [x(index), y(point.balance)]);
  const line = smoothPath(coords);
  const zeroY = y(0);
  const area = `${line} L${WIDTH},${zeroY} L0,${zeroY} Z`;
  const lastIndex = points.length - 1;
  const active = hover ?? lastIndex;
  const activePoint = points[active];
  const positive = activePoint.balance >= 0;

  const handleMove = (event: PointerEvent<HTMLDivElement>) => {
    const rect = plotRef.current?.getBoundingClientRect();
    if (!rect) return;
    const ratio = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
    setHover(Math.round(ratio * lastIndex));
  };

  return (
    <Wrapper>
      <Plot
        ref={plotRef}
        onPointerMove={handleMove}
        onPointerLeave={() => setHover(null)}
      >
        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          preserveAspectRatio="none"
          role="img"
          aria-label={`Saldo acumulado em ${monthLabel}: ${formatCurrencyBRL(values[lastIndex])} no dia ${points[lastIndex].day}`}
        >
          <defs>
            <linearGradient
              id={gradientId}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor={theme.colors.primaryText}
                stopOpacity={theme.mode === "dark" ? 0.38 : 0.22}
              />
              <stop
                offset="100%"
                stopColor={theme.colors.primaryText}
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          {[0.25, 0.5, 0.75].map((ratio) => (
            <line
              key={ratio}
              x1={0}
              x2={WIDTH}
              y1={PAD_TOP + ratio * (HEIGHT - PAD_TOP - PAD_BOTTOM)}
              y2={PAD_TOP + ratio * (HEIGHT - PAD_TOP - PAD_BOTTOM)}
              stroke={theme.colors.border}
              strokeDasharray="2 6"
              vectorEffect="non-scaling-stroke"
            />
          ))}
          {min < 0 && (
            <line
              x1={0}
              x2={WIDTH}
              y1={zeroY}
              y2={zeroY}
              stroke={theme.colors.textMuted}
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
            />
          )}
          <path
            d={area}
            fill={`url(#${gradientId})`}
          />
          <path
            d={line}
            fill="none"
            stroke={theme.colors.primaryText}
            strokeWidth={2}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          {hover !== null && (
            <line
              x1={x(active)}
              x2={x(active)}
              y1={0}
              y2={HEIGHT}
              stroke={theme.colors.textMuted}
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
            />
          )}
        </svg>
        <Marker
          style={{
            left: `${(x(active) / WIDTH) * 100}%`,
            top: `${(y(activePoint.balance) / HEIGHT) * 100}%`,
          }}
        />
        <Tooltip
          style={{ left: `${(x(active) / WIDTH) * 100}%` }}
          $flip={active > lastIndex * 0.7}
        >
          <span>Dia {activePoint.day}</span>
          <strong data-positive={positive}>{formatCurrencyBRL(activePoint.balance)}</strong>
        </Tooltip>
      </Plot>
      <Axis>
        <span>1</span>
        <span>{points[lastIndex].day}</span>
      </Axis>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  flex: 1;
  min-height: 0;
`;

const Plot = styled.div`
  position: relative;
  flex: 1;
  min-height: 6rem;
  cursor: crosshair;
  touch-action: pan-y;

  svg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    max-width: none;
    overflow: visible;
  }
`;

const Marker = styled.span`
  position: absolute;
  width: 10px;
  height: 10px;
  margin: -5px 0 0 -5px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primaryText};
  box-shadow:
    0 0 0 3px ${({ theme }) => theme.colors.surface},
    0 0 14px rgba(${({ theme }) => theme.colors.glowRgb}, 0.8);
  pointer-events: none;
`;

const Tooltip = styled.div<{ $flip: boolean }>`
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 6px 10px;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.surfaceElevated};
  box-shadow: inset 0 0 0 1px ${({ theme }) => theme.colors.border};
  transform: translateX(${({ $flip }) => ($flip ? "calc(-100% - 12px)" : "12px")});
  pointer-events: none;
  white-space: nowrap;

  span {
    font-size: 0.7rem;
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  strong {
    font-size: 0.85rem;
    font-variant-numeric: tabular-nums;
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

const Axis = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.7rem;
  font-variant-numeric: tabular-nums;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const Empty = styled.p`
  margin-top: auto;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;
