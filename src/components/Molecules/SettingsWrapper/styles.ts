import { styled } from "styled-components";

export const SettingsWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;

  gap: 0.2rem;

  p {
    font-family: ${({ theme }) => theme.fonts.display};
    font-size: clamp(1.4rem, 2.4vw, 1.9rem);
    font-weight: 600;
    letter-spacing: -0.02em;
    line-height: 1.1;
  }

  span {
    font-size: 0.95rem;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

export const Header = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0 1rem 0;
  gap: 1rem;
  flex-wrap: wrap;
`;
