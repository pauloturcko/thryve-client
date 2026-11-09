import { styled } from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const PageHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  h1 {
    font-size: clamp(1.75rem, 3vw, 2.4rem);
    font-weight: 600;
    line-height: 1.05;
  }

  p {
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

export const Hero = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

export const Delta = styled.span<{ $tone: "good" | "bad" | "neutral" }>`
  align-self: flex-start;
  padding: 0.2rem 0.55rem;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  color: ${({ theme, $tone }) =>
    $tone === "good"
      ? theme.colors.success
      : $tone === "bad"
        ? theme.colors.danger
        : theme.colors.textSecondary};
  background: ${({ theme, $tone }) =>
    $tone === "neutral"
      ? theme.colors.surfaceElevated
      : `color-mix(in srgb, ${$tone === "good" ? theme.colors.success : theme.colors.danger} 14%, transparent)`};
`;

export const Split = styled.div`
  display: flex;
  gap: 2px;
  height: 6px;
  border-radius: 999px;
  overflow: hidden;
`;

export const SplitBar = styled.span`
  flex-basis: 0;
  border-radius: 999px;
`;

export const Legend = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem 1.25rem;
  font-size: 0.8rem;
  font-variant-numeric: tabular-nums;
  color: ${({ theme }) => theme.colors.textSecondary};

  span {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
  }

  i {
    width: 8px;
    height: 8px;
    border-radius: 2px;
  }
`;

export const Ring = styled.div`
  --size: 7.5rem;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.25rem;
  flex: 1;
  padding-right: calc(var(--size) + 0.75rem);
  min-height: 0;

  &::after {
    content: "";
    position: absolute;
    right: 0;
    top: 50%;
    width: var(--size);
    height: var(--size);
    max-height: 100%;
    aspect-ratio: 1;
    transform: translateY(-50%);
    border-radius: 50%;
    background: conic-gradient(
      ${({ theme }) => theme.colors.ringAccent} calc(var(--value) * 360deg),
      ${({ theme }) =>
          theme.mode === "dark"
            ? "rgba(255,255,255,0.07)"
            : "rgba(23,18,42,0.07)"}
        0
    );
    -webkit-mask: radial-gradient(circle, transparent 58%, #000 59%);
    mask: radial-gradient(circle, transparent 58%, #000 59%);
  }

  @media (max-width: 1400px) {
    --size: 5.5rem;
  }
`;

export const Stack = styled.div`
  display: flex;
  gap: 2px;
  height: 10px;
  border-radius: 999px;
  overflow: hidden;
`;

export const StackPart = styled.span`
  flex-basis: 0;
  min-width: 4px;
`;

export const CategoryList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  gap: 0.5rem 1.25rem;
  font-size: 0.82rem;

  li {
    display: grid;
    grid-template-columns: 8px minmax(0, 1fr) auto auto;
    align-items: center;
    gap: 0.5rem;
  }

  i {
    width: 8px;
    height: 8px;
    border-radius: 2px;
  }

  span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  strong {
    font-weight: 600;
    font-variant-numeric: tabular-nums;
  }

  em {
    width: 2.5rem;
    text-align: right;
    font-style: normal;
    font-variant-numeric: tabular-nums;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const HeaderNote = styled.span`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const Upcoming = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  margin-top: auto;

  li {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr) auto;
    align-items: center;
    gap: 0.75rem;
  }
`;

export const DueDate = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.7rem;
  background: ${({ theme }) => theme.colors.surfaceElevated};
  line-height: 1;

  strong {
    font-family: ${({ theme }) => theme.fonts.display};
    font-size: 0.95rem;
    font-variant-numeric: tabular-nums;
  }

  span {
    font-size: 0.6rem;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const DueInfo = styled.span`
  display: flex;
  flex-direction: column;
  min-width: 0;

  span {
    font-size: 0.88rem;
    font-weight: 600;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  small {
    font-size: 0.75rem;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

export const DueAmount = styled.span`
  font-size: 0.9rem;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  color: ${({ theme }) => theme.colors.warning};
`;
