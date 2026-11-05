"use client";

import { KeyboardEvent, ReactNode } from "react";
import * as S from "./styles";
import { useBentoEngine } from "./useBentoEngine";

export type MagicBentoItem = {
  id: string;
  content: ReactNode;
  colSpan?: number;
  rowSpan?: number;
  label?: string;
  background?: string;
  onClick?: () => void;
};

type MagicBentoProps = {
  items: MagicBentoItem[];
  columns?: number;
  rowHeight?: number;
  gap?: number;
  radius?: number;
  spotlightRadius?: number;
  enableBorderGlow?: boolean;
  enableSpotlight?: boolean;
  enableTilt?: boolean;
  enableMagnetism?: boolean;
  clickEffect?: boolean;
  intro?: boolean;
};

const MagicBentoRoot = ({
  items,
  columns = 4,
  rowHeight = 190,
  gap = 14,
  radius = 22,
  spotlightRadius = 320,
  enableBorderGlow = true,
  enableSpotlight = true,
  enableTilt = false,
  enableMagnetism = false,
  clickEffect = true,
  intro = true,
}: MagicBentoProps) => {
  const { rootRef, cellRefs, cardRefs, cols } = useBentoEngine(
    {
      columns,
      gap,
      spotlightRadius,
      enableBorderGlow,
      enableSpotlight,
      enableTilt,
      enableMagnetism,
      clickEffect,
      intro,
    },
    items.length
  );

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>, item: MagicBentoItem) => {
    if (!item.onClick || (event.key !== "Enter" && event.key !== " ")) return;
    event.preventDefault();
    event.currentTarget.click();
  };

  return (
    <S.Grid
      ref={rootRef}
      $cols={cols}
      $rowHeight={rowHeight}
      $gap={gap}
      $radius={radius}
      $spot={spotlightRadius}
    >
      {items.map((item, index) => {
        const clickable = Boolean(item.onClick);
        return (
          <S.Cell
            key={item.id}
            ref={(node: HTMLDivElement | null) => {
              cellRefs.current[index] = node;
            }}
            style={{
              gridColumn: `span ${Math.min(cols, Math.max(1, item.colSpan ?? 1))}`,
              gridRow: `span ${cols === 1 ? 1 : Math.max(1, item.rowSpan ?? 1)}`,
            }}
          >
            <S.Card
              ref={(node: HTMLDivElement | null) => {
                cardRefs.current[index] = node;
              }}
              data-bento-card=""
              $clickable={clickable}
              $tone={item.background}
              role={clickable ? "button" : undefined}
              tabIndex={clickable ? 0 : undefined}
              aria-label={clickable ? item.label : undefined}
              onClick={item.onClick}
              onKeyDown={(event: KeyboardEvent<HTMLDivElement>) => handleKeyDown(event, item)}
            >
              {enableSpotlight && <S.Light />}
              <S.Content>{item.content}</S.Content>
              <S.Rim />
              <S.Border />
            </S.Card>
          </S.Cell>
        );
      })}
    </S.Grid>
  );
};

export const MagicBento = Object.assign(MagicBentoRoot, {
  Header: S.Header,
  IconBadge: S.IconBadge,
  Figure: S.Figure,
  Note: S.Note,
  Footer: S.Footer,
  Visual: S.Visual,
});
