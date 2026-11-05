"use client";

import { ButtonHTMLAttributes, ReactNode, useRef } from "react";
import { css, styled, useTheme } from "styled-components";
import { useSpecularLight } from "./useSpecularLight";

type SpecularButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type"> & {
  children: ReactNode;
  variant?: "primary" | "glass";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  radius?: number;
  type?: "button" | "submit" | "reset";
};

export const SpecularButton = ({
  children,
  variant = "primary",
  size = "md",
  fullWidth,
  radius = 14,
  type = "button",
  disabled = false,
  ...rest
}: SpecularButtonProps) => {
  const theme = useTheme();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const primary = variant === "primary";

  useSpecularLight(buttonRef, canvasRef, {
    radius,
    lineColor: primary ? "#FFFFFF" : theme.colors.primaryText,
    baseColor: primary ? theme.colors.accent : theme.colors.border,
    intensity: 1,
    idleIntensity: primary ? 0.45 : 0.35,
    shineSize: 10,
    shineFade: 34,
    thickness: 1.2,
    glow: 1,
    speed: 0.35,
    followMouse: true,
    proximity: 250,
    autoAnimate: false,
    disabled,
  });

  return (
    <Root
      ref={buttonRef}
      type={type}
      disabled={disabled}
      $variant={variant}
      $size={size}
      $radius={radius}
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
  md: css`
    padding: 0.8rem 1.4rem;
    font-size: 0.95rem;
  `,
  lg: css`
    padding: 1rem 1.9rem;
    font-size: 1.05rem;
  `,
};

const Root = styled.button<{
  $variant: "primary" | "glass";
  $size: "sm" | "md" | "lg";
  $radius: number;
  $fullWidth?: boolean;
}>`
  position: relative;
  isolation: isolate;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5em;
  width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "auto")};
  border-radius: ${({ $radius }) => `${$radius}px`};
  font-weight: 600;
  line-height: 1;
  letter-spacing: 0.01em;
  white-space: nowrap;
  color: ${({ theme, $variant }) =>
    $variant === "primary" ? theme.colors.onPrimary : theme.colors.textPrimary};
  background: ${({ theme, $variant }) =>
    $variant === "primary"
      ? `linear-gradient(180deg, ${theme.colors.hover} 0%, ${theme.colors.primary} 100%)`
      : theme.mode === "dark"
        ? "rgba(255, 255, 255, 0.04)"
        : `rgba(${theme.colors.shadowRgb}, 0.03)`};
  box-shadow: ${({ theme, $variant }) =>
    $variant === "primary"
      ? `0 12px 28px -14px rgba(${theme.colors.glowRgb}, 0.9), inset 0 1px 0 rgba(255, 255, 255, 0.18)`
      : "0 10px 24px -14px rgba(0, 0, 0, 0.45)"};
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
  ${({ $size }) => sizes[$size]};

  &:active:not(:disabled) {
    transform: scale(0.97);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primaryText};
    outline-offset: 3px;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
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
