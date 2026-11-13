import { styled } from "styled-components";
import { Y_PATH } from "@/components/Atoms/Logo";

type YMarkProps = {
  variant?: "solid" | "outline";
  className?: string;
};

// Recorte justo do "y" dentro das coordenadas originais do logotipo.
const VIEW_BOX = "1021 246 244 327";

export const YMark = ({ variant = "solid", className }: YMarkProps) => (
  <Symbol
    viewBox={VIEW_BOX}
    className={className}
    aria-hidden="true"
    focusable="false"
  >
    <path
      d={Y_PATH}
      pathLength={1}
      fill={variant === "solid" ? "currentColor" : "none"}
      stroke={variant === "outline" ? "currentColor" : "none"}
      strokeWidth={1}
      strokeLinejoin="miter"
      vectorEffect="non-scaling-stroke"
    />
  </Symbol>
);

const Symbol = styled.svg`
  display: block;
  width: auto;
  overflow: visible;
`;
