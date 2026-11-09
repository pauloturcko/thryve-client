import { styled } from "styled-components";

export const Container = styled.main`
  position: relative;
  width: 100%;
  min-height: 100vh;
  min-height: 100dvh;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  overflow: hidden;
  background:
    radial-gradient(
      50rem 28rem at 50% -10%,
      rgba(
        ${({ theme }) => theme.colors.glowRgb},
        ${({ theme }) => (theme.mode === "dark" ? 0.24 : 0.1)}
      ),
      transparent 70%
    ),
    radial-gradient(
      30rem 20rem at 85% 110%,
      ${({ theme }) => theme.colors.accentSoft},
      transparent 70%
    ),
    ${({ theme }) => theme.colors.background};
`;

export const Backdrop = styled.span`
  position: absolute;
  inset: 0;
  background-image: radial-gradient(
    ${({ theme }) =>
        theme.mode === "dark"
          ? "rgba(255, 255, 255, 0.07)"
          : `rgba(${theme.colors.shadowRgb}, 0.08)`}
      1px,
    transparent 1px
  );
  background-size: 22px 22px;
  -webkit-mask: radial-gradient(
    ellipse 60% 55% at 50% 45%,
    #000 0%,
    transparent 75%
  );
  mask: radial-gradient(ellipse 60% 55% at 50% 45%, #000 0%, transparent 75%);
  pointer-events: none;
`;

export const CardSlot = styled.div`
  position: relative;
  width: 100%;
  max-width: 440px;
`;

export const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 0.75rem 0.75rem 0.5rem;

  @media (max-width: 480px) {
    padding: 0.25rem 0 0;
    gap: 1.25rem;
  }
`;

export const Brand = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

export const Heading = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;

  h1 {
    font-size: clamp(1.5rem, 4vw, 1.85rem);
    font-weight: 600;
    line-height: 1.1;
  }

  p {
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
  width: 100%;
`;

export const ButtonWrapper = styled.div`
  width: 100%;
  margin-top: 0.25rem;
`;

export const ResetPassword = styled.button`
  align-self: flex-end;
  margin-top: -0.35rem;
  font-size: 0.85rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
  border-radius: 4px;

  &:hover {
    color: ${({ theme }) => theme.colors.primaryText};
    text-decoration: underline;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primaryText};
    outline-offset: 2px;
  }
`;

export const Strip = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.6rem 1.25rem;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.glass};
  box-shadow: ${({ theme }) =>
    theme.mode === "dark"
      ? `inset 0 0 0 1px rgba(255, 255, 255, 0.08),
         inset 0 1px 0 rgba(255, 255, 255, 0.07),
         0 22px 44px -20px rgba(0, 0, 0, 0.8)`
      : `inset 0 0 0 1px rgba(${theme.colors.shadowRgb}, 0.07),
         inset 0 1px 0 rgba(255, 255, 255, 0.95),
         0 22px 44px -22px rgba(${theme.colors.shadowRgb}, 0.3)`};
  -webkit-backdrop-filter: blur(20px) saturate(1.6);
  backdrop-filter: blur(20px) saturate(1.6);
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const StripDot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.ringAccent};
  box-shadow: 0 0 8px ${({ theme }) => theme.colors.ringAccent};
`;
