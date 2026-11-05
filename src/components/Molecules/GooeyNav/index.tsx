"use client";

import Link from "next/link";
import { ReactNode, useRef } from "react";
import { useTheme } from "styled-components";
import { contrastInkFor, parseColor, useGooeyEngine } from "./useGooeyEngine";
import * as S from "./styles";

export type GooeyNavItem = {
  label: string;
  href?: string;
  icon?: ReactNode;
};

type GooeyNavProps = {
  items: GooeyNavItem[];
  activeIndex: number;
  onChange?: (index: number, item: GooeyNavItem) => void;
  ariaLabel?: string;
  animationTime?: number;
  particleCount?: number;
  timeVariance?: number;
  spread?: number;
  gooeyness?: number;
  wobble?: number;
  hoverEffect?: boolean;
};

export const GooeyNav = ({
  items,
  activeIndex,
  onChange,
  ariaLabel = "Seções",
  animationTime = 600,
  particleCount = 15,
  timeVariance = 300,
  spread = 56,
  gooeyness = 0.5,
  wobble = 0.5,
  hoverEffect = true,
}: GooeyNavProps) => {
  const theme = useTheme();
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const overlayRef = useRef<HTMLUListElement>(null);
  const fallbackRef = useRef<HTMLSpanElement>(null);
  const current = Math.min(Math.max(0, activeIndex), Math.max(0, items.length - 1));
  const pillColor = theme.colors.primary;
  const pillRgb = parseColor(pillColor);
  const dark = theme.mode === "dark";

  useGooeyEngine(
    { stageRef, canvasRef, listRef, overlayRef, fallbackRef },
    {
      animationTime,
      particleCount,
      timeVariance,
      spread,
      gooeyness,
      wobble,
      hoverEffect,
      pillRgb,
      tints: [theme.colors.primary, theme.colors.hover, theme.colors.primaryText].map(parseColor),
      hoverRgb: parseColor(dark ? "rgba(255, 255, 255, 0.08)" : `rgba(${theme.colors.shadowRgb}, 0.06)`),
      shadow: dark ? 0.4 : 0.2,
    },
    current,
    items.length
  );

  const labels = (interactive: boolean) =>
    items.map((item, index) => {
      const content = (
        <>
          {item.icon && <S.Icon>{item.icon}</S.Icon>}
          <span>{item.label}</span>
        </>
      );

      if (!interactive) {
        return (
          <S.Item key={item.label}>
            <S.LinkStyle as="span">{content}</S.LinkStyle>
          </S.Item>
        );
      }

      const shared = {
        "aria-current": index === current ? ("page" as const) : undefined,
        onClick: () => onChange?.(index, item),
      };

      return (
        <S.Item
          key={item.label}
          data-gooey-index={index}
          data-active={index === current ? "" : undefined}
        >
          {item.href ? (
            <S.LinkStyle
              as={Link}
              href={item.href}
              {...shared}
            >
              {content}
            </S.LinkStyle>
          ) : (
            <S.LinkStyle
              as="button"
              type="button"
              {...shared}
            >
              {content}
            </S.LinkStyle>
          )}
        </S.Item>
      );
    });

  return (
    <S.Nav
      aria-label={ariaLabel}
      $pill={pillColor}
      $activeInk={contrastInkFor(pillRgb)}
    >
      <S.Rim />
      <S.Stage ref={stageRef}>
        <S.Canvas
          ref={canvasRef}
          aria-hidden="true"
        />
        <S.Fallback
          ref={fallbackRef}
          aria-hidden="true"
        />
        <S.List ref={listRef}>{labels(true)}</S.List>
        <S.ActiveList
          ref={overlayRef}
          aria-hidden="true"
        >
          {labels(false)}
        </S.ActiveList>
      </S.Stage>
    </S.Nav>
  );
};
