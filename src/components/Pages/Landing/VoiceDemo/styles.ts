import { keyframes, styled } from "styled-components";

const wordIn = keyframes`
  from {
    opacity: 0;
    filter: blur(4px);
    transform: translate3d(0, 0.25rem, 0);
  }
`;

const blink = keyframes`
  0%, 100% {
    opacity: 0.2;
  }
  50% {
    opacity: 1;
  }
`;

const breathe = keyframes`
  0%, 100% {
    transform: scale(1);
    opacity: 0.55;
  }
  50% {
    transform: scale(1.04);
    opacity: 0.9;
  }
`;

const STACKED = "max-width: 960px";

// No celular a ordem vira título, aparelho, botão e passos, para que o botão
// fique logo abaixo da esfera.
export const Layout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 6fr) minmax(0, 5fr);
  grid-template-areas: "story phone";
  align-items: center;
  column-gap: clamp(2rem, 6vw, 6rem);

  @media (${STACKED}) {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 2rem;
  }
`;

export const Story = styled.div`
  grid-area: story;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (${STACKED}) {
    display: contents;
  }
`;

export const Intro = styled.div`
  order: 0;
`;

export const Steps = styled.ol`
  display: flex;
  flex-direction: column;

  @media (${STACKED}) {
    order: 3;
  }
`;

export const Step = styled.li`
  display: grid;
  grid-template-columns: 1.5rem minmax(0, 1fr);
  gap: 0.75rem;
  padding: 0.95rem 0;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  transition: opacity 0.4s ease;

  strong {
    display: block;
    margin-bottom: 0.25rem;
    font-size: 1rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.textPrimary};
  }

  p {
    max-width: 30rem;
    font-size: 0.92rem;
    line-height: 1.55;
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  &[data-state="upcoming"] {
    opacity: 0.6;
  }
`;

// Só o número, sem contorno: a etapa atual se destaca pela cor.
export const StepNumber = styled.span`
  padding-top: 0.1rem;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.85rem;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: color 0.35s ease;

  [data-state="active"] > &,
  [data-state="done"] > & {
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

export const Controls = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem 1.25rem;

  @media (${STACKED}) {
    order: 2;
    flex-direction: column;
    text-align: center;
  }
`;

export const PlayButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  height: 3rem;
  padding: 0 1.3rem;
  border-radius: 0.8rem;
  font-size: 0.92rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.onPrimary};
  background: ${({ theme }) => theme.colors.primary};
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.4);
  transition:
    background-color 0.2s ease,
    opacity 0.2s ease,
    transform 0.16s var(--ease-out);

  &:active:not([aria-disabled="true"]) {
    transform: scale(0.97);
  }

  &[aria-disabled="true"] {
    opacity: 0.55;
    cursor: default;
  }

  @media (hover: hover) {
    &:hover:not([aria-disabled="true"]) {
      background: ${({ theme }) => theme.colors.hover};
    }
  }
`;

export const Disclaimer = styled.p`
  max-width: 18rem;
  font-size: 0.8rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const VisuallyHidden = styled.p`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
`;

export const PhoneColumn = styled.div`
  grid-area: phone;
  display: flex;
  justify-content: center;

  @media (${STACKED}) {
    order: 1;
  }
`;

export const Phone = styled.div`
  position: relative;
  width: clamp(15rem, 70vw, 16.75rem);
  aspect-ratio: 9 / 19;
  padding: 0.55rem;
  border-radius: 3rem;
  background: linear-gradient(145deg, #2a3038 0%, #0b0d10 38%, #15181d 100%);
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.16),
    inset 0 0 0 3px #0b0d10,
    0 60px 100px -50px rgba(0, 0, 0, 0.95),
    0 30px 60px -40px rgba(0, 0, 0, 0.7);

  &::before {
    content: "";
    position: absolute;
    top: 7.5rem;
    left: -2px;
    width: 3px;
    height: 3.25rem;
    border-radius: 2px 0 0 2px;
    background: #2a3038;
  }
`;

export const Screen = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  padding: 0.6rem 1rem 1rem;
  border-radius: 2.5rem;
  color: ${({ theme }) => theme.colors.textPrimary};
  background: radial-gradient(120% 60% at 50% 34%, #1a1e24 0%, #0b0d10 72%);
`;

export const Island = styled.span`
  position: absolute;
  top: 0.55rem;
  left: 50%;
  width: 5.25rem;
  height: 1.5rem;
  margin-left: -2.625rem;
  border-radius: 999px;
  background: #000000;
`;

export const StatusBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 1.6rem;
  padding: 0 0.7rem;
  font-size: 0.72rem;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
`;

export const StatusIcons = styled.span`
  display: flex;
  align-items: flex-end;
  gap: 2px;
  height: 0.6rem;

  i {
    width: 3px;
    border-radius: 1px;
    background: currentColor;
  }

  i:nth-child(1) {
    height: 40%;
  }

  i:nth-child(2) {
    height: 70%;
  }

  i:nth-child(3) {
    height: 100%;
  }
`;

export const ScreenHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  margin-top: 1.1rem;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: ${({ theme }) => theme.colors.textSecondary};

  svg {
    height: 0.8rem;
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

export const BallTouch = styled.div`
  flex: none;
  align-self: center;
  width: 86%;
  aspect-ratio: 1;
  margin-top: 0.25rem;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
`;

export const BallSlot = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  /* Contorno da esfera enquanto o WebGL não chega, ou no lugar dele. */
  &::before {
    content: "";
    position: absolute;
    inset: 7%;
    border-radius: 50%;
    background: radial-gradient(
      circle at 50% 78%,
      rgba(230, 234, 240, 0.16),
      transparent 60%
    );
    box-shadow:
      inset 0 0 0 1px rgba(230, 234, 240, 0.35),
      0 0 40px rgba(230, 234, 240, 0.08);
    transition: opacity 0.8s ease;
  }

  &[data-state="live"]::before {
    opacity: 0;
  }

  &[data-state="fallback"][data-phase="listening"]::before {
    animation: ${breathe} 1.2s ease-in-out infinite;
  }

  > div {
    position: absolute;
    inset: 0;
  }
`;

export const Caption = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 3.25rem;
  padding: 0 0.25rem;
  font-size: 0.85rem;
  line-height: 1.4;
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const Listening = styled.span`
  display: inline-flex;
  align-items: baseline;
  gap: 2px;
  color: ${({ theme }) => theme.colors.textPrimary};

  i {
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: currentColor;
    animation: ${blink} 1s ease-in-out infinite;
  }

  i:first-of-type {
    margin-left: 2px;
  }

  i:nth-of-type(2) {
    animation-delay: 0.15s;
  }

  i:nth-of-type(3) {
    animation-delay: 0.3s;
  }
`;

export const Transcript = styled.p`
  font-size: 1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textPrimary};

  span {
    display: inline-block;
    white-space: pre;
    animation: ${wordIn} 0.45s var(--ease-out) calc(var(--word) * 110ms) both;
  }
`;

export const ResultArea = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  margin-top: auto;

  > * {
    grid-area: 1 / 1;
  }
`;

export const ResultPlaceholder = styled.p`
  align-self: end;
  padding: 1rem 1.1rem;
  border-radius: 1.15rem;
  border: 1px dashed rgba(255, 255, 255, 0.16);
  font-size: 0.78rem;
  line-height: 1.45;
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  opacity: 0;
  transition: opacity 0.35s ease;

  &[data-visible] {
    opacity: 1;
    transition-delay: 0.2s;
  }
`;

export const Result = styled.div`
  align-self: end;
  padding: 0.85rem 0.9rem 0.8rem;
  border-radius: 1.15rem;
  background: rgba(255, 255, 255, 0.04);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08);
  opacity: 0;
  transform: translate3d(0, 0.75rem, 0);
  transition:
    opacity 0.4s ease,
    transform 0.6s var(--ease-out);

  &[data-visible] {
    opacity: 1;
    transform: none;
  }
`;

export const ResultHeader = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.35rem 0.5rem;
  margin-bottom: 0.65rem;

  > span:first-child {
    font-size: 0.62rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    white-space: nowrap;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

export const Pending = styled.span`
  padding: 0.15rem 0.5rem;
  white-space: nowrap;
  border-radius: 999px;
  font-size: 0.65rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.warning};
  background: color-mix(
    in srgb,
    ${({ theme }) => theme.colors.warning} 14%,
    transparent
  );
  opacity: 0;
  transform: scale(0.9);
  transition:
    opacity 0.3s ease,
    transform 0.4s var(--ease-out);

  &[data-visible] {
    opacity: 1;
    transform: none;
  }
`;

export const Fields = styled.dl`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.55rem 0.75rem;

  div {
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
    opacity: 0;
    transition: opacity 0.4s ease calc(0.15s + var(--field) * 120ms);
  }

  [data-visible] > & div {
    opacity: 1;
  }

  dt {
    font-size: 0.65rem;
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  dd {
    font-size: 0.85rem;
    font-weight: 600;
  }
`;

export const ReviewNote = styled.p`
  margin-top: 0.7rem;
  padding-top: 0.6rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  font-size: 0.72rem;
  line-height: 1.4;
  color: ${({ theme }) => theme.colors.warning};
  opacity: 0;
  transition: opacity 0.4s ease 0.1s;

  &[data-visible] {
    opacity: 1;
  }
`;
