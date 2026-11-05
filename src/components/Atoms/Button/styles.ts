import { styled } from "styled-components";
import { ThemeType } from "@/styles/theme";

type ButtonBackground =
  | "primary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "transparent";

type ButtonProps = {
  $background?: ButtonBackground;
  $width?: number | string;
  $height?: number | string;
  $color?: keyof ThemeType["colors"];
  $justify?: "start" | "end";
  $loading?: boolean;
  $disabled?: boolean;
  $border?: boolean;
  $fontSize?: number | string;
  $weight?: "normal" | "bold" | "light";
  $rounded?: number | string;
  $faded?: boolean;
  $hover?: keyof ThemeType["colors"] | null;
};

export const StyledButton = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: ${({ $width }) =>
    typeof $width === "string" ? $width : `${$width}px`};
  height: ${({ $height }) =>
    typeof $height === "string" ? $height : `${$height}px`};
  justify-content: ${({ $justify }) => $justify ?? "center"};
  color: ${({ theme, $color }) =>
    $color ? theme.colors[$color] : theme.colors.textPrimary};
  border: ${({ theme, $border }) =>
    $border ? `1px solid ${theme.colors.border}` : "none"};
  border-radius: ${({ $rounded }) =>
    typeof $rounded === "string" ? $rounded : `${$rounded}px`};
  font-size: ${({ $fontSize }) =>
    typeof $fontSize === "string" ? $fontSize : `${$fontSize}px`};
  font-weight: ${({ $weight }) => $weight};
  padding: 1rem;
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  background: ${({ theme, $background, $faded }) =>
    $faded
      ? theme.colors.gradientPrimary
      : $background
        ? theme.colors[$background]
        : theme.colors.primary};

  font-family: inherit;
  transition:
    transform 0.16s cubic-bezier(0.2, 0.8, 0.2, 1),
    background-color 0.16s ease,
    filter 0.16s ease;

  &:hover {
    background-color: ${({ theme, $hover }) =>
      $hover ? theme.colors[$hover] : null};
    filter: ${({ $hover }) => ($hover ? "none" : "brightness(1.08)")};
  }

  &:active {
    transform: ${({ $disabled }) => ($disabled ? "none" : "scale(0.97)")};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primaryText};
    outline-offset: 2px;
  }
`;
