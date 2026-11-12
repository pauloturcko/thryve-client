"use client";

import { ReactNode } from "react";
import { ButtonVariant, StyledButton } from "./styles";

type ButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
};

export const Button = ({
  children,
  variant = "confirm",
  type = "button",
  disabled,
  onClick,
}: ButtonProps) => {
  return (
    <StyledButton
      $variant={variant}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  );
};
