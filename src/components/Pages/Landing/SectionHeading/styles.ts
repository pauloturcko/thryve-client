import { css, styled } from "styled-components";
import { displayType } from "../styles";

export type HeadingLayout = "split" | "wide" | "stacked";

const layouts = {
  split: css`
    grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
    column-gap: clamp(2rem, 5vw, 5rem);
  `,
  // Título em linhas curtas e texto de apoio largo, alinhado no topo.
  wide: css`
    grid-template-columns: minmax(0, 6fr) minmax(0, 6fr);
    column-gap: clamp(2rem, 4vw, 4rem);

    > p {
      align-self: start;
      max-width: 40rem;
      padding-top: 0.6rem;
    }
  `,
  stacked: css`
    grid-template-columns: minmax(0, 1fr);

    > h2,
    > p {
      max-width: 46rem;
    }
  `,
};

export const Heading = styled.header<{ $layout: HeadingLayout }>`
  display: grid;
  row-gap: 1.75rem;
  ${({ $layout }) => layouts[$layout]};

  @media (max-width: 860px) {
    grid-template-columns: minmax(0, 1fr);
    row-gap: 1.25rem;
  }
`;

export const Status = styled.div`
  grid-column: 1 / -1;
`;

export const Title = styled.h2`
  ${displayType};
  font-size: clamp(2.1rem, 1.1rem + 3vw, 3.75rem);
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const Lead = styled.p`
  align-self: end;
  max-width: 34rem;
  font-size: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-wrap: pretty;
`;
