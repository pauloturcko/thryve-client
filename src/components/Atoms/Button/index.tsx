"use client";

import { ReactNode } from "react";
import { ButtonVariant, StyledButton } from "./styles";

type ButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  type?: "button" | "submit";
  onClick?: () => void;
};

export const Button = ({
  children,
  variant = "confirm",
  type = "button",
  onClick,
}: ButtonProps) => {
  return (
    <StyledButton
      $variant={variant}
      type={type}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  );
};
