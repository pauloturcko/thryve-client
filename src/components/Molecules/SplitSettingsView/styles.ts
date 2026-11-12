import { styled } from "styled-components";

export const Page = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  min-width: 0;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.75rem 1rem;
`;

export const Heading = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;

  p {
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

export const Layout = styled.div<{ $equalColumns: boolean }>`
  flex: 1;
  display: grid;
  grid-template-columns: ${({ $equalColumns }) =>
    $equalColumns
      ? "repeat(2, minmax(0, 1fr))"
      : "minmax(0, 35fr) minmax(0, 65fr)"};
  min-height: 22rem;
  gap: 1.25rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    min-height: 0;
  }
`;

export const Message = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
`;
