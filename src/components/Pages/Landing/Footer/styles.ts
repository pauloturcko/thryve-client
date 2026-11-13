import { styled } from "styled-components";

export const Footer = styled.footer`
  position: relative;
  color: ${({ theme }) => theme.colors.textPrimary};
  background: ${({ theme }) => theme.colors.background};
`;

export const Top = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 2rem 3rem;
  padding-block: 3rem 2.5rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

export const Brand = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem 1.75rem;

  p {
    padding-left: 1.75rem;
    border-left: 1px solid ${({ theme }) => theme.colors.border};
    font-family: ${({ theme }) => theme.fonts.serif};
    font-size: 1.35rem;
    font-style: italic;
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  @media (max-width: 560px) {
    p {
      padding-left: 0;
      border-left: none;
    }
  }
`;

export const Nav = styled.nav`
  padding-bottom: 2.5rem;

  ul {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem 2rem;
  }

  a {
    display: inline-block;
    padding: 0.35rem 0;
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

export const Bottom = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.5rem 2rem;
  padding-block: 1.5rem 2.5rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 0.8rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.textSecondary};
`;
