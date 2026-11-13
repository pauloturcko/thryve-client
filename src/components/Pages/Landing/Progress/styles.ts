import { styled } from "styled-components";
import { serifType } from "../styles";

export const Glow = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(
    56rem 34rem at 88% 38%,
    rgba(180, 187, 197, 0.07),
    transparent 70%
  );
  pointer-events: none;
`;

export const Inner = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(3rem, 6vw, 5rem);
  padding-block: clamp(5rem, 10vw, 9rem);
`;

export const Body = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 4fr) minmax(0, 8fr);
  align-items: center;
  gap: clamp(2rem, 5vw, 4rem);

  @media (max-width: 1024px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const Thought = styled.div`
  > p:first-child {
    ${serifType};
    font-size: clamp(2.125rem, 1.325rem + 2.4vw, 3.525rem);
    line-height: 1.08;
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  em {
    font-style: italic;
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

export const Afterthought = styled.p`
  max-width: 24rem;
  margin-top: 1.75rem;
  padding-top: 1.25rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 1rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-wrap: pretty;
`;

export const GoalSlot = styled.div`
  min-width: 0;
`;
