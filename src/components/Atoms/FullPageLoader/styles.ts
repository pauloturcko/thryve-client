import styled, { keyframes } from "styled-components";

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(
    ${({ theme }) => theme.colors.shadowRgb},
    ${({ theme }) => (theme.mode === "dark" ? 0.45 : 0.2)}
  );
  -webkit-backdrop-filter: blur(6px);
  backdrop-filter: blur(6px);
  cursor: progress;
`;

export const Spinner = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  border: 3px solid ${({ theme }) => theme.colors.border};
  border-top-color: ${({ theme }) => theme.colors.textPrimary};
  animation: ${spin} 0.7s linear infinite;
`;
