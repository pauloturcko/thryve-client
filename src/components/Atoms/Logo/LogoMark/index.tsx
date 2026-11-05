"use client";

import { useId } from "react";
import { useTheme } from "styled-components";

type LogoMarkProps = {
  size?: number;
};

export const LogoMark = ({ size = 100 }: LogoMarkProps) => {
  const theme = useTheme();
  const gradientId = useId();

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop
            offset="0%"
            stopColor={theme.colors.logoStart}
          />
          <stop
            offset="50%"
            stopColor={theme.colors.logoMid}
          />
          <stop
            offset="100%"
            stopColor={theme.colors.logoEnd}
          />
        </linearGradient>
      </defs>
      <path
        d="M50 85 C50 85 25 75 25 50 C25 30 40 20 50 20 C65 20 75 35 75 50 C75 60 68 68 58 68 C50 68 45 62 45 55 C45 50 48 47 52 47 C55 47 57 49 57 52"
        stroke={`url(#${gradientId})`}
        strokeWidth={6}
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
};
