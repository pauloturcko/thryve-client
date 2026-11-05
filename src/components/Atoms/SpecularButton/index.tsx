"use client";

import { ButtonHTMLAttributes, ReactNode, useRef } from "react";
import { css, styled, useTheme } from "styled-components";
import { useSpecularLight } from "./useSpecularLight";

type SpecularButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "type" | "disabled"
> & {
  children: ReactNode;
  size?: "sm" | "lg";
  fullWidth?: boolean;
  type?: "button" | "submit";
};

export const SpecularButton = ({
  children,
  size = "sm",
  fullWidth = false,
  type = "button",
  ...rest
}: SpecularButtonProps) => {
  const theme = useTheme();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useSpecularLight(buttonRef, canvasRef, {
    lineColor: theme.colors.onPrimary,
    baseColor: theme.colors.accent,
  });

  return (
    <Root
      ref={buttonRef}
      type={type}
      $size={size}
      $fullWidth={fullWidth}
      {...rest}
    >
      <Light
        ref={canvasRef}
        aria-hidden="true"
      />
      <Label>{children}</Label>
    </Root>
  );
};

const sizes = {
  sm: css`
    padding: 0.6rem 1.1rem;
    font-size: 0.85rem;
  `,
  lg: css`
    padding: 1rem 1.9rem;
    font-size: 1.05rem;
  `,
};

const Root = styled.button<{ $size: "sm" | "lg"; $fullWidth: boolean }>`
  position: relative;
  isolation: isolate;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5em;
  width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "auto")};
  border-radius: 14px;
  font-weight: 600;
  line-height: 1;
  letter-spacing: 0.01em;
  white-space: nowrap;
  color: ${({ theme }) => theme.colors.onPrimary};
  background: ${({ theme }) =>
    `linear-gradient(180deg, ${theme.colors.hover} 0%, ${theme.colors.primary} 100%)`};
  box-shadow: ${({ theme }) =>
    `0 12px 28px -14px rgba(${theme.colors.glowRgb}, 0.9), inset 0 1px 0 rgba(255, 255, 255, 0.18)`};
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
  ${({ $size }) => sizes[$size]};

  &:active {
    transform: scale(0.97);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primaryText};
    outline-offset: 3px;
  }

  svg {
    width: 1.15em;
    height: 1.15em;
  }
`;

const Light = styled.canvas`
  position: absolute;
  inset: -24px;
  z-index: 1;
  display: block;
  width: calc(100% + 48px);
  height: calc(100% + 48px);
  max-width: none;
  pointer-events: none;
`;

const Label = styled.span`
  position: relative;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  gap: inherit;
`;
