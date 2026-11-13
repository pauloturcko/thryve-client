import { styled } from "styled-components";

export const Footer = styled.footer`
  position: relative;
  color: ${({ theme }) => theme.colors.textPrimary};
  background: ${({ theme }) => theme.colors.background};
`;

export const Top = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 3rem;
  padding-block: 3.5rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

export const Brand = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;

  p {
    font-family: ${({ theme }) => theme.fonts.serif};
    font-size: 1.25rem;
    font-style: italic;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

export const Links = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2.5rem 5rem;

  ul {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
  }

  a {
    display: inline-block;
    padding: 0.3rem 0;
    font-size: 0.92rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    transition: color 0.2s ease;
  }

  @media (hover: hover) {
    a:hover {
      color: ${({ theme }) => theme.colors.textPrimary};
    }
  }
`;

export const GroupLabel = styled.p`
  margin-bottom: 0.75rem;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const Bottom = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.75rem 2rem;
  padding-block: 1.5rem 2.5rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 0.8rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.textSecondary};
`;
