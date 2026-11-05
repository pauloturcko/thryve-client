"use client";

import { KeyboardEvent, ReactNode } from "react";
import * as S from "./styles";
import { useDockMotion } from "./useDockMotion";

export type DockEntry =
  | {
      kind: "link";
      label: string;
      href: string;
      icon: ReactNode;
      active?: boolean;
    }
  | {
      kind: "action";
      label: string;
      icon: ReactNode;
      onClick: () => void;
      tone?: "danger";
    }
  | { kind: "separator" };

export const Dock = ({ items }: { items: DockEntry[] }) => {
  const spans = items.map((item) =>
    item.kind === "separator" ? "separator" : "item"
  );
  const { rootRef, itemRefs, hop, focus, metrics } = useDockMotion(spans);

  const order = items.flatMap((item, index) =>
    item.kind === "separator" ? [] : [index]
  );

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>, index: number) => {
    const at = order.indexOf(index);
    let next: number | undefined;
    if (event.key === "ArrowLeft")
      next = order[(at - 1 + order.length) % order.length];
    else if (event.key === "ArrowRight") next = order[(at + 1) % order.length];
    else if (event.key === "Home") next = order[0];
    else if (event.key === "End") next = order[order.length - 1];
    if (next === undefined) return;
    event.preventDefault();
    itemRefs.current[next]?.focus();
  };

  const focusHandlers = (index: number) => ({
    onFocus: (event: React.FocusEvent<HTMLElement>) => {
      if (event.currentTarget.matches(":focus-visible")) focus(index);
    },
    onBlur: () => focus(-1),
    onKeyDown: (event: KeyboardEvent<HTMLElement>) =>
      handleKeyDown(event, index),
  });

  return (
    <S.Root
      ref={rootRef}
      aria-label="Navegação principal"
      $base={metrics.base}
      $thickness={metrics.thickness}
      $gap={metrics.gap}
      $reach={metrics.reach}
    >
      {items.map((item, index) => {
        if (item.kind === "separator") {
          return (
            <S.Separator
              key={`separator-${index}`}
              aria-hidden="true"
            />
          );
        }

        const tile = (
          <S.Tile>
            <S.Face
              $active={item.kind === "link" && item.active}
              $tone={item.kind === "action" ? item.tone : undefined}
            >
              {item.icon}
            </S.Face>
          </S.Tile>
        );

        if (item.kind === "link") {
          return (
            <S.ItemLink
              key={item.href}
              ref={(node: HTMLAnchorElement | null) => {
                itemRefs.current[index] = node;
              }}
              href={item.href}
              aria-label={item.label}
              aria-current={item.active ? "page" : undefined}
              onClick={() => hop(index)}
              {...focusHandlers(index)}
            >
              {tile}
              {item.active && <S.Dot aria-hidden="true" />}
              <S.Label aria-hidden="true">{item.label}</S.Label>
            </S.ItemLink>
          );
        }

        return (
          <S.ItemButton
            key={item.label}
            ref={(node: HTMLButtonElement | null) => {
              itemRefs.current[index] = node;
            }}
            type="button"
            aria-label={item.label}
            onClick={() => {
              hop(index);
              item.onClick();
            }}
            {...focusHandlers(index)}
          >
            {tile}
            <S.Label aria-hidden="true">{item.label}</S.Label>
          </S.ItemButton>
        );
      })}
    </S.Root>
  );
};
