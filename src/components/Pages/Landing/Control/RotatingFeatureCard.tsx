"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { ThemeProvider } from "styled-components";
import { buildTheme } from "@/styles/theme";
import * as S from "./styles";

const productTheme = buildTheme("light");

type Face = {
  title: string;
  content: ReactNode;
};

type RotatingFeatureCardProps = {
  faces: Face[];
  interval?: number;
};

export const RotatingFeatureCard = ({
  faces,
  interval = 5000,
}: RotatingFeatureCardProps) => {
  const cardRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [onScreen, setOnScreen] = useState(false);
  const [autoplay, setAutoplay] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return undefined;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setAutoplay(!reduced.matches);
    const observer = new IntersectionObserver(([entry]) =>
      setOnScreen(entry.isIntersecting)
    );
    observer.observe(card);
    reduced.addEventListener("change", sync);
    const frame = requestAnimationFrame(sync);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      reduced.removeEventListener("change", sync);
    };
  }, []);

  const running = autoplay && onScreen && !hovered;
  const advance = () => setActive((current) => (current + 1) % faces.length);

  return (
    <S.Card
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <ThemeProvider theme={productTheme}>
        <S.Visual aria-hidden="true">
          <S.Faces>
            {faces.map((face, index) => (
              <S.Face
                key={face.title}
                data-active={index === active ? "" : undefined}
              >
                {face.content}
              </S.Face>
            ))}
          </S.Faces>
        </S.Visual>
      </ThemeProvider>
      <S.Caption $split>
        <h3 key={active}>{faces[active].title}</h3>
        <S.Indicators>
          {faces.map((face, index) => (
            <S.Indicator
              key={face.title}
              type="button"
              aria-label={`Mostrar ${face.title}`}
              aria-pressed={index === active}
              onClick={() => setActive(index)}
            >
              {index === active && autoplay && (
                <S.IndicatorFill
                  key={active}
                  $duration={interval}
                  $running={running}
                  onAnimationEnd={advance}
                />
              )}
            </S.Indicator>
          ))}
        </S.Indicators>
      </S.Caption>
    </S.Card>
  );
};
