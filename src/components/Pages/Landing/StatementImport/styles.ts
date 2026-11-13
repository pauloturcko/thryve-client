import { css, keyframes, styled } from "styled-components";
import { armed, beforeReveal } from "../styles";

const read = keyframes`
  0% {
    opacity: 1;
    transform: scaleX(0);
  }
  85% {
    opacity: 1;
    transform: scaleX(1);
  }
  100% {
    opacity: 0;
    transform: scaleX(1);
  }
`;

export const Window = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 1.25rem;
  background: #ffffff;
  box-shadow:
    inset 0 0 0 1px rgba(11, 13, 16, 0.07),
    0 1px 0 rgba(11, 13, 16, 0.03),
    0 40px 70px -48px rgba(11, 13, 16, 0.4);
`;

export const File = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 1.1rem 1.25rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const FileIcon = styled.span`
  display: grid;
  place-items: center;
  flex: none;
  width: 2.5rem;
  height: 2.75rem;
  border-radius: 0.4rem 0.9rem 0.4rem 0.4rem;
  color: ${({ theme }) => theme.colors.textPrimary};
  background: ${({ theme }) => theme.colors.background};
  box-shadow: inset 0 0 0 1px ${({ theme }) => theme.colors.border};
`;

export const FileInfo = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;

  strong {
    font-size: 0.92rem;
    font-weight: 600;
  }

  span {
    font-size: 0.78rem;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

export const Reading = styled.span`
  position: absolute;
  left: 0;
  right: 0;
  bottom: -1px;
  height: 2px;
  overflow: hidden;

  i {
    display: block;
    height: 100%;
    background: ${({ theme }) => theme.colors.textPrimary};
    transform: scaleX(0);
    transform-origin: left;
    opacity: 0;
  }

  [data-motion-armed] [data-inview] & i {
    animation: ${read} 1.3s cubic-bezier(0.65, 0, 0.35, 1) 0.2s both;
  }
`;

export const ReviewHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.25rem 1rem;
  padding: 0.9rem 1.25rem 0.4rem;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textSecondary};

  span:last-child {
    letter-spacing: 0.02em;
    text-transform: none;
    font-weight: 500;
  }
`;

export const Rows = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0 0.5rem;
`;

export const Row = styled.li<{ $missing: boolean }>`
  display: grid;
  grid-template-columns: 2.75rem minmax(0, 1fr) auto auto;
  align-items: center;
  gap: 0.75rem;
  padding: 0.7rem 0.75rem;
  border-radius: 0.75rem;
  background: ${({ theme, $missing }) =>
    $missing
      ? `color-mix(in srgb, ${theme.colors.warning} 7%, transparent)`
      : "transparent"};

  & + & {
    margin-top: 1px;
  }

  ${beforeReveal(css`
    opacity: 0;
    transform: translate3d(0, 0.5rem, 0);
  `)}

  ${armed(css`
    transition:
      opacity 0.5s ease calc(1.2s + var(--row) * 130ms),
      transform 0.7s var(--ease-out) calc(1.2s + var(--row) * 130ms);
  `)}

  @media (max-width: 520px) {
    grid-template-columns: minmax(0, 1fr) auto;
    grid-template-areas:
      "description value"
      "date flag";
    row-gap: 0.25rem;
  }
`;

export const RowDate = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.75rem;
  font-weight: 400;
  font-variant-numeric: tabular-nums;
  color: ${({ theme }) => theme.colors.textSecondary};

  @media (max-width: 520px) {
    grid-area: date;
  }
`;

export const Description = styled.span`
  display: flex;
  flex-direction: column;
  min-width: 0;

  strong {
    overflow: hidden;
    font-size: 0.88rem;
    font-weight: 600;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  span {
    font-size: 0.75rem;
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  @media (max-width: 520px) {
    grid-area: description;
  }
`;

export const Missing = styled.span`
  && {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.warning};
  }
`;

export const Value = styled.span<{ $kind: "income" | "expense" }>`
  font-size: 0.88rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
  color: ${({ theme, $kind }) =>
    $kind === "income" ? theme.colors.success : theme.colors.textPrimary};

  @media (max-width: 520px) {
    grid-area: value;
  }
`;

export const Flag = styled.span<{ $missing: boolean }>`
  justify-self: end;
  padding: 0.2rem 0.55rem;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 600;
  color: ${({ theme, $missing }) =>
    $missing ? theme.colors.warning : theme.colors.success};
  box-shadow: inset 0 0 0 1px
    ${({ theme, $missing }) =>
      `color-mix(in srgb, ${$missing ? theme.colors.warning : theme.colors.success} 35%, transparent)`};

  @media (max-width: 520px) {
    grid-area: flag;
  }
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
  padding: 0.9rem 1.25rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;
